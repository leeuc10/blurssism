/* blurssism React · Container · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef } from "./_shared.js";

export var Container = withRef("Container", function (p, ref) {
  var tag = p.as || "div";
  return h(tag, Object.assign({}, omit(p, ["as", "size", "className", "children"]), {
    ref: ref, className: cx("bl-container", p.size === "prose" && "bl-container-prose", p.size === "full" && "bl-container-full", p.className) }), p.children);
});
