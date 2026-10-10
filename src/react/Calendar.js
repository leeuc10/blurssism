/* blurssism React · Calendar · © caffeinecat · MIT. 원본은 src/react/, scripts/build.mjs가 dist/index.mjs·index.cjs·bundle.js로 합칩니다. */
import { React, h, cx, useLocale } from "./_shared.js";
import { IconButton } from "./IconButton.js";


function sameDay(a, b) { return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function dayOf(d) { return d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null; }   // 시각을 버리고 날짜만

function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }

/* 방향키 ±1일·±1주, Home·End 주의 처음·끝, PageUp·PageDown 이전·다음 달(Shift는 해). 고를 수 없는 날도 포커스는 갑니다. */
function calendarKey(e, d) {
  var k = e.key;
  if (k === "ArrowRight") return addDays(d, 1);
  if (k === "ArrowLeft") return addDays(d, -1);
  if (k === "ArrowDown") return addDays(d, 7);
  if (k === "ArrowUp") return addDays(d, -7);
  if (k === "Home") return addDays(d, -d.getDay());
  if (k === "End") return addDays(d, 6 - d.getDay());
  if (k === "PageUp" || k === "PageDown") {
    var dir = k === "PageUp" ? -1 : 1, y = d.getFullYear() + (e.shiftKey ? dir : 0), m = d.getMonth() + (e.shiftKey ? 0 : dir);
    return new Date(y, m, Math.min(d.getDate(), new Date(y, m + 1, 0).getDate()));
  }
  return null;
}

export function Calendar(p) {
  var L = useLocale(p.locale), DOW = L.dow;
  // 오늘은 마운트한 뒤에 정합니다. 서버(UTC)와 브라우저의 날짜가 달라 하이드레이션이 어긋나지 않게.
  var nowSt = React.useState(null), today = p.today || nowSt[0];
  React.useEffect(function () { if (!p.today) nowSt[1](new Date()); }, []);
  var init = p.value || p.today || new Date();
  var st = React.useState(new Date(init.getFullYear(), init.getMonth(), 1)), month = st[0], setMonth = st[1];
  var vKey = p.value ? p.value.getFullYear() * 12 + p.value.getMonth() : null;
  React.useEffect(function () { if (p.value) setMonth(new Date(p.value.getFullYear(), p.value.getMonth(), 1)); }, [vKey]);   // 바깥에서 값이 다른 달로 바뀌면 따라갑니다
  var act = React.useState(null), active = act[0], setActive = act[1], grid = React.useRef(null), wantFocus = React.useRef(false);
  var y = month.getFullYear(), m = month.getMonth(), lo = dayOf(p.min), hi = dayOf(p.max);
  var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), cells = [];
  function inMonth(d) { return d && d.getFullYear() === y && d.getMonth() === m; }
  function off(d) { return (lo && d < lo) || (hi && d > hi); }
  var tab = inMonth(active) ? active : inMonth(p.value) ? dayOf(p.value) : inMonth(today) ? dayOf(today) : new Date(y, m, 1);
  React.useEffect(function () {
    if (!wantFocus.current || !grid.current) return;
    wantFocus.current = false;
    var b = grid.current.querySelector('[tabindex="0"]');
    if (b) b.focus();
  });
  function onKey(e) {
    var next = calendarKey(e, tab);
    if (!next) return;
    e.preventDefault();
    wantFocus.current = true;
    setActive(next);
    if (!inMonth(next)) setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  }
  for (var i = 0; i < first; i++) cells.push(h("span", { key: "b" + i }));
  for (var d = 1; d <= days; d++) (function (d) {
    var date = new Date(y, m, d), no = !!off(date);
    cells.push(h("button", { key: d, type: "button", className: "bl-cal-day", "aria-disabled": no ? "true" : undefined, tabIndex: sameDay(date, tab) ? 0 : -1,
      "aria-pressed": String(sameDay(date, p.value)), "data-today": String(sameDay(date, today)),
      "aria-label": L.dayLabel(y, m, d, DOW[date.getDay()]),
      onClick: function () { setActive(date); if (!no && p.onChange) p.onChange(date); } }, d));
  })(d);
  function go(n) { setActive(null); setMonth(new Date(y, m + n, 1)); }
  return h("div", { className: cx("bl-cal", p.className) },
    h("div", { className: "bl-cal-head" },
      h(IconButton, { icon: "chevron-left", label: L.prevMonth, plain: true, onClick: function () { go(-1); } }),
      h("p", { className: "bl-cal-title", "aria-live": "polite" }, L.monthTitle(y, m)),
      h(IconButton, { icon: "chevron-right", label: L.nextMonth, plain: true, onClick: function () { go(1); } })),
    h("div", { className: "bl-cal-grid", ref: grid, onKeyDown: onKey }, DOW.map(function (w, i) { return h("span", { key: i, className: "bl-cal-dow", "aria-hidden": "true" }, w); }), cells));
}
