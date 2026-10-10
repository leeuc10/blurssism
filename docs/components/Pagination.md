페이지 번호로 목록을 옮기는 내비게이션입니다. `<nav>` 안에 이전·다음 아이콘 버튼과 캡슐 번호 버튼이 놓이고, 지금 페이지에 `aria-current="page"`가 붙습니다.

## 언제 쓰나
- 검색 결과, 주문 내역, 표처럼 페이지 수가 정해진 목록. 끝없이 이어지는 피드에는 쓰지 않습니다(그때는 "더 보기" 버튼이나 무한 스크롤).
- 처음과 끝 번호는 항상 보이고, 지금 페이지 양옆으로 `siblings`개(기본 1)가 보입니다. 건너뛰는 곳은 "…"(`aria-hidden`)입니다. 예: 20페이지 중 10페이지면 `1 … 9 10 11 … 20`.
- 지금 페이지는 불투명한 `accent-soft` 캡슐 + `accent-ink` 글자 + 굵기 700 + 강조색 1px 테두리(TabBar의 선택 탭과 같은 규칙). 색만으로 구분하지 않습니다.
- 번호 캡슐은 40px, 터치 기기에서는 44px. 이전·다음은 `plain` 아이콘 버튼이고 처음·끝에서 비활성이 됩니다.
- `<nav>`의 `aria-label`은 로케일의 `pageOf`("20페이지 중 10페이지"), 번호 버튼은 `page`("10페이지"), 화살표는 `prevPage`·`nextPage`입니다. `setLocale("en")`이면 영어로 바뀝니다.

## 소비자가 넣는 것
- `ref`: `<nav>`에 닿습니다.
- `count`(필수, 전체 페이지 수), `page`(제어 모드) + `onChange`, 또는 `defaultPage`(비제어), `siblings`, `label`(nav의 aria-label을 직접 줄 때), 그 밖의 nav 속성.
- Svelte: `bind:page`, `onchange`.

## 하지 말 것
- 번호를 링크(`href`)로 바꾸려고 감싸지 않습니다. 주소를 바꾸려면 `onChange`에서 라우터를 부릅니다.
- `siblings`를 3 이상으로 키우지 않습니다. 좁은 화면에서 한 줄을 넘칩니다.
- 한 페이지뿐일 때(`count`가 1)는 숨깁니다. 옮길 곳이 없는 내비게이션은 소음입니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

페이지 번호 이동. <nav>(aria-label "N페이지 중 M페이지") 안에 이전·다음 아이콘 버튼과 캡슐 번호 버튼, 지금 페이지에 aria-current="page". 처음·끝 번호는 항상 보이고, 건너뛰는 곳은 "…". page를 주면 제어 모드, 안 주면 defaultPage에서 시작해 스스로 바뀝니다. ref는 <nav>.

`Omit<HTMLAttributes<HTMLElement>, "onChange">`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `count` | `number` | 필수 | 전체 페이지 수 (1 이상) |
| `page` | `number` |  | 지금 페이지(1부터). 주면 제어 모드 |
| `defaultPage` | `number` |  | 제어하지 않을 때 처음 페이지 (기본 1) |
| `onChange` | `(page: number) => void` |  | 페이지가 바뀔 때 다음 페이지 번호로 |
| `siblings` | `number` |  | 지금 페이지 양옆에 보일 번호 개수 (기본 1) |
| `label` | `string` |  | nav의 aria-label. 생략하면 로케일 pageOf(page, count) |
| `locale` | `Partial<Locale>` |  | 이 컴포넌트만 다른 문구로 (이전·다음·페이지 라벨) |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
