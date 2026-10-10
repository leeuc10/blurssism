라벨, 도움말, 오류 문구를 갖춘 한 줄 입력창입니다.

## 언제 쓰나
- 로그인, 검색, 설정 값 같은 짧은 입력. 라벨은 항상 보입니다(placeholder로 대신하지 않음).
- 오류는 `error`로 넘기면 테두리와 문구가 `danger`로 바뀌고 "오류:" 접두어가 붙습니다.

## 소비자가 넣는 것
- `label`(필수), `help`, `error`, 그 밖의 input 속성.

## 문구
- 도움말은 해요체("로그인과 알림에 쓰여요."), 오류는 해결 방법을 말합니다("8자 이상 입력해 주세요.").

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

라벨·도움말·오류를 갖춘 한 줄 입력창.

`InputHTMLAttributes<HTMLInputElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `label` | `string` | 필수 |  |
| `help` | `string` |  |  |
| `error` | `string` |  | 있으면 오류 상태. 로케일의 errorPrefix("오류: ")와 함께 표시됩니다. |
| `locale` | `Partial<Locale>` |  | 이 컴포넌트만 다른 문구를 쓸 때(전역은 setLocale) |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
