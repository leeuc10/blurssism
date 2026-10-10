// blurssism 서버 렌더링 검사 · © caffeinecat · MIT
// React 컴포넌트 29개를 react-dom/server로 그려 봅니다. 하나라도 던지거나 기대한 마크업이 없으면 종료 코드 1.
// `node scripts/ssr.mjs` (devDependencies의 react·react-dom 필요)
import React from "react";
import { renderToString } from "react-dom/server";
import * as B from "../dist/index.mjs";
import * as U from "../dist/utils.mjs";

const h = React.createElement;
let fails = 0;
function expect(name, el, ...needles) {
  let html = "";
  try { html = renderToString(el); } catch (e) { fails++; console.log(`✗ ${name}: ${e.message}`); return; }
  for (const n of needles) if (!(n instanceof RegExp ? n.test(html) : html.includes(n))) { fails++; console.log(`✗ ${name}: ${n} 없음\n  ${html.slice(0, 300)}`); }
  if (fails === 0) console.log(`✓ ${name}`);
}

const items = [{ id: "home", label: "홈", icon: "home" }, { id: "me", label: "내 정보", icon: "person" }];
expect("Button", h(B.Button, null, "저장하기"), "bl-btn-primary");
expect("Button href", h(B.Button, { href: "/a", target: "_blank" }, "문서"), '<a', 'target="_blank"');
expect("IconButton", h(B.IconButton, { icon: "bell", label: "알림" }), 'aria-label="알림"');
expect("Chip 스스로", h(B.Chip, { defaultSelected: true }, "말차"), 'aria-pressed="true"');
expect("TextField", h(B.TextField, { label: "이메일", error: "형식이 달라요" }), "오류: 형식이 달라요");
expect("Select placeholder", h(B.Select, { label: "원두", options: ["a", "b"], placeholder: "골라 주세요" }), /<option value="" disabled="" selected="">골라 주세요/);
expect("Checkbox", h(B.Checkbox, { label: "동의" }), 'type="checkbox"');
expect("RadioGroup", h(B.RadioGroup, { options: ["a", "b"], value: "a" }), 'type="radio"');
expect("Switch", h(B.Switch, { checked: true, label: "알림" }), 'role="switch"');
expect("SegmentedControl 빈 값", h(B.SegmentedControl, { label: "보기", items: [{ id: "a", label: "목록" }, { id: "b", label: "격자" }], value: "" }), /aria-checked="false" tabindex="0"/);
expect("PalettePicker", h(B.PalettePicker, { value: "matcha" }), /aria-checked="true" tabindex="0"/);
expect("Badge", h(B.Badge, { tone: "positive" }, "완료"), "bl-badge-positive");
expect("Avatar", h(B.Avatar, { name: "커피" }), 'aria-label="커피"');
expect("Tooltip 기존 describedby", h(B.Tooltip, { label: "설정" }, h("button", { "aria-describedby": "mine" }, "설정")), /aria-describedby="mine [^"]+"/, 'popover="manual"');
expect("Progress", h(B.Progress, { value: 30, label: "진행" }), 'aria-valuenow="30"');
expect("Skeleton", h(B.Skeleton), "bl-skel");
expect("Card", h(B.Card, { title: "원두" }), "bl-card-title");
expect("MediaCard", h(B.MediaCard, { title: "예가체프", meta: "에티오피아" }), "bl-media-bar bl-crema");
expect("ListItem", h(B.ListItem, { title: "설정", href: "/s" }), "<a");
expect("Table caption 없음", h(B.Table, { columns: [{ key: "n", label: "이름", format: (r) => r.n + "!" }], rows: [{ n: "a" }] }), "a!", /^(?![\s\S]*role="region")/);
expect("Calendar min 같은 날", h(B.Calendar, { value: new Date(2026, 0, 15), min: new Date(2026, 0, 15, 9) }), /aria-pressed="true"[^>]*>15</);
expect("Calendar today 없음(서버)", h(B.Calendar, { value: new Date(2026, 0, 15) }), /^(?![\s\S]*data-today="true")/);
expect("EmptyState", h(B.EmptyState, { title: "비어 있어요" }), "bl-empty");
expect("Container", h(B.Container, null, "x"), "bl-container");
expect("Grid", h(B.Grid, { columns: { xs: 1, md: 2 } }, "x"), "--bl-cols-md:2");
expect("NavBar", h(B.NavBar, { title: "설정", links: [{ href: "/", label: "홈", current: true }] }), 'aria-current="page"');
expect("TabBar", h(B.TabBar, { items, value: "me" }), "<nav", "bl-hide-from-lg", 'aria-current="page"', /^(?![\s\S]*role="tab)/);
expect("TabBar hideFrom false", h(B.TabBar, { items, value: "me", hideFrom: false }), /^(?![\s\S]*bl-hide-from)/);
expect("Sheet", h(B.Sheet, { title: "공유" }), "bl-sheet");
expect("Dialog", h(B.Dialog, { open: true, title: "저장할까요?", description: "되돌릴 수 없어요." }), "<dialog", /aria-describedby="[^"]+-desc"/);
expect("Toast", h(B.Toast, { tone: "positive" }, "저장했어요"), 'role="status"');
expect("Icon", h(B.Icon, { name: "heart", filled: true }), 'fill="currentColor"');
// 2.1
expect("Textarea", h(B.Textarea, { label: "메모", error: "비어 있어요" }), "<textarea", "오류: 비어 있어요");
expect("Alert", h(B.Alert, { tone: "warning", title: "주의" }, "본문"), 'role="alert"', "bl-alert");
expect("Link external", h(B.Link, { href: "https://x.test", external: true }, "문서"), 'rel="noopener noreferrer"', "bl-sr-only");
expect("Pagination", h(B.Pagination, { count: 20, defaultPage: 5 }), '<nav', 'aria-current="page"', "…");
expect("Tabs", h(B.Tabs, { items: [{ id: "a", label: "목록", panel: "A" }, { id: "b", label: "격자", panel: "B" }] }), 'role="tablist"', 'aria-selected="true"', 'role="tabpanel"');
expect("Accordion", h(B.Accordion, { items: [{ id: "a", title: "배송", content: "x" }], defaultValue: "a" }), "<details", "<summary");
expect("Popover", h(B.Popover, { trigger: h("button", null, "열기"), label: "필터" }, "내용"), 'aria-expanded="false"', 'popover="auto"');
expect("Menu", h(B.Menu, { trigger: h("button", null, "더 보기"), items: [{ id: "a", label: "수정" }, "-", { id: "b", label: "삭제", danger: true }] }), 'role="menu"', 'role="menuitem"');
expect("Drawer", h(B.Drawer, { open: true, title: "메뉴", onClose: () => {} }, "x"), "<dialog", "bl-drawer");
expect("Toast tones", h(B.Toast, { tone: "info" }, "안내"), 'data-tone="info"');
expect("ToastProvider", h(B.ToastProvider, null, h("p", null, "앱")), "bl-toaster");
expect("Sheet open", h(B.Sheet, { title: "공유", open: true, onClose: () => {} }), "<dialog", "bl-sheet-modal");
expect("Badge info", h(B.Badge, { tone: "info" }, "안내"), "bl-badge-info");
expect("setLocale en", (B.setLocale("en"), h(B.TextField, { label: "Email", error: "Invalid" })), "Error: Invalid");
B.setLocale("ko");

// 모듈 하나: 메인 진입점과 /utils가 같은 상태를 씁니다
if (B.setPalette !== U.setPalette) { fails++; console.log("✗ index.mjs와 utils.mjs의 setPalette가 서로 다른 사본이에요"); }
// 팔레트 id 검사
try { U.paletteToCss({ id: 'x"] , body { display:none } [a="', values: { light: {}, dark: {} } }); fails++; console.log("✗ 잘못된 팔레트 id를 막지 못했어요"); } catch {}

console.log(fails ? `\n${fails}개 실패` : "\n서버 렌더링 모두 통과");
process.exit(fails ? 1 : 0);
