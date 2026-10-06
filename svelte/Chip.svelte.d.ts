import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
type Props = HTMLButtonAttributes & {
    selected?: boolean;
    children?: Snippet;
};
declare const Chip: import("svelte").Component<Props, {}, "selected">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
