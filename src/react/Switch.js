/* blurssism React · Switch · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef, useControllable } from "./_shared.js";

/* checked를 주면 제어 모드, 안 주면 defaultChecked에서 시작해 스스로 바뀝니다(2.1). onChange(다음 값) */
export var Switch = withRef("Switch", function (p, ref) {
  var c = useControllable(p.checked, !!p.defaultChecked, p.onChange), on = c[0], set = c[1];
  return h("button", Object.assign({ type: "button", role: "switch" }, omit(p, ["checked", "defaultChecked", "onChange", "label", "className"]), {
    ref: ref, className: cx("bl-switch", p.className), "aria-checked": String(!!on), "aria-label": p.label,
    onClick: function () { set(!on); }
  }));
});
