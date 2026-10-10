보여 줄 내용이 없을 때 이유와 다음 행동을 알려 주는 안내입니다.

## 언제 쓰나
- 첫 사용, 검색 결과 없음, 모두 처리함. 오류로 비어 있을 땐 무엇을 하면 되는지 문구에 적습니다.
- 아이콘은 `paper-sunken` 원 안의 라인 아이콘 하나. 일러스트나 이모지를 쓰지 않습니다.

## 소비자가 넣는 것
- `title`(해요체 한 문장), `body`, `icon`, `children`(버튼 하나).

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

빈 화면 안내. children = 행동 버튼 하나.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `title` | `string` | 필수 |  |
| `body` | `string` |  |  |
| `icon` | `IconName` |  |  |
| `children` | `ReactNode` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
