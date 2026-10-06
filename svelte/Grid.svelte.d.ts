import type { Snippet } from "svelte";
import type { Breakpoint } from "./types.js";
type $$ComponentProps = {
    columns?: number | Partial<Record<Breakpoint, number>>;
    gap?: "space-1" | "space-2" | "space-3" | "space-4" | "space-5" | "space-6" | "space-8" | "space-12";
    as?: string;
    children?: Snippet;
    class?: string;
};
declare const Grid: import("svelte").Component<$$ComponentProps, {}, "">;
type Grid = ReturnType<typeof Grid>;
export default Grid;
