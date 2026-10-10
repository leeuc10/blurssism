/* blurssism React · Table · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx } from "./_shared.js";

/* 칸 그리기: render(행) → 노드, format(행) → 글자(Svelte와 같음). caption이 있을 때만 가로 스크롤 영역에 이름과 포커스를 줍니다. */
export function Table(p) {
  return h("div", p.caption ? { className: "bl-table-wrap", tabIndex: 0, role: "region", "aria-label": p.caption } : { className: "bl-table-wrap" },
    h("table", { className: cx("bl-table", p.className) },
      p.caption ? h("caption", null, p.caption) : null,
      h("thead", null, h("tr", null, p.columns.map(function (c) { return h("th", { key: c.key, scope: "col", className: c.numeric ? "bl-num" : undefined }, c.label); }))),
      h("tbody", null, p.rows.map(function (r, i) {
        return h("tr", { key: r.id || i }, p.columns.map(function (c) {
          return h("td", { key: c.key, className: c.numeric ? "bl-num" : undefined }, c.render ? c.render(r) : c.format ? c.format(r) : r[c.key]);
        }));
      }))));
}
