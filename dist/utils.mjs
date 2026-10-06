/* blurssism v1.4.0 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */

/** 팔레트 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
export const palettes = [{"id":"espresso","name":"에스프레소","group":"caffeine","description":"기본. 볶은 원두의 갈색과 크레마.","swatch":{"light":"#7a4524","dark":"#e2ab7a"}},{"id":"matcha","name":"말차","group":"caffeine","description":"녹차의 차분한 초록.","swatch":{"light":"#3e6b35","dark":"#a3d48f"}},{"id":"chai","name":"차이","group":"caffeine","description":"향신료 밀크티의 주황.","swatch":{"light":"#9a4512","dark":"#f2a66a"}},{"id":"coldbrew","name":"콜드브루","group":"caffeine","description":"차갑게 우린 커피의 깊은 남색.","swatch":{"light":"#2b4c74","dark":"#9cc1ea"}},{"id":"mocha","name":"모카","group":"caffeine","description":"초콜릿과 장미빛 코코아.","swatch":{"light":"#7c3a46","dark":"#e8a5b0"}},{"id":"classic","name":"클래식","group":"caffeine","description":"1.2까지의 자두색.","swatch":{"light":"#7a3b69","dark":"#e0a6cf"}},{"id":"blue","name":"블루","group":"web","description":"링크와 버튼에서 가장 익숙한 파랑.","swatch":{"light":"#1d5bb8","dark":"#8eb9f5"}},{"id":"indigo","name":"인디고","group":"web","description":"SaaS와 개발 도구에서 흔한 남보라.","swatch":{"light":"#4a3fb5","dark":"#aaa6f4"}},{"id":"violet","name":"바이올렛","group":"web","description":"창작 도구와 커뮤니티의 보라.","swatch":{"light":"#7038a8","dark":"#cfa6f2"}},{"id":"teal","name":"틸","group":"web","description":"헬스케어와 핀테크의 청록.","swatch":{"light":"#0e6b66","dark":"#78d0c4"}},{"id":"emerald","name":"에메랄드","group":"web","description":"결제와 성장 서비스의 선명한 초록.","swatch":{"light":"#13704a","dark":"#7fd6a5"}},{"id":"pink","name":"핑크","group":"web","description":"커머스와 뷰티의 분홍.","swatch":{"light":"#b0306a","dark":"#f49ac0"}},{"id":"graphite","name":"그래파이트","group":"web","description":"색 없이 먹색 하나로 쓰는 단색.","swatch":{"light":"#3b3632","dark":"#e2dbd2"}}];

/** 브레이크포인트(min-width, px). xs는 0부터 sm 전까지입니다. */
export const breakpoints = { sm: 600, md: 768, lg: 1120, xl: 1440 };
const ORDER = ["xs", "sm", "md", "lg", "xl"];

export const version = "1.4.0";
export const author = "caffeinecat";

function rootEl(el) {
  if (el) return el;
  return typeof document !== "undefined" ? document.documentElement : null;
}

/** 팔레트를 바꿉니다. el을 주면 그 요소 아래만 바뀝니다. 알 수 없는 id면 false. */
export function setPalette(id, el) {
  const target = rootEl(el);
  if (!target || !(palettes.some((p) => p.id === id) || customPalettes[id])) return false;
  target.setAttribute("data-palette", id);
  return true;
}

/** 현재 팔레트 id. 지정이 없으면 "espresso". */
export function getPalette(el) {
  const target = rootEl(el);
  return (target && target.getAttribute("data-palette")) || "espresso";
}

/** 테마를 바꿉니다: "light" | "dark" | "system"(시스템 설정 따르기). */
export function setTheme(theme, el) {
  const target = rootEl(el);
  if (!target) return;
  if (theme === "system") target.removeAttribute("data-theme");
  else target.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
}

/** 지금 보이는 테마: "light" | "dark". 서버에서는 "light". */
export function getTheme(el) {
  const target = rootEl(el);
  const set = target && target.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

/** 너비에 해당하는 단계: "xs" | "sm" | "md" | "lg" | "xl". 너비를 안 주면 창 너비, 서버에서는 "xs". */
export function getBreakpoint(width) {
  const w = width != null ? width : typeof window !== "undefined" ? window.innerWidth : 0;
  if (w >= breakpoints.xl) return "xl";
  if (w >= breakpoints.lg) return "lg";
  if (w >= breakpoints.md) return "md";
  if (w >= breakpoints.sm) return "sm";
  return "xs";
}

/** 지금 단계가 bp 이상인지. 예: isAtLeast("md") */
export function isAtLeast(bp, width) {
  return ORDER.indexOf(getBreakpoint(width)) >= ORDER.indexOf(bp);
}

/** 단계가 바뀔 때마다 cb(단계)를 부릅니다. 해제 함수를 돌려줍니다. */
export function onBreakpointChange(cb) {
  if (typeof window === "undefined" || !window.matchMedia) return function () {};
  const queries = Object.values(breakpoints).map((px) => window.matchMedia(`(min-width: ${px}px)`));
  const fire = () => cb(getBreakpoint());
  queries.forEach((q) => (q.addEventListener ? q.addEventListener("change", fire) : q.addListener(fire)));
  return function () {
    queries.forEach((q) => (q.removeEventListener ? q.removeEventListener("change", fire) : q.removeListener(fire)));
  };
}

/** 저사양 기기·절전·투명도 줄이기 설정이면 true */
export function shouldReduceGlass() {
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
export function isDesktopCapable() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (!window.matchMedia(DESKTOP_QUERY).matches) return false;
  const n = window.navigator || {};
  if (n.hardwareConcurrency && n.hardwareConcurrency < 6) return false;
  if (n.deviceMemory && n.deviceMemory < 8) return false;
  if (n.connection && n.connection.saveData) return false;
  return true;
}

const glassState = { mq: null, onMq: null, onMove: null, raf: 0 };

function pointerLight(on) {
  const root = rootEl();
  if (!root || typeof window === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) on = false;
  if (on && !glassState.onMove) {
    let x = 0, y = 0;
    glassState.onMove = function (e) {
      x = e.clientX; y = e.clientY;
      if (glassState.raf) return;
      glassState.raf = requestAnimationFrame(function () {
        glassState.raf = 0;
        root.style.setProperty("--bl-light-x", x + "px");
        root.style.setProperty("--bl-light-y", y + "px");
      });
    };
    window.addEventListener("pointermove", glassState.onMove, { passive: true });
  } else if (!on && glassState.onMove) {
    window.removeEventListener("pointermove", glassState.onMove);
    glassState.onMove = null;
    root.style.removeProperty("--bl-light-x");
    root.style.removeProperty("--bl-light-y");
  }
}

/**
 * <html data-glass>를 정합니다. 유리가 켜졌으면 true.
 *   "off"  : 블러 없음(저사양·절전·투명도 줄이기)
 *   "on"   : 기본 블러레마 유리
 *   "rich" : 데스크톱 모드. 블러가 더 깊고, 포인터 주변에 따뜻한 빛이 번집니다.
 * 옵션: applyGlassPreference({ rich: "auto" | true | false, pointerLight: true | false })
 *   rich 기본값 "auto"는 데스크톱(isDesktopCapable)일 때만 켜고, 창 크기가 바뀌면 다시 판단합니다.
 *   rich: false로 데스크톱 모드를 끕니다. 예전처럼 applyGlassPreference(true | false)도 됩니다.
 */
export function applyGlassPreference(options) {
  if (typeof document === "undefined") return true;
  const o = typeof options === "boolean" ? { force: options } : options || {};
  const root = document.documentElement;
  const reduce = o.force === undefined ? shouldReduceGlass() : !o.force;
  const rich = o.rich === undefined ? "auto" : o.rich;
  if (glassState.mq) {
    glassState.mq.removeEventListener ? glassState.mq.removeEventListener("change", glassState.onMq) : glassState.mq.removeListener(glassState.onMq);
    glassState.mq = glassState.onMq = null;
  }
  function update() {
    const mode = reduce ? "off" : rich === true || (rich === "auto" && isDesktopCapable()) ? "rich" : "on";
    root.setAttribute("data-glass", mode);
    pointerLight(mode === "rich" && o.pointerLight !== false);
  }
  update();
  if (!reduce && rich === "auto" && window.matchMedia) {
    glassState.mq = window.matchMedia(DESKTOP_QUERY);
    glassState.onMq = update;
    glassState.mq.addEventListener ? glassState.mq.addEventListener("change", update) : glassState.mq.addListener(update);
  }
  return !reduce;
}

/** 유리 모드를 바로 정합니다. "auto"는 applyGlassPreference()와 같습니다. */
export function setGlassMode(mode) {
  if (mode === "off") return applyGlassPreference({ force: false });
  if (mode === "on") return applyGlassPreference({ force: true, rich: false });
  if (mode === "rich") return applyGlassPreference({ force: true, rich: true });
  return applyGlassPreference();
}

/** 지금 유리 모드: "off" | "on" | "rich". 설정 전이나 서버에서는 "on". */
export function getGlassMode() {
  const root = rootEl();
  const m = root && root.getAttribute("data-glass");
  return m === "off" || m === "rich" ? m : "on";
}

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
export function contrastRatio(a, b) {
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
export function createPalette(color, options) {
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
      light: { accent: accentL, "accent-soft": softL, "on-accent": "#ffffff", "accent-ink": inkL, deco: decoL, "glass-tint-accent": tint(accentL, 0.14) },
      dark: { accent: accentD, "accent-soft": softD, "on-accent": D["on-accent"], "accent-ink": inkD, deco: decoD, "glass-tint-accent": tint(accentD, 0.18) },
    },
    warnings,
  };
}

/** createPalette 결과를 CSS 문자열로. 서버 렌더링에서 <style>에 넣거나 파일로 저장할 때 씁니다. */
export function paletteToCss(palette) {
  const id = palette.id, decl = (t, pad) => Object.entries(palette.values[t]).map(([k, v]) => `${pad}--${k}: ${v};`).join("\n");
  return `[data-palette="${id}"] {\n${decl("light", "  ")}\n}\n` +
    `[data-theme="dark"][data-palette="${id}"], [data-theme="dark"] [data-palette="${id}"] {\n${decl("dark", "  ")}\n}\n` +
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"])[data-palette="${id}"], :root:not([data-theme="light"]) [data-palette="${id}"] {\n${decl("dark", "    ")}\n  }\n}\n`;
}

/**
 * 브랜드색으로 팔레트를 만들어 바로 적용합니다. 만든 팔레트를 돌려줍니다(warnings 확인).
 * applyBrandColor("#ff5a1f")  ·  applyBrandColor("#0f9d58", { id: "green", target: el })
 */
export function applyBrandColor(color, options) {
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
