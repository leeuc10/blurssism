/* blurssism React · Drawer · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, useId, useLocale, useModal } from "./_shared.js";
import { isAtLeast, onBreakpointChange } from "../utils.js";
import { IconButton } from "./IconButton.js";

/* 옆에서 미끄러져 들어오는 패널. 네이티브 <dialog>를 showModal()로 열어(useModal) 최상위 층에 뜨고, 뒤 화면은 inert, Esc·바깥 누르기로 onClose,
   닫을 때는 data-closing 애니메이션이 끝난 뒤 닫힙니다. persistentFrom("lg"·"xl")을 주면 그 단계부터는 다이얼로그 대신
   불투명한 <aside class="bl-drawer-persistent">가 보여서(미디어쿼리로 바꿈) 데스크톱 사이드바가 됩니다. 그때는 다이얼로그를 열지 않습니다. */
export function Drawer(p) {
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
