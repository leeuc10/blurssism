/* blurssism React · Link · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef, useLocale } from "./_shared.js";
import { Icon } from "./Icon.js";

/* 본문 안의 글자 링크(accent-ink + 밑줄). external이면 새 창으로 열고, 스크린리더 문구와 작은 화살표를 붙입니다. ref는 <a>. */
export var Link = withRef("Link", function (p, ref) {
  var L = useLocale(p.locale), ext = !!p.external;
  return h("a", Object.assign(omit(p, ["external", "muted", "className", "children", "locale"]), ext ? { target: "_blank", rel: "noopener noreferrer" } : {}, {
    ref: ref, className: cx("bl-link", p.muted && "bl-link-muted", p.className)
  }),
    p.children,
    ext ? h("span", { className: "bl-sr-only" }, " " + L.openInNew) : null,
    ext ? h(Icon, { name: "chevron-right", className: "bl-link-ext" }) : null);
});
