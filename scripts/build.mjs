// blurssism 빌드 · © caffeinecat · MIT
// 원본(src/)에서 dist/와 svelte/의 생성 파일을 만듭니다. 의존성 없이 `node scripts/build.mjs`로 실행합니다.
//   src/tokens.json → dist/tokens.json, dist/tokens.css, dist/tailwind-preset.js
//   src/utils.js    → dist/utils.mjs · dist/utils.cjs (프레임워크 없이 쓰는 함수: 팔레트·테마·브레이크포인트·크레마 설정)
//   src/core.js     → dist/index.mjs (ESM), dist/index.cjs (CommonJS), dist/bundle.js (<script>용 window.Blurssism)
//   글꼴            → dist/fonts.css (jsDelivr), dist/fonts.local.css (패키지에 든 dist/fonts/ 파일. tokens.css와 bundle.css는 글꼴을 불러오지 않습니다)
//   아이콘 경로     → src/svelte/icons.js
// `node scripts/build.mjs --post`는 svelte-package 뒤에 svelte/utils.js가 dist/utils.mjs를 가리키게 고칩니다.
//   React·Svelte·바닐라가 같은 utils 모듈 하나를 써서 팔레트 등록·크레마 모드 상태가 한 곳에만 있습니다.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

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
const decl = (list, theme, indent = "  ") => list.map((t) => `${indent}--${t.name}: ${cssVal(val(t.value, theme))};`).join("\n");
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
      colors: Object.fromEntries(colorTokens.map((t) => [t.name, `var(--${t.name})`])),
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
write("dist/bundle.css", banner + read("src/bundle.css") +
  `\n/* ── 생성: 그리드 칸 (xs는 4열이므로 .bl-span-1~4, 단계별은 .bl-span-md-6 처럼) ── */\n${spans}\n${bpSpans}\n` +
  `/* ── 생성: 보이기·숨기기 (.bl-hide-from-lg = lg부터 숨김, .bl-hide-below-md = md 미만에서 숨김) ── */\n${vis}\n`);

write("dist/index.d.ts", read("src/index.d.ts"));

/* ── 3. React 컴포넌트 ───────────────────────────── */
const core = read("src/core.js")
  .replace(/^\/\*[\s\S]*?\*\/\n/, "")
  .replace("export function createBlurssism", "function createBlurssism");
const apiSrc = core.slice(core.indexOf("var api = {"), core.indexOf("return api;"));
const compNames = [...apiSrc.matchAll(/(\w+):/g)].map((m) => m[1]);
const components = compNames.filter((n) => /^[A-Z]/.test(n));
if (components.length < 20) throw new Error("컴포넌트 목록을 읽지 못했습니다: " + compNames.join(","));

write("dist/index.mjs",
  `"use client";\n${banner}import React from "react";\nimport { ${utilNames.join(", ")} } from "./utils.mjs";\n\n${core}\nconst B = Object.assign(createBlurssism(React), { ${utilNames.join(", ")} });\n` +
  compNames.map((n) => `export const ${n} = B.${n};`).join("\n") +
  `\nexport { ${utilNames.join(", ")} };\nexport { createBlurssism };\nexport default B;\n`);

write("dist/index.cjs",
  `"use client";\n${banner}"use strict";\nconst React = require("react");\nconst { ${utilNames.join(", ")} } = require("./utils.cjs");\n\n${core}\n` +
  `const B = Object.assign(createBlurssism(React), { ${utilNames.join(", ")} });\n` +
  `module.exports = Object.assign({ createBlurssism: createBlurssism, default: B }, B);\n`);

const dsHeader = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "Blurssism", components: components.map((name) => ({ name })) })} */\n`;
write("dist/bundle.js",
  dsHeader + banner +
  `(function () {\n${utilsInline}\n${core}\n  if (typeof window !== "undefined" && window.React) {\n` +
  `    window.Blurssism = Object.assign(window.Blurssism || {}, createBlurssism(window.React), { ${utilNames.join(", ")} });\n` +
  `  } else if (typeof console !== "undefined") {\n` +
  `    console.error("blurssism: window.React가 없습니다. react와 react-dom UMD 스크립트를 먼저 불러오세요.");\n  }\n})();\n`);

/* ── 4. Svelte용 아이콘 ───────────────────────────── */
const paths = core.match(/var PATHS = (\{[\s\S]*?\n  \});/)[1];
write("src/svelte/icons.js", `${banner}/* 생성 파일: src/core.js의 아이콘 경로 */\nexport const PATHS = ${paths.replace(/\n  /g, "\n")};\n`);
write("src/svelte/icons.d.ts", `export declare const PATHS: Record<string, string>;\n`);
// Svelte 진입점은 utils 사본을 따로 두지 않고 dist/utils.mjs를 그대로 다시 내보냅니다(상태를 한 곳에).
// 원본 위치(src/svelte)에서는 ../../dist, 패키지 위치(svelte/)에서는 ../dist — `build.mjs --post`가 고칩니다.
write("src/svelte/utils.js", banner + "/* 생성 파일: dist/utils.mjs를 다시 내보냅니다 */\nexport * from \"../../dist/utils.mjs\";\n");
const utilTypes = read("src/index.d.ts").match(/\/\*\* 팔레트 목록 \*\/[\s\S]*?(?=export declare const version)/)[0];
write("src/svelte/utils.d.ts", `/* 생성 파일 */\nimport type { PaletteId, Breakpoint } from "./types.js";\nexport interface PaletteInfo { id: PaletteId; name: string; group: "caffeine" | "web"; description: string; swatch: { light: string; dark: string } }\n${utilTypes}export declare const version: string;\nexport declare const author: "caffeinecat";\n`);

console.log(`blurssism ${version}: ${components.length} React components, ${utilNames.length} utils, ${palettes.length} palettes, ${backgrounds.length} backgrounds → dist/, src/svelte/{icons,utils}.js`);
