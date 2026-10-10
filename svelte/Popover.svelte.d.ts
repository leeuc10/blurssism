/** trigger 스니펫이 받는 props. 여는 버튼에 그대로 펼칩니다 */
export type PopoverTriggerProps = {
    onclick: (e: MouseEvent) => void;
    onpointerdown: (e: PointerEvent) => void;
    "aria-expanded": "true" | "false";
    "aria-controls": string;
    "aria-haspopup": "dialog" | "menu" | "listbox" | "true";
};
import type { Snippet } from "svelte";
type $$ComponentProps = {
    open?: boolean;
    onopenchange?: (open: boolean) => void;
    /** 기본 "bottom-start". 아래가 모자라면 위로 뒤집힙니다 */
    placement?: "bottom-start" | "bottom-end" | "bottom" | "top";
    /** 스크린리더용 이름(aria-label). labelledby가 없으면 넣습니다 */
    label?: string;
    labelledby?: string;
    haspopup?: PopoverTriggerProps["aria-haspopup"];
    trigger?: Snippet<[PopoverTriggerProps]>;
    children?: Snippet;
    class?: string;
};
declare const Popover: import("svelte").Component<$$ComponentProps, {}, "open">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
