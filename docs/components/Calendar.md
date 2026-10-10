한 달을 보여 주고 날짜 하나를 고르는 달력입니다.

## 언제 쓰나
- 예약·일정처럼 요일 맥락이 중요한 날짜 선택. 생년월일처럼 멀리 있는 날짜는 `<input type="date">`나 Select 세 개가 빠릅니다.
- 선택일은 `accent` 원, 오늘은 `line-strong` 테두리, 고를 수 없는 날은 취소선 + `ink-subtle`.
- 각 날짜 버튼은 "2026년 10월 17일 토요일"처럼 읽힙니다.
- 키보드: 날짜 묶음에 Tab으로 한 번 들어가고, 방향키로 하루·한 주, Home·End로 주의 처음·끝, PageUp·PageDown으로 이전·다음 달(Shift와 함께면 해)을 옮깁니다. 고를 수 없는 날도 포커스는 가서 읽을 수 있습니다.
- `min`·`max`는 시각을 버리고 날짜로 비교합니다. `min={new Date()}`이면 오늘부터 고를 수 있습니다.
- 오늘 표시는 브라우저에서 마운트한 뒤에 붙습니다(서버와 브라우저의 날짜가 달라 하이드레이션이 어긋나지 않게). 바깥에서 `value`가 다른 달로 바뀌면 그 달을 보여 줍니다.

## 소비자가 넣는 것
- `value`, `onChange(date)`, `min`, `max`, `today`(테스트·서버 시간용). Sheet나 Dialog 안에 넣어 띄우는 것은 소비자 몫입니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

한 달 달력 날짜 선택. 방향키로 날짜, PageUp·PageDown으로 달을 옮깁니다. min·max는 날짜 단위로 비교합니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `value` | `Date` |  |  |
| `onChange` | `(date: Date) => void` |  |  |
| `min` | `Date` |  |  |
| `max` | `Date` |  |  |
| `today` | `Date` |  |  |
| `className` | `string` |  |  |
| `locale` | `Partial<Locale>` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
