/* blurssism React · Grid · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef } from "./_shared.js";

/* columns: 숫자 또는 { xs, sm, md, lg, xl } — 단계별 열 수. 생략한 단계는 아래 단계 값을 이어받습니다. */
export var Grid = withRef("Grid", function (p, ref) {
  var c = typeof p.columns === "number" ? { xs: p.columns } : (p.columns || { xs: 1, sm: 2, lg: 3 });
  var style = {}, last = 1;
  ["xs", "sm", "md", "lg", "xl"].forEach(function (bp) { if (c[bp] != null) last = c[bp]; style["--bl-cols-" + bp] = last; });
  if (p.gap) style["--bl-grid-gap"] = "var(--" + p.gap + ")";
  return h(p.as || "div", Object.assign({}, omit(p, ["as", "columns", "gap", "className", "children", "style"]), {
    ref: ref, className: cx("bl-autogrid", p.className), style: Object.assign(style, p.style) }), p.children);
});
