/* blurssism React · Popover · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, useId, useControllable } from "./_shared.js";

var popoverFocusable = "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

/* 버튼을 누르면 그 아래(위)에 뜨는 두꺼운 크레마 패널. 네이티브 popover="auto"라 최상위 층에 떠서 overflow: hidden인 부모에 잘리지 않고,
   바깥 누르기·Esc로 브라우저가 닫아 주면 toggle 이벤트로 상태를 맞춥니다. 열리면 안의 첫 조작 요소로, 닫히면 트리거로 포커스가 돌아갑니다.
   위치는 트리거 기준으로 스크립트가 정하고(8px 간격), 아래가 모자라면 위로 뒤집고 화면 안으로 밀어 넣습니다. */
export function Popover(p) {
  var id = useId(p.id), wrap = React.useRef(null), pop = React.useRef(null);
  var c = useControllable(p.open, !!p.defaultOpen, p.onOpenChange), open = c[0], setOpen = c[1];
  var openRef = React.useRef(open); openRef.current = open;
  var down = React.useRef(0);   // 열린 채로 트리거를 누르기 시작한 시각. 브라우저가 바깥 누르기로 먼저 닫은 뒤 click이 다시 열지 않게 합니다
  var placement = p.placement || "bottom-start";
  var set = React.useCallback(function (next) { if (openRef.current === next) return; openRef.current = next; setOpen(next); }, [setOpen]);

  React.useEffect(function () {
    var t = pop.current, a = wrap.current && (wrap.current.firstElementChild || wrap.current);
    if (!t || !a || t === a) return;
    if (!open) {
      if (t.showPopover) { if (t.matches(":popover-open")) t.hidePopover(); } else t.removeAttribute("data-open");
      return;
    }
    if (t.showPopover) { if (!t.matches(":popover-open")) t.showPopover(); } else t.setAttribute("data-open", "");
    function place() { popoverPlace(t, a, placement); }
    place();
    var f = t.querySelector(popoverFocusable);
    (f || t).focus();
    function toggle(e) { if (e.newState === "closed") set(false); }
    t.addEventListener("toggle", toggle);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return function () {
      t.removeEventListener("toggle", toggle);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      var ae = document.activeElement;   // 다른 입력창을 눌러서 닫혔으면 그 포커스는 두고, 아니면 트리거로
      if ((!ae || ae === document.body || t.contains(ae)) && a.focus) a.focus();
    };
  }, [open, placement, set]);

  var trig = p.trigger, tp = React.isValidElement(trig) ? trig.props : {};
  var child = React.isValidElement(trig) ? React.cloneElement(trig, {
    "aria-expanded": open ? "true" : "false", "aria-controls": id, "aria-haspopup": p.haspopup || "dialog",
    onPointerDown: function (e) { if (tp.onPointerDown) tp.onPointerDown(e); down.current = openRef.current ? Date.now() : 0; },
    onClick: function (e) {
      if (tp.onClick) tp.onClick(e);
      if (e.defaultPrevented) return;
      var dismissed = down.current && Date.now() - down.current < 500;
      down.current = 0;
      set(dismissed ? false : !openRef.current);
    }
  }) : trig;

  return h("span", { className: "bl-popover-anchor", ref: wrap }, child,
    h("div", { id: id, ref: pop, popover: "auto", role: "dialog", "aria-label": p.label, "aria-labelledby": p.labelledBy, tabIndex: -1,
      className: cx("bl-popover bl-crema-thick", p.className),
      onKeyDown: function (e) { if (e.key === "Escape") { e.stopPropagation(); set(false); } } }, p.children));
}

/* 트리거 기준으로 놓고, 아래(위)가 모자라면 반대쪽으로, 상하좌우는 화면 안으로 */
function popoverPlace(t, a, placement) {
  var r = a.getBoundingClientRect(), w = t.offsetWidth, hg = t.offsetHeight, gap = 8, pad = 8, vw = window.innerWidth, vh = window.innerHeight;
  var above = placement === "top";
  if (!above && r.bottom + gap + hg > vh - pad && r.top - gap - hg >= pad) above = true;
  else if (above && r.top - gap - hg < pad && r.bottom + gap + hg <= vh - pad) above = false;
  var x = placement === "bottom-end" ? r.right - w : placement === "bottom-start" ? r.left : r.left + r.width / 2 - w / 2;
  var y = above ? r.top - gap - hg : r.bottom + gap;
  t.style.left = Math.round(Math.min(Math.max(x, pad), Math.max(pad, vw - w - pad))) + "px";
  t.style.top = Math.round(Math.min(Math.max(y, pad), Math.max(pad, vh - hg - pad))) + "px";
  t.setAttribute("data-place", above ? "top" : "bottom");
}
