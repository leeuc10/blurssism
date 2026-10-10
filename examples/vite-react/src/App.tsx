import { useRef, useState } from "react";
import {
  Button, Dialog, Sheet, Drawer, TextField, Textarea, Select, Table, TabBar, Tabs, Accordion, Pagination, Alert, Link,
  Popover, Menu, MediaCard, IconButton, Card, Container, Grid, NavBar, PalettePicker, SegmentedControl,
  ToastProvider, useToast, applyCremaPreference, setLocale, useLocale, type ButtonProps,
} from "@caffeinecatkr/blurssism";
import "@caffeinecatkr/blurssism/fonts.css";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";

applyCremaPreference();

const primary: ButtonProps["variant"] = "primary";

function Page() {
  const toast = useToast();
  const L = useLocale();
  const [open, setOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("ko");
  const [alert, setAlert] = useState(true);
  const email = useRef<HTMLInputElement>(null);   // forwardRef: 포커스·폼 라이브러리 연결
  return (
    <Container>
      <div style={{ position: "sticky", top: "var(--space-3)", zIndex: 5, margin: "var(--space-3) 0 var(--space-8)" }}>
        <NavBar title="blurssism × Vite" onBack={() => setDrawer(true)} links={[{ href: "/", label: "홈", current: true }]}
          actions={<Button variant={primary} size="md" onClick={() => setOpen(true)}>시작하기</Button>} />
      </div>

      <h1 className="bl-display">오늘의 커피</h1>
      <p className="bl-body" style={{ color: "var(--ink-muted)" }}>
        문구 로케일: {L.id}. <Link href="https://github.com/leeuc10/blurssism" external>저장소</Link>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
        <PalettePicker />
        <SegmentedControl label="문구 언어" items={[{ id: "ko", label: "한국어" }, { id: "en", label: "English" }]} value={lang}
          onChange={(id) => { setLang(id); setLocale(id as "ko" | "en"); }} />
      </div>

      {alert && (
        <div style={{ marginTop: "var(--space-6)" }}>
          <Alert tone="info" title="새 원두가 들어왔어요" onDismiss={() => setAlert(false)}
            actions={<Button variant="ghost" size="md" onClick={() => toast.show({ message: "장바구니에 담았어요", tone: "positive", actionLabel: "보기" })}>담기</Button>}>
            에티오피아 예가체프를 이번 주에만 할인해요.
          </Alert>
        </div>
      )}

      <div style={{ marginTop: "var(--space-8)" }}>
        <Tabs label="원두 정보" items={[
          { id: "info", label: "소개", panel: (
            <Grid columns={{ xs: 1, sm: 2, lg: 3 }}>
              <Card eyebrow="원두" title="에티오피아 예가체프" body="꽃향과 레몬 같은 산미가 있어요." />
              <Card eyebrow="추출" title="핸드드립" body="물 92°C, 2분 30초." />
              <MediaCard title="라떼 아트" meta="사진 12장" ratio="4 / 3" lite action={<IconButton icon="heart" label="좋아요" />} />
            </Grid>) },
          { id: "brew", label: "추출", panel: (
            <Accordion defaultValue="ship" items={[
              { id: "ship", title: "배송은 언제 와요?", content: "볶은 다음 날 보내 드려요. 보통 2일 안에 도착해요." },
              { id: "grind", title: "분쇄해서 보내 주나요?", content: "주문할 때 분쇄도를 고르면 맞춰 보내 드려요." }]} />) },
          { id: "data", label: "표", panel: (
            <Table caption="원두" columns={[{ key: "n", label: "이름" }, { key: "h", label: "시간", numeric: true, render: (r: { n: string; h: number }) => r.h + "h" }]} rows={[{ id: 1, n: "예가체프", h: 1 }, { id: 2, n: "수프리모", h: 2 }]} />) },
        ]} />
      </div>

      <div style={{ marginTop: "var(--space-6)", display: "flex", justifyContent: "center" }}>
        <Pagination count={12} defaultPage={3} onChange={(p) => toast.show(`${p}페이지`)} />
      </div>

      <section style={{ maxWidth: "var(--prose-max)", margin: "var(--space-12) 0", display: "grid", gap: "var(--space-5)" }}>
        <TextField ref={email} label="이메일" type="email" help="새 원두 소식을 보내 드려요." />
        <Textarea label="메모" autoResize maxRows={6} help="추출 기록을 남겨 두세요." />
        <Select label="지역" options={["서울", { value: "busan", label: "부산" }]} placeholder="골라 주세요" />
        <Button variant="ghost" size="md" onClick={() => email.current?.focus()}>이메일로 포커스</Button>
      </section>

      <section style={{ margin: "0 0 var(--space-24)", display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        <Button variant="ghost" onClick={() => setSheet(true)}>시트 열기</Button>
        <Button variant="ghost" onClick={() => setDrawer(true)}>드로어 열기</Button>
        <Popover label="필터" trigger={<Button variant="ghost">필터</Button>}>
          <p className="bl-popover-title">정렬</p>
          <p className="bl-popover-body">새것부터 보여 줘요.</p>
        </Popover>
        <Menu trigger={<Button variant="ghost">더 보기</Button>} onSelect={(id) => toast.show({ message: `메뉴: ${id}`, tone: id === "delete" ? "danger" : "neutral" })}
          items={[{ id: "edit", label: "편집하기", icon: "settings" }, { id: "copy", label: "링크 복사", icon: "plus" }, "-", { id: "delete", label: "삭제하기", icon: "close", danger: true }]} />
        <Button variant="ghost" onClick={() => toast.show({ message: "저장했어요", tone: "positive" })}>토스트</Button>
      </section>

      <div style={{ position: "fixed", left: "var(--space-4)", right: "var(--space-4)", bottom: "var(--space-4)" }}>
        <TabBar value={tab} onChange={setTab} items={[{ id: "home", label: "홈", icon: "home" }, { id: "saved", label: "저장", icon: "heart" }, { id: "me", label: "내 정보", icon: "person" }]} />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title="구독할까요?" description="새 원두가 들어오면 알려 드려요.">
        <Button variant="ghost" size="md" onClick={() => setOpen(false)}>나중에</Button>
        <Button size="md" onClick={() => { setOpen(false); toast.show({ message: "구독했어요", tone: "positive" }); }}>구독하기</Button>
      </Dialog>
      <Sheet open={sheet} onClose={() => setSheet(false)} title="공유하기" description="링크를 복사하거나 메시지로 보내요.">
        <Button onClick={() => { setSheet(false); toast.show("링크를 복사했어요"); }}>링크 복사</Button>
        <Button variant="ghost" onClick={() => setSheet(false)}>닫기</Button>
      </Sheet>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title="메뉴">
        <ul className="bl-list"><li><a className="bl-item" href="/">홈</a></li><li><a className="bl-item" href="#form">폼</a></li></ul>
      </Drawer>
    </Container>
  );
}

export default function App() {
  return (
    <div className="bl-root">
      <ToastProvider><Page /></ToastProvider>
    </div>
  );
}
