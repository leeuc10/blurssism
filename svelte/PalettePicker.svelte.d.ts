import type { PaletteId } from "./types.js";
type $$ComponentProps = {
    /** bind:value로 쓰면 선택이 양방향으로 묶입니다 */
    value?: PaletteId | (string & {});
    /** false면 data-palette를 바꾸지 않고 onchange만 부릅니다 */
    apply?: boolean;
    /** 팔레트를 적용할 요소 (기본: <html>) */
    target?: HTMLElement;
    compact?: boolean;
    /** 한 묶음만 보이기: "caffeine", "web", "custom"(applyBrandColor로 등록한 것). 생략하면 전부 */
    group?: "caffeine" | "web" | "custom";
    /** false면 applyBrandColor()로 등록한 브랜드 팔레트를 숨깁니다 */
    custom?: boolean;
    label?: string;
    onchange?: (id: PaletteId | (string & {})) => void;
    class?: string;
};
declare const PalettePicker: import("svelte").Component<$$ComponentProps, {}, "value">;
type PalettePicker = ReturnType<typeof PalettePicker>;
export default PalettePicker;
