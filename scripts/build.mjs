// blurssism 빌드 · © caffeinecat · MIT
// 원본(src/)에서 dist/와 svelte/의 생성 파일을 만듭니다. 의존성 없이 `node scripts/build.mjs`로 실행합니다.
//   src/tokens.json → dist/tokens.json, dist/tokens.css, dist/tailwind-preset.js
//   src/utils.js    → dist/utils.mjs · dist/utils.cjs (프레임워크 없이 쓰는 함수: 팔레트·테마·브레이크포인트·크레마 설정)
//   src/core.js     → dist/index.mjs (ESM), dist/index.cjs (CommonJS), dist/bundle.js (<script>용 window.Blurssism)
//   글꼴            → dist/fonts.css (jsDelivr), dist/fonts.local.css (패키지에 든 dist/fonts/ 파일. tokens.css와 bundle.css는 글꼴을 불러오지 않습니다)
//   아이콘 경로     → src/svelte/icons.js
// `node scripts/build.mjs --post`는 svelte-package 뒤에 svelte/utils.js가 dist/utils.mjs를 가리키게 고칩니다.
//   React·Svelte·바닐라가 같은 utils 모듈 하나를 써서 팔레트 등록·크레마 모드 상태가 한 곳에만 있습니다.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const write = (p, s) => { mkdirSync(new URL(".", new URL(p, root)), { recursive: true }); writeFileSync(new URL(p, root), s); };

if (process.argv.includes("--post")) {
  write("svelte/utils.js", read("svelte/utils.js").replace('from "../../dist/utils.mjs"', 'from "../dist/utils.mjs"'));
  rmSync(new URL("dist/utils.d.mts", root), { force: true });   // svelte-package가 import를 따라가 만드는 빈 타입(any) 파일
  console.log("svelte/utils.js → ../dist/utils.mjs");
  process.exit(0);
}

const { version } = JSON.parse(read("package.json"));
const banner = `/* blurssism v${version} · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */\n`;

/* ── 1. 토큰 ───────────────────────────── */
const tokens = JSON.parse(read("src/tokens.json"));
tokens.meta = { ...tokens.meta, version };
write("dist/tokens.json", JSON.stringify(tokens, null, 2) + "\n");

const colorTokens = tokens.color.tokens;
const val = (v, theme) => (typeof v === "string" ? v : v[theme] ?? v.light);
const cssVal = (v) => v.replace(/^\{(.+)\}$/, "var(--$1)");
// 2.0: 1.4의 glass 이름 별칭(--glass-*)은 더 만들지 않습니다.
// 2.1: hex 색 토큰은 `--이름-rgb: r g b`도 함께 내보내서 Tailwind의 bg-accent/50 같은 투명도 수정자와 rgb(var(--accent-rgb) / .5)가 됩니다.
const rgbTriplet = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");
const decl = (list, theme, indent = "  ") => list.flatMap((t) => {
  const v = cssVal(val(t.value, theme));
  return [`${indent}--${t.name}: ${v};`, ...(/^#[0-9a-f]{6}$/i.test(v) ? [`${indent}--${t.name}-rgb: ${rgbTriplet(v)};`] : [])];
}).join("\n");
const colorsAndShadows = [...colorTokens, ...tokens.shadow.tokens, ...tokens.material.tokens];
const plain = ["spacing", "radius", "blur", "backdrop", "layout"].flatMap((f) => tokens[f].tokens);
const families = Object.entries(tokens.type.families)
  .map(([k, v]) => `  --font-${k}: ${v};`).join("\n");
const styles = tokens.type.groups.flatMap((g) => g.styles.map((s) => ({ ...s, family: s.family || g.family })));
// 2.0: 타입 스케일은 변수(--text-{이름}-size·line·weight·tracking)로도 나가고, 클래스는 bl- 접두어(.bl-body, .bl-title-1 …)를 씁니다.
//      컴포넌트(bundle.css)는 px 대신 이 변수를 읽어서, 스케일을 바꾸면 컴포넌트 글자도 함께 바뀝니다.
const typeVars = styles.map((s) =>
  `  --text-${s.name}-size: ${s.fontSize}; --text-${s.name}-line: ${s.lineHeight}; --text-${s.name}-weight: ${s.fontWeight}; --text-${s.name}-tracking: ${s.letterSpacing || "0"};`).join("\n");
const typeCss = styles.map((s) =>
  `.bl-${s.name} { font-family: var(--font-${s.family}); font-size: var(--text-${s.name}-size); line-height: var(--text-${s.name}-line); font-weight: var(--text-${s.name}-weight); letter-spacing: var(--text-${s.name}-tracking); }`).join("\n");

const palettes = tokens.palettes.list;
const backgrounds = tokens.backgrounds.list;

/* ── 2. 프레임워크 없는 유틸리티 ───────────────────────────── */
const paletteMeta = palettes.map(({ id, name, group, description, values }) => ({ id, name, group, description, swatch: { light: values.light.accent, dark: values.dark.accent } }));
const utilsSrc = read("src/utils.js")
  .replace(/^\/\*[\s\S]*?\*\/\n/, "")
  .replace("/*__PALETTES__*/[]", JSON.stringify(paletteMeta))
  .replace("/*__BACKGROUNDS__*/[]", JSON.stringify(backgrounds.map(({ id, name, description, values }) => ({ id, name, description, swatch: { light: values.light.paper, dark: values.dark.paper } }))))
  .replace("/*__BASE__*/{}", JSON.stringify(Object.fromEntries(["light", "dark"].map((th) => [th, {
    // 바탕·글자·상태색(hex). createPalette·createBackground가 대비를 맞출 때 씁니다.
    ...Object.fromEntries(colorTokens.filter((t) => t.value && /^#/.test(val(t.value, th))).map((t) => [t.name, val(t.value, th)])),
    // 내장 팔레트의 [accent, accent-ink]. createBackground가 어느 팔레트와도 읽히는 바탕을 고릅니다.
    accents: palettes.map((p) => [p.values[th].accent, p.values[th]["accent-ink"]]),
    // 적응형 블러레마: 기본 크레마 채움·거품 결. backgroundCrema가 바탕에 맞게 바꿉니다.
    ...Object.fromEntries(["crema-fill", "crema-fill-strong", "crema-grain", "crema-band-top", "crema-band-lip", "crema-band-mid", "crema-band-low", "crema-fill-tint"].map((n) => [n, val([...colorTokens, ...tokens.material.tokens].find((t) => t.name === n).value, th)])),
    "on-accent": palettes[0].values[th]["on-accent"],
    "shadow-crema": val(tokens.shadow.tokens.find((t) => t.name === "shadow-crema").value, th),
    "shadow-sheet": val(tokens.shadow.tokens.find((t) => t.name === "shadow-sheet").value, th),
  }]))))
  .replace('"__VERSION__"', JSON.stringify(version));
write("dist/utils.mjs", banner + utilsSrc);
const utilsInline = utilsSrc.replace(/^export /gm, "");
const utilNames = [...utilsSrc.matchAll(/^export (?:function|const) (\w+)/gm)].map((m) => m[1]);
write("dist/utils.cjs", banner + '"use strict";\n' + utilsInline + `\nmodule.exports = { ${utilNames.join(", ")} };\n`);
const { paletteToCss, backgroundToCss } = await import(new URL(`dist/utils.mjs?${Date.now()}`, root));
const paletteCss = palettes.map((p) => `/* ${p.id} — ${p.name}: ${p.description} */\n${paletteToCss(p)}`).join("");
const backgroundCss = backgrounds.map((b) => `/* 배경 ${b.id} — ${b.name}: ${b.description} */\n${backgroundToCss(b)}`).join("");

// 반응형: 단계별 그리드 값. CSS 변수는 미디어쿼리 조건에 못 쓰므로 px를 직접 씁니다.
const grid = [
  { bp: null, cols: 4, gutter: "16px", margin: "16px" },   // xs  0–599
  { bp: 600, cols: 8, gutter: "16px", margin: "24px" },    // sm  600–767
  { bp: 768, cols: 8, gutter: "24px", margin: "32px" },    // md  768–1119
  { bp: 1120, cols: 12, gutter: "24px", margin: "40px" },  // lg  1120–1439
  { bp: 1440, cols: 12, gutter: "32px", margin: "48px" },  // xl  1440+
];
const gridCss = grid.map((g) => {
  const body = `--grid-columns: ${g.cols}; --grid-gutter: ${g.gutter}; --grid-margin: ${g.margin};`;
  return g.bp ? `@media (min-width: ${g.bp}px) { :root { ${body} } }` : `:root { ${body} }`;
}).join("\n");
// 작은 화면에서 큰 제목을 줄입니다 (md 미만). 변수를 바꾸므로 .bl-display 클래스와 그 변수를 읽는 컴포넌트(MediaCard 제목 등)가 함께 줄어듭니다.
const fluidType = `@media (max-width: 767px) {
  :root { --text-display-size: 32px; --text-display-line: 40px; --text-title-1-size: 26px; --text-title-1-line: 34px; --text-title-2-size: 20px; --text-title-2-line: 28px; }
}`;

// 글꼴: Blurssism Sans(Pretendard 사본)·Blurssism Serif(Gowun Batang 사본). 한글 2350자 + 영문·숫자·기호만 든 woff2 하나씩(scripts/subset-fonts.py가 만듦).
// fonts.css는 같은 버전의 패키지 파일을 jsDelivr에서, fonts.local.css는 패키지에 든 파일을 씁니다.
// 번들러(Vite·Next.js·SvelteKit)는 import하면 글꼴 파일을 함께 내보내고, 번들러가 없으면 fonts.local.css와 fonts/ 폴더를 같이 올리면 됩니다.
const fontFaces = read("src/fonts/blurssism.css");
const fontNote = `Blurssism Sans(가변 45~930, 450KB)·Blurssism Serif(400·700). Pretendard·Gowun Batang에서 KS X 1001 한글 2350자와 영문·숫자·기호만 남긴 사본이에요.
   2350자 밖의 드문 글자(똠, 햏 등)는 시스템 글꼴로 보입니다. 라이선스: fonts/blurssism-sans/LICENSE.txt, fonts/blurssism-serif/LICENSE.txt (SIL OFL 1.1)`;
write("dist/fonts.css", `${banner}/* fonts.css — ${fontNote}
   jsDelivr에서 불러옵니다. CDN 없이 쓰려면(CSP·사내망·오프라인) 이 파일 대신 fonts.local.css를 불러오세요. */
${fontFaces.replaceAll("url(./fonts/", `url(https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism@${version}/dist/fonts/`)}`);
write("dist/fonts.local.css", `${banner}/* fonts.local.css — ${fontNote}
   CDN 없이 패키지에 든 글꼴 파일을 씁니다. fonts.css 대신 불러오세요. */
${fontFaces}`);

// 2.1: fonts.dynamic.css — 2350자 사본 대신 원본 글꼴을 동적 서브셋으로 씁니다(Pretendard 동적 서브셋 CSS + Google Fonts의 Gowun Batang).
//      모든 한글(11,172자)이 같은 글꼴로 보이고, 화면에 쓰인 글자 조각만 받아 첫 로딩이 가볍습니다. 대신 CDN 두 곳(jsDelivr·Google Fonts)이 필요합니다.
write("dist/fonts.dynamic.css", `${banner}/* fonts.dynamic.css — 원본 글꼴을 동적 서브셋으로 (Pretendard Variable 1.3.9 © Kil Hyung-jin, Gowun Batang © The Gowun Batang Project Authors, 둘 다 SIL OFL 1.1).
   Blurssism Sans·Serif(2350자 사본) 대신 이 파일을 불러오면 2350자 밖의 글자(똠, 햏 등)도 같은 글꼴로 보이고, 쓰인 글자 조각만 받습니다.
   jsDelivr와 Google Fonts를 모두 허용해야 합니다. CDN을 못 쓰면 fonts.local.css를 쓰세요. */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
@import url("https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap");
:root { --font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif; --font-serif: "Gowun Batang", "Noto Serif KR", AppleMyungjo, Batang, serif; }
`);

write("dist/tokens.css", `${banner}/* tokens.css — src/tokens.json에서 생성. 다크: <html data-theme="dark"> 또는 시스템 다크. 팔레트: <html data-palette="matcha">. 배경: <html data-background="white">
   글꼴은 fonts.css에 따로 있습니다. */
:root, [data-theme="light"] {
${decl(colorsAndShadows, "light")}
}
[data-theme="dark"] {
${decl(colorsAndShadows, "dark")}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${decl(colorsAndShadows, "dark", "    ")}
  }
}
${paletteCss}${backgroundCss}
:root {
${plain.map((t) => `  --${t.name}: ${t.value};`).join("\n")}
${families}
${typeVars}
}
${gridCss}
${typeCss}
${fluidType}
`);

const tw = {
  theme: {
    extend: {
      // hex 토큰은 rgb(var(--x-rgb) / <alpha-value>)라 bg-accent/50이 됩니다. rgba 토큰(crema-fill 등)은 그대로.
      colors: Object.fromEntries(colorTokens.map((t) => [t.name, /^#[0-9a-f]{6}$/i.test(val(t.value, "light")) ? `rgb(var(--${t.name}-rgb) / <alpha-value>)` : `var(--${t.name})`])),
      spacing: Object.fromEntries(tokens.spacing.tokens.map((t) => [t.name.replace("space-", ""), `var(--${t.name})`])),
      borderRadius: Object.fromEntries(tokens.radius.tokens.map((t) => [t.name.replace("radius-", ""), `var(--${t.name})`])),
      boxShadow: Object.fromEntries(tokens.shadow.tokens.map((t) => [t.name.replace("shadow-", ""), `var(--${t.name})`])),
      backdropBlur: Object.fromEntries(tokens.blur.tokens.map((t) => [t.name.replace("blur-", ""), `var(--${t.name})`])),
      backgroundImage: { "crema-band": "var(--crema-band)", "crema-grain": "var(--crema-grain)" },
      fontFamily: { sans: ["var(--font-sans)"], serif: ["var(--font-serif)"] },
      fontSize: Object.fromEntries(styles.map((s) => [s.name, [`var(--text-${s.name}-size)`, { lineHeight: `var(--text-${s.name}-line)`, fontWeight: `var(--text-${s.name}-weight)`, letterSpacing: `var(--text-${s.name}-tracking)` }]])),
      screens: { sm: "600px", md: "768px", lg: "1120px", xl: "1440px" },
      maxWidth: { content: "var(--content-max)", prose: "var(--prose-max)" },
    },
  },
};
write("dist/tailwind-preset.js", `${banner}/* Tailwind 프리셋 — tailwind.config.js: presets: [require("@caffeinecatkr/blurssism/tailwind")]
   dist/tokens.css를 함께 불러와야 var(--…) 값이 채워집니다. 브레이크포인트 sm/md/lg/xl은 blurssism과 같습니다. */
module.exports = ${JSON.stringify(tw, null, 2)};
`);

/* ── 1b. 스타일 ───────────────────────────── */
const bps = { sm: 600, md: 768, lg: 1120, xl: 1440 };
const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
const spans = range(12).map((n) => `.bl-span-${n} { grid-column: span ${n} / span ${n}; }`).join("\n");
const bpSpans = Object.entries(bps).map(([bp, px]) =>
  `@media (min-width: ${px}px) {\n${range(12).map((n) => `  .bl-span-${bp}-${n} { grid-column: span ${n} / span ${n}; }`).join("\n")}\n  .bl-span-${bp}-full { grid-column: 1 / -1; }\n}`).join("\n");
const vis = Object.entries(bps).map(([bp, px]) =>
  `@media (min-width: ${px}px) { .bl-hide-from-${bp} { display: none !important; } }\n@media (max-width: ${px - 1}px) { .bl-hide-below-${bp} { display: none !important; } }`).join("\n");
// 2.0: 옛 glass 이름(.bl-glass*, [data-glass], --glass-*)은 더 만들지 않습니다. 남은 쓰임새는 auditCrema()가 찾아 줍니다.
// 2.1: 컴포넌트 CSS 조각(src/css/*.css)은 bundle.css의 접근성 블록 앞에 끼워 넣고, 전체를 @layer blurssism으로 감쌉니다.
//      계층 밖의 소비자 CSS가 명시도와 상관없이 이깁니다(단, 전역 리셋도 이기므로 리셋은 @layer reset처럼 앞 계층에 두세요).
// /* @unlayered */ … /* @/unlayered */ 사이의 블록은 tokens.css의 변수를 덮어써야 하므로 @layer 밖(앞)에 둡니다.
let cssMain = read("src/bundle.css");
const unlayered = [];
cssMain = cssMain.replace(/\/\* @unlayered[^*]*\*\/\n([\s\S]*?)\/\* @\/unlayered \*\/\n/g, (m, body) => { unlayered.push(body); return ""; });
if (unlayered.length < 2) throw new Error("bundle.css의 @unlayered 블록을 찾지 못했습니다");
const a11yAt = cssMain.indexOf("/* ── 접근성: 투명도 줄이기");
if (a11yAt < 0) throw new Error("bundle.css의 접근성 블록 표시를 찾지 못했습니다");
const partials = readdirSync(new URL("src/css/", root)).filter((f) => f.endsWith(".css")).sort()
  .map((f) => `\n/* ── ${f} ── */\n` + read("src/css/" + f).replace(/^\/\*[\s\S]*?\*\/\n/, "")).join("");
const cssAll = cssMain.slice(0, a11yAt) + partials + "\n" + cssMain.slice(a11yAt) +
  `\n/* ── 생성: 그리드 칸 (xs는 4열이므로 .bl-span-1~4, 단계별은 .bl-span-md-6 처럼) ── */\n${spans}\n${bpSpans}\n` +
  `/* ── 생성: 보이기·숨기기 (.bl-hide-from-lg = lg부터 숨김, .bl-hide-below-md = md 미만에서 숨김) ── */\n${vis}\n`;
write("dist/bundle.css", banner + "/* 계층 밖: tokens.css의 변수를 팔레트·테마에 맞게 덮어쓰는 블록 */\n" + unlayered.join("\n") + "\n@layer blurssism;\n@layer blurssism {\n" + cssAll + "}\n");

// 2.1: 컴포넌트별 타입 조각(src/react/X.d.ts)을 src/index.d.ts 뒤에 이어 붙입니다. 조각은 자기 컴포넌트의 props 인터페이스와 declare만 담습니다.
const dtsPartials = readdirSync(new URL("src/react/", root)).filter((f) => f.endsWith(".d.ts")).sort()
  .map((f) => `\n/* ── ${f.replace(".d.ts", "")} ── */\n` + read("src/react/" + f).replace(/^\/\*[\s\S]*?\*\/\n/, "").replace(/^import [^\n]*;\n/gm, "")).join("");
const dtsMain = read("src/index.d.ts");
const dtsCut = dtsMain.indexOf("/** 다른 React 인스턴스로 컴포넌트를 만듭니다");
write("dist/index.d.ts", dtsMain.slice(0, dtsCut) + dtsPartials + "\n" + dtsMain.slice(dtsCut));

/* ── 3. React 컴포넌트 ─────────────────────────────
   2.1: 원본은 src/react/*.js(컴포넌트 하나에 파일 하나). import·export를 벗겨 한 파일로 합치고,
   withRef()·React.createContext() 초기화에는 PURE 주석을 붙여 안 쓰는 컴포넌트를 번들러가 버릴 수 있게 합니다. */
const reactFiles = readdirSync(new URL("src/react/", root)).filter((f) => f.endsWith(".js"));
const reactOrder = ["_shared.js", "Icon.js", ...reactFiles.filter((f) => f !== "_shared.js" && f !== "Icon.js").sort()];
const exportNames = [];
const core = reactOrder.map((f) => {
  let src = read("src/react/" + f)
    .replace(/^\/\*[\s\S]*?\*\/\n/, "")                       // 파일 머리 주석
    .replace(/^import [^\n]*;\n/gm, "")                        // import (React·_shared·utils는 합친 뒤 한 곳에서)
    .replace(/^export \{ React \};\n/m, "");
  for (const m of src.matchAll(/^export (?:var|function|const|let) (\w+)/gm)) exportNames.push(m[1]);
  return src.replace(/^export (var|function|const|let) /gm, "$1 ")
    .replace(/^(var|const) (\w+) = (withRef|React\.createContext|React\.forwardRef|React\.memo)\(/gm, "$1 $2 = /*#__PURE__*/ $3(")
    .replace(/^/gm, "").trim() + "\n";
}).join("\n");
const components = exportNames.filter((n) => /^[A-Z][a-z]/.test(n));   // PATHS 같은 상수는 제외
const hooks = exportNames.filter((n) => /^use/.test(n) && !["useId", "useLatest", "useModal"].includes(n));   // 내부 훅은 내보내지 않습니다
const publicNames = [...components, ...hooks];
if (components.length < 20) throw new Error("컴포넌트 목록을 읽지 못했습니다: " + exportNames.join(","));
const compat = `/** @deprecated 2.1부터 컴포넌트를 바로 import하세요. React 인자는 무시됩니다(2.0까지는 다른 React 인스턴스로 다시 만들었습니다). */
function createBlurssism() { return B; }`;
const apiObj = `const B = { ${publicNames.join(", ")}, ${utilNames.join(", ")} };`;

write("dist/index.mjs",
  `"use client";\n${banner}import React from "react";\nimport { ${utilNames.join(", ")} } from "./utils.mjs";\n\n${core}\n${apiObj}\n${compat}\n` +
  `export { ${publicNames.join(", ")} };\nexport { ${utilNames.join(", ")} };\nexport { createBlurssism };\nexport default B;\n`);

write("dist/index.cjs",
  `"use client";\n${banner}"use strict";\nconst React = require("react");\nconst { ${utilNames.join(", ")} } = require("./utils.cjs");\n\n${core}\n${apiObj}\n${compat}\n` +
  `module.exports = Object.assign({ createBlurssism, default: B }, B);\n`);

const dsHeader = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "Blurssism", components: components.map((name) => ({ name })) })} */\n`;
write("dist/bundle.js",
  dsHeader + banner +
  `(function () {\n  if (typeof window === "undefined" || !window.React) { if (typeof console !== "undefined") console.error("blurssism: window.React가 없습니다. react와 react-dom UMD 스크립트를 먼저 불러오세요."); return; }\n  var React = window.React;\n${utilsInline}\n${core}\n${apiObj}\n${compat}\n` +
  `  window.Blurssism = Object.assign(window.Blurssism || {}, B, { createBlurssism });\n})();\n`);

/* ── 4. Svelte용 아이콘 ───────────────────────────── */
const paths = core.match(/var PATHS = (\{[\s\S]*?\n\});/)[1];
write("src/svelte/icons.js", `${banner}/* 생성 파일: src/react/Icon.js의 아이콘 경로 */\nexport const PATHS = ${paths};\n`);
write("src/svelte/icons.d.ts", `export declare const PATHS: Record<string, string>;\n`);
// Svelte 진입점은 utils 사본을 따로 두지 않고 dist/utils.mjs를 그대로 다시 내보냅니다(상태를 한 곳에).
// 원본 위치(src/svelte)에서는 ../../dist, 패키지 위치(svelte/)에서는 ../dist — `build.mjs --post`가 고칩니다.
write("src/svelte/utils.js", banner + "/* 생성 파일: dist/utils.mjs를 다시 내보냅니다 */\nexport * from \"../../dist/utils.mjs\";\n");
const utilTypes = read("src/index.d.ts").match(/\/\*\* 팔레트 목록 \*\/[\s\S]*?(?=export declare const version)/)[0];
write("src/svelte/utils.d.ts", `/* 생성 파일 */\nimport type { PaletteId, Breakpoint } from "./types.js";\nexport interface PaletteInfo { id: PaletteId; name: string; group: "caffeine" | "web"; description: string; swatch: { light: string; dark: string } }\n${utilTypes}export declare const version: string;\nexport declare const author: "caffeinecat";\n`);

console.log(`blurssism ${version}: ${components.length} React components, ${utilNames.length} utils, ${palettes.length} palettes, ${backgrounds.length} backgrounds → dist/, src/svelte/{icons,utils}.js`);
