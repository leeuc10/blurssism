import type { Snippet } from "svelte";
type $$ComponentProps = {
    title: string | Snippet;
    onback?: () => void;
    links?: {
        href: string;
        label: string;
        current?: boolean;
    }[];
    actions?: Snippet;
    class?: string;
};
declare const NavBar: import("svelte").Component<$$ComponentProps, {}, "">;
type NavBar = ReturnType<typeof NavBar>;
export default NavBar;
