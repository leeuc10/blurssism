네이티브 select를 감싼 드롭다운으로, 6개 이상 보기 중 하나를 고를 때 씁니다.

## 언제 쓰나
- 보기가 6개 이상이거나 화면 공간이 좁을 때. 2–5개면 RadioGroup이나 SegmentedControl이 더 빠릅니다.
- 네이티브 `<select>`라 모바일에서는 OS의 선택 휠·시트가 열리고 키보드·스크린리더 지원이 그대로입니다.

## 소비자가 넣는 것
- `label`(필수), `options`(문자열 또는 `{value,label,disabled}`), `value`, `onChange`, `placeholder`, `help`, `error`.
- `placeholder`를 주고 값을 정하지 않으면 placeholder가 보이는 빈 값에서 시작합니다(React·Svelte 같음).

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

네이티브 select를 감싼 드롭다운. 라벨·도움말·오류는 TextField와 같습니다.

`SelectHTMLAttributes<HTMLSelectElement>`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `label` | `string` | 필수 |  |
| `options` | `(Option \| string)[]` | 필수 |  |
| `placeholder` | `string` |  |  |
| `help` | `string` |  |  |
| `error` | `string` |  |  |
| `locale` | `Partial<Locale>` |  |  |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
