/* blurssism React · Sheet · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, useId, useModal, useLatest } from "./_shared.js";

/* 두꺼운 크레마 바텀시트.
   2.1: open을 주면 스스로 열고 닫는 모달이 됩니다(네이티브 <dialog>, scrim, Esc·바깥 누르기·손잡이 끌어내리기로 onClose, 포커스 복귀, 닫힘 애니메이션).
   open을 주지 않으면 전처럼 자리에 그려지는 면(열고 닫기는 소비자 몫)입니다. md(768px) 이상에서는 가운데 카드로 뜹니다. */
export function Sheet(p) {
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
