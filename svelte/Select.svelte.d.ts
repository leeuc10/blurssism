import type { HTMLSelectAttributes } from "svelte/elements";
import type { Option } from "./types.js";
type Props = HTMLSelectAttributes & {
    label: string;
    options: (Option | string)[];
    placeholder?: string;
    help?: string;
    error?: string;
};
declare const Select: import("svelte").Component<Props, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
