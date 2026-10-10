이미지 위에 크레마 캡션 띠가 떠 있는 카드입니다.

## 언제 쓰나
- 사진·작품·장소·상품처럼 이미지가 주인공인 항목. 피드, 갤러리, 추천.
- 캡션은 `crema-fill` + `blur-md`라 이미지 색이 비쳐 보입니다. 제목은 명조 `title-1`, 메타 정보도 `ink`(얇은 크레마 위 글자 규칙, 사진이 어떤 색이어도 4.5:1).

## 소비자가 넣는 것
- `title`(필수), `meta`("사진 24장 · 10월 4일"), `image`, `imageAlt`, `ratio`(기본 4/5), `badge`, `action`(보통 IconButton).
- `image`가 없으면 토큰 색 도형 자리표시가 나옵니다.

## 성능
- 한 화면에 MediaCard가 여러 장 반복되는 피드·갤러리에서는 `lite`를 켭니다. 캡션이 블러 없는 `bl-crema-lite`가 되고, 안의 아이콘 버튼도 블러 없이 그려져 스크롤이 가벼워집니다. 상세 화면의 큰 한 장만 블러를 씁니다.

## 하지 말 것
- 캡션에 세 줄 이상 넣지 않습니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

이미지 위에 크레마 캡션 띠가 떠 있는 카드.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `title` | `string` | 필수 |  |
| `meta` | `string` |  |  |
| `image` | `string` |  |  |
| `imageAlt` | `string` |  |  |
| `ratio` | `string` |  | CSS aspect-ratio, 기본 "4 / 5" |
| `badge` | `string` |  |  |
| `badgeTone` | `BadgeProps["tone"]` |  |  |
| `badgeIcon` | `IconName` |  |  |
| `action` | `ReactNode` |  | 캡션 오른쪽 요소 (보통 IconButton) |
| `lite` | `boolean` |  | 긴 목록에서 반복될 때: 블러 없는 가벼운 크레마 (성능) |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
