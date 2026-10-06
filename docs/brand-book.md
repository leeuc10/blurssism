blurssism은 웹과 앱 어디에나 쓰는 범용 디자인 시스템입니다. **글래스모피즘과 블러 효과의 조합**이 핵심으로, 따뜻한 종이와 먹으로 된 차분한 바탕 위에 맑은 유리와 두꺼운 블러를 필요한 곳에만 띄웁니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았고, 색은 **카페인**에서 가져왔습니다. 우유 거품 같은 크림색 바탕, 에스프레소 같은 글자, 볶은 원두와 크레마의 강조색이 기본이고, 말차·차이·콜드브루·모카 팔레트로 바꿀 수 있습니다. 원칙은 세 가지입니다. **바탕은 조용하게, 떠 있는 것만 유리로, 강조는 한 번만.**

## 원칙

1. **90 / 10.** 화면 면적의 90% 이상은 `paper` 계열과 `ink` 계열입니다. `accent`, `positive`, `deco` 같은 색은 합쳐서 10%를 넘지 않습니다.
2. **유리는 떠 있는 것에만.** 내비게이션 바, 탭바, 시트, 토스트, 이미지 위 캡션처럼 콘텐츠 *위에 떠 있는* 요소만 유리입니다. 본문 카드, 입력창, 리스트는 불투명한 `paper-raised`입니다. 유리 위에 유리를 겹치지 않습니다.
3. **화면당 행동 하나.** `primary`(또는 `accent`) 버튼은 한 화면에 하나만 둡니다. 나머지는 `ghost`입니다.
4. **사람의 문장은 명조로.** 인용, 사용자가 쓴 글, 큰 이름은 `serif`(Gowun Batang). 그 밖의 모든 UI는 `sans`(Pretendard)입니다.
5. **캡슐과 큰 모서리.** 누를 수 있는 것은 모두 `radius-full` 캡슐이고, 담는 것은 `radius-lg`(24px) 이상입니다.

## 글쓰기

- **해요체**를 씁니다. "저장했어요", "다시 시도해 주세요". 합니다체나 반말은 쓰지 않습니다.
- 버튼은 짧은 동사형입니다: "저장하기", "시작하기", "삭제하기". "확인"은 정말 확인만 할 때 씁니다.
- 오류는 무엇이 잘못됐는지보다 **어떻게 고치는지**를 말합니다: "8자 이상 입력해 주세요."
- UI 문구에 이모지와 느낌표를 쓰지 않습니다. 숫자는 아라비아 숫자, 단위는 붙여 씁니다("3분 전", "24장").
- 메타 정보는 가운뎃점으로 구분합니다: "사진 24장 · 10월 4일".
- 줄바꿈은 단어 단위입니다(`word-break: keep-all`).

## 색

| 역할 | 토큰 | 규칙 |
| --- | --- | --- |
| 바탕 | `paper` → `paper-raised` → `paper-sunken` | 페이지는 `paper`, 카드·입력창은 `paper-raised`, 눌린 곳·자리표시는 `paper-sunken`. 순백·순흑은 쓰지 않습니다. |
| 글자 | `ink`, `ink-muted`, `ink-subtle` | 제목·본문 `ink`, 보조 `ink-muted`, 자리표시·시간 `ink-subtle`. 모두 paper 계열 위에서 4.5:1 이상. |
| 선 | `line`, `line-strong` | 장식 구분선은 `line`. 입력창·칩·스위치처럼 조작 요소의 테두리는 3:1을 넘는 `line-strong`. |
| 강조 | `accent`, `accent-soft`, `on-accent`, `accent-ink` | 기본은 에스프레소(볶은 원두 갈색). 팔레트에 따라 바뀝니다. 선택·활성·브랜드 순간에만. 채움 위 글자는 반드시 `on-accent` (다크에서는 어두운 글자로 바뀝니다). |
| 상태 | `positive`, `warning`, `danger`, `info` (+ `-soft`) | 색만으로 알리지 않습니다. 항상 단어, 필요하면 아이콘. `info`는 파랑이라 `danger`와 색각에 상관없이 구분됩니다. |
| 장식 | `deco` | 크레마색. 일러스트·자리표시 도형 전용, 글자를 올리지 않습니다. 팔레트에 따라 바뀝니다. (`apricot`은 1.2 호환용 별칭) |
| 유리 | `glass-fill`, `glass-fill-strong`, `glass-stroke`, `glass-tint-accent`, `scrim` | 아래 "유리 재질" 참고. |

다크 테마는 같은 이름의 토큰이 값만 바뀝니다. 코드에서는 hex를 직접 쓰지 말고 항상 `var(--토큰)`을 씁니다.

## 팔레트

강조색 묶음(`accent`, `accent-soft`, `on-accent`, `accent-ink`, `glass-tint-accent`)과 장식색(`deco`)만 바뀌고, 바탕·글자·상태색은 모든 팔레트에서 같습니다. `<html data-palette="matcha">`처럼 고르고, 지정하지 않으면 에스프레소입니다.

| id | 이름 | 느낌 | 라이트 accent | 다크 accent |
| --- | --- | --- | --- | --- |
| `espresso` | 에스프레소 (기본) | 볶은 원두의 갈색과 크레마 | `#7a4524` | `#e2ab7a` |
| `matcha` | 말차 | 녹차의 차분한 초록 | `#3e6b35` | `#a3d48f` |
| `chai` | 차이 | 향신료 밀크티의 주황 | `#9a4512` | `#f2a66a` |
| `coldbrew` | 콜드브루 | 차갑게 우린 커피의 깊은 남색 | `#2b4c74` | `#9cc1ea` |
| `mocha` | 모카 | 초콜릿과 장미빛 코코아 | `#7c3a46` | `#e8a5b0` |
| `classic` | 클래식 | 1.2까지의 자두색 | `#7a3b69` | `#e0a6cf` |

- 모든 팔레트 × 라이트·다크에서 글자 대비 4.5:1, 조작 요소 3:1 이상입니다. 저장소의 `npm run check`가 324개 조합을 검사합니다.
- 한 화면에는 팔레트 하나. 섹션마다 팔레트를 바꾸지 않습니다. 예외는 팔레트 고르기 화면처럼 팔레트 자체를 보여 줄 때뿐입니다.
- 사용자에게 고르게 하려면 `PalettePicker`를 쓰고, 선택은 소비자가 저장해 다음 방문 때 `setPalette(id)`로 복원합니다.
- 상태색(`positive`·`warning`·`danger`)은 팔레트와 상관없이 고정이라, 말차의 초록과 `positive`가 비슷해 보여도 의미는 단어로 구분합니다.

## 유리 재질

두 가지 두께만 있습니다.

- **얇은 유리 — 글래스모피즘** (`.bl-glass`): `glass-fill` + `backdrop-filter: blur(var(--blur-md)) saturate(var(--glass-saturate))` + 1px `glass-stroke` + `shadow-glass`. 뒤의 색이 맑게 비칩니다. 탭바, 내비게이션 바, 이미지 위 캡션, 떠 있는 아이콘 버튼. **짧은 라벨만** 올립니다.
- **두꺼운 유리 — 블러 패널** (`.bl-glass-thick`): `glass-fill-strong` + `blur-lg` + `shadow-sheet`. 뒤 내용이 형태 없이 색만 남습니다. 바텀시트, 토스트, 고정 헤더처럼 **글이 길어지는 패널**. 배경이 무엇이든 `ink` 글자가 4.5:1 이상 유지됩니다.

규칙:
- 유리 뒤에는 반드시 비쳐 보일 무언가(스크롤되는 콘텐츠, 이미지, 색 면)가 있어야 합니다. 단색 바탕 위의 유리는 그냥 회색 상자입니다.
- 가장자리 하이라이트(`glass-stroke`와 `shadow-glass`의 inset)가 유리의 반사광입니다. 그라디언트로 반사를 흉내 내지 않습니다.
- `backdrop-filter`를 지원하지 않거나 사용자가 `prefers-reduced-transparency: reduce`를 켜면 `paper-raised`로 대체합니다(bundle.css에 들어 있습니다).
- 시트·모달 뒤에는 `scrim` + `blur-sm`.

## 성능 — 블러 예산

블러(`backdrop-filter`)는 GPU를 많이 씁니다. 다음 예산을 지킵니다.

- **한 화면(뷰포트)에 블러 유리는 3개까지.** 보통 NavBar + TabBar + (Sheet·Dialog·Toast 중 하나).
- **반복되는 목록 안에는 블러를 넣지 않습니다.** 피드·갤러리의 MediaCard는 `lite`(블러 없는 `.bl-glass-lite`)로, 블러는 상세 화면의 한 장에만 씁니다.
- **블러 반경을 애니메이션하지 않습니다.** 유리는 `opacity`와 `transform`으로만 나타나고 사라집니다.
- **화면 전체를 덮는 블러는 잠깐만.** `blur-lg`는 시트·다이얼로그처럼 떠 있다 사라지는 요소에, 상시 노출되는 넓은 면에는 `blur-md` 이하.
- **저사양 기기에서는 유리를 끕니다.** 앱 시작 시 `Blurssism.applyGlassPreference()`를 한 번 부르면, 메모리 4GB 이하·코어 4개 이하·데이터 절약·투명도 줄이기 설정에서 `<html data-glass="off">`가 되어 모든 유리가 불투명으로 바뀝니다. 사용자 설정 토글로 `applyGlassPreference(true|false)`를 제공해도 좋습니다.
- `backdrop-filter`를 지원하지 않는 브라우저는 자동으로 `paper-raised`로 대체됩니다.

## 타이포그래피

- `sans`: Pretendard → IBM Plex Sans KR → 시스템 산세리프. 실제 제품에서는 Pretendard를 jsDelivr(`pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css`)로 불러옵니다.
- `serif`: Gowun Batang (Google Fonts).
- 스타일: `display` 40/48 · `title-1` 30/38 · `quote` 22/32 (명조) / `title-2` 22/30 · `title-3` 18/26 · `body` 16/26 · `body-strong` 16/26 · `body-sm` 14/22 · `label` 15/20 · `caption` 12/16 (산세리프).
- 한글 본문의 행간은 1.6(16/26)입니다. 제목은 자간을 −0.01 ~ −0.02em 좁힙니다.
- 긴 글 본문은 `prose-max`(640px)를 넘지 않게 합니다.
- 굵기는 400 / 500 / 600 / 700 네 가지만 씁니다.

## 간격과 레이아웃

- 4px 단위: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 20 · `space-6` 24 · `space-8` 32 · `space-12` 48 · `space-16` 64 · `space-24` 96.
- 카드 안쪽 `space-5`, 카드 사이 `space-6`, 섹션 사이 `space-12`(모바일) · `space-16`(데스크톱), 랜딩의 큰 구분은 `space-24`.
- 화면 크기별 규칙은 아래 "반응형"을 따릅니다.

## 반응형

**먼저** — 모든 페이지의 `<head>`에 `<meta name="viewport" content="width=device-width, initial-scale=1">`를 넣습니다. 없으면 폰 브라우저가 980px 너비로 그려서 아래 단계가 하나도 적용되지 않습니다.

**단계** — 모두 min-width 기준(모바일 우선)입니다.

| 단계 | 너비 | 기기 | 그리드 열 | 거터 | 좌우 여백 |
| --- | --- | --- | --- | --- | --- |
| `xs` | 0–599px | 폰 | 4 | 16 | 16 |
| `sm` | 600–767px (`bp-sm`) | 큰 폰 가로·폴더블 | 8 | 16 | 24 |
| `md` | 768–1119px (`bp-md`) | 태블릿 | 8 | 24 | 32 |
| `lg` | 1120–1439px (`bp-lg`) | 노트북·데스크톱 | 12 | 24 | 40 |
| `xl` | 1440px+ (`bp-xl`) | 넓은 모니터 | 12 | 32 | 48 |

- 거터·여백·열 수는 `--grid-gutter`, `--grid-margin`, `--grid-columns` 변수로 단계마다 자동으로 바뀝니다(`tokens.css`).
- 콘텐츠는 `content-max`(1120px)에서 멈추고, 그보다 넓으면 여백만 늘어납니다. 긴 글은 `prose-max`(640px).
- `bp-tablet`·`bp-desktop`은 1.2 호환용 별칭으로, 각각 `bp-md`·`bp-lg`와 같습니다.

**레이아웃 도구**
- `Container`(`.bl-container`): 폭과 여백을 맞춥니다. 섹션마다 감쌉니다.
- `Grid`(`.bl-autogrid`): `columns={{ xs: 1, sm: 2, lg: 3 }}`처럼 단계별 열 수. 카드 목록은 기본으로 이걸 씁니다.
- 12열 그리드(`.bl-grid` + `.bl-span-4`, `.bl-span-md-6`, `.bl-span-lg-8`, `.bl-span-full`): 정교한 배치용. xs는 4열이므로 접두어 없는 칸은 4 이하로.
- 보이기·숨기기: `.bl-hide-from-lg`(lg부터 숨김), `.bl-hide-below-md`(md 미만에서 숨김).
- 코드에서 단계 확인: React `useBreakpoint()`, Svelte `breakpoint()`, 공통 `getBreakpoint()`·`isAtLeast("md")`·`onBreakpointChange(cb)`. 서버와 첫 렌더에서는 `null`이므로, 레이아웃은 되도록 CSS로 바꾸고 JS 단계 확인은 보조로 씁니다.

**컴포넌트 규칙**

| 항목 | xs · sm | md | lg · xl |
| --- | --- | --- | --- |
| 내비게이션 | 하단 `TabBar` + 위 `NavBar`(제목·액션만) | `TabBar` 유지, `NavBar` 링크가 나타남 | `NavBar` 링크, `TabBar`는 숨김(`bl-hide-from-lg`) |
| 확인·선택 창 | 아래에서 올라오는 시트(`Dialog`가 자동으로 시트 모양) | 가운데 `Dialog` | 가운데 `Dialog` |
| 제목 크기 | `display` 32/40 · `title-1` 26/34 · `title-2` 20/28 (자동) | `display` 40/48 · `title-1` 30/38 · `title-2` 22/30 | 같음 |
| 카드 목록 | 1열 | 2열 | 3–4열 |
| 표 | 가로 스크롤, 14px, 좁은 칸 여백 | 15px | 15px |
| 주 행동 | 엄지 영역(화면 아래 절반), `block` 버튼 | 콘텐츠 흐름 안 | 콘텐츠 흐름 안, 오른쪽 정렬 |

**입력 방식**
- 터치 기기(`pointer: coarse`)에서는 조작 요소가 자동으로 최소 `touch-min`(44px)이 됩니다.
- 마우스 호버 효과는 `hover: hover`인 기기에서만 켭니다. 호버에만 의존하는 정보(툴팁의 유일한 설명 등)를 두지 않습니다.
- 가로 모드 폰은 너비로 sm이 되지만 높이가 낮습니다. 시트와 다이얼로그는 높이 90%를 넘지 않게 하고 안쪽을 스크롤합니다.

## 모서리와 그림자

- `radius-sm` 10 · `radius-md` 16 · `radius-lg` 24 · `radius-xl` 32 · `radius-full` 캡슐.
- 버튼·칩·스위치·탭바·내비게이션 바 = `radius-full`. 입력창·썸네일 = `radius-md`. 카드·패널·모달 = `radius-lg`. 바텀시트 위쪽 = `radius-xl`.
- 그림자는 세 개뿐입니다. 불투명 카드 `shadow-card`(거의 평면), 떠 있는 유리 `shadow-glass`, 시트 `shadow-sheet`. 그 밖의 그림자는 만들지 않습니다.

## 움직임

- 누를 때 `scale(0.97)`, 120ms.
- 유리 패널·시트는 아래에서 올라오며 260ms `cubic-bezier(.2,.8,.2,1)`. 스위치 손잡이는 살짝 튕깁니다(`cubic-bezier(.3,1.4,.5,1)`).
- `prefers-reduced-motion: reduce`에서는 이동 없이 투명도만 바꿉니다.

## 상태와 접근성

- 포커스: `focus-ring` 2px 실선, 2px 간격. 모든 바탕과 유리 위에서 3:1 이상입니다. `outline: none`만 남기지 않습니다.
- 비활성: `paper-sunken` 바탕 + `ink-subtle` 글자.
- 선택: `accent-soft` / `glass-tint-accent` 바탕 + `accent-ink` 글자 + 체크 또는 채워진 아이콘 (색만으로 구분하지 않음).
- 오류: `danger` 테두리 + "오류:"로 시작하는 문구.
- 아이콘만 있는 버튼에는 반드시 `aria-label`.

## 아이콘

- 24×24 그리드, 1.75px 선, 둥근 끝과 이음의 라인 아이콘. 색은 `currentColor`.
- 기본 14종은 `Icon` 컴포넌트에 들어 있습니다. 더 필요하면 같은 규칙의 **Lucide**(`strokeWidth={1.75}`)를 씁니다.
- 채운 아이콘은 선택·눌림 상태에만 씁니다. 이모지를 아이콘 대신 쓰지 않습니다.

## 로고와 표식

- **blurssism 마크** (`logos/blurssism-mark.svg`, 다크 바탕용 `blurssism-mark-dark.svg`): 에스프레소색 원 위에 반투명 유리 판이 겹쳐 그 아래가 흐려지는 모양으로, 시스템의 원칙 "떠 있는 것만 유리로"를 그대로 그렸습니다. 최소 크기 24px, 주변 여백은 마크 높이의 1/4.
- **워드마크**: 마크 오른쪽에 `space-2` 간격으로 "blurssism"을 `--font-serif` 700, 자간 −0.02em, 소문자로 씁니다. 글자는 이미지로 굳히지 않고 실제 글자로 둡니다.
- **caffeinecat 표식** (`logos/caffeinecat-mark.svg`, 다크용 `caffeinecat-mark-dark.svg`): 이 시스템을 만든 caffeinecat의 서명입니다. 커피콩 눈을 한 고양이 얼굴. 푸터나 크레딧에 `caption` 크기 글자 "made by caffeinecat"과 함께 16–24px로 둡니다. 제품 로고 자리에 쓰지 않습니다.
- 마크 색을 바꾸거나, 늘리거나, 그림자·그라디언트를 더하지 않습니다. 바탕이 어두우면 `-dark` 파일을 씁니다.

## 코드에서 쓰기

- **설치**: `npm install @caffeinecatkr/blurssism` (GitHub: leeuc10/blurssism). CDN은 `https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/`.
- **React (Vite·Next.js 등)**: `import { Button, Dialog } from "@caffeinecatkr/blurssism"`와 `import "@caffeinecatkr/blurssism/tokens.css"`, `import "@caffeinecatkr/blurssism/bundle.css"`. Next.js App Router의 서버 컴포넌트에서도 바로 import할 수 있습니다. 빌드 도구가 없으면 React UMD 다음에 `dist/bundle.js`를 불러 `window.Blurssism`으로 씁니다. Svelte 5는 `import { Button } from "@caffeinecatkr/blurssism/svelte"`(바인딩·스니펫 지원). 컴포넌트는 29개입니다.
  - 행동: `Button`, `IconButton`
  - 입력: `TextField`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Chip`, `SegmentedControl`, `Calendar`, `PalettePicker`
  - 레이아웃: `Container`, `Grid`
  - 콘텐츠: `Card`, `MediaCard`, `ListItem`, `Table`, `Avatar`, `Icon`
  - 상태: `Badge`, `Progress`, `Skeleton`, `EmptyState`
  - 탐색·오버레이: `NavBar`, `TabBar`, `Sheet`, `Dialog`, `Toast`, `Tooltip`
  - 유틸리티: `setPalette()`, `getPalette()`, `palettes`, `setTheme()`, `getTheme()`, `useBreakpoint()`(React) / `breakpoint()`(Svelte), `getBreakpoint()`, `isAtLeast()`, `onBreakpointChange()`, `breakpoints`, `applyGlassPreference()`, `shouldReduceGlass()`. 프레임워크 없이는 `@caffeinecatkr/blurssism/utils`.

  각 props는 `dist/index.d.ts`에 있습니다. 앱 루트에 `class="bl-root"`를 둡니다.
- **CSS만(HTML·Vue 등)**: `dist/tokens.css`와 `dist/bundle.css`만 불러와 같은 클래스(`bl-btn bl-btn-primary`, `bl-glass`, `bl-list` …)를 씁니다.
- **Tailwind**: `tailwind.config.js`에 `presets: [require("@caffeinecatkr/blurssism/tailwind")]`를 넣고 `tokens.css`를 함께 불러옵니다. 유리는 `.bl-glass` / `.bl-glass-thick` 클래스로 씁니다.
- **네이티브 앱(SwiftUI·Compose·Flutter)**: `dist/tokens.json`의 값을 그대로 옮깁니다. 얇은 유리는 플랫폼 기본 재질(iOS `.ultraThinMaterial` / Liquid Glass, Android `RenderEffect` blur)에 `glass-fill`을 겹칩니다.
- 다크 모드는 `<html data-theme="dark">`, 팔레트는 `<html data-palette="matcha">`로 전환합니다.
- 실제 조합 예시는 `AppScreen`(모바일 설정 화면), `WebLanding`(웹 랜딩), `Palettes`(팔레트 6종), `Responsive`(반응형 규칙) 카드를 참고합니다.

---

blurssism · made by **caffeinecat**
