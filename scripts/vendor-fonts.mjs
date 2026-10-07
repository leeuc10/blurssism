// blurssism 글꼴 가져오기 · © caffeinecat · MIT
// fonts.local.css가 쓰는 글꼴 파일을 npm에서 받아 dist/fonts/에 둡니다. 글꼴 버전을 올릴 때만 실행합니다.
//   node scripts/vendor-fonts.mjs
// Pretendard(가변, 화면에 나온 글자만 나눠 받는 92조각)와 Gowun Batang 400·700(조각)의 woff2, 그리고 각 SIL OFL 라이선스.
// @font-face 규칙은 src/fonts/*.css에 쓰고, build.mjs가 dist/fonts.local.css로 합칩니다.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PRETENDARD = "pretendard@1.3.9", GOWUN = "@fontsource/gowun-batang@5.3.0";
const root = new URL("..", import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), "bl-fonts-"));
function unpack(spec) {
  const file = execFileSync("npm", ["pack", spec, "--silent"], { cwd: tmp, encoding: "utf8" }).trim().split("\n").pop();
  const dir = join(tmp, file.replace(/\.tgz$/, ""));
  mkdirSync(dir);
  execFileSync("tar", ["xzf", join(tmp, file), "-C", dir]);
  return join(dir, "package");
}
const out = (p) => join(root, p);
for (const d of ["dist/fonts/pretendard", "dist/fonts/gowun-batang"]) { rmSync(out(d), { recursive: true, force: true }); mkdirSync(out(d), { recursive: true }); }
mkdirSync(out("src/fonts"), { recursive: true });

// Pretendard: 가변 글꼴 dynamic subset
const p = unpack(PRETENDARD), pv = join(p, "dist/web/variable");
for (const f of readdirSync(join(pv, "woff2-dynamic-subset"))) copyFileSync(join(pv, "woff2-dynamic-subset", f), out(`dist/fonts/pretendard/${f}`));
copyFileSync(join(p, "dist/LICENSE.txt"), out("dist/fonts/pretendard/LICENSE.txt"));
writeFileSync(out("src/fonts/pretendard.css"), `/* ${PRETENDARD} — dist/web/variable/pretendardvariable-dynamic-subset.css */\n` +
  readFileSync(join(pv, "pretendardvariable-dynamic-subset.css"), "utf8").replaceAll("./woff2-dynamic-subset/", "./fonts/pretendard/"));

// Gowun Batang: blurssism이 쓰는 400·700만, woff2만
const g = unpack(GOWUN);
let gcss = "";
for (const w of ["400", "700"]) gcss += readFileSync(join(g, `${w}.css`), "utf8")
  .replace(/url\(\.\/files\/([\w-]+)\.woff2\) format\('woff2'\), url\(\.\/files\/[\w-]+\.woff\) format\('woff'\)/g, "url(./fonts/gowun-batang/$1.woff2) format('woff2')");
for (const f of readdirSync(join(g, "files"))) if (/-(400|700)-normal\.woff2$/.test(f)) copyFileSync(join(g, "files", f), out(`dist/fonts/gowun-batang/${f}`));
copyFileSync(join(g, "LICENSE"), out("dist/fonts/gowun-batang/LICENSE.txt"));
writeFileSync(out("src/fonts/gowun-batang.css"), `/* ${GOWUN} — 400.css, 700.css (woff2만) */\n` + gcss);

rmSync(tmp, { recursive: true, force: true });
const count = (d) => readdirSync(out(d)).filter((f) => f.endsWith(".woff2")).length;
console.log(`Pretendard ${count("dist/fonts/pretendard")}개, Gowun Batang ${count("dist/fonts/gowun-batang")}개 → dist/fonts/, 규칙 → src/fonts/`);
