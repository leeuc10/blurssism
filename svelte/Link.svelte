<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import Icon from "./Icon.svelte";
  import { locale } from "./locale.svelte.js";
  /** 본문 안의 글자 링크(accent-ink + 밑줄). external이면 새 창으로 열고 스크린리더 문구와 작은 화살표를 붙입니다. */
  type Props = HTMLAnchorAttributes & {
    href: string; children?: Snippet;
    /** 새 창으로(target="_blank" rel="noopener noreferrer") */ external?: boolean;
    /** 보조 링크: ink-muted 색 */ muted?: boolean;
  };
  let { href, external = false, muted = false, children, class: className, target, rel, ...rest }: Props = $props();
  const L = $derived(locale.current);
</script>

<a {href} class={["bl-link", muted && "bl-link-muted", className]} target={external ? "_blank" : target} rel={external ? "noopener noreferrer" : rel} {...rest}>{@render children?.()}{#if external}<span class="bl-sr-only"> {L.openInNew}</span><Icon name="chevron-right" class="bl-link-ext" />{/if}</a>
