import type { Snippet } from "svelte";
type $$ComponentProps = {
    tone?: "neutral" | "positive" | "warning" | "danger" | "info";
    actionLabel?: string;
    onaction?: () => void;
    ondismiss?: () => void;
    children?: Snippet;
    class?: string;
};
declare const Toast: import("svelte").Component<$$ComponentProps, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
