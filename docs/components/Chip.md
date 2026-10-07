필터·태그를 고르는 토글 칩입니다.

## 언제 쓰나
- 목록 필터, 관심사·카테고리 선택. 여러 개 선택이 기본입니다.
- 선택되면 `accent-soft` 바탕, `accent-ink` 글자, 체크 아이콘이 붙어 색 외에도 모양으로 구분됩니다.

## 소비자가 넣는 것
- `children`(2–6자 명사), `selected` + `onChange(다음 값)`로 제어하거나, 생략하면 스스로 바뀝니다(React `defaultSelected`, Svelte `bind:selected`). 여러 개는 `.bl-chips`로 감쌉니다.
