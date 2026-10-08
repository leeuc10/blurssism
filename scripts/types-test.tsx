// blurssism React 타입 검사 · © caffeinecat · MIT
// `tsc -p tsconfig.react.json`이 dist/index.d.ts를 실제 쓰임새로 검사합니다. 실행하지는 않습니다.
// ts-expect-error 주석이 붙은 줄은 오류가 나야 맞는 쓰임새입니다.
import {
  Button, Chip, TabBar, PalettePicker, Table, Dialog, Tooltip, Calendar, Select, SegmentedControl,
  applyCremaPreference, shouldReduceCrema, checkCrema, auditCrema, createPalette, paletteToCss, getCustomPalettes,
} from "../dist/index";

export const buttons = (
  <>
    <Button>저장하기</Button>
    <Button variant="crema" icon="plus" onClick={() => {}}>새로 만들기</Button>
    <Button href="/docs" target="_blank" rel="noopener">문서 보기</Button>
    {/* @ts-expect-error 버튼에는 링크 속성(target)이 없어요 */}
    <Button target="_blank">링크 아님</Button>
  </>
);

export const others = (
  <>
    <Chip>제어 안 함</Chip>
    <Chip selected onChange={(next: boolean) => void next}>제어함</Chip>
    <TabBar items={[{ id: "home", label: "홈", icon: "home", href: "/" }]} value="home" hideFrom={false} />
    <PalettePicker value="brand" group="custom" />
    <PalettePicker value="matcha" custom={false} />
    <Table<{ id: number; name: string; price: number }> caption="원두" rows={[{ id: 1, name: "예가체프", price: 18000 }]}
      columns={[{ key: "name", label: "이름" }, { key: "price", label: "가격", numeric: true, format: (r) => r.price.toLocaleString() }]} />
    <Dialog open title="저장할까요?" description="저장하면 되돌릴 수 없어요." onClose={() => {}} alert />
    <Tooltip label="설정"><button aria-describedby="mine">설정</button></Tooltip>
    <Calendar min={new Date()} onChange={(d: Date) => void d} />
    <Select label="원두" options={["예가체프", "수프리모"]} placeholder="골라 주세요" />
    <SegmentedControl label="보기" items={[{ id: "a", label: "목록" }]} value="" />
  </>
);

applyCremaPreference({ rich: false, minMemory: 2 });
shouldReduceCrema({ minCores: 2 });
const issues = checkCrema({ budget: 3 });
issues.forEach((i) => i.code === "blur-budget" && i.elements.length);
const stop: () => void = auditCrema({ onReport: (list) => void list });
stop();
paletteToCss(createPalette("#ff5a1f", { id: "my-brand" }));
getCustomPalettes().map((p) => p.id);

// 배경 (1.6.1)
import { createBackground, backgroundCrema, backgroundToCss, applyBackgroundColor, setBackground, getBackground, backgrounds, createPalette as cp2 } from "../dist/index";
const bgx = createBackground("#ffffff", { id: "plain", dark: "#101010" });
const bgCss: string = backgroundToCss(bgx);
const bgId: string = getBackground();
setBackground("white");
applyBackgroundColor("#f5f0ff", { apply: false });
cp2("#ff5a1f", { background: bgx });
void bgCss; void bgId; void backgrounds[0].swatch.light;
const bgCrema: string = backgroundCrema(bgx).dark["crema-grain"];
void bgCrema;
