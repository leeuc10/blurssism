/* blurssism v1.3.1 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
/* 생성 파일: src/utils.js */

/** 팔레트 목록. 빌드할 때 src/tokens.json에서 채워집니다. */
export const palettes = [{"id":"espresso","name":"에스프레소","group":"caffeine","description":"기본. 볶은 원두의 갈색과 크레마.","swatch":{"light":"#7a4524","dark":"#e2ab7a"}},{"id":"matcha","name":"말차","group":"caffeine","description":"녹차의 차분한 초록.","swatch":{"light":"#3e6b35","dark":"#a3d48f"}},{"id":"chai","name":"차이","group":"caffeine","description":"향신료 밀크티의 주황.","swatch":{"light":"#9a4512","dark":"#f2a66a"}},{"id":"coldbrew","name":"콜드브루","group":"caffeine","description":"차갑게 우린 커피의 깊은 남색.","swatch":{"light":"#2b4c74","dark":"#9cc1ea"}},{"id":"mocha","name":"모카","group":"caffeine","description":"초콜릿과 장미빛 코코아.","swatch":{"light":"#7c3a46","dark":"#e8a5b0"}},{"id":"classic","name":"클래식","group":"caffeine","description":"1.2까지의 자두색.","swatch":{"light":"#7a3b69","dark":"#e0a6cf"}},{"id":"blue","name":"블루","group":"web","description":"링크와 버튼에서 가장 익숙한 파랑.","swatch":{"light":"#1d5bb8","dark":"#8eb9f5"}},{"id":"indigo","name":"인디고","group":"web","description":"SaaS와 개발 도구에서 흔한 남보라.","swatch":{"light":"#4a3fb5","dark":"#aaa6f4"}},{"id":"violet","name":"바이올렛","group":"web","description":"창작 도구와 커뮤니티의 보라.","swatch":{"light":"#7038a8","dark":"#cfa6f2"}},{"id":"teal","name":"틸","group":"web","description":"헬스케어와 핀테크의 청록.","swatch":{"light":"#0e6b66","dark":"#78d0c4"}},{"id":"emerald","name":"에메랄드","group":"web","description":"결제와 성장 서비스의 선명한 초록.","swatch":{"light":"#13704a","dark":"#7fd6a5"}},{"id":"pink","name":"핑크","group":"web","description":"커머스와 뷰티의 분홍.","swatch":{"light":"#b0306a","dark":"#f49ac0"}},{"id":"graphite","name":"그래파이트","group":"web","description":"색 없이 먹색 하나로 쓰는 단색.","swatch":{"light":"#3b3632","dark":"#e2dbd2"}}];

/** 브레이크포인트(min-width, px). xs는 0부터 sm 전까지입니다. */
export const breakpoints = { sm: 600, md: 768, lg: 1120, xl: 1440 };
const ORDER = ["xs", "sm", "md", "lg", "xl"];

export const version = "1.3.1";
export const author = "caffeinecat";

function rootEl(el) {
  if (el) return el;
  return typeof document !== "undefined" ? document.documentElement : null;
}

/** 팔레트를 바꿉니다. el을 주면 그 요소 아래만 바뀝니다. 알 수 없는 id면 false. */
export function setPalette(id, el) {
  const target = rootEl(el);
  if (!target || !palettes.some((p) => p.id === id)) return false;
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

/** <html data-glass="on|off">를 설정합니다. force를 주면 그 값으로. 유리가 켜졌으면 true. */
export function applyGlassPreference(force) {
  if (typeof document === "undefined") return true;
  const off = force === undefined ? shouldReduceGlass() : !force;
  document.documentElement.setAttribute("data-glass", off ? "off" : "on");
  return !off;
}
