import type { IconName } from "./types.js";
export type MenuItem = {
    id: string;
    label: string;
    icon?: IconName; /** 삭제·신고처럼 위험한 행동 */
    danger?: boolean;
    disabled?: boolean; /** 주면 <a>로 */
    href?: string;
};
import type { Snippet } from "svelte";
import { type PopoverTriggerProps } from "./Popover.svelte";
type $$ComponentProps = {
    open?: boolean;
    onopenchange?: (open: boolean) => void;
    items: (MenuItem | "-")[];
    onselect?: (id: string) => void;
    /** 메뉴 이름(aria-label). 기본은 로케일의 menu("메뉴") */
    label?: string;
    placement?: "bottom-start" | "bottom-end" | "bottom" | "top";
    trigger?: Snippet<[PopoverTriggerProps]>;
    class?: string;
};
declare const Menu: import("svelte").Component<$$ComponentProps, {}, "open">;
type Menu = ReturnType<typeof Menu>;
export default Menu;
