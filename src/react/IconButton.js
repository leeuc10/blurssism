/* blurssism React · IconButton · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef } from "./_shared.js";
import { Icon } from "./Icon.js";

export var IconButton = withRef("IconButton", function (p, ref) {
  return h("button", Object.assign({ type: "button" }, omit(p, ["icon", "label", "pressed", "plain", "className"]), {
    ref: ref, className: cx("bl-icon-btn", p.plain && "bl-icon-btn-plain", p.className), "aria-label": p.label,
    "aria-pressed": p.pressed == null ? undefined : String(!!p.pressed)
  }), h(Icon, { name: p.icon, filled: !!p.pressed }));
});
