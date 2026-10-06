<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  let { title, body, icon = "inbox", children, class: className }: { title: string; body?: string; icon?: IconName; children?: Snippet; class?: string } = $props();
</script>

<div class={["bl-empty", className]}>
  <span class="bl-empty-icon"><Icon name={icon} /></span>
  <p class="bl-empty-title">{title}</p>
  {#if body}<p class="bl-empty-body">{body}</p>{/if}
  {@render children?.()}
</div>
