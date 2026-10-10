아래에서 올라오는 두꺼운 블러 바텀시트입니다.

## 언제 쓰나
- 확인, 짧은 선택지, 공유 메뉴. 긴 폼은 별도 화면으로. 데스크톱에서는 같은 내용을 가운데 모달(`radius-xl` 네 모서리)로 띄웁니다.
- 바탕은 `crema-fill-strong` + `blur-lg`, 뒤 화면에는 `scrim`(블러 없이 어둡게만).

## 소비자가 넣는 것
- `title`, `description`, `children`(block 버튼, 위에서부터 중요한 순서).
- 열고 닫는 상태, scrim, 포커스 가두기, Esc 닫기는 소비자가 관리합니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

두꺼운 블러 바텀시트. children = 버튼들. 2.1: open을 주면 스스로 열고 닫는 모달(네이티브 <dialog>, scrim, Esc·바깥 누르기·손잡이 끌어내리기로 onClose, 닫힘 애니메이션). open을 안 주면 자리에 그려지는 면.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `title` | `string` | 필수 |  |
| `description` | `string` |  |  |
| `children` | `ReactNode` |  |  |
| `className` | `string` |  |  |
| `open` | `boolean` |  |  |
| `onClose` | `() => void` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
