import type { HTMLInputAttributes } from "svelte/elements";
type Props = HTMLInputAttributes & {
    label: string;
    help?: string; /** 있으면 오류 상태, "오류:" 접두어로 표시 */
    error?: string;
};
declare const TextField: import("svelte").Component<Props, {}, "value">;
type TextField = ReturnType<typeof TextField>;
export default TextField;
