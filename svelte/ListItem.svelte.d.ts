import type { Snippet } from "svelte";
import type { IconName } from "./types.js";
type $$ComponentProps = {
    title: string;
    subtitle?: string;
    icon?: IconName;
    /** 오른쪽: 글자 또는 스니펫(Switch, Badge…). 생략하면 링크·버튼일 때 chevron */
    trailing?: string | Snippet;
    href?: string;
    onclick?: (e: MouseEvent) => void;
    class?: string;
};
declare const ListItem: import("svelte").Component<$$ComponentProps, {}, "">;
type ListItem = ReturnType<typeof ListItem>;
export default ListItem;
