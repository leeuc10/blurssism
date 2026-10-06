import type { Option } from "./types.js";
type $$ComponentProps = {
    legend?: string;
    options: (Option | string)[];
    value?: string;
    name?: string;
    onchange?: (value: string) => void;
    class?: string;
};
declare const RadioGroup: import("svelte").Component<$$ComponentProps, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
