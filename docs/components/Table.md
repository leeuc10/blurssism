행과 열로 비교하는 데이터 표입니다.

## 언제 쓰나
- 여러 항목을 같은 기준으로 비교할 때(관리 화면, 기록, 가격표). 항목이 하나씩 읽히는 거라면 ListItem.
- 머리글은 `caption` 스타일 + `ink-muted`, 숫자 열은 오른쪽 정렬 + 고정폭 숫자. 줄무늬 대신 `line` 구분선.
- 좁은 화면에서는 가로로 스크롤되며, 스크롤 영역은 키보드로 포커스할 수 있습니다.

## 소비자가 넣는 것
- `columns`(`{key,label,numeric,format}`), `rows`, `caption`(표 제목 겸 스크린리더 라벨. 있을 때만 스크롤 영역이 키보드 포커스를 받습니다).
- 칸 그리기: 글자로 바꾸는 `format(행)`은 React·Svelte 공통. 노드를 그리려면 React는 `render(행)`, Svelte는 `cell` 스니펫.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

데이터 표. 좁은 화면에서는 가로 스크롤. caption이 있으면 스크롤 영역에 이름과 키보드 포커스가 붙습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `columns` | `Column<R>[]` | 필수 |  |
| `rows` | `R[]` | 필수 |  |
| `caption` | `string` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
