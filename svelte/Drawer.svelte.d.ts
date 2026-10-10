import type { Snippet } from "svelte";
type $$ComponentProps = {
    open?: boolean;
    onclose?: () => void;
    /** 기본 "left" */
    side?: "left" | "right";
    /** 머리글 제목(h2, aria-labelledby) */
    title?: string;
    /** title이 없을 때 스크린리더용 이름 */
    label?: string;
    /** 기본 320(px). 85vw를 넘지 않습니다 */
    width?: number | string;
    /** 이 단계부터는 다이얼로그 대신 인라인 <aside>. 기본 false */
    persistentFrom?: "lg" | "xl" | false;
    children?: Snippet;
    class?: string;
};
declare const Drawer: import("svelte").Component<$$ComponentProps, {}, "open">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
