/* blurssism React · Alert · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { h, cx, omit, withRef, useLocale } from "./_shared.js";
import { Icon } from "./Icon.js";
import { IconButton } from "./IconButton.js";

var alertIcons = { info: "spark", positive: "check", warning: "alert", danger: "alert" };

/* 흐름 안에 놓이는 불투명 안내 띠(떠 있지 않으므로 크레마가 아님). 색만으로 알리지 않도록 아이콘이 항상 붙습니다.
   info·positive는 role="status", warning·danger는 role="alert"(바로 읽힘). ref는 바깥 div. */
export var Alert = withRef("Alert", function (p, ref) {
  var tone = p.tone || "info", L = useLocale(p.locale), urgent = tone === "warning" || tone === "danger";
  return h("div", Object.assign(omit(p, ["tone", "title", "icon", "actions", "onDismiss", "className", "children", "locale", "role"]), {
    ref: ref, className: cx("bl-alert", "bl-alert-" + tone, p.className), role: p.role || (urgent ? "alert" : "status")
  }),
    h(Icon, { name: p.icon || alertIcons[tone] || "spark", className: "bl-alert-icon" }),
    h("div", { className: "bl-alert-body" },
      p.title ? h("p", { className: "bl-alert-title" }, p.title) : null,
      p.children != null ? h("div", { className: "bl-alert-text" }, p.children) : null,
      p.actions ? h("div", { className: "bl-alert-actions" }, p.actions) : null),
    p.onDismiss ? h(IconButton, { plain: true, icon: "close", label: L.dismiss, className: "bl-alert-close", onClick: p.onDismiss }) : null);
});
