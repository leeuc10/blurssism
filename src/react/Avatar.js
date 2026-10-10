/* blurssism React · Avatar · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";

export function Avatar(p) {
  var nm = (p.name || "").trim(), initials = /^\+\d+$/.test(nm) ? nm : nm.slice(0, /[A-Za-z]/.test(nm[0]) ? 2 : 1).toUpperCase();
  return h("span", { className: cx("bl-avatar", p.size && p.size !== "md" && "bl-avatar-" + p.size, p.className), role: "img", "aria-label": p.name },
    p.image ? h("img", { src: p.image, alt: "" }) : initials);
}
