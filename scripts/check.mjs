// blurssism 대비 검사 · © caffeinecat · MIT
// 모든 팔레트 × 라이트·다크에서 글자와 조작 요소의 대비가 WCAG 기준을 넘는지 확인합니다.
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
console.log(fails ? `\n${fails}/${checks} 미달` : `\n${checks}개 조합 모두 통과`);
process.exit(fails ? 1 : 0);
