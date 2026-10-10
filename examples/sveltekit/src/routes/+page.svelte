<script>
  import { Container, Grid, NavBar, Card, MediaCard, IconButton, Button, PalettePicker, TextField, Textarea, Switch,
    Dialog, Sheet, Drawer, TabBar, Tabs, Accordion, Pagination, Alert, Link, Popover, Menu, Toaster, toast,
    SegmentedControl, setLocale, locale, breakpoint } from "@caffeinecatkr/blurssism/svelte";
  let email = $state("");
  let memo = $state("");
  let notify = $state(true);
  let open = $state(false);        // Dialog
  let sheet = $state(false);       // Sheet 모달
  let drawer = $state(false);      // Drawer
  let tab = $state("home");        // TabBar
  let view = $state("info");       // Tabs
  let faq = $state("ship");        // Accordion
  let page = $state(3);            // Pagination
  let lang = $state("ko");
  let liked = $state(false);
  let showAlert = $state(true);
  const bp = breakpoint();
  function setLang(id) { lang = id; setLocale(id); }
  function onMenu(id) { toast.show({ message: `메뉴: ${id}`, tone: id === "delete" ? "danger" : "neutral" }); }
</script>

<Container>
  <div style="position: sticky; top: var(--space-3); z-index: 5; margin: var(--space-3) 0 var(--space-8)">
    <NavBar title="blurssism × SvelteKit" links={[{ href: "/", label: "홈", current: true }, { href: "#form", label: "폼" }, { href: "#overlay", label: "오버레이" }]}
      onback={() => (drawer = true)}>
      {#snippet actions()}<Button size="md" onclick={() => (open = true)}>시작하기</Button>{/snippet}
    </NavBar>
  </div>

  <h1 class="bl-display">오늘의 커피</h1>
  <p class="bl-body" style="color: var(--ink-muted)">
    지금 화면 단계: {bp.current ?? "…"} · 문구 로케일: {locale.current.id}.
    <Link href="https://github.com/leeuc10/blurssism" external>저장소</Link>
  </p>

  <div style="display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: center">
    <PalettePicker />
    <SegmentedControl label="문구 언어" items={[{ id: "ko", label: "한국어" }, { id: "en", label: "English" }]} value={lang} onchange={setLang} />
  </div>

  {#if showAlert}
    <div style="margin-top: var(--space-6)">
      <Alert tone="info" title="새 원두가 들어왔어요" ondismiss={() => (showAlert = false)}>
        에티오피아 예가체프를 이번 주에만 할인해요.
        {#snippet actions()}<Button variant="ghost" size="md" onclick={() => toast.show({ message: "장바구니에 담았어요", tone: "positive", actionLabel: "보기" })}>담기</Button>{/snippet}
      </Alert>
    </div>
  {/if}

  <div style="margin-top: var(--space-8)">
    <Tabs bind:value={view} label="원두 정보" items={[{ id: "info", label: "소개" }, { id: "brew", label: "추출" }, { id: "review", label: "후기", disabled: true }]}>
      {#snippet panel(id)}
        {#if id === "info"}
          <Grid columns={{ xs: 1, sm: 2, lg: 3 }}>
            <Card eyebrow="원두" title="에티오피아 예가체프" body="꽃향과 레몬 같은 산미가 있어요." />
            <Card eyebrow="추출" title="핸드드립" body="물 92°C, 2분 30초." />
            <MediaCard title="라떼 아트" meta="사진 12장" ratio="4 / 3" lite>
              {#snippet action()}<IconButton icon="heart" label="좋아요" pressed={liked} onclick={() => (liked = !liked)} />{/snippet}
            </MediaCard>
          </Grid>
        {:else}
          <Accordion bind:value={faq} items={[
            { id: "ship", title: "배송은 언제 와요?", content: "볶은 다음 날 보내 드려요. 보통 2일 안에 도착해요." },
            { id: "grind", title: "분쇄해서 보내 주나요?", content: "주문할 때 분쇄도를 고르면 맞춰 보내 드려요." },
            { id: "refund", title: "환불은 어떻게 해요?", content: "개봉하지 않은 원두는 7일 안에 환불돼요." }]} />
        {/if}
      {/snippet}
    </Tabs>
  </div>

  <div style="margin-top: var(--space-6); display: flex; justify-content: center">
    <Pagination count={12} bind:page />
  </div>

  <section id="form" style="max-width: var(--prose-max); margin: var(--space-12) 0; display: grid; gap: var(--space-5)">
    <TextField label="이메일" type="email" bind:value={email} help="새 원두 소식을 보내 드려요." />
    <Textarea label="메모" bind:value={memo} autoResize maxRows={6} help="추출 기록을 남겨 두세요." />
    <ul class="bl-list"><li><Switch label="알림 받기" bind:checked={notify} /></li></ul>
  </section>

  <section id="overlay" style="margin: 0 0 var(--space-24); display: flex; flex-wrap: wrap; gap: var(--space-2)">
    <Button variant="ghost" onclick={() => (sheet = true)}>시트 열기</Button>
    <Button variant="ghost" onclick={() => (drawer = true)}>드로어 열기</Button>
    <Popover label="필터">
      {#snippet trigger(props)}<Button variant="ghost" {...props}>필터</Button>{/snippet}
      <p class="bl-popover-title">정렬</p>
      <ul class="bl-list"><li><Switch label="새것부터" checked={true} /></li></ul>
    </Popover>
    <Menu items={[{ id: "edit", label: "편집하기", icon: "settings" }, { id: "copy", label: "링크 복사", icon: "plus" }, "-", { id: "delete", label: "삭제하기", icon: "close", danger: true }]} onselect={onMenu}>
      {#snippet trigger(props)}<Button variant="ghost" {...props}>더 보기</Button>{/snippet}
    </Menu>
    <Button variant="ghost" onclick={() => toast.show({ message: "저장했어요", tone: "positive" })}>토스트</Button>
  </section>
</Container>

<div style="position: fixed; left: var(--space-4); right: var(--space-4); bottom: var(--space-4)">
  <TabBar bind:value={tab} items={[{ id: "home", label: "홈", icon: "home" }, { id: "saved", label: "저장", icon: "heart" }, { id: "me", label: "내 정보", icon: "person" }]} />
</div>

<Dialog bind:open title="구독할까요?" description="새 원두가 들어오면 알려 드려요.">
  <Button variant="ghost" size="md" onclick={() => (open = false)}>나중에</Button>
  <Button size="md" onclick={() => { open = false; toast.show({ message: "구독했어요", tone: "positive" }); }}>구독하기</Button>
</Dialog>

<Sheet bind:open={sheet} title="공유하기" description="링크를 복사하거나 메시지로 보내요.">
  <Button onclick={() => { sheet = false; toast.show("링크를 복사했어요"); }}>링크 복사</Button>
  <Button variant="ghost" onclick={() => (sheet = false)}>닫기</Button>
</Sheet>

<Drawer bind:open={drawer} title="메뉴" side="left">
  <ul class="bl-list">
    <li><a class="bl-item" href="/">홈</a></li>
    <li><a class="bl-item" href="#form">폼</a></li>
    <li><a class="bl-item" href="#overlay">오버레이</a></li>
  </ul>
</Drawer>

<Toaster />
