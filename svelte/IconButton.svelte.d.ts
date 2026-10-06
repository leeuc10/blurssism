import type { HTMLButtonAttributes } from "svelte/elements";
import type { IconName } from "./types.js";
type Props = HTMLButtonAttributes & {
    icon: IconName; /** 스크린리더 문구 (필수) */
    label: string;
    pressed?: boolean; /** 유리 없이 투명 */
    plain?: boolean;
};
declare const IconButton: import("svelte").Component<Props, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
