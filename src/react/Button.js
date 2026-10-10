/* blurssism React · Button · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef } from "./_shared.js";
import { Icon } from "./Icon.js";

/* 2.0: primary는 강조색(accent) 채움입니다. "accent"는 primary의 별칭(같은 클래스)이라 화면당 하나 규칙을 함께 셉니다. */
export var Button = withRef("Button", function (p, ref) {
  var variant = p.variant || "primary", tag = p.href ? "a" : "button";
  if (variant === "accent") variant = "primary";
  return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["variant", "size", "block", "icon", "className", "children"]), {
    ref: ref,
    className: cx("bl-btn", "bl-btn-" + variant, p.size === "md" && "bl-btn-md", p.block && "bl-btn-block", p.className)
  }), p.icon ? h(Icon, { name: p.icon }) : null, p.children);
});
