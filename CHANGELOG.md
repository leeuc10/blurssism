# Changelog

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
