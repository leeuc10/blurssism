같은 화면 안에서 내용 묶음을 바꾸는 콘텐츠 탭입니다. 화면 아래에 떠서 화면을 옮기는 TabBar와는 다른 컴포넌트입니다.

## 언제 쓰나
- 한 화면의 내용이 2–6개 묶음으로 나뉘고, 한 번에 하나만 보여도 될 때(상품의 상세·리뷰·문의, 설정의 계정·알림·결제). 2–4개 중 보기 방식만 바꾸는 짧은 라벨이면 SegmentedControl, 화면을 옮기는 메뉴면 TabBar·NavBar.
- `line`(기본)은 지금 탭 아래 2px `accent` 밑줄과 목록 아래 `line` hairline. 탭이 많으면 좁은 화면에서 줄을 바꾸지 않고 가로로 스크롤합니다. `pill`은 SegmentedControl과 같은 캡슐이고 지금 탭이 불투명한 `accent-soft`로 채워집니다.
- 지금 탭은 `accent-ink` 글자 + 굵기 700 + 밑줄(또는 캡슐)로, 색만으로 구분하지 않습니다. 비활성 탭은 `ink-subtle`이고 방향키로도 건너뜁니다.
- 마크업은 WAI-ARIA 탭 패턴입니다. `role="tablist"` 안의 `role="tab"` 버튼에 `aria-selected`·`aria-controls`가 붙고, 패널은 `role="tabpanel"`에 `aria-labelledby`와 `tabindex="0"`이 있어 Tab 키로 들어갈 수 있습니다.
- 지금 탭만 Tab 순서에 들고, 방향키·Home·End가 포커스와 선택을 함께 옮깁니다. 패널은 지금 것만 그리고, `keepMounted`를 주면 나머지도 그려 두고 `hidden`으로 숨깁니다(패널 안 입력 상태를 지킬 때).

## 소비자가 넣는 것
- `items`(`{id, label, icon?, disabled?, panel}`), `value`와 `onChange`(제어 모드) 또는 `defaultValue`(안 주면 첫 탭), `label`(탭 묶음의 스크린리더 이름, 기본 로케일의 "탭"), `variant`(`line`·`pill`), `keepMounted`.
- 라벨은 1–2단어로 짧게, 모든 탭에 아이콘을 넣거나 아무 탭에도 넣지 않습니다.
- Svelte는 `bind:value`와 `{#snippet panel(id)}` 자식 스니펫으로 패널 내용을 그립니다. 스니펫은 지금 탭의 id를 받습니다.

## 하지 말 것
- 탭으로 다른 화면(라우트)에 가지 않습니다. 그건 TabBar·NavBar의 링크입니다.
- 한 화면에 Tabs를 겹쳐 두 단계로 만들지 않습니다. 두 번째 단계는 SegmentedControl이나 목록으로 풉니다.
- 탭에 크레마를 깔지 않습니다. 탭은 본문 위에 떠 있는 것이 아니라 본문의 일부입니다.
- 열린 패널에 `hidden`을 직접 붙이거나 `aria-selected`를 흉내 내지 않습니다. 상태는 `value`로만 바꿉니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

같은 화면 안에서 내용 묶음을 바꾸는 콘텐츠 탭(tablist). 화면을 옮기는 하단 메뉴는 TabBar. value를 주면 제어 모드, 안 주면 defaultValue(기본 첫 탭)에서 시작해 스스로 바뀝니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `items` | `TabsItem[]` | 필수 |  |
| `value` | `string` |  | 지금 탭 id (제어 모드) |
| `defaultValue` | `string` |  | 제어하지 않을 때 처음 탭. 기본 첫 항목 |
| `onChange` | `(id: string) => void` |  |  |
| `label` | `string` |  | 탭 묶음의 스크린리더 이름. 기본 로케일의 "탭" |
| `variant` | `"line" \| "pill"` |  | line(기본): 지금 탭 아래 2px 강조색 밑줄, 좁은 화면에서 가로 스크롤 · pill: SegmentedControl 같은 캡슐 |
| `keepMounted` | `boolean` |  | 보이지 않는 패널도 그려 두고 hidden으로 숨깁니다(입력 상태를 지킬 때). 기본은 지금 패널만 그림 |
| `locale` | `Partial<Locale>` |  | 이 컴포넌트에서만 쓸 문구 |
| `id` | `string` |  | 탭·패널 id의 접두어. 생략하면 자동 |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
