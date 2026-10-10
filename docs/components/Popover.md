버튼을 누르면 그 아래(위)에 뜨는 두꺼운 크레마 패널입니다. 짧은 설정, 필터, 작은 폼처럼 페이지를 떠나지 않고 끝나는 일을 담습니다.

## 언제 쓰나
- 트리거 가까이에서 끝나는 짧은 상호작용: 정렬·필터 고르기, 색이나 날짜 고르기, 한두 칸 입력. 확인이 필요한 결정이면 Dialog, 행동 목록이면 Menu, 긴 내용이면 Drawer나 Sheet를 씁니다.
- 두꺼운 크레마(`crema-fill-strong` + `blur-lg`) 위에 `radius-lg`, 안쪽 여백 `space-4`, 폭 200~360px(화면 폭 − 32px를 넘지 않음). 열려 있는 동안 **블러 예산 1개**를 씁니다. NavBar·TabBar가 있는 화면에서는 남은 예산이 하나이므로, 팝오버가 열려 있을 때 Toast를 함께 띄우지 않습니다.
- 네이티브 `popover="auto"`로 최상위 층에 떠서 `overflow: hidden`인 부모에 잘리지 않고, 바깥 누르기와 Esc로 브라우저가 닫아 줍니다(`toggle` 이벤트로 상태가 맞춰집니다). 위치는 트리거 기준 8px 아래이고, 아래가 모자라면 위로 뒤집히며, 좌우는 화면 안으로 밀려 들어옵니다.
- 트리거에는 `aria-expanded`·`aria-controls`·`aria-haspopup`이 붙고, 패널은 `role="dialog"`입니다. 열리면 안의 첫 조작 요소로, 닫히면 트리거로 포커스가 돌아갑니다(다른 입력창을 눌러서 닫혔으면 그 포커스는 그대로 둡니다).
- 아래에서 떠오르는 `bl-rise` 200ms. 동작 줄이기 설정에서는 페이드만 합니다.

## 소비자가 넣는 것
- `trigger`(버튼 요소 하나. React는 `cloneElement`로 속성이 더해지고, Svelte는 `trigger(props)` 스니펫이 받은 props를 버튼에 펼칩니다), `children`(내용).
- `open` + `onOpenChange`(제어) 또는 `defaultOpen`(비제어). Svelte는 `bind:open`과 `onopenchange`.
- `placement`: `bottom-start`(기본)·`bottom-end`·`bottom`·`top`.
- `label`(aria-label) 또는 `labelledBy`(안에 둔 제목 요소의 id). 둘 중 하나는 꼭 넣습니다.
- 안의 글은 `.bl-popover-title`(제목), `.bl-popover-body`(설명, `crema-ink-muted`), `.bl-popover-actions`(버튼 줄)로 묶으면 간격이 맞습니다.

## 하지 말 것
- 팝오버 안에 또 팝오버·툴팁을 띄우지 않습니다(크레마 위에 크레마).
- 제목과 긴 설명, 여러 단계가 있는 내용을 넣지 않습니다. 스크롤이 생기면 Drawer나 Dialog로 옮깁니다.
- primary 버튼은 화면당 하나이므로, 페이지에 이미 있으면 팝오버 안의 버튼은 `ghost`나 `md` 크기로 둡니다.
- 트리거가 아닌 곳(호버, 페이지 로드)에서 열지 않습니다. 호버 설명은 Tooltip입니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

버튼을 누르면 그 아래(위)에 뜨는 두꺼운 크레마 패널(role="dialog"). 네이티브 popover라 최상위 층에 뜨고, 바깥 누르기·Esc로 닫힙니다. 열리면 첫 조작 요소로, 닫히면 트리거로 포커스가 돌아갑니다. 열려 있는 동안 블러 예산 1을 씁니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | 필수 | 여는 버튼 하나. aria-expanded·aria-controls·aria-haspopup과 onClick 토글이 더해집니다. |
| `children` | `ReactNode` |  |  |
| `open` | `boolean` |  | 제어 모드 |
| `defaultOpen` | `boolean` |  | 제어하지 않을 때 처음 값 |
| `onOpenChange` | `(open: boolean) => void` |  |  |
| `placement` | `"bottom-start" \| "bottom-end" \| "bottom" \| "top"` |  | 기본 "bottom-start". 아래가 모자라면 위로 뒤집힙니다. |
| `label` | `string` |  | 스크린리더용 이름(aria-label). labelledBy가 없으면 넣습니다. |
| `labelledBy` | `string` |  | 패널 안 제목 요소의 id(aria-labelledby) |
| `haspopup` | `"dialog" \| "menu" \| "listbox" \| "true"` |  | 트리거의 aria-haspopup. 기본 "dialog" |
| `id` | `string` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
