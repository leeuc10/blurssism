/* blurssism React · Pagination · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef, useLocale, useControllable } from "./_shared.js";
import { IconButton } from "./IconButton.js";

/* 보일 페이지 번호 목록. 처음·끝은 항상, 지금 페이지 양옆으로 siblings개. 건너뛰는 곳은 null(…). */
function paginationRange(page, count, siblings) {
  var s = siblings == null ? 1 : Math.max(0, siblings), total = s * 2 + 5, i, out = [];
  function run(a, b) { for (var k = a; k <= b; k++) out.push(k); }
  if (count <= total) { run(1, count); return out; }
  var left = Math.max(page - s, 1), right = Math.min(page + s, count);
  var dotsLeft = left > 2, dotsRight = right < count - 1, n = s * 2 + 3;
  if (!dotsLeft && dotsRight) { run(1, n); out.push(null); out.push(count); }
  else if (dotsLeft && !dotsRight) { out.push(1); out.push(null); run(count - n + 1, count); }
  else { out.push(1); out.push(null); run(left, right); out.push(null); out.push(count); }
  for (i = 0; i < out.length; i++) if (out[i] !== null && (out[i] < 1 || out[i] > count)) out.splice(i--, 1);
  return out;
}

/* page를 주면 제어 모드, 안 주면 defaultPage(기본 1)에서 시작해 스스로 바뀝니다. onChange(다음 페이지). ref는 <nav>. */
export var Pagination = withRef("Pagination", function (p, ref) {
  var L = useLocale(p.locale), count = Math.max(1, p.count | 0);
  var c = useControllable(p.page, p.defaultPage || 1, p.onChange), page = Math.min(Math.max(1, c[0] | 0), count), go = c[1];
  var items = paginationRange(page, count, p.siblings);
  return h("nav", Object.assign(omit(p, ["page", "defaultPage", "onChange", "count", "siblings", "label", "className", "locale"]), {
    ref: ref, className: cx("bl-pagination", p.className), "aria-label": p.label || L.pageOf(page, count)
  }),
    h(IconButton, { plain: true, icon: "chevron-left", label: L.prevPage, disabled: page <= 1, onClick: function () { if (page > 1) go(page - 1); } }),
    h("ul", { className: "bl-pagination-list" }, items.map(function (n, i) {
      return h("li", { key: n === null ? "gap" + i : n },
        n === null ? h("span", { className: "bl-page-gap", "aria-hidden": "true" }, "…")
          : h("button", { type: "button", className: "bl-page", "aria-label": L.page(n), "aria-current": n === page ? "page" : undefined,
              onClick: function () { if (n !== page) go(n); } }, String(n)));
    })),
    h(IconButton, { plain: true, icon: "chevron-right", label: L.nextPage, disabled: page >= count, onClick: function () { if (page < count) go(page + 1); } }));
});
