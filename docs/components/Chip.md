필터·태그를 고르는 토글 칩입니다.

## 언제 쓰나
- 목록 필터, 관심사·카테고리 선택. 여러 개 선택이 기본입니다.
- 선택되면 `accent-soft` 바탕, `accent-ink` 글자, 체크 아이콘이 붙어 색 외에도 모양으로 구분됩니다.

## 소비자가 넣는 것
- `children`(2–6자 명사), `selected` + `onChange(다음 값)`로 제어하거나, 생략하면 스스로 바뀝니다(React `defaultSelected`, Svelte `bind:selected`). 여러 개는 `.bl-chips`로 감쌉니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

필터·태그 선택용 토글 칩. selected를 주면 제어 모드, 안 주면 누를 때마다 스스로 바뀝니다.

`Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `selected` | `boolean` |  |  |
| `defaultSelected` | `boolean` |  | 제어하지 않을 때 처음 값 |
| `onChange` | `(selected: boolean) => void` |  | 누를 때 다음 값으로 |
| `children` | `ReactNode` | 필수 |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
