/* blurssism React · Chip · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, omit, withRef } from "./_shared.js";
import { Icon } from "./Icon.js";

/* selected를 주면 제어 모드, 안 주면 누를 때마다 스스로 바뀝니다(defaultSelected로 처음 값). onChange(다음 값)를 부릅니다. */
export var Chip = withRef("Chip", function (p, ref) {
  var st = React.useState(!!p.defaultSelected), on = p.selected != null ? !!p.selected : st[0];
  return h("button", Object.assign({ type: "button" }, omit(p, ["selected", "defaultSelected", "onChange", "className", "children"]), {
    ref: ref, className: cx("bl-chip", p.className), "aria-pressed": String(on),
    onClick: function (e) {
      if (p.selected == null) st[1](!on);
      p.onChange && p.onChange(!on);
      p.onClick && p.onClick(e);
    }
  }), on ? h(Icon, { name: "check" }) : null, p.children);
});
