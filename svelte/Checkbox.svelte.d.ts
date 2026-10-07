import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";
/** label: 글자 또는 스니펫(링크가 들어간 동의 문구 등) */
type Props = Omit<HTMLInputAttributes, "type"> & {
    label: string | Snippet;
    description?: string;
};
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
