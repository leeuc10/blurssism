<script lang="ts">
  import { rovingKey } from "./a11y.js";
  let { items, value = $bindable(""), label, block = false, onchange, class: className }:
    { items: { id: string; label: string }[]; value?: string; label: string; block?: boolean; onchange?: (id: string) => void; class?: string } = $props();
  const ids = $derived(items.map((i) => i.id));
  // 고른 것이 없으면 첫 항목으로 들어옵니다
  const tab = $derived(ids.includes(value) ? value : ids[0]);
  function pick(id: string) { value = id; onchange?.(id); }
</script>

<div class={["bl-seg", block && "bl-seg-block", className]} role="radiogroup" aria-label={label} tabindex="-1" onkeydown={(e) => rovingKey(e, ids, value, pick)}>
  {#each items as it (it.id)}
    <button type="button" role="radio" class="bl-seg-item" aria-checked={it.id === value} tabindex={it.id === tab ? 0 : -1}
      onclick={() => pick(it.id)}>{it.label}</button>
  {/each}
</div>
