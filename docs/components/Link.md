본문 안의 글자 링크입니다. `accent-ink` 색과 밑줄로 주변 글자와 구분되고, 모든 `<a>` 속성을 받습니다.

## 언제 쓰나
- 문장 안에서 다른 화면이나 문서로 옮길 때("자세한 내용은 [이용약관]에서 볼 수 있어요"). 행동을 담는 버튼이 아니라 이동입니다.
- 밑줄 1.5px, 글자에서 3px 띄움. 호버 기기(`hover: hover`)에서만 밑줄이 2.5px로 두꺼워집니다. 색만으로 링크를 알리지 않으므로 밑줄은 빼지 않습니다.
- `external`: 새 창으로 엽니다(`target="_blank" rel="noopener noreferrer"`). 스크린리더용 문구 "새 창에서 열림"(로케일 `openInNew`)과 바깥 위를 가리키는 작은 화살표(`chevron-right`를 −45도 돌림)가 붙습니다.
- `muted`: 푸터·메타 정보의 보조 링크. `ink-muted` 색이고 호버하면 `ink`로 진해집니다.
- 포커스 링은 `focus-ring` 2px, 모서리 `radius-sm`.

## 소비자가 넣는 것
- `ref`: `<a>`에 닿습니다.
- `href`(필수), `children`(링크 글자), `external`, `muted`, 그 밖의 anchor 속성(`download`·`hreflang`·`onClick` 등). `external`을 주면 `target`·`rel`은 덮어씁니다.

## 하지 말 것
- 링크 글자에 "여기"·"클릭"처럼 목적지를 알 수 없는 말을 쓰지 않습니다. 가는 곳의 이름을 씁니다("이용약관", "원두 고르기 안내").
- 행동(저장·삭제)을 링크로 만들지 않습니다. 그때는 `Button`입니다.
- 밑줄을 지우거나 색을 `accent`(채움색)로 바꾸지 않습니다. 본문 위 링크 글자는 `accent-ink`입니다.
- `href` 없이 쓰지 않습니다. 이동이 아니면 링크가 아닙니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

본문 안의 글자 링크. accent-ink 색과 밑줄로 글자와 구분되고, 모든 <a> 속성을 받습니다. ref는 <a>.

`AnchorHTMLAttributes<HTMLAnchorElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `href` | `string` | 필수 |  |
| `children` | `ReactNode` | 필수 |  |
| `external` | `boolean` |  | 새 창으로 엽니다(target="_blank" rel="noopener noreferrer"). 스크린리더 문구 "새 창에서 열림"과 작은 화살표가 붙습니다. |
| `muted` | `boolean` |  | 보조 링크: ink-muted 색 (푸터·메타 정보) |
| `locale` | `Partial<Locale>` |  | 이 컴포넌트만 다른 문구로 (새 창 안내) |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
