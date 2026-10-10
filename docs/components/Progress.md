작업이 얼마나 진행됐는지 보여 주는 캡슐형 막대입니다.

## 언제 쓰나
- 업로드, 단계형 온보딩, 목표 달성률. 끝을 알 수 없는 기다림은 Skeleton을 씁니다.
- 막대는 `accent`, 트랙은 `paper-sunken`. 값은 숫자로도 함께 보여 줍니다.

## 소비자가 넣는 것
- `value`(필수), `max`(기본 100), `label`, `valueText`("5단계 중 3단계").

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

진행 막대.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `value` | `number` | 필수 |  |
| `max` | `number` |  |  |
| `label` | `string` |  |  |
| `valueText` | `string` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
