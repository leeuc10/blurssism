import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
/** 본문 안의 글자 링크(accent-ink + 밑줄). external이면 새 창으로 열고 스크린리더 문구와 작은 화살표를 붙입니다. */
type Props = HTMLAnchorAttributes & {
    href: string;
    children?: Snippet;
    /** 새 창으로(target="_blank" rel="noopener noreferrer") */ external?: boolean;
    /** 보조 링크: ink-muted 색 */ muted?: boolean;
};
declare const Link: import("svelte").Component<Props, {}, "">;
type Link = ReturnType<typeof Link>;
export default Link;
