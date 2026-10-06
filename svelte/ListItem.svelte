<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  /** href → <a>, onclick → <button>, 둘 다 없으면 <div>. <ul class="bl-list"><li> 안에 둡니다. */
  let { title, subtitle, icon, trailing, href, onclick, class: className }: {
    title: string; subtitle?: string; icon?: IconName;
    /** 오른쪽: 글자 또는 스니펫(Switch, Badge…). 생략하면 링크·버튼일 때 chevron */
    trailing?: string | Snippet; href?: string; onclick?: (e: MouseEvent) => void; class?: string;
  } = $props();
  const tag = $derived(href ? "a" : onclick ? "button" : "div");
</script>

<!-- svelte-ignore a11y_no_static_element_interactions — onclick이 있으면 tag가 button이 됩니다 -->
<svelte:element this={tag} class={["bl-item", className]} {href} type={tag === "button" ? "button" : undefined} {onclick}>
  {#if icon}<span class="bl-item-lead"><Icon name={icon} /></span>{/if}
  <span class="bl-item-text">
    <span class="bl-item-title">{title}</span>
    {#if subtitle}<span class="bl-item-sub">{subtitle}</span>{/if}
  </span>
  {#if typeof trailing === "string"}
    <span class="bl-item-trail">{trailing}</span>
  {:else if trailing}
    <span class="bl-item-trail">{@render trailing()}</span>
  {:else if tag !== "div"}
    <span class="bl-item-trail"><Icon name="chevron-right" /></span>
  {/if}
</svelte:element>
