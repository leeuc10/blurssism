/* blurssism React · PalettePicker · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, rovingKey, useLocale } from "./_shared.js";
import { palettes, setPalette, getPalette, getCustomPalettes, onCustomPalettesChange } from "../utils.js";

/* 팔레트 라디오 묶음. 방향키로 고르고(포커스도 따라감), 고른 것에는 체크 표시가 붙습니다.
   applyBrandColor()로 등록한 브랜드 팔레트도 함께 보여 줍니다(custom={false}로 숨김). */
export function PalettePicker(p) {
  var L = useLocale(p.locale);
  var st = React.useState(p.value || "black"), cur = p.value || st[0];
  var cs = React.useState([]), custom = cs[0];   // 서버와 첫 렌더는 빈 목록(하이드레이션), 마운트 뒤에 채웁니다
  React.useEffect(function () {
    if (!p.value) st[1](getPalette(p.target));
    cs[1](getCustomPalettes());
    return onCustomPalettesChange(function () { cs[1](getCustomPalettes()); });
  }, []);
  function pick(id) {
    if (!p.value) st[1](id);
    if (p.apply !== false) setPalette(id, p.target);
    p.onChange && p.onChange(id);
  }
  var list = palettes.filter(function (pl) { return !p.group || pl.group === p.group; })
    .concat(p.custom === false || (p.group && p.group !== "custom") ? [] : custom);
  var ids = list.map(function (pl) { return pl.id; }), tab = ids.indexOf(cur) >= 0 ? cur : ids[0];
  return h("div", { className: cx("bl-palettes", p.className), role: "radiogroup", "aria-label": p.label || L.palette,
    onKeyDown: function (e) { rovingKey(e, ids, cur, pick); } },
    list.map(function (pl) {
      var on = pl.id === cur;
      return h("button", { key: pl.id, type: "button", role: "radio", "aria-checked": String(on), tabIndex: pl.id === tab ? 0 : -1, className: "bl-palette", "aria-label": pl.name,
        "data-palette": pl.id, onClick: function () { pick(pl.id); } },
        h("span", { className: "bl-palette-dot", "aria-hidden": "true" }),
        h("span", { className: p.compact ? "bl-sr-only" : "bl-palette-name" }, pl.name));
    }));
}
