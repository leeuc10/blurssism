/* blurssism v1.6.1 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
"use strict";

/** 팔레트 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
const palettes = [{"id":"black","name":"블랙","group":"caffeine","description":"기본. 블랙커피의 검정과 그 위의 크레마.","swatch":{"light":"#000000","dark":"#f2f2f2"}},{"id":"espresso","name":"에스프레소","group":"caffeine","description":"볶은 원두의 갈색과 크레마. 1.6.0까지의 기본.","swatch":{"light":"#7a4524","dark":"#e2ab7a"}},{"id":"matcha","name":"말차","group":"caffeine","description":"녹차의 차분한 초록.","swatch":{"light":"#3e6b35","dark":"#a3d48f"}},{"id":"chai","name":"차이","group":"caffeine","description":"향신료 밀크티의 주황.","swatch":{"light":"#9a4512","dark":"#f2a66a"}},{"id":"coldbrew","name":"콜드브루","group":"caffeine","description":"차갑게 우린 커피의 깊은 남색.","swatch":{"light":"#2b4c74","dark":"#9cc1ea"}},{"id":"mocha","name":"모카","group":"caffeine","description":"초콜릿과 장미빛 코코아.","swatch":{"light":"#7c3a46","dark":"#e8a5b0"}},{"id":"classic","name":"클래식","group":"caffeine","description":"1.2까지의 자두색.","swatch":{"light":"#7a3b69","dark":"#e0a6cf"}},{"id":"blue","name":"블루","group":"web","description":"링크와 버튼에서 가장 익숙한 파랑.","swatch":{"light":"#1d5bb8","dark":"#8eb9f5"}},{"id":"indigo","name":"인디고","group":"web","description":"SaaS와 개발 도구에서 흔한 남보라.","swatch":{"light":"#4a3fb5","dark":"#aaa6f4"}},{"id":"violet","name":"바이올렛","group":"web","description":"창작 도구와 커뮤니티의 보라.","swatch":{"light":"#7038a8","dark":"#cfa6f2"}},{"id":"teal","name":"틸","group":"web","description":"헬스케어와 핀테크의 청록.","swatch":{"light":"#0e6b66","dark":"#78d0c4"}},{"id":"emerald","name":"에메랄드","group":"web","description":"결제와 성장 서비스의 선명한 초록.","swatch":{"light":"#13704a","dark":"#7fd6a5"}},{"id":"pink","name":"핑크","group":"web","description":"커머스와 뷰티의 분홍.","swatch":{"light":"#b0306a","dark":"#f49ac0"}},{"id":"graphite","name":"그래파이트","group":"web","description":"색 없이 먹색 하나로 쓰는 단색.","swatch":{"light":"#3b3632","dark":"#e2dbd2"}}];
/** 배경 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
const backgrounds = [{"id":"cream","name":"크림","description":"기본. 우유 거품 같은 따뜻한 크림색.","swatch":{"light":"#faf6f0","dark":"#16110d"}},{"id":"white","name":"화이트","description":"색 없는 흰 바탕. 카드는 테두리로 구분합니다.","swatch":{"light":"#ffffff","dark":"#121212"}},{"id":"gray","name":"그레이","description":"옅은 회색 바탕 위에 흰 카드.","swatch":{"light":"#f2f2f2","dark":"#1a1a1a"}}];

/** 브레이크포인트(min-width, px). xs는 0부터 sm 전까지입니다. */
const breakpoints = { sm: 600, md: 768, lg: 1120, xl: 1440 };
const ORDER = ["xs", "sm", "md", "lg", "xl"];

const version = "1.6.1";
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

/** 현재 팔레트 id. 지정이 없으면 "black". */
function getPalette(el) {
  const target = rootEl(el);
  return (target && target.getAttribute("data-palette")) || "black";
}

/** 배경을 바꿉니다("cream" | "white" | "gray" 또는 applyBackgroundColor로 만든 id). el을 주면 그 요소 아래만. 알 수 없는 id면 false. */
function setBackground(id, el) {
  const target = rootEl(el);
  if (!target || !(backgrounds.some((b) => b.id === id) || customBackgrounds[id])) return false;
  target.setAttribute("data-background", id);
  return true;
}

/** 현재 배경 id. 지정이 없으면 "cream". */
function getBackground(el) {
  const target = rootEl(el);
  return (target && target.getAttribute("data-background")) || "cream";
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

/**
 * 저사양 기기·절전·투명도 줄이기 설정이면 true.
 * 메모리(GB)가 minMemory보다 작거나 코어가 minCores보다 적으면 저사양으로 봅니다(기본 4·4).
 * 코어 수는 메모리를 알려 주는 브라우저(Chromium)에서만 봅니다. Safari는 코어 수를 줄여서 알려 주기 때문입니다.
 */
function shouldReduceCrema(options) {
  if (typeof window === "undefined") return false;
  const o = options || {}, minMemory = o.minMemory != null ? o.minMemory : 4, minCores = o.minCores != null ? o.minCores : 4;
  const n = window.navigator || {}, mq = window.matchMedia;
  if (mq && mq("(prefers-reduced-transparency: reduce)").matches) return true;
  if (n.connection && n.connection.saveData) return true;
  if (n.deviceMemory) {
    if (n.deviceMemory < minMemory) return true;
    if (n.hardwareConcurrency && n.hardwareConcurrency < minCores) return true;
  }
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
/** 블러가 걸리는 크레마 요소. 포인터 빛과 auditCrema()가 씁니다. */
const CREMA_SELECTOR = ".bl-crema, .bl-crema-thick, .bl-btn-crema, .bl-icon-btn:not(.bl-icon-btn-plain), .bl-glass, .bl-glass-thick, .bl-btn-glass";

/* 포인터 빛: 좌표를 <html>이 아니라 크레마 요소에만, 요소 기준 좌표로 씁니다.
   문서 전체의 스타일을 다시 계산하지 않고, 배경을 화면에 고정(fixed)하지 않아 스크롤할 때 다시 그리지 않습니다. */
function pointerLight(on) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) on = false;
  if (on && !cremaState.onMove) {
    let x = 0, y = 0;
    cremaState.onMove = function (e) {
      x = e.clientX; y = e.clientY;
      if (cremaState.raf) return;
      cremaState.raf = requestAnimationFrame(function () {
        cremaState.raf = 0;
        const els = document.querySelectorAll(CREMA_SELECTOR);
        const rects = Array.prototype.map.call(els, (el) => el.getBoundingClientRect());   // 읽기를 먼저 모두 하고
        els.forEach((el, i) => {                                                           // 쓰기는 나중에 (레이아웃 한 번)
          el.style.setProperty("--bl-light-x", Math.round(x - rects[i].left) + "px");
          el.style.setProperty("--bl-light-y", Math.round(y - rects[i].top) + "px");
        });
      });
    };
    window.addEventListener("pointermove", cremaState.onMove, { passive: true });
  } else if (!on && cremaState.onMove) {
    window.removeEventListener("pointermove", cremaState.onMove);
    if (cremaState.raf) cancelAnimationFrame(cremaState.raf);
    cremaState.onMove = null;
    cremaState.raf = 0;
    document.querySelectorAll(CREMA_SELECTOR).forEach((el) => { el.style.removeProperty("--bl-light-x"); el.style.removeProperty("--bl-light-y"); });
  }
}

/**
 * <html data-crema>(와 호환용 data-glass)를 정합니다. 크레마가 켜졌으면 true.
 *   "off"  : 블러 없음(저사양·절전·투명도 줄이기)
 *   "on"   : 기본 블러레마
 *   "rich" : 데스크톱 모드. 블러가 더 깊고, 포인터 주변에 따뜻한 빛이 번집니다.
 * 옵션: applyCremaPreference({ rich: "auto" | true | false, pointerLight: true | false, minMemory: 4, minCores: 4 })
 *   rich 기본값 "auto"는 데스크톱(isDesktopCapable)일 때만 켜고, 창 크기가 바뀌면 다시 판단합니다.
 *   rich: false로 데스크톱 모드를 끕니다. applyCremaPreference(true | false)로 강제로 켜고 끌 수도 있습니다.
 */
function applyCremaPreference(options) {
  if (typeof document === "undefined") return true;
  const o = typeof options === "boolean" ? { force: options } : options || {};
  const root = document.documentElement;
  const reduce = o.force === undefined ? shouldReduceCrema(o) : !o.force;
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

/* ── 개발 중 검사 ─────────────────────────────
   블러 예산·primary 버튼 개수·옛 glass 이름을 화면에서 세어 콘솔로 알려 줍니다. 배포 빌드(NODE_ENV=production)에서는 아무것도 하지 않습니다. */
const isProd = () => typeof process !== "undefined" && !!process.env && process.env.NODE_ENV === "production";

function onScreen(el) {
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height || r.bottom <= 0 || r.right <= 0 || r.top >= window.innerHeight || r.left >= window.innerWidth) return false;
  const cs = getComputedStyle(el);
  return cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
}
function hasBlur(el) {
  const cs = getComputedStyle(el), f = cs.backdropFilter || cs.webkitBackdropFilter;
  return !!f && f !== "none";
}

/**
 * 지금 화면을 한 번 검사해 문제 목록을 돌려줍니다. 서버에서는 [].
 * checkCrema() → [{ code: "blur-budget" | "primary" | "legacy-glass", message, elements }]
 */
function checkCrema(options) {
  if (typeof document === "undefined" || typeof window === "undefined") return [];
  const o = options || {}, issues = [];
  const mode = getCremaMode();
  const budget = o.budget != null ? o.budget : mode === "rich" ? 6 : mode === "off" ? 0 : 3;
  const blurred = Array.prototype.filter.call(document.querySelectorAll(o.all ? "body *" : CREMA_SELECTOR + ", .bl-scrim, .bl-dialog, .bl-tooltip, .bl-tooltip-pop, [style*='backdrop-filter']"),
    (el) => hasBlur(el) && onScreen(el));
  if (blurred.length > budget) issues.push({ code: "blur-budget", elements: blurred,
    message: `블러가 걸린 면이 화면에 ${blurred.length}개 있어요(예산 ${budget}개, 모드 ${mode}). 반복되는 면은 .bl-crema-lite(MediaCard는 lite)로 바꾸거나 크레마를 줄여 주세요.` });
  const primaries = Array.prototype.filter.call(document.querySelectorAll(".bl-btn-primary"), onScreen);
  if (primaries.length > 1) issues.push({ code: "primary", elements: primaries,
    message: `primary 버튼이 화면에 ${primaries.length}개 있어요. 가장 중요한 행동 하나만 primary로 두고 나머지는 variant="ghost"나 "crema"로 바꿔 주세요.` });
  const legacy = Array.prototype.filter.call(document.querySelectorAll(".bl-glass, .bl-glass-thick, .bl-glass-lite, .bl-btn-glass, [data-glass]"), (el) =>
    el.hasAttribute("data-glass") ? el !== document.documentElement && !el.hasAttribute("data-crema")
      : !/\bbl-(crema|btn-crema)/.test(el.className));
  if (legacy.length) issues.push({ code: "legacy-glass", elements: legacy,
    message: `1.4 이름(.bl-glass*, .bl-btn-glass, data-glass)을 쓰는 요소가 ${legacy.length}개 있어요. 2.0에서 사라지니 .bl-crema*, .bl-btn-crema, data-crema로 바꿔 주세요.` });
  return issues;
}

/**
 * 개발 중에 화면이 바뀔 때마다 checkCrema()를 돌려 새 문제만 콘솔에 알립니다. 멈추는 함수를 돌려줍니다.
 * 앱 시작 시: if (import.meta.env.DEV) auditCrema();
 */
function auditCrema(options) {
  const o = options || {};
  if (typeof document === "undefined" || typeof window === "undefined" || (isProd() && !o.force)) return function () {};
  let timer = 0, last = "";
  const report = o.onReport || ((list) => list.forEach((i) => console.warn("blurssism: " + i.message, i.elements)));
  function run() {
    timer = 0;
    const list = checkCrema(o), key = list.map((i) => i.message).join("|");
    if (key !== last) { last = key; if (list.length) report(list); }
  }
  function later() { if (!timer) timer = setTimeout(run, 400); }
  const mo = typeof MutationObserver !== "undefined" ? new MutationObserver(later) : null;
  if (mo) mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "open", "hidden", "data-crema"] });
  window.addEventListener("resize", later, { passive: true });
  window.addEventListener("scroll", later, { passive: true, capture: true });
  later();
  return function () {
    if (mo) mo.disconnect();
    window.removeEventListener("resize", later);
    window.removeEventListener("scroll", later, { capture: true });
    if (timer) clearTimeout(timer);
  };
}

/* ── 1.4 이름(glass) 별칭: 그대로 동작하고, 개발 중에 한 번만 안내합니다. 2.0에서 제거됩니다. ── */
const warned = {};
function deprecated(oldName, newName) {
  if (warned[oldName]) return;
  warned[oldName] = true;
  if (!isProd() && typeof console !== "undefined") console.warn(`blurssism: ${oldName}()는 2.0에서 사라져요. ${newName}()를 써 주세요.`);
}
/** @deprecated 1.5부터 shouldReduceCrema() */
function shouldReduceGlass(options) { deprecated("shouldReduceGlass", "shouldReduceCrema"); return shouldReduceCrema(options); }
/** @deprecated 1.5부터 applyCremaPreference() */
function applyGlassPreference(options) { deprecated("applyGlassPreference", "applyCremaPreference"); return applyCremaPreference(options); }
/** @deprecated 1.5부터 setCremaMode() */
function setGlassMode(mode) { deprecated("setGlassMode", "setCremaMode"); return setCremaMode(mode); }
/** @deprecated 1.5부터 getCremaMode() */
function getGlassMode() { deprecated("getGlassMode", "getCremaMode"); return getCremaMode(); }

/* ── 브랜드색 팔레트 ─────────────────────────────
   색 하나를 주면 강조색 묶음을 라이트·다크 모두 WCAG 대비에 맞춰 만듭니다. */

/** 바탕·글자 기준색. 빌드할 때 src/tokens.json에서 채워집니다. */
const BASE = {"light":{"paper":"#faf6f0","paper-raised":"#ffffff","paper-sunken":"#f1e9df","ink":"#21180f","ink-muted":"#5e5146","ink-subtle":"#72655a","line":"#e8ded2","line-strong":"#8e8174","accent":"#000000","accent-soft":"#eee9e3","on-accent":"#ffffff","accent-ink":"#000000","positive":"#3d6650","positive-soft":"#e3ede6","warning":"#8a5300","warning-soft":"#fbf0dc","deco":"#d9c8b4","danger":"#b42318","danger-soft":"#fbe9e7","info":"#1d5a8c","focus-ring":"#1d5a8c","crema-ink-muted":"#342a21","accents":[["#000000","#000000"],["#7a4524","#653819"],["#3e6b35","#335a2c"],["#9a4512","#843a0e"],["#2b4c74","#233f61"],["#7c3a46","#6a303b"],["#7a3b69","#6a2f5b"],["#1d5bb8","#184c9a"],["#4a3fb5","#3d3399"],["#7038a8","#5f2e90"],["#0e6b66","#0b5a56"],["#13704a","#0f5e3e"],["#b0306a","#962659"],["#3b3632","#2e2a26"]],"shadow-crema":"inset 0 1px 0 var(--crema-edge), 0 10px 30px rgba(33, 24, 15, 0.10)","shadow-sheet":"inset 0 1px 0 var(--crema-edge), 0 -8px 40px rgba(33, 24, 15, 0.12)"},"dark":{"paper":"#16110d","paper-raised":"#201913","paper-sunken":"#0f0b08","ink":"#f4ece2","ink-muted":"#b8aa9b","ink-subtle":"#9b8d7f","line":"#372e26","line-strong":"#80736a","accent":"#f2f2f2","accent-soft":"#2a2520","on-accent":"#21180f","accent-ink":"#ffffff","positive":"#8fc0a2","positive-soft":"#1f2e25","warning":"#f0c46a","warning-soft":"#3a2c12","deco":"#8c7663","danger":"#f2867a","danger-soft":"#3b1b17","info":"#8cc0ec","focus-ring":"#8cc0ec","crema-ink-muted":"#e2d8cc","accents":[["#f2f2f2","#ffffff"],["#e2ab7a","#ecbf96"],["#a3d48f","#b5dea4"],["#f2a66a","#f6bb8b"],["#9cc1ea","#b2cff0"],["#e8a5b0","#efbac2"],["#e0a6cf","#e8b6d9"],["#8eb9f5","#a9cbf8"],["#aaa6f4","#bfbcf7"],["#cfa6f2","#dbbcf5"],["#78d0c4","#95dccf"],["#7fd6a5","#9ce0b8"],["#f49ac0","#f7b3d0"],["#e2dbd2","#ece6de"]],"shadow-crema":"inset 0 1px 0 var(--crema-edge), 0 10px 30px rgba(0, 0, 0, 0.42)","shadow-sheet":"inset 0 1px 0 var(--crema-edge), 0 -8px 40px rgba(0, 0, 0, 0.5)"}};
const customPalettes = {};
const customBackgrounds = {};
const customListeners = [];

/** applyBrandColor()로 등록한 팔레트 목록 [{ id, name, group: "custom" }]. PalettePicker가 함께 보여 줍니다. */
function getCustomPalettes() {
  return Object.keys(customPalettes).map((id) => ({ id, name: customPalettes[id].name, group: "custom" }));
}
/** 브랜드 팔레트가 새로 등록될 때마다 cb()를 부릅니다. 해제 함수를 돌려줍니다. */
function onCustomPalettesChange(cb) {
  customListeners.push(cb);
  return function () { const i = customListeners.indexOf(cb); if (i >= 0) customListeners.splice(i, 1); };
}

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
  const id = checkId(o.id || "brand");
  const src = toHex(parseHex(color));
  const [h, s, l] = rgbToHsl(parseHex(src));
  // 배경을 바꿨다면(createBackground 결과) 그 바탕에서 대비를 맞춥니다
  const bgv = o.background && o.background.values;
  const L = { ...BASE.light, ...(bgv && bgv.light) }, D = { ...BASE.dark, ...(bgv && bgv.dark) };
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
  // 노랑·연두처럼 밝은 색은 같은 명도에서도 너무 밝아, 크레마 띠가 다크 글자 대비를 해치지 않게 어둡게 맞춥니다
  const decoD = walk(h, s * 0.4, 47, -1, (c) => luminance(c) <= 0.25);

  const tint = (hex, a) => `rgba(${parseHex(hex).join(", ")}, ${a})`;
  const warnings = [];
  const vivid = s >= 40 && l > 15 && l < 85;
  if (accentL !== src) warnings.push({ code: "adjusted", message: `라이트 테마에서 흰 글자가 읽히도록 강조색을 ${src}에서 ${accentL}로 맞췄어요.` + (decoL === src ? " 원래 색은 장식색(deco)으로 남겨 뒀어요." : "") });
  if (vivid && (h < 16 || h >= 340)) warnings.push({ code: "danger", message: "빨강 계열이라 오류 색(danger)과 헷갈릴 수 있어요. 오류는 항상 아이콘과 문구를 함께 보여 주세요." });
  if (vivid && h >= 36 && h < 66) warnings.push({ code: "warning", message: "노랑 계열이라 경고 색(warning)과 헷갈릴 수 있어요. 노랑은 강조보다 장식색으로 쓰는 편이 나아요." });
  if (vivid && h >= 120 && h < 165) warnings.push({ code: "positive", message: "초록 계열이라 성공 색(positive)과 비슷해요. 상태는 문구로 구분해 주세요." });
  if (s < 8) warnings.push({ code: "neutral", message: "채도가 거의 없어 그래파이트처럼 단색으로 보여요. 선택 상태는 굵기나 아이콘으로도 보여 주세요." });

  return {
    id,
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

/* 팔레트 id는 CSS 선택자에 그대로 들어가므로 글자·숫자·하이픈만 받습니다. */
function checkId(id, kind) {
  if (!/^[a-z][a-z0-9-]*$/i.test(String(id))) throw new TypeError(`blurssism: ${kind || "팔레트"} id "${id}"는 쓸 수 없어요. 영문으로 시작하고 영문·숫자·하이픈(-)만 넣어 주세요. 예: "brand", "my-brand"`);
  return String(id);
}

/** createPalette 결과를 CSS 문자열로. 서버 렌더링에서 <style>에 넣거나 파일로 저장할 때 씁니다. */
function paletteToCss(palette) {
  const id = checkId(palette.id), X = `[data-palette="${id}"]`;
  // 팔레트 안에서 크레마 가장자리 색이 그림자에도 반영되도록 그림자를 팔레트마다 다시 선언합니다.
  // 1.4 이름(glass-*)이 앞서고 새 이름은 그 값을 읽습니다. 그래서 옛 이름으로 덮어써도 그대로 맞습니다(2.0에서 제거).
  const decl = (t, pad) => [
    ...Object.entries(palette.values[t]).filter(([k]) => k !== "glass-tint-accent").map(([k, v]) => k === "crema-tint-accent"
      ? `${pad}--glass-tint-accent: ${v};\n${pad}--crema-tint-accent: var(--glass-tint-accent);` : `${pad}--${k}: ${v};`),
    ...(BASE[t] && BASE[t]["shadow-crema"] ? [
      `${pad}--shadow-glass: ${BASE[t]["shadow-crema"]};\n${pad}--shadow-crema: var(--shadow-glass);`,
      `${pad}--shadow-sheet: ${BASE[t]["shadow-sheet"]};`] : []),
  ].join("\n");
  return scopedCss(X, decl);
}

/* 테마와 팔레트·배경을 서로 다른 요소에 걸어도(<html data-palette> 안의 <section data-theme="dark"> 등) 맞는 값을 씁니다. */
function scopedCss(X, decl) {
  const L = '[data-theme="light"]', D = '[data-theme="dark"]', SYS = ':root:not([data-theme="light"])';
  return `${X}, ${L}${X}, ${L} ${X}, ${X} ${L} {\n${decl("light", "  ")}\n}\n` +
    `${D}${X}, ${D} ${X}, ${X} ${D} {\n${decl("dark", "  ")}\n}\n` +
    `@media (prefers-color-scheme: dark) {\n  ${SYS}${X}, ${SYS} ${X} {\n${decl("dark", "    ")}\n  }\n` +
    `  ${SYS} ${L}${X}, ${SYS} ${L} ${X} {\n${decl("light", "    ")}\n  }\n}\n`;
}

/**
 * 브랜드색으로 팔레트를 만들어 바로 적용합니다. 만든 팔레트를 돌려줍니다(warnings 확인).
 * applyBrandColor("#ff5a1f")  ·  applyBrandColor("#0f9d58", { id: "green", target: el })
 */
function applyBrandColor(color, options) {
  const o = options || {};
  const p = createPalette(color, o);
  customPalettes[p.id] = p;
  customListeners.forEach((fn) => fn());
  if (typeof document !== "undefined") {
    const sid = "bl-palette-" + p.id;
    let style = document.getElementById(sid);
    if (!style) { style = document.createElement("style"); style.id = sid; document.head.appendChild(style); }
    style.textContent = paletteToCss(p);
    if (o.apply !== false) rootEl(o.target).setAttribute("data-palette", p.id);
  }
  return p;
}

/* ── 배경색 ─────────────────────────────
   바탕색 하나를 주면 카드·눌린 면·구분선과, 그 위에서 읽히도록 보조 글자색을 라이트·다크 모두 맞춥니다. */

const SURFACE_KEYS = ["paper", "paper-raised", "paper-sunken", "line"];
const INK_KEYS = ["ink-muted", "ink-subtle", "line-strong"];

/* 바탕 하나에서 나머지 면을 만듭니다(크림 기본값의 명도 차이를 따름). */
function surfaces(theme, src, h, s, l, l0) {
  const paper = l === l0 ? src : hsl(h, s, l);
  s = Math.min(s, 50);   // 채도 높은 바탕에서도 카드·눌린 면·구분선은 차분하게
  return theme === "light"
    ? { paper, "paper-raised": hsl(h, s, Math.min(100, l + 4)), "paper-sunken": hsl(h, s, l - 5.5), line: hsl(h, s * 0.8, l - 9.5) }
    : { paper, "paper-raised": hsl(h, s, l + 3), "paper-sunken": hsl(h, s, Math.max(0, l - 3)), line: hsl(h, s * 0.8, l + 11) };
}

/* 글자·상태색·내장 팔레트 강조색이 이 바탕들 위에서 기준을 넘는지 */
function surfaceOk(theme, v) {
  const B = BASE[theme], bgs = [v.paper, v["paper-raised"]];
  const text = (c, min) => bgs.every((b) => contrastRatio(c, b) >= min);
  return text(B.ink, 7) && contrastRatio(B.ink, v["paper-sunken"]) >= 7 &&
    ["positive", "warning", "danger", "info"].every((k) => contrastRatio(B[k], v.paper) >= 4.5) &&
    text(B["focus-ring"], 3) &&
    (B.accents || []).every(([a, ink]) => text(a, 3) && text(ink, 4.5));
}

/**
 * 배경색 하나로 바탕 묶음을 만듭니다. 서버에서도 됩니다.
 * 밝은 색이면 라이트 테마 바탕이 되고 다크 바탕은 같은 색조로 만들어요(어두운 색이면 반대). 둘 다 정하려면 { dark: "#hex" }.
 * createBackground("#ffffff") · createBackground("#f5f0ff", { id: "lilac", dark: "#15121c" })
 * → { id, name, source, adjusted, values: { light, dark }, warnings }
 */
function createBackground(color, options) {
  const o = options || {};
  const id = checkId(o.id || "custom", "배경");
  const src = toHex(parseHex(color));
  const srcDark = o.dark != null ? toHex(parseHex(o.dark)) : null;
  const [h, s] = rgbToHsl(parseHex(src));
  const isDark = !srcDark && luminance(src) < 0.18;
  const from = {
    light: isDark ? hsl(h, Math.min(s, 30), 97) : src,
    dark: srcDark || (isDark ? src : hsl(h, Math.min(s, 20), 7)),
  };
  const values = {}, warnings = [];
  let adjusted = false;
  for (const theme of ["light", "dark"]) {
    const base = from[theme], [bh, bs, l0] = rgbToHsl(parseHex(base)), step = theme === "light" ? 0.5 : -0.5;
    // 글자가 읽힐 때까지 바탕을 밝게(라이트)·어둡게(다크) 옮깁니다
    let l = l0, v = surfaces(theme, base, bh, bs, l, l0);
    while (!surfaceOk(theme, v) && l + step >= 0 && l + step <= 100) { l += step; v = surfaces(theme, base, bh, bs, l, l0); }
    if (v.paper !== base) {
      adjusted = true;
      if (base === src || base === srcDark) warnings.push({ code: "adjusted", message: `${theme === "light" ? "라이트" : "다크"} 테마에서 글자가 읽히도록 바탕을 ${base}에서 ${v.paper}로 맞췄어요.` });
    }
    // 보조 글자와 조작 요소 테두리는 필요할 때만 진하게(다크는 밝게)
    const B = BASE[theme], bgs = [v.paper, v["paper-raised"], v["paper-sunken"]];
    for (const k of INK_KEYS) {
      const min = k === "line-strong" ? 3 : 4.5, on = k === "line-strong" ? bgs.slice(0, 2) : bgs;
      const [ih, is, il] = rgbToHsl(parseHex(B[k]));
      const ok = (c) => on.every((b) => contrastRatio(c, b) >= min);
      v[k] = ok(B[k]) ? B[k] : walk(ih, is, il, -step * 2, ok);
      if (v[k] !== B[k] && !warnings.some((w) => w.code === "ink")) warnings.push({ code: "ink", message: "바탕에 맞춰 보조 글자색(ink-muted·ink-subtle)이나 입력창 테두리(line-strong)를 조금 바꿨어요." });
    }
    values[theme] = v;
  }
  if (s >= 40 && luminance(src) > 0.05) warnings.push({ code: "saturated", message: "채도가 높은 바탕은 화면 대부분을 덮어 눈이 쉽게 피로해요. 크레마는 크림빛 그대로이니 함께 어울리는지 확인해 주세요." });
  return { id, name: o.name || "사용자 배경", source: src, adjusted, values, warnings };
}

/** createBackground 결과를 CSS 문자열로. 서버 렌더링에서 <style>에 넣을 때 씁니다. */
function backgroundToCss(background) {
  const X = `[data-background="${checkId(background.id, "배경")}"]`;
  const keys = [...SURFACE_KEYS, ...INK_KEYS];
  return scopedCss(X, (t, pad) => keys.filter((k) => background.values[t][k]).map((k) => `${pad}--${k}: ${background.values[t][k]};`).join("\n"));
}

/**
 * 배경색으로 바탕 묶음을 만들어 바로 적용합니다. 만든 배경을 돌려줍니다(warnings 확인).
 * applyBackgroundColor("#ffffff")  ·  applyBackgroundColor("#eef3f8", { id: "sky", dark: "#0e1318", target: el })
 */
function applyBackgroundColor(color, options) {
  const o = options || {};
  const b = createBackground(color, o);
  customBackgrounds[b.id] = b;
  if (typeof document !== "undefined") {
    const sid = "bl-background-" + b.id;
    let style = document.getElementById(sid);
    if (!style) { style = document.createElement("style"); style.id = sid; document.head.appendChild(style); }
    style.textContent = backgroundToCss(b);
    if (o.apply !== false) rootEl(o.target).setAttribute("data-background", b.id);
  }
  return b;
}

module.exports = { palettes, backgrounds, breakpoints, version, author, setPalette, getPalette, setBackground, getBackground, setTheme, getTheme, getBreakpoint, isAtLeast, onBreakpointChange, shouldReduceCrema, isDesktopCapable, applyCremaPreference, setCremaMode, getCremaMode, checkCrema, auditCrema, shouldReduceGlass, applyGlassPreference, setGlassMode, getGlassMode, getCustomPalettes, onCustomPalettesChange, contrastRatio, createPalette, paletteToCss, applyBrandColor, createBackground, backgroundToCss, applyBackgroundColor };
