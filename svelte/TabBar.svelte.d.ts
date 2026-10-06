import type { IconName } from "./types.js";
type $$ComponentProps = {
    items: {
        id: string;
        label: string;
        icon: IconName;
    }[];
    value?: string;
    label?: string;
    onchange?: (id: string) => void;
    class?: string;
};
declare const TabBar: import("svelte").Component<$$ComponentProps, {}, "value">;
type TabBar = ReturnType<typeof TabBar>;
export default TabBar;
