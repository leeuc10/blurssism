import type { HTMLTextareaAttributes } from "svelte/elements";
type Props = HTMLTextareaAttributes & {
    label: string;
    help?: string; /** 있으면 오류 상태, 로케일 errorPrefix("오류: ")로 표시 */
    error?: string;
    /** 처음 보이는 줄 수 (기본 4) */ rows?: number;
    /** 내용에 맞춰 높이가 자랍니다(숨은 측정 요소 없이 scrollHeight로) */ autoResize?: boolean;
    /** autoResize일 때 최대 줄 수. 넘으면 안쪽이 스크롤됩니다 */ maxRows?: number;
};
declare const Textarea: import("svelte").Component<Props, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
