/* blurssism React · SegmentedControl · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, rovingKey, useControllable } from "./_shared.js";

/* value를 주면 제어 모드, 안 주면 defaultValue(없으면 첫 항목)에서 시작해 스스로 바뀝니다(2.1). */
export function SegmentedControl(p) {
  var items = p.items || [], ids = items.map(function (i) { return i.id; });
  var c = useControllable(p.value, p.defaultValue !== undefined ? p.defaultValue : ids[0], p.onChange), value = c[0], pick = c[1];
  var tab = ids.indexOf(value) >= 0 ? value : ids[0];   // 고른 것이 없으면 첫 항목으로 들어옵니다
  return h("div", { className: cx("bl-seg", p.block && "bl-seg-block", p.className), role: "radiogroup", "aria-label": p.label,
    onKeyDown: function (e) { rovingKey(e, ids, value, pick); } },
    items.map(function (it) {
      var on = it.id === value;
      return h("button", { key: it.id, type: "button", role: "radio", className: "bl-seg-item", "aria-checked": String(on), tabIndex: it.id === tab ? 0 : -1,
        onClick: function () { pick(it.id); } }, it.label);
    }));
}
