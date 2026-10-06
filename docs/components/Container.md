페이지 콘텐츠의 최대 폭과 단계별 좌우 여백을 맞추는 래퍼입니다.

## 언제 쓰나
- 페이지의 각 섹션을 감쌀 때. 폭은 `content-max`(1120px)에서 멈추고, 좌우 여백은 단계에 따라 16 → 24 → 32 → 40 → 48px로 늘어납니다(`--grid-margin`).
- 긴 글은 `size="prose"`(640px), 화면 끝까지 채우는 배너는 `size="full"`.

## 소비자가 넣는 것
- `children`, `size`(`default`·`prose`·`full`), `as`(`main`, `section` 등 태그).
- React 없이: `<div class="bl-container">`, `bl-container-prose`.
