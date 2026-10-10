상태를 알리는 작은 캡슐 배지로, 항상 단어를 담습니다.

## 언제 쓰나
- `neutral` 초안·보관, `accent` 새 기능, `positive` 완료, `warning` 확인 필요, `danger` 실패.
- 색만으로 상태를 구분하지 않도록 단어를 넣고, 중요하면 아이콘도 붙입니다.

## 소비자가 넣는 것
- `children`(2–6자), `tone`, 선택적으로 `icon`.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

상태 배지. 항상 단어를 넣습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `tone` | `"neutral" \| "accent" \| "positive" \| "warning" \| "danger" \| "info"` |  |  |
| `icon` | `IconName` |  |  |
| `children` | `ReactNode` | 필수 |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
