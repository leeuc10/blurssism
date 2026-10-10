/* blurssism React · Skeleton · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";

export function Skeleton(p) {
  return h("span", { className: cx("bl-skel", p.className), "aria-hidden": "true",
    style: { width: p.width || "100%", height: p.height || 16, borderRadius: p.circle ? "var(--radius-full)" : undefined } });
}
