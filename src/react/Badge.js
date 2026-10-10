/* blurssism React · Badge · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";
import { Icon } from "./Icon.js";

export function Badge(p) {
  return h("span", { className: cx("bl-badge", "bl-badge-" + (p.tone || "neutral"), p.className) }, p.icon ? h(Icon, { name: p.icon }) : null, p.children);
}
