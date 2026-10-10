<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";
  import Button from "./Button.svelte";
  import IconButton from "./IconButton.svelte";
  import { locale } from "./locale.svelte.js";
  /** 토스트 한 장(그리기만). 쌓기·자동 닫힘은 toast.show() + <Toaster />가 합니다(2.1). */
  let { tone = "neutral", actionLabel, onaction, ondismiss, children, class: className }:
    { tone?: "neutral" | "positive" | "warning" | "danger" | "info"; actionLabel?: string; onaction?: () => void; ondismiss?: () => void; children?: Snippet; class?: string } = $props();
  const ICON = { positive: "check", danger: "alert", warning: "alert", info: "spark" } as const;
  const icon = $derived((ICON as Record<string, "check" | "alert" | "spark">)[tone]);
</script>

<div class={["bl-toast bl-crema-thick", className]} role={tone === "danger" || tone === "warning" ? "alert" : "status"} data-tone={tone}>
  {#if icon}<Icon name={icon} />{/if}
  <span class="bl-toast-msg">{@render children?.()}</span>
  {#if actionLabel}<Button variant="ghost" size="md" onclick={onaction}>{actionLabel}</Button>{/if}
  {#if ondismiss}<IconButton icon="close" label={locale.current.dismiss} plain onclick={ondismiss} class="bl-toast-close" />{/if}
</div>
