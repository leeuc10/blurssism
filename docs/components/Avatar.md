사람을 나타내는 원형 아바타로, 사진이 없으면 이니셜을 보여 줍니다.

## 언제 쓰나
- 댓글, 멤버 목록, 계정 메뉴. 크기는 `sm` 32 · `md` 40 · `lg` 56.
- 이니셜은 한글이면 첫 글자, 영문이면 두 글자. 바탕은 `accent-soft`, 글자는 `accent-ink`.
- 여러 명은 `.bl-avatar-stack`으로 겹칩니다(최대 4개 + "+N").

## 소비자가 넣는 것
- `name`(필수, 스크린리더 라벨이자 이니셜 원천), `image`, `size`.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

이니셜 또는 사진 원형 아바타.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `name` | `string` | 필수 |  |
| `image` | `string` |  |  |
| `size` | `"sm" \| "md" \| "lg"` |  |  |
| `className` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
