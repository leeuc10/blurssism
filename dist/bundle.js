/* @ds-bundle: {"format":4,"namespace":"Blurssism","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Chip"},{"name":"TextField"},{"name":"Select"},{"name":"Checkbox"},{"name":"RadioGroup"},{"name":"Switch"},{"name":"SegmentedControl"},{"name":"PalettePicker"},{"name":"Badge"},{"name":"Avatar"},{"name":"Tooltip"},{"name":"Progress"},{"name":"Skeleton"},{"name":"Card"},{"name":"MediaCard"},{"name":"ListItem"},{"name":"Table"},{"name":"Calendar"},{"name":"EmptyState"},{"name":"Container"},{"name":"Grid"},{"name":"NavBar"},{"name":"TabBar"},{"name":"Sheet"},{"name":"Dialog"},{"name":"Toast"},{"name":"Icon"}]} */
/* blurssism v1.5.0 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
(function () {

/** 팔레트 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
const palettes = [{"id":"espresso","name":"에스프레소","group":"caffeine","description":"기본. 볶은 원두의 갈색과 크레마.","swatch":{"light":"#7a4524","dark":"#e2ab7a"}},{"id":"matcha","name":"말차","group":"caffeine","description":"녹차의 차분한 초록.","swatch":{"light":"#3e6b35","dark":"#a3d48f"}},{"id":"chai","name":"차이","group":"caffeine","description":"향신료 밀크티의 주황.","swatch":{"light":"#9a4512","dark":"#f2a66a"}},{"id":"coldbrew","name":"콜드브루","group":"caffeine","description":"차갑게 우린 커피의 깊은 남색.","swatch":{"light":"#2b4c74","dark":"#9cc1ea"}},{"id":"mocha","name":"모카","group":"caffeine","description":"초콜릿과 장미빛 코코아.","swatch":{"light":"#7c3a46","dark":"#e8a5b0"}},{"id":"classic","name":"클래식","group":"caffeine","description":"1.2까지의 자두색.","swatch":{"light":"#7a3b69","dark":"#e0a6cf"}},{"id":"blue","name":"블루","group":"web","description":"링크와 버튼에서 가장 익숙한 파랑.","swatch":{"light":"#1d5bb8","dark":"#8eb9f5"}},{"id":"indigo","name":"인디고","group":"web","description":"SaaS와 개발 도구에서 흔한 남보라.","swatch":{"light":"#4a3fb5","dark":"#aaa6f4"}},{"id":"violet","name":"바이올렛","group":"web","description":"창작 도구와 커뮤니티의 보라.","swatch":{"light":"#7038a8","dark":"#cfa6f2"}},{"id":"teal","name":"틸","group":"web","description":"헬스케어와 핀테크의 청록.","swatch":{"light":"#0e6b66","dark":"#78d0c4"}},{"id":"emerald","name":"에메랄드","group":"web","description":"결제와 성장 서비스의 선명한 초록.","swatch":{"light":"#13704a","dark":"#7fd6a5"}},{"id":"pink","name":"핑크","group":"web","description":"커머스와 뷰티의 분홍.","swatch":{"light":"#b0306a","dark":"#f49ac0"}},{"id":"graphite","name":"그래파이트","group":"web","description":"색 없이 먹색 하나로 쓰는 단색.","swatch":{"light":"#3b3632","dark":"#e2dbd2"}}];

/** 브레이크포인트(min-width, px). xs는 0부터 sm 전까지입니다. */
const breakpoints = { sm: 600, md: 768, lg: 1120, xl: 1440 };
const ORDER = ["xs", "sm", "md", "lg", "xl"];

const version = "1.5.0";
const author = "caffeinecat";

function rootEl(el) {
  if (el) return el;
  return typeof document !== "undefined" ? document.documentElement : null;
}

/** 팔레트를 바꿉니다. el을 주면 그 요소 아래만 바뀝니다. 알 수 없는 id면 false. */
function setPalette(id, el) {
  const target = rootEl(el);
  if (!target || !(palettes.some((p) => p.id === id) || customPalettes[id])) return false;
  target.setAttribute("data-palette", id);
  return true;
}

/** 현재 팔레트 id. 지정이 없으면 "espresso". */
function getPalette(el) {
  const target = rootEl(el);
  return (target && target.getAttribute("data-palette")) || "espresso";
}

/** 테마를 바꿉니다: "light" | "dark" | "system"(시스템 설정 따르기). */
function setTheme(theme, el) {
  const target = rootEl(el);
  if (!target) return;
  if (theme === "system") target.removeAttribute("data-theme");
  else target.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
}

/** 지금 보이는 테마: "light" | "dark". 서버에서는 "light". */
function getTheme(el) {
  const target = rootEl(el);
  const set = target && target.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

/** 너비에 해당하는 단계: "xs" | "sm" | "md" | "lg" | "xl". 너비를 안 주면 창 너비, 서버에서는 "xs". */
function getBreakpoint(width) {
  const w = width != null ? width : typeof window !== "undefined" ? window.innerWidth : 0;
  if (w >= breakpoints.xl) return "xl";
  if (w >= breakpoints.lg) return "lg";
  if (w >= breakpoints.md) return "md";
  if (w >= breakpoints.sm) return "sm";
  return "xs";
}

/** 지금 단계가 bp 이상인지. 예: isAtLeast("md") */
function isAtLeast(bp, width) {
  return ORDER.indexOf(getBreakpoint(width)) >= ORDER.indexOf(bp);
}

/** 단계가 바뀔 때마다 cb(단계)를 부릅니다. 해제 함수를 돌려줍니다. */
function onBreakpointChange(cb) {
  if (typeof window === "undefined" || !window.matchMedia) return function () {};
  const queries = Object.values(breakpoints).map((px) => window.matchMedia(`(min-width: ${px}px)`));
  const fire = () => cb(getBreakpoint());
  queries.forEach((q) => (q.addEventListener ? q.addEventListener("change", fire) : q.addListener(fire)));
  return function () {
    queries.forEach((q) => (q.removeEventListener ? q.removeEventListener("change", fire) : q.removeListener(fire)));
  };
}

/** 저사양 기기·절전·투명도 줄이기 설정이면 true */
function shouldReduceCrema() {
  if (typeof window === "undefined") return false;
  const n = window.navigator || {}, mq = window.matchMedia;
  if (mq && mq("(prefers-reduced-transparency: reduce)").matches) return true;
  if (n.connection && n.connection.saveData) return true;
  if (n.deviceMemory && n.deviceMemory <= 4) return true;
  if (n.hardwareConcurrency && n.hardwareConcurrency <= 4) return true;
  return false;
}

const DESKTOP_QUERY = `(min-width: ${breakpoints.lg}px) and (hover: hover) and (pointer: fine)`;

/** 데스크톱 모드를 켤 만한 기기인지: lg 이상 화면, 마우스, 코어 6개 이상, 메모리 8GB 이상(알 수 있을 때). */
function isDesktopCapable() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (!window.matchMedia(DESKTOP_QUERY).matches) return false;
  const n = window.navigator || {};
  if (n.hardwareConcurrency && n.hardwareConcurrency < 6) return false;
  if (n.deviceMemory && n.deviceMemory < 8) return false;
  if (n.connection && n.connection.saveData) return false;
  return true;
}

const cremaState = { mq: null, onMq: null, onMove: null, raf: 0 };

function pointerLight(on) {
  const root = rootEl();
  if (!root || typeof window === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) on = false;
  if (on && !cremaState.onMove) {
    let x = 0, y = 0;
    cremaState.onMove = function (e) {
      x = e.clientX; y = e.clientY;
      if (cremaState.raf) return;
      cremaState.raf = requestAnimationFrame(function () {
        cremaState.raf = 0;
        root.style.setProperty("--bl-light-x", x + "px");
        root.style.setProperty("--bl-light-y", y + "px");
      });
    };
    window.addEventListener("pointermove", cremaState.onMove, { passive: true });
  } else if (!on && cremaState.onMove) {
    window.removeEventListener("pointermove", cremaState.onMove);
    cremaState.onMove = null;
    root.style.removeProperty("--bl-light-x");
    root.style.removeProperty("--bl-light-y");
  }
}

/**
 * <html data-crema>(와 호환용 data-glass)를 정합니다. 크레마가 켜졌으면 true.
 *   "off"  : 블러 없음(저사양·절전·투명도 줄이기)
 *   "on"   : 기본 블러레마
 *   "rich" : 데스크톱 모드. 블러가 더 깊고, 포인터 주변에 따뜻한 빛이 번집니다.
 * 옵션: applyCremaPreference({ rich: "auto" | true | false, pointerLight: true | false })
 *   rich 기본값 "auto"는 데스크톱(isDesktopCapable)일 때만 켜고, 창 크기가 바뀌면 다시 판단합니다.
 *   rich: false로 데스크톱 모드를 끕니다. applyCremaPreference(true | false)로 강제로 켜고 끌 수도 있습니다.
 */
function applyCremaPreference(options) {
  if (typeof document === "undefined") return true;
  const o = typeof options === "boolean" ? { force: options } : options || {};
  const root = document.documentElement;
  const reduce = o.force === undefined ? shouldReduceCrema() : !o.force;
  const rich = o.rich === undefined ? "auto" : o.rich;
  if (cremaState.mq) {
    cremaState.mq.removeEventListener ? cremaState.mq.removeEventListener("change", cremaState.onMq) : cremaState.mq.removeListener(cremaState.onMq);
    cremaState.mq = cremaState.onMq = null;
  }
  function update() {
    const mode = reduce ? "off" : rich === true || (rich === "auto" && isDesktopCapable()) ? "rich" : "on";
    root.setAttribute("data-crema", mode);
    root.setAttribute("data-glass", mode); // 1.x 호환 (2.0에서 제거)
    pointerLight(mode === "rich" && o.pointerLight !== false);
  }
  update();
  if (!reduce && rich === "auto" && window.matchMedia) {
    cremaState.mq = window.matchMedia(DESKTOP_QUERY);
    cremaState.onMq = update;
    cremaState.mq.addEventListener ? cremaState.mq.addEventListener("change", update) : cremaState.mq.addListener(update);
  }
  return !reduce;
}

/** 크레마 모드를 바로 정합니다. "auto"는 applyCremaPreference()와 같습니다. */
function setCremaMode(mode) {
  if (mode === "off") return applyCremaPreference({ force: false });
  if (mode === "on") return applyCremaPreference({ force: true, rich: false });
  if (mode === "rich") return applyCremaPreference({ force: true, rich: true });
  return applyCremaPreference();
}

/** 지금 크레마 모드: "off" | "on" | "rich". 설정 전이나 서버에서는 "on". */
function getCremaMode() {
  const root = rootEl();
  const m = root && (root.getAttribute("data-crema") || root.getAttribute("data-glass"));
  return m === "off" || m === "rich" ? m : "on";
}

/* ── 1.4 이름(glass) 별칭: 그대로 동작하고, 개발 중에 한 번만 안내합니다. 2.0에서 제거됩니다. ── */
const warned = {};
function deprecated(oldName, newName) {
  if (warned[oldName]) return;
  warned[oldName] = true;
  const prod = typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production";
  if (!prod && typeof console !== "undefined") console.warn(`blurssism: ${oldName}()는 2.0에서 사라져요. ${newName}()를 써 주세요.`);
}
/** @deprecated 1.5부터 shouldReduceCrema() */
function shouldReduceGlass() { deprecated("shouldReduceGlass", "shouldReduceCrema"); return shouldReduceCrema(); }
/** @deprecated 1.5부터 applyCremaPreference() */
function applyGlassPreference(options) { deprecated("applyGlassPreference", "applyCremaPreference"); return applyCremaPreference(options); }
/** @deprecated 1.5부터 setCremaMode() */
function setGlassMode(mode) { deprecated("setGlassMode", "setCremaMode"); return setCremaMode(mode); }
/** @deprecated 1.5부터 getCremaMode() */
function getGlassMode() { deprecated("getGlassMode", "getCremaMode"); return getCremaMode(); }

/* ── 브랜드색 팔레트 ─────────────────────────────
   색 하나를 주면 강조색 묶음을 라이트·다크 모두 WCAG 대비에 맞춰 만듭니다. */

/** 바탕·글자 기준색. 빌드할 때 src/tokens.json에서 채워집니다. */
const BASE = {"light":{"paper":"#faf6f0","paper-raised":"#ffffff","on-accent":"#ffffff"},"dark":{"paper":"#16110d","paper-raised":"#201913","on-accent":"#21180f"}};
const customPalettes = {};

function parseHex(c) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(c).trim());
  if (!m) throw new TypeError(`blurssism: "${c}"는 색으로 읽을 수 없어요. #ff5a1f처럼 hex로 넣어 주세요.`);
  const h = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
const toHex = (rgb) => "#" + rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s * 100, l * 100];
}
function hsl(h, s, l) {
  s = Math.min(100, Math.max(0, s)) / 100; l = Math.min(100, Math.max(0, l)) / 100;
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  return toHex([0, 8, 4].map((n) => 255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))));
}
function luminance(hex) {
  return parseHex(hex).map((v) => v / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}
/** 두 색의 WCAG 대비 */
function contrastRatio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
function walk(h, s, l, step, ok) {
  l = Math.min(100, Math.max(0, l));
  for (;;) {
    const c = hsl(h, s, l);
    if (ok(c) || l + step < 0 || l + step > 100) return c;
    l += step;
  }
}

/**
 * 브랜드색 하나로 팔레트를 만듭니다. 서버에서도 됩니다.
 * createPalette("#ff5a1f", { id: "brand", name: "브랜드" })
 * → { id, name, group: "custom", source, values: { light, dark }, adjusted, warnings }
 */
function createPalette(color, options) {
  const o = options || {};
  const src = toHex(parseHex(color));
  const [h, s, l] = rgbToHsl(parseHex(src));
  const L = BASE.light, D = BASE.dark;
  const okFill = (bg1, bg2, on) => (a) => contrastRatio(on, a) >= 4.5 && contrastRatio(a, bg1) >= 3 && contrastRatio(a, bg2) >= 3;
  const okText = (bg1, bg2, soft) => (a) => contrastRatio(a, bg1) >= 4.5 && contrastRatio(a, bg2) >= 4.5 && contrastRatio(a, soft) >= 4.5;

  // 라이트: 흰 글자가 올라가도록 필요한 만큼만 어둡게
  const fitL = okFill(L.paper, L["paper-raised"], "#ffffff");
  const accentL = fitL(src) ? src : walk(h, s, l, -1, fitL);
  const softL = hsl(h, Math.min(s, 70), 94);
  const inkL = walk(h, s, rgbToHsl(parseHex(accentL))[2] - 6, -1, okText(L.paper, L["paper-raised"], softL));
  // 원래 색이 밝으면 장식색으로 살려 둡니다
  const bright = luminance(src);
  const decoL = bright >= 0.35 && bright <= 0.9 ? src : hsl(h, s * 0.55, 78);

  // 다크: 진한 글자가 올라가도록 밝게, 채도는 조금 낮게
  const s2 = Math.min(s, 72);
  const accentD = walk(h, s2, Math.max(l, 66), 1, okFill(D.paper, D["paper-raised"], D["on-accent"]));
  const softD = hsl(h, s * 0.35, 16);
  const inkD = walk(h, s2, rgbToHsl(parseHex(accentD))[2] + 6, 1, okText(D.paper, D["paper-raised"], softD));
  const decoD = hsl(h, s * 0.4, 47);

  const tint = (hex, a) => `rgba(${parseHex(hex).join(", ")}, ${a})`;
  const warnings = [];
  const vivid = s >= 40 && l > 15 && l < 85;
  if (accentL !== src) warnings.push({ code: "adjusted", message: `라이트 테마에서 흰 글자가 읽히도록 강조색을 ${src}에서 ${accentL}로 맞췄어요.` + (decoL === src ? " 원래 색은 장식색(deco)으로 남겨 뒀어요." : "") });
  if (vivid && (h < 16 || h >= 340)) warnings.push({ code: "danger", message: "빨강 계열이라 오류 색(danger)과 헷갈릴 수 있어요. 오류는 항상 아이콘과 문구를 함께 보여 주세요." });
  if (vivid && h >= 36 && h < 66) warnings.push({ code: "warning", message: "노랑 계열이라 경고 색(warning)과 헷갈릴 수 있어요. 노랑은 강조보다 장식색으로 쓰는 편이 나아요." });
  if (vivid && h >= 120 && h < 165) warnings.push({ code: "positive", message: "초록 계열이라 성공 색(positive)과 비슷해요. 상태는 문구로 구분해 주세요." });
  if (s < 8) warnings.push({ code: "neutral", message: "채도가 거의 없어 그래파이트처럼 단색으로 보여요. 선택 상태는 굵기나 아이콘으로도 보여 주세요." });

  return {
    id: o.id || "brand",
    name: o.name || "브랜드",
    group: "custom",
    source: src,
    adjusted: accentL !== src,
    values: {
      light: { accent: accentL, "accent-soft": softL, "on-accent": "#ffffff", "accent-ink": inkL, deco: decoL, "crema-tint-accent": tint(accentL, 0.14), "glass-tint-accent": tint(accentL, 0.14) },
      dark: { accent: accentD, "accent-soft": softD, "on-accent": D["on-accent"], "accent-ink": inkD, deco: decoD, "crema-tint-accent": tint(accentD, 0.18), "glass-tint-accent": tint(accentD, 0.18) },
    },
    warnings,
  };
}

/** createPalette 결과를 CSS 문자열로. 서버 렌더링에서 <style>에 넣거나 파일로 저장할 때 씁니다. */
function paletteToCss(palette) {
  const id = palette.id, decl = (t, pad) => Object.entries(palette.values[t]).map(([k, v]) => `${pad}--${k}: ${v};`).join("\n");
  return `[data-palette="${id}"] {\n${decl("light", "  ")}\n}\n` +
    `[data-theme="dark"][data-palette="${id}"], [data-theme="dark"] [data-palette="${id}"] {\n${decl("dark", "  ")}\n}\n` +
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"])[data-palette="${id}"], :root:not([data-theme="light"]) [data-palette="${id}"] {\n${decl("dark", "    ")}\n  }\n}\n`;
}

/**
 * 브랜드색으로 팔레트를 만들어 바로 적용합니다. 만든 팔레트를 돌려줍니다(warnings 확인).
 * applyBrandColor("#ff5a1f")  ·  applyBrandColor("#0f9d58", { id: "green", target: el })
 */
function applyBrandColor(color, options) {
  const o = options || {};
  const p = createPalette(color, o);
  customPalettes[p.id] = p;
  if (typeof document !== "undefined") {
    const sid = "bl-palette-" + p.id;
    let style = document.getElementById(sid);
    if (!style) { style = document.createElement("style"); style.id = sid; document.head.appendChild(style); }
    style.textContent = paletteToCss(p);
    if (o.apply !== false) rootEl(o.target).setAttribute("data-palette", p.id);
  }
  return p;
}

function createBlurssism(React) {
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
    return h("span", { className: "bl-tip" }, child, h("span", { id: id, role: "tooltip", className: "bl-tooltip bl-crema-thick bl-glass-thick" }, p.label));
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
      h("div", { ref: ref, className: cx("bl-dialog bl-crema-thick bl-glass-thick", p.className), role: p.alert ? "alertdialog" : "dialog", "aria-modal": "true", "aria-labelledby": id, tabIndex: -1 },
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
    return h("header", { className: cx("bl-navbar bl-crema bl-glass", p.className) },
      p.onBack ? h(IconButton, { icon: "chevron-left", label: "뒤로", plain: true, onClick: p.onBack }) : null,
      h("p", { className: "bl-navbar-title" }, p.title),
      p.links ? h("nav", { className: "bl-navbar-links", "aria-label": "주요 메뉴" }, p.links.map(function (l) {
        return h("a", { key: l.href, href: l.href, className: "bl-navbar-link", "aria-current": l.current ? "page" : undefined }, l.label);
      })) : null,
      p.actions || null);
  }

  function TabBar(p) {
    return h("div", { className: cx("bl-tabbar bl-crema bl-glass", p.className), role: "tablist", "aria-label": p.label || "주요 메뉴" },
      (p.items || []).map(function (it) {
        var on = it.id === p.value;
        return h("button", { key: it.id, type: "button", role: "tab", className: "bl-tab", "aria-selected": String(on),
          onClick: function () { p.onChange && p.onChange(it.id); } }, h(Icon, { name: it.icon, filled: on }), it.label);
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

  if (typeof window !== "undefined" && window.React) {
    window.Blurssism = Object.assign(window.Blurssism || {}, createBlurssism(window.React), { palettes, breakpoints, version, author, setPalette, getPalette, setTheme, getTheme, getBreakpoint, isAtLeast, onBreakpointChange, shouldReduceCrema, isDesktopCapable, applyCremaPreference, setCremaMode, getCremaMode, shouldReduceGlass, applyGlassPreference, setGlassMode, getGlassMode, contrastRatio, createPalette, paletteToCss, applyBrandColor });
  } else if (typeof console !== "undefined") {
    console.error("blurssism: window.React가 없습니다. react와 react-dom UMD 스크립트를 먼저 불러오세요.");
  }
})();
