import type { Snippet } from "svelte";
import type { IconName } from "./types.js";
type $$ComponentProps = {
    items: {
        id: string;
        title: string;
        icon?: IconName;
        content?: string;
    }[];
    value?: string | string[];
    multiple?: boolean;
    onchange?: (value: string | string[]) => void;
    /** 항목 내용. 항목 id를 받습니다. 없으면 items[].content 글자를 그립니다 */
    content?: Snippet<[string]>;
    class?: string;
};
declare const Accordion: import("svelte").Component<$$ComponentProps, {}, "value">;
type Accordion = ReturnType<typeof Accordion>;
export default Accordion;
