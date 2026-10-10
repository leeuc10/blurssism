<script module lang="ts">
  import type { IconName } from "./types.js";
  export type MenuItem = { id: string; label: string; icon?: IconName; /** 삭제·신고처럼 위험한 행동 */ danger?: boolean; disabled?: boolean; /** 주면 <a>로 */ href?: string };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";
  import Popover, { type PopoverTriggerProps } from "./Popover.svelte";
  import { locale } from "./locale.svelte.js";
  /** Popover 위에 얹은 행동 메뉴(role="menu"). bind:open. items의 "-"는 구분선. 방향키·Home·End로 옮기고 Enter·Space로 고르면 onselect(id) 뒤에 닫힙니다.
      disabled 항목은 포커스는 받되(aria-disabled) 고를 수 없고, href가 있으면 <a>로 그립니다. */
  let { open = $bindable(false), onopenchange, items, onselect, label, placement, trigger, class: className }: {
    open?: boolean; onopenchange?: (open: boolean) => void;
    items: (MenuItem | "-")[]; onselect?: (id: string) => void;
    /** 메뉴 이름(aria-label). 기본은 로케일의 menu("메뉴") */
    label?: string;
    placement?: "bottom-start" | "bottom-end" | "bottom" | "top";
    trigger?: Snippet<[PopoverTriggerProps]>; class?: string;
  } = $props();
  const name = $derived(label ?? locale.current.menu);
  const ids = $derived(items.filter((it): it is MenuItem => it !== "-").map((it) => it.id));
  let cur = $state<string>();
  function pick(it: MenuItem) {
    if (it.disabled) return;
    open = false; onopenchange?.(false);
    onselect?.(it.id);
  }
  /** 방향키·Home·End로 포커스를 옮기고, 링크 항목은 Space로도 고릅니다 */
  function onkeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    if (e.key === " " && target.tagName === "A") { e.preventDefault(); target.click(); return; }
    const n = ids.length, i = cur === undefined ? -1 : ids.indexOf(cur);
    if (!n) return;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i < 0 ? n - 1 : (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    cur = ids[next];
    (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="menuitem"]')[next]?.focus();
  }
</script>

<Popover bind:open {onopenchange} {placement} label={name} haspopup="menu" {trigger} class={className ? "bl-menu-pop " + className : "bl-menu-pop"}>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_interactive_supports_focus — 포커스는 항목이 받고(roving tabindex), 키보드 이동은 메뉴가 받습니다 -->
  <div role="menu" class="bl-menu" aria-label={name} {onkeydown}>
    {#each items as it, i (it === "-" ? "sep" + i : it.id)}
      {#if it === "-"}
        <div role="separator" class="bl-menu-sep"></div>
      {:else}
        {@const tabindex = (cur !== undefined ? cur === it.id : ids[0] === it.id) ? 0 : -1}
        {#if it.href}
          <a role="menuitem" class="bl-menu-item" href={it.href} {tabindex} data-danger={it.danger ? "true" : undefined} aria-disabled={it.disabled ? "true" : undefined}
            onfocus={() => (cur = it.id)} onclick={(e) => { if (it.disabled) { e.preventDefault(); return; } pick(it); }}>
            {#if it.icon}<Icon name={it.icon} />{/if}<span class="bl-menu-label">{it.label}</span>
          </a>
        {:else}
          <button type="button" role="menuitem" class="bl-menu-item" {tabindex} data-danger={it.danger ? "true" : undefined} aria-disabled={it.disabled ? "true" : undefined}
            onfocus={() => (cur = it.id)} onclick={() => pick(it)}>
            {#if it.icon}<Icon name={it.icon} />{/if}<span class="bl-menu-label">{it.label}</span>
          </button>
        {/if}
      {/if}
    {/each}
  </div>
</Popover>
