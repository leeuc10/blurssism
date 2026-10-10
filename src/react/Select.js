/* blurssism React · Select · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef, useId, useLocale } from "./_shared.js";

/* ref는 <select>에 닿습니다 */
export var Select = withRef("Select", function (p, ref) {
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
