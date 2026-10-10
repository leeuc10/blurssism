import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { IconName } from "./types.js";
/** 흐름 안의 불투명 안내 띠(떠 있지 않으므로 크레마가 아님). 색만으로 알리지 않도록 아이콘이 항상 붙습니다.
    info·positive는 role="status", warning·danger는 role="alert". */
type Props = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
    tone?: "info" | "positive" | "warning" | "danger";
    title?: string;
    /** 기본 아이콘(info spark · positive check · warning·danger alert)을 바꿉니다 */ icon?: IconName;
    children?: Snippet; /** 아래에 놓일 행동 버튼들 */
    actions?: Snippet;
    /** 주면 오른쪽에 닫기 아이콘 버튼이 생깁니다 */ ondismiss?: () => void;
};
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
