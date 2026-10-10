<script lang="ts">
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  /** 화면 이동 메뉴라 탭(tablist)이 아니라 <nav>와 aria-current를 씁니다. 항목에 href가 있으면 링크로.
      기본으로 lg(1120px)부터 숨습니다(그때는 NavBar 링크). 계속 보이려면 hideFrom={false}. */
  let { items, value = $bindable(""), label = "주요 메뉴", hideFrom = "lg", onchange, class: className }: {
    items: { id: string; label: string; icon: IconName; href?: string }[]; value?: string; label?: string;
    hideFrom?: "sm" | "md" | "lg" | "xl" | false; onchange?: (id: string) => void; class?: string;
  } = $props();
  function pick(id: string) { value = id; onchange?.(id); }
</script>

<nav class={["bl-tabbar bl-crema", hideFrom && "bl-hide-from-" + hideFrom, className]} aria-label={label}>
  {#each items as it (it.id)}
    {#if it.href}
      <a href={it.href} class="bl-tab" aria-current={it.id === value ? "page" : undefined} onclick={() => pick(it.id)}><Icon name={it.icon} filled={it.id === value} />{it.label}</a>
    {:else}
      <button type="button" class="bl-tab" aria-current={it.id === value ? "page" : undefined} onclick={() => pick(it.id)}><Icon name={it.icon} filled={it.id === value} />{it.label}</button>
    {/if}
  {/each}
</nav>
