type $$ComponentProps = {
    items: {
        id: string;
        label: string;
    }[];
    value?: string;
    label: string;
    block?: boolean;
    onchange?: (id: string) => void;
    class?: string;
};
declare const SegmentedControl: import("svelte").Component<$$ComponentProps, {}, "value">;
type SegmentedControl = ReturnType<typeof SegmentedControl>;
export default SegmentedControl;
