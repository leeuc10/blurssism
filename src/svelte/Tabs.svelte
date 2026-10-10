<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  import { locale } from "./locale.svelte.js";
  /** 같은 화면 안에서 내용 묶음을 바꾸는 콘텐츠 탭(tablist). 화면을 옮기는 하단 메뉴는 TabBar. bind:value.
      패널 내용은 panel 스니펫이 지금 탭의 id를 받아 그립니다. 지금 탭만 Tab 순서에 들고, 방향키·Home·End가 포커스와 선택을 함께 옮깁니다(비활성 탭은 건너뜀).
      패널은 지금 것만 그리고, keepMounted면 나머지도 그려 두고 hidden으로 숨깁니다(입력 상태를 지킬 때). */
  let { items, value = $bindable(), label, variant = "line", keepMounted = false, onchange, panel, class: className }: {
    items: { id: string; label: string; icon?: IconName; disabled?: boolean }[];
    value?: string; label?: string; variant?: "line" | "pill"; keepMounted?: boolean; onchange?: (id: string) => void;
    /** 패널 내용. 탭 id를 받습니다(keepMounted면 모든 탭의 id로 한 번씩). */
    panel?: Snippet<[string]>; class?: string;
  } = $props();
  const base = $props.id();
  const ids = $derived(items.filter((i) => !i.disabled).map((i) => i.id));
  // 없거나 비활성인 값이면 첫 활성 탭
  const cur = $derived(value !== undefined && ids.includes(value) ? value : ids[0]);
  const tabId = (id: string) => `${base}-tab-${id}`, panelId = (id: string) => `${base}-panel-${id}`;
  function pick(id: string) { if (id === cur) return; value = id; onchange?.(id); }
  /** 방향키·Home·End: 선택을 옮기고 포커스도 따라갑니다 (a11y.rovingKey는 radio 전용이라 tab용으로 다시 씁니다) */
  function onkeydown(e: KeyboardEvent) {
    const n = ids.length, i = ids.indexOf(cur);
    if (!n) return;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i < 0 ? n - 1 : (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    pick(ids[next]);
    document.getElementById(tabId(ids[next]))?.focus();
  }
</script>

<div class={["bl-tabs", "bl-tabs-" + variant, className]}>
  <div class="bl-tabs-list" role="tablist" aria-label={label ?? locale.current.tabs} tabindex="-1" {onkeydown}>
    {#each items as it (it.id)}
      <button type="button" role="tab" id={tabId(it.id)} class="bl-tabs-tab" aria-selected={it.id === cur}
        aria-controls={it.id === cur || keepMounted ? panelId(it.id) : undefined} tabindex={it.id === cur ? 0 : -1}
        disabled={it.disabled || undefined} onclick={() => pick(it.id)}>
        {#if it.icon}<Icon name={it.icon} />{/if}<span>{it.label}</span>
      </button>
    {/each}
  </div>
  {#each items as it (it.id)}
    {#if it.id === cur || keepMounted}
      <div role="tabpanel" id={panelId(it.id)} aria-labelledby={tabId(it.id)} class="bl-tabs-panel" tabindex="0" hidden={it.id !== cur || undefined}>
        {@render panel?.(it.id)}
      </div>
    {/if}
  {/each}
</div>
