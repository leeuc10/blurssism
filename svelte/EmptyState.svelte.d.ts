import type { Snippet } from "svelte";
import type { IconName } from "./types.js";
type $$ComponentProps = {
    title: string;
    body?: string;
    icon?: IconName;
    children?: Snippet;
    class?: string;
};
declare const EmptyState: import("svelte").Component<$$ComponentProps, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
