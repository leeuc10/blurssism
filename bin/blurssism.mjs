#!/usr/bin/env node
// blurssism CLI · © caffeinecat · MIT
//   npx @caffeinecatkr/blurssism palette "#ff5a1f" [--id brand] [--name 브랜드] [--json]
// 브랜드색 하나로 라이트·다크 강조색 묶음을 만들어 CSS(또는 JSON)로 출력합니다.
import { createPalette, paletteToCss, contrastRatio } from "../dist/utils.mjs";

const [cmd, color, ...rest] = process.argv.slice(2);
const flag = (name) => { const i = rest.indexOf("--" + name); return i >= 0 ? rest[i + 1] : undefined; };

if (cmd !== "palette" || !color) {
  console.error('사용법: npx @caffeinecatkr/blurssism palette "#ff5a1f" [--id brand] [--name 브랜드] [--json]');
  process.exit(cmd ? 1 : 0);
}
try {
  const p = createPalette(color, { id: flag("id"), name: flag("name") });
  if (rest.includes("--json")) console.log(JSON.stringify(p, null, 2));
  else {
    console.log(`/* blurssism 브랜드 팔레트 "${p.id}" — ${p.source}에서 생성. <html data-palette="${p.id}"> */`);
    console.log(paletteToCss(p));
  }
  const L = p.values.light, D = p.values.dark;
  console.error(`라이트 강조 ${L.accent} (흰 글자 ${contrastRatio("#ffffff", L.accent).toFixed(1)}:1) · 다크 강조 ${D.accent} (글자 ${contrastRatio(D["on-accent"], D.accent).toFixed(1)}:1)`);
  for (const w of p.warnings) console.error("· " + w.message);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
