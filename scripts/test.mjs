// blurssism 컴포넌트 동작·접근성 테스트 · © caffeinecat · MIT
// jsdom 위에서 React 컴포넌트를 실제로 그려 키보드·클릭·상태를 확인하고, axe-core로 접근성 위반을 검사합니다.
// `node --test scripts/test.mjs` (빌드 뒤. devDependencies의 react·react-dom·jsdom·axe-core 필요)
// 주의: assert에 DOM 노드를 직접 넘기지 마세요. 실패 메시지를 만들 때 jsdom 객체 그래프 전체를 직렬화해 메모리가 폭주합니다. `=== null` 같은 불리언으로 비교합니다.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true, url: "http://localhost/" });
for (const k of ["window", "document", "HTMLElement", "Element", "Node", "MutationObserver", "getComputedStyle", "KeyboardEvent", "MouseEvent", "Event", "CustomEvent"]) globalThis[k] = dom.window[k];
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 0);
globalThis.cancelAnimationFrame = clearTimeout;

const React = (await import("react")).default;
const { act } = await import("react");
const { createRoot } = await import("react-dom/client");
const B = await import("../dist/index.mjs");
const axe = (await import("axe-core")).default;
const h = React.createElement;

function mount(el) {
  const host = document.createElement("div"); host.className = "bl-root"; document.body.appendChild(host);
  const root = createRoot(host);
  act(() => root.render(el));
  return { host, root, rerender: (next) => act(() => root.render(next)), unmount: () => { act(() => root.unmount()); host.remove(); } };
}
const click = (el) => act(() => { el.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true, cancelable: true })); });
const key = (el, k) => act(() => { el.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true })); });
const wait = (ms) => act(() => new Promise((r) => setTimeout(r, ms)));

test("Switch: 비제어면 누를 때마다 스스로 바뀌고 onChange를 부른다", () => {
  const seen = [];
  const m = mount(h(B.Switch, { label: "알림", defaultChecked: false, onChange: (v) => seen.push(v) }));
  const sw = m.host.querySelector('[role="switch"]');
  assert.equal(sw.getAttribute("aria-checked"), "false");
  click(sw);
  assert.equal(sw.getAttribute("aria-checked"), "true");
  assert.deepEqual(seen, [true]);
  m.unmount();
});

test("Switch: 제어면 부모가 바꾸기 전까지 그대로", () => {
  const m = mount(h(B.Switch, { label: "알림", checked: false }));
  const sw = m.host.querySelector('[role="switch"]');
  click(sw);
  assert.equal(sw.getAttribute("aria-checked"), "false");
  m.rerender(h(B.Switch, { label: "알림", checked: true }));
  assert.equal(sw.getAttribute("aria-checked"), "true");
  m.unmount();
});

test("SegmentedControl: 방향키로 고르고 포커스가 따라간다", () => {
  const items = [{ id: "a", label: "목록" }, { id: "b", label: "격자" }, { id: "c", label: "지도" }];
  const m = mount(h(B.SegmentedControl, { label: "보기", items }));
  const group = m.host.querySelector('[role="radiogroup"]');
  const radios = [...m.host.querySelectorAll('[role="radio"]')];
  assert.equal(radios[0].getAttribute("aria-checked"), "true");
  radios[0].focus();
  key(group, "ArrowRight");
  assert.equal(radios[1].getAttribute("aria-checked"), "true");
  assert.equal(document.activeElement === radios[1], true);
  key(group, "End");
  assert.equal(radios[2].getAttribute("aria-checked"), "true");
  key(group, "ArrowRight");
  assert.equal(radios[0].getAttribute("aria-checked"), "true", "끝에서 처음으로 돈다");
  m.unmount();
});

test("TextField: ref가 input에 닿고, 오류 접두어가 로케일을 따른다", () => {
  const ref = React.createRef();
  const m = mount(h(B.TextField, { ref, label: "이메일", error: "형식이 달라요" }));
  assert.equal(ref.current.tagName, "INPUT");
  assert.equal(ref.current.getAttribute("aria-invalid"), "true");
  assert.match(m.host.textContent, /오류: 형식이 달라요/);
  act(() => B.setLocale("en"));
  assert.match(m.host.textContent, /Error: 형식이 달라요/);
  act(() => B.setLocale("ko"));
  m.unmount();
});

test("Chip: 비제어 토글, Checkbox·Select ref", () => {
  const cb = React.createRef(), sel = React.createRef();
  const m = mount(h("div", null, h(B.Chip, { defaultSelected: false }, "말차"), h(B.Checkbox, { ref: cb, label: "동의" }), h(B.Select, { ref: sel, label: "원두", options: ["a", "b"] })));
  const chip = m.host.querySelector(".bl-chip");
  click(chip);
  assert.equal(chip.getAttribute("aria-pressed"), "true");
  assert.equal(cb.current.type, "checkbox");
  assert.equal(sel.current.tagName, "SELECT");
  m.unmount();
});

test("Dialog: 열리면 포커스가 안으로, Esc로 onClose, 닫힐 때 애니메이션 뒤 사라진다", async () => {
  let closed = 0;
  const btn = document.createElement("button"); document.body.appendChild(btn); btn.focus();
  const el = (open) => h(B.Dialog, { open, title: "저장할까요?", onClose: () => closed++ }, h(B.Button, { variant: "ghost" }, "취소"));
  const m = mount(el(true));
  const d = m.host.querySelector("dialog");
  assert.ok(d, "dialog가 있다");
  assert.equal(document.activeElement.textContent, "취소", "첫 조작 요소로 포커스");
  act(() => { d.dispatchEvent(new dom.window.Event("cancel", { cancelable: true })); });
  assert.equal(closed, 1);
  m.rerender(el(false));
  assert.equal(d.getAttribute("data-closing"), "true", "닫힘 애니메이션 중");
  act(() => { d.dispatchEvent(new dom.window.Event("animationend", { bubbles: true })); });
  assert.equal(m.host.querySelector("dialog") === null, true, "애니메이션 끝 뒤 사라짐");
  assert.equal(document.activeElement === btn, true, "원래 자리로 포커스");
  m.unmount(); btn.remove();
});

test("Sheet: open이 없으면 자리에 그려지고, open이 있으면 dialog", () => {
  const m = mount(h(B.Sheet, { title: "공유" }));
  assert.equal(m.host.querySelector('[role="dialog"]').tagName, "DIV");
  m.rerender(h(B.Sheet, { title: "공유", open: true, onClose: () => {} }));
  assert.equal(m.host.querySelector("dialog.bl-sheet-modal") !== null, true);
  m.unmount();
});

test("ToastProvider + useToast: 띄우고, 닫고, 시간이 지나면 사라진다", async () => {
  let api;
  function App() { api = B.useToast(); return null; }
  const m = mount(h(B.ToastProvider, { duration: 50 }, h(App)));
  act(() => { api.show({ message: "저장했어요", tone: "positive" }); });
  assert.equal(m.host.querySelector('.bl-toaster [role="status"]').textContent.includes("저장했어요"), true);
  await wait(300);
  assert.equal(m.host.querySelector(".bl-toaster-item") === null, true, "자동으로 사라짐");
  act(() => { api.show({ message: "오류가 났어요", tone: "danger", duration: 0 }); });
  assert.equal(m.host.querySelector('.bl-toaster [role="alert"]') !== null, true);
  click(m.host.querySelector(".bl-toast-close"));
  await wait(250);
  assert.equal(m.host.querySelector(".bl-toaster-item") === null, true, "닫기 버튼으로 사라짐");
  m.unmount();
});

test("useToast: Provider 밖에서는 안내와 함께 던진다", () => {
  function Bad() { B.useToast(); return null; }
  assert.throws(() => mount(h(Bad)), /ToastProvider/);
});

test("TabBar·RadioGroup: 비제어", () => {
  const m = mount(h("div", null,
    h(B.TabBar, { items: [{ id: "home", label: "홈", icon: "home" }, { id: "me", label: "내 정보", icon: "person" }], defaultValue: "home" }),
    h(B.RadioGroup, { options: ["a", "b"], defaultValue: "a" })));
  const tabs = [...m.host.querySelectorAll(".bl-tab")];
  click(tabs[1]);
  assert.equal(tabs[1].getAttribute("aria-current"), "page");
  const radios = [...m.host.querySelectorAll('input[type="radio"]')];
  act(() => { radios[1].click(); });
  assert.equal(radios[1].checked, true);
  m.unmount();
});

test("Tabs: 방향키가 선택과 포커스를 옮기고 패널이 바뀐다", () => {
  const items = [{ id: "a", label: "목록", panel: "A" }, { id: "b", label: "격자", panel: "B" }, { id: "c", label: "지도", panel: "C", disabled: true }];
  const m = mount(h(B.Tabs, { items }));
  const tabs = [...m.host.querySelectorAll('[role="tab"]')];
  tabs[0].focus();
  key(m.host.querySelector('[role="tablist"]'), "ArrowRight");
  assert.equal(tabs[1].getAttribute("aria-selected"), "true");
  assert.equal(m.host.querySelector('[role="tabpanel"]').textContent, "B");
  key(m.host.querySelector('[role="tablist"]'), "ArrowRight");
  assert.equal(tabs[0].getAttribute("aria-selected"), "true", "비활성 탭을 건너뛰고 처음으로");
  m.unmount();
});

test("Pagination: 끝에서 이전·다음이 비활성, 누르면 onChange", () => {
  const seen = [];
  const m = mount(h(B.Pagination, { count: 5, defaultPage: 1, onChange: (p) => seen.push(p) }));
  const prev = m.host.querySelectorAll(".bl-icon-btn")[0];
  assert.equal(prev.disabled, true);
  const pages = [...m.host.querySelectorAll(".bl-page")];
  click(pages[2]);
  assert.deepEqual(seen, [3]);
  assert.equal(m.host.querySelector('.bl-page[aria-current="page"]').textContent, "3");
  m.unmount();
});

test("Accordion: 하나만 열리고, 다른 항목을 열면 이전 항목이 닫힌다", () => {
  const m = mount(h(B.Accordion, { items: [{ id: "a", title: "배송", content: "x" }, { id: "b", title: "환불", content: "y" }], defaultValue: "a" }));
  const d = [...m.host.querySelectorAll("details")];
  assert.equal(d[0].hasAttribute("open"), true);
  act(() => { d[1].open = true; d[1].dispatchEvent(new dom.window.Event("toggle")); });
  assert.equal(d[1].hasAttribute("open"), true);
  assert.equal(d[0].hasAttribute("open"), false);
  m.unmount();
});

test("Menu: 열면 menuitem에 포커스, Enter로 onSelect 뒤 닫힌다", () => {
  const seen = [];
  const m = mount(h(B.Menu, { trigger: h("button", null, "더 보기"), items: [{ id: "edit", label: "수정" }, { id: "del", label: "삭제", danger: true }], onSelect: (id) => seen.push(id) }));
  click(m.host.querySelector("button"));
  const menu = m.host.querySelector('[role="menu"]');
  assert.equal(m.host.querySelector("button").getAttribute("aria-expanded"), "true");
  const item = m.host.querySelectorAll('[role="menuitem"]')[1];
  item.focus();
  act(() => { item.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })); });
  assert.deepEqual(seen, ["del"]);
  assert.equal(m.host.querySelector("button").getAttribute("aria-expanded"), "false", "고르면 닫힘");
  m.unmount();
});

test("axe: 대표 화면에 접근성 위반이 없다", async () => {
  const items = [{ id: "home", label: "홈", icon: "home" }, { id: "me", label: "내 정보", icon: "person" }];
  const m = mount(h("div", null,
    h(B.NavBar, { title: "설정", onBack: () => {}, links: [{ href: "/", label: "홈", current: true }] }),
    h("main", null,
      h(B.TextField, { label: "이메일", help: "회사 메일" }),
      h(B.Select, { label: "원두", options: ["a", "b"], placeholder: "골라 주세요" }),
      h(B.Checkbox, { label: "동의" }),
      h(B.RadioGroup, { legend: "크기", options: ["작게", "크게"], defaultValue: "작게" }),
      h(B.Switch, { label: "알림", defaultChecked: true }),
      h(B.SegmentedControl, { label: "보기", items: [{ id: "a", label: "목록" }, { id: "b", label: "격자" }] }),
      h(B.Chip, null, "말차"),
      h(B.Badge, { tone: "positive" }, "완료"),
      h(B.Progress, { value: 30, label: "진행" }),
      h(B.Card, { title: "원두", body: "예가체프" }, h(B.Button, { variant: "ghost", size: "md" }, "더 보기")),
      h("ul", { className: "bl-list" }, h("li", null, h(B.ListItem, { title: "설정", href: "/s" }))),
      h(B.Table, { caption: "원두", columns: [{ key: "n", label: "이름" }], rows: [{ id: 1, n: "a" }] }),
      h(B.Calendar, { value: new Date(2026, 0, 15) }),
      h(B.EmptyState, { title: "비어 있어요" }),
      h(B.IconButton, { icon: "bell", label: "알림" }),
      h(B.Avatar, { name: "커피" }),
      h(B.Textarea, { label: "메모" }),
      h(B.Alert, { tone: "info", title: "안내" }, "본문"),
      h(B.Link, { href: "/a", external: true }, "문서"),
      h(B.Pagination, { count: 7, defaultPage: 2 }),
      h(B.Tabs, { items: [{ id: "a", label: "목록", panel: "A" }, { id: "b", label: "격자", panel: "B" }] }),
      h(B.Accordion, { items: [{ id: "a", title: "배송", content: "x" }] }),
      h(B.Menu, { trigger: h("button", { type: "button" }, "더 보기"), items: [{ id: "a", label: "수정" }] }),
      h(B.Button, null, "저장하기")),
    h(B.TabBar, { items, defaultValue: "home" })));
  const r = await axe.run(m.host, { rules: { "color-contrast": { enabled: false }, region: { enabled: false } } });
  const msgs = r.violations.map((v) => `${v.id}: ${v.help} — ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
  assert.deepEqual(msgs, [], msgs.join("\n"));
  m.unmount();
});
