/* blurssism React · TextField · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef, useId, useLocale } from "./_shared.js";

/* ref는 <input>에 닿습니다 */
export var TextField = withRef("TextField", function (p, ref) {
  var id = useId(p.id), help = p.error || p.help, L = useLocale(p.locale);
  return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
    h("label", { className: "bl-field-label", htmlFor: id }, p.label),
    h("input", Object.assign({}, omit(p, ["label", "help", "error", "className", "id", "locale"]), {
      ref: ref, id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
    })),
    help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? L.errorPrefix + p.error : p.help) : null);
});
