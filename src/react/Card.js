/* blurssism React · Card · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";

export function Card(p) {
  return h("article", { className: cx("bl-card", p.className) },
    p.eyebrow ? h("p", { className: "bl-card-eyebrow" }, p.eyebrow) : null,
    p.title ? h("h3", { className: "bl-card-title" }, p.title) : null,
    p.quote ? h("p", { className: "bl-card-quote" }, p.quote) : null,
    p.body ? h("p", { className: "bl-card-body" }, p.body) : null,
    p.children ? h("div", { className: "bl-card-actions" }, p.children) : null);
}
