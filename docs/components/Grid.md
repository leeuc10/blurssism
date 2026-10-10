화면 단계에 따라 열 수가 바뀌는 그리드입니다.

## 언제 쓰나
- 카드 목록, 갤러리, 대시보드 타일. `columns={{ xs: 1, sm: 2, lg: 3 }}`처럼 단계별 열 수를 주면, 생략한 단계는 아래 단계 값을 이어받습니다.
- 간격은 기본으로 단계별 `--grid-gutter`(16 → 24 → 32px). 바꾸려면 `gap="space-4"`.
- 정교한 배치가 필요하면 12열 그리드 클래스를 씁니다: `.bl-grid` 안에서 `.bl-span-4`(모든 단계), `.bl-span-md-6`, `.bl-span-lg-8`, `.bl-span-full`. xs는 4열, sm·md는 8열, lg·xl은 12열입니다.

## 소비자가 넣는 것
- `columns`(숫자 또는 단계별 객체), `gap`, `as`, `children`.
- 단계 확인이 필요하면 React `useBreakpoint()`, Svelte `breakpoint()`, 또는 `getBreakpoint()`.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

단계별 열 수가 바뀌는 그리드. 예: columns={{ xs: 1, md: 2, lg: 3 }}

`HTMLAttributes<HTMLElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `columns` | `Responsive<number>` |  |  |
| `gap` | `"space-1" \| "space-2" \| "space-3" \| "space-4" \| "space-5" \| "space-6" \| "space-8" \| "space-12"` |  | 간격 토큰 이름, 예: "space-4" (기본: 단계별 --grid-gutter) |
| `as` | `string` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
