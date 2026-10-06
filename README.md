<p align="center">
  <img src="logos/blurssism-mark.svg" width="72" alt="blurssism">
</p>

<h1 align="center">blurssism</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@caffeinecatkr/blurssism"><img src="https://img.shields.io/npm/v/@caffeinecatkr/blurssism?color=7a4524&label=npm" alt="npm version"></a>
  <a href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/"><img src="https://img.shields.io/jsdelivr/npm/hm/@caffeinecatkr/blurssism?color=3d6650" alt="jsDelivr"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-21180f" alt="MIT license"></a>
</p>

<p align="center">
  글래스모피즘과 블러 효과를 조합한, 웹·앱 공용 디자인 시스템 — 카페인 팔레트와 함께<br>
  A web &amp; app design system that combines glassmorphism with blur — served with caffeine palettes<br>
  <a href="https://leeuc10.github.io/blurssism/">미리보기 Preview</a> ·
  <a href="docs/brand-book.md">브랜드북 Brand book</a> ·
  <a href="https://www.npmjs.com/package/@caffeinecatkr/blurssism">npm</a>
</p>

<p align="center"><a href="#한국어">한국어</a> · <a href="#english">English</a></p>

---

## 한국어

blurssism은 우유 거품 같은 크림색 바탕 위에 맑은 유리와 두꺼운 블러를 **필요한 곳에만** 띄우는 디자인 시스템입니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았고, 색은 카페인에서 가져왔으며, 한국어 화면을 기준으로 만들었습니다.

**원칙**
1. **90 / 10.** 화면의 90% 이상은 종이(`paper`)와 먹(`ink`). 강조색은 10% 이내.
2. **떠 있는 것만 유리로.** 내비게이션·탭바·시트·토스트만 유리. 카드·입력창·리스트는 불투명.
3. **화면당 행동 하나.** primary 버튼은 한 화면에 하나.
4. **사람의 문장은 명조로.** 인용과 큰 이름만 Gowun Batang, 나머지 UI는 Pretendard.
5. **캡슐과 큰 모서리.** 누르는 것은 캡슐, 담는 것은 24px 이상.

**들어 있는 것**
- 카페인 팔레트 6종(에스프레소·말차·차이·콜드브루·모카·클래식) × 라이트·다크. 324개 대비 조합 모두 WCAG 통과
- 반응형 규정: 5단계 브레이크포인트, 4·8·12열 그리드, 단계별 제목 크기, 컴포넌트 배치 규칙
- 컴포넌트 29개: **React**(ESM·CommonJS·`<script>`)와 **Svelte 5**, 또는 CSS 클래스(`bl-*`)만으로도
- Next.js App Router·SvelteKit 서버 렌더링 안전, TypeScript 타입, Tailwind 프리셋
- 블러 성능 예산과 저사양 기기 자동 대응, 포커스 링·다이얼로그 포커스 가두기·동작 줄이기 대응

### 설치

```bash
npm install @caffeinecatkr/blurssism
```

모든 페이지에 뷰포트 메타 태그가 있어야 반응형이 작동합니다: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### React (Vite, Next.js …)

```jsx
import { Button, PalettePicker, Container, Grid, Card } from "@caffeinecatkr/blurssism";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";

export default function App() {
  return (
    <Container className="bl-root">
      <PalettePicker />
      <Grid columns={{ xs: 1, md: 2, lg: 3 }}>
        <Card title="오늘의 원두" body="에티오피아 예가체프" />
      </Grid>
      <Button variant="accent" icon="plus">새로 만들기</Button>
    </Container>
  );
}
```

Next.js App Router에서는 CSS 두 줄을 `app/layout.jsx`에서 불러오고, 컴포넌트는 서버 컴포넌트에서도 바로 import합니다. → [`examples/nextjs`](examples/nextjs) · [`examples/vite-react`](examples/vite-react)

### Svelte 5 (SvelteKit, Vite)

```svelte
<script>
  import { Button, PalettePicker, TextField, Dialog, breakpoint } from "@caffeinecatkr/blurssism/svelte";
  import "@caffeinecatkr/blurssism/tokens.css";
  import "@caffeinecatkr/blurssism/bundle.css";
  let email = $state("");
  let open = $state(false);
  const bp = breakpoint();
</script>

<PalettePicker />
<TextField label="이메일" bind:value={email} />
<Button onclick={() => (open = true)}>열기</Button>
<Dialog bind:open title="저장할까요?">
  <Button variant="ghost" size="md" onclick={() => (open = false)}>취소</Button>
</Dialog>
{#if bp.current === "xs"}<p>폰 화면이에요</p>{/if}
```

입력 요소는 `bind:value`·`bind:checked`·`bind:open`을 지원하고, 슬롯 대신 스니펫(`{#snippet actions()}…{/snippet}`)을 씁니다. Svelte 5.20 이상이 필요합니다. → [`examples/sveltekit`](examples/sveltekit)

### HTML · Vue (CSS만)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.css">

<body class="bl-root">
  <div class="bl-container">
    <header class="bl-navbar bl-glass"><p class="bl-navbar-title">설정</p></header>
    <div class="bl-grid"><div class="bl-span-4 bl-span-lg-8">본문</div><div class="bl-span-4">옆</div></div>
    <button class="bl-btn bl-btn-primary">저장하기</button>
  </div>
</body>
```

### 팔레트 · 다크 모드

```html
<html data-palette="matcha" data-theme="dark">
```

| `data-palette` | 이름 | 느낌 |
| --- | --- | --- |
| `espresso` | 에스프레소 (기본) | 볶은 원두의 갈색과 크레마 |
| `matcha` | 말차 | 녹차의 차분한 초록 |
| `chai` | 차이 | 향신료 밀크티의 주황 |
| `coldbrew` | 콜드브루 | 차갑게 우린 커피의 깊은 남색 |
| `mocha` | 모카 | 초콜릿과 장미빛 코코아 |
| `classic` | 클래식 | 1.2까지의 자두색 |

코드로는 `setPalette("chai")`, `setTheme("dark" | "light" | "system")`. 테마를 지정하지 않으면 시스템 설정을 따릅니다. 사용자의 선택을 저장하는 것은 앱 몫입니다.

### 반응형

| 단계 | 너비 | 그리드 | 거터 · 여백 |
| --- | --- | --- | --- |
| `xs` | 0–599 | 4열 | 16 · 16 |
| `sm` | 600–767 | 8열 | 16 · 24 |
| `md` | 768–1119 | 8열 | 24 · 32 |
| `lg` | 1120–1439 | 12열 | 24 · 40 |
| `xl` | 1440+ | 12열 | 32 · 48 |

- `Container`/`.bl-container`로 폭을 맞추고, `Grid columns={{ xs: 1, md: 2, lg: 3 }}` 또는 `.bl-grid` + `.bl-span-md-6`으로 배치합니다.
- md 미만: 하단 `TabBar`, `Dialog`는 아래 시트 모양, 제목이 자동으로 작아짐. lg 이상: `NavBar` 링크, `TabBar` 숨김.
- 코드에서는 React `useBreakpoint()`, Svelte `breakpoint()`, 공통 `getBreakpoint()`·`isAtLeast("md")`.
- 터치 기기에서는 조작 요소가 자동으로 44px 이상, 호버 효과는 마우스 기기에서만.

전체 규칙은 [브랜드북의 반응형 절](docs/brand-book.md#반응형)에 있습니다.

### Tailwind

```js
// tailwind.config.js — tokens.css도 함께 불러오세요
module.exports = { presets: [require("@caffeinecatkr/blurssism/tailwind")] };
```

`bg-paper`, `text-accent`, `rounded-full`, `backdrop-blur-md`, 그리고 같은 브레이크포인트(`sm:` `md:` `lg:` `xl:`)를 씁니다.

### 블러 예산

한 화면에 블러 유리는 3개까지, 반복 목록 안에서는 `.bl-glass-lite`(MediaCard는 `lite`), 블러 반경은 애니메이션하지 않습니다. `applyGlassPreference()`를 부르면 저사양 기기·데이터 절약·투명도 줄이기 설정에서 유리를 끕니다.

---

## English

blurssism floats clear glass and thick blur **only where they're needed**, over a calm milk-foam cream background. The glass is inspired by Apple Liquid Glass and Samsung One UI, the colors come from caffeine, and the system is designed with Korean typography as the default.

**Principles**
1. **90 / 10.** At least 90% of a screen is paper (`paper`) and ink (`ink`). Accent colors stay under 10%.
2. **Only floating things are glass.** Navigation bars, tab bars, sheets and toasts are glass. Cards, inputs and lists stay opaque.
3. **One action per screen.** Only one primary button per screen.
4. **Human words in serif.** Quotes and large names use Gowun Batang; the rest of the UI uses Pretendard.
5. **Capsules and large corners.** Anything you press is a capsule; anything that contains is 24px+.

**What's inside**
- 6 caffeine palettes (espresso, matcha, chai, cold brew, mocha, classic) × light and dark. All 324 contrast pairs pass WCAG.
- A responsive system: 5 breakpoints, a 4/8/12-column grid, per-breakpoint heading sizes, and component layout rules.
- 29 components for **React** (ESM, CommonJS, `<script>`) and **Svelte 5**, or use the CSS classes (`bl-*`) alone.
- Safe for server rendering in the Next.js App Router and SvelteKit. Ships TypeScript types and a Tailwind preset.
- A blur performance budget with automatic fallback on low-end devices, visible focus rings, focus-trapped dialogs, and reduced-motion support.

### Install

```bash
npm install @caffeinecatkr/blurssism
```

Responsive behavior requires a viewport meta tag on every page: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### React

```jsx
import { Button, PalettePicker, Container, Grid, Card } from "@caffeinecatkr/blurssism";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";
```

In the Next.js App Router, import the CSS in `app/layout.jsx`. Components can be imported straight from server components. See [`examples/nextjs`](examples/nextjs) and [`examples/vite-react`](examples/vite-react).

### Svelte 5

```svelte
<script>
  import { Button, PalettePicker, TextField, breakpoint } from "@caffeinecatkr/blurssism/svelte";
  import "@caffeinecatkr/blurssism/tokens.css";
  import "@caffeinecatkr/blurssism/bundle.css";
  let email = $state("");
  const bp = breakpoint();
</script>

<PalettePicker />
<TextField label="Email" bind:value={email} />
```

Inputs support `bind:value`, `bind:checked` and `bind:open`. Use snippets (`{#snippet actions()}…{/snippet}`) instead of slots. Requires Svelte 5.20+. See [`examples/sveltekit`](examples/sveltekit).

### Palettes and dark mode

Set `<html data-palette="matcha" data-theme="dark">`, or call `setPalette("chai")` / `setTheme("dark" | "light" | "system")`. Without a theme, the system setting is followed. Persisting the user's choice is up to your app.

### Responsive

| Step | Width | Grid | Gutter · margin |
| --- | --- | --- | --- |
| `xs` | 0–599 | 4 col | 16 · 16 |
| `sm` | 600–767 | 8 col | 16 · 24 |
| `md` | 768–1119 | 8 col | 24 · 32 |
| `lg` | 1120–1439 | 12 col | 24 · 40 |
| `xl` | 1440+ | 12 col | 32 · 48 |

- Use `Container` / `.bl-container` for width, and `Grid columns={{ xs: 1, md: 2, lg: 3 }}` or `.bl-grid` with `.bl-span-md-6` for layout.
- Below md, use a bottom `TabBar`. `Dialog` turns into a bottom sheet there, and headings shrink automatically. From lg up, use `NavBar` links and hide the `TabBar`.
- In code, use `useBreakpoint()` (React), `breakpoint()` (Svelte), or `getBreakpoint()` / `isAtLeast("md")`.
- Touch devices get 44px+ targets automatically. Hover effects only apply on devices with a mouse.

### Tailwind

```js
module.exports = { presets: [require("@caffeinecatkr/blurssism/tailwind")] };
```

Also load `tokens.css`. The `sm:` / `md:` / `lg:` / `xl:` breakpoints match blurssism.

### Blur budget

At most 3 blurred glass surfaces per screen, `.bl-glass-lite` inside repeated lists, and never animate the blur radius. `applyGlassPreference()` turns glass off on low-end devices, in data-saver mode, and when the user prefers reduced transparency.

The full rules are in the [brand book](docs/brand-book.md) (Korean).

---

## 라이선스 · License

- 코드, 토큰, 문서 / Code, tokens, docs: [MIT](LICENSE) © caffeinecat
- 로고와 표식 / Logos and marks (`logos/`): 권리 보유 / all rights reserved — [logos/LICENSE.md](logos/LICENSE.md)
- 글꼴은 포함하지 않습니다 / Fonts are not bundled. Pretendard and Gowun Batang (both SIL OFL) load from a CDN.

## 기여 · Contributing

원본은 `src/`에 있습니다: 토큰 `src/tokens.json`, 스타일 `src/bundle.css`, React `src/core.js`, Svelte `src/svelte/`, 공통 함수 `src/utils.js`.
`npm install` 후 `npm run build`로 `dist/`와 `svelte/`를 만들고, `npm run check`로 대비와 Svelte 타입을 검사합니다.
Sources live in `src/`. After `npm install`, run `npm run build` to generate `dist/` and `svelte/`, and `npm run check` to verify contrast and Svelte types.

<p align="center"><img src="logos/caffeinecat-mark.svg" width="28" alt=""><br><sub>made by caffeinecat</sub></p>
