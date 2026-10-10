48px 원형 크레마 버튼으로, 아이콘 하나로 행동합니다.

## 언제 쓰나
- 이미지 위 저장·닫기, 툴바 액션. NavBar 안에서는 `plain`(투명).
- `pressed`를 넘기면 토글이 되며 눌린 상태는 `accent` 채움.
- 크레마(NavBar, MediaCard 캡션, 시트) 안에 두면 블러를 다시 걸지 않고 불투명에 가까운 크레마로 그려집니다. 블러 예산에 들지 않습니다.

## 소비자가 넣는 것
- `icon`(필수), `label`(필수, 스크린리더 문구), `pressed`, `plain`, `onClick`.

## 하지 말 것
- label 없이 쓰지 않습니다. 터치 영역을 `touch-min`(44px)보다 작게 줄이지 않습니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

48px 원형 크레마 아이콘 버튼. label은 스크린리더용으로 필수.

`ButtonHTMLAttributes<HTMLButtonElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `icon` | `IconName` | 필수 |  |
| `label` | `string` | 필수 |  |
| `pressed` | `boolean` |  | 토글 상태 (눌림 → accent 채움) |
| `plain` | `boolean` |  | 크레마 없이 투명 (NavBar 안에서) |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
