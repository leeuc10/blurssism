/* blurssism React · NavBar · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, useLocale } from "./_shared.js";
import { IconButton } from "./IconButton.js";

export function NavBar(p) {
  var L = useLocale(p.locale);
  return h("header", { className: cx("bl-navbar bl-crema", p.className) },
    p.onBack ? h(IconButton, { icon: "chevron-left", label: L.back, plain: true, onClick: p.onBack }) : null,
    h("p", { className: "bl-navbar-title" }, p.title),
    p.links ? h("nav", { className: "bl-navbar-links", "aria-label": L.siteMenu }, p.links.map(function (l) {
      return h("a", { key: l.href, href: l.href, className: "bl-navbar-link", "aria-current": l.current ? "page" : undefined }, l.label);
    })) : null,
    p.actions || null);
}
