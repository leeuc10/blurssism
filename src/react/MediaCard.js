/* blurssism React · MediaCard · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";
import { Badge } from "./Badge.js";

export function MediaCard(p) {
  var ph = h("div", { className: "bl-media-ph", "aria-hidden": "true" },
    h("i", { style: { left: "-12%", top: "8%", width: "70%", height: "56%", borderRadius: "var(--radius-full)", background: "var(--deco)" } }),
    h("i", { style: { right: "-10%", top: "28%", width: "52%", height: "64%", borderRadius: "var(--radius-xl)", background: "var(--accent)" } }),
    h("i", { style: { left: "18%", bottom: "-6%", width: "46%", height: "30%", borderRadius: "var(--radius-full)", background: "var(--positive)" } }));
  return h("article", { className: cx("bl-media", p.className), style: p.ratio ? { aspectRatio: p.ratio } : undefined },
    p.image ? h("img", { className: "bl-media-img", src: p.image, alt: p.imageAlt || "" }) : ph,
    p.badge ? h(Badge, { tone: p.badgeTone || "positive", icon: p.badgeIcon }, p.badge) : null,
    h("div", { className: "bl-media-bar " + (p.lite ? "bl-crema-lite" : "bl-crema") },
      h("div", { className: "bl-media-text" },
        h("p", { className: "bl-media-title" }, p.title),
        p.meta ? h("p", { className: "bl-media-meta" }, p.meta) : null),
      p.action || null));
}
