48px 원형 유리 버튼으로, 아이콘 하나로 행동합니다.

## 언제 쓰나
- 이미지 위 저장·닫기, 툴바 액션. NavBar 안에서는 `plain`(투명).
- `pressed`를 넘기면 토글이 되며 눌린 상태는 `accent` 채움.

## 소비자가 넣는 것
- `icon`(필수), `label`(필수, 스크린리더 문구), `pressed`, `plain`, `onClick`.

## 하지 말 것
- label 없이 쓰지 않습니다. 터치 영역을 `touch-min`(44px)보다 작게 줄이지 않습니다.
