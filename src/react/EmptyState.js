/* blurssism React · EmptyState · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";
import { Icon } from "./Icon.js";

export function EmptyState(p) {
  return h("div", { className: cx("bl-empty", p.className) },
    h("span", { className: "bl-empty-icon" }, h(Icon, { name: p.icon || "inbox" })),
    h("p", { className: "bl-empty-title" }, p.title),
    p.body ? h("p", { className: "bl-empty-body" }, p.body) : null,
    p.children || null);
}
