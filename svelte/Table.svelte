<script lang="ts" generics="R extends Record<string, unknown>">
  import type { Snippet } from "svelte";
  type Column = { key: string; label: string; numeric?: boolean; format?: (row: R) => string };
  /** cell 스니펫을 주면 모든 칸을 직접 그립니다: {#snippet cell(row, col)}…{/snippet} */
  let { columns, rows, caption, cell, class: className }:
    { columns: Column[]; rows: R[]; caption?: string; cell?: Snippet<[R, Column]>; class?: string } = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex — 가로 스크롤 영역을 키보드로 움직이기 위해 필요 -->
<div class="bl-table-wrap" tabindex={caption ? 0 : undefined} role={caption ? "region" : undefined} aria-label={caption}>
  <table class={["bl-table", className]}>
    {#if caption}<caption>{caption}</caption>{/if}
    <thead><tr>{#each columns as c (c.key)}<th scope="col" class={c.numeric ? "bl-num" : undefined}>{c.label}</th>{/each}</tr></thead>
    <tbody>
      {#each rows as r, i (r.id ?? i)}
        <tr>
          {#each columns as c (c.key)}
            <td class={c.numeric ? "bl-num" : undefined}>
              {#if cell}{@render cell(r, c)}{:else}{c.format ? c.format(r) : r[c.key]}{/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
