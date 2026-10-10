/* blurssism React · TabBar · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, useLocale, useControllable } from "./_shared.js";
import { Icon } from "./Icon.js";

/* 화면 이동 메뉴라 탭(tablist)이 아니라 <nav>와 aria-current를 씁니다. 항목에 href가 있으면 링크로.
   기본으로 lg(1120px)부터 숨습니다(그때는 NavBar 링크). 계속 보이려면 hideFrom={false}.
   value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다(2.1). */
export function TabBar(p) {
  var L = useLocale(p.locale);
  var hide = p.hideFrom === undefined ? "lg" : p.hideFrom;
  var c = useControllable(p.value, p.defaultValue, p.onChange), value = c[0], pick = c[1];
  return h("nav", { className: cx("bl-tabbar bl-crema", hide && "bl-hide-from-" + hide, p.className), "aria-label": p.label || L.mainMenu },
    (p.items || []).map(function (it) {
      var on = it.id === value;
      return h(it.href ? "a" : "button", Object.assign(it.href ? { href: it.href } : { type: "button" }, {
        key: it.id, className: "bl-tab", "aria-current": on ? "page" : undefined,
        onClick: function () { pick(it.id); } }), h(Icon, { name: it.icon, filled: on }), it.label);
    }));
}
