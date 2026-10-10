# Changelog

## 2.0.0 — 2026-10-10

> **올리기 전에 확인할 것 / Before upgrading**
> - `primary` 버튼이 `ink` 채움에서 **강조색(`accent`) 채움**으로 바뀌었어요. 블랙 팔레트(기본)는 그대로 검정이고, 에스프레소·말차 같은 팔레트에서는 primary 버튼이 그 색이 돼요. `variant="accent"`는 primary의 별칭이라 그대로 동작해요(같은 클래스 `bl-btn-primary`). / `primary` buttons are now filled with `accent`; `accent` is an alias of `primary`.
> - 타입 클래스에 `bl-` 접두어가 붙었어요: `.body` → `.bl-body`, `.title-1` → `.bl-title-1`, `.label` → `.bl-label` 등. 접두어 없는 이름은 소비자 CSS(`.label`, `.body`)와 충돌했어요. / Type classes are prefixed: `.bl-body`, `.bl-title-1`, …
> - 데스크톱 모드의 포인터를 따라오는 빛이 **기본으로 꺼져요**. 켜려면 `applyCremaPreference({ pointerLight: true })`. 리치 블러는 40/64px에서 32/48px로. / Pointer light is opt-in; rich blur is 32/48px.
> - 블랙 팔레트의 `accent-ink`(링크·활성 글자)가 검정에서 캐러멜빛(`#653819`, 다크 `#e2ab7a`)으로 바뀌었어요. 본문 `ink`와 같은 색이라 링크가 구분되지 않던 문제예요. / The black palette's `accent-ink` is now caramel so links differ from body text.
> - 1.4의 glass 이름이 **제거**됐어요: `.bl-glass*`·`.bl-btn-glass`·`variant="glass"`·`data-glass`·`--glass-*`·`--crema`(띠 색)·`applyGlassPreference()`·`setGlassMode()`·`getGlassMode()`·`shouldReduceGlass()`·`GlassMode`·`GlassOptions`·팔레트 값의 `glass-tint-accent`. 1.5부터 예고한 대로예요. crema 이름으로 바꾸고, 남은 쓰임새는 `auditCrema()`가 `legacy-glass`로 찾아 줘요. / The 1.4 glass names are removed; `auditCrema()` reports leftovers.

**정리 / Cleanup**
- glass 별칭을 걷어내서 `dist/bundle.css`의 복제 선택자 104개와 `tokens.css`의 이중 변수 선언이 사라졌어요. / Removing the aliases drops 104 duplicated selectors and the double variable declarations.

**왜 2.0인가 / Why 2.0**
- 1.6.x에서 기본 팔레트·글꼴·TabBar 동작 같은 보이는 변경이 마이너·패치 릴리스로 나갔어요. 2.0부터는 보이는 변경은 메이저에서만 해요. / Visible changes now ship only in major releases.

**색 역할 / Color roles**
- 블랙 팔레트에서 `ink`(본문)·`accent`(채움)·`accent-ink`(링크)가 사실상 한 색이라 primary 버튼과 accent 버튼이 구분되지 않고 링크 어포던스가 사라졌어요. primary를 accent 채움으로 합치고, `accent-ink`를 캐러멜빛으로 분리했어요. 대비 검사 108,550개 조합 그대로 통과.

**블러레마 / Blurema**
- 크레마가 흐린 유리가 아니라 매트한 황갈색 판으로 읽히던 문제. 거품 결 알파 .46→.26(다크 .24→.16), 크레마 띠 세기 42/26/16/10 → 30/18/10/6%(다크 30/16/10/7 → 24/13/8/5%), 채움 틴트 20→12%(다크 12→10%). / Lighter grain, band and tint so crema reads as frosted glass.
- 갤러리의 팔레트 선택 패널이 평평한 바탕 위의 크레마였어요(원칙 2 위반). 불투명 카드로 바꿨어요.

**타이포그래피 / Typography**
- 타입 스케일이 변수로 나와요: `--text-{이름}-size`·`-line`·`-weight`·`-tracking`(이름: display·title-1·quote·title-2·title-3·body·body-strong·body-sm·label·caption). 컴포넌트 CSS의 하드코딩 px 43곳이 이 변수를 읽어서, `:root { --text-body-size: 17px }`처럼 덮어쓰면 입력창·카드까지 함께 바뀌어요. md 미만에서 제목이 줄어드는 규칙도 변수를 바꾸는 방식이라 MediaCard·Dialog 제목이 함께 줄어요. Tailwind 프리셋의 `fontSize`도 같은 변수를 읽어요. / Type scale is now variables; components read them.

**React**
- `Button`·`IconButton`·`Chip`·`TextField`(ref는 `<input>`)·`Select`(`<select>`)·`Checkbox`(`<input>`)·`Switch`·`RadioGroup`·`ListItem`·`Container`·`Grid`가 `forwardRef`예요. react-hook-form의 `register`, 프로그램적 포커스가 돼요. `displayName`도 붙어요. / These components forward refs.

**성능 / Performance**
- 포인터 빛을 켰을 때도 포인터에서 420px 안에 있는 크레마 면만 매 프레임 다시 칠하고, 멀어진 면은 한 번만 화면 밖으로 보내요. 전에는 화면의 모든 블러 면에 매 프레임 인라인 속성을 써서 전부 다시 칠해졌어요.
- 저사양 판정에 `(update: slow)`(전자잉크 등)를 더했어요. 메모리를 알려 주지 않는 Safari·Firefox에서는 여전히 `prefers-reduced-transparency`·데이터 절약·`update: slow`만 자동으로 잡히고, 나머지는 `setCremaMode("off")`로 앱이 정해요.
- 브랜드북의 "거품 결은 성능 부담이 거의 없다"는 문장을 지웠어요. 측정한 적이 없고, blend-mode와 함께 칠해지는 층이라 블러 예산 안에서 세는 게 맞아요.

## 1.6.3 — 2026-10-08

**블러레마 / Blurema**
- 다크 모드 거품 결이 팔레트(브랜드 팔레트 포함)를 따라 물들어요. 결 위에 팔레트 장식색 층을 `color` 블렌드로 얹어 밝기는 그대로 두고 색조만 바꿔요. 세기는 새 토큰 `crema-grain-tint`(다크 40%, 라이트는 결이 배경을 따라가므로 0%). / Dark-mode foam grain now takes the palette's hue (`crema-grain-tint`).
- 화이트·그레이처럼 무채색에 가까운 배경에서 크레마가 탁하고 무겁게 보이던 문제를 고쳤어요. 바탕이 무채색일수록 채움을 `paper-raised` 쪽으로 밝혀 페이지보다 살짝 밝게 뜨고, 거품 결(최대 60% 옅게)·크레마 띠(최대 55% 옅게)·장식색 섞는 비율(최대 절반)을 줄여요. 크림 배경은 그대로예요. / Crema on neutral backgrounds (white, gray) is lighter and cleaner.
- 커버 예제의 유리판도 같은 채움·결·결 색조를 써요.
- 대비 검사 108,550개 조합 모두 통과(결 색조의 color 블렌드까지 계산).

## 1.6.2 — 2026-10-08

**적응형 블러레마 / Adaptive Blurema**
- 크레마의 우유 거품 채움(`crema-fill`·`crema-fill-strong`)과 거품 결(`crema-grain`)이 배경을 따라가요. 흰·회색 바탕에서는 무채색 크레마, 색 있는 바탕에서는 그 색조의 크레마가 되고, 크림 바탕(기본)은 전과 똑같아요. 크레마 띠·가장자리는 전처럼 팔레트를 따라가요. / The crema fill and foam grain now follow the background; cream (default) is unchanged.
- 크레마 채움이 팔레트(브랜드 팔레트 포함)의 장식색(`deco`)을 조금 머금어요. 말차면 녹차빛, 블루면 하늘빛, 핑크면 분홍빛이 살짝 돌아요. 세기는 새 토큰 `crema-fill-tint`(라이트 20%, 다크 12%)이고 0%면 1.6.1과 같아요. color-mix가 없는 브라우저는 전처럼 보여요. / The crema fill now takes on a little of the palette's deco color (`crema-fill-tint`).
- 다크에서도 장식색이 충분히 들어가도록, 혼자 유난히 밝던 클래식 팔레트의 다크 장식색을 `#c98a63`에서 `#a8735a`로, 브랜드색 팔레트의 다크 장식색 밝기 상한을 조금 낮췄어요(상대 휘도 0.25 → 0.2).
- 크레마 띠가 위 가장자리에서 곡선으로 옅어져요. 전에는 직선 두 개가 10px 지점에서 꺾여 그 자리가 선처럼 보였어요. 맨 위 세기(`crema-band-top`)도 라이트 50→42%, 다크 45→30%로 낮춰 가장자리에 띠가 따로 떠 보이지 않아요. / The crema band now eases out smoothly instead of kinking at 10px.
- 탭바·내비게이션의 선택 캡슐에 강조색 1px 테두리를 더했어요. 크레마가 팔레트 색을 머금어 `accent-soft` 캡슐과 가까워져도 구분돼요.
- 커버 예제의 유리판도 같은 채움·거품 결(`--crema-grain`)을 써서 헤더 크레마와 색이 맞아요. 그래파이트 팔레트에서도 먹색 판을 회갈색으로 바꿔 강조색 판과 겹쳐 보이지 않아요.
- 채움 밝기는 기본 크레마보다 어두워지지(다크는 밝아지지) 않게 막아서, 뒤가 검정·흰색이어도 크레마 위 글자 대비를 지켜요. / Fill luminance is clamped so text-on-crema contrast holds.
- `data-background`(내장 배경)와 `applyBackgroundColor()`·`backgroundToCss()`가 크레마 값을 함께 넣어요. 새 함수 `backgroundCrema(배경)`, `createBackground()` 결과의 `values`에 크레마 값 추가. / New `backgroundCrema()`.
- 대비 검사에 배경 51종 × 팔레트 14종의 크레마 위 글자를 더해 108,550개 조합 모두 통과(크레마 위 글자 51,660개). / Contrast check: 108,550 pairs.

## 1.6.1 — 2026-10-08

> **올리기 전에 확인할 것 / Before upgrading**
> - 기본 팔레트가 에스프레소(갈색)에서 블랙(검정)으로 바뀌었어요. 전처럼 갈색을 쓰려면 `<html data-palette="espresso">` 또는 `setPalette("espresso")`. / The default palette is now `black`; add `data-palette="espresso"` to keep the previous brown.

- 새 팔레트 `black`(블랙, 카페인 묶음): 라이트 accent `#000000`, 다크 accent `#f2f2f2`. 장식색(`deco`)은 크레마빛이라 크레마 띠가 회색으로 탁해지지 않아요. 팔레트 14종. / New `black` palette, now the default.
- `getPalette()`, `PalettePicker`가 지정이 없을 때 `"black"`을 돌려주고 골라요. 타입 `PaletteId`에 `"black"` 추가. / `getPalette()` and `PalettePicker` default to `"black"`.
- 배경색을 바꿀 수 있어요. 내장 배경 `cream`(기본)·`white`·`gray`를 `<html data-background>` 또는 `setBackground()`로 고르고, 아무 색이나 `applyBackgroundColor("#hex")`로 넣으면 카드·눌린 면·구분선을 같은 색조로 만들고 글자와 모든 내장 팔레트가 읽히도록 바탕과 보조 글자색을 맞춰요. 서버 렌더링은 `backgroundToCss(createBackground(hex))`, 브랜드 팔레트와 함께 쓰면 `createPalette(color, { background })`. 새 함수 `backgrounds`·`setBackground`·`getBackground`·`createBackground`·`backgroundToCss`·`applyBackgroundColor`. / Configurable backgrounds: presets via `data-background`, any color via `applyBackgroundColor()`.
- 대비 검사에 배경 51종(내장 3 + 샘플 48)을 더해 65,682개 조합 모두 통과(불투명한 바탕 56,890개 + 크레마 위 글자 8,820개). / Contrast check now covers backgrounds: 65,682 pairs.
- 갤러리에 배경 고르기 추가, 예제는 `?background=`를 읽어요.
- 갤러리 헤더의 로고 마크가 지금 팔레트·배경을 따라 칠해지고, 커버는 블랙 팔레트에서 먹색 판을 `line-strong`으로 바꿔 검정 판과 겹쳐 보이지 않아요.
- 커버(`examples/components/Cover.html`)가 md(768px) 미만에서 그림 위·이름 아래로 쌓여요. 전에는 960px 그림을 통째로 줄여 한 줄 소개가 5px 안팎으로 작아졌어요.

## 1.6.0 — 2026-10-07

> **올리기 전에 확인할 것 / Before upgrading**
> - 글꼴을 `tokens.css`·`bundle.css`가 더 이상 불러오지 않아요. `import "@caffeinecatkr/blurssism/fonts.css"`(또는 `<link>`)를 한 줄 더하거나, CDN 없이 쓰려면 그 자리에 `fonts.local.css`를 불러오세요(패키지에 든 글꼴 파일을 씀). 글꼴 이름이 Blurssism Sans·Blurssism Serif로 바뀌었으니 `font-family`에 Pretendard·Gowun Batang을 직접 썼다면 `var(--font-sans)`·`var(--font-serif)`로 바꾸세요. / Fonts moved to `fonts.css` (CDN) or `fonts.local.css` (font files shipped in the package).
> - `TabBar`가 lg(1120px)부터 스스로 숨고, `NavBar` 링크는 lg부터 보여요(전에는 md부터). 계속 보이려면 `hideFrom={false}`. / TabBar hides from lg by default; NavBar links show from lg.
> - `Dialog`가 네이티브 `<dialog>`로 바뀌었어요. `className`은 이제 `<dialog class="bl-dialog">`에 붙어요. / Dialog renders a native `<dialog>`.
> - `TabBar`는 `role="tablist"` 대신 `<nav>` + `aria-current="page"`예요. `[aria-selected]`에 건 CSS는 `[aria-current="page"]`로 바꾸세요. / TabBar uses `<nav>` + `aria-current`.

**크레마 / Crema**
- 크레마 띠가 위쪽에만 몰리지 않고 면 전체에 옅게 남아요(`crema-band-top`·`lip`·`mid`·`low` 토큰으로 세기 조절). / The crema band now spreads across the whole surface instead of pooling at the top.
- 크레마 위 글자 대비를 뒤가 완전한 검정·흰색인 경우까지 검사해요(`npm run check`, 8,760개 조합 추가, 전체 16,644개). 이에 맞춰 채움 불투명도와 다크 띠 세기를 조정하고, 두꺼운 크레마용 보조 글자색 `crema-ink-muted`를 추가했어요. 얇은 크레마 위 글자(MediaCard 메타, 탭·내비게이션 링크)는 `ink`예요. / Text-on-crema contrast is now checked over worst-case backdrops; fills and the dark band were tuned and `crema-ink-muted` was added.
- 선택된 탭과 내비게이션 링크는 불투명한 `accent-soft` + 굵기 + 밑줄, 고른 팔레트는 체크 표시로 보여요(색만으로 알리지 않기). / Selected states no longer rely on color alone.
- 크레마 안의 아이콘 버튼, 다이얼로그 뒤 scrim, 숨어 있는 툴팁은 블러를 쓰지 않아요(블러 예산). / Nested icon buttons, the dialog scrim and hidden tooltips no longer use blur.
- 데스크톱 모드의 포인터 빛이 문서 전체가 아니라 크레마 요소에만 좌표를 써서, 스타일 재계산과 스크롤 때 다시 그리기가 줄었어요. 그림자는 새 토큰 `shadow-crema-rich`·`shadow-crema-rich-hover`·`shadow-sheet-rich`(다크는 검정 기반)를 써요. / Pointer light no longer restyles the whole document; rich-mode shadows are tokens now.
- 저사양 판정: 메모리 4GB 미만(전에는 4GB 이하)일 때 `off`, 코어 수는 메모리를 알려 주는 브라우저에서만 봐요. `applyCremaPreference({ minMemory, minCores })`로 바꿀 수 있어요. / Less aggressive low-end detection, now configurable.
- 새 함수 `auditCrema()`·`checkCrema()`: 개발 중 블러 예산 초과, primary 버튼 2개 이상, 남은 glass 이름을 알려 줘요. / New dev-time audit.

**고친 것 / Fixes**
- 1.4 변수(`--glass-fill` 등)를 덮어써도 반영되지 않던 문제(1.5.0). 이제 옛 변수에 값이 있고 새 변수가 그 값을 읽어요. 1.4의 `--crema`도 `--crema-tint`가 읽어요. / Overriding 1.4 `--glass-*` variables works again.
- Svelte 진입점·CommonJS·`/utils`가 utils 사본을 따로 들고 있어 브랜드 팔레트 등록과 크레마 모드 상태가 어긋나던 문제. 이제 모듈 하나(`dist/utils.mjs`, CJS는 `dist/utils.cjs`)를 같이 써요. / One shared utils module.
- `<html data-palette>` 안에 `<section data-theme="dark">`처럼 테마만 따로 걸면 팔레트가 에스프레소로 돌아가던 문제. 팔레트 영역 안의 크레마 그림자 가장자리 색도 팔레트를 따라가요. / Nested theme regions keep the palette.
- 투명도 줄이기 설정에서 크레마 버튼·아이콘 버튼의 블러가 남던 문제, `backdrop-filter` 미지원 브라우저의 버튼 대체. / Reduced transparency now covers buttons.
- `Dialog`: 크레마 안에서 열면 그 안에 갇히던 문제(네이티브 `showModal()`로 최상위 층), 뒤 화면 inert·스크롤 잠금, Esc가 처음 `onClose`를 부르던 문제, `alert`인데 바깥 클릭으로 닫히던 문제, 설명의 `aria-describedby`.
- `SegmentedControl`·`PalettePicker`: 방향키로 고를 때 포커스가 따라가고, 고른 것이 없으면 첫 항목으로 들어와요. `Calendar`: 날짜 하나만 Tab에 들고 방향키·PageUp·PageDown으로 이동해요.
- `Calendar`: `min`·`max`를 날짜로 비교(`min={new Date()}`가 오늘을 막던 문제), 오늘 표시를 마운트 뒤에 정해 하이드레이션 어긋남 방지, 바깥에서 `value`가 다른 달로 바뀌면 따라감.
- React `Select`: placeholder가 있으면 빈 값에서 시작(Svelte와 같게).
- `Tooltip`: 자식의 `aria-describedby`를 덮어쓰지 않고 이어 붙임, Esc로 닫기, 최상위 층(popover)에 떠서 `overflow: hidden`인 부모에 잘리지 않음.
- 터치 기기에서 누르는 영역 44px(칩·팔레트·세그먼트·스위치·내비게이션 링크·아이콘 버튼, 달력 칸). README의 "44px" 설명을 실제와 맞췄어요.
- 고대비(강제 색상) 모드에서 선택·켜짐 상태가 사라지던 문제, `prefers-contrast: more` 대응, 동작 줄이기 범위 확대.
- `paletteToCss`·`createPalette`·CLI `--id`가 선택자를 깨는 id를 막아요(영문으로 시작, 영문·숫자·하이픈).
- 노랑·연두 같은 밝은 브랜드색의 다크 장식색을 어둡게 맞춰 크레마 위 대비를 지켜요.
- `Table`: caption이 없으면 스크롤 영역에 role·tabindex를 붙이지 않아요.

**API**
- React `Button`이 `href`일 때 `target`·`rel` 같은 링크 속성을 타입에서도 받아요. `variant="glass"`는 개발 중 한 번 안내해요.
- React `Chip`: `defaultSelected`·`onChange`로 스스로 바뀌는 모드. React `Table`: `format`(Svelte와 같음). Svelte `ListItem`: 나머지 속성 전달. Svelte `Checkbox`: `label`에 스니펫.
- `TabBar`: 항목 `href`, `hideFrom`. `PalettePicker`: 브랜드 팔레트 표시(`custom`), `group="custom"`, `value`에 브랜드 id. 새 함수 `getCustomPalettes()`·`onCustomPalettesChange()`.
- 패키지: `./fonts.css`(CDN), `./fonts.local.css`와 `./fonts/*`(woff2 3개 840KB와 SIL OFL 라이선스), `./utils`의 `require` 조건(`dist/utils.cjs`). 쓰이지 않던 `src/` 파일을 패키지에서 뺐어요.
- 글꼴이 Blurssism Sans·Blurssism Serif로 바뀌었어요. Pretendard·Gowun Batang에서 KS X 1001 한글 2350자 + 영문·숫자·기호만 남긴 사본이고(OFL 예약 이름 때문에 이름을 바꿈), 조각 수백 개 대신 파일 하나씩 받아요. 2350자 밖의 드문 글자는 시스템 글꼴로 보여요. `scripts/subset-fonts.py`로 만들어요. / Fonts are now Blurssism Sans and Serif: 2,350-syllable subsets of Pretendard and Gowun Batang, one file each.

**개발 / Tooling**
- `npm run check`가 대비(크레마 위 포함), Svelte 타입, React 타입(`tsc`), 서버 렌더링 스모크 테스트를 함께 돌려요. GitHub Actions에서 빌드 재현성과 함께 검사해요.
- 예제(`examples/*`)가 npm 배포본 대신 저장소의 패키지(`file:../..`)를 써요.

## 1.5.0 — 2026-10-06
**코드 이름 glass → crema · Renamed to crema**
- 클래스 `.bl-crema` · `.bl-crema-thick` · `.bl-crema-lite` · `.bl-btn-crema`, 버튼 `variant="crema"`
- 속성 `<html data-crema>`, 함수 `applyCremaPreference()` · `setCremaMode()` · `getCremaMode()` · `shouldReduceCrema()`, 타입 `CremaMode` · `CremaOptions`
- 토큰 `--crema-fill` · `--crema-fill-strong` · `--crema-stroke` · `--crema-tint-accent` · `--crema-edge` · `--crema-band` · `--crema-grain` · `--crema-light` · `--shadow-crema` · `--crema-saturate` (Tailwind 키 포함)
- 옛 glass 이름은 2.0까지 별칭으로 그대로 동작 / the glass names stay as aliases until 2.0
  - CSS: 옛 클래스·속성·변수를 같은 규칙에 함께 생성 / old selectors and variables are generated alongside
  - 컴포넌트: 새 클래스와 옛 클래스를 함께 붙임 (`bl-crema bl-glass`) / components emit both classes
  - 함수: 개발 중 콘솔에 한 번 새 이름 안내 / old functions log a one-time hint in development
- 브랜드 팔레트 값에 `crema-tint-accent` 추가 (`glass-tint-accent`도 유지)
- 1.4.1의 문서 용어 정리 포함 / includes the 1.4.1 docs changes

## 1.4.1 — 2026-10-06
문서만 바뀌었습니다. 코드와 화면은 1.4.0과 같습니다. / Docs only; code and visuals are the same as 1.4.0.
- 용어 정리: 떠 있는 블러레마 면을 한국어 "유리" → "크레마", 영어 "glass" → "crema"로 / floating Blurema surfaces are now called *crema*
- 위쪽 캐러멜빛 층은 "크레마 띠"(crema band)로 구분 / the top caramel layer is the *crema band*
- 코드 이름 `bl-glass` · `data-glass` · `applyGlassPreference`는 호환을 위해 그대로 / code names keep `glass`

## 1.4.0 — 2026-10-06
> 업데이트 후 `applyGlassPreference()`를 부르는 앱은 데스크톱(1120px 이상·마우스·넉넉한 기기)에서 데스크톱 모드가 자동으로 켜집니다. 이전처럼 쓰려면 `applyGlassPreference({ rich: false })`.
> Apps that call `applyGlassPreference()` now get desktop mode automatically on capable desktops. Use `applyGlassPreference({ rich: false })` to keep the 1.3 behavior.

**블러레마 크레마 · Blurema**
- 유리 재질을 "크레마"로 부르고 이름을 블러레마(blur + crema)로 정하고 질감을 바꿈: 흰 유리 → 크림색 젖빛, 채도 180% → 125%, 흰 반사광 → 팔레트를 따라가는 크레마 가장자리
  New glass material: cream frosted fill, lower saturation, a crema edge instead of a white highlight
- 새 토큰 `glass-edge` · `glass-crema` · `glass-grain` · `glass-light` / new material tokens
- `blur-md` 20px → 24px

**데스크톱 모드 · Desktop mode**
- `<html data-glass="rich">`: 블러 40/64px, 더 비치는 크레마, 두 겹 그림자, 포인터를 따라오는 캐러멜빛, 블러 예산 화면당 6개
- `applyGlassPreference({ rich, pointerLight })`, `setGlassMode()`, `getGlassMode()`, `isDesktopCapable()`
- 기존 `applyGlassPreference(true | false)`는 그대로 동작 / the boolean form still works

**브랜드색 팔레트 · Brand-color palettes**
- `createPalette(color)`, `applyBrandColor(color)`, `paletteToCss()`, `contrastRatio()` — 색 하나로 라이트·다크 강조색을 WCAG 대비에 맞춰 생성, 상태색과 헷갈리는 색 경고
- CLI: `npx @caffeinecatkr/blurssism palette "#ff5a1f"`
- `npm run check`가 브랜드색 133개까지 7,884개 조합 검사 / checks 7,884 contrast pairs

**기타 · Other**
- 문서에 문의 메일(leeunchan10@gmail.com)과 다른 디자인 시스템과의 비교 추가 / contact email and a comparison with other design systems
- 미리보기 `Blurema`(층과 세 모드 나란히 비교), `BrandColor` 추가 / new previews
- 끄기 모드에서 크레마 버튼도 불투명하게 / glass buttons are opaque in off mode

## 1.3.1 — 2026-10-06
**웹 기본 팔레트 · Web essential palettes**
- 웹에서 자주 쓰는 색 7종 추가: `blue` · `indigo` · `violet` · `teal` · `emerald` · `pink` · `graphite`
  Seven common web colors, toned down to sit on the cream paper
- 카페인 팔레트 6종과 기본값(`espresso`)은 그대로 / caffeine palettes and the espresso default are unchanged
- 팔레트에 `group`(`"caffeine"` · `"web"`) 추가, `PalettePicker`에 `group` prop / palettes now carry a `group`; `PalettePicker` can show one group
- `npm run check`: 팔레트 13종 × 라이트·다크, 702개 대비 조합 통과 / 702 contrast pairs pass

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
