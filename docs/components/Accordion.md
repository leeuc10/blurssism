제목을 눌러 내용을 펼치고 접는 목록입니다. 네이티브 `<details>`·`<summary>`를 써서 키보드·스크린리더 지원이 따라오고, JS가 없어도 열립니다.

## 언제 쓰나
- 자주 묻는 질문, 긴 설정 설명, 주문의 상세 내역처럼 제목만 훑고 필요한 것만 펼쳐 읽는 내용. 모두 읽어야 하는 본문은 접지 않고 그냥 보여 줍니다. 짧은 묶음을 바꿔 보는 것이면 Tabs.
- 기본은 하나만 열립니다. `<details>`의 `name` 속성으로 브라우저가 나머지를 닫고(Chrome 120·Safari 17.2·Firefox 130부터), 모르는 브라우저에서는 컴포넌트가 상태를 맞춰 닫습니다. `multiple`이면 여러 개가 열립니다.
- 상자는 불투명한 `paper-raised` + `radius-lg`이고 항목 사이는 `line` hairline입니다. 제목 줄은 `title-3` 크기, 높이 56px 이상, 줄 전체가 누르는 영역입니다. 오른쪽 chevron이 열릴 때 90도 돌아가고, 동작 줄이기 설정이면 바로 돌아갑니다.
- 열린 상태는 chevron 방향과 `[open]`으로 알립니다. 고대비 모드에서는 제목에 밑줄과 테두리가 더해집니다.
- 내용은 본문 크기(`body`, 16/26)이고 안쪽 여백은 `space-5`(좁은 화면 `space-4`)입니다.

## 소비자가 넣는 것
- `items`(`{id, title, content, icon?}`), `multiple`, `value`와 `onChange`(제어 모드) 또는 `defaultValue`.
- `value`는 하나만 열릴 때 열린 항목의 id 문자열(없으면 `""`), `multiple`이면 열린 id 배열입니다. `onChange`도 같은 모양으로 옵니다.
- 제목은 한 줄로 끝나는 문장이나 질문("배송은 얼마나 걸리나요"). 내용에는 문단·목록·버튼을 자유롭게 넣되, primary 버튼은 화면당 하나입니다.
- Svelte는 `bind:value`이고 내용은 `items[].content` 글자 또는 `{#snippet content(id)}` 스니펫으로 그립니다.

## 하지 말 것
- 한두 항목만 있는데 접지 않습니다. 접는 비용보다 그냥 보여 주는 게 쌉니다.
- 제목에 아이콘·배지·버튼을 쌓지 않습니다. 제목 줄은 글자와 chevron, 필요하면 왼쪽 아이콘 하나까지입니다.
- 펼쳤을 때 화면을 옮기거나 다이얼로그를 띄우지 않습니다. 펼치기는 읽기 위한 동작입니다.
- 항목 안에 다시 Accordion을 넣지 않습니다. 두 단계가 필요하면 상위를 Tabs로 나눕니다.
- `<details>`에 크레마를 깔지 않습니다. 본문의 일부라 불투명합니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

제목을 눌러 내용을 펼치는 목록. 네이티브 <details>·<summary>라 키보드·스크린리더 지원이 따라옵니다. 기본은 하나만 열리고(details의 name), multiple이면 여러 개. value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `items` | `AccordionItem[]` | 필수 |  |
| `multiple` | `boolean` |  | 여러 항목을 동시에 열 수 있게. 기본 false(하나만) |
| `value` | `string \| string[]` |  | 열린 항목. 하나만 열릴 때는 id 문자열(없으면 ""), multiple이면 id 배열 |
| `defaultValue` | `string \| string[]` |  | 제어하지 않을 때 처음 열린 항목 |
| `onChange` | `(value: string \| string[]) => void` |  | 열고 닫을 때 다음 값으로. multiple이면 배열, 아니면 문자열 |
| `id` | `string` |  | 항목 id의 접두어(details name). 생략하면 자동 |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
