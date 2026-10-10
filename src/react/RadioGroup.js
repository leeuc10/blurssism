/* blurssism React · RadioGroup · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, withRef, useId, useControllable } from "./_shared.js";

/* value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다(2.1). */
export var RadioGroup = withRef("RadioGroup", function (p, ref) {
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
