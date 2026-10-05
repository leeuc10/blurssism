blurssism은 웹과 앱 어디에나 쓰는 범용 디자인 시스템입니다. **글래스모피즘과 블러 효과의 조합**이 핵심으로, 따뜻한 종이와 먹으로 된 차분한 바탕 위에 맑은 유리와 두꺼운 블러를 필요한 곳에만 띄웁니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았습니다. 원칙은 세 가지입니다. **바탕은 조용하게, 떠 있는 것만 유리로, 강조는 한 번만.**

## 원칙

1. **90 / 10.** 화면 면적의 90% 이상은 `paper` 계열과 `ink` 계열입니다. `accent`, `positive`, `apricot` 같은 색은 합쳐서 10%를 넘지 않습니다.
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
| 강조 | `accent`, `accent-soft`, `on-accent`, `accent-ink` | 자두색. 선택·활성·브랜드 순간에만. 채움 위 글자는 반드시 `on-accent` (다크에서는 어두운 글자로 바뀝니다). |
| 상태 | `positive`, `warning`, `danger`, `info` (+ `-soft`) | 색만으로 알리지 않습니다. 항상 단어, 필요하면 아이콘. `info`는 파랑이라 `danger`와 색각에 상관없이 구분됩니다. |
| 장식 | `apricot` | 일러스트·자리표시 도형 전용. 글자를 올리지 않습니다. |
| 유리 | `glass-fill`, `glass-fill-strong`, `glass-stroke`, `glass-tint-accent`, `scrim` | 아래 "유리 재질" 참고. |

다크 테마는 같은 이름의 토큰이 값만 바뀝니다. 코드에서는 hex를 직접 쓰지 말고 항상 `var(--토큰)`을 씁니다.

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
- **앱(모바일)**: 좌우 거터 `space-4`, 카드 안쪽 `space-5`, 카드 사이 `space-6`. 하단에 TabBar를 띄우고, 주요 행동은 화면 아래 절반(엄지 영역)에 둡니다.
- **웹**: 콘텐츠 폭 `content-max`(1120px) 가운데 정렬. `bp-tablet`(768px)부터 2열, `bp-desktop`(1120px)부터 3–4열 그리드와 상단 NavBar 링크. 섹션 사이 `space-16`, 랜딩의 큰 구분은 `space-24`.
- 모든 터치 대상은 최소 `touch-min`(44px).

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

- **blurssism 마크** (`logos/blurssism-mark.svg`, 다크 바탕용 `blurssism-mark-dark.svg`): 자두색 원 위에 반투명 유리 판이 겹쳐 그 아래가 흐려지는 모양으로, 시스템의 원칙 "떠 있는 것만 유리로"를 그대로 그렸습니다. 최소 크기 24px, 주변 여백은 마크 높이의 1/4.
- **워드마크**: 마크 오른쪽에 `space-2` 간격으로 "blurssism"을 `--font-serif` 700, 자간 −0.02em, 소문자로 씁니다. 글자는 이미지로 굳히지 않고 실제 글자로 둡니다.
- **caffeinecat 표식** (`logos/caffeinecat-mark.svg`, 다크용 `caffeinecat-mark-dark.svg`): 이 시스템을 만든 caffeinecat의 서명입니다. 커피콩 눈을 한 고양이 얼굴. 푸터나 크레딧에 `caption` 크기 글자 "made by caffeinecat"과 함께 16–24px로 둡니다. 제품 로고 자리에 쓰지 않습니다.
- 마크 색을 바꾸거나, 늘리거나, 그림자·그라디언트를 더하지 않습니다. 바탕이 어두우면 `-dark` 파일을 씁니다.

## 코드에서 쓰기

- **설치**: `npm install @caffeinecatkr/blurssism` (GitHub: leeuc10/blurssism). CDN은 `https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/`.
- **React (Vite·Next.js 등)**: `import { Button, Dialog } from "@caffeinecatkr/blurssism"`와 `import "@caffeinecatkr/blurssism/tokens.css"`, `import "@caffeinecatkr/blurssism/bundle.css"`. Next.js App Router의 서버 컴포넌트에서도 바로 import할 수 있습니다. 빌드 도구가 없으면 React UMD 다음에 `dist/bundle.js`를 불러 `window.Blurssism`으로 씁니다. 컴포넌트는 26개입니다.
  - 행동: `Button`, `IconButton`
  - 입력: `TextField`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Chip`, `SegmentedControl`, `Calendar`
  - 콘텐츠: `Card`, `MediaCard`, `ListItem`, `Table`, `Avatar`, `Icon`
  - 상태: `Badge`, `Progress`, `Skeleton`, `EmptyState`
  - 탐색·오버레이: `NavBar`, `TabBar`, `Sheet`, `Dialog`, `Toast`, `Tooltip`
  - 유틸리티: `applyGlassPreference()`, `shouldReduceGlass()`

  각 props는 `dist/index.d.ts`에 있습니다. 앱 루트에 `class="bl-root"`를 둡니다.
- **React 없이(HTML·Vue·Svelte 등)**: `dist/tokens.css`와 `dist/bundle.css`만 불러와 같은 클래스(`bl-btn bl-btn-primary`, `bl-glass`, `bl-list` …)를 씁니다.
- **Tailwind**: 색·간격·모서리를 `theme.extend`에 `var(--토큰)`으로 연결하고, 유리는 `.bl-glass` / `.bl-glass-thick` 유틸리티 클래스로 씁니다.
- **네이티브 앱(SwiftUI·Compose·Flutter)**: `dist/tokens.json`의 값을 그대로 옮깁니다. 얇은 유리는 플랫폼 기본 재질(iOS `.ultraThinMaterial` / Liquid Glass, Android `RenderEffect` blur)에 `glass-fill`을 겹칩니다.
- 다크 모드는 `<html data-theme="dark">`로 전환합니다.
- 실제 조합 예시는 `AppScreen`(모바일 설정 화면)과 `WebLanding`(웹 랜딩) 카드를 참고합니다.

---

blurssism · made by **caffeinecat**
