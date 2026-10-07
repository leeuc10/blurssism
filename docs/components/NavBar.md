화면 위에 떠 있는 캡슐형 크레마 내비게이션 바입니다.

## 언제 쓰나
- 앱: `onBack` + `title` + `actions`(plain IconButton). 스크롤하면 콘텐츠가 뒤로 흐릿하게 지나갑니다.
- 웹: `title`(로고/서비스명) + `links` + `actions`(primary 버튼 하나). lg(1120px) 미만에서는 links가 숨고 TabBar가 그 역할을 합니다(TabBar가 없는 화면이면 메뉴 버튼으로 접습니다).
- 지금 페이지 링크(`current`)는 `accent-soft` 바탕 + 굵기 + 밑줄. 나머지 링크는 `ink`.
- 안의 아이콘 버튼은 블러를 다시 걸지 않습니다(NavBar 자체가 크레마).
- 페이지 첫 화면에는 아래에 큰 제목(`.bl-largetitle`)을 두고, NavBar의 title은 짧게.

## 소비자가 넣는 것
- `title`, `onBack`, `links`(`{href,label,current}`), `actions`. 상단 고정(sticky, `top: space-3`)은 소비자가 배치합니다.
