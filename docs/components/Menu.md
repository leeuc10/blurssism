Popover 위에 얹은 행동 메뉴입니다. "더 보기" 아이콘 버튼이나 이름 옆 화살표를 누르면 지금 항목에 할 수 있는 행동이 한 줄씩 나옵니다.

## 언제 쓰나
- 한 항목에 할 수 있는 행동이 3~7개일 때(편집, 공유, 복제, 보관, 삭제). 2개 이하면 버튼을 그냥 나란히 두고, 선택지를 고르는 것이면 Select나 RadioGroup을 씁니다.
- 항목은 44px 높이에 전체 폭, 아이콘은 20px입니다. 위험한 행동(`danger`)은 `danger` 색으로, 구분선(`"-"`)은 1px `line`으로 그려 삭제·신고를 나머지와 떼어 둡니다. 두꺼운 크레마 위라 글자는 `ink`, 보조 글자와 아이콘은 `crema-ink-muted`입니다.
- `role="menu"`와 `role="menuitem"`. 방향키와 Home·End로 옮기고 Enter·Space로 고르며, 고르면 `onSelect(id)`를 부른 뒤 닫힙니다. `disabled` 항목은 포커스는 받되(`aria-disabled`) 고를 수 없어서 스크린리더가 왜 못 하는지 읽을 수 있습니다. `href`가 있는 항목은 `<a>`로 그려 새 탭 열기 같은 링크 동작이 됩니다.
- Popover와 같은 위치·닫기·포커스 규칙을 따르고, 열려 있는 동안 **블러 예산 1개**를 씁니다.

## 소비자가 넣는 것
- `trigger`(보통 `IconButton`), `items`(`{ id, label, icon?, danger?, disabled?, href? }` 또는 구분선 `"-"`), `onSelect(id)`. Svelte는 `onselect`.
- `label`: 메뉴 이름(`aria-label`). 생략하면 로케일의 `menu`("메뉴")입니다. 어떤 항목에 대한 메뉴인지 알 수 있게 "게시물 메뉴"처럼 넣어 주면 좋습니다.
- `open`·`onOpenChange`·`defaultOpen`·`placement`는 Popover와 같습니다. 오른쪽 끝 버튼에서는 `placement="bottom-end"`.
- 라벨은 동작을 그대로 씁니다("삭제하기", "링크 복사"). 이모지와 느낌표는 넣지 않습니다.

## 하지 말 것
- 항목 안에 체크박스·스위치·입력창을 넣지 않습니다. 켜고 끄는 설정은 Popover 안에 Switch를 둡니다.
- 하위 메뉴를 만들지 않습니다. 8개를 넘으면 묶음을 나누거나 Drawer로 옮깁니다.
- 삭제처럼 되돌릴 수 없는 행동은 메뉴에서 바로 실행하지 않고, 고른 뒤 Dialog(`alert`)로 한 번 더 확인합니다.
- 메뉴를 호버로 열지 않습니다. 터치 기기에는 호버가 없습니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

Popover 위에 얹은 행동 메뉴(role="menu"). "-"는 구분선. 방향키·Home·End로 옮기고 Enter·Space로 고르면 onSelect(id) 뒤에 닫힙니다. 블러 예산 1을 씁니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | 필수 | 여는 버튼 하나(보통 IconButton). aria-expanded·aria-controls·aria-haspopup="menu"가 더해집니다. |
| `items` | `(MenuItem \| "-")[]` | 필수 |  |
| `onSelect` | `(id: string) => void` |  |  |
| `label` | `string` |  | 메뉴 이름(aria-label). 기본은 로케일의 menu("메뉴") |
| `open` | `boolean` |  |  |
| `defaultOpen` | `boolean` |  |  |
| `onOpenChange` | `(open: boolean) => void` |  |  |
| `placement` | `PopoverProps["placement"]` |  |  |
| `locale` | `Partial<Locale>` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
