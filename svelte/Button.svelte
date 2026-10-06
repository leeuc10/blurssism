<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  type Props = HTMLButtonAttributes & {
    /** primary: ink 채움 · accent: 강조색 채움 · crema: 크레마 · ghost: 테두리 · danger: 삭제·신고 ("glass"는 1.4 이름, 2.0에서 제거) */
    variant?: "primary" | "accent" | "crema" | "glass" | "ghost" | "danger";
    size?: "lg" | "md";
    block?: boolean;
    icon?: IconName;
    /** 주면 <a>로 렌더링 */
    href?: string;
    children?: Snippet;
  };
  let { variant = "primary", size = "lg", block = false, icon, href, children, class: className, ...rest }: Props = $props();
  const cls = $derived(["bl-btn", variant === "crema" || variant === "glass" ? "bl-btn-crema bl-btn-glass" : "bl-btn-" + variant, size === "md" && "bl-btn-md", block && "bl-btn-block", className]);
</script>

{#if href}
  <a {href} class={cls} {...rest as Record<string, unknown>}>{#if icon}<Icon name={icon} />{/if}{@render children?.()}</a>
{:else}
  <button type="button" class={cls} {...rest}>{#if icon}<Icon name={icon} />{/if}{@render children?.()}</button>
{/if}
