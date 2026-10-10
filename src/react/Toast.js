/* blurssism React · Toast · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, useLocale } from "./_shared.js";
import { Icon } from "./Icon.js";
import { Button } from "./Button.js";
import { IconButton } from "./IconButton.js";

var TOAST_ICON = { positive: "check", danger: "alert", warning: "alert", info: "spark" };

/* 토스트 한 장(그리기만). 쌓기·자동 닫힘은 ToastProvider + useToast()가 합니다(2.1). 톤: neutral · positive · warning · danger · info */
export function Toast(p) {
  var tone = p.tone || "neutral", icon = TOAST_ICON[tone], L = useLocale(p.locale);
  return h("div", { className: cx("bl-toast bl-crema-thick", p.className), role: tone === "danger" || tone === "warning" ? "alert" : "status", "data-tone": tone },
    icon ? h(Icon, { name: icon }) : null,
    h("span", { className: "bl-toast-msg" }, p.children),
    p.actionLabel ? h(Button, { variant: "ghost", size: "md", onClick: p.onAction }, p.actionLabel) : null,
    p.onDismiss ? h(IconButton, { icon: "close", label: L.dismiss, plain: true, onClick: p.onDismiss, className: "bl-toast-close" }) : null);
}

var ToastContext = React.createContext(null);
var toastSeq = 0;

/* 앱 루트를 감싸면 화면 아래 가운데(lg 이상은 오른쪽 아래)에 토스트가 쌓입니다. 한 번에 max개(기본 3), 기본 4초 뒤 사라지고 마우스를 올리면 멈춥니다. */
export function ToastProvider(p) {
  var st = React.useState([]), list = st[0], setList = st[1];
  var timers = React.useRef({});
  var dismiss = React.useCallback(function (id) {
    clearTimeout(timers.current[id]); delete timers.current[id];
    setList(function (l) { return l.map(function (t) { return t.id === id ? Object.assign({}, t, { closing: true }) : t; }); });
    setTimeout(function () { setList(function (l) { return l.filter(function (t) { return t.id !== id; }); }); }, 200);
  }, []);
  var show = React.useCallback(function (opts) {
    var o = typeof opts === "string" ? { message: opts } : opts || {};
    var id = o.id || "bl-toast-" + (++toastSeq), duration = o.duration === undefined ? (p.duration === undefined ? 4000 : p.duration) : o.duration;
    var max = p.max || 3;
    setList(function (l) { var next = l.filter(function (t) { return t.id !== id; }).concat([Object.assign({}, o, { id: id })]); return next.slice(Math.max(0, next.length - max)); });
    if (duration > 0) timers.current[id] = setTimeout(function () { dismiss(id); }, duration);
    return id;
  }, [dismiss, p.duration, p.max]);
  function pause(id) { clearTimeout(timers.current[id]); }
  function resume(t) { if (t.duration !== 0 && !t.closing) timers.current[t.id] = setTimeout(function () { dismiss(t.id); }, 1500); }
  React.useEffect(function () { return function () { Object.keys(timers.current).forEach(function (k) { clearTimeout(timers.current[k]); }); }; }, []);
  var api = React.useMemo(function () { return { show: show, dismiss: dismiss }; }, [show, dismiss]);
  return h(ToastContext.Provider, { value: api }, p.children,
    h("div", { className: cx("bl-toaster", p.className), "aria-live": "polite", "aria-relevant": "additions" },
      list.map(function (t) {
        return h("div", { key: t.id, className: "bl-toaster-item", "data-closing": t.closing ? "true" : undefined,
          onMouseEnter: function () { pause(t.id); }, onMouseLeave: function () { resume(t); } },
          h(Toast, { tone: t.tone, actionLabel: t.actionLabel, onDismiss: t.dismissible === false ? undefined : function () { dismiss(t.id); },
            onAction: function () { if (t.onAction) t.onAction(); dismiss(t.id); } }, t.message));
      })));
}

/* useToast().show({ message, tone, actionLabel, onAction, duration, dismissible }) → id · useToast().dismiss(id) */
export function useToast() {
  var ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("blurssism: useToast()는 <ToastProvider> 안에서만 쓸 수 있어요. 앱 루트를 ToastProvider로 감싸 주세요.");
  return ctx;
}
