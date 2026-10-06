<script lang="ts">
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  let { items, value = $bindable(""), label = "주요 메뉴", onchange, class: className }:
    { items: { id: string; label: string; icon: IconName }[]; value?: string; label?: string; onchange?: (id: string) => void; class?: string } = $props();
</script>

<div class={["bl-tabbar bl-glass", className]} role="tablist" aria-label={label}>
  {#each items as it (it.id)}
    <button type="button" role="tab" class="bl-tab" aria-selected={it.id === value}
      onclick={() => { value = it.id; onchange?.(it.id); }}><Icon name={it.icon} filled={it.id === value} />{it.label}</button>
  {/each}
</div>
