설정을 즉시 켜고 끄는 스위치입니다.

## 언제 쓰나
- 저장 버튼 없이 바로 반영되는 설정. 제출이 필요한 폼에서는 체크박스를 씁니다.
- 켜짐은 `accent` 채움, 손잡이는 살짝 튕기는 움직임.

## 소비자가 넣는 것
- `checked`, `onChange(next)`, `label`(필수). 보이는 라벨은 보통 ListItem의 title로 둡니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

켜고 끄는 설정 스위치. label은 스크린리더용. checked를 주면 제어 모드, 안 주면 defaultChecked에서 시작해 스스로 바뀝니다(2.1).

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `checked` | `boolean` |  |  |
| `defaultChecked` | `boolean` |  |  |
| `onChange` | `(next: boolean) => void` |  |  |
| `label` | `string` | 필수 |  |
| `disabled` | `boolean` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
