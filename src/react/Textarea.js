/* blurssism React · Textarea · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, omit, withRef, useId, useLocale } from "./_shared.js";

/* autoResize: 숨은 측정 요소 없이 scrollHeight로 높이를 맞춥니다. maxRows를 넘으면 그 높이에서 멈추고 안쪽이 스크롤됩니다. */
function textareaFit(el, maxRows) {
  if (!el) return;
  var cs = getComputedStyle(el), line = parseFloat(cs.lineHeight) || 26;
  var border = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
  var extra = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0) + border;
  el.style.height = "auto";
  var want = el.scrollHeight + border;                       // .bl-textarea는 border-box
  var cap = maxRows ? Math.round(line * maxRows + extra) : Infinity;
  el.style.height = Math.min(want, cap) + "px";
  el.style.overflowY = want > cap ? "auto" : "hidden";
}

/* ref는 <textarea>에 닿습니다. rows 기본 4, autoResize면 내용에 따라 maxRows까지 자랍니다. */
export var Textarea = withRef("Textarea", function (p, ref) {
  var id = useId(p.id), help = p.error || p.help, L = useLocale(p.locale);
  var inner = React.useRef(null);
  var setRef = React.useCallback(function (el) {
    inner.current = el;
    if (typeof ref === "function") ref(el); else if (ref) ref.current = el;
  }, [ref]);
  var auto = !!p.autoResize, maxRows = p.maxRows;
  React.useEffect(function () {
    if (!auto || !inner.current) return;
    textareaFit(inner.current, maxRows);
  }, [auto, maxRows, p.value, p.defaultValue]);
  function onInput(e) {
    if (auto) textareaFit(e.currentTarget, maxRows);
    p.onInput && p.onInput(e);
  }
  return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
    h("label", { className: "bl-field-label", htmlFor: id }, p.label),
    h("textarea", Object.assign({ rows: 4 }, omit(p, ["label", "help", "error", "className", "id", "locale", "autoResize", "maxRows", "onInput"]), {
      ref: setRef, id: id, className: cx("bl-field-input bl-textarea", auto && "bl-textarea-auto"), onInput: onInput,
      "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
    })),
    help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? L.errorPrefix + p.error : p.help) : null);
});
