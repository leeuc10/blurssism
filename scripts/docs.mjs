// blurssism 컴포넌트 문서의 Props 표 생성 · © caffeinecat · MIT
// dist/index.d.ts의 `export interface XProps`를 읽어 docs/components/X.md의 <!-- props --> 구간을 채웁니다. `node scripts/docs.mjs`(빌드 뒤).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import ts from "typescript";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const dts = read("dist/index.d.ts");
const sf = ts.createSourceFile("index.d.ts", dts, ts.ScriptTarget.Latest, true);
const ifaces = {};
for (const node of sf.statements) {
  if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) ifaces[node.name.text] = node;
  if (ts.isTypeAliasDeclaration(node) && /Props$/.test(node.name.text)) ifaces[node.name.text] = node;
}
const doc = (node) => (ts.getJSDocCommentsAndTags(node).map((j) => (typeof j.comment === "string" ? j.comment : ts.getTextOfJSDocComment(j.comment) || "")).filter(Boolean)[0] || "").replace(/\s+/g, " ").trim();
const ext = (node) => (node.heritageClauses || []).flatMap((h) => h.types.map((t) => t.getText(sf))).join(", ");
const typeText = (m) => (m.type ? m.type.getText(sf) : "").replace(/\s+/g, " ").replace(/\|/g, "\\|");
let written = 0;
for (const [name, node] of Object.entries(ifaces)) {
  const comp = name.replace(/Props$/, "");
  const mdPath = `docs/components/${comp}.md`;
  if (!existsSync(new URL(mdPath, root))) continue;
  const rows = [];
  const members = ts.isInterfaceDeclaration(node) ? node.members : [];
  for (const m of members) {
    if (!ts.isPropertySignature(m)) continue;
    const key = m.name.getText(sf).replace(/"/g, "");
    rows.push(`| \`${key}\` | \`${typeText(m)}\` | ${m.questionToken ? "" : "필수"} | ${doc(m)} |`);
  }
  if (ts.isTypeAliasDeclaration(node)) rows.push(`| | \`${node.type.getText(sf).replace(/\s+/g, " ").slice(0, 160)}…\` | | 자세한 형은 dist/index.d.ts |`);
  const base = ts.isInterfaceDeclaration(node) ? ext(node) : "";
  const table = `<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->\n## Props (React)\n\n` +
    (doc(node) ? doc(node) + "\n\n" : "") + (base ? `\`${base}\`의 속성을 모두 받습니다.\n\n` : "") +
    `| 이름 | 형 | | 설명 |\n| --- | --- | --- | --- |\n${rows.join("\n")}\n\nSvelte는 같은 이름에 소문자 이벤트(\`onchange\`·\`onclick\`)와 \`bind:\`를 씁니다.\n<!-- props:end -->`;
  let md = read(mdPath);
  md = /<!-- props:start/.test(md) ? md.replace(/<!-- props:start[\s\S]*?<!-- props:end -->/, table) : md.trimEnd() + "\n\n" + table + "\n";
  writeFileSync(new URL(mdPath, root), md);
  written++;
}
console.log(`docs: Props 표 ${written}개 갱신`);
