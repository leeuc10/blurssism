/* blurssism React 공용 도우미 · © caffeinecat · MIT. 모든 컴포넌트가 이 파일을 import합니다.
   원본은 src/react/*.js 하나씩이고, scripts/build.mjs가 dist/index.mjs(ESM)·index.cjs·bundle.js(<script>)로 합칩니다.
   컴포넌트는 `export var X = /*#__PURE__*/ withRef(...)` 또는 `export function X`라서 안 쓰는 컴포넌트는 번들러가 버립니다(2.1). */
import React from "react";
import { getLocale, onLocaleChange } from "../utils.js";
export { React };

export var h = React.createElement;
export function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
export function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }

/* 2.0: ref를 받는 컴포넌트(forwardRef). react-hook-form의 register, 프로그램적 포커스가 됩니다. React 18 전용. */
export function withRef(name, render) { var C = React.forwardRef(render); C.displayName = name; return C; }

/* 최신 값을 담아 두는 ref. effect가 처음 값을 붙잡지 않게 합니다(Dialog의 onClose 등). */
export function useLatest(v) { var r = React.useRef(v); r.current = v; return r; }

/* 2.1: 제어·비제어 겸용 값. value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다. [값, 바꾸기] */
export function useControllable(value, defaultValue, onChange) {
  var st = React.useState(defaultValue), controlled = value !== undefined, cur = controlled ? value : st[0];
  var latest = useLatest(onChange);
  var set = React.useCallback(function (next) {
    if (!controlled) st[1](next);
    if (latest.current) latest.current(next);
  }, [controlled]);
  return [cur, set];
}

/* 2.1: 지금 로케일. setLocale()로 바뀌면 다시 그립니다. 서버에서는 설정된 로케일 그대로. */
export function useLocale(override) {
  var loc = React.useSyncExternalStore(onLocaleChange, getLocale, getLocale);
  return override ? Object.assign({}, loc, override) : loc;
}

/* 라디오 묶음 방향키: 선택을 옮기고 포커스도 따라갑니다. Home·End로 처음·끝. */
export function rovingKey(e, ids, current, pick, role) {
  var i = ids.indexOf(current), n = ids.length, next = null;
  if (!n) return;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i < 0 ? n - 1 : (i - 1 + n) % n;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = n - 1;
  if (next === null) return;
  e.preventDefault();
  pick(ids[next]);
  var items = e.currentTarget.querySelectorAll('[role="' + (role || "radio") + '"]');
  if (items[next]) items[next].focus();
}

/* React 18의 useId는 서버·클라이언트에서 같은 값을 만들어 하이드레이션이 어긋나지 않습니다 */
var uid = 0;
var useStableId = React.useId || function () { return React.useMemo(function () { return "bl-" + (++uid); }, []); };
export function useId(given) { var auto = useStableId(); return given || auto; }

/* 열림·닫힘 애니메이션을 가진 오버레이(Dialog·Sheet·Drawer)의 공통 동작(2.1):
   네이티브 <dialog>를 showModal()로 열고, 닫을 때는 data-closing을 붙여 애니메이션이 끝난 뒤 닫습니다.
   Esc(cancel)와 바깥 누르기로 onClose, 열 때 첫 조작 요소로, 닫으면 원래 자리로 포커스. 돌려주는 값: [보일지, dialog에 붙일 props] */
export function useModal(open, onClose, opts) {
  var o = opts || {}, ref = React.useRef(null), latest = useLatest(onClose);
  var st = React.useState(false), closing = st[0], setClosing = st[1];
  var wasOpen = React.useRef(false);
  // 그리는 중에 판단해야 open이 false가 된 그 렌더에서 dialog가 사라지지 않습니다(effect는 이미 사라진 뒤라 늦습니다)
  if (open) { wasOpen.current = true; if (closing) setClosing(false); }
  else if (wasOpen.current && !closing) { wasOpen.current = false; setClosing(true); }
  React.useEffect(function () {
    var d = ref.current;
    if (!open || !d) return;
    var prev = document.activeElement;
    if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
    var f = d.querySelector("button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])");
    (f || d).focus();
    function cancel(e) { e.preventDefault(); latest.current && latest.current(); }
    d.addEventListener("cancel", cancel);
    return function () {
      d.removeEventListener("cancel", cancel);
      if (prev && prev.focus) prev.focus();
    };
  }, [open]);
  React.useEffect(function () {
    var d = ref.current;
    if (!closing || !d) return;
    function finish() { setClosing(false); if (d.open && d.close) d.close(); }
    function onEnd(e) { if (e.target === d) finish(); }
    d.addEventListener("animationend", onEnd);                // React의 onAnimationEnd 대신 직접 듣습니다(접두어·테스트 환경과 무관하게)
    var t = setTimeout(finish, 400);                           // 동작 줄이기 등으로 애니메이션이 없으면 바로 닫습니다
    return function () { d.removeEventListener("animationend", onEnd); clearTimeout(t); };
  }, [closing]);
  function onClick(e) {
    if (o.staticBackdrop || e.target !== e.currentTarget) return;
    var r = e.currentTarget.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) latest.current && latest.current();
  }
  return [open || closing, { ref: ref, tabIndex: -1, "data-closing": closing ? "true" : undefined, onClick: onClick }];
}
