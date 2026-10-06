import type { HTMLInputAttributes } from "svelte/elements";
type Props = Omit<HTMLInputAttributes, "type"> & {
    label: string;
    description?: string;
};
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
