"use client";
/* blurssism v2.1.1 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
import React from "react";
import { palettes, backgrounds, breakpoints, version, author, setPalette, getPalette, setBackground, getBackground, setTheme, getTheme, getBreakpoint, isAtLeast, onBreakpointChange, shouldReduceCrema, probeCremaCost, isDesktopCapable, applyCremaPreference, setCremaMode, getCremaMode, locales, setLocale, getLocale, onLocaleChange, checkCrema, auditCrema, getCustomPalettes, onCustomPalettesChange, contrastRatio, createPalette, paletteToCss, applyBrandColor, createBackground, backgroundCrema, backgroundToCss, applyBackgroundColor } from "./utils.mjs";

var h = React.createElement;
function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }

/* 2.0: ref를 받는 컴포넌트(forwardRef). react-hook-form의 register, 프로그램적 포커스가 됩니다. React 18 전용. */
function withRef(name, render) { var C = React.forwardRef(render); C.displayName = name; return C; }

/* 최신 값을 담아 두는 ref. effect가 처음 값을 붙잡지 않게 합니다(Dialog의 onClose 등). */
function useLatest(v) { var r = React.useRef(v); r.current = v; return r; }

/* 2.1: 제어·비제어 겸용 값. value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다. [값, 바꾸기] */
function useControllable(value, defaultValue, onChange) {
  var st = React.useState(defaultValue), controlled = value !== undefined, cur = controlled ? value : st[0];
  var latest = useLatest(onChange);
  var set = React.useCallback(function (next) {
    if (!controlled) st[1](next);
    if (latest.current) latest.current(next);
  }, [controlled]);
  return [cur, set];
}

/* 2.1: 지금 로케일. setLocale()로 바뀌면 다시 그립니다. 서버에서는 설정된 로케일 그대로. */
function useLocale(override) {
  var loc = React.useSyncExternalStore(onLocaleChange, getLocale, getLocale);
  return override ? Object.assign({}, loc, override) : loc;
}

/* 라디오 묶음 방향키: 선택을 옮기고 포커스도 따라갑니다. Home·End로 처음·끝. */
function rovingKey(e, ids, current, pick, role) {
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
function useId(given) { var auto = useStableId(); return given || auto; }

/* 열림·닫힘 애니메이션을 가진 오버레이(Dialog·Sheet·Drawer)의 공통 동작(2.1):
   네이티브 <dialog>를 showModal()로 열고, 닫을 때는 data-closing을 붙여 애니메이션이 끝난 뒤 닫습니다.
   Esc(cancel)와 바깥 누르기로 onClose, 열 때 첫 조작 요소로, 닫으면 원래 자리로 포커스. 돌려주는 값: [보일지, dialog에 붙일 props] */
function useModal(open, onClose, opts) {
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

/* 단순 라인 아이콘 24×24, 1.75 stroke, currentColor */
var PATHS = {
  home: "M4.5 10.5L12 4l7.5 6.5V19a1 1 0 0 1-1 1H15v-5.5H9V20H5.5a1 1 0 0 1-1-1z",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  chat: "M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4 3.5V16h0.5H7.5A2.5 2.5 0 0 1 5 13.5z",
  person: "M12 12a3.75 3.75 0 1 0 0-7.5A3.75 3.75 0 0 0 12 12zM5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5",
  bell: "M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15zM10 20.5h4",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6",
  plus: "M12 5v14M5 12h14",
  spark: "M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  close: "M6.5 6.5l11 11M17.5 6.5l-11 11",
  "chevron-right": "M9.5 6l6 6-6 6",
  "chevron-left": "M14.5 6l-6 6 6 6",
  inbox: "M4 13.5l2.2-7A1.5 1.5 0 0 1 7.6 5.5h8.8a1.5 1.5 0 0 1 1.4 1l2.2 7V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18zM4 13.5h4.5l1 2h5l1-2H20",
  calendar: "M5.5 6h13a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM4.5 10.5h15M8.5 4v4M15.5 4v4",
  alert: "M12 4.5l8.5 15h-17zM12 10v4M12 16.8v.2"
};

function Icon(p) {
  var filled = p.filled && p.name === "heart";
  return h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", fill: filled ? "currentColor" : "none", stroke: "currentColor",
    strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", className: p.className }, h("path", { d: PATHS[p.name] || "" }));
}

/* 제목을 눌러 내용을 펼치는 목록. 네이티브 <details>·<summary>라 키보드·스크린리더 지원이 따라오고, JS가 없어도 열립니다.
   기본은 하나만 열림: 같은 name을 붙여 브라우저가 나머지를 닫고(Chrome 120·Safari 17.2·Firefox 130부터), 모르는 브라우저에서는 onToggle이 상태를 맞춰 닫습니다.
   multiple이면 여러 개가 열립니다. value는 하나만 열릴 때 문자열(없으면 ""), multiple이면 열린 id 배열입니다. */
function accordionOpenIds(v) { return v === undefined || v === null || v === "" ? [] : Array.isArray(v) ? v : [v]; }

function Accordion(p) {
  var base = useId(p.id), multiple = !!p.multiple, items = p.items || [];
  var st = useControllable(p.value, p.defaultValue !== undefined ? p.defaultValue : (multiple ? [] : ""), p.onChange);
  var open = accordionOpenIds(st[0]), set = st[1];
  function emit(list) { set(multiple ? list : (list.length ? list[0] : "")); }
  function onToggle(id, e) {
    var isOpen = e.currentTarget.open, has = open.indexOf(id) >= 0;
    if (isOpen === has) return;   // name으로 브라우저가 닫았거나 상태를 따라 닫힌 뒤의 toggle
    emit(isOpen ? (multiple ? open.concat(id) : [id]) : open.filter(function (x) { return x !== id; }));
  }
  return h("div", { className: cx("bl-acc", p.className) },
    items.map(function (it) {
      return h("details", { key: it.id, className: "bl-acc-item", open: open.indexOf(it.id) >= 0, name: multiple ? undefined : base,
        onToggle: function (e) { onToggle(it.id, e); } },
        h("summary", { className: "bl-acc-summary" },
          it.icon ? h(Icon, { name: it.icon, className: "bl-acc-icon" }) : null,
          h("span", { className: "bl-acc-title" }, it.title),
          h(Icon, { name: "chevron-right", className: "bl-acc-chevron" })),
        h("div", { className: "bl-acc-body" }, it.content));
    }));
}

var alertIcons = { info: "spark", positive: "check", warning: "alert", danger: "alert" };

/* 흐름 안에 놓이는 불투명 안내 띠(떠 있지 않으므로 크레마가 아님). 색만으로 알리지 않도록 아이콘이 항상 붙습니다.
   info·positive는 role="status", warning·danger는 role="alert"(바로 읽힘). ref는 바깥 div. */
var Alert = /*#__PURE__*/ withRef("Alert", function (p, ref) {
  var tone = p.tone || "info", L = useLocale(p.locale), urgent = tone === "warning" || tone === "danger";
  return h("div", Object.assign(omit(p, ["tone", "title", "icon", "actions", "onDismiss", "className", "children", "locale", "role"]), {
    ref: ref, className: cx("bl-alert", "bl-alert-" + tone, p.className), role: p.role || (urgent ? "alert" : "status")
  }),
    h(Icon, { name: p.icon || alertIcons[tone] || "spark", className: "bl-alert-icon" }),
    h("div", { className: "bl-alert-body" },
      p.title ? h("p", { className: "bl-alert-title" }, p.title) : null,
      p.children != null ? h("div", { className: "bl-alert-text" }, p.children) : null,
      p.actions ? h("div", { className: "bl-alert-actions" }, p.actions) : null),
    p.onDismiss ? h(IconButton, { plain: true, icon: "close", label: L.dismiss, className: "bl-alert-close", onClick: p.onDismiss }) : null);
});

function Avatar(p) {
  var nm = (p.name || "").trim(), initials = /^\+\d+$/.test(nm) ? nm : nm.slice(0, /[A-Za-z]/.test(nm[0]) ? 2 : 1).toUpperCase();
  return h("span", { className: cx("bl-avatar", p.size && p.size !== "md" && "bl-avatar-" + p.size, p.className), role: "img", "aria-label": p.name },
    p.image ? h("img", { src: p.image, alt: "" }) : initials);
}

function Badge(p) {
  return h("span", { className: cx("bl-badge", "bl-badge-" + (p.tone || "neutral"), p.className) }, p.icon ? h(Icon, { name: p.icon }) : null, p.children);
}

/* 2.0: primary는 강조색(accent) 채움입니다. "accent"는 primary의 별칭(같은 클래스)이라 화면당 하나 규칙을 함께 셉니다. */
var Button = /*#__PURE__*/ withRef("Button", function (p, ref) {
  var variant = p.variant || "primary", tag = p.href ? "a" : "button";
  if (variant === "accent") variant = "primary";
  return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["variant", "size", "block", "icon", "className", "children"]), {
    ref: ref,
    className: cx("bl-btn", "bl-btn-" + variant, p.size === "md" && "bl-btn-md", p.block && "bl-btn-block", p.className)
  }), p.icon ? h(Icon, { name: p.icon }) : null, p.children);
});

function sameDay(a, b) { return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function dayOf(d) { return d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null; }   // 시각을 버리고 날짜만

function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }

/* 방향키 ±1일·±1주, Home·End 주의 처음·끝, PageUp·PageDown 이전·다음 달(Shift는 해). 고를 수 없는 날도 포커스는 갑니다. */
function calendarKey(e, d) {
  var k = e.key;
  if (k === "ArrowRight") return addDays(d, 1);
  if (k === "ArrowLeft") return addDays(d, -1);
  if (k === "ArrowDown") return addDays(d, 7);
  if (k === "ArrowUp") return addDays(d, -7);
  if (k === "Home") return addDays(d, -d.getDay());
  if (k === "End") return addDays(d, 6 - d.getDay());
  if (k === "PageUp" || k === "PageDown") {
    var dir = k === "PageUp" ? -1 : 1, y = d.getFullYear() + (e.shiftKey ? dir : 0), m = d.getMonth() + (e.shiftKey ? 0 : dir);
    return new Date(y, m, Math.min(d.getDate(), new Date(y, m + 1, 0).getDate()));
  }
  return null;
}

function Calendar(p) {
  var L = useLocale(p.locale), DOW = L.dow;
  // 오늘은 마운트한 뒤에 정합니다. 서버(UTC)와 브라우저의 날짜가 달라 하이드레이션이 어긋나지 않게.
  var nowSt = React.useState(null), today = p.today || nowSt[0];
  React.useEffect(function () { if (!p.today) nowSt[1](new Date()); }, []);
  var init = p.value || p.today || new Date();
  var st = React.useState(new Date(init.getFullYear(), init.getMonth(), 1)), month = st[0], setMonth = st[1];
  var vKey = p.value ? p.value.getFullYear() * 12 + p.value.getMonth() : null;
  React.useEffect(function () { if (p.value) setMonth(new Date(p.value.getFullYear(), p.value.getMonth(), 1)); }, [vKey]);   // 바깥에서 값이 다른 달로 바뀌면 따라갑니다
  var act = React.useState(null), active = act[0], setActive = act[1], grid = React.useRef(null), wantFocus = React.useRef(false);
  var y = month.getFullYear(), m = month.getMonth(), lo = dayOf(p.min), hi = dayOf(p.max);
  var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), cells = [];
  function inMonth(d) { return d && d.getFullYear() === y && d.getMonth() === m; }
  function off(d) { return (lo && d < lo) || (hi && d > hi); }
  var tab = inMonth(active) ? active : inMonth(p.value) ? dayOf(p.value) : inMonth(today) ? dayOf(today) : new Date(y, m, 1);
  React.useEffect(function () {
    if (!wantFocus.current || !grid.current) return;
    wantFocus.current = false;
    var b = grid.current.querySelector('[tabindex="0"]');
    if (b) b.focus();
  });
  function onKey(e) {
    var next = calendarKey(e, tab);
    if (!next) return;
    e.preventDefault();
    wantFocus.current = true;
    setActive(next);
    if (!inMonth(next)) setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  }
  for (var i = 0; i < first; i++) cells.push(h("span", { key: "b" + i }));
  for (var d = 1; d <= days; d++) (function (d) {
    var date = new Date(y, m, d), no = !!off(date);
    cells.push(h("button", { key: d, type: "button", className: "bl-cal-day", "aria-disabled": no ? "true" : undefined, tabIndex: sameDay(date, tab) ? 0 : -1,
      "aria-pressed": String(sameDay(date, p.value)), "data-today": String(sameDay(date, today)),
      "aria-label": L.dayLabel(y, m, d, DOW[date.getDay()]),
      onClick: function () { setActive(date); if (!no && p.onChange) p.onChange(date); } }, d));
  })(d);
  function go(n) { setActive(null); setMonth(new Date(y, m + n, 1)); }
  return h("div", { className: cx("bl-cal", p.className) },
    h("div", { className: "bl-cal-head" },
      h(IconButton, { icon: "chevron-left", label: L.prevMonth, plain: true, onClick: function () { go(-1); } }),
      h("p", { className: "bl-cal-title", "aria-live": "polite" }, L.monthTitle(y, m)),
      h(IconButton, { icon: "chevron-right", label: L.nextMonth, plain: true, onClick: function () { go(1); } })),
    h("div", { className: "bl-cal-grid", ref: grid, onKeyDown: onKey }, DOW.map(function (w, i) { return h("span", { key: i, className: "bl-cal-dow", "aria-hidden": "true" }, w); }), cells));
}

function Card(p) {
  return h("article", { className: cx("bl-card", p.className) },
    p.eyebrow ? h("p", { className: "bl-card-eyebrow" }, p.eyebrow) : null,
    p.title ? h("h3", { className: "bl-card-title" }, p.title) : null,
    p.quote ? h("p", { className: "bl-card-quote" }, p.quote) : null,
    p.body ? h("p", { className: "bl-card-body" }, p.body) : null,
    p.children ? h("div", { className: "bl-card-actions" }, p.children) : null);
}

/* ref는 <input type="checkbox">에 닿습니다 */
var Checkbox = /*#__PURE__*/ withRef("Checkbox", function (p, ref) {
  return h("label", { className: cx("bl-check", p.className) },
    h("input", Object.assign({ type: "checkbox", ref: ref }, omit(p, ["label", "description", "className"]))),
    h("span", null, p.label, p.description ? h("span", { className: "bl-check-sub" }, p.description) : null));
});

/* selected를 주면 제어 모드, 안 주면 누를 때마다 스스로 바뀝니다(defaultSelected로 처음 값). onChange(다음 값)를 부릅니다. */
var Chip = /*#__PURE__*/ withRef("Chip", function (p, ref) {
  var st = React.useState(!!p.defaultSelected), on = p.selected != null ? !!p.selected : st[0];
  return h("button", Object.assign({ type: "button" }, omit(p, ["selected", "defaultSelected", "onChange", "className", "children"]), {
    ref: ref, className: cx("bl-chip", p.className), "aria-pressed": String(on),
    onClick: function (e) {
      if (p.selected == null) st[1](!on);
      p.onChange && p.onChange(!on);
      p.onClick && p.onClick(e);
    }
  }), on ? h(Icon, { name: "check" }) : null, p.children);
});

var Container = /*#__PURE__*/ withRef("Container", function (p, ref) {
  var tag = p.as || "div";
  return h(tag, Object.assign({}, omit(p, ["as", "size", "className", "children"]), {
    ref: ref, className: cx("bl-container", p.size === "prose" && "bl-container-prose", p.size === "full" && "bl-container-full", p.className) }), p.children);
});

/* 네이티브 <dialog>를 showModal()로 엽니다. 최상위 층에 떠서 크레마 안에서 열어도 갇히지 않고, 뒤 화면은 inert가 됩니다.
   Esc·바깥 누르기로 onClose(alert면 바깥 누르기로는 닫지 않음). 열 때 첫 조작 요소로, 닫으면 원래 자리로 포커스를 돌려줍니다.
   2.1: 닫힐 때도 애니메이션이 끝난 뒤 사라집니다(useModal의 data-closing). */
function Dialog(p) {
  var id = useId(), m = useModal(p.open, p.onClose, { staticBackdrop: p.alert }), visible = m[0], dp = m[1];
  if (!visible) return null;
  return h("dialog", Object.assign({ className: cx("bl-dialog bl-crema-thick", p.className), role: p.alert ? "alertdialog" : undefined,
    "aria-labelledby": id, "aria-describedby": p.description ? id + "-desc" : undefined }, dp),
    h("h2", { id: id, className: "bl-dialog-title" }, p.title),
    p.description ? h("p", { id: id + "-desc", className: "bl-dialog-body" }, p.description) : null,
    p.children ? h("div", { className: "bl-dialog-actions" }, p.children) : null);
}

/* 옆에서 미끄러져 들어오는 패널. 네이티브 <dialog>를 showModal()로 열어(useModal) 최상위 층에 뜨고, 뒤 화면은 inert, Esc·바깥 누르기로 onClose,
   닫을 때는 data-closing 애니메이션이 끝난 뒤 닫힙니다. persistentFrom("lg"·"xl")을 주면 그 단계부터는 다이얼로그 대신
   불투명한 <aside class="bl-drawer-persistent">가 보여서(미디어쿼리로 바꿈) 데스크톱 사이드바가 됩니다. 그때는 다이얼로그를 열지 않습니다. */
function Drawer(p) {
  var L = useLocale(p.locale), id = useId(), side = p.side === "right" ? "right" : "left", from = p.persistentFrom || false;
  var wide = React.useSyncExternalStore(onBreakpointChange, function () { return !!from && isAtLeast(from); }, function () { return false; });
  var m = useModal(!!p.open && !wide, p.onClose), visible = m[0], dp = m[1];
  var style = p.width ? { "--bl-drawer-width": typeof p.width === "number" ? p.width + "px" : p.width } : undefined;
  function head(closable, tid) {
    return h("div", { className: "bl-drawer-head" },
      p.title ? h("h2", { id: tid, className: "bl-drawer-title" }, p.title) : h("span"),
      closable ? h(IconButton, { icon: "close", label: L.close, plain: true, className: "bl-drawer-close", onClick: p.onClose }) : null);
  }
  var dialog = h("dialog", Object.assign({ className: cx("bl-drawer bl-crema-thick", from && "bl-hide-from-" + from, p.className), "data-side": side, style: style,
      "aria-labelledby": p.title ? id : undefined, "aria-label": p.title ? undefined : p.label }, dp),
    visible ? head(true, id) : null,
    visible ? h("div", { className: "bl-drawer-body" }, p.children) : null);
  if (!from) return dialog;
  return h(React.Fragment, null, dialog,
    h("aside", { className: cx("bl-drawer bl-drawer-persistent bl-hide-below-" + from, p.className), "data-side": side, style: style,
        "aria-labelledby": p.title ? id + "-p" : undefined, "aria-label": p.title ? undefined : p.label },
      p.title ? head(false, id + "-p") : null,
      h("div", { className: "bl-drawer-body" }, p.children)));
}

function EmptyState(p) {
  return h("div", { className: cx("bl-empty", p.className) },
    h("span", { className: "bl-empty-icon" }, h(Icon, { name: p.icon || "inbox" })),
    h("p", { className: "bl-empty-title" }, p.title),
    p.body ? h("p", { className: "bl-empty-body" }, p.body) : null,
    p.children || null);
}

/* columns: 숫자 또는 { xs, sm, md, lg, xl } — 단계별 열 수. 생략한 단계는 아래 단계 값을 이어받습니다. */
var Grid = /*#__PURE__*/ withRef("Grid", function (p, ref) {
  var c = typeof p.columns === "number" ? { xs: p.columns } : (p.columns || { xs: 1, sm: 2, lg: 3 });
  var style = {}, last = 1;
  ["xs", "sm", "md", "lg", "xl"].forEach(function (bp) { if (c[bp] != null) last = c[bp]; style["--bl-cols-" + bp] = last; });
  if (p.gap) style["--bl-grid-gap"] = "var(--" + p.gap + ")";
  return h(p.as || "div", Object.assign({}, omit(p, ["as", "columns", "gap", "className", "children", "style"]), {
    ref: ref, className: cx("bl-autogrid", p.className), style: Object.assign(style, p.style) }), p.children);
});

var IconButton = /*#__PURE__*/ withRef("IconButton", function (p, ref) {
  return h("button", Object.assign({ type: "button" }, omit(p, ["icon", "label", "pressed", "plain", "className"]), {
    ref: ref, className: cx("bl-icon-btn", p.plain && "bl-icon-btn-plain", p.className), "aria-label": p.label,
    "aria-pressed": p.pressed == null ? undefined : String(!!p.pressed)
  }), h(Icon, { name: p.icon, filled: !!p.pressed }));
});

/* 본문 안의 글자 링크(accent-ink + 밑줄). external이면 새 창으로 열고, 스크린리더 문구와 작은 화살표를 붙입니다. ref는 <a>. */
var Link = /*#__PURE__*/ withRef("Link", function (p, ref) {
  var L = useLocale(p.locale), ext = !!p.external;
  return h("a", Object.assign(omit(p, ["external", "muted", "className", "children", "locale"]), ext ? { target: "_blank", rel: "noopener noreferrer" } : {}, {
    ref: ref, className: cx("bl-link", p.muted && "bl-link-muted", p.className)
  }),
    p.children,
    ext ? h("span", { className: "bl-sr-only" }, " " + L.openInNew) : null,
    ext ? h(Icon, { name: "chevron-right", className: "bl-link-ext" }) : null);
});

var ListItem = /*#__PURE__*/ withRef("ListItem", function (p, ref) {
  var tag = p.href ? "a" : p.onClick ? "button" : "div";
  var trail = p.trailing !== undefined ? p.trailing : (tag !== "div" ? h(Icon, { name: "chevron-right" }) : null);
  return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["icon", "title", "subtitle", "trailing", "className"]), {
    ref: ref, className: cx("bl-item", p.className) }),
    p.icon ? h("span", { className: "bl-item-lead" }, h(Icon, { name: p.icon })) : null,
    h("span", { className: "bl-item-text" },
      h("span", { className: "bl-item-title" }, p.title),
      p.subtitle ? h("span", { className: "bl-item-sub" }, p.subtitle) : null),
    trail ? h("span", { className: "bl-item-trail" }, trail) : null);
});

function MediaCard(p) {
  var ph = h("div", { className: "bl-media-ph", "aria-hidden": "true" },
    h("i", { style: { left: "-12%", top: "8%", width: "70%", height: "56%", borderRadius: "var(--radius-full)", background: "var(--deco)" } }),
    h("i", { style: { right: "-10%", top: "28%", width: "52%", height: "64%", borderRadius: "var(--radius-xl)", background: "var(--accent)" } }),
    h("i", { style: { left: "18%", bottom: "-6%", width: "46%", height: "30%", borderRadius: "var(--radius-full)", background: "var(--positive)" } }));
  return h("article", { className: cx("bl-media", p.className), style: p.ratio ? { aspectRatio: p.ratio } : undefined },
    p.image ? h("img", { className: "bl-media-img", src: p.image, alt: p.imageAlt || "" }) : ph,
    p.badge ? h(Badge, { tone: p.badgeTone || "positive", icon: p.badgeIcon }, p.badge) : null,
    h("div", { className: "bl-media-bar " + (p.lite ? "bl-crema-lite" : "bl-crema") },
      h("div", { className: "bl-media-text" },
        h("p", { className: "bl-media-title" }, p.title),
        p.meta ? h("p", { className: "bl-media-meta" }, p.meta) : null),
      p.action || null));
}

/* Popover 위에 얹은 행동 메뉴. items의 "-"는 구분선. 방향키·Home·End로 옮기고 Enter·Space로 고르면 onSelect(id) 뒤에 닫힙니다.
   disabled 항목은 포커스는 받되(aria-disabled) 고를 수 없습니다. href가 있으면 <a>로 그립니다. */
function Menu(p) {
  var L = useLocale(p.locale), label = p.label || L.menu;
  var c = useControllable(p.open, !!p.defaultOpen, p.onOpenChange), open = c[0], setOpen = c[1];
  var st = React.useState(null), cur = st[0], setCur = st[1];
  var items = p.items || [], ids = [];
  items.forEach(function (it) { if (it !== "-") ids.push(it.id); });
  return h(Popover, { trigger: p.trigger, open: open, onOpenChange: setOpen, placement: p.placement, label: label, haspopup: "menu", className: cx("bl-menu-pop", p.className) },
    h("div", { role: "menu", className: "bl-menu", "aria-label": label,
      onKeyDown: function (e) {
        if (e.key === " " && e.target.tagName === "A") { e.preventDefault(); e.target.click(); return; }   // 링크 항목도 Space로
        rovingKey(e, ids, cur, setCur, "menuitem");
      } },
      items.map(function (it, i) {
        if (it === "-") return h("div", { key: "sep" + i, role: "separator", className: "bl-menu-sep" });
        var props = { key: it.id, role: "menuitem", className: "bl-menu-item", tabIndex: (cur ? cur === it.id : ids[0] === it.id) ? 0 : -1,
          "data-danger": it.danger ? "true" : undefined, "aria-disabled": it.disabled ? "true" : undefined,
          onFocus: function () { setCur(it.id); },
          onClick: function (e) {
            if (it.disabled) { e.preventDefault(); return; }
            setOpen(false);
            if (p.onSelect) p.onSelect(it.id);
          } };
        var body = [it.icon ? h(Icon, { key: "i", name: it.icon }) : null, h("span", { key: "l", className: "bl-menu-label" }, it.label)];
        return it.href ? h("a", Object.assign(props, { href: it.href }), body) : h("button", Object.assign(props, { type: "button" }), body);
      })));
}

function NavBar(p) {
  var L = useLocale(p.locale);
  return h("header", { className: cx("bl-navbar bl-crema", p.className) },
    p.onBack ? h(IconButton, { icon: "chevron-left", label: L.back, plain: true, onClick: p.onBack }) : null,
    h("p", { className: "bl-navbar-title" }, p.title),
    p.links ? h("nav", { className: "bl-navbar-links", "aria-label": L.siteMenu }, p.links.map(function (l) {
      return h("a", { key: l.href, href: l.href, className: "bl-navbar-link", "aria-current": l.current ? "page" : undefined }, l.label);
    })) : null,
    p.actions || null);
}

/* 보일 페이지 번호 목록. 처음·끝은 항상, 지금 페이지 양옆으로 siblings개. 건너뛰는 곳은 null(…). */
function paginationRange(page, count, siblings) {
  var s = siblings == null ? 1 : Math.max(0, siblings), total = s * 2 + 5, i, out = [];
  function run(a, b) { for (var k = a; k <= b; k++) out.push(k); }
  if (count <= total) { run(1, count); return out; }
  var left = Math.max(page - s, 1), right = Math.min(page + s, count);
  var dotsLeft = left > 2, dotsRight = right < count - 1, n = s * 2 + 3;
  if (!dotsLeft && dotsRight) { run(1, n); out.push(null); out.push(count); }
  else if (dotsLeft && !dotsRight) { out.push(1); out.push(null); run(count - n + 1, count); }
  else { out.push(1); out.push(null); run(left, right); out.push(null); out.push(count); }
  for (i = 0; i < out.length; i++) if (out[i] !== null && (out[i] < 1 || out[i] > count)) out.splice(i--, 1);
  return out;
}

/* page를 주면 제어 모드, 안 주면 defaultPage(기본 1)에서 시작해 스스로 바뀝니다. onChange(다음 페이지). ref는 <nav>. */
var Pagination = /*#__PURE__*/ withRef("Pagination", function (p, ref) {
  var L = useLocale(p.locale), count = Math.max(1, p.count | 0);
  var c = useControllable(p.page, p.defaultPage || 1, p.onChange), page = Math.min(Math.max(1, c[0] | 0), count), go = c[1];
  var items = paginationRange(page, count, p.siblings);
  return h("nav", Object.assign(omit(p, ["page", "defaultPage", "onChange", "count", "siblings", "label", "className", "locale"]), {
    ref: ref, className: cx("bl-pagination", p.className), "aria-label": p.label || L.pageOf(page, count)
  }),
    h(IconButton, { plain: true, icon: "chevron-left", label: L.prevPage, disabled: page <= 1, onClick: function () { if (page > 1) go(page - 1); } }),
    h("ul", { className: "bl-pagination-list" }, items.map(function (n, i) {
      return h("li", { key: n === null ? "gap" + i : n },
        n === null ? h("span", { className: "bl-page-gap", "aria-hidden": "true" }, "…")
          : h("button", { type: "button", className: "bl-page", "aria-label": L.page(n), "aria-current": n === page ? "page" : undefined,
              onClick: function () { if (n !== page) go(n); } }, String(n)));
    })),
    h(IconButton, { plain: true, icon: "chevron-right", label: L.nextPage, disabled: page >= count, onClick: function () { if (page < count) go(page + 1); } }));
});

/* 팔레트 라디오 묶음. 방향키로 고르고(포커스도 따라감), 고른 것에는 체크 표시가 붙습니다.
   applyBrandColor()로 등록한 브랜드 팔레트도 함께 보여 줍니다(custom={false}로 숨김). */
function PalettePicker(p) {
  var L = useLocale(p.locale);
  var st = React.useState(p.value || "black"), cur = p.value || st[0];
  var cs = React.useState([]), custom = cs[0];   // 서버와 첫 렌더는 빈 목록(하이드레이션), 마운트 뒤에 채웁니다
  React.useEffect(function () {
    if (!p.value) st[1](getPalette(p.target));
    cs[1](getCustomPalettes());
    return onCustomPalettesChange(function () { cs[1](getCustomPalettes()); });
  }, []);
  function pick(id) {
    if (!p.value) st[1](id);
    if (p.apply !== false) setPalette(id, p.target);
    p.onChange && p.onChange(id);
  }
  var list = palettes.filter(function (pl) { return !p.group || pl.group === p.group; })
    .concat(p.custom === false || (p.group && p.group !== "custom") ? [] : custom);
  var ids = list.map(function (pl) { return pl.id; }), tab = ids.indexOf(cur) >= 0 ? cur : ids[0];
  return h("div", { className: cx("bl-palettes", p.className), role: "radiogroup", "aria-label": p.label || L.palette,
    onKeyDown: function (e) { rovingKey(e, ids, cur, pick); } },
    list.map(function (pl) {
      var on = pl.id === cur;
      return h("button", { key: pl.id, type: "button", role: "radio", "aria-checked": String(on), tabIndex: pl.id === tab ? 0 : -1, className: "bl-palette", "aria-label": pl.name,
        "data-palette": pl.id, onClick: function () { pick(pl.id); } },
        h("span", { className: "bl-palette-dot", "aria-hidden": "true" }),
        h("span", { className: p.compact ? "bl-sr-only" : "bl-palette-name" }, pl.name));
    }));
}

var popoverFocusable = "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

/* 버튼을 누르면 그 아래(위)에 뜨는 두꺼운 크레마 패널. 네이티브 popover="auto"라 최상위 층에 떠서 overflow: hidden인 부모에 잘리지 않고,
   바깥 누르기·Esc로 브라우저가 닫아 주면 toggle 이벤트로 상태를 맞춥니다. 열리면 안의 첫 조작 요소로, 닫히면 트리거로 포커스가 돌아갑니다.
   위치는 트리거 기준으로 스크립트가 정하고(8px 간격), 아래가 모자라면 위로 뒤집고 화면 안으로 밀어 넣습니다. */
function Popover(p) {
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

function Progress(p) {
  var max = p.max || 100, pct = Math.max(0, Math.min(100, (p.value / max) * 100));
  return h("div", { className: cx("bl-progress", p.className) },
    p.label ? h("div", { className: "bl-progress-head" }, h("span", null, p.label), h("span", null, p.valueText || Math.round(pct) + "%")) : null,
    h("div", { className: "bl-progress-track", role: "progressbar", "aria-label": p.label, "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": p.value },
      h("div", { className: "bl-progress-fill", style: { width: pct + "%" } })));
}

/* value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다(2.1). */
var RadioGroup = /*#__PURE__*/ withRef("RadioGroup", function (p, ref) {
  var name = useId(p.name);
  var c = useControllable(p.value, p.defaultValue, p.onChange), value = c[0], pick = c[1];
  return h("fieldset", { ref: ref, className: cx("bl-radios", p.className) },
    p.legend ? h("legend", null, p.legend) : null,
    (p.options || []).map(function (o) {
      o = typeof o === "string" ? { value: o, label: o } : o;
      return h("label", { key: o.value, className: "bl-check" },
        h("input", { type: "radio", name: name, value: o.value, checked: value === o.value, disabled: o.disabled,
          onChange: function () { pick(o.value); } }),
        h("span", null, o.label, o.description ? h("span", { className: "bl-check-sub" }, o.description) : null));
    }));
});

/* value를 주면 제어 모드, 안 주면 defaultValue(없으면 첫 항목)에서 시작해 스스로 바뀝니다(2.1). */
function SegmentedControl(p) {
  var items = p.items || [], ids = items.map(function (i) { return i.id; });
  var c = useControllable(p.value, p.defaultValue !== undefined ? p.defaultValue : ids[0], p.onChange), value = c[0], pick = c[1];
  var tab = ids.indexOf(value) >= 0 ? value : ids[0];   // 고른 것이 없으면 첫 항목으로 들어옵니다
  return h("div", { className: cx("bl-seg", p.block && "bl-seg-block", p.className), role: "radiogroup", "aria-label": p.label,
    onKeyDown: function (e) { rovingKey(e, ids, value, pick); } },
    items.map(function (it) {
      var on = it.id === value;
      return h("button", { key: it.id, type: "button", role: "radio", className: "bl-seg-item", "aria-checked": String(on), tabIndex: it.id === tab ? 0 : -1,
        onClick: function () { pick(it.id); } }, it.label);
    }));
}

/* ref는 <select>에 닿습니다 */
var Select = /*#__PURE__*/ withRef("Select", function (p, ref) {
  var id = useId(p.id), help = p.error || p.help, L = useLocale(p.locale);
  // placeholder가 있고 값이 정해지지 않았으면 빈 값("")에서 시작해 placeholder가 보이게 합니다(Svelte와 같게).
  var start = p.placeholder && p.value === undefined && p.defaultValue === undefined ? { defaultValue: "" } : {};
  return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
    h("label", { className: "bl-field-label", htmlFor: id }, p.label),
    h("div", { className: "bl-select" },
      h("select", Object.assign(start, omit(p, ["label", "help", "error", "className", "id", "options", "placeholder", "locale"]), {
        ref: ref, id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
      }),
        p.placeholder ? h("option", { value: "", disabled: true }, p.placeholder) : null,
        (p.options || []).map(function (o) { o = typeof o === "string" ? { value: o, label: o } : o; return h("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label); }))),
    help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? L.errorPrefix + p.error : p.help) : null);
});

/* 두꺼운 크레마 바텀시트.
   2.1: open을 주면 스스로 열고 닫는 모달이 됩니다(네이티브 <dialog>, scrim, Esc·바깥 누르기·손잡이 끌어내리기로 onClose, 포커스 복귀, 닫힘 애니메이션).
   open을 주지 않으면 전처럼 자리에 그려지는 면(열고 닫기는 소비자 몫)입니다. md(768px) 이상에서는 가운데 카드로 뜹니다. */
function Sheet(p) {
  var modal = p.open !== undefined, id = useId(), onClose = useLatest(p.onClose);
  var m = useModal(modal ? p.open : false, p.onClose), visible = m[0], dp = m[1];
  var drag = React.useRef(null);   // { y0, el }
  function down(e) {
    if (!modal || e.pointerType === "mouse" && e.button !== 0) return;
    var el = e.currentTarget.parentElement;
    drag.current = { y0: e.clientY, el: el };
    e.currentTarget.setPointerCapture(e.pointerId);
    el.style.transition = "none";
  }
  function move(e) {
    var d = drag.current;
    if (!d) return;
    var dy = Math.max(0, e.clientY - d.y0);
    d.el.style.transform = "translateY(" + dy + "px)";
  }
  function up(e) {
    var d = drag.current;
    if (!d) return;
    drag.current = null;
    var dy = Math.max(0, e.clientY - d.y0);
    d.el.style.transition = ""; d.el.style.transform = "";
    if (dy > 80 && onClose.current) onClose.current();
  }
  var body = [
    h("div", { key: "g", className: "bl-sheet-grip", "aria-hidden": "true", onPointerDown: modal ? down : undefined, onPointerMove: modal ? move : undefined, onPointerUp: modal ? up : undefined, onPointerCancel: modal ? up : undefined }),
    h("h2", { key: "t", id: id, className: "bl-sheet-title" }, p.title),
    p.description ? h("p", { key: "d", id: id + "-desc", className: "bl-sheet-body" }, p.description) : null,
    h("div", { key: "a", className: "bl-sheet-actions" }, p.children)];
  if (!modal) return h("div", { className: cx("bl-sheet bl-crema-thick", p.className), role: "dialog", "aria-labelledby": id }, body);
  if (!visible) return null;
  return h("dialog", Object.assign({ className: cx("bl-sheet bl-sheet-modal bl-crema-thick", p.className),
    "aria-labelledby": id, "aria-describedby": p.description ? id + "-desc" : undefined }, dp), body);
}

function Skeleton(p) {
  return h("span", { className: cx("bl-skel", p.className), "aria-hidden": "true",
    style: { width: p.width || "100%", height: p.height || 16, borderRadius: p.circle ? "var(--radius-full)" : undefined } });
}

/* checked를 주면 제어 모드, 안 주면 defaultChecked에서 시작해 스스로 바뀝니다(2.1). onChange(다음 값) */
var Switch = /*#__PURE__*/ withRef("Switch", function (p, ref) {
  var c = useControllable(p.checked, !!p.defaultChecked, p.onChange), on = c[0], set = c[1];
  return h("button", Object.assign({ type: "button", role: "switch" }, omit(p, ["checked", "defaultChecked", "onChange", "label", "className"]), {
    ref: ref, className: cx("bl-switch", p.className), "aria-checked": String(!!on), "aria-label": p.label,
    onClick: function () { set(!on); }
  }));
});

/* 화면 이동 메뉴라 탭(tablist)이 아니라 <nav>와 aria-current를 씁니다. 항목에 href가 있으면 링크로.
   기본으로 lg(1120px)부터 숨습니다(그때는 NavBar 링크). 계속 보이려면 hideFrom={false}.
   value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다(2.1). */
function TabBar(p) {
  var L = useLocale(p.locale);
  var hide = p.hideFrom === undefined ? "lg" : p.hideFrom;
  var c = useControllable(p.value, p.defaultValue, p.onChange), value = c[0], pick = c[1];
  return h("nav", { className: cx("bl-tabbar bl-crema", hide && "bl-hide-from-" + hide, p.className), "aria-label": p.label || L.mainMenu },
    (p.items || []).map(function (it) {
      var on = it.id === value;
      return h(it.href ? "a" : "button", Object.assign(it.href ? { href: it.href } : { type: "button" }, {
        key: it.id, className: "bl-tab", "aria-current": on ? "page" : undefined,
        onClick: function () { pick(it.id); } }), h(Icon, { name: it.icon, filled: on }), it.label);
    }));
}

/* 칸 그리기: render(행) → 노드, format(행) → 글자(Svelte와 같음). caption이 있을 때만 가로 스크롤 영역에 이름과 포커스를 줍니다. */
function Table(p) {
  return h("div", p.caption ? { className: "bl-table-wrap", tabIndex: 0, role: "region", "aria-label": p.caption } : { className: "bl-table-wrap" },
    h("table", { className: cx("bl-table", p.className) },
      p.caption ? h("caption", null, p.caption) : null,
      h("thead", null, h("tr", null, p.columns.map(function (c) { return h("th", { key: c.key, scope: "col", className: c.numeric ? "bl-num" : undefined }, c.label); }))),
      h("tbody", null, p.rows.map(function (r, i) {
        return h("tr", { key: r.id || i }, p.columns.map(function (c) {
          return h("td", { key: c.key, className: c.numeric ? "bl-num" : undefined }, c.render ? c.render(r) : c.format ? c.format(r) : r[c.key]);
        }));
      }))));
}

/* 같은 화면 안에서 내용 묶음을 바꾸는 콘텐츠 탭(WAI-ARIA tablist). 화면을 옮기는 하단 메뉴는 TabBar입니다.
   지금 탭만 Tab 순서에 들고, 방향키·Home·End가 포커스와 선택을 함께 옮깁니다(비활성 탭은 건너뜀).
   패널은 지금 것만 그립니다. keepMounted면 나머지도 그려 두고 hidden으로 숨깁니다(입력 상태를 지키고 싶을 때). */
function Tabs(p) {
  var L = useLocale(p.locale), base = useId(p.id), items = p.items || [], variant = p.variant || "line";
  var ids = items.filter(function (i) { return !i.disabled; }).map(function (i) { return i.id; });
  var st = useControllable(p.value, p.defaultValue !== undefined ? p.defaultValue : ids[0], p.onChange), set = st[1];
  var cur = ids.indexOf(st[0]) >= 0 ? st[0] : ids[0];   // 없거나 비활성인 값이면 첫 활성 탭
  function tabId(id) { return base + "-tab-" + id; }
  function panelId(id) { return base + "-panel-" + id; }
  function pick(id) { if (id !== cur) set(id); }
  function onKeyDown(e) {
    var picked = null, list = e.currentTarget;
    rovingKey(e, ids, cur, function (id) { picked = id; }, "tab");   // rovingKey는 전체 탭 순서로 포커스하므로 비활성 탭이 있으면 아래에서 id로 다시 맞춥니다
    if (picked === null) return;
    pick(picked);
    var el = list.ownerDocument.getElementById(tabId(picked));
    if (el) el.focus();
  }
  return h("div", { className: cx("bl-tabs", "bl-tabs-" + variant, p.className) },
    h("div", { className: "bl-tabs-list", role: "tablist", "aria-label": p.label || L.tabs, onKeyDown: onKeyDown },
      items.map(function (it) {
        var on = it.id === cur, mounted = on || !!p.keepMounted;
        return h("button", { key: it.id, type: "button", role: "tab", id: tabId(it.id), className: "bl-tabs-tab",
          "aria-selected": String(on), "aria-controls": mounted ? panelId(it.id) : undefined, tabIndex: on ? 0 : -1,
          disabled: it.disabled || undefined, onClick: function () { pick(it.id); } },
          it.icon ? h(Icon, { name: it.icon }) : null, h("span", null, it.label));
      })),
    items.map(function (it) {
      var on = it.id === cur;
      if (!on && !p.keepMounted) return null;
      return h("div", { key: it.id, role: "tabpanel", id: panelId(it.id), "aria-labelledby": tabId(it.id), className: "bl-tabs-panel",
        tabIndex: 0, hidden: on ? undefined : true }, it.panel);
    }));
}

/* ref는 <input>에 닿습니다 */
var TextField = /*#__PURE__*/ withRef("TextField", function (p, ref) {
  var id = useId(p.id), help = p.error || p.help, L = useLocale(p.locale);
  return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
    h("label", { className: "bl-field-label", htmlFor: id }, p.label),
    h("input", Object.assign({}, omit(p, ["label", "help", "error", "className", "id", "locale"]), {
      ref: ref, id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
    })),
    help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? L.errorPrefix + p.error : p.help) : null);
});

/* autoResize: 숨은 측정 요소 없이 scrollHeight로 높이를 맞춥니다. maxRows를 넘으면 그 높이에서 멈추고 안쪽이 스크롤됩니다. */
function textareaFit(el, maxRows) {
  if (!el) return;
  var cs = getComputedStyle(el), line = parseFloat(cs.lineHeight) || 26;
  var border = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
  var extra = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0) + border;
  el.style.height = "auto";
  var want = el.scrollHeight + border;                       // .bl-textarea는 border-box
  var cap = maxRows ? Math.round(line * maxRows + extra) : Infinity;
  el.style.height = Math.min(want, cap) + "px";
  el.style.overflowY = want > cap ? "auto" : "hidden";
}

/* ref는 <textarea>에 닿습니다. rows 기본 4, autoResize면 내용에 따라 maxRows까지 자랍니다. */
var Textarea = /*#__PURE__*/ withRef("Textarea", function (p, ref) {
  var id = useId(p.id), help = p.error || p.help, L = useLocale(p.locale);
  var inner = React.useRef(null);
  var setRef = React.useCallback(function (el) {
    inner.current = el;
    if (typeof ref === "function") ref(el); else if (ref) ref.current = el;
  }, [ref]);
  var auto = !!p.autoResize, maxRows = p.maxRows;
  React.useEffect(function () {
    if (!auto || !inner.current) return;
    textareaFit(inner.current, maxRows);
  }, [auto, maxRows, p.value, p.defaultValue]);
  function onInput(e) {
    if (auto) textareaFit(e.currentTarget, maxRows);
    p.onInput && p.onInput(e);
  }
  return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
    h("label", { className: "bl-field-label", htmlFor: id }, p.label),
    h("textarea", Object.assign({ rows: 4 }, omit(p, ["label", "help", "error", "className", "id", "locale", "autoResize", "maxRows", "onInput"]), {
      ref: setRef, id: id, className: cx("bl-field-input bl-textarea", auto && "bl-textarea-auto"), onInput: onInput,
      "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
    })),
    help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? L.errorPrefix + p.error : p.help) : null);
});

var TOAST_ICON = { positive: "check", danger: "alert", warning: "alert", info: "spark" };

/* 토스트 한 장(그리기만). 쌓기·자동 닫힘은 ToastProvider + useToast()가 합니다(2.1). 톤: neutral · positive · warning · danger · info */
function Toast(p) {
  var tone = p.tone || "neutral", icon = TOAST_ICON[tone], L = useLocale(p.locale);
  return h("div", { className: cx("bl-toast bl-crema-thick", p.className), role: tone === "danger" || tone === "warning" ? "alert" : "status", "data-tone": tone },
    icon ? h(Icon, { name: icon }) : null,
    h("span", { className: "bl-toast-msg" }, p.children),
    p.actionLabel ? h(Button, { variant: "ghost", size: "md", onClick: p.onAction }, p.actionLabel) : null,
    p.onDismiss ? h(IconButton, { icon: "close", label: L.dismiss, plain: true, onClick: p.onDismiss, className: "bl-toast-close" }) : null);
}

var ToastContext = /*#__PURE__*/ React.createContext(null);
var toastSeq = 0;

/* 앱 루트를 감싸면 화면 아래 가운데(lg 이상은 오른쪽 아래)에 토스트가 쌓입니다. 한 번에 max개(기본 3), 기본 4초 뒤 사라지고 마우스를 올리면 멈춥니다. */
function ToastProvider(p) {
  var st = React.useState([]), list = st[0], setList = st[1];
  var timers = React.useRef({});
  var dismiss = React.useCallback(function (id) {
    clearTimeout(timers.current[id]); delete timers.current[id];
    setList(function (l) { return l.map(function (t) { return t.id === id ? Object.assign({}, t, { closing: true }) : t; }); });
    setTimeout(function () { setList(function (l) { return l.filter(function (t) { return t.id !== id; }); }); }, 200);
  }, []);
  var show = React.useCallback(function (opts) {
    var o = typeof opts === "string" ? { message: opts } : opts || {};
    var id = o.id || "bl-toast-" + (++toastSeq), duration = o.duration === undefined ? (p.duration === undefined ? 4000 : p.duration) : o.duration;
    var max = p.max || 3;
    setList(function (l) { var next = l.filter(function (t) { return t.id !== id; }).concat([Object.assign({}, o, { id: id })]); return next.slice(Math.max(0, next.length - max)); });
    if (duration > 0) timers.current[id] = setTimeout(function () { dismiss(id); }, duration);
    return id;
  }, [dismiss, p.duration, p.max]);
  function pause(id) { clearTimeout(timers.current[id]); }
  function resume(t) { if (t.duration !== 0 && !t.closing) timers.current[t.id] = setTimeout(function () { dismiss(t.id); }, 1500); }
  React.useEffect(function () { return function () { Object.keys(timers.current).forEach(function (k) { clearTimeout(timers.current[k]); }); }; }, []);
  var api = React.useMemo(function () { return { show: show, dismiss: dismiss }; }, [show, dismiss]);
  return h(ToastContext.Provider, { value: api }, p.children,
    h("div", { className: cx("bl-toaster", p.className), "aria-live": "polite", "aria-relevant": "additions" },
      list.map(function (t) {
        return h("div", { key: t.id, className: "bl-toaster-item", "data-closing": t.closing ? "true" : undefined,
          onMouseEnter: function () { pause(t.id); }, onMouseLeave: function () { resume(t); } },
          h(Toast, { tone: t.tone, actionLabel: t.actionLabel, onDismiss: t.dismissible === false ? undefined : function () { dismiss(t.id); },
            onAction: function () { if (t.onAction) t.onAction(); dismiss(t.id); } }, t.message));
      })));
}

/* useToast().show({ message, tone, actionLabel, onAction, duration, dismissible }) → id · useToast().dismiss(id) */
function useToast() {
  var ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("blurssism: useToast()는 <ToastProvider> 안에서만 쓸 수 있어요. 앱 루트를 ToastProvider로 감싸 주세요.");
  return ctx;
}

/* 툴팁은 최상위 층(popover)에 띄워 overflow: hidden인 부모(MediaCard, Table)에 잘리지 않습니다. Esc로 닫힙니다. */
function Tooltip(p) {
  var id = useId(), wrap = React.useRef(null), tip = React.useRef(null);
  var st = React.useState(false), open = st[0], setOpen = st[1];
  React.useEffect(function () {
    var t = tip.current, a = wrap.current;
    if (!t || !a || !t.showPopover) return;
    if (!open) { if (t.matches(":popover-open")) t.hidePopover(); return; }
    if (!t.matches(":popover-open")) t.showPopover();
    placeTooltip(t, a.firstElementChild || a);
  }, [open]);
  var own = React.isValidElement(p.children) && p.children.props["aria-describedby"];
  var child = React.isValidElement(p.children) ? React.cloneElement(p.children, { "aria-describedby": own ? own + " " + id : id }) : p.children;
  return h("span", { className: "bl-tip", ref: wrap,
    onMouseEnter: function () { setOpen(true); }, onMouseLeave: function () { setOpen(false); },
    onFocus: function () { setOpen(true); }, onBlur: function () { setOpen(false); },
    onKeyDown: function (e) { if (e.key === "Escape" && open) { e.stopPropagation(); setOpen(false); } } },
    child, h("span", { id: id, ref: tip, role: "tooltip", popover: "manual", className: "bl-tooltip-pop bl-crema-thick" }, p.label));
}

/* 기준 요소 위 가운데에 놓고, 위가 모자라면 아래로, 좌우는 화면 안으로 */
function placeTooltip(t, a) {
  var r = a.getBoundingClientRect(), w = t.offsetWidth, hgt = t.offsetHeight, gap = 8, vw = window.innerWidth;
  var below = r.top - hgt - gap < 4;
  var x = Math.min(Math.max(r.left + r.width / 2, w / 2 + 4), vw - w / 2 - 4);
  t.style.left = x + "px";
  t.style.top = (below ? r.bottom + gap : r.top - gap) + "px";
  if (below) t.setAttribute("data-place", "below"); else t.removeAttribute("data-place");
}

/* 화면 단계("xs"…"xl"). 서버와 첫 렌더에서는 null이라 하이드레이션이 어긋나지 않습니다. */
function useBreakpoint() {
  return React.useSyncExternalStore(onBreakpointChange, function () { return getBreakpoint(); }, function () { return null; });
}

const B = { Icon, Accordion, Alert, Avatar, Badge, Button, Calendar, Card, Checkbox, Chip, Container, Dialog, Drawer, EmptyState, Grid, IconButton, Link, ListItem, MediaCard, Menu, NavBar, Pagination, PalettePicker, Popover, Progress, RadioGroup, SegmentedControl, Select, Sheet, Skeleton, Switch, TabBar, Table, Tabs, TextField, Textarea, Toast, ToastProvider, Tooltip, useControllable, useLocale, useToast, useBreakpoint, palettes, backgrounds, breakpoints, version, author, setPalette, getPalette, setBackground, getBackground, setTheme, getTheme, getBreakpoint, isAtLeast, onBreakpointChange, shouldReduceCrema, probeCremaCost, isDesktopCapable, applyCremaPreference, setCremaMode, getCremaMode, locales, setLocale, getLocale, onLocaleChange, checkCrema, auditCrema, getCustomPalettes, onCustomPalettesChange, contrastRatio, createPalette, paletteToCss, applyBrandColor, createBackground, backgroundCrema, backgroundToCss, applyBackgroundColor };
/** @deprecated 2.1부터 컴포넌트를 바로 import하세요. React 인자는 무시됩니다(2.0까지는 다른 React 인스턴스로 다시 만들었습니다). */
function createBlurssism() { return B; }
export { Icon, Accordion, Alert, Avatar, Badge, Button, Calendar, Card, Checkbox, Chip, Container, Dialog, Drawer, EmptyState, Grid, IconButton, Link, ListItem, MediaCard, Menu, NavBar, Pagination, PalettePicker, Popover, Progress, RadioGroup, SegmentedControl, Select, Sheet, Skeleton, Switch, TabBar, Table, Tabs, TextField, Textarea, Toast, ToastProvider, Tooltip, useControllable, useLocale, useToast, useBreakpoint };
export { palettes, backgrounds, breakpoints, version, author, setPalette, getPalette, setBackground, getBackground, setTheme, getTheme, getBreakpoint, isAtLeast, onBreakpointChange, shouldReduceCrema, probeCremaCost, isDesktopCapable, applyCremaPreference, setCremaMode, getCremaMode, locales, setLocale, getLocale, onLocaleChange, checkCrema, auditCrema, getCustomPalettes, onCustomPalettesChange, contrastRatio, createPalette, paletteToCss, applyBrandColor, createBackground, backgroundCrema, backgroundToCss, applyBackgroundColor };
export { createBlurssism };
export default B;
