<script>
  import { Container, Grid, NavBar, Card, MediaCard, IconButton, Button, PalettePicker, TextField, Switch,
    Dialog, TabBar, breakpoint } from "@caffeinecatkr/blurssism/svelte";
  let email = $state("");
  let notify = $state(true);
  let open = $state(false);
  let tab = $state("home");
  let liked = $state(false);
  const bp = breakpoint();
</script>

<Container>
  <div style="position: sticky; top: var(--space-3); z-index: 5; margin: var(--space-3) 0 var(--space-8)">
    <NavBar title="blurssism × SvelteKit" links={[{ href: "/", label: "홈", current: true }, { href: "#form", label: "폼" }]}>
      {#snippet actions()}<Button size="md" onclick={() => (open = true)}>시작하기</Button>{/snippet}
    </NavBar>
  </div>

  <h1 class="display">오늘의 커피</h1>
  <p class="body" style="color: var(--ink-muted)">지금 화면 단계: {bp.current ?? "…"}</p>

  <PalettePicker />

  <div style="margin-top: var(--space-8)">
    <Grid columns={{ xs: 1, sm: 2, lg: 3 }}>
      <Card eyebrow="원두" title="에티오피아 예가체프" body="꽃향과 레몬 같은 산미가 있어요." />
      <Card eyebrow="추출" title="핸드드립" body="물 92°C, 2분 30초." />
      <MediaCard title="라떼 아트" meta="사진 12장" ratio="4 / 3" lite>
        {#snippet action()}<IconButton icon="heart" label="좋아요" pressed={liked} onclick={() => (liked = !liked)} />{/snippet}
      </MediaCard>
    </Grid>
  </div>

  <section id="form" style="max-width: var(--prose-max); margin: var(--space-12) 0 var(--space-24); display: grid; gap: var(--space-5)">
    <TextField label="이메일" type="email" bind:value={email} help="새 원두 소식을 보내 드려요." />
    <ul class="bl-list"><li><Switch label="알림 받기" bind:checked={notify} /></li></ul>
  </section>
</Container>

<div style="position: fixed; left: var(--space-4); right: var(--space-4); bottom: var(--space-4)">
  <TabBar bind:value={tab} items={[{ id: "home", label: "홈", icon: "home" }, { id: "saved", label: "저장", icon: "heart" }, { id: "me", label: "내 정보", icon: "person" }]} />
</div>

<Dialog bind:open title="구독할까요?" description="새 원두가 들어오면 알려 드려요.">
  <Button variant="ghost" size="md" onclick={() => (open = false)}>나중에</Button>
  <Button variant="accent" size="md" onclick={() => (open = false)}>구독하기</Button>
</Dialog>
