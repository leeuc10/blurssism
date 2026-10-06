# Changelog

## 1.3.0 — 2026-10-06
**카페인 팔레트 · Caffeine palettes**
- 기본 색을 카페인 계열로 변경: 우유 거품 크림색 바탕, 에스프레소 글자, 볶은 원두 갈색 강조, 크레마 장식색
  New caffeine defaults: milk-foam cream paper, espresso ink, roasted-bean accent, crema decoration
- 팔레트 6종을 `data-palette`로 선택: `espresso`(기본) · `matcha` · `chai` · `coldbrew` · `mocha` · `classic`(1.2의 자두색)
  Six selectable palettes via `data-palette`
- `PalettePicker` 컴포넌트, `setPalette()` · `getPalette()` · `palettes` · `setTheme()` · `getTheme()`
- 새 토큰 `deco`(장식색). `apricot`은 `deco`의 별칭으로 남김 / New `deco` token; `apricot` stays as an alias
- `npm run check`: 팔레트 6종 × 라이트·다크, 324개 대비 조합을 WCAG 기준으로 검사 / contrast check for all 324 pairs

**반응형 규정 · Responsive system**
- 5단계 브레이크포인트 `xs` · `sm` 600 · `md` 768 · `lg` 1120 · `xl` 1440 (`bp-tablet`·`bp-desktop`은 별칭으로 유지)
- 단계별 그리드 변수 `--grid-columns`(4·8·12), `--grid-gutter`, `--grid-margin`
- `Container`, `Grid` 컴포넌트와 `.bl-container`, `.bl-grid` + `.bl-span-{n}` / `.bl-span-{bp}-{n}`, `.bl-hide-from-{bp}` / `.bl-hide-below-{bp}`
- md 미만에서 큰 제목 자동 축소, NavBar 링크 숨김, 표 압축 / smaller headings, hidden NavBar links and compact tables below md
- 터치 기기에서 조작 요소 44px 이상, 호버 효과는 마우스 기기에서만 / 44px touch targets on coarse pointers; hover only with a mouse
- 시트·다이얼로그 최대 높이 90dvh / sheets and dialogs capped at 90dvh
- `useBreakpoint()`(React), `getBreakpoint()`, `isAtLeast()`, `onBreakpointChange()`, `breakpoints`

**Svelte**
- Svelte 5 컴포넌트 29개: `@caffeinecatkr/blurssism/svelte` — `bind:` 지원, 스니펫, 타입 포함, SvelteKit 서버 렌더링 안전
  29 Svelte 5 components with bindings, snippets and types; safe for SvelteKit SSR
- `breakpoint()` 반응형 헬퍼 / reactive breakpoint helper
- 예제 `examples/sveltekit`

**기타 · Other**
- 프레임워크 없이 쓰는 함수 `@caffeinecatkr/blurssism/utils` / framework-free helpers
- 원본을 `src/`로 정리하고 `npm run build`가 모든 결과물을 생성 / all outputs generated from `src/`
- TabBar·Sheet의 바깥 요소를 `div`로 (접근성) / TabBar and Sheet roots are now `div`s (accessibility)
- 로고를 에스프레소색으로 / logos recolored to espresso

## 1.2.0 — 2026-10-06
- **React에서 바로 import**: `import { Button } from "@caffeinecatkr/blurssism"` (ES 모듈·CommonJS 빌드 추가)
  Direct imports in React via new ESM and CommonJS builds
- Next.js App Router 지원: `"use client"` 포함, 서버 렌더링에서 `window`·`document`를 건드리지 않음
  Next.js App Router support: ships `"use client"` and never touches `window` or `document` during server rendering
- 입력 요소의 id를 `React.useId`로 만들어 하이드레이션 불일치 방지
  Form element ids now come from `React.useId`, so hydration no longer mismatches
- 타입: React 19 타입과 호환(`ReactElement`), `Select`가 select 속성을 받도록 수정, `window.Blurssism` 전역 타입
  Types: compatible with React 19 typings (`ReactElement`), `Select` now accepts select attributes, and `window.Blurssism` has a global type
- 컴포넌트 원본을 `src/core.js` 하나로 통일, `npm run build`로 세 가지 빌드 생성
  One component source (`src/core.js`); `npm run build` generates all three builds
- 예제 프로젝트: `examples/vite-react`, `examples/nextjs`
- README 영문 추가 / English README
- 기존 `<script>` 방식(`window.Blurssism`)은 그대로 동작
  The `<script>` build (`window.Blurssism`) still works as before

## 1.1.0 — 2026-10-06
- 컴포넌트 12개 추가 (총 26개): Select, Checkbox, RadioGroup, SegmentedControl, Calendar, Table, Avatar, Tooltip, Progress, Skeleton, EmptyState, Dialog
- 블러 예산과 저사양 대응: `.bl-glass-lite`, `<html data-glass="off">`, `applyGlassPreference()`, `shouldReduceGlass()`
- `warning` 상태색, 레이아웃 토큰(`bp-tablet`, `bp-desktop`, `content-max`, `prose-max`, `touch-min`, `navbar-h`)
- blurssism 마크와 caffeinecat 표식
- 예시 화면: AppScreen(모바일), WebLanding(웹)
- Tailwind 프리셋 `@caffeinecatkr/blurssism/tailwind`

## 1.0.0 — 2026-10-06
- 첫 공개: 라이트·다크 토큰, 컴포넌트 14개, 글래스모피즘 + 블러 재질
