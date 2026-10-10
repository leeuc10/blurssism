"use client";
// 함수 props·훅·로케일 전환은 클라이언트 컴포넌트에서
import { useState } from "react";
import { Button, Sheet, Drawer, Menu, Textarea, SegmentedControl, ToastProvider, useToast, setLocale } from "@caffeinecatkr/blurssism";
function Controls() {
  const toast = useToast();
  const [sheet, setSheet] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [lang, setLang] = useState("ko");
  return (
    <section style={{ display: "grid", gap: "var(--space-4)", margin: "var(--space-8) 0" }}>
      <SegmentedControl label="문구 언어" items={[{ id: "ko", label: "한국어" }, { id: "en", label: "English" }]} value={lang} onChange={(id) => { setLang(id); setLocale(id); }} />
      <Textarea label="메모" autoResize maxRows={5} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        <Button variant="ghost" size="md" onClick={() => setSheet(true)}>시트</Button>
        <Button variant="ghost" size="md" onClick={() => setDrawer(true)}>드로어</Button>
        <Menu trigger={<Button variant="ghost" size="md">더 보기</Button>} onSelect={(id) => toast.show(`메뉴: ${id}`)} items={[{ id: "edit", label: "편집하기" }, "-", { id: "delete", label: "삭제하기", danger: true }]} />
        <Button variant="ghost" size="md" onClick={() => toast.show({ message: "저장했어요", tone: "positive" })}>토스트</Button>
      </div>
      <Sheet open={sheet} onClose={() => setSheet(false)} title="공유하기"><Button onClick={() => setSheet(false)}>닫기</Button></Sheet>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title="메뉴"><p className="bl-body">드로어 내용</p></Drawer>
    </section>
  );
}
export default function Interactive() { return <ToastProvider><Controls /></ToastProvider>; }
