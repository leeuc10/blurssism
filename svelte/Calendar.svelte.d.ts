type $$ComponentProps = {
    value?: Date;
    min?: Date;
    max?: Date;
    today?: Date;
    onchange?: (date: Date) => void;
    class?: string;
};
declare const Calendar: import("svelte").Component<$$ComponentProps, {}, "value">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
