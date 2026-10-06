import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { IconName } from "./types.js";
type Props = HTMLButtonAttributes & {
    /** primary: ink 채움 · accent: 강조색 채움 · crema: 크레마 · ghost: 테두리 · danger: 삭제·신고 ("glass"는 1.4 이름, 2.0에서 제거) */
    variant?: "primary" | "accent" | "crema" | "glass" | "ghost" | "danger";
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
