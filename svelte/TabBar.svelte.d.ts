import type { IconName } from "./types.js";
type $$ComponentProps = {
    items: {
        id: string;
        label: string;
        icon: IconName;
        href?: string;
    }[];
    value?: string;
    label?: string;
    hideFrom?: "sm" | "md" | "lg" | "xl" | false;
    onchange?: (id: string) => void;
    class?: string;
};
declare const TabBar: import("svelte").Component<$$ComponentProps, {}, "value">;
type TabBar = ReturnType<typeof TabBar>;
export default TabBar;
