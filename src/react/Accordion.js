/* blurssism React · Accordion · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, useId, useControllable } from "./_shared.js";
import { Icon } from "./Icon.js";

/* 제목을 눌러 내용을 펼치는 목록. 네이티브 <details>·<summary>라 키보드·스크린리더 지원이 따라오고, JS가 없어도 열립니다.
   기본은 하나만 열림: 같은 name을 붙여 브라우저가 나머지를 닫고(Chrome 120·Safari 17.2·Firefox 130부터), 모르는 브라우저에서는 onToggle이 상태를 맞춰 닫습니다.
   multiple이면 여러 개가 열립니다. value는 하나만 열릴 때 문자열(없으면 ""), multiple이면 열린 id 배열입니다. */
function accordionOpenIds(v) { return v === undefined || v === null || v === "" ? [] : Array.isArray(v) ? v : [v]; }

export function Accordion(p) {
  var base = useId(p.id), multiple = !!p.multiple, items = p.items || [];
  var st = useControllable(p.value, p.defaultValue !== undefined ? p.defaultValue : (multiple ? [] : ""), p.onChange);
  var open = accordionOpenIds(st[0]), set = st[1];
  function emit(list) { set(multiple ? list : (list.length ? list[0] : "")); }
  function onToggle(id, e) {
    var isOpen = e.currentTarget.open, has = open.indexOf(id) >= 0;
    if (isOpen === has) return;   // name으로 브라우저가 닫았거나 상태를 따라 닫힌 뒤의 toggle
    emit(isOpen ? (multiple ? open.concat(id) : [id]) : open.filter(function (x) { return x !== id; }));
  }
  return h("div", { className: cx("bl-acc", p.className) },
    items.map(function (it) {
      return h("details", { key: it.id, className: "bl-acc-item", open: open.indexOf(it.id) >= 0, name: multiple ? undefined : base,
        onToggle: function (e) { onToggle(it.id, e); } },
        h("summary", { className: "bl-acc-summary" },
          it.icon ? h(Icon, { name: it.icon, className: "bl-acc-icon" }) : null,
          h("span", { className: "bl-acc-title" }, it.title),
          h(Icon, { name: "chevron-right", className: "bl-acc-chevron" })),
        h("div", { className: "bl-acc-body" }, it.content));
    }));
}
