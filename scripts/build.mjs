// blurssism 빌드 · © caffeinecat · MIT
// src/core.js 하나로 세 가지를 만듭니다. 의존성 없이 `node scripts/build.mjs`로 실행합니다.
//   dist/index.mjs  — ES 모듈: import { Button } from "@caffeinecatkr/blurssism"
//   dist/index.cjs  — CommonJS: const { Button } = require("@caffeinecatkr/blurssism")
//   dist/bundle.js  — <script>용: window.Blurssism (window.React 필요)
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const write = (p, s) => writeFileSync(new URL(p, root), s);

const { version } = JSON.parse(read("package.json"));
const core = read("src/core.js")
  .replace(/^\/\*[\s\S]*?\*\/\n/, "")           // 원본 안내 주석 제거
  .replace("export function createBlurssism", "function createBlurssism")
  .replace('"__VERSION__"', JSON.stringify(version));

// 내보낼 이름: api 객체의 키
const apiSrc = core.slice(core.indexOf("var api = {"), core.indexOf("return api;"));
const names = [...apiSrc.matchAll(/(\w+):/g)].map((m) => m[1]);
const components = names.filter((n) => /^[A-Z]/.test(n));
if (components.length < 20) throw new Error("컴포넌트 목록을 읽지 못했습니다: " + names.join(","));

const banner = `/* blurssism v${version} · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */\n`;

write("dist/index.mjs",
  `"use client";\n${banner}import React from "react";\n\n${core}\nconst B = createBlurssism(React);\n` +
  names.map((n) => `export const ${n} = B.${n};`).join("\n") +
  `\nexport { createBlurssism };\nexport default B;\n`);

write("dist/index.cjs",
  `"use client";\n${banner}"use strict";\nconst React = require("react");\n\n${core}\nconst B = createBlurssism(React);\n` +
  `module.exports = Object.assign({ createBlurssism: createBlurssism, default: B }, B);\n`);

const dsHeader = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "Blurssism", components: components.map((name) => ({ name })) })} */\n`;
write("dist/bundle.js",
  dsHeader + banner +
  `(function () {\n${core}\n  if (typeof window !== "undefined" && window.React) {\n` +
  `    window.Blurssism = Object.assign(window.Blurssism || {}, createBlurssism(window.React));\n` +
  `  } else if (typeof console !== "undefined") {\n` +
  `    console.error("blurssism: window.React가 없습니다. react와 react-dom UMD 스크립트를 먼저 불러오세요.");\n  }\n})();\n`);

console.log(`blurssism ${version}: ${components.length} components, ${names.length - components.length} other exports → dist/index.mjs, dist/index.cjs, dist/bundle.js`);
