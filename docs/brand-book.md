blurssism은 웹과 앱 어디에나 쓰는 범용 디자인 시스템입니다. **글래스모피즘과 블러 효과의 조합**이 핵심으로, 따뜻한 종이와 먹으로 된 차분한 바탕 위에 우유 거품 색 젖빛 크레마 **블러레마(Blurema)**를 필요한 곳에만 띄웁니다. 유리 표현은 Apple Liquid Glass와 Samsung One UI에서 영감을 받았지만, 맑고 반짝이는 유리 대신 캐러멜빛 띠가 얹힌 젖빛 면으로 바꿨고, 색은 **카페인**에서 가져왔습니다. 우유 거품 같은 크림색 바탕, 에스프레소 같은 글자, 볶은 원두와 크레마의 강조색이 기본이고, 팔레트 13종이나 브랜드색 하나로 만든 팔레트로 바꿀 수 있습니다. 원칙은 세 가지입니다. **바탕은 조용하게, 떠 있는 것만 크레마로, 강조는 한 번만.**

## 원칙

1. **90 / 10.** 화면 면적의 90% 이상은 `paper` 계열과 `ink` 계열입니다. `accent`, `positive`, `deco` 같은 색은 합쳐서 10%를 넘지 않습니다.
2. **크레마는 떠 있는 것에만.** 내비게이션 바, 탭바, 시트, 토스트, 이미지 위 캡션처럼 콘텐츠 *위에 떠 있는* 요소만 크레마입니다. 본문 카드, 입력창, 리스트는 불투명한 `paper-raised`입니다. 크레마 위에 크레마를 겹치지 않습니다.
3. **화면당 행동 하나.** `primary`(또는 `accent`) 버튼은 한 화면에 하나만 둡니다. 나머지는 `ghost`입니다.
4. **사람의 문장은 명조로.** 인용, 사용자가 쓴 글, 큰 이름은 `serif`(Blurssism Serif). 그 밖의 모든 UI는 `sans`(Blurssism Sans)입니다.
5. **캡슐과 큰 모서리.** 누를 수 있는 것은 모두 `radius-full` 캡슐이고, 담는 것은 `radius-lg`(24px) 이상입니다.

## 글쓰기

- **해요체**를 씁니다. "저장했어요", "다시 시도해 주세요". 합니다체나 반말은 쓰지 않습니다. 이 규칙은 화면에 나오는 UI 문구(버튼, 안내, 오류, 빈 화면) 기준입니다. 이 브랜드북 같은 개발 문서는 합니다체로 씁니다.
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
| 크레마 | `crema-fill`, `crema-fill-strong`, `crema-stroke`, `crema-tint-accent`, `crema-ink-muted`, `scrim`, 재질 `crema-edge`·`crema-band`·`crema-grain`·`crema-light` | 아래 "크레마 재질 — 블러레마" 참고. 두꺼운 크레마 위 보조 글자는 `ink-muted` 대신 `crema-ink-muted`. |

다크 테마는 같은 이름의 토큰이 값만 바뀝니다. 코드에서는 hex를 직접 쓰지 말고 항상 `var(--토큰)`을 씁니다.

## 팔레트

강조색 묶음(`accent`, `accent-soft`, `on-accent`, `accent-ink`, `crema-tint-accent`)과 장식색(`deco`)만 바뀌고, 바탕·글자·상태색은 모든 팔레트에서 같습니다. `<html data-palette="matcha">`처럼 고르고, 지정하지 않으면 에스프레소입니다.

**카페인 6종**

| id | 이름 | 느낌 | 라이트 accent | 다크 accent |
| --- | --- | --- | --- | --- |
| `espresso` | 에스프레소 (기본) | 볶은 원두의 갈색과 크레마 | `#7a4524` | `#e2ab7a` |
| `matcha` | 말차 | 녹차의 차분한 초록 | `#3e6b35` | `#a3d48f` |
| `chai` | 차이 | 향신료 밀크티의 주황 | `#9a4512` | `#f2a66a` |
| `coldbrew` | 콜드브루 | 차갑게 우린 커피의 깊은 남색 | `#2b4c74` | `#9cc1ea` |
| `mocha` | 모카 | 초콜릿과 장미빛 코코아 | `#7c3a46` | `#e8a5b0` |
| `classic` | 클래식 | 1.2까지의 자두색 | `#7a3b69` | `#e0a6cf` |

**웹 기본 7종** — 커피와 상관없이 웹에서 자주 쓰는 색을 크림 바탕에 맞게 채도를 낮추고 깊이를 맞췄습니다.

| id | 이름 | 느낌 | 라이트 accent | 다크 accent |
| --- | --- | --- | --- | --- |
| `blue` | 블루 | 링크와 버튼에서 가장 익숙한 파랑 | `#1d5bb8` | `#8eb9f5` |
| `indigo` | 인디고 | SaaS와 개발 도구에서 흔한 남보라 | `#4a3fb5` | `#aaa6f4` |
| `violet` | 바이올렛 | 창작 도구와 커뮤니티의 보라 | `#7038a8` | `#cfa6f2` |
| `teal` | 틸 | 헬스케어와 핀테크의 청록 | `#0e6b66` | `#78d0c4` |
| `emerald` | 에메랄드 | 결제와 성장 서비스의 선명한 초록 | `#13704a` | `#7fd6a5` |
| `pink` | 핑크 | 커머스와 뷰티의 분홍 | `#b0306a` | `#f49ac0` |
| `graphite` | 그래파이트 | 색 없이 먹색 하나로 쓰는 단색 | `#3b3632` | `#e2dbd2` |

**브랜드색으로 만들기** — 쓸 색 하나를 넣으면 그 색에 맞춰 강조색 묶음(`accent`·`accent-soft`·`on-accent`·`accent-ink`·`deco`·`crema-tint-accent`)을 라이트·다크 모두 만듭니다. 바탕과 글자, 상태색은 그대로라 90/10 원칙이 유지됩니다.

```js
import { applyBrandColor } from "@caffeinecatkr/blurssism/utils";
const p = applyBrandColor("#ff5a1f");      // <style>을 넣고 <html data-palette="brand">로 바꿉니다
p.warnings.forEach((w) => console.warn(w.message));
```

- 흰 글자가 4.5:1을 못 넘는 밝은 색은 라이트 테마에서 필요한 만큼만 어둡게 맞추고, 원래 색은 장식색(`deco`)으로 남깁니다. 다크 테마에서는 밝고 조금 차분하게 맞춥니다.
- 빨강·노랑·초록처럼 상태색과 헷갈리는 색, 채도가 거의 없는 색이면 `warnings`로 알려 줍니다.
- 서버 렌더링: `createPalette(색)`과 `paletteToCss(팔레트)`로 CSS 문자열을 만들어 `<style>`에 넣습니다. 터미널에서는 `npx @caffeinecatkr/blurssism palette "#ff5a1f"`로 CSS를 출력합니다.
- id를 주면 여러 개를 둘 수 있습니다: `applyBrandColor("#03c75a", { id: "green" })`. 만든 id는 `setPalette`로도 고를 수 있습니다.

- 모든 팔레트 × 라이트·다크에서 글자 대비 4.5:1, 조작 요소 3:1 이상입니다. 저장소의 `npm run check`가 팔레트 13종과 브랜드색 133개로 만든 팔레트를 16,644개 조합으로 검사합니다. 불투명한 바탕 7,884개와, 크레마 위 글자 8,760개(뒤가 완전한 검정·흰색인 최악의 경우, 데스크톱 모드 포함)입니다.
- 한 화면에는 팔레트 하나. 섹션마다 팔레트를 바꾸지 않습니다. 예외는 팔레트 고르기 화면처럼 팔레트 자체를 보여 줄 때뿐입니다.
- 사용자에게 고르게 하려면 `PalettePicker`를 쓰고, 선택은 소비자가 저장해 다음 방문 때 `setPalette(id)`로 복원합니다.
- 상태색(`positive`·`warning`·`danger`·`info`)은 팔레트와 상관없이 고정이라, 말차·에메랄드의 초록과 `positive`, 블루와 `info`가 비슷해 보여도 의미는 단어와 아이콘으로 구분합니다.
- 노랑과 빨강은 `warning`·`danger`와 헷갈려서 팔레트로 두지 않습니다. 브랜드색이 노랑이면 `deco`로만 쓰세요.
- `graphite`는 강조색 없이 먹색으로만 꾸미는 단색 팔레트입니다. 색이 브랜드를 대신하지 않는 도구형 화면에 맞습니다.
- `PalettePicker group="web"`처럼 한 묶음만 보일 수 있습니다.

## 크레마 재질 — 블러레마(Blurema)

블러레마는 **blur + crema**, blurssism의 떠 있는 면을 만드는 재질입니다. 맑게 비치고 반짝이는 유리 대신, 에스프레소 위 크레마처럼 따뜻하고 부드러운 젖빛 면입니다. 이 재질로 만든 면을 **크레마**라고 부릅니다(얇은 크레마, 크레마 모드 등). 1.5부터 코드 이름도 crema입니다(`.bl-crema`, `data-crema`, `applyCremaPreference`). 1.4까지의 glass 이름은 2.0까지 별칭으로 그대로 동작합니다(아래 "이름 바꾸기"). 다섯 층을 겹칩니다.

| 층 | 토큰 | 하는 일 |
| --- | --- | --- |
| 1. 블러 | `blur-md`·`blur-lg`, `crema-saturate` 125% | 뒤를 번지게 합니다. 채도는 조금만 올려 쨍하지 않게 둡니다. |
| 2. 우유 거품 색 | `crema-fill`, `crema-fill-strong` | 흰색이 아니라 `paper`(크림색)가 비치는 면입니다. |
| 3. 거품 결 | `crema-grain` | 눈에 보이는 고운 정지 노이즈. 크레마를 액체가 아니라 거품처럼 보이게 합니다. 정지 이미지라 성능 부담이 거의 없습니다. |
| 4. 크레마 띠 | `crema-band` | 에스프레소 잔을 옆에서 본 크레마처럼, 면 위쪽 가장자리에 캐러멜빛이 조금 더 고이고 아래로 옅어지면서 **면 전체에 고르게 남습니다**(1.6부터. 이전에는 위쪽에만 몰려 있었습니다). 팔레트의 `deco`와 `accent`를 섞은 색(`--crema-tint`)이고, 세기는 `crema-band-top`·`lip`·`mid`·`low`가 정합니다. 블러레마를 다른 크레마와 구별하는 가장 큰 표시입니다. |
| 5. 크레마 가장자리 | `crema-edge` (`shadow-crema`의 안쪽 선) | 흰 반사광 대신 `deco`가 섞인 따뜻한 1px 선입니다. |

크레마 띠와 가장자리는 팔레트를 따라 색이 바뀝니다(말차면 녹차 거품빛, 블루면 하늘빛). 다크에서는 `deco`를 더 많이 섞어(`crema-tint-mix` 90%) 띠가 밝은 글자를 가리지 않게 합니다. `color-mix`를 지원하지 않는 브라우저에서는 에스프레소 기본값으로 보입니다.

두께는 두 가지입니다.

- **얇은 크레마** (`.bl-crema`): `crema-fill` + `blur-md` + `shadow-crema`. 탭바, 내비게이션 바, 이미지 위 캡션, 떠 있는 아이콘 버튼. **짧은 라벨만, 글자색은 `ink`만** 올립니다. 뒤가 검정이든 흰색이든 4.5:1 이상입니다. 보조 글자(캡션의 메타 정보 등)도 `ink`로 쓰고 크기로 위계를 줍니다.
- **두꺼운 크레마** (`.bl-crema-thick`): `crema-fill-strong` + `blur-lg` + `shadow-sheet`. 바텀시트, 토스트, 다이얼로그처럼 **글이 길어지는 패널**. 배경이 무엇이든 `ink`와 `crema-ink-muted` 글자가 4.5:1 이상 유지됩니다. `ink-muted`는 쓰지 않습니다.
- 크레마 안에 든 아이콘 버튼은 블러를 다시 걸지 않습니다(뒤가 이미 흐려져 있어 차이가 없고 예산만 씁니다).

규칙:
- 크레마 뒤에는 반드시 비쳐 보일 무언가(스크롤되는 콘텐츠, 이미지, 색 면)가 있어야 합니다. 단색 바탕 위의 크레마는 그냥 크림색 상자입니다.
- 반사광을 흰 그라디언트나 굴절 효과로 흉내 내지 않습니다. 빛은 크레마 가장자리 한 줄과, 데스크톱 모드의 따뜻한 빛뿐입니다.
- `backdrop-filter`를 지원하지 않거나 사용자가 `prefers-reduced-transparency: reduce`를 켜면 `paper-raised`로 대체합니다(bundle.css에 들어 있습니다).
- 시트·모달 뒤에는 `scrim`만 깝니다. 다이얼로그 본체가 이미 블러라, 뒤에 블러를 한 번 더 걸지 않습니다.

## 이름 바꾸기 (1.5)

1.5부터 코드 이름이 glass에서 crema로 바뀌었습니다. 옛 이름은 **2.0까지 그대로 동작**합니다.
- 옛 클래스·속성은 같은 규칙에 함께 붙어 있습니다.
- 옛 변수(`--glass-*`)에 값이 있고 새 변수(`--crema-*`)가 그 값을 읽습니다. 그래서 `--glass-fill`을 덮어써도, `--crema-fill`을 덮어써도 컴포넌트에 반영됩니다(1.5.0에서는 옛 변수를 덮어써도 반영되지 않았습니다. 1.6에서 고쳤습니다). 1.4의 `--crema`(띠 색)는 `--crema-tint`가 읽습니다.
- 컴포넌트는 새 클래스와 옛 클래스를 함께 붙여서, `.bl-glass`에 걸어 둔 CSS 덮어쓰기도 계속 맞습니다.
- 옛 함수와 `variant="glass"`는 개발 중에 콘솔에 한 번만 새 이름을 알려 줍니다. 화면에 남은 `.bl-glass`·`data-glass`는 `auditCrema()`가 찾아 줍니다.

새 코드는 오른쪽 이름으로 씁니다.

| 1.4까지 (2.0에서 제거) | 1.5부터 |
| --- | --- |
| `.bl-glass` · `.bl-glass-thick` · `.bl-glass-lite` | `.bl-crema` · `.bl-crema-thick` · `.bl-crema-lite` |
| `.bl-btn-glass`, `variant="glass"` | `.bl-btn-crema`, `variant="crema"` |
| `<html data-glass="off\|on\|rich">` | `<html data-crema="off\|on\|rich">` |
| `applyGlassPreference()` · `setGlassMode()` · `getGlassMode()` · `shouldReduceGlass()` | `applyCremaPreference()` · `setCremaMode()` · `getCremaMode()` · `shouldReduceCrema()` |
| `GlassMode` · `GlassOptions` (타입) | `CremaMode` · `CremaOptions` |
| `--glass-fill` · `--glass-fill-strong` · `--glass-stroke` · `--glass-tint-accent` | `--crema-fill` · `--crema-fill-strong` · `--crema-stroke` · `--crema-tint-accent` |
| `--glass-edge` · `--glass-crema` · `--glass-grain` · `--glass-light` | `--crema-edge` · `--crema-band` · `--crema-grain` · `--crema-light` |
| `--shadow-glass` · `--glass-saturate` | `--shadow-crema` · `--crema-saturate` |

## 다른 디자인 시스템과 다른 점

| | blurssism | 흔한 방식 |
| --- | --- | --- |
| 크레마 | 블러레마: 크림색 젖빛 + 거품 결 + 팔레트를 따라가는 캐러멜빛 띠 | 맑은 유리와 흰 반사광(Apple Liquid Glass), 중립 회색 아크릴(Fluent), 유리 없이 색 높이로 층 구분(Material) |
| 크레마 사용량 | 규칙으로 정한 예산(화면당 3개, 데스크톱 6개)과 기기별 자동 3단계(끄기·기본·데스크톱) | 크레마를 어디에 몇 개 쓸지는 앱이 판단 |
| 브랜드색 | 색 하나를 넣으면 강조색 묶음만 만들고 바탕 90%는 그대로. 라이트·다크 모두 WCAG 대비를 맞추고, 상태색과 헷갈리는 색은 경고 | 색 하나로 화면 전체 톤을 바꾸는 방식(Material의 다이내믹 컬러), 또는 직접 조합 |
| 검증 | `npm run check`가 팔레트 13종과 브랜드색 133개로 16,644개 대비 조합(크레마 위 글자 포함)을 매번 검사, 개발 중에는 `auditCrema()`가 블러 예산과 primary 개수를 셈 | 문서로 기준만 안내 |
| 언어 | 한국어 화면 기준: Blurssism Sans·Serif, 해요체, `keep-all` 줄바꿈 | 영어 기준, 한국어는 따로 조정 |
| 쓰는 곳 | 하나의 원본에서 React·Svelte 5·CSS만 | 프레임워크 하나에 묶임 |

## 성능 — 블러 예산

블러(`backdrop-filter`)는 GPU를 많이 씁니다. 다음 예산을 지킵니다.

- **한 화면(뷰포트)에 크레마는 3개까지.** 보통 NavBar + TabBar + (Sheet·Dialog·Toast 중 하나).
- **반복되는 목록 안에는 블러를 넣지 않습니다.** 피드·갤러리의 MediaCard는 `lite`(블러 없는 `.bl-crema-lite`)로, 블러는 상세 화면의 한 장에만 씁니다.
- **블러 반경을 애니메이션하지 않습니다.** 크레마는 `opacity`와 `transform`으로만 나타나고 사라집니다.
- **화면 전체를 덮는 블러는 잠깐만.** `blur-lg`는 시트·다이얼로그처럼 떠 있다 사라지는 요소에, 상시 노출되는 넓은 면에는 `blur-md` 이하.
- **기기에 맞춰 세 단계로 바꿉니다.** 앱 시작 시 `applyCremaPreference()`를 한 번 부르면 `<html data-crema>`가 정해집니다.
- **개발 중에는 세어 봅니다.** `auditCrema()`를 켜 두면 화면이 바뀔 때마다 보이는 블러 면을 세어, 예산을 넘거나 primary 버튼이 둘 이상이면 콘솔에 알려 줍니다(배포 빌드에서는 아무것도 하지 않습니다). 한 번만 보려면 `checkCrema()`.

| 모드 | 언제 | 무엇이 달라지나 | 블러 예산 |
| --- | --- | --- | --- |
| `off` | 메모리 4GB 미만(2GB 이하), 그런 브라우저에서 코어 4개 미만, 데이터 절약, 투명도 줄이기 | 모든 크레마가 불투명 | 0 |
| `on` (기본) | 그 밖의 기기, 모바일 | 블러레마 기본 | 화면당 3개 |
| `rich` (데스크톱 모드) | lg(1120px) 이상 화면 + 마우스 + 코어 6개·메모리 8GB 이상 | 블러 40/64px(기본의 약 1.7배), 라이트에서 조금 더 비치는 크레마, 두 겹 그림자, 포인터를 따라오는 캐러멜빛(`crema-light`, 포인터가 없으면 왼쪽 위에서 빛), 크레마 버튼 호버 시 떠오름 | 화면당 6개 |

- **데스크톱 모드는 개발자가 켜고 끕니다.** 기본은 `"auto"`(조건이 맞으면 켬, 창 크기가 바뀌면 다시 판단)입니다.
  - 끄기: `applyCremaPreference({ rich: false })`
  - 항상 켜기: `applyCremaPreference({ rich: true })`
  - 빛만 끄기: `applyCremaPreference({ pointerLight: false })`
  - 바로 정하기: `setCremaMode("off" | "on" | "rich" | "auto")`, 지금 모드는 `getCremaMode()`
  - CSS만 쓸 때는 `<html data-crema="rich">`를 직접 넣어도 됩니다(포인터 빛은 JS가 필요합니다).
  - 동작 줄이기 설정이면 포인터 빛은 자동으로 꺼집니다. 사용자 설정 화면에 "크레마 효과" 토글로 `setCremaMode`를 연결해도 좋습니다.
- 저사양 기준은 `applyCremaPreference({ minMemory: 4, minCores: 4 })`로 바꿀 수 있습니다. 코어 수는 메모리를 알려 주는 브라우저(Chromium)에서만 봅니다. Safari는 코어 수를 줄여서 알려 주기 때문입니다.
- `backdrop-filter`를 지원하지 않는 브라우저는 자동으로 `paper-raised`로 대체됩니다.

## 타이포그래피

- `sans`: Blurssism Sans → 시스템 산세리프(Apple SD Gothic Neo, 맑은 고딕).
- `serif`: Blurssism Serif → Noto Serif KR → 시스템 명조.
- 두 글꼴은 Pretendard와 Gowun Batang에서 KS X 1001 한글 2350자와 영문·숫자·기호만 남긴 사본입니다(SIL OFL, 예약 이름 때문에 이름을 바꿈). 2350자 밖의 드문 글자는 시스템 글꼴로 보입니다. 다시 만들 때는 `python3 scripts/subset-fonts.py`.
- 글꼴은 `fonts.css`가 jsDelivr에서 불러옵니다. 1.6부터 `tokens.css`·`bundle.css`는 글꼴을 불러오지 않으니 `fonts.css`를 함께 넣거나, CSP·사내망 때문에 CDN을 못 쓰면 `fonts.css` 대신 `fonts.local.css`를 불러옵니다. 패키지에 든 글꼴 파일(`dist/fonts/`)을 써서 따로 할 일이 없습니다(번들러가 파일을 함께 내보내고, 번들러가 없으면 `fonts.local.css`와 `fonts/` 폴더를 같이 올립니다).
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
| 내비게이션 | 하단 `TabBar` + 위 `NavBar`(제목·액션만) | 같음 (`TabBar` 유지, `NavBar` 링크는 숨김) | `NavBar` 링크, `TabBar`는 스스로 숨음(`hideFrom="lg"`) |
| 확인·선택 창 | 아래에서 올라오는 시트(`Dialog`가 자동으로 시트 모양) | 가운데 `Dialog` | 가운데 `Dialog` |
| 제목 크기 | `display` 32/40 · `title-1` 26/34 · `title-2` 20/28 (자동) | `display` 40/48 · `title-1` 30/38 · `title-2` 22/30 | 같음 |
| 카드 목록 | 1열 | 2열 | 3–4열 |
| 표 | 가로 스크롤, 14px, 좁은 칸 여백 | 15px | 15px |
| 주 행동 | 엄지 영역(화면 아래 절반), `block` 버튼 | 콘텐츠 흐름 안 | 콘텐츠 흐름 안, 오른쪽 정렬 |

**입력 방식**
- 터치 기기(`pointer: coarse`)에서는 누르는 영역이 최소 `touch-min`(44px)이 됩니다. 보이는 크기는 그대로 두고 보이지 않는 영역만 넓힙니다. 달력 날짜는 칸을 키웁니다(달력 폭 348px 이상일 때).
- 마우스 호버 효과는 `hover: hover`인 기기에서만 켭니다. 호버에만 의존하는 정보(툴팁의 유일한 설명 등)를 두지 않습니다.
- 가로 모드 폰은 너비로 sm이 되지만 높이가 낮습니다. 시트와 다이얼로그는 높이 90%를 넘지 않게 하고 안쪽을 스크롤합니다.

## 모서리와 그림자

- `radius-sm` 10 · `radius-md` 16 · `radius-lg` 24 · `radius-xl` 32 · `radius-full` 캡슐.
- 버튼·칩·스위치·탭바·내비게이션 바 = `radius-full`. 입력창·썸네일 = `radius-md`. 카드·패널·모달 = `radius-lg`. 바텀시트 위쪽 = `radius-xl`.
- 그림자는 세 개뿐입니다. 불투명 카드 `shadow-card`(거의 평면), 떠 있는 크레마 `shadow-crema`, 시트 `shadow-sheet`. 그 밖의 그림자는 만들지 않습니다. 데스크톱 모드가 더하는 그림자는 `shadow-crema-rich`·`shadow-crema-rich-hover`·`shadow-sheet-rich`(다크에서는 검정 기반)입니다.

## 움직임

- 누를 때 `scale(0.97)`, 120ms.
- 크레마 패널·시트는 아래에서 올라오며 260ms `cubic-bezier(.2,.8,.2,1)`. 스위치 손잡이는 살짝 튕깁니다(`cubic-bezier(.3,1.4,.5,1)`).
- `prefers-reduced-motion: reduce`에서는 이동 없이 투명도만 바꿉니다. 누를 때 줄어들기, 스위치 튕김, 진행 막대 전환, 데스크톱 모드의 떠오름, 포인터 빛도 끕니다.

## 상태와 접근성

- 포커스: `focus-ring` 2px 실선, 2px 간격. 모든 바탕과 크레마 위에서 3:1 이상입니다. `outline: none`만 남기지 않습니다.
- 비활성: `paper-sunken` 바탕 + `ink-subtle` 글자.
- 선택: `accent-soft` 바탕 + `accent-ink` 글자 + 굵기·밑줄·체크 중 하나 이상 (색만으로 구분하지 않음). 크레마 위의 선택 표시(탭, 내비게이션 링크)도 반투명 틴트가 아니라 불투명한 `accent-soft`를 씁니다.
- 고대비(강제 색상) 모드: 선택·켜짐 상태를 시스템 색(`Highlight`)으로 다시 그립니다. 대비 높이기(`prefers-contrast: more`)에서는 크레마가 불투명해집니다.
- 오류: `danger` 테두리 + "오류:"로 시작하는 문구.
- 아이콘만 있는 버튼에는 반드시 `aria-label`.

## 아이콘

- 24×24 그리드, 1.75px 선, 둥근 끝과 이음의 라인 아이콘. 색은 `currentColor`.
- 기본 14종은 `Icon` 컴포넌트에 들어 있습니다. 더 필요하면 같은 규칙의 **Lucide**(`strokeWidth={1.75}`)를 씁니다.
- 채운 아이콘은 선택·눌림 상태에만 씁니다. 이모지를 아이콘 대신 쓰지 않습니다.

## 로고와 표식

- **blurssism 마크** (`logos/blurssism-mark.svg`, 다크 바탕용 `blurssism-mark-dark.svg`): 에스프레소색 원 위에 반투명 크레마 판이 겹쳐 그 아래가 흐려지는 모양으로, 시스템의 원칙 "떠 있는 것만 크레마로"를 그대로 그렸습니다. 최소 크기 24px, 주변 여백은 마크 높이의 1/4.
- **워드마크**: 마크 오른쪽에 `space-2` 간격으로 "blurssism"을 `--font-serif` 700, 자간 −0.02em, 소문자로 씁니다. 글자는 이미지로 굳히지 않고 실제 글자로 둡니다.
- **caffeinecat 표식** (`logos/caffeinecat-mark.svg`, 다크용 `caffeinecat-mark-dark.svg`): 이 시스템을 만든 caffeinecat의 서명입니다. 커피콩 눈을 한 고양이 얼굴. 푸터나 크레딧에 `caption` 크기 글자 "made by caffeinecat"과 함께 16–24px로 둡니다. 제품 로고 자리에 쓰지 않습니다.
- 마크 색을 바꾸거나, 늘리거나, 그림자·그라디언트를 더하지 않습니다. 바탕이 어두우면 `-dark` 파일을 씁니다.

## 코드에서 쓰기

- **설치**: `npm install @caffeinecatkr/blurssism` (GitHub: leeuc10/blurssism). CDN은 `https://cdn.jsdelivr.net/npm/@caffeinecatkr/blurssism/dist/`.
- **React (Vite·Next.js 등)**: `import { Button, Dialog } from "@caffeinecatkr/blurssism"`와 `import "@caffeinecatkr/blurssism/fonts.css"`, `import "@caffeinecatkr/blurssism/tokens.css"`, `import "@caffeinecatkr/blurssism/bundle.css"`. Next.js App Router의 서버 컴포넌트 파일에서도 그릴 수 있지만, `onClick`·`render` 같은 함수 props는 `"use client"` 파일 안에서 넘깁니다. 빌드 도구가 없으면 React UMD 다음에 `dist/bundle.js`를 불러 `window.Blurssism`으로 씁니다. Svelte 5는 `import { Button } from "@caffeinecatkr/blurssism/svelte"`(바인딩·스니펫 지원). 컴포넌트는 29개입니다.
  - 행동: `Button`, `IconButton`
  - 입력: `TextField`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Chip`, `SegmentedControl`, `Calendar`, `PalettePicker`
  - 레이아웃: `Container`, `Grid`
  - 콘텐츠: `Card`, `MediaCard`, `ListItem`, `Table`, `Avatar`, `Icon`
  - 상태: `Badge`, `Progress`, `Skeleton`, `EmptyState`
  - 탐색·오버레이: `NavBar`, `TabBar`, `Sheet`, `Dialog`, `Toast`, `Tooltip`
  - 유틸리티: `setPalette()`, `getPalette()`, `palettes`, `setTheme()`, `getTheme()`, `useBreakpoint()`(React) / `breakpoint()`(Svelte), `getBreakpoint()`, `isAtLeast()`, `onBreakpointChange()`, `breakpoints`, `applyCremaPreference()`, `setCremaMode()`, `getCremaMode()`, `isDesktopCapable()`, `shouldReduceCrema()`, `createPalette()`, `applyBrandColor()`, `paletteToCss()`, `contrastRatio()`. 프레임워크 없이는 `@caffeinecatkr/blurssism/utils`.

  각 props는 `dist/index.d.ts`에 있습니다. 앱 루트에 `class="bl-root"`를 둡니다.
- **CSS만(HTML·Vue 등)**: `dist/fonts.css`, `dist/tokens.css`, `dist/bundle.css`만 불러와 같은 클래스(`bl-btn bl-btn-primary`, `bl-crema`, `bl-list` …)를 씁니다.
- **Tailwind**: `tailwind.config.js`에 `presets: [require("@caffeinecatkr/blurssism/tailwind")]`를 넣고 `tokens.css`를 함께 불러옵니다. 크레마는 `.bl-crema` / `.bl-crema-thick` 클래스로 씁니다.
- **네이티브 앱(SwiftUI·Compose·Flutter)**: `dist/tokens.json`의 값을 그대로 옮깁니다. 얇은 크레마는 플랫폼 블러(iOS `.ultraThinMaterial`, Android `RenderEffect` blur) 위에 `crema-fill`과 위쪽 크레마 그라디언트를 겹쳐 블러레마에 가깝게 맞춥니다.
- 다크 모드는 `<html data-theme="dark">`, 팔레트는 `<html data-palette="matcha">`로 전환합니다.
- 실제 조합 예시는 `AppScreen`(모바일 설정 화면), `WebLanding`(웹 랜딩), `Palettes`(팔레트 13종), `Blurema`(크레마 층과 모드), `BrandColor`(브랜드색 팔레트), `Responsive`(반응형 규칙) 카드를 참고합니다.

---

blurssism · made by **caffeinecat**

## 문의

질문, 제안, 협업 문의는 **leeunchan10@gmail.com**(caffeinecat)으로 보내 주세요. 버그는 [GitHub 이슈](https://github.com/leeuc10/blurssism/issues)에 남겨 주시면 가장 빨리 볼 수 있어요.
