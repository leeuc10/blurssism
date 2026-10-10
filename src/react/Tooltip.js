/* blurssism React · Tooltip · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, useId } from "./_shared.js";

/* 툴팁은 최상위 층(popover)에 띄워 overflow: hidden인 부모(MediaCard, Table)에 잘리지 않습니다. Esc로 닫힙니다. */
export function Tooltip(p) {
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
