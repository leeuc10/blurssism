type $$ComponentProps = {
    checked?: boolean; /** 스크린리더 문구 (필수) */
    label: string;
    disabled?: boolean;
    onchange?: (next: boolean) => void;
    class?: string;
};
declare const Switch: import("svelte").Component<$$ComponentProps, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
