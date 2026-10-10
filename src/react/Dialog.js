/* blurssism React · Dialog · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, useId, useModal } from "./_shared.js";

/* 네이티브 <dialog>를 showModal()로 엽니다. 최상위 층에 떠서 크레마 안에서 열어도 갇히지 않고, 뒤 화면은 inert가 됩니다.
   Esc·바깥 누르기로 onClose(alert면 바깥 누르기로는 닫지 않음). 열 때 첫 조작 요소로, 닫으면 원래 자리로 포커스를 돌려줍니다.
   2.1: 닫힐 때도 애니메이션이 끝난 뒤 사라집니다(useModal의 data-closing). */
export function Dialog(p) {
  var id = useId(), m = useModal(p.open, p.onClose, { staticBackdrop: p.alert }), visible = m[0], dp = m[1];
  if (!visible) return null;
  return h("dialog", Object.assign({ className: cx("bl-dialog bl-crema-thick", p.className), role: p.alert ? "alertdialog" : undefined,
    "aria-labelledby": id, "aria-describedby": p.description ? id + "-desc" : undefined }, dp),
    h("h2", { id: id, className: "bl-dialog-title" }, p.title),
    p.description ? h("p", { id: id + "-desc", className: "bl-dialog-body" }, p.description) : null,
    p.children ? h("div", { className: "bl-dialog-actions" }, p.children) : null);
}
