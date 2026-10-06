// blurssism 빌드 · © caffeinecat · MIT
// 원본(src/)에서 dist/와 svelte/의 생성 파일을 만듭니다. 의존성 없이 `node scripts/build.mjs`로 실행합니다.
//   src/tokens.json → dist/tokens.json, dist/tokens.css, dist/tailwind-preset.js
//   src/utils.js    → dist/utils.mjs (프레임워크 없이 쓰는 함수: 팔레트·테마·브레이크포인트·유리 설정)
//   src/core.js     → dist/index.mjs (ESM), dist/index.cjs (CommonJS), dist/bundle.js (<script>용 window.Blurssism)
//   아이콘 경로     → svelte/icons.js
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const write = (p, s) => { mkdirSync(new URL(".", new URL(p, root)), { recursive: true }); writeFileSync(new URL(p, root), s); };

const { version } = JSON.parse(read("package.json"));
const banner = `/* blurssism v${version} · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */\n`;

/* ── 1. 토큰 ───────────────────────────── */
const tokens = JSON.parse(read("src/tokens.json"));
tokens.meta = { ...tokens.meta, version };
write("dist/tokens.json", JSON.stringify(tokens, null, 2) + "\n");

const colorTokens = tokens.color.tokens;
const val = (v, theme) => (typeof v === "string" ? v : v[theme] ?? v.light);
const cssVal = (v) => v.replace(/^\{(.+)\}$/, "var(--$1)");
const decl = (list, theme, indent = "  ") => list.map((t) => `${indent}--${t.name}: ${cssVal(val(t.value, theme))};`).join("\n");
const colorsAndShadows = [...colorTokens, ...tokens.shadow.tokens, ...tokens.material.tokens];
const plain = ["spacing", "radius", "blur", "backdrop", "layout"].flatMap((f) => tokens[f].tokens);
const families = Object.entries(tokens.type.families)
  .map(([k, v]) => `  --font-${k}: ${k === "sans" ? v.replace("Pretendard,", '"Pretendard Variable", Pretendard,') : v};`).join("\n");
const styles = tokens.type.groups.flatMap((g) => g.styles.map((s) => ({ ...s, family: s.family || g.family })));
const typeCss = styles.map((s) =>
  `.${s.name} { font-family: var(--font-${s.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : ""} }`).join("\n");

const palettes = tokens.palettes.list;
const palDecl = (p, theme, indent) => Object.entries(p.values[theme]).map(([k, v]) => `${indent}--${k}: ${v};`).join("\n");
const paletteCss = palettes.map((p) => `/* ${p.id} — ${p.name}: ${p.description} */
[data-palette="${p.id}"] {
${palDecl(p, "light", "  ")}
}
[data-theme="dark"][data-palette="${p.id}"], [data-theme="dark"] [data-palette="${p.id}"] {
${palDecl(p, "dark", "  ")}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"])[data-palette="${p.id}"], :root:not([data-theme="light"]) [data-palette="${p.id}"] {
${palDecl(p, "dark", "    ")}
  }
}`).join("\n");

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
// 작은 화면에서 큰 제목을 줄입니다 (md 미만)
const fluidType = `@media (max-width: 767px) {
  .display { font-size: 32px; line-height: 40px; }
  .title-1 { font-size: 26px; line-height: 34px; }
  .title-2 { font-size: 20px; line-height: 28px; }
}`;

write("dist/tokens.css", `${banner}/* tokens.css — src/tokens.json에서 생성. 다크: <html data-theme="dark"> 또는 시스템 다크. 팔레트: <html data-palette="matcha"> */
@import url("https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css");
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
${paletteCss}
:root {
${plain.map((t) => `  --${t.name}: ${t.value};`).join("\n")}
${families}
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
      backgroundImage: { "glass-crema": "var(--glass-crema)", "glass-grain": "var(--glass-grain)" },
      fontFamily: { sans: ["var(--font-sans)"], serif: ["var(--font-serif)"] },
      fontSize: Object.fromEntries(styles.map((s) => [s.name, [s.fontSize, { lineHeight: s.lineHeight, fontWeight: String(s.fontWeight), ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}) }]])),
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
write("dist/bundle.css", banner + read("src/bundle.css").replace(/^\/\*[\s\S]*?\*\/\n/m, (m) => m) +
  `\n/* ── 생성: 그리드 칸 (xs는 4열이므로 .bl-span-1~4, 단계별은 .bl-span-md-6 처럼) ── */\n${spans}\n${bpSpans}\n` +
  `/* ── 생성: 보이기·숨기기 (.bl-hide-from-lg = lg부터 숨김, .bl-hide-below-md = md 미만에서 숨김) ── */\n${vis}\n`);

write("dist/index.d.ts", read("src/index.d.ts"));

/* ── 2. 프레임워크 없는 유틸리티 ───────────────────────────── */
const paletteMeta = palettes.map(({ id, name, group, description, values }) => ({ id, name, group, description, swatch: { light: values.light.accent, dark: values.dark.accent } }));
const utilsSrc = read("src/utils.js")
  .replace(/^\/\*[\s\S]*?\*\/\n/, "")
  .replace("/*__PALETTES__*/[]", JSON.stringify(paletteMeta))
  .replace("/*__BASE__*/{}", JSON.stringify(Object.fromEntries(["light", "dark"].map((th) => [th, {
    paper: val(colorTokens.find((t) => t.name === "paper").value, th),
    "paper-raised": val(colorTokens.find((t) => t.name === "paper-raised").value, th),
    "on-accent": palettes[0].values[th]["on-accent"],
  }]))))
  .replace('"__VERSION__"', JSON.stringify(version));
write("dist/utils.mjs", banner + utilsSrc);
const utilsInline = utilsSrc.replace(/^export /gm, "");
const utilNames = [...utilsSrc.matchAll(/^export (?:function|const) (\w+)/gm)].map((m) => m[1]);

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
  `"use client";\n${banner}"use strict";\nconst React = require("react");\n\n${utilsInline}\n${core}\n` +
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
write("src/svelte/utils.js", banner + "/* 생성 파일: src/utils.js */\n" + utilsSrc);
const utilTypes = read("src/index.d.ts").match(/\/\*\* 팔레트 목록 \*\/[\s\S]*?(?=export declare const version)/)[0];
write("src/svelte/utils.d.ts", `/* 생성 파일 */\nimport type { PaletteId, Breakpoint } from "./types.js";\nexport interface PaletteInfo { id: PaletteId; name: string; group: "caffeine" | "web"; description: string; swatch: { light: string; dark: string } }\n${utilTypes}export declare const version: string;\nexport declare const author: "caffeinecat";\n`);

console.log(`blurssism ${version}: ${components.length} React components, ${utilNames.length} utils, ${palettes.length} palettes → dist/, src/svelte/{icons,utils}.js`);
