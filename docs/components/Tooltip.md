아이콘 버튼 등에 짧은 설명을 띄우는 두꺼운 크레마 말풍선입니다.

## 언제 쓰나
- 아이콘만 있는 버튼의 이름, 잘린 값의 전체 내용, 단축키 안내. 한 줄, 20자 이내.
- 마우스 호버와 키보드 포커스 모두에서 뜨고, Esc로 닫힙니다. 터치 기기에서는 보이지 않으므로 꼭 필요한 정보를 툴팁에만 두지 않습니다.
- 최상위 층(popover)에 떠서 MediaCard·Table처럼 `overflow: hidden`인 부모에 잘리지 않습니다. 위가 모자라면 아래에 뜹니다. 숨어 있을 때는 블러 예산에 들지 않습니다.

## 소비자가 넣는 것
- `label`, `children`(포커스 가능한 요소 하나 — React는 `aria-describedby`가 자동으로 연결되고, 원래 있던 값은 지우지 않고 이어 붙입니다. Svelte는 스니펫이 받은 id를 직접 붙입니다).

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

호버·포커스 때 뜨는 짧은 설명. children은 포커스 가능한 요소 하나. 최상위 층에 떠서 잘리지 않고, Esc로 닫힙니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `label` | `string` | 필수 |  |
| `children` | `ReactNode` | 필수 |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
