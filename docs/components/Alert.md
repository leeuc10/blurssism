본문 흐름 안에 놓이는 불투명 안내 띠입니다. 떠 있지 않으므로 크레마가 아니고, 잠깐 떠올랐다 사라지는 `Toast`와 달리 사용자가 닫거나 상황이 바뀔 때까지 남습니다.

## 언제 쓰나
- `info`(기본): 알아 두면 좋은 안내("결제 수단을 바꾸면 다음 달부터 적용돼요."). 아이콘 `spark`, 역할 `status`.
- `positive`: 완료·성공이 화면에 남아야 할 때. 아이콘 `check`, 역할 `status`.
- `warning`: 확인이 필요한 상태("저장 공간이 거의 찼어요."). 아이콘 `alert`, 역할 `alert`(스크린리더가 바로 읽습니다).
- `danger`: 실패·위험("결제가 되지 않았어요. 카드 정보를 확인해 주세요."). 아이콘 `alert`, 역할 `alert`.
- 바탕은 톤의 `-soft`(info는 `paper-raised`에 `info`를 조금 섞음), 아이콘과 제목은 톤색, 본문은 `ink`입니다. 색만으로 알리지 않도록 아이콘이 항상 붙습니다.
- 모서리 `radius-lg`, 안쪽 여백 `space-4`/`space-5`, 요소 사이 `space-3`. 카드 안이나 폼 위, 페이지 맨 위에 둡니다.

## 소비자가 넣는 것
- `ref`: 바깥 `<div>`에 닿습니다.
- `tone`, `title`(굵은 한 줄), `children`(본문), `icon`(기본 아이콘을 바꿀 때), `actions`(아래 행동 버튼들, 보통 `ghost` `md` 하나), `onDismiss`(주면 오른쪽에 닫기 아이콘 버튼이 생기고 문구는 로케일 `dismiss`), 그 밖의 div 속성.
- Svelte: `ondismiss`, `actions`는 스니펫(`{#snippet actions()}`).

## 하지 말 것
- 짧은 결과 알림("저장했어요")에는 `Alert` 대신 `Toast`를 씁니다. `Alert`는 남아 있어야 할 안내용입니다.
- 한 화면에 여러 톤의 띠를 쌓지 않습니다. 가장 중요한 하나만 둡니다.
- `actions`에 `primary` 버튼을 넣지 않습니다. 화면의 primary는 하나이고, 안내 띠의 행동은 보조 행동입니다.
- 톤색을 임의 hex로 바꾸거나 블러를 걸지 않습니다. 띠는 흐름 안에 있는 불투명한 면입니다.

<!-- props:start — node scripts/docs.mjs가 dist/index.d.ts에서 만듭니다. 손으로 고치지 마세요 -->
## Props (React)

흐름 안에 놓이는 불투명 안내 띠. 떠 있지 않으므로 크레마가 아니고, 색만으로 알리지 않도록 아이콘이 항상 붙습니다. info·positive는 role="status", warning·danger는 role="alert". ref는 바깥 div.

`Omit<HTMLAttributes<HTMLDivElement>, "title">`의 속성을 모두 받습니다.

| 이름 | 형 | | 설명 |
| --- | --- | --- | --- |
| `tone` | `"info" \| "positive" \| "warning" \| "danger"` |  | info(기본): 안내 · positive: 완료 · warning: 확인 필요 · danger: 실패·위험 |
| `title` | `ReactNode` |  | 굵은 제목 한 줄 |
| `children` | `ReactNode` |  | 본문 |
| `icon` | `IconName` |  | 기본 아이콘(info spark · positive check · warning·danger alert)을 바꿉니다 |
| `actions` | `ReactNode` |  | 아래에 놓일 행동 버튼들(보통 ghost md 하나) |
| `onDismiss` | `() => void` |  | 주면 오른쪽에 닫기 아이콘 버튼이 생깁니다(문구는 로케일 dismiss) |
| `locale` | `Partial<Locale>` |  | 이 컴포넌트만 다른 문구로 (닫기 라벨) |

Svelte는 같은 이름에 소문자 이벤트(`onchange`·`onclick`)와 `bind:`를 씁니다.
<!-- props:end -->
