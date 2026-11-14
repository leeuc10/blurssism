/* blurssism React · MediaCard · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";
import { Badge } from "./Badge.js";

export function MediaCard(p) {
  // 3.1: 사진이 없을 때는 추상 도형 대신 종이에 남은 잔 자국 두 개(.bl-ring). 하나는 캡션 크레마 밑으로 지나가 블러가 보이게 합니다.
  var ph = h("div", { className: "bl-media-ph", "aria-hidden": "true" },
    h("span", { className: "bl-ring" }), h("span", { className: "bl-ring bl-ring-deco" }));
  return h("article", { className: cx("bl-media", p.className), style: p.ratio ? { aspectRatio: p.ratio } : undefined },
    p.image ? h("img", { className: "bl-media-img", src: p.image, alt: p.imageAlt || "" }) : ph,
    p.badge ? h(Badge, { tone: p.badgeTone || "positive", icon: p.badgeIcon }, p.badge) : null,
    h("div", { className: "bl-media-bar " + (p.lite ? "bl-crema-lite" : "bl-crema") },
      h("div", { className: "bl-media-text" },
        h("p", { className: "bl-media-title" }, p.title),
        p.meta ? h("p", { className: "bl-media-meta" }, p.meta) : null),
      p.action || null));
}
