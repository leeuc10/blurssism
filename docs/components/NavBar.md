화면 위에 떠 있는 캡슐형 크레마 내비게이션 바입니다.

## 언제 쓰나
- 앱: `onBack` + `title` + `actions`(plain IconButton). 스크롤하면 콘텐츠가 뒤로 흐릿하게 지나갑니다.
- 웹: `title`(로고/서비스명) + `links` + `actions`(primary 버튼 하나). `bp-desktop` 미만에서는 links를 메뉴 버튼으로 접습니다.
- 페이지 첫 화면에는 아래에 큰 제목(`.bl-largetitle`)을 두고, NavBar의 title은 짧게.

## 소비자가 넣는 것
- `title`, `onBack`, `links`(`{href,label,current}`), `actions`. 상단 고정(sticky, `top: space-3`)은 소비자가 배치합니다.
