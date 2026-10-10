/* blurssism React · Menu · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, useLocale, useControllable, rovingKey } from "./_shared.js";
import { Icon } from "./Icon.js";
import { Popover } from "./Popover.js";

/* Popover 위에 얹은 행동 메뉴. items의 "-"는 구분선. 방향키·Home·End로 옮기고 Enter·Space로 고르면 onSelect(id) 뒤에 닫힙니다.
   disabled 항목은 포커스는 받되(aria-disabled) 고를 수 없습니다. href가 있으면 <a>로 그립니다. */
export function Menu(p) {
  var L = useLocale(p.locale), label = p.label || L.menu;
  var c = useControllable(p.open, !!p.defaultOpen, p.onOpenChange), open = c[0], setOpen = c[1];
  var st = React.useState(null), cur = st[0], setCur = st[1];
  var items = p.items || [], ids = [];
  items.forEach(function (it) { if (it !== "-") ids.push(it.id); });
  return h(Popover, { trigger: p.trigger, open: open, onOpenChange: setOpen, placement: p.placement, label: label, haspopup: "menu", className: cx("bl-menu-pop", p.className) },
    h("div", { role: "menu", className: "bl-menu", "aria-label": label,
      onKeyDown: function (e) {
        if (e.key === " " && e.target.tagName === "A") { e.preventDefault(); e.target.click(); return; }   // 링크 항목도 Space로
        rovingKey(e, ids, cur, setCur, "menuitem");
      } },
      items.map(function (it, i) {
        if (it === "-") return h("div", { key: "sep" + i, role: "separator", className: "bl-menu-sep" });
        var props = { key: it.id, role: "menuitem", className: "bl-menu-item", tabIndex: (cur ? cur === it.id : ids[0] === it.id) ? 0 : -1,
          "data-danger": it.danger ? "true" : undefined, "aria-disabled": it.disabled ? "true" : undefined,
          onFocus: function () { setCur(it.id); },
          onClick: function (e) {
            if (it.disabled) { e.preventDefault(); return; }
            setOpen(false);
            if (p.onSelect) p.onSelect(it.id);
          } };
        var body = [it.icon ? h(Icon, { key: "i", name: it.icon }) : null, h("span", { key: "l", className: "bl-menu-label" }, it.label)];
        return it.href ? h("a", Object.assign(props, { href: it.href }), body) : h("button", Object.assign(props, { type: "button" }), body);
      })));
}
