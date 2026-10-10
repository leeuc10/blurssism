화면 옆에서 미끄러져 들어오는 두꺼운 크레마 패널입니다. 내비게이션 목록, 필터 묶음, 긴 폼처럼 한 화면에 다 못 두는 내용을 담고, 데스크톱에서는 그 자리에 고정된 사이드바가 됩니다.

## 언제 쓰나
- 모바일·태블릿의 메뉴 서랍(햄버거 버튼), 목록 옆의 필터 패널, 항목 상세·편집 폼. 짧은 확인은 Dialog, 버튼 몇 개면 Sheet입니다.
- 두꺼운 크레마(`crema-fill-strong` + `blur-lg`) 위에 화면 높이(100dvh) 전체, 폭 320px(기본, 화면의 85vw까지). 모서리는 화면 안쪽 가장자리에만 `radius-xl`을 둡니다. 뒤에는 `scrim`만 깔고 블러를 걸지 않습니다(블러 예산 1개).
- 네이티브 `<dialog>`를 `showModal()`로 열어 최상위 층에 뜨고, 뒤 화면은 조작할 수 없게(inert) 되며 페이지 스크롤이 멈춥니다. Esc·바깥 누르기로 `onClose`가 불리고, 열리면 안의 첫 조작 요소로, 닫히면 원래 자리로 포커스가 돌아갑니다. 머리글에는 제목(`h2`, `aria-labelledby`)과 닫기 아이콘 버튼이 있습니다.
- 들어올 때 `bl-slide-left`·`bl-slide-right` 260ms `cubic-bezier(.2,.8,.2,1)`, 닫힐 때는 같은 길을 되돌아 나간 뒤 닫힙니다(`data-closing`). 동작 줄이기 설정에서는 페이드만 합니다. 블러 반경은 움직이지 않습니다.
- `persistentFrom="lg"`(또는 `"xl"`)를 주면 그 단계부터 다이얼로그 대신 불투명한 `<aside class="bl-drawer-persistent">`(`paper-raised`, 블러·scrim 없음)가 소비자 레이아웃 안에 그대로 그려져 데스크톱 사이드바가 됩니다. 바꾸는 것은 미디어쿼리(`.bl-hide-from-lg`·`.bl-hide-below-lg`)이고, 그 단계에서는 `open`이 true여도 다이얼로그를 열지 않습니다. 사이드바를 어디에 둘지(flex·grid, sticky)는 소비자가 정합니다.

## 소비자가 넣는 것
- `open`, `onClose`, `side`(`left` 기본·`right`), `title`(없으면 `label`로 `aria-label`), `width`(숫자 px 또는 CSS 길이), `persistentFrom`(`lg`·`xl`·false), `children`(무엇이든: `ul.bl-list`, 폼, 버튼).
- Svelte는 `bind:open`과 `onclose`. 닫기 버튼과 Esc·바깥 누르기가 `open`을 false로 바꿉니다.
- 서랍 안의 리스트는 `.bl-list`를 그대로 쓰면 크레마 위에서 테두리 없이 그려집니다. 지금 페이지 링크에는 `aria-current="page"`를 붙입니다.

## 하지 말 것
- 서랍 안에 Dialog·Popover를 겹쳐 띄우지 않습니다. 서랍을 닫고 엽니다.
- 양쪽에 서랍을 동시에 열지 않습니다. 한 화면에 열린 서랍은 하나입니다.
- `persistentFrom` 사이드바 안에 크레마 요소(NavBar·TabBar)를 넣지 않습니다. 사이드바는 불투명한 바탕입니다.
- 서랍을 열어 둔 채 Toast를 띄우지 않습니다. NavBar·TabBar와 합치면 블러 예산 3개를 넘습니다.
- 내용이 짧은데 서랍을 쓰지 않습니다. 버튼 2~3개면 Sheet, 문장 하나면 Dialog입니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

옆에서 미끄러져 들어오는 두꺼운 크레마 패널. 네이티브 <dialog>(최상위 층, 뒤 화면 inert), Esc·바깥 누르기로 onClose, 닫힐 때 반대로 미끄러져 나갑니다. persistentFrom을 주면 그 단계부터 불투명한 <aside>(데스크톱 사이드바)로 그 자리에 그려지고 다이얼로그는 열리지 않습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `open` | `boolean` | 필수 |  |
| `onClose` | `() => void` |  |  |
| `side` | `"left" \| "right"` |  | 어느 쪽에서 들어오나. 기본 "left" |
| `title` | `string` |  | 머리글 제목(h2, aria-labelledby) |
| `label` | `string` |  | title이 없을 때 스크린리더용 이름(aria-label) |
| `width` | `number \| string` |  | 기본 320(px). 화면의 85vw를 넘지 않습니다. |
| `persistentFrom` | `"lg" \| "xl" \| false` |  | 이 단계부터는 다이얼로그 대신 인라인 <aside class="bl-drawer-persistent">. 기본 false |
| `locale` | `Partial<Locale>` |  |  |
| `children` | `ReactNode` |  | 내비게이션 리스트, 폼 등 무엇이든 |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
