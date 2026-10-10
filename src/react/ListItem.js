/* blurssism React · ListItem · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef } from "./_shared.js";
import { Icon } from "./Icon.js";

export var ListItem = withRef("ListItem", function (p, ref) {
  var tag = p.href ? "a" : p.onClick ? "button" : "div";
  var trail = p.trailing !== undefined ? p.trailing : (tag !== "div" ? h(Icon, { name: "chevron-right" }) : null);
  return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["icon", "title", "subtitle", "trailing", "className"]), {
    ref: ref, className: cx("bl-item", p.className) }),
    p.icon ? h("span", { className: "bl-item-lead" }, h(Icon, { name: p.icon })) : null,
    h("span", { className: "bl-item-text" },
      h("span", { className: "bl-item-title" }, p.title),
      p.subtitle ? h("span", { className: "bl-item-sub" }, p.subtitle) : null),
    trail ? h("span", { className: "bl-item-trail" }, trail) : null);
});
