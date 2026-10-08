// blurssism 대비 검사 · © caffeinecat · MIT
// 모든 팔레트 × 라이트·다크에서 글자와 조작 요소의 대비가 WCAG 기준을 넘는지 확인합니다.
// 불투명한 바탕(paper 등)과, 반투명한 크레마 면(뒤가 검정·흰색인 최악의 경우)을 모두 검사합니다.
// `node scripts/check.mjs` — 하나라도 미달이면 종료 코드 1.
import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("../src/tokens.json", import.meta.url), "utf8"));
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const base = (theme) => Object.fromEntries(tokens.color.tokens
  .filter((t) => typeof t.value === "object" || /^#/.test(t.value))
  .map((t) => [t.name, typeof t.value === "string" ? t.value : t.value[theme]]));

// [글자/표시, 바탕, 최소 대비]
const PAIRS = [
  ["ink", "paper", 4.5], ["ink", "paper-raised", 4.5], ["ink", "paper-sunken", 4.5],
  ["ink-muted", "paper", 4.5], ["ink-muted", "paper-raised", 4.5], ["ink-muted", "paper-sunken", 4.5],
  ["ink-subtle", "paper", 4.5], ["ink-subtle", "paper-raised", 4.5], ["ink-subtle", "paper-sunken", 4.5],
  ["line-strong", "paper", 3], ["line-strong", "paper-raised", 3],
  ["focus-ring", "paper", 3], ["focus-ring", "paper-raised", 3],
  ["positive", "paper", 4.5], ["positive", "positive-soft", 4.5],
  ["warning", "paper", 4.5], ["warning", "warning-soft", 4.5],
  ["danger", "paper", 4.5], ["danger", "danger-soft", 4.5], ["info", "paper", 4.5],
  ["on-accent", "accent", 4.5], ["accent-ink", "accent-soft", 4.5], ["accent-ink", "paper", 4.5],
  ["accent-ink", "paper-raised", 4.5], ["ink", "accent-soft", 4.5], ["accent", "paper", 3], ["accent", "paper-raised", 3],
];

let fails = 0, checks = 0;
for (const p of tokens.palettes.list) {
  for (const theme of ["light", "dark"]) {
    const c = { ...base(theme), ...Object.fromEntries(Object.entries(p.values[theme]).filter(([, v]) => v.startsWith("#"))) };
    const worst = [];
    for (const [fg, bg, min] of PAIRS) {
      checks++;
      const r = ratio(c[fg], c[bg]);
      if (r < min) { fails++; console.log(`✗ ${p.id}/${theme}: ${fg} on ${bg} = ${r.toFixed(2)} (< ${min})`); }
      worst.push(r / min);
    }
    console.log(`✓ ${p.id.padEnd(9)} ${theme.padEnd(5)} on-accent ${ratio(c["on-accent"], c.accent).toFixed(1)}:1 · accent-ink ${ratio(c["accent-ink"], c["accent-soft"]).toFixed(1)}:1 · 최저 여유 ${Math.min(...worst).toFixed(2)}×`);
  }
}
// 브랜드색 팔레트: 색상환 전체와 극단값(흰색·검정·회색·형광)으로 만들어도 같은 기준을 넘는지
const { createPalette } = await import("../dist/utils.mjs");
const samples = ["#ffffff", "#000000", "#808080", "#ffff00", "#00ff00", "#00ffff", "#ff0000", "#ff5a1f", "#fee500", "#03c75a", "#1877f2", "#e1306c", "#7a4524"];
for (let hue = 0; hue < 360; hue += 15) for (const [sat, lig] of [[90, 50], [60, 30], [40, 75], [100, 85], [20, 15]]) {
  const f = (n) => { const k = (n + hue / 30) % 12, a = (sat / 100) * Math.min(lig / 100, 1 - lig / 100); return Math.round(255 * (lig / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); };
  samples.push("#" + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join(""));
}
let brandFails = 0;
for (const color of samples) {
  const p = createPalette(color);
  for (const theme of ["light", "dark"]) {
    const c = { ...base(theme), ...p.values[theme] };
    for (const [fg, bg, min] of PAIRS) {
      checks++;
      if (ratio(c[fg], c[bg]) < min) { fails++; brandFails++; console.log(`✗ brand ${color}/${theme}: ${fg} on ${bg} = ${ratio(c[fg], c[bg]).toFixed(2)} (< ${min})`); }
    }
  }
}
console.log(`✓ 브랜드색 ${samples.length}개로 만든 팔레트${brandFails ? ` — ${brandFails}개 미달` : " 모두 통과"}`);

// 배경: 내장 배경 × 내장 팔레트, 그리고 아무 색으로 만든 배경 × 내장 팔레트·브랜드색 팔레트
const { createBackground } = await import("../dist/utils.mjs");
let bgFails = 0;
const checkOn = (label, bgValues, palValues) => {
  for (const theme of ["light", "dark"]) {
    const c = { ...base(theme), ...bgValues[theme], ...Object.fromEntries(Object.entries(palValues[theme]).filter(([, v]) => v.startsWith("#"))) };
    for (const [fg, bg, min] of PAIRS) {
      checks++;
      if (ratio(c[fg], c[bg]) < min) { fails++; bgFails++; console.log(`✗ ${label}/${theme}: ${fg} on ${bg} = ${ratio(c[fg], c[bg]).toFixed(2)} (< ${min})`); }
    }
  }
};
for (const b of tokens.backgrounds.list) for (const p of tokens.palettes.list) checkOn(`배경 ${b.id} × ${p.id}`, b.values, p.values);
const bgSamples = ["#ffffff", "#000000", "#808080", "#f2f2f2", "#1e1e1e", "#ff0000", "#00ff00", "#0000ff", "#fef3c7", "#f5f0ff", "#0f172a", "#e0f2fe"];
for (let hue = 0; hue < 360; hue += 30) for (const [sat, lig] of [[30, 95], [60, 50], [20, 10]]) {
  const f = (n) => { const k = (n + hue / 30) % 12, a = (sat / 100) * Math.min(lig / 100, 1 - lig / 100); return Math.round(255 * (lig / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); };
  bgSamples.push("#" + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join(""));
}
for (const color of bgSamples) {
  const b = createBackground(color);
  for (const p of tokens.palettes.list) checkOn(`배경 ${color} × ${p.id}`, b.values, p.values);
  for (const brand of ["#ff5a1f", "#1877f2", "#fee500", "#808080"]) checkOn(`배경 ${color} × 브랜드 ${brand}`, b.values, createPalette(brand, { background: b }).values);
}
console.log(`✓ 배경 ${tokens.backgrounds.list.length}종과 배경색 ${bgSamples.length}개${bgFails ? ` — ${bgFails}개 미달` : " 모두 통과"}`);

// ── 크레마 위 글자 ─────────────────────────────
// 크레마는 반투명이라 뒤에 무엇이 오느냐에 따라 바탕색이 바뀝니다. 브라우저처럼 sRGB에서 층을 차례로 겹쳐
// (뒤 → 채움 → 거품 결(평균) → 크레마 띠 → 데스크톱 모드의 포인터 빛) 뒤가 완전한 검정·흰색일 때의 바탕을 구합니다.
// 기준: 얇은 크레마 위 ink, 두꺼운 크레마 위 ink와 crema-ink-muted가 4.5:1 이상.
const mat = (n, th) => { const t = [...tokens.color.tokens, ...tokens.material.tokens].find((x) => x.name === n); return typeof t.value === "string" ? t.value : t.value[th]; };
const rgbaOf = (str) => { const v = str.match(/rgba?\(([^)]+)\)/)[1].split(",").map(Number); return [v.slice(0, 3), v[3] ?? 1]; };
const pct = (str) => parseFloat(str) / 100;
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const hexOf = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const over = (bg, c, a) => bg.map((v, i) => v * (1 - a) + c[i] * a);
const grainOf = (th) => {   // feColorMatrix의 색과 알파(노이즈 평균 0.5)
  const m = decodeURIComponent(mat("crema-grain", th)).match(/values='([^']+)'/)[1].split(/\s+/).map(Number);
  return [[m[4], m[9], m[14]].map((v) => v * 255), m[18] * 0.5];
};
let cremaFails = 0, cremaChecks = 0, cremaWorst = Infinity;
function checkCremaText(label, values, theme) {
  const tint = over(rgb(values.accent), rgb(values.deco), pct(mat("crema-tint-mix", theme)));
  const [grainC, grainA] = grainOf(theme);
  const lip = pct(mat("crema-band-lip", theme)), low = pct(mat("crema-band-low", theme));
  const light = pct(mat("crema-light-strength", theme)), pointer = 1 - (1 - light) * (1 - light / 2);
  const ink = base(theme).ink, muted = base(theme)["crema-ink-muted"];
  for (const [surface, token, texts] of [["얇은", "crema-fill", [["ink", ink]]], ["두꺼운", "crema-fill-strong", [["ink", ink], ["crema-ink-muted", muted]]]]) {
    const [fc, fa] = rgbaOf(mat(token, theme));
    for (const mode of ["on", "rich"]) for (const back of [[0, 0, 0], [255, 255, 255]]) {
      const a = mode === "rich" && token === "crema-fill" ? fa * pct(mat("crema-rich-fill", theme)) : fa;
      const under = over(over(back, fc, a), grainC, grainA);
      const bands = [lip, low]; if (mode === "rich") bands.push(1 - (1 - lip) * (1 - pointer));
      for (const ta of bands) {
        const bg = hexOf(over(under, tint, ta));
        for (const [name, color] of texts) {
          cremaChecks++; checks++;
          const r = ratio(color, bg);
          cremaWorst = Math.min(cremaWorst, r);
          if (r < 4.5) { cremaFails++; fails++; console.log(`✗ ${label}/${theme}/${mode}: ${surface} 크레마(뒤 ${back[0] ? "흰색" : "검정"}) 위 ${name} = ${r.toFixed(2)} (< 4.5)`); }
        }
      }
    }
  }
}
for (const p of tokens.palettes.list) for (const theme of ["light", "dark"]) checkCremaText(p.id, p.values[theme], theme);
for (const color of samples) { const p = createPalette(color); for (const theme of ["light", "dark"]) checkCremaText("brand " + color, p.values[theme], theme); }
console.log(`✓ 크레마 위 글자 ${cremaChecks}개 조합${cremaFails ? ` — ${cremaFails}개 미달` : ` 모두 통과 (최저 ${cremaWorst.toFixed(2)}:1)`}`);
console.log(fails ? `\n${fails}/${checks} 미달` : `\n${checks}개 조합 모두 통과`);
process.exit(fails ? 1 : 0);
