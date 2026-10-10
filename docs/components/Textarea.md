라벨, 도움말, 오류 문구를 갖춘 여러 줄 입력창입니다.

## 언제 쓰나
- 후기, 메모, 문의 내용처럼 한 줄을 넘는 글. 한 줄이면 `TextField`를 씁니다.
- 라벨은 항상 보입니다(placeholder로 대신하지 않음). 오류는 `error`로 넘기면 테두리와 문구가 `danger`로 바뀌고 로케일의 "오류:" 접두어가 붙습니다.
- 기본은 4줄 높이에 세로로만 손잡이로 늘릴 수 있습니다. `autoResize`를 주면 손잡이 없이 내용에 맞춰 자라고, `maxRows`를 넘으면 그 높이에서 멈추고 안쪽이 스크롤됩니다. 숨은 측정 요소 없이 `scrollHeight`로 맞추므로 글자가 2350자 밖의 시스템 글꼴로 보여도 어긋나지 않습니다.
- 모양은 `TextField`와 같은 `.bl-field-input`에 `.bl-textarea`를 더한 것입니다. 안쪽 여백 `space-3`/`space-4`, 모서리 `radius-md`, 바탕 `paper-raised`.

## 소비자가 넣는 것
- `ref`: `<textarea>`에 닿습니다(react-hook-form의 `register`가 됩니다).
- `label`(필수), `help`, `error`, `rows`(기본 4), `autoResize`, `maxRows`, 그 밖의 textarea 속성(`value`·`onChange`·`maxLength`·`placeholder` 등).
- Svelte: `bind:value`.

## 하지 말 것
- 라벨을 생략하거나 placeholder로 대신하지 않습니다.
- `autoResize`에 `maxRows`를 주지 않은 채 긴 글을 받지 않습니다. 화면을 넘겨 자라서 아래 버튼이 밀립니다.

## 문구
- 도움말은 해요체("200자까지 쓸 수 있어요."), 오류는 해결 방법을 말합니다("10자 이상 적어 주세요.").

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

라벨·도움말·오류를 갖춘 여러 줄 입력창. ref는 <textarea>에 닿습니다.

`TextareaHTMLAttributes<HTMLTextAreaElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `label` | `string` | 필수 |  |
| `help` | `string` |  |  |
| `error` | `string` |  | 있으면 오류 상태. "오류: " 접두어와 함께 표시됩니다. |
| `rows` | `number` |  | 처음 보이는 줄 수 (기본 4) |
| `autoResize` | `boolean` |  | 내용에 맞춰 높이가 자랍니다(숨은 측정 요소 없이 scrollHeight로). 이때 손으로 크기를 바꾸는 손잡이는 숨깁니다. |
| `maxRows` | `number` |  | autoResize일 때 최대 줄 수. 넘으면 안쪽이 스크롤됩니다. |
| `locale` | `Partial<Locale>` |  | 이 컴포넌트만 다른 문구로 (오류 접두어) |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
