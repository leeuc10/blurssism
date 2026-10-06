import type { Snippet } from "svelte";
type $$ComponentProps = {
    open?: boolean;
    title: string;
    description?: string;
    alert?: boolean;
    onclose?: () => void;
    children?: Snippet;
    class?: string;
};
declare const Dialog: import("svelte").Component<$$ComponentProps, {}, "open">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;
