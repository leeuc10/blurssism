/* blurssism React · Tabs · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, useId, useLocale, useControllable, rovingKey } from "./_shared.js";
import { Icon } from "./Icon.js";

/* 같은 화면 안에서 내용 묶음을 바꾸는 콘텐츠 탭(WAI-ARIA tablist). 화면을 옮기는 하단 메뉴는 TabBar입니다.
   지금 탭만 Tab 순서에 들고, 방향키·Home·End가 포커스와 선택을 함께 옮깁니다(비활성 탭은 건너뜀).
   패널은 지금 것만 그립니다. keepMounted면 나머지도 그려 두고 hidden으로 숨깁니다(입력 상태를 지키고 싶을 때). */
export function Tabs(p) {
  var L = useLocale(p.locale), base = useId(p.id), items = p.items || [], variant = p.variant || "line";
  var ids = items.filter(function (i) { return !i.disabled; }).map(function (i) { return i.id; });
  var st = useControllable(p.value, p.defaultValue !== undefined ? p.defaultValue : ids[0], p.onChange), set = st[1];
  var cur = ids.indexOf(st[0]) >= 0 ? st[0] : ids[0];   // 없거나 비활성인 값이면 첫 활성 탭
  function tabId(id) { return base + "-tab-" + id; }
  function panelId(id) { return base + "-panel-" + id; }
  function pick(id) { if (id !== cur) set(id); }
  function onKeyDown(e) {
    var picked = null, list = e.currentTarget;
    rovingKey(e, ids, cur, function (id) { picked = id; }, "tab");   // rovingKey는 전체 탭 순서로 포커스하므로 비활성 탭이 있으면 아래에서 id로 다시 맞춥니다
    if (picked === null) return;
    pick(picked);
    var el = list.ownerDocument.getElementById(tabId(picked));
    if (el) el.focus();
  }
  return h("div", { className: cx("bl-tabs", "bl-tabs-" + variant, p.className) },
    h("div", { className: "bl-tabs-list", role: "tablist", "aria-label": p.label || L.tabs, onKeyDown: onKeyDown },
      items.map(function (it) {
        var on = it.id === cur, mounted = on || !!p.keepMounted;
        return h("button", { key: it.id, type: "button", role: "tab", id: tabId(it.id), className: "bl-tabs-tab",
          "aria-selected": String(on), "aria-controls": mounted ? panelId(it.id) : undefined, tabIndex: on ? 0 : -1,
          disabled: it.disabled || undefined, onClick: function () { pick(it.id); } },
          it.icon ? h(Icon, { name: it.icon }) : null, h("span", null, it.label));
      })),
    items.map(function (it) {
      var on = it.id === cur;
      if (!on && !p.keepMounted) return null;
      return h("div", { key: it.id, role: "tabpanel", id: panelId(it.id), "aria-labelledby": tabId(it.id), className: "bl-tabs-panel",
        tabIndex: 0, hidden: on ? undefined : true }, it.panel);
    }));
}
