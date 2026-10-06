<script lang="ts">
  import { onMount } from "svelte";
  import { palettes, getPalette, setPalette } from "./utils.js";
  import type { PaletteId } from "./types.js";
  let { value = $bindable(), apply = true, target, compact = false, label = "색 팔레트", onchange, class: className }: {
    /** bind:value로 쓰면 선택이 양방향으로 묶입니다 */
    value?: PaletteId;
    /** false면 data-palette를 바꾸지 않고 onchange만 부릅니다 */
    apply?: boolean;
    /** 팔레트를 적용할 요소 (기본: <html>) */
    target?: HTMLElement;
    compact?: boolean;
    label?: string;
    onchange?: (id: PaletteId) => void;
    class?: string;
  } = $props();
  let internal = $state<PaletteId>("espresso");
  const current = $derived(value ?? internal);
  onMount(() => { if (value === undefined) internal = getPalette(target) as PaletteId; });
  function pick(id: PaletteId) {
    internal = id;
    value = id;
    if (apply) setPalette(id, target);
    onchange?.(id);
  }
</script>

<div class={["bl-palettes", className]} role="radiogroup" aria-label={label}>
  {#each palettes as pl (pl.id)}
    <button type="button" role="radio" aria-checked={pl.id === current} class="bl-palette" aria-label={pl.name} data-palette={pl.id} onclick={() => pick(pl.id as PaletteId)}>
      <span class="bl-palette-dot" aria-hidden="true"></span>
      {#if !compact}<span class="bl-palette-name">{pl.name}</span>{:else}<span class="bl-sr-only">{pl.name}</span>{/if}
    </button>
  {/each}
</div>
