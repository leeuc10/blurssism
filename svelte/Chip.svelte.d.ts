import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
type Props = HTMLButtonAttributes & {
    /** bind:selected로 쓰면 누를 때 자동으로 바뀝니다 */ selected?: boolean;
    onchange?: (selected: boolean) => void;
    children?: Snippet;
};
declare const Chip: import("svelte").Component<Props, {}, "selected">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
