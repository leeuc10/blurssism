불투명한 종이 카드로, 한 덩어리의 정보와 행동을 담습니다.

## 언제 쓰나
- 대시보드 요약, 안내, 인용. 카드 사이 간격은 `space-6`.
- `quote`는 명조(`quote` 스타일)로 사람의 문장을 보여 줄 때만.
- 카드는 불투명합니다. 크레마가 필요하면 MediaCard나 `.bl-crema`를 씁니다.

## 소비자가 넣는 것
- `eyebrow`, `title`, `body` 또는 `quote`, `children`(하단 버튼, 최대 2개).

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

불투명 콘텐츠 카드. children = 하단 버튼들.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `eyebrow` | `string` |  |  |
| `title` | `string` |  |  |
| `quote` | `string` |  |  |
| `body` | `string` |  |  |
| `children` | `ReactNode` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
