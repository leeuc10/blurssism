/* @ds-bundle: {"format":4,"namespace":"Blurssism","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Chip"},{"name":"TextField"},{"name":"Select"},{"name":"Checkbox"},{"name":"RadioGroup"},{"name":"Switch"},{"name":"SegmentedControl"},{"name":"PalettePicker"},{"name":"Badge"},{"name":"Avatar"},{"name":"Tooltip"},{"name":"Progress"},{"name":"Skeleton"},{"name":"Card"},{"name":"MediaCard"},{"name":"ListItem"},{"name":"Table"},{"name":"Calendar"},{"name":"EmptyState"},{"name":"Container"},{"name":"Grid"},{"name":"NavBar"},{"name":"TabBar"},{"name":"Sheet"},{"name":"Dialog"},{"name":"Toast"},{"name":"Icon"}]} */
/* blurssism v2.0.0 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
(function () {

/** 팔레트 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
const palettes = [{"id":"black","name":"블랙","group":"caffeine","description":"기본. 블랙커피의 검정 채움과 그 위의 캐러멜빛 글자 강조.","swatch":{"light":"#000000","dark":"#f2f2f2"}},{"id":"espresso","name":"에스프레소","group":"caffeine","description":"볶은 원두의 갈색과 크레마. 1.6.0까지의 기본.","swatch":{"light":"#7a4524","dark":"#e2ab7a"}},{"id":"matcha","name":"말차","group":"caffeine","description":"녹차의 차분한 초록.","swatch":{"light":"#3e6b35","dark":"#a3d48f"}},{"id":"chai","name":"차이","group":"caffeine","description":"향신료 밀크티의 주황.","swatch":{"light":"#9a4512","dark":"#f2a66a"}},{"id":"coldbrew","name":"콜드브루","group":"caffeine","description":"차갑게 우린 커피의 깊은 남색.","swatch":{"light":"#2b4c74","dark":"#9cc1ea"}},{"id":"mocha","name":"모카","group":"caffeine","description":"초콜릿과 장미빛 코코아.","swatch":{"light":"#7c3a46","dark":"#e8a5b0"}},{"id":"classic","name":"클래식","group":"caffeine","description":"1.2까지의 자두색.","swatch":{"light":"#7a3b69","dark":"#e0a6cf"}},{"id":"blue","name":"블루","group":"web","description":"링크와 버튼에서 가장 익숙한 파랑.","swatch":{"light":"#1d5bb8","dark":"#8eb9f5"}},{"id":"indigo","name":"인디고","group":"web","description":"SaaS와 개발 도구에서 흔한 남보라.","swatch":{"light":"#4a3fb5","dark":"#aaa6f4"}},{"id":"violet","name":"바이올렛","group":"web","description":"창작 도구와 커뮤니티의 보라.","swatch":{"light":"#7038a8","dark":"#cfa6f2"}},{"id":"teal","name":"틸","group":"web","description":"헬스케어와 핀테크의 청록.","swatch":{"light":"#0e6b66","dark":"#78d0c4"}},{"id":"emerald","name":"에메랄드","group":"web","description":"결제와 성장 서비스의 선명한 초록.","swatch":{"light":"#13704a","dark":"#7fd6a5"}},{"id":"pink","name":"핑크","group":"web","description":"커머스와 뷰티의 분홍.","swatch":{"light":"#b0306a","dark":"#f49ac0"}},{"id":"graphite","name":"그래파이트","group":"web","description":"색 없이 먹색 하나로 쓰는 단색.","swatch":{"light":"#3b3632","dark":"#e2dbd2"}}];
/** 배경 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
const backgrounds = [{"id":"cream","name":"크림","description":"기본. 우유 거품 같은 따뜻한 크림색.","swatch":{"light":"#faf6f0","dark":"#16110d"}},{"id":"white","name":"화이트","description":"색 없는 흰 바탕. 카드는 테두리로 구분합니다.","swatch":{"light":"#ffffff","dark":"#121212"}},{"id":"gray","name":"그레이","description":"옅은 회색 바탕 위에 흰 카드.","swatch":{"light":"#f2f2f2","dark":"#1a1a1a"}}];

/** 브레이크포인트(min-width, px). xs는 0부터 sm 전까지입니다. */
const breakpoints = { sm: 600, md: 768, lg: 1120, xl: 1440 };
const ORDER = ["xs", "sm", "md", "lg", "xl"];

const version = "2.0.0";
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
  if (mq && mq("(update: slow)").matches) return true;   // 전자잉크처럼 화면 갱신이 느린 기기(메모리를 알려 주지 않는 브라우저에서도 잡힘)
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
const CREMA_SELECTOR = ".bl-crema, .bl-crema-thick, .bl-btn-crema, .bl-icon-btn:not(.bl-icon-btn-plain)";

/* 포인터 빛(2.0부터 기본 꺼짐, applyCremaPreference({ pointerLight: true })로 켬).
   좌표를 <html>이 아니라 크레마 요소에만, 요소 기준 좌표로 씁니다. 문서 전체의 스타일을 다시 계산하지 않고,
   배경을 화면에 고정(fixed)하지 않아 스크롤할 때 다시 그리지 않습니다.
   backdrop-filter가 걸린 면은 인라인 속성이 바뀔 때마다 다시 칠해지므로, 빛이 닿는 거리(LIGHT_REACH) 안에 있는 요소만 매 프레임 쓰고,
   멀어진 요소는 한 번만 화면 밖으로 보내 둡니다. 그래서 포인터가 지나가는 면 한두 개만 다시 칠해집니다. */
const LIGHT_REACH = 420;   // 큰 빛의 반지름(bundle.css의 radial-gradient 420px)
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
          const r = rects[i];
          const near = x > r.left - LIGHT_REACH && x < r.right + LIGHT_REACH && y > r.top - LIGHT_REACH && y < r.bottom + LIGHT_REACH;
          if (near) {
            el.style.setProperty("--bl-light-x", Math.round(x - r.left) + "px");
            el.style.setProperty("--bl-light-y", Math.round(y - r.top) + "px");
            el.dataset.blLit = "1";
          } else if (el.dataset.blLit) {   // 빛이 닿지 않는 면은 한 번만 쓰고 그 뒤로는 건드리지 않습니다
            el.style.setProperty("--bl-light-x", "-9999px");
            el.style.setProperty("--bl-light-y", "-9999px");
            delete el.dataset.blLit;
          }
        });
      });
    };
    window.addEventListener("pointermove", cremaState.onMove, { passive: true });
  } else if (!on && cremaState.onMove) {
    window.removeEventListener("pointermove", cremaState.onMove);
    if (cremaState.raf) cancelAnimationFrame(cremaState.raf);
    cremaState.onMove = null;
    cremaState.raf = 0;
    document.querySelectorAll(CREMA_SELECTOR).forEach((el) => { el.style.removeProperty("--bl-light-x"); el.style.removeProperty("--bl-light-y"); delete el.dataset.blLit; });
  }
}

/**
 * <html data-crema>를 정합니다. 크레마가 켜졌으면 true.
 *   "off"  : 블러 없음(저사양·절전·투명도 줄이기)
 *   "on"   : 기본 블러레마
 *   "rich" : 데스크톱 모드. 블러가 더 깊고, 포인터 주변에 따뜻한 빛이 번집니다.
 * 옵션: applyCremaPreference({ rich: "auto" | true | false, pointerLight: false | true, minMemory: 4, minCores: 4 })
 *   rich 기본값 "auto"는 데스크톱(isDesktopCapable)일 때만 켜고, 창 크기가 바뀌면 다시 판단합니다.
 *   rich: false로 데스크톱 모드를 끕니다. applyCremaPreference(true | false)로 강제로 켜고 끌 수도 있습니다.
 *   pointerLight는 2.0부터 기본 false입니다(마우스를 움직일 때마다 크레마 면을 다시 칠하므로 선택 기능). 켜면 포인터 근처 면만 다시 칠합니다.
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
    pointerLight(mode === "rich" && o.pointerLight === true);
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
  const m = root && root.getAttribute("data-crema");
  return m === "off" || m === "rich" ? m : "on";
}

/* ── 개발 중 검사 ─────────────────────────────
   블러 예산·primary 버튼 개수·2.0에서 제거된 glass 이름을 화면에서 세어 콘솔로 알려 줍니다. 배포 빌드(NODE_ENV=production)에서는 아무것도 하지 않습니다. */
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
    message: `1.4 이름(.bl-glass*, .bl-btn-glass, data-glass)을 쓰는 요소가 ${legacy.length}개 있어요. 2.0에서 제거돼 스타일이 없으니 .bl-crema*, .bl-btn-crema, data-crema로 바꿔 주세요.` });
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

/* ── 브랜드색 팔레트 ─────────────────────────────
   색 하나를 주면 강조색 묶음을 라이트·다크 모두 WCAG 대비에 맞춰 만듭니다. */

/** 바탕·글자 기준색. 빌드할 때 src/tokens.json에서 채워집니다. */
const BASE = {"light":{"paper":"#faf6f0","paper-raised":"#ffffff","paper-sunken":"#f1e9df","ink":"#21180f","ink-muted":"#5e5146","ink-subtle":"#72655a","line":"#e8ded2","line-strong":"#8e8174","accent":"#000000","accent-soft":"#eee9e3","on-accent":"#ffffff","accent-ink":"#653819","positive":"#3d6650","positive-soft":"#e3ede6","warning":"#8a5300","warning-soft":"#fbf0dc","deco":"#d9c8b4","danger":"#b42318","danger-soft":"#fbe9e7","info":"#1d5a8c","focus-ring":"#1d5a8c","crema-ink-muted":"#342a21","accents":[["#000000","#653819"],["#7a4524","#653819"],["#3e6b35","#335a2c"],["#9a4512","#843a0e"],["#2b4c74","#233f61"],["#7c3a46","#6a303b"],["#7a3b69","#6a2f5b"],["#1d5bb8","#184c9a"],["#4a3fb5","#3d3399"],["#7038a8","#5f2e90"],["#0e6b66","#0b5a56"],["#13704a","#0f5e3e"],["#b0306a","#962659"],["#3b3632","#2e2a26"]],"crema-fill":"rgba(250, 246, 240, 0.70)","crema-fill-strong":"rgba(250, 246, 240, 0.88)","crema-grain":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.5' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .42 0 0 0 0 .31 0 0 0 0 .22 0 0 0 .26 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")","crema-band-top":"30%","crema-band-lip":"18%","crema-band-mid":"10%","crema-band-low":"6%","crema-fill-tint":"12%","shadow-crema":"inset 0 1px 0 var(--crema-edge), 0 10px 30px rgba(33, 24, 15, 0.10)","shadow-sheet":"inset 0 1px 0 var(--crema-edge), 0 -8px 40px rgba(33, 24, 15, 0.12)"},"dark":{"paper":"#16110d","paper-raised":"#201913","paper-sunken":"#0f0b08","ink":"#f4ece2","ink-muted":"#b8aa9b","ink-subtle":"#9b8d7f","line":"#372e26","line-strong":"#80736a","accent":"#f2f2f2","accent-soft":"#2a2520","on-accent":"#21180f","accent-ink":"#e2ab7a","positive":"#8fc0a2","positive-soft":"#1f2e25","warning":"#f0c46a","warning-soft":"#3a2c12","deco":"#8c7663","danger":"#f2867a","danger-soft":"#3b1b17","info":"#8cc0ec","focus-ring":"#8cc0ec","crema-ink-muted":"#e2d8cc","accents":[["#f2f2f2","#e2ab7a"],["#e2ab7a","#ecbf96"],["#a3d48f","#b5dea4"],["#f2a66a","#f6bb8b"],["#9cc1ea","#b2cff0"],["#e8a5b0","#efbac2"],["#e0a6cf","#e8b6d9"],["#8eb9f5","#a9cbf8"],["#aaa6f4","#bfbcf7"],["#cfa6f2","#dbbcf5"],["#78d0c4","#95dccf"],["#7fd6a5","#9ce0b8"],["#f49ac0","#f7b3d0"],["#e2dbd2","#ece6de"]],"crema-fill":"rgba(30, 23, 18, 0.82)","crema-fill-strong":"rgba(28, 21, 16, 0.90)","crema-grain":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.5' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .96 0 0 0 0 .9 0 0 0 0 .84 0 0 0 .16 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")","crema-band-top":"24%","crema-band-lip":"13%","crema-band-mid":"8%","crema-band-low":"5%","crema-fill-tint":"10%","shadow-crema":"inset 0 1px 0 var(--crema-edge), 0 10px 30px rgba(0, 0, 0, 0.42)","shadow-sheet":"inset 0 1px 0 var(--crema-edge), 0 -8px 40px rgba(0, 0, 0, 0.5)"}};
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
  const decoD = walk(h, s * 0.4, 47, -1, (c) => luminance(c) <= 0.2);

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
      light: { accent: accentL, "accent-soft": softL, "on-accent": "#ffffff", "accent-ink": inkL, deco: decoL, "crema-tint-accent": tint(accentL, 0.14) },
      dark: { accent: accentD, "accent-soft": softD, "on-accent": D["on-accent"], "accent-ink": inkD, deco: decoD, "crema-tint-accent": tint(accentD, 0.18) },
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
  const decl = (t, pad) => [
    ...Object.entries(palette.values[t]).map(([k, v]) => `${pad}--${k}: ${v};`),
    ...(BASE[t] && BASE[t]["shadow-crema"] ? [`${pad}--shadow-crema: ${BASE[t]["shadow-crema"]};`, `${pad}--shadow-sheet: ${BASE[t]["shadow-sheet"]};`] : []),
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
  if (s >= 40 && luminance(src) > 0.05) warnings.push({ code: "saturated", message: "채도가 높은 바탕은 화면 대부분을 덮어 눈이 쉽게 피로해요. 강조색과 함께 어울리는지 확인해 주세요." });
  const bg = { id, name: o.name || "사용자 배경", source: src, adjusted, values, warnings };
  const crema = backgroundCrema(bg);
  for (const t of ["light", "dark"]) Object.assign(values[t], crema[t]);
  return bg;
}

/* ── 적응형 블러레마 ─────────────────────────────
   크레마의 우유 거품 색(채움)과 거품 결 색이 바탕을 따라갑니다. 크림 바탕이면 기본 토큰과 같은 값이 나옵니다.
   - 채움: 라이트는 paper, 다크는 paper와 paper-raised 사이. 불투명도는 기본 토큰 그대로
   - 거품 결: 기본 결 색의 명도는 두고, 색조는 바탕을 따라 돌리고 채도는 바탕 채도에 비례 (흰·회색 바탕이면 무채색 결) */
const rgbaParts = (str) => { const v = /rgba?\(([^)]+)\)/.exec(str)[1].split(",").map(Number); return [v.slice(0, 3), v[3] == null ? 1 : v[3]]; };
const mixRgb = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
const rgbaStr = (c, a) => `rgba(${c.map((v) => Math.round(v)).join(", ")}, ${a.toFixed(2)})`;
/* 바탕이 기본 크림만큼 따뜻하면 1, 무채색이면 0. 무채색일수록 크레마를 밝고 담백하게(결·띠를 옅게) 둡니다. */
function warmth(theme, paperHex) {
  const rs = rgbToHsl(parseHex(BASE[theme].paper))[1], bs = rgbToHsl(parseHex(paperHex))[1];
  return rs ? Math.min(1, bs / rs) : 0;
}
function adaptGrain(theme, paperHex) {
  const B = BASE[theme], src = B["crema-grain"], m = /values='([^']+)'/.exec(src);
  const vals = m[1].split(/\s+/).map(Number);
  const [gh, gs, gl] = rgbToHsl([vals[4], vals[9], vals[14]].map((v) => v * 255));
  const [rh, rs] = rgbToHsl(parseHex(B.paper)), [bh, bs] = rgbToHsl(parseHex(paperHex));
  const h = (((bh + gh - rh) % 360) + 360) % 360;
  const c = parseHex(hsl(h, gs * (rs ? Math.min(1, bs / rs) : 0), gl)).map((v) => +(v / 255).toFixed(3));
  [vals[4], vals[9], vals[14]] = c;
  vals[18] = +(vals[18] * (0.4 + 0.6 * warmth(theme, paperHex))).toFixed(3);   // 무채색 바탕에서는 결을 옅게(먼지처럼 보이지 않게)
  return src.replace(m[1], vals.map((v) => String(v).replace(/^0\./, ".")).join(" "));
}

/** 바탕 값(paper·paper-raised)에 맞는 크레마 채움과 거품 결. { light: { "crema-fill", "crema-fill-strong", "crema-grain" }, dark } */
function backgroundCrema(background) {
  const out = {};
  for (const t of ["light", "dark"]) {
    const v = background.values[t], B = BASE[t], p = parseHex(v.paper), r = parseHex(v["paper-raised"]);
    // 명도는 기본 크레마보다 어두워지지(다크는 밝아지지) 않게: 뒤가 검정·흰색이어도 글자 대비를 지킵니다
    const fill = (c, token) => {
      const [def, a] = rgbaParts(B[token]), target = luminance(toHex(def)), hex = toHex(c);
      const ok = (x) => (t === "light" ? luminance(x) >= target : luminance(x) <= target);
      if (ok(hex)) return rgbaStr(c, a);
      const [h, sat, l] = rgbToHsl(c);
      return rgbaStr(parseHex(walk(h, sat, l, t === "light" ? 0.5 : -0.5, ok)), a);
    };
    const w = warmth(t, v.paper), band = 0.45 + 0.55 * w;
    out[t] = {
      // 라이트: 무채색 바탕일수록 paper-raised 쪽으로 밝혀 페이지보다 살짝 밝은 우유 거품처럼 뜨게 합니다
      "crema-fill": fill(t === "light" ? mixRgb(p, r, (1 - w) * 0.7) : mixRgb(p, r, 0.8), "crema-fill"),
      "crema-fill-strong": fill(t === "light" ? mixRgb(p, r, (1 - w) * 0.85) : mixRgb(p, r, 0.55), "crema-fill-strong"),
      "crema-grain": adaptGrain(t, v.paper),
      // 캐러멜빛 띠도 무채색 바탕에서는 옅게
      ...Object.fromEntries(["top", "lip", "mid", "low"].map((k) => [`crema-band-${k}`, `${+(parseFloat(B[`crema-band-${k}`]) * band).toFixed(1)}%`])),
      // 팔레트 장식색도 무채색 바탕에서는 절반까지 덜 섞습니다
      "crema-fill-tint": `${+(parseFloat(B["crema-fill-tint"]) * (0.5 + 0.5 * w)).toFixed(1)}%`,
    };
  }
  return out;
}

/** createBackground 결과를 CSS 문자열로. 서버 렌더링에서 <style>에 넣을 때 씁니다. 크레마 채움·결도 바탕에 맞춰 함께 넣습니다. */
function backgroundToCss(background) {
  const X = `[data-background="${checkId(background.id, "배경")}"]`;
  const keys = [...SURFACE_KEYS, ...INK_KEYS], crema = backgroundCrema(background);
  return scopedCss(X, (t, pad) => [
    ...keys.filter((k) => background.values[t][k]).map((k) => `${pad}--${k}: ${background.values[t][k]};`),
    ...Object.entries(crema[t]).map(([k, v]) => `${pad}--${k}: ${v};`),
  ].join("\n"));
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

function createBlurssism(React) {
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  /* 2.0: ref를 받는 컴포넌트(forwardRef). react-hook-form의 register, 프로그램적 포커스가 됩니다. React 18 전용. */
  function withRef(name, render) { var C = React.forwardRef(render); C.displayName = name; return C; }
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

  /* 2.0: primary는 강조색(accent) 채움입니다. "accent"는 primary의 별칭(같은 클래스)이라 화면당 하나 규칙을 함께 셉니다. */
  var Button = withRef("Button", function (p, ref) {
    var variant = p.variant || "primary", tag = p.href ? "a" : "button";
    if (variant === "accent") variant = "primary";
    return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["variant", "size", "block", "icon", "className", "children"]), {
      ref: ref,
      className: cx("bl-btn", "bl-btn-" + variant, p.size === "md" && "bl-btn-md", p.block && "bl-btn-block", p.className)
    }), p.icon ? h(Icon, { name: p.icon }) : null, p.children);
  });

  var IconButton = withRef("IconButton", function (p, ref) {
    return h("button", Object.assign({ type: "button" }, omit(p, ["icon", "label", "pressed", "plain", "className"]), {
      ref: ref, className: cx("bl-icon-btn", p.plain && "bl-icon-btn-plain", p.className), "aria-label": p.label,
      "aria-pressed": p.pressed == null ? undefined : String(!!p.pressed)
    }), h(Icon, { name: p.icon, filled: !!p.pressed }));
  });

  /* selected를 주면 제어 모드, 안 주면 누를 때마다 스스로 바뀝니다(defaultSelected로 처음 값). onChange(다음 값)를 부릅니다. */
  var Chip = withRef("Chip", function (p, ref) {
    var st = React.useState(!!p.defaultSelected), on = p.selected != null ? !!p.selected : st[0];
    return h("button", Object.assign({ type: "button" }, omit(p, ["selected", "defaultSelected", "onChange", "className", "children"]), {
      ref: ref, className: cx("bl-chip", p.className), "aria-pressed": String(on),
      onClick: function (e) {
        if (p.selected == null) st[1](!on);
        p.onChange && p.onChange(!on);
        p.onClick && p.onClick(e);
      }
    }), on ? h(Icon, { name: "check" }) : null, p.children);
  });

  /* React 18의 useId는 서버·클라이언트에서 같은 값을 만들어 하이드레이션이 어긋나지 않습니다 */
  var uid = 0;
  var useStableId = React.useId || function () { return React.useMemo(function () { return "bl-" + (++uid); }, []); };
  function useId(given) { var auto = useStableId(); return given || auto; }

  /* ref는 <input>에 닿습니다 */
  var TextField = withRef("TextField", function (p, ref) {
    var id = useId(p.id), help = p.error || p.help;
    return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
      h("label", { className: "bl-field-label", htmlFor: id }, p.label),
      h("input", Object.assign({}, omit(p, ["label", "help", "error", "className", "id"]), {
        ref: ref, id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
      })),
      help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? "오류: " + p.error : p.help) : null);
  });

  var Switch = withRef("Switch", function (p, ref) {
    return h("button", Object.assign({ type: "button", role: "switch" }, omit(p, ["checked", "onChange", "label", "className"]), {
      ref: ref, className: cx("bl-switch", p.className), "aria-checked": String(!!p.checked), "aria-label": p.label,
      onClick: function () { p.onChange && p.onChange(!p.checked); }
    }));
  });

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
      h("div", { className: "bl-media-bar " + (p.lite ? "bl-crema-lite" : "bl-crema") },
        h("div", { className: "bl-media-text" },
          h("p", { className: "bl-media-title" }, p.title),
          p.meta ? h("p", { className: "bl-media-meta" }, p.meta) : null),
        p.action || null));
  }

  var ListItem = withRef("ListItem", function (p, ref) {
    var tag = p.href ? "a" : p.onClick ? "button" : "div";
    var trail = p.trailing !== undefined ? p.trailing : (tag !== "div" ? h(Icon, { name: "chevron-right" }) : null);
    return h(tag, Object.assign(tag === "button" ? { type: "button" } : {}, omit(p, ["icon", "title", "subtitle", "trailing", "className"]), {
      ref: ref, className: cx("bl-item", p.className) }),
      p.icon ? h("span", { className: "bl-item-lead" }, h(Icon, { name: p.icon })) : null,
      h("span", { className: "bl-item-text" },
        h("span", { className: "bl-item-title" }, p.title),
        p.subtitle ? h("span", { className: "bl-item-sub" }, p.subtitle) : null),
      trail ? h("span", { className: "bl-item-trail" }, trail) : null);
  });


  /* ref는 <select>에 닿습니다 */
  var Select = withRef("Select", function (p, ref) {
    var id = useId(p.id), help = p.error || p.help;
    // placeholder가 있고 값이 정해지지 않았으면 빈 값("")에서 시작해 placeholder가 보이게 합니다(Svelte와 같게).
    var start = p.placeholder && p.value === undefined && p.defaultValue === undefined ? { defaultValue: "" } : {};
    return h("div", { className: cx("bl-field", p.className), "data-invalid": p.error ? "true" : undefined },
      h("label", { className: "bl-field-label", htmlFor: id }, p.label),
      h("div", { className: "bl-select" },
        h("select", Object.assign(start, omit(p, ["label", "help", "error", "className", "id", "options", "placeholder"]), {
          ref: ref, id: id, className: "bl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": help ? id + "-help" : undefined
        }),
          p.placeholder ? h("option", { value: "", disabled: true }, p.placeholder) : null,
          (p.options || []).map(function (o) { o = typeof o === "string" ? { value: o, label: o } : o; return h("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label); }))),
      help ? h("p", { id: id + "-help", className: "bl-field-help" }, p.error ? "오류: " + p.error : p.help) : null);
  });

  /* ref는 <input type="checkbox">에 닿습니다 */
  var Checkbox = withRef("Checkbox", function (p, ref) {
    return h("label", { className: cx("bl-check", p.className) },
      h("input", Object.assign({ type: "checkbox", ref: ref }, omit(p, ["label", "description", "className"]))),
      h("span", null, p.label, p.description ? h("span", { className: "bl-check-sub" }, p.description) : null));
  });

  var RadioGroup = withRef("RadioGroup", function (p, ref) {
    var name = useId(p.name);
    return h("fieldset", { ref: ref, className: cx("bl-radios", p.className) },
      p.legend ? h("legend", null, p.legend) : null,
      (p.options || []).map(function (o) {
        o = typeof o === "string" ? { value: o, label: o } : o;
        return h("label", { key: o.value, className: "bl-check" },
          h("input", { type: "radio", name: name, value: o.value, checked: p.value === o.value, disabled: o.disabled,
            onChange: function () { p.onChange && p.onChange(o.value); } }),
          h("span", null, o.label, o.description ? h("span", { className: "bl-check-sub" }, o.description) : null));
      }));
  });

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
      child, h("span", { id: id, ref: tip, role: "tooltip", popover: "manual", className: "bl-tooltip-pop bl-crema-thick" }, p.label));
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
    return h("dialog", { ref: ref, className: cx("bl-dialog bl-crema-thick", p.className), role: p.alert ? "alertdialog" : undefined,
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

  var Container = withRef("Container", function (p, ref) {
    var tag = p.as || "div";
    return h(tag, Object.assign({}, omit(p, ["as", "size", "className", "children"]), {
      ref: ref, className: cx("bl-container", p.size === "prose" && "bl-container-prose", p.size === "full" && "bl-container-full", p.className) }), p.children);
  });

  /* columns: 숫자 또는 { xs, sm, md, lg, xl } — 단계별 열 수. 생략한 단계는 아래 단계 값을 이어받습니다. */
  var Grid = withRef("Grid", function (p, ref) {
    var c = typeof p.columns === "number" ? { xs: p.columns } : (p.columns || { xs: 1, sm: 2, lg: 3 });
    var style = {}, last = 1;
    ["xs", "sm", "md", "lg", "xl"].forEach(function (bp) { if (c[bp] != null) last = c[bp]; style["--bl-cols-" + bp] = last; });
    if (p.gap) style["--bl-grid-gap"] = "var(--" + p.gap + ")";
    return h(p.as || "div", Object.assign({}, omit(p, ["as", "columns", "gap", "className", "children", "style"]), {
      ref: ref, className: cx("bl-autogrid", p.className), style: Object.assign(style, p.style) }), p.children);
  });

  function NavBar(p) {
    return h("header", { className: cx("bl-navbar bl-crema", p.className) },
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
    return h("nav", { className: cx("bl-tabbar bl-crema", hide && "bl-hide-from-" + hide, p.className), "aria-label": p.label || "주요 메뉴" },
      (p.items || []).map(function (it) {
        var on = it.id === p.value;
        return h(it.href ? "a" : "button", Object.assign(it.href ? { href: it.href } : { type: "button" }, {
          key: it.id, className: "bl-tab", "aria-current": on ? "page" : undefined,
          onClick: function () { p.onChange && p.onChange(it.id); } }), h(Icon, { name: it.icon, filled: on }), it.label);
      }));
  }

  function Sheet(p) {
    return h("div", { className: cx("bl-sheet bl-crema-thick", p.className), role: "dialog", "aria-label": p.title },
      h("div", { className: "bl-sheet-grip", "aria-hidden": "true" }),
      h("h2", { className: "bl-sheet-title" }, p.title),
      p.description ? h("p", { className: "bl-sheet-body" }, p.description) : null,
      h("div", { className: "bl-sheet-actions" }, p.children));
  }

  function Toast(p) {
    var tone = p.tone || "neutral";
    var icon = tone === "positive" ? "check" : tone === "danger" ? "alert" : null;
    return h("div", { className: cx("bl-toast bl-crema-thick", p.className), role: "status", "data-tone": tone },
      icon ? h(Icon, { name: icon }) : null,
      h("span", { className: "bl-toast-msg" }, p.children),
      p.actionLabel ? h(Button, { variant: "ghost", size: "md", onClick: p.onAction }, p.actionLabel) : null);
  }

  var api = { Button: Button, IconButton: IconButton, Chip: Chip, TextField: TextField, Select: Select, Checkbox: Checkbox, RadioGroup: RadioGroup, Switch: Switch, SegmentedControl: SegmentedControl, PalettePicker: PalettePicker, Badge: Badge, Avatar: Avatar, Tooltip: Tooltip, Progress: Progress, Skeleton: Skeleton, Card: Card, MediaCard: MediaCard, ListItem: ListItem, Table: Table, Calendar: Calendar, EmptyState: EmptyState, Container: Container, Grid: Grid, NavBar: NavBar, TabBar: TabBar, Sheet: Sheet, Dialog: Dialog, Toast: Toast, Icon: Icon,
    useBreakpoint: useBreakpoint };
  return api;
}

  if (typeof window !== "undefined" && window.React) {
    window.Blurssism = Object.assign(window.Blurssism || {}, createBlurssism(window.React), { palettes, backgrounds, breakpoints, version, author, setPalette, getPalette, setBackground, getBackground, setTheme, getTheme, getBreakpoint, isAtLeast, onBreakpointChange, shouldReduceCrema, isDesktopCapable, applyCremaPreference, setCremaMode, getCremaMode, checkCrema, auditCrema, getCustomPalettes, onCustomPalettesChange, contrastRatio, createPalette, paletteToCss, applyBrandColor, createBackground, backgroundCrema, backgroundToCss, applyBackgroundColor });
  } else if (typeof console !== "undefined") {
    console.error("blurssism: window.React가 없습니다. react와 react-dom UMD 스크립트를 먼저 불러오세요.");
  }
})();
