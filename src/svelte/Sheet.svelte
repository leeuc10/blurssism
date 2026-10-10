<script lang="ts">
  import type { Snippet } from "svelte";
  /** 두꺼운 블러 바텀시트. 열고 닫기·scrim·포커스는 소비자가 관리합니다. children = 버튼들 */
  let { title, description, children, class: className }: { title: string; description?: string; children?: Snippet; class?: string } = $props();
</script>

<div class={["bl-sheet bl-crema-thick", className]} role="dialog" aria-label={title}>
  <div class="bl-sheet-grip" aria-hidden="true"></div>
  <h2 class="bl-sheet-title">{title}</h2>
  {#if description}<p class="bl-sheet-body">{description}</p>{/if}
  <div class="bl-sheet-actions">{@render children?.()}</div>
</div>
