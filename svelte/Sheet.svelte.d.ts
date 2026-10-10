import type { Snippet } from "svelte";
type $$ComponentProps = {
    open?: boolean;
    title: string;
    description?: string;
    onclose?: () => void;
    children?: Snippet;
    class?: string;
};
declare const Sheet: import("svelte").Component<$$ComponentProps, {}, "open">;
type Sheet = ReturnType<typeof Sheet>;
export default Sheet;
