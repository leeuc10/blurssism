<script lang="ts">
  import { onMount } from "svelte";
  import { palettes, getPalette, setPalette, getCustomPalettes, onCustomPalettesChange } from "./utils.js";
  import { rovingKey } from "./a11y.js";
  import { locale } from "./locale.svelte.js";
  import type { PaletteId } from "./types.js";
  let { value = $bindable(), apply = true, target, compact = false, group, custom = true, label, onchange, class: className }: {
    /** bind:value로 쓰면 선택이 양방향으로 묶입니다 */
    value?: PaletteId | (string & {});
    /** false면 data-palette를 바꾸지 않고 onchange만 부릅니다 */
    apply?: boolean;
    /** 팔레트를 적용할 요소 (기본: <html>) */
    target?: HTMLElement;
    compact?: boolean;
    /** 한 묶음만 보이기: "caffeine", "web", "custom"(applyBrandColor로 등록한 것). 생략하면 전부 */
    group?: "caffeine" | "web" | "custom";
    /** false면 applyBrandColor()로 등록한 브랜드 팔레트를 숨깁니다 */
    custom?: boolean;
    label?: string;
    onchange?: (id: PaletteId | (string & {})) => void;
    class?: string;
  } = $props();
  let internal = $state<string>("black");
  // 서버와 첫 렌더는 빈 목록(하이드레이션), 마운트 뒤에 채웁니다
  let registered = $state<{ id: string; name: string; group: string }[]>([]);
  const current = $derived(value ?? internal);
  const list = $derived([
    ...palettes.filter((pl) => !group || pl.group === group),
    ...(custom && (!group || group === "custom") ? registered : []),
  ]);
  const ids = $derived(list.map((pl) => pl.id));
  const tab = $derived(ids.includes(current) ? current : ids[0]);
  onMount(() => {
    if (value === undefined) internal = getPalette(target);
    registered = getCustomPalettes();
    return onCustomPalettesChange(() => (registered = getCustomPalettes()));
  });
  function pick(id: string) {
    internal = id;
    value = id;
    if (apply) setPalette(id, target);
    onchange?.(id);
  }
</script>

<div class={["bl-palettes", className]} role="radiogroup" aria-label={label ?? locale.current.palette} tabindex="-1" onkeydown={(e) => rovingKey(e, ids, current, pick)}>
  {#each list as pl (pl.id)}
    <button type="button" role="radio" aria-checked={pl.id === current} tabindex={pl.id === tab ? 0 : -1} class="bl-palette" aria-label={pl.name} data-palette={pl.id} onclick={() => pick(pl.id)}>
      <span class="bl-palette-dot" aria-hidden="true"></span>
      {#if !compact}<span class="bl-palette-name">{pl.name}</span>{:else}<span class="bl-sr-only">{pl.name}</span>{/if}
    </button>
  {/each}
</div>
