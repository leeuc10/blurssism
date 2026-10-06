<script lang="ts">
  import type { Snippet } from "svelte";
  /** children은 툴팁 id를 받습니다: {#snippet children(id)}<button aria-describedby={id}>…{/snippet} */
  let { label, children }: { label: string; children?: Snippet<[string]> } = $props();
  const id = $props.id();
</script>

<span class="bl-tip">{@render children?.(id)}<span {id} role="tooltip" class="bl-tooltip bl-glass-thick">{label}</span></span>
