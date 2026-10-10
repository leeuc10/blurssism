리스트 한 줄로, 설정·메뉴·목록의 기본 단위입니다.

## 언제 쓰나
- 설정 화면, 메뉴, 검색 결과. `<ul class="bl-list">` 안의 `<li>`에 넣으면 그룹 카드와 구분선이 생깁니다.
- `href`면 링크, `onClick`이면 버튼이 되며 오른쪽에 chevron이 붙습니다.

## 소비자가 넣는 것
- `title`(필수), `subtitle`, `icon`, `trailing`(Switch, 값 텍스트, Badge), `href` / `onClick`.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

리스트 한 줄. href → <a>, onClick → <button>, 둘 다 없으면 <div>. ul.bl-list > li 안에 둡니다.

`HTMLAttributes<HTMLElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `title` | `string` | 필수 |  |
| `subtitle` | `string` |  |  |
| `icon` | `IconName` |  |  |
| `trailing` | `ReactNode` |  | 오른쪽 요소. 생략하면 링크/버튼일 때 chevron |
| `href` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
