<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";
  import Button from "./Button.svelte";
  let { tone = "neutral", actionLabel, onaction, children, class: className }:
    { tone?: "neutral" | "positive" | "danger"; actionLabel?: string; onaction?: () => void; children?: Snippet; class?: string } = $props();
</script>

<div class={["bl-toast bl-crema-thick bl-glass-thick", className]} role="status" data-tone={tone}>
  {#if tone === "positive"}<Icon name="check" />{:else if tone === "danger"}<Icon name="alert" />{/if}
  <span class="bl-toast-msg">{@render children?.()}</span>
  {#if actionLabel}<Button variant="ghost" size="md" onclick={onaction}>{actionLabel}</Button>{/if}
</div>
