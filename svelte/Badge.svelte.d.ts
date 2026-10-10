import type { Snippet } from "svelte";
import type { IconName } from "./types.js";
type $$ComponentProps = {
    tone?: "neutral" | "accent" | "positive" | "warning" | "danger" | "info";
    icon?: IconName;
    children?: Snippet;
    class?: string;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
