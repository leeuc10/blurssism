<p align="center">
  <img src="logos/blurssism-mark.svg" width="72" alt="blurssism">
</p>

<h1 align="center">blurssism</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@caffeinecatkr/blurssism"><img src="https://img.shields.io/npm/v/@caffeinecatkr/blurssism?color=7a3b69&label=npm" alt="npm version"></a>
  <a href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/"><img src="https://img.shields.io/jsdelivr/npm/hm/@caffeinecatkr/blurssism?color=3d6650" alt="jsDelivr"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-1c1917" alt="MIT license"></a>
</p>

<p align="center">
  글래스모피즘과 블러 효과를 조합한, 웹·앱 공용 디자인 시스템<br>
  A web &amp; app design system that combines glassmorphism with blur<br>
  <a href="https://leeuc10.github.io/blurssism/">미리보기 Preview</a> ·
  <a href="docs/brand-book.md">브랜드북 Brand book</a> ·
  <a href="https://www.npmjs.com/package/@caffeinecatkr/blurssism">npm</a>
</p>

<p align="center"><a href="#한국어">한국어</a> · <a href="#english">English</a></p>

---

## 한국어

blurssism은 따뜻한 종이 바탕 위에 맑은 유리와 두꺼운 블러를 **필요한 곳에만** 띄우는 디자인 시스템입니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았고, 한국어 화면을 기준으로 만들었습니다.

**원칙**
1. **90 / 10.** 화면의 90% 이상은 종이(`paper`)와 먹(`ink`). 강조색은 10% 이내.
2. **떠 있는 것만 유리로.** 내비게이션·탭바·시트·토스트만 유리. 카드·입력창·리스트는 불투명.
3. **화면당 행동 하나.** primary 버튼은 한 화면에 하나.
4. **사람의 문장은 명조로.** 인용과 큰 이름만 Gowun Batang, 나머지 UI는 Pretendard.
5. **캡슐과 큰 모서리.** 누르는 것은 캡슐, 담는 것은 24px 이상.

**들어 있는 것**
- 라이트·다크 테마 토큰: 색 26, 글자 스타일 10, 간격 10, 모서리 5, 그림자 3, 블러 3, 레이아웃 6
- React 컴포넌트 26개 (ESM · CommonJS · `<script>`), CSS 클래스(`bl-*`)만으로도 사용 가능
- Next.js App Router 지원(`"use client"` 포함), 서버 렌더링 안전
- Tailwind 프리셋, TypeScript 타입
- 블러 성능 예산과 저사양 기기 자동 대응
- 접근성: 모든 글자 대비 4.5:1 이상, 포커스 링, 다이얼로그 포커스 가두기, `prefers-reduced-motion` / `prefers-reduced-transparency` 대응

### 설치

```bash
npm install @caffeinecatkr/blurssism
```

### React (Vite, Next.js, CRA …)

```jsx
import { Button, Dialog, TabBar, applyGlassPreference } from "@caffeinecatkr/blurssism";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";

applyGlassPreference(); // 저사양 기기에서는 유리를 끕니다 (선택)

export default function App() {
  return (
    <div className="bl-root">
      <Button variant="accent" icon="plus">새로 만들기</Button>
    </div>
  );
}
```

- Next.js App Router에서는 CSS 두 줄을 `app/layout.jsx`에서 불러오고, 컴포넌트는 서버 컴포넌트에서도 바로 import할 수 있습니다.
- 예제 프로젝트: [`examples/vite-react`](examples/vite-react), [`examples/nextjs`](examples/nextjs)
- 컴포넌트: `Button` `IconButton` `TextField` `Select` `Checkbox` `RadioGroup` `Switch` `Chip` `SegmentedControl` `Calendar` `Card` `MediaCard` `ListItem` `Table` `Avatar` `Icon` `Badge` `Progress` `Skeleton` `EmptyState` `NavBar` `TabBar` `Sheet` `Dialog` `Toast` `Tooltip`
- props는 [`dist/index.d.ts`](dist/index.d.ts), 사용 가이드는 [`docs/components`](docs/components)에 있습니다.

### HTML · Vue · Svelte (CSS만)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.css">

<body class="bl-root">
  <header class="bl-navbar bl-glass"><p class="bl-navbar-title">설정</p></header>
  <button class="bl-btn bl-btn-primary">저장하기</button>
</body>
```

### 빌드 도구 없이 React 컴포넌트 쓰기

```html
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.js"></script>
<script>
  const { Button } = window.Blurssism;
</script>
```

### Tailwind

```js
// tailwind.config.js — tokens.css도 함께 불러오세요
module.exports = { presets: [require("@caffeinecatkr/blurssism/tailwind")] };
```

`bg-paper`, `text-ink`, `rounded-full`, `p-4`, `backdrop-blur-md` 등을 쓸 수 있습니다.

### 다크 모드

시스템 설정을 자동으로 따르며, 직접 바꾸려면 `<html data-theme="dark">`를 설정합니다.

### 블러 예산

- 한 화면에 블러 유리는 3개까지.
- 반복 목록 안에서는 `.bl-glass-lite`(블러 없음), MediaCard는 `lite`.
- 블러 반경은 애니메이션하지 않습니다.
- `applyGlassPreference()`를 부르면 저사양 기기, 데이터 절약, 투명도 줄이기 설정에서 `<html data-glass="off">`가 됩니다.

자세한 규칙은 [브랜드북](docs/brand-book.md)에 있습니다.

---

## English

blurssism is a design system for web and apps. Clear glass and thick blur float **only where they're needed**, on top of a calm, warm paper background. The glass treatment is inspired by Apple Liquid Glass and Samsung One UI, and the system is designed with Korean typography as the default.

**Principles**
1. **90 / 10.** At least 90% of a screen is paper (`paper`) and ink (`ink`). Accent colors stay under 10%.
2. **Only floating things are glass.** Navigation bars, tab bars, sheets and toasts are glass. Cards, inputs and lists stay opaque.
3. **One action per screen.** Only one primary button per screen.
4. **Human words in serif.** Quotes and large names use Gowun Batang; the rest of the UI uses Pretendard.
5. **Capsules and large corners.** Anything you press is a capsule; anything that contains is 24px+.

**What's inside**
- Light and dark tokens: 26 colors, 10 text styles, 10 spacing steps, 5 radii, 3 shadows, 3 blur levels, 6 layout values
- 26 React components (ESM · CommonJS · `<script>`), or use the CSS classes (`bl-*`) alone
- Works with the Next.js App Router (ships `"use client"`) and is safe for server rendering
- Tailwind preset and TypeScript types
- A blur performance budget with automatic fallback on low-end devices
- Accessibility: every text pair is at least 4.5:1, visible focus rings, focus-trapped dialogs, and support for `prefers-reduced-motion` / `prefers-reduced-transparency`

### Install

```bash
npm install @caffeinecatkr/blurssism
```

### React (Vite, Next.js, CRA …)

```jsx
import { Button, Dialog, TabBar, applyGlassPreference } from "@caffeinecatkr/blurssism";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";

applyGlassPreference(); // optional: turns glass off on low-end devices

export default function App() {
  return (
    <div className="bl-root">
      <Button variant="accent" icon="plus">Create</Button>
    </div>
  );
}
```

- In the Next.js App Router, import the two CSS files in `app/layout.jsx`. Components can be imported straight from server components.
- Example projects: [`examples/vite-react`](examples/vite-react), [`examples/nextjs`](examples/nextjs)
- Props are documented in [`dist/index.d.ts`](dist/index.d.ts). Usage guides are in [`docs/components`](docs/components) (Korean).

### HTML · Vue · Svelte (CSS only)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.css">

<body class="bl-root">
  <header class="bl-navbar bl-glass"><p class="bl-navbar-title">Settings</p></header>
  <button class="bl-btn bl-btn-primary">Save</button>
</body>
```

### React components without a build step

```html
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.js"></script>
<script>
  const { Button } = window.Blurssism;
</script>
```

### Tailwind

```js
// tailwind.config.js — also load tokens.css
module.exports = { presets: [require("@caffeinecatkr/blurssism/tailwind")] };
```

You get utilities such as `bg-paper`, `text-ink`, `rounded-full`, `p-4` and `backdrop-blur-md`.

### Dark mode

It follows the system setting automatically. To force a theme, set `<html data-theme="dark">` (or `"light"`).

### Blur budget

- At most 3 blurred glass surfaces per screen.
- Inside repeated lists, use `.bl-glass-lite` (no blur), or `lite` on MediaCard.
- Never animate the blur radius.
- `applyGlassPreference()` sets `<html data-glass="off">` on low-memory or low-core devices, in data-saver mode, and when the user has asked for reduced transparency.

The full rules are in the [brand book](docs/brand-book.md) (Korean).

---

## 라이선스 · License

- 코드, 토큰, 문서 / Code, tokens, docs: [MIT](LICENSE) © caffeinecat
- 로고와 표식 / Logos and marks (`logos/`): 권리 보유 / all rights reserved — [logos/LICENSE.md](logos/LICENSE.md)
- 글꼴은 포함하지 않습니다 / Fonts are not bundled. Pretendard and Gowun Batang (both SIL OFL) load from a CDN.

## 기여 · Contributing

컴포넌트 원본은 `src/core.js` 하나입니다. 고친 뒤 `npm run build`로 `dist/`를 다시 만드세요.
The single component source is `src/core.js`. After editing, run `npm run build` to regenerate `dist/`.

<p align="center"><img src="logos/caffeinecat-mark.svg" width="28" alt=""><br><sub>made by caffeinecat</sub></p>
