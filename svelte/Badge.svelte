<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  let { tone = "neutral", icon, children, class: className }:
    { tone?: "neutral" | "accent" | "positive" | "warning" | "danger" | "info"; icon?: IconName; children?: Snippet; class?: string } = $props();
</script>

<span class={["bl-badge", "bl-badge-" + tone, className]}>{#if icon}<Icon name={icon} />{/if}{@render children?.()}</span>
