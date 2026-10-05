<p align="center">
  <img src="logos/blurssism-mark.svg" width="72" alt="blurssism">
</p>

<h1 align="center">blurssism</h1>

<p align="center">
  글래스모피즘과 블러 효과를 조합한, 웹·앱 공용 디자인 시스템<br>
  <a href="https://leeuc10.github.io/blurssism/">컴포넌트 미리보기</a> ·
  <a href="docs/brand-book.md">브랜드북</a> ·
  <a href="https://www.npmjs.com/package/@caffeinecatkr/blurssism">npm</a>
</p>

---

blurssism은 따뜻한 종이 바탕 위에 맑은 유리와 두꺼운 블러를 **필요한 곳에만** 띄우는 디자인 시스템입니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았고, 한국어 화면을 기준으로 만들었습니다.

**원칙**
1. **90 / 10.** 화면의 90% 이상은 종이(`paper`)와 먹(`ink`). 강조색은 10% 이내.
2. **떠 있는 것만 유리로.** 내비게이션·탭바·시트·토스트만 유리. 카드·입력창·리스트는 불투명.
3. **화면당 행동 하나.** primary 버튼은 한 화면에 하나.
4. **사람의 문장은 명조로.** 인용과 큰 이름만 Gowun Batang, 나머지 UI는 Pretendard.
5. **캡슐과 큰 모서리.** 누르는 것은 캡슐, 담는 것은 24px 이상.

**들어 있는 것**
- 라이트·다크 테마 토큰: 색 26, 글자 스타일 10, 간격 10, 모서리 5, 그림자 3, 블러 3, 레이아웃 6
- React 컴포넌트 26개, CSS 클래스(`bl-*`)만으로도 사용 가능
- Tailwind 프리셋, TypeScript 타입
- 블러 성능 예산과 저사양 기기 자동 대응
- 접근성: 모든 글자 대비 4.5:1 이상, 포커스 링, 다이얼로그 포커스 가두기, `prefers-reduced-motion` / `prefers-reduced-transparency` 대응

## 설치

```bash
npm install @caffeinecatkr/blurssism
```

또는 CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.css">
```

## 사용

### HTML · Vue · Svelte (CSS만)

```html
<body class="bl-root">
  <header class="bl-navbar bl-glass">
    <p class="bl-navbar-title">설정</p>
  </header>
  <button class="bl-btn bl-btn-primary">저장하기</button>
  <button class="bl-btn bl-btn-ghost">취소</button>
</body>
```

### React

`dist/bundle.js`는 `window.React`를 사용하는 스크립트로, 컴포넌트를 `window.Blurssism`에 담습니다.

```html
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/bundle.js"></script>
<script>
  const { Button, Sheet, applyGlassPreference } = window.Blurssism;
  applyGlassPreference(); // 저사양 기기에서는 유리를 끕니다
</script>
```

번들러(Vite, Next.js 등)에서는 `window.React`를 먼저 설정한 뒤 불러옵니다.

```js
import React from "react";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";
window.React = React;
await import("@caffeinecatkr/blurssism");
const { Button, TabBar } = window.Blurssism;
```

컴포넌트: `Button` `IconButton` `TextField` `Select` `Checkbox` `RadioGroup` `Switch` `Chip` `SegmentedControl` `Calendar` `Card` `MediaCard` `ListItem` `Table` `Avatar` `Icon` `Badge` `Progress` `Skeleton` `EmptyState` `NavBar` `TabBar` `Sheet` `Dialog` `Toast` `Tooltip`. 각 props는 [`dist/index.d.ts`](dist/index.d.ts), 사용 가이드는 [`docs/components`](docs/components)에 있습니다.

### Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require("@caffeinecatkr/blurssism/tailwind")],
};
```

`tokens.css`를 함께 불러와야 합니다. 이후 `bg-paper`, `text-ink`, `rounded-full`, `p-4`, `backdrop-blur-md` 등을 쓸 수 있습니다.

### 다크 모드

시스템 설정을 자동으로 따르며, 직접 바꾸려면 `<html data-theme="dark">`를 설정합니다.

## 블러 예산

- 한 화면에 블러 유리는 3개까지.
- 반복 목록 안에서는 `.bl-glass-lite`(블러 없음).
- 블러 반경은 애니메이션하지 않습니다.
- `applyGlassPreference()`를 부르면 저사양 기기, 데이터 절약, 투명도 줄이기 설정에서 `<html data-glass="off">`가 됩니다.

자세한 규칙은 [브랜드북](docs/brand-book.md)에 있습니다.

## 라이선스

- 코드, 토큰, 문서: [MIT](LICENSE) © caffeinecat
- 로고와 표식(`logos/`): 권리 보유, [logos/LICENSE.md](logos/LICENSE.md)
- 글꼴은 포함하지 않습니다. Pretendard와 Gowun Batang(둘 다 SIL OFL)은 CDN에서 불러옵니다.

<p align="center"><img src="logos/caffeinecat-mark.svg" width="28" alt=""><br><sub>made by caffeinecat</sub></p>
