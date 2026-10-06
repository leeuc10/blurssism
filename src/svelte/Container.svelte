<script lang="ts">
  import type { Snippet } from "svelte";
  /** 콘텐츠 폭(content-max)과 단계별 좌우 여백(--grid-margin)을 맞춥니다. */
  let { size = "default", as = "div", children, class: className }:
    { size?: "default" | "prose" | "full"; as?: string; children?: Snippet; class?: string } = $props();
</script>

<svelte:element this={as} class={["bl-container", size === "prose" && "bl-container-prose", size === "full" && "bl-container-full", className]}>
  {@render children?.()}
</svelte:element>
