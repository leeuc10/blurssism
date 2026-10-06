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
  글래스모피즘과 블러 효과를 조합한, 웹·앱 공용 디자인 시스템 — 블러레마 유리와 카페인 팔레트<br>
  A web &amp; app design system that combines glassmorphism with blur — Blurema glass and caffeine palettes<br>
  <a href="https://leeuc10.github.io/blurssism/">미리보기 Preview</a> ·
  <a href="docs/brand-book.md">브랜드북 Brand book</a> ·
  <a href="https://www.npmjs.com/package/@caffeinecatkr/blurssism">npm</a>
</p>

<p align="center"><a href="#한국어">한국어</a> · <a href="#english">English</a></p>

---

## 한국어

blurssism은 우유 거품 같은 크림색 바탕 위에 젖빛 유리 **블러레마(Blurema)**를 **필요한 곳에만** 띄우는 디자인 시스템입니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았고, 색은 카페인에서 가져왔으며, 한국어 화면을 기준으로 만들었습니다.

**원칙**
1. **90 / 10.** 화면의 90% 이상은 종이(`paper`)와 먹(`ink`). 강조색은 10% 이내.
2. **떠 있는 것만 유리로.** 내비게이션·탭바·시트·토스트만 유리. 카드·입력창·리스트는 불투명.
3. **화면당 행동 하나.** primary 버튼은 한 화면에 하나.
4. **사람의 문장은 명조로.** 인용과 큰 이름만 Gowun Batang, 나머지 UI는 Pretendard.
5. **캡슐과 큰 모서리.** 누르는 것은 캡슐, 담는 것은 24px 이상.

**들어 있는 것**
- **블러레마 유리**: 블러 위에 우유 거품 색, 거품 결, 팔레트를 따라가는 크레마를 겹친 젖빛 유리
- **유리 모드 3단계**: 저사양 `off` · 기본 `on` · 데스크톱 `rich`(더 깊은 블러와 포인터 빛). 데스크톱 모드는 개발자가 켜고 끌 수 있음
- **브랜드색 팔레트**: 색 하나를 넣으면 라이트·다크 강조색을 WCAG 대비에 맞춰 자동 생성
- 팔레트 13종 × 라이트·다크. 카페인 6종(에스프레소·말차·차이·콜드브루·모카·클래식)과 웹 기본 7종(블루·인디고·바이올렛·틸·에메랄드·핑크·그래파이트). 브랜드색 팔레트까지 7,884개 대비 조합 모두 WCAG 통과
- 반응형 규정: 5단계 브레이크포인트, 4·8·12열 그리드, 단계별 제목 크기, 컴포넌트 배치 규칙
- 컴포넌트 29개: **React**(ESM·CommonJS·`<script>`)와 **Svelte 5**, 또는 CSS 클래스(`bl-*`)만으로도
- Next.js App Router·SvelteKit 서버 렌더링 안전, TypeScript 타입, Tailwind 프리셋
- 블러 성능 예산과 저사양 기기 자동 대응, 포커스 링·다이얼로그 포커스 가두기·동작 줄이기 대응

### 다른 디자인 시스템과 다른 점

- **유리가 다릅니다.** 맑은 유리와 흰 반사광 대신, 크림색 젖빛에 거품 결과 크레마가 얹힌 블러레마를 씁니다. 크레마는 팔레트 색을 따라갑니다.
- **유리를 아껴 씁니다.** 화면당 유리 개수를 규칙으로 정하고, 기기 성능에 맞춰 끄기·기본·데스크톱 세 단계로 자동으로 바뀝니다.
- **브랜드색을 넣어도 무너지지 않습니다.** 강조색만 바꾸고 바탕 90%는 그대로 두며, 대비는 자동 검사로 보장합니다.
- **한국어 화면이 기준입니다.** 글꼴, 해요체 문구, 줄바꿈 규칙까지 정해 두었습니다.

자세한 비교는 [브랜드북](docs/brand-book.md#다른-디자인-시스템과-다른-점)에 있어요.

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
| `blue` | 블루 | 링크와 버튼에서 가장 익숙한 파랑 |
| `indigo` | 인디고 | SaaS와 개발 도구에서 흔한 남보라 |
| `violet` | 바이올렛 | 창작 도구와 커뮤니티의 보라 |
| `teal` | 틸 | 헬스케어와 핀테크의 청록 |
| `emerald` | 에메랄드 | 결제와 성장 서비스의 선명한 초록 |
| `pink` | 핑크 | 커머스와 뷰티의 분홍 |
| `graphite` | 그래파이트 | 색 없이 먹색 하나로 쓰는 단색 |

코드로는 `setPalette("chai")`, `setTheme("dark" | "light" | "system")`. 테마를 지정하지 않으면 시스템 설정을 따릅니다. 사용자의 선택을 저장하는 것은 앱 몫입니다. `<PalettePicker group="web" />`처럼 한 묶음만 보일 수도 있습니다.

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

### 브랜드색 팔레트

```js
import { applyBrandColor } from "@caffeinecatkr/blurssism"; // Svelte는 ".../svelte", 바닐라는 ".../utils"
const palette = applyBrandColor("#ff5a1f");   // <html data-palette="brand">
palette.warnings.forEach((w) => console.warn(w.message));
```

바탕과 글자는 그대로 두고 강조색 묶음만 만듭니다. 흰 글자가 안 읽히는 밝은 색은 필요한 만큼만 어둡게 맞추고 원래 색은 장식색으로 남기며, 상태색과 헷갈리는 색은 경고합니다. 서버 렌더링에서는 `paletteToCss(createPalette("#ff5a1f"))`를 `<style>`에 넣고, 터미널에서는 `npx @caffeinecatkr/blurssism palette "#ff5a1f"`로 CSS를 받습니다.

### 유리 모드 · 블러 예산

```js
import { applyGlassPreference } from "@caffeinecatkr/blurssism";
applyGlassPreference();                    // 기기에 맞춰 off · on · rich 자동
applyGlassPreference({ rich: false });     // 데스크톱 모드 끄기
applyGlassPreference({ rich: true });      // 데스크톱 모드 항상 켜기
```

| 모드 | 언제 | 블러 예산 |
| --- | --- | --- |
| `off` | 저사양·데이터 절약·투명도 줄이기 | 0 (불투명) |
| `on` | 기본, 모바일 | 화면당 3개 |
| `rich` | 1120px 이상 + 마우스 + 넉넉한 기기 | 화면당 6개, 블러 40/64px, 더 비치는 유리, 두 겹 그림자, 포인터를 따라오는 캐러멜빛 |

반복 목록 안에서는 `.bl-glass-lite`(MediaCard는 `lite`), 블러 반경은 애니메이션하지 않습니다.

---

## English

blurssism floats **Blurema** — a frosted, milk-tinted glass topped with a thin crema layer — **only where it's needed**, over a calm milk-foam cream background. The glass is inspired by Apple Liquid Glass and Samsung One UI, the colors come from caffeine, and the system is designed with Korean typography as the default.

**Principles**
1. **90 / 10.** At least 90% of a screen is paper (`paper`) and ink (`ink`). Accent colors stay under 10%.
2. **Only floating things are glass.** Navigation bars, tab bars, sheets and toasts are glass. Cards, inputs and lists stay opaque.
3. **One action per screen.** Only one primary button per screen.
4. **Human words in serif.** Quotes and large names use Gowun Batang; the rest of the UI uses Pretendard.
5. **Capsules and large corners.** Anything you press is a capsule; anything that contains is 24px+.

**What's inside**
- **Blurema glass**: blur topped with a milk tint, a fine foam grain, and a crema layer that follows the palette.
- **Three glass modes**: `off` for low-end devices, `on` by default, and `rich` for desktop (deeper blur and a pointer light). Developers can turn desktop mode on or off.
- **Brand-color palettes**: pass one color and get light and dark accents tuned for WCAG contrast.
- 13 palettes × light and dark: 6 caffeine palettes (espresso, matcha, chai, cold brew, mocha, classic) and 7 web essentials (blue, indigo, violet, teal, emerald, pink, graphite). All 7,884 contrast pairs, brand-color palettes included, pass WCAG.
- A responsive system: 5 breakpoints, a 4/8/12-column grid, per-breakpoint heading sizes, and component layout rules.
- 29 components for **React** (ESM, CommonJS, `<script>`) and **Svelte 5**, or use the CSS classes (`bl-*`) alone.
- Safe for server rendering in the Next.js App Router and SvelteKit. Ships TypeScript types and a Tailwind preset.
- A blur performance budget with automatic fallback on low-end devices, visible focus rings, focus-trapped dialogs, and reduced-motion support.

### What makes it different

- **Its own glass.** Instead of clear glass with white highlights, Blurema is a cream, frosted glass with a foam grain and a crema layer that follows the palette.
- **Glass on a budget.** The number of glass surfaces per screen is a rule, and the glass switches between off, on and desktop modes to match the device.
- **Brand colors that don't break the look.** Only the accents change, 90% of the screen stays paper and ink, and contrast is checked automatically.
- **Korean-first.** Fonts, copy tone (해요체) and line breaking are all specified.

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

Set `<html data-palette="matcha" data-theme="dark">`, or call `setPalette("chai")` / `setTheme("dark" | "light" | "system")`. Without a theme, the system setting is followed. Persisting the user's choice is up to your app. Use `<PalettePicker group="web" />` to show one group only.

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

### Brand-color palettes

```js
import { applyBrandColor } from "@caffeinecatkr/blurssism";
const palette = applyBrandColor("#ff5a1f");   // sets <html data-palette="brand">
```

Pass one color and blurssism builds the accent set for light and dark, tuned to pass WCAG contrast, while the paper and ink stay the same. Colors too bright for white text are darkened just enough, and the original is kept as the decoration color. You get warnings for colors that look like status colors. For SSR, use `paletteToCss(createPalette(color))`; from a terminal, `npx @caffeinecatkr/blurssism palette "#ff5a1f"`.

### Glass modes and blur budget

`applyGlassPreference()` picks `off` (low-end devices, data saver, reduced transparency), `on` (default, 3 blurred surfaces per screen) or `rich`, a desktop mode for 1120px+ screens with a mouse and capable hardware (6 per screen, deeper blur, a warm light that follows the pointer). Turn desktop mode off with `applyGlassPreference({ rich: false })`, force it with `{ rich: true }`, or use `setGlassMode("off" | "on" | "rich" | "auto")`. Use `.bl-glass-lite` inside repeated lists and never animate the blur radius.

The full rules are in the [brand book](docs/brand-book.md) (Korean).

---

## 문의 · Contact

질문, 제안, 협업 문의는 **leeunchan10@gmail.com**(caffeinecat)으로 보내 주세요. 버그는 [GitHub 이슈](https://github.com/leeuc10/blurssism/issues)에 남겨 주시면 가장 빨리 볼 수 있어요.<br>
Questions, ideas or collaboration: **leeunchan10@gmail.com** (caffeinecat). Please report bugs on [GitHub Issues](https://github.com/leeuc10/blurssism/issues).

## 라이선스 · License

- 코드, 토큰, 문서 / Code, tokens, docs: [MIT](LICENSE) © caffeinecat
- 로고와 표식 / Logos and marks (`logos/`): 권리 보유 / all rights reserved — [logos/LICENSE.md](logos/LICENSE.md)
- 글꼴은 포함하지 않습니다 / Fonts are not bundled. Pretendard and Gowun Batang (both SIL OFL) load from a CDN.

## 기여 · Contributing

원본은 `src/`에 있습니다: 토큰 `src/tokens.json`, 스타일 `src/bundle.css`, React `src/core.js`, Svelte `src/svelte/`, 공통 함수 `src/utils.js`.
`npm install` 후 `npm run build`로 `dist/`와 `svelte/`를 만들고, `npm run check`로 대비와 Svelte 타입을 검사합니다.
Sources live in `src/`. After `npm install`, run `npm run build` to generate `dist/` and `svelte/`, and `npm run check` to verify contrast and Svelte types.

<p align="center"><img src="logos/caffeinecat-mark.svg" width="28" alt=""><br><sub>made by caffeinecat</sub></p>
