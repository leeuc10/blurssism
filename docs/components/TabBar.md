화면 아래에 떠 있는 캡슐형 크레마 탭바입니다.

## 언제 쓰나
- 모바일의 최상위 메뉴 3–5개. 하단에서 `space-4` 띄워 엄지가 닿는 영역에 둡니다(한 손 조작).
- lg(1120px)부터는 스스로 숨고(`hideFrom="lg"`가 기본) NavBar의 links가 대신합니다. 계속 보이려면 `hideFrom={false}`.
- 화면을 옮기는 메뉴라 탭(`tablist`)이 아니라 `<nav>` 안의 버튼·링크이고, 지금 탭에 `aria-current="page"`가 붙습니다.
- 지금 탭은 불투명한 `accent-soft` 캡슐 + `accent-ink` 라벨 + 굵기와 밑줄. 크레마 위에서도 4.5:1 이상이고 색만으로 구분하지 않습니다. 나머지 라벨은 `ink`(얇은 크레마 위 글자 규칙).

## 소비자가 넣는 것
- `items`(`{id,label,icon,href}` — `href`가 있으면 링크), `value`, `onChange`, `hideFrom`. 콘텐츠 아래 여백을 `space-24` 이상 남겨 마지막 항목이 가리지 않게 합니다.
