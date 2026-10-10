2–5개 보기 중 하나를 고르는 라디오 묶음입니다.

## 언제 쓰나
- 보기마다 설명이 필요하거나, 모든 보기를 한눈에 비교해야 할 때. 짧은 보기 2–4개를 빠르게 전환할 땐 SegmentedControl.
- `fieldset` + `legend` 구조라 스크린리더가 묶음 제목을 읽습니다.

## 소비자가 넣는 것
- `legend`, `options`(`{value,label,description,disabled}`), `value`, `onChange`.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

라디오 묶음. 2–5개 중 하나.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `legend` | `string` |  |  |
| `options` | `(Option \| string)[]` | 필수 |  |
| `value` | `string` |  |  |
| `defaultValue` | `string` |  |  |
| `onChange` | `(value: string) => void` |  |  |
| `name` | `string` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
