여러 항목을 각각 켜고 끄는 체크박스로, 폼을 제출할 때 함께 보내는 선택에 씁니다.

## 언제 쓰나
- 약관 동의, 여러 개 선택, 폼 안의 옵션. 즉시 반영되는 설정은 Switch를 씁니다.
- 체크되면 `accent` 채움 + `on-accent` 체크 표시. 행 전체(최소 `touch-min`)가 눌리는 영역입니다.

## 소비자가 넣는 것
- `label`(필수), `description`, `checked` / `defaultChecked`, `onChange`, `disabled`, 그 밖의 input 속성.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

체크박스 한 개. 제출이 필요한 폼의 선택용.

`InputHTMLAttributes<HTMLInputElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | 필수 |  |
| `description` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
