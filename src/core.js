/* blurssism 컴포넌트 원본 · © caffeinecat · MIT
   이 파일 하나가 원본이고, scripts/build.mjs가 dist/index.mjs(ESM), dist/index.cjs(CommonJS),
   dist/bundle.js(<script>용 window.Blurssism)를 만듭니다. dist는 직접 고치지 마세요. */
export function createBlurssism(React) {
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  var warned = {};
  function warnOnce(key, msg) {
    if (warned[key] || typeof console === "undefined" || (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production")) return;
    warned[key] = true; console.warn("blurssism: " + msg);
  }
  /* 최신 값을 담아 두는 ref. effect가 처음 값을 붙잡지 않게 합니다(Dialog의 onClose 등). */
  function useLatest(v) { var r = React.useRef(v); r.current = v; return r; }
  /* 라디오 묶음 방향키: 선택을 옮기고 포커스도 따라갑니다. Home·End로 처음·끝. */
  function rovingKey(e, ids, current, pick) {
    var i = ids.indexOf(current), n = ids.length, next = null;
    if (!n) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i < 0 ? n - 1 : (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    pick(ids[next]);
    var items = e.currentTarget.querySelectorAll('[role="radio"]');
    if (items[next]) items[next].focus();
  }

  /* 단순 라인 아이콘 24×24, 1.75 stroke, currentColor */
  var PATHS = {
    home: "M4.5 10.5L12 4l7.5 6.5V19a1 1 0 0 1-1 1H15v-5.5H9V20H5.5a1 1 0 0 1-1-1z",
    search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20",
    heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
    chat: "M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4 3.5V16h0.5H7.5A2.5 2.5 0 0 1 5 13.5z",
    person: "M12 12a3.75 3.75 0 1 0 0-7.5A3.75 3.75 0 0 0 12 12zM5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5",
    bell: "M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15zM10 20.5h4",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6",
    plus: "M12 5v14M5 12h14",
    spark: "M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z",
    check: "M5 12.5l4.5 4.5L19 7.5",
    close: "M6.5 6.5l11 11M17.5 6.5l-11 11",
    "chevron-right": "M9.5 6l6 6-6 6",
    "chevron-left": "M14.5 6l-6 6 6 6",
    inbox: "M4 13.5l2.2-7A1.5 1.5 0 0 1 7.6 5.5h8.8a1.5 1.5 0 0 1 1.4 1l2.2 7V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18zM4 13.5h4.5l1 2h5l1-2H20",
    calendar: "M5.5 6h13a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM4.5 10.5h15M8.5 4v4M15.5 4v4",
    alert: "M12 4.5l8.5 15h-17zM12 10v4M12 16.8v.2"
  };
  function Icon(p) {
    var filled = p.filled && p.name === "heart";
    return h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", fill: filled ? "currentColor" : "none", stroke: "currentColor",
      strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", className: p.className }, h("path", { d: PATHS[p.name] || "" }));
  }

  function Button(p) {
    var variant = p.variant || "primary", tag = p.href ? "a" : "button";
    if (variant === "glass") warnOnce("variant-glass", 'Button variant="glass"는 2.0에서 사라져요. variant="crema"를 써 주세요.');
    return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["variant", "size", "block", "icon", "className", "children"]), {
      // "glass"는 1.4 이름(2.0에서 제거). 옛 CSS 덮어쓰기가 계속 맞도록 두 클래스를 함께 붙입니다.
      className: cx("bl-btn", variant === "crema" || variant === "glass" ? "bl-btn-crema bl-btn-glass" : "bl-btn-" + variant, p.size === "md" && "bl-btn-md", p.block && "bl-btn-block", p.className)
    }), p.icon ? h(Icon, { name: p.icon }) : null, p.children);
  }

  function IconButton(p) {
    return h("button", Object.assign({ type: "button" }, omit(p, ["icon", "label", "pressed", "plain", "className"]), {
      className: cx("bl-icon-btn", p.plain && "bl-icon-btn-plain", p.className), "aria-label": p.label,
      "aria-pressed": p.pressed == null ? undefined : String(!!p.pressed)
    }), h(Icon, { name: p.icon, filled: !!p.pressed }));
  }

  /* selected를 주면 제어 모드, 안 주면 누를 때마다 스스로 바뀝니다(defaultSelected로 처음 값). onChange(다음 값)를 부릅니다. */
  function Chip(p) {
    var st = React.useState(!!p.defaultSelected), on = p.selected != null ? !!p.selected : st[0];
    return h("button", Object.assign({ type: "button" }, omit(p, ["selected", "defaultSelected", "onChange", "className", "children"]), {
      className: cx("bl-chip", p.className), "aria-pressed": String(on),
      onClick: function (e) {
        if (p.selected == null) st[1](!on);
        p.onChange && p.onChange(!on);
        p.onClick && p.onClick(e);
      }
    }), on ? h(Icon, { name: "check" }) : null, p.children);
  }

  /* React 18의 useId는 서버·클라이언트에서 같은 값을 만들어 하이드레이션이 어긋나지 않습니다 */
  var uid = 0;
  var useStableId = React.useId || function () { return React.useMemo(function () { return "bl-" + (++uid); }, []); };
  function useId(given) { var auto = useStableId(); return given || auto; }

  function TextField(p) {
    var id = useId(p.id), help = p.error || p.help;
    return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
      h("label", { className: "bl-field-label", htmlFor: id }, p.label),
      h("input", Object.assign({}, omit(p, ["label", "help", "error", "className", "id"]), {
        id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
      })),
      help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? "오류: " + p.error : p.help) : null);
  }

  function Switch(p) {
    return h("button", Object.assign({ type: "button", role: "switch" }, omit(p, ["checked", "onChange", "label", "className"]), {
      className: cx("bl-switch", p.className), "aria-checked": String(!!p.checked), "aria-label": p.label,
      onClick: function () { p.onChange && p.onChange(!p.checked); }
    }));
  }

  function Badge(p) {
    return h("span", { className: cx("bl-badge", "bl-badge-" + (p.tone || "neutral"), p.className) }, p.icon ? h(Icon, { name: p.icon }) : null, p.children);
  }

  function Card(p) {
    return h("article", { className: cx("bl-card", p.className) },
      p.eyebrow ? h("p", { className: "bl-card-eyebrow" }, p.eyebrow) : null,
      p.title ? h("h3", { className: "bl-card-title" }, p.title) : null,
      p.quote ? h("p", { className: "bl-card-quote" }, p.quote) : null,
      p.body ? h("p", { className: "bl-card-body" }, p.body) : null,
      p.children ? h("div", { className: "bl-card-actions" }, p.children) : null);
  }

  function MediaCard(p) {
    var ph = h("div", { className: "bl-media-ph", "aria-hidden": "true" },
      h("i", { style: { left: "-12%", top: "8%", width: "70%", height: "56%", borderRadius: "var(--radius-full)", background: "var(--deco)" } }),
      h("i", { style: { right: "-10%", top: "28%", width: "52%", height: "64%", borderRadius: "var(--radius-xl)", background: "var(--accent)" } }),
      h("i", { style: { left: "18%", bottom: "-6%", width: "46%", height: "30%", borderRadius: "var(--radius-full)", background: "var(--positive)" } }));
    return h("article", { className: cx("bl-media", p.className), style: p.ratio ? { aspectRatio: p.ratio } : undefined },
      p.image ? h("img", { className: "bl-media-img", src: p.image, alt: p.imageAlt || "" }) : ph,
      p.badge ? h(Badge, { tone: p.badgeTone || "positive", icon: p.badgeIcon }, p.badge) : null,
      h("div", { className: "bl-media-bar " + (p.lite ? "bl-crema-lite bl-glass-lite" : "bl-crema bl-glass") },
        h("div", { className: "bl-media-text" },
          h("p", { className: "bl-media-title" }, p.title),
          p.meta ? h("p", { className: "bl-media-meta" }, p.meta) : null),
        p.action || null));
  }

  function ListItem(p) {
    var tag = p.href ? "a" : p.onClick ? "button" : "div";
    var trail = p.trailing !== undefined ? p.trailing : (tag !== "div" ? h(Icon, { name: "chevron-right" }) : null);
    return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["icon", "title", "subtitle", "trailing", "className"]), {
      className: cx("bl-item", p.className) }),
      p.icon ? h("span", { className: "bl-item-lead" }, h(Icon, { name: p.icon })) : null,
      h("span", { className: "bl-item-text" },
        h("span", { className: "bl-item-title" }, p.title),
        p.subtitle ? h("span", { className: "bl-item-sub" }, p.subtitle) : null),
      trail ? h("span", { className: "bl-item-trail" }, trail) : null);
  }


  function Select(p) {
    var id = useId(p.id), help = p.error || p.help;
    // placeholder가 있고 값이 정해지지 않았으면 빈 값("")에서 시작해 placeholder가 보이게 합니다(Svelte와 같게).
    var start = p.placeholder && p.value === undefined && p.defaultValue === undefined ? { defaultValue: "" } : {};
    return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
      h("label", { className: "bl-field-label", htmlFor: id }, p.label),
      h("div", { className: "bl-select" },
        h("select", Object.assign(start, omit(p, ["label", "help", "error", "className", "id", "options", "placeholder"]), {
          id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
        }),
          p.placeholder ? h("option", { value: "", disabled: true }, p.placeholder) : null,
          (p.options || []).map(function (o) { o = typeof o === "string" ? { value: o, label: o } : o; return h("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label); }))),
      help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? "오류: " + p.error : p.help) : null);
  }

  function Checkbox(p) {
    return h("label", { className: cx("bl-check", p.className) },
      h("input", Object.assign({ type: "checkbox" }, omit(p, ["label", "description", "className"]))),
      h("span", null, p.label, p.description ? h("span", { className: "bl-check-sub" }, p.description) : null));
  }

  function RadioGroup(p) {
    var name = useId(p.name);
    return h("fieldset", { className: cx("bl-radios", p.className) },
      p.legend ? h("legend", null, p.legend) : null,
      (p.options || []).map(function (o) {
        o = typeof o === "string" ? { value: o, label: o } : o;
        return h("label", { key: o.value, className: "bl-check" },
          h("input", { type: "radio", name: name, value: o.value, checked: p.value === o.value, disabled: o.disabled,
            onChange: function () { p.onChange && p.onChange(o.value); } }),
          h("span", null, o.label, o.description ? h("span", { className: "bl-check-sub" }, o.description) : null));
      }));
  }

  function SegmentedControl(p) {
    var items = p.items || [], ids = items.map(function (i) { return i.id; });
    var tab = ids.indexOf(p.value) >= 0 ? p.value : ids[0];   // 고른 것이 없으면 첫 항목으로 들어옵니다
    function pick(id) { p.onChange && p.onChange(id); }
    return h("div", { className: cx("bl-seg", p.block && "bl-seg-block", p.className), role: "radiogroup", "aria-label": p.label,
      onKeyDown: function (e) { rovingKey(e, ids, p.value, pick); } },
      items.map(function (it) {
        var on = it.id === p.value;
        return h("button", { key: it.id, type: "button", role: "radio", className: "bl-seg-item", "aria-checked": String(on), tabIndex: it.id === tab ? 0 : -1,
          onClick: function () { pick(it.id); } }, it.label);
      }));
  }

  function Avatar(p) {
    var nm = (p.name || "").trim(), initials = /^\+\d+$/.test(nm) ? nm : nm.slice(0, /[A-Za-z]/.test(nm[0]) ? 2 : 1).toUpperCase();
    return h("span", { className: cx("bl-avatar", p.size && p.size !== "md" && "bl-avatar-" + p.size, p.className), role: "img", "aria-label": p.name },
      p.image ? h("img", { src: p.image, alt: "" }) : initials);
  }

  /* 툴팁은 최상위 층(popover)에 띄워 overflow: hidden인 부모(MediaCard, Table)에 잘리지 않습니다. Esc로 닫힙니다. */
  function Tooltip(p) {
    var id = useId(), wrap = React.useRef(null), tip = React.useRef(null);
    var st = React.useState(false), open = st[0], setOpen = st[1];
    React.useEffect(function () {
      var t = tip.current, a = wrap.current;
      if (!t || !a || !t.showPopover) return;
      if (!open) { if (t.matches(":popover-open")) t.hidePopover(); return; }
      if (!t.matches(":popover-open")) t.showPopover();
      placeTooltip(t, a.firstElementChild || a);
    }, [open]);
    var own = React.isValidElement(p.children) && p.children.props["aria-describedby"];
    var child = React.isValidElement(p.children) ? React.cloneElement(p.children, { "aria-describedby": own ? own + " " + id : id }) : p.children;
    return h("span", { className: "bl-tip", ref: wrap,
      onMouseEnter: function () { setOpen(true); }, onMouseLeave: function () { setOpen(false); },
      onFocus: function () { setOpen(true); }, onBlur: function () { setOpen(false); },
      onKeyDown: function (e) { if (e.key === "Escape" && open) { e.stopPropagation(); setOpen(false); } } },
      child, h("span", { id: id, ref: tip, role: "tooltip", popover: "manual", className: "bl-tooltip-pop bl-crema-thick bl-glass-thick" }, p.label));
  }
  /* 기준 요소 위 가운데에 놓고, 위가 모자라면 아래로, 좌우는 화면 안으로 */
  function placeTooltip(t, a) {
    var r = a.getBoundingClientRect(), w = t.offsetWidth, hgt = t.offsetHeight, gap = 8, vw = window.innerWidth;
    var below = r.top - hgt - gap < 4;
    var x = Math.min(Math.max(r.left + r.width / 2, w / 2 + 4), vw - w / 2 - 4);
    t.style.left = x + "px";
    t.style.top = (below ? r.bottom + gap : r.top - gap) + "px";
    if (below) t.setAttribute("data-place", "below"); else t.removeAttribute("data-place");
  }

  function Progress(p) {
    var max = p.max || 100, pct = Math.max(0, Math.min(100, (p.value / max) * 100));
    return h("div", { className: cx("bl-progress", p.className) },
      p.label ? h("div", { className: "bl-progress-head" }, h("span", null, p.label), h("span", null, p.valueText || Math.round(pct) + "%")) : null,
      h("div", { className: "bl-progress-track", role: "progressbar", "aria-label": p.label, "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": p.value },
        h("div", { className: "bl-progress-fill", style: { width: pct + "%" } })));
  }

  function Skeleton(p) {
    return h("span", { className: cx("bl-skel", p.className), "aria-hidden": "true",
      style: { width: p.width || "100%", height: p.height || 16, borderRadius: p.circle ? "var(--radius-full)" : undefined } });
  }

  /* 칸 그리기: render(행) → 노드, format(행) → 글자(Svelte와 같음). caption이 있을 때만 가로 스크롤 영역에 이름과 포커스를 줍니다. */
  function Table(p) {
    return h("div", p.caption ? { className: "bl-table-wrap", tabIndex: 0, role: "region", "aria-label": p.caption } : { className: "bl-table-wrap" },
      h("table", { className: cx("bl-table", p.className) },
        p.caption ? h("caption", null, p.caption) : null,
        h("thead", null, h("tr", null, p.columns.map(function (c) { return h("th", { key: c.key, scope: "col", className: c.numeric ? "bl-num" : undefined }, c.label); }))),
        h("tbody", null, p.rows.map(function (r, i) {
          return h("tr", { key: r.id || i }, p.columns.map(function (c) {
            return h("td", { key: c.key, className: c.numeric ? "bl-num" : undefined }, c.render ? c.render(r) : c.format ? c.format(r) : r[c.key]);
          }));
        }))));
  }

  var DOW = ["일", "월", "화", "수", "목", "금", "토"];
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
  function Calendar(p) {
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
        "aria-label": y + "년 " + (m + 1) + "월 " + d + "일 " + DOW[date.getDay()] + "요일",
        onClick: function () { setActive(date); if (!no && p.onChange) p.onChange(date); } }, d));
    })(d);
    function go(n) { setActive(null); setMonth(new Date(y, m + n, 1)); }
    return h("div", { className: cx("bl-cal", p.className) },
      h("div", { className: "bl-cal-head" },
        h(IconButton, { icon: "chevron-left", label: "이전 달", plain: true, onClick: function () { go(-1); } }),
        h("p", { className: "bl-cal-title", "aria-live": "polite" }, y + "년 " + (m + 1) + "월"),
        h(IconButton, { icon: "chevron-right", label: "다음 달", plain: true, onClick: function () { go(1); } })),
      h("div", { className: "bl-cal-grid", ref: grid, onKeyDown: onKey }, DOW.map(function (w) { return h("span", { key: w, className: "bl-cal-dow", "aria-hidden": "true" }, w); }), cells));
  }

  function EmptyState(p) {
    return h("div", { className: cx("bl-empty", p.className) },
      h("span", { className: "bl-empty-icon" }, h(Icon, { name: p.icon || "inbox" })),
      h("p", { className: "bl-empty-title" }, p.title),
      p.body ? h("p", { className: "bl-empty-body" }, p.body) : null,
      p.children || null);
  }

  /* 네이티브 <dialog>를 showModal()로 엽니다. 최상위 층에 떠서 크레마 안에서 열어도 갇히지 않고, 뒤 화면은 inert가 됩니다.
     Esc·바깥 누르기로 onClose(alert면 바깥 누르기로는 닫지 않음). 열 때 첫 조작 요소로, 닫으면 원래 자리로 포커스를 돌려줍니다. */
  function Dialog(p) {
    var ref = React.useRef(null), id = useId(), onClose = useLatest(p.onClose);
    React.useEffect(function () {
      var d = ref.current;
      if (!p.open || !d) return;
      var prev = document.activeElement;
      if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
      var f = d.querySelector("button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])");
      (f || d).focus();
      function cancel(e) { e.preventDefault(); onClose.current && onClose.current(); }
      d.addEventListener("cancel", cancel);
      return function () {
        d.removeEventListener("cancel", cancel);
        if (d.open && d.close) d.close();
        if (prev && prev.focus) prev.focus();
      };
    }, [p.open]);
    if (!p.open) return null;
    return h("dialog", { ref: ref, className: cx("bl-dialog bl-crema-thick bl-glass-thick", p.className), role: p.alert ? "alertdialog" : undefined,
      "aria-labelledby": id, "aria-describedby": p.description ? id + "-desc" : undefined, tabIndex: -1,
      onClick: function (e) {
        if (p.alert || e.target !== e.currentTarget) return;
        var r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose.current && onClose.current();
      } },
      h("h2", { id: id, className: "bl-dialog-title" }, p.title),
      p.description ? h("p", { id: id + "-desc", className: "bl-dialog-body" }, p.description) : null,
      p.children ? h("div", { className: "bl-dialog-actions" }, p.children) : null);
  }

  /* ── 팔레트·반응형 ─────────────────────────────
     palettes, setPalette, getPalette, getBreakpoint, onBreakpointChange는 utils(src/utils.js)에서 옵니다. */

  /* 팔레트 라디오 묶음. 방향키로 고르고(포커스도 따라감), 고른 것에는 체크 표시가 붙습니다.
     applyBrandColor()로 등록한 브랜드 팔레트도 함께 보여 줍니다(custom={false}로 숨김). */
  function PalettePicker(p) {
    var st = React.useState(p.value || "black"), cur = p.value || st[0];
    var cs = React.useState([]), custom = cs[0];   // 서버와 첫 렌더는 빈 목록(하이드레이션), 마운트 뒤에 채웁니다
    React.useEffect(function () {
      if (!p.value) st[1](getPalette(p.target));
      cs[1](getCustomPalettes());
      return onCustomPalettesChange(function () { cs[1](getCustomPalettes()); });
    }, []);
    function pick(id) {
      if (!p.value) st[1](id);
      if (p.apply !== false) setPalette(id, p.target);
      p.onChange && p.onChange(id);
    }
    var list = palettes.filter(function (pl) { return !p.group || pl.group === p.group; })
      .concat(p.custom === false || (p.group && p.group !== "custom") ? [] : custom);
    var ids = list.map(function (pl) { return pl.id; }), tab = ids.indexOf(cur) >= 0 ? cur : ids[0];
    return h("div", { className: cx("bl-palettes", p.className), role: "radiogroup", "aria-label": p.label || "색 팔레트",
      onKeyDown: function (e) { rovingKey(e, ids, cur, pick); } },
      list.map(function (pl) {
        var on = pl.id === cur;
        return h("button", { key: pl.id, type: "button", role: "radio", "aria-checked": String(on), tabIndex: pl.id === tab ? 0 : -1, className: "bl-palette", "aria-label": pl.name,
          "data-palette": pl.id, onClick: function () { pick(pl.id); } },
          h("span", { className: "bl-palette-dot", "aria-hidden": "true" }),
          h("span", { className: p.compact ? "bl-sr-only" : "bl-palette-name" }, pl.name));
      }));
  }

  /* 화면 단계("xs"…"xl"). 서버와 첫 렌더에서는 null이라 하이드레이션이 어긋나지 않습니다. */
  function useBreakpoint() {
    return React.useSyncExternalStore(onBreakpointChange, function () { return getBreakpoint(); }, function () { return null; });
  }

  function Container(p) {
    var tag = p.as || "div";
    return h(tag, Object.assign({}, omit(p, ["as", "size", "className", "children"]), {
      className: cx("bl-container", p.size === "prose" && "bl-container-prose", p.size === "full" && "bl-container-full", p.className) }), p.children);
  }

  /* columns: 숫자 또는 { xs, sm, md, lg, xl } — 단계별 열 수. 생략한 단계는 아래 단계 값을 이어받습니다. */
  function Grid(p) {
    var c = typeof p.columns === "number" ? { xs: p.columns } : (p.columns || { xs: 1, sm: 2, lg: 3 });
    var style = {}, last = 1;
    ["xs", "sm", "md", "lg", "xl"].forEach(function (bp) { if (c[bp] != null) last = c[bp]; style["--bl-cols-" + bp] = last; });
    if (p.gap) style["--bl-grid-gap"] = "var(--" + p.gap + ")";
    return h(p.as || "div", Object.assign({}, omit(p, ["as", "columns", "gap", "className", "children", "style"]), {
      className: cx("bl-autogrid", p.className), style: Object.assign(style, p.style) }), p.children);
  }

  function NavBar(p) {
    return h("header", { className: cx("bl-navbar bl-crema bl-glass", p.className) },
      p.onBack ? h(IconButton, { icon: "chevron-left", label: "뒤로", plain: true, onClick: p.onBack }) : null,
      h("p", { className: "bl-navbar-title" }, p.title),
      p.links ? h("nav", { className: "bl-navbar-links", "aria-label": "주요 메뉴" }, p.links.map(function (l) {
        return h("a", { key: l.href, href: l.href, className: "bl-navbar-link", "aria-current": l.current ? "page" : undefined }, l.label);
      })) : null,
      p.actions || null);
  }

  /* 화면 이동 메뉴라 탭(tablist)이 아니라 <nav>와 aria-current를 씁니다. 항목에 href가 있으면 링크로.
     기본으로 lg(1120px)부터 숨습니다(그때는 NavBar 링크). 계속 보이려면 hideFrom={false}. */
  function TabBar(p) {
    var hide = p.hideFrom === undefined ? "lg" : p.hideFrom;
    return h("nav", { className: cx("bl-tabbar bl-crema bl-glass", hide && "bl-hide-from-" + hide, p.className), "aria-label": p.label || "주요 메뉴" },
      (p.items || []).map(function (it) {
        var on = it.id === p.value;
        return h(it.href ? "a" : "button", Object.assign(it.href ? { href: it.href } : { type: "button" }, {
          key: it.id, className: "bl-tab", "aria-current": on ? "page" : undefined,
          onClick: function () { p.onChange && p.onChange(it.id); } }), h(Icon, { name: it.icon, filled: on }), it.label);
      }));
  }

  function Sheet(p) {
    return h("div", { className: cx("bl-sheet bl-crema-thick bl-glass-thick", p.className), role: "dialog", "aria-label": p.title },
      h("div", { className: "bl-sheet-grip", "aria-hidden": "true" }),
      h("h2", { className: "bl-sheet-title" }, p.title),
      p.description ? h("p", { className: "bl-sheet-body" }, p.description) : null,
      h("div", { className: "bl-sheet-actions" }, p.children));
  }

  function Toast(p) {
    var tone = p.tone || "neutral";
    var icon = tone === "positive" ? "check" : tone === "danger" ? "alert" : null;
    return h("div", { className: cx("bl-toast bl-crema-thick bl-glass-thick", p.className), role: "status", "data-tone": tone },
      icon ? h(Icon, { name: icon }) : null,
      h("span", { className: "bl-toast-msg" }, p.children),
      p.actionLabel ? h(Button, { variant: "ghost", size: "md", onClick: p.onAction }, p.actionLabel) : null);
  }

  var api = { Button: Button, IconButton: IconButton, Chip: Chip, TextField: TextField, Select: Select, Checkbox: Checkbox, RadioGroup: RadioGroup, Switch: Switch, SegmentedControl: SegmentedControl, PalettePicker: PalettePicker, Badge: Badge, Avatar: Avatar, Tooltip: Tooltip, Progress: Progress, Skeleton: Skeleton, Card: Card, MediaCard: MediaCard, ListItem: ListItem, Table: Table, Calendar: Calendar, EmptyState: EmptyState, Container: Container, Grid: Grid, NavBar: NavBar, TabBar: TabBar, Sheet: Sheet, Dialog: Dialog, Toast: Toast, Icon: Icon,
    useBreakpoint: useBreakpoint };
  return api;
}
