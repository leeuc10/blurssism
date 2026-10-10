/* blurssism React · Checkbox · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef } from "./_shared.js";

/* ref는 <input type="checkbox">에 닿습니다 */
export var Checkbox = withRef("Checkbox", function (p, ref) {
  return h("label", { className: cx("bl-check", p.className) },
    h("input", Object.assign({ type: "checkbox", ref: ref }, omit(p, ["label", "description", "className"]))),
    h("span", null, p.label, p.description ? h("span", { className: "bl-check-sub" }, p.description) : null));
});
