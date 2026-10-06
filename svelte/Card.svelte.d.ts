import type { Snippet } from "svelte";
type $$ComponentProps = {
    eyebrow?: string;
    title?: string;
    quote?: string;
    body?: string;
    children?: Snippet;
    class?: string;
};
declare const Card: import("svelte").Component<$$ComponentProps, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
