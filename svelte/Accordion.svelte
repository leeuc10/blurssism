<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  /** 제목을 눌러 내용을 펼치는 목록. 네이티브 <details>·<summary>라 키보드·스크린리더 지원이 따라오고, JS가 없어도 열립니다. bind:value.
      기본은 하나만 열림: 같은 name을 붙여 브라우저가 나머지를 닫고, 모르는 브라우저에서는 ontoggle이 상태를 맞춰 닫습니다. multiple이면 여러 개.
      value는 하나만 열릴 때 문자열(없으면 ""), multiple이면 열린 id 배열. 내용은 items[].content 글자 또는 content 스니펫(항목 id를 받음). */
  let { items, value = $bindable(), multiple = false, onchange, content, class: className }: {
    items: { id: string; title: string; icon?: IconName; content?: string }[];
    value?: string | string[]; multiple?: boolean; onchange?: (value: string | string[]) => void;
    /** 항목 내용. 항목 id를 받습니다. 없으면 items[].content 글자를 그립니다 */
    content?: Snippet<[string]>; class?: string;
  } = $props();
  const base = $props.id();
  const open = $derived(value === undefined || value === "" ? [] : Array.isArray(value) ? value : [value]);
  function emit(list: string[]) { value = multiple ? list : (list[0] ?? ""); onchange?.(value); }
  function ontoggle(id: string, e: Event) {
    const isOpen = (e.currentTarget as HTMLDetailsElement).open, has = open.includes(id);
    if (isOpen === has) return;   // name으로 브라우저가 닫았거나 상태를 따라 닫힌 뒤의 toggle
    emit(isOpen ? (multiple ? [...open, id] : [id]) : open.filter((x) => x !== id));
  }
</script>

<div class={["bl-acc", className]}>
  {#each items as it (it.id)}
    <details class="bl-acc-item" open={open.includes(it.id)} name={multiple ? undefined : base} ontoggle={(e) => ontoggle(it.id, e)}>
      <summary class="bl-acc-summary">
        {#if it.icon}<Icon name={it.icon} class="bl-acc-icon" />{/if}
        <span class="bl-acc-title">{it.title}</span>
        <Icon name="chevron-right" class="bl-acc-chevron" />
      </summary>
      <div class="bl-acc-body">{#if content}{@render content(it.id)}{:else}{it.content}{/if}</div>
    </details>
  {/each}
</div>
