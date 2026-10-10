import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { IconName } from "./types.js";
type Props = HTMLButtonAttributes & {
    /** primary: 강조색(accent) 채움, 화면당 하나 · accent: primary의 별칭 · crema: 크레마 · ghost: 테두리 · danger: 삭제·신고 */
    variant?: "primary" | "accent" | "crema" | "ghost" | "danger";
    size?: "lg" | "md";
    block?: boolean;
    icon?: IconName;
    /** 주면 <a>로 렌더링 */
    href?: string;
    children?: Snippet;
};
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
