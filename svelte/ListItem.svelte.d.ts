import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { IconName } from "./types.js";
/** href → <a>, onclick → <button>, 둘 다 없으면 <div>. <ul class="bl-list"><li> 안에 둡니다. 나머지 속성(aria-*, target, data-*)은 그 요소에 붙습니다. */
type Props = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    title: string;
    subtitle?: string;
    icon?: IconName;
    /** 오른쪽: 글자 또는 스니펫(Switch, Badge…). 생략하면 링크·버튼일 때 chevron */
    trailing?: string | Snippet;
    href?: string;
    target?: string;
    rel?: string;
    onclick?: (e: MouseEvent) => void;
};
declare const ListItem: import("svelte").Component<Props, {}, "">;
type ListItem = ReturnType<typeof ListItem>;
export default ListItem;
