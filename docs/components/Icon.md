1.75px 라인으로 그린 기본 아이콘 14종(24×24, `currentColor`)입니다.

## 언제 쓰나
- 버튼, 탭, 배지, 리스트 안에서. 아이콘만 단독으로 쓸 땐 IconButton으로 감싸 label을 줍니다.
- `heart`만 `filled`를 지원하며, 눌린·선택된 상태에만 채웁니다.
- 여기 없는 아이콘이 필요하면 같은 규칙(24 그리드, 1.75 stroke, 둥근 끝)의 Lucide 아이콘을 씁니다.

## 소비자가 넣는 것
- `name`: home, search, heart, chat, person, bell, settings, plus, spark, check, close, chevron-left, chevron-right, alert. 색은 부모의 `color`.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

단순 라인 아이콘 (24×24, 1.75 stroke, currentColor). heart만 filled를 지원합니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `name` | `IconName` | 필수 |  |
| `filled` | `boolean` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
