/* blurssism React · Progress · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";

export function Progress(p) {
  var max = p.max || 100, pct = Math.max(0, Math.min(100, (p.value / max) * 100));
  return h("div", { className: cx("bl-progress", p.className) },
    p.label ? h("div", { className: "bl-progress-head" }, h("span", null, p.label), h("span", null, p.valueText || Math.round(pct) + "%")) : null,
    h("div", { className: "bl-progress-track", role: "progressbar", "aria-label": p.label, "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": p.value },
      h("div", { className: "bl-progress-fill", style: { width: pct + "%" } })));
}
