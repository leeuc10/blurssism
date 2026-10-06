import type { Snippet } from "svelte";
type $$ComponentProps = {
    tone?: "neutral" | "positive" | "danger";
    actionLabel?: string;
    onaction?: () => void;
    children?: Snippet;
    class?: string;
};
declare const Toast: import("svelte").Component<$$ComponentProps, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
