<script lang="ts">
  import type { Snippet } from "svelte";
  import { placeTooltip } from "./a11y.js";
  /** children은 툴팁 id를 받습니다: {#snippet children(id)}<button aria-describedby={id}>…{/snippet}
      최상위 층(popover)에 띄워 overflow: hidden인 부모에 잘리지 않습니다. Esc로 닫힙니다. */
  let { label, children }: { label: string; children?: Snippet<[string]> } = $props();
  const id = $props.id();
  let wrap = $state<HTMLSpanElement>();
  let tip = $state<HTMLSpanElement>();
  let open = $state(false);
  $effect(() => {
    if (!tip || !wrap || !tip.showPopover) return;
    if (!open) { if (tip.matches(":popover-open")) tip.hidePopover(); return; }
    if (!tip.matches(":popover-open")) tip.showPopover();
    placeTooltip(tip, wrap.firstElementChild ?? wrap);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions — 이벤트는 안쪽 조작 요소에서 올라온 것을 받습니다 -->
<span class="bl-tip" bind:this={wrap} onmouseenter={() => (open = true)} onmouseleave={() => (open = false)}
  onfocusin={() => (open = true)} onfocusout={() => (open = false)}
  onkeydown={(e) => { if (e.key === "Escape" && open) { e.stopPropagation(); open = false; } }}
>{@render children?.(id)}<span {id} bind:this={tip} role="tooltip" popover="manual" class="bl-tooltip-pop bl-crema-thick bl-glass-thick">{label}</span></span>
