<script lang="ts">
  let { items, value = $bindable(""), label, block = false, onchange, class: className }:
    { items: { id: string; label: string }[]; value?: string; label: string; block?: boolean; onchange?: (id: string) => void; class?: string } = $props();
  function pick(id: string) { value = id; onchange?.(id); }
  function key(e: KeyboardEvent) {
    const ids = items.map((i) => i.id), i = ids.indexOf(value);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); pick(ids[(i + 1) % ids.length]); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); pick(ids[(i - 1 + ids.length) % ids.length]); }
  }
</script>

<div class={["bl-seg", block && "bl-seg-block", className]} role="radiogroup" aria-label={label} tabindex="-1" onkeydown={key}>
  {#each items as it (it.id)}
    <button type="button" role="radio" class="bl-seg-item" aria-checked={it.id === value} tabindex={it.id === value ? 0 : -1}
      onclick={() => pick(it.id)}>{it.label}</button>
  {/each}
</div>
