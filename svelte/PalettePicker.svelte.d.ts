import type { PaletteId } from "./types.js";
type $$ComponentProps = {
    /** bind:value로 쓰면 선택이 양방향으로 묶입니다 */
    value?: PaletteId;
    /** false면 data-palette를 바꾸지 않고 onchange만 부릅니다 */
    apply?: boolean;
    /** 팔레트를 적용할 요소 (기본: <html>) */
    target?: HTMLElement;
    compact?: boolean;
    label?: string;
    onchange?: (id: PaletteId) => void;
    class?: string;
};
declare const PalettePicker: import("svelte").Component<$$ComponentProps, {}, "value">;
type PalettePicker = ReturnType<typeof PalettePicker>;
export default PalettePicker;
