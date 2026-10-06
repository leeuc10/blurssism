/* blurssism 컴포넌트 원본 · © caffeinecat · MIT
   이 파일 하나가 원본이고, scripts/build.mjs가 dist/index.mjs(ESM), dist/index.cjs(CommonJS),
   dist/bundle.js(<script>용 window.Blurssism)를 만듭니다. dist는 직접 고치지 마세요. */
export function createBlurssism(React) {
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }

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
    return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["variant", "size", "block", "icon", "className", "children"]), {
      className: cx("bl-btn", "bl-btn-" + variant, p.size === "md" && "bl-btn-md", p.block && "bl-btn-block", p.className)
    }), p.icon ? h(Icon, { name: p.icon }) : null, p.children);
  }

  function IconButton(p) {
    return h("button", Object.assign({ type: "button" }, omit(p, ["icon", "label", "pressed", "plain", "className"]), {
      className: cx("bl-icon-btn", p.plain && "bl-icon-btn-plain", p.className), "aria-label": p.label,
      "aria-pressed": p.pressed == null ? undefined : String(!!p.pressed)
    }), h(Icon, { name: p.icon, filled: !!p.pressed }));
  }

  function Chip(p) {
    return h("button", Object.assign({ type: "button" }, omit(p, ["selected", "className", "children"]), {
      className: cx("bl-chip", p.className), "aria-pressed": String(!!p.selected)
    }), p.selected ? h(Icon, { name: "check" }) : null, p.children);
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
      h("div", { className: "bl-media-bar " + (p.lite ? "bl-glass-lite" : "bl-glass") },
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
    return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
      h("label", { className: "bl-field-label", htmlFor: id }, p.label),
      h("div", { className: "bl-select" },
        h("select", Object.assign({}, omit(p, ["label", "help", "error", "className", "id", "options", "placeholder"]), {
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
    function key(e) {
      var ids = (p.items || []).map(function (i) { return i.id; }), i = ids.indexOf(p.value);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); p.onChange && p.onChange(ids[(i + 1) % ids.length]); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); p.onChange && p.onChange(ids[(i - 1 + ids.length) % ids.length]); }
    }
    return h("div", { className: cx("bl-seg", p.block && "bl-seg-block", p.className), role: "radiogroup", "aria-label": p.label, onKeyDown: key },
      (p.items || []).map(function (it) {
        var on = it.id === p.value;
        return h("button", { key: it.id, type: "button", role: "radio", className: "bl-seg-item", "aria-checked": String(on), tabIndex: on ? 0 : -1,
          onClick: function () { p.onChange && p.onChange(it.id); } }, it.label);
      }));
  }

  function Avatar(p) {
    var nm = (p.name || "").trim(), initials = /^\+\d+$/.test(nm) ? nm : nm.slice(0, /[A-Za-z]/.test(nm[0]) ? 2 : 1).toUpperCase();
    return h("span", { className: cx("bl-avatar", p.size && p.size !== "md" && "bl-avatar-" + p.size, p.className), role: "img", "aria-label": p.name },
      p.image ? h("img", { src: p.image, alt: "" }) : initials);
  }

  function Tooltip(p) {
    var id = useId();
    var child = React.isValidElement(p.children) ? React.cloneElement(p.children, { "aria-describedby": id }) : p.children;
    return h("span", { className: "bl-tip" }, child, h("span", { id: id, role: "tooltip", className: "bl-tooltip bl-glass-thick" }, p.label));
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

  function Table(p) {
    return h("div", { className: "bl-table-wrap", tabIndex: 0, role: "region", "aria-label": p.caption },
      h("table", { className: cx("bl-table", p.className) },
        p.caption ? h("caption", null, p.caption) : null,
        h("thead", null, h("tr", null, p.columns.map(function (c) { return h("th", { key: c.key, scope: "col", className: c.numeric ? "bl-num" : undefined }, c.label); }))),
        h("tbody", null, p.rows.map(function (r, i) {
          return h("tr", { key: r.id || i }, p.columns.map(function (c) {
            return h("td", { key: c.key, className: c.numeric ? "bl-num" : undefined }, c.render ? c.render(r) : r[c.key]);
          }));
        }))));
  }

  var DOW = ["일", "월", "화", "수", "목", "금", "토"];
  function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function Calendar(p) {
    var init = p.value || new Date();
    var st = React.useState(new Date(init.getFullYear(), init.getMonth(), 1)), month = st[0], setMonth = st[1];
    var today = p.today || new Date(), y = month.getFullYear(), m = month.getMonth();
    var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), cells = [];
    for (var i = 0; i < first; i++) cells.push(h("span", { key: "b" + i }));
    for (var d = 1; d <= days; d++) (function (d) {
      var date = new Date(y, m, d), off = (p.min && date < p.min) || (p.max && date > p.max);
      cells.push(h("button", { key: d, type: "button", className: "bl-cal-day", disabled: !!off,
        "aria-pressed": String(!!sameDay(date, p.value)), "data-today": String(!!sameDay(date, today)),
        "aria-label": y + "년 " + (m + 1) + "월 " + d + "일 " + DOW[date.getDay()] + "요일",
        onClick: function () { p.onChange && p.onChange(date); } }, d));
    })(d);
    return h("div", { className: cx("bl-cal", p.className) },
      h("div", { className: "bl-cal-head" },
        h(IconButton, { icon: "chevron-left", label: "이전 달", plain: true, onClick: function () { setMonth(new Date(y, m - 1, 1)); } }),
        h("p", { className: "bl-cal-title", "aria-live": "polite" }, y + "년 " + (m + 1) + "월"),
        h(IconButton, { icon: "chevron-right", label: "다음 달", plain: true, onClick: function () { setMonth(new Date(y, m + 1, 1)); } })),
      h("div", { className: "bl-cal-grid" }, DOW.map(function (w) { return h("span", { key: w, className: "bl-cal-dow", "aria-hidden": "true" }, w); }), cells));
  }

  function EmptyState(p) {
    return h("div", { className: cx("bl-empty", p.className) },
      h("span", { className: "bl-empty-icon" }, h(Icon, { name: p.icon || "inbox" })),
      h("p", { className: "bl-empty-title" }, p.title),
      p.body ? h("p", { className: "bl-empty-body" }, p.body) : null,
      p.children || null);
  }

  function Dialog(p) {
    var ref = React.useRef(null), id = useId();
    React.useEffect(function () {
      if (!p.open) return;
      var prev = document.activeElement, el = ref.current;
      var f = el && el.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      (f || el) && (f || el).focus();
      function onKey(e) {
        if (e.key === "Escape") { p.onClose && p.onClose(); return; }
        if (e.key !== "Tab" || !el) return;
        var all = el.querySelectorAll("button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex='-1'])");
        if (!all.length) return;
        var a = all[0], z = all[all.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
      document.addEventListener("keydown", onKey);
      return function () { document.removeEventListener("keydown", onKey); prev && prev.focus && prev.focus(); };
    }, [p.open]);
    if (!p.open) return null;
    return h("div", { className: "bl-scrim", onMouseDown: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } },
      h("div", { ref: ref, className: cx("bl-dialog bl-glass-thick", p.className), role: p.alert ? "alertdialog" : "dialog", "aria-modal": "true", "aria-labelledby": id, tabIndex: -1 },
        h("h2", { id: id, className: "bl-dialog-title" }, p.title),
        p.description ? h("p", { className: "bl-dialog-body" }, p.description) : null,
        p.children ? h("div", { className: "bl-dialog-actions" }, p.children) : null));
  }


  /* ── 팔레트·반응형 ─────────────────────────────
     palettes, setPalette, getPalette, getBreakpoint, onBreakpointChange는 utils(src/utils.js)에서 옵니다. */

  function PalettePicker(p) {
    var st = React.useState(p.value || "espresso"), cur = p.value || st[0];
    React.useEffect(function () { if (!p.value) st[1](getPalette(p.target)); }, []);
    function pick(id) {
      if (!p.value) st[1](id);
      if (p.apply !== false) setPalette(id, p.target);
      p.onChange && p.onChange(id);
    }
    return h("div", { className: cx("bl-palettes", p.className), role: "radiogroup", "aria-label": p.label || "색 팔레트" },
      palettes.filter(function (pl) { return !p.group || pl.group === p.group; }).map(function (pl) {
        var on = pl.id === cur;
        return h("button", { key: pl.id, type: "button", role: "radio", "aria-checked": String(on), className: "bl-palette", "aria-label": pl.name,
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
    return h("header", { className: cx("bl-navbar bl-glass", p.className) },
      p.onBack ? h(IconButton, { icon: "chevron-left", label: "뒤로", plain: true, onClick: p.onBack }) : null,
      h("p", { className: "bl-navbar-title" }, p.title),
      p.links ? h("nav", { className: "bl-navbar-links", "aria-label": "주요 메뉴" }, p.links.map(function (l) {
        return h("a", { key: l.href, href: l.href, className: "bl-navbar-link", "aria-current": l.current ? "page" : undefined }, l.label);
      })) : null,
      p.actions || null);
  }

  function TabBar(p) {
    return h("div", { className: cx("bl-tabbar bl-glass", p.className), role: "tablist", "aria-label": p.label || "주요 메뉴" },
      (p.items || []).map(function (it) {
        var on = it.id === p.value;
        return h("button", { key: it.id, type: "button", role: "tab", className: "bl-tab", "aria-selected": String(on),
          onClick: function () { p.onChange && p.onChange(it.id); } }, h(Icon, { name: it.icon, filled: on }), it.label);
      }));
  }

  function Sheet(p) {
    return h("div", { className: cx("bl-sheet bl-glass-thick", p.className), role: "dialog", "aria-label": p.title },
      h("div", { className: "bl-sheet-grip", "aria-hidden": "true" }),
      h("h2", { className: "bl-sheet-title" }, p.title),
      p.description ? h("p", { className: "bl-sheet-body" }, p.description) : null,
      h("div", { className: "bl-sheet-actions" }, p.children));
  }

  function Toast(p) {
    var tone = p.tone || "neutral";
    var icon = tone === "positive" ? "check" : tone === "danger" ? "alert" : null;
    return h("div", { className: cx("bl-toast bl-glass-thick", p.className), role: "status", "data-tone": tone },
      icon ? h(Icon, { name: icon }) : null,
      h("span", { className: "bl-toast-msg" }, p.children),
      p.actionLabel ? h(Button, { variant: "ghost", size: "md", onClick: p.onAction }, p.actionLabel) : null);
  }

  var api = { Button: Button, IconButton: IconButton, Chip: Chip, TextField: TextField, Select: Select, Checkbox: Checkbox, RadioGroup: RadioGroup, Switch: Switch, SegmentedControl: SegmentedControl, PalettePicker: PalettePicker, Badge: Badge, Avatar: Avatar, Tooltip: Tooltip, Progress: Progress, Skeleton: Skeleton, Card: Card, MediaCard: MediaCard, ListItem: ListItem, Table: Table, Calendar: Calendar, EmptyState: EmptyState, Container: Container, Grid: Grid, NavBar: NavBar, TabBar: TabBar, Sheet: Sheet, Dialog: Dialog, Toast: Toast, Icon: Icon,
    useBreakpoint: useBreakpoint };
  return api;
}
