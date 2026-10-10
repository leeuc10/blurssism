내용이 불러와지는 동안 그 자리의 모양을 미리 보여 주는 자리표시입니다.

## 언제 쓰나
- 300ms 이상 걸리는 목록·카드 로딩. 실제 레이아웃과 같은 크기로 그려 화면이 튀지 않게 합니다.
- 빛이 지나가는 효과는 `prefers-reduced-motion`에서 꺼집니다. 스켈레톤 위에 크레마를 겹치지 않습니다.

## 소비자가 넣는 것
- `width`, `height`(기본 16), `circle`. 묶음 전체에 `aria-busy="true"`를 다는 것은 소비자 몫입니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

불러오는 중 자리표시.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `width` | `number \| string` |  |  |
| `height` | `number \| string` |  |  |
| `circle` | `boolean` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
