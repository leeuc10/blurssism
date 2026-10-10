import type { Snippet } from "svelte";
import type { IconName } from "./types.js";
type $$ComponentProps = {
    items: {
        id: string;
        label: string;
        icon?: IconName;
        disabled?: boolean;
    }[];
    value?: string;
    label?: string;
    variant?: "line" | "pill";
    keepMounted?: boolean;
    onchange?: (id: string) => void;
    /** 패널 내용. 탭 id를 받습니다(keepMounted면 모든 탭의 id로 한 번씩). */
    panel?: Snippet<[string]>;
    class?: string;
};
declare const Tabs: import("svelte").Component<$$ComponentProps, {}, "value">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
