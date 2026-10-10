<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import IconButton from "./IconButton.svelte";
  import { locale } from "./locale.svelte.js";
  /** 페이지 번호 이동. <nav> 안에 이전·다음 아이콘 버튼과 캡슐 번호 버튼, 지금 페이지에 aria-current="page". bind:page.
      처음·끝 번호는 항상 보이고 건너뛰는 곳은 "…". */
  type Props = Omit<HTMLAttributes<HTMLElement>, "onchange"> & {
    /** 전체 페이지 수 (1 이상) */ count: number;
    /** 지금 페이지(1부터). bind:page */ page?: number;
    /** 지금 페이지 양옆에 보일 번호 개수 (기본 1) */ siblings?: number;
    /** nav의 aria-label. 생략하면 로케일 pageOf(page, count) */ label?: string;
    onchange?: (page: number) => void;
  };
  let { count, page = $bindable(1), siblings = 1, label, onchange, class: className, ...rest }: Props = $props();
  const L = $derived(locale.current);
  const total = $derived(Math.max(1, count | 0));
  const cur = $derived(Math.min(Math.max(1, page | 0), total));

  function range(p: number, n: number, s: number): (number | null)[] {
    s = Math.max(0, s);
    const out: (number | null)[] = [], run = (a: number, b: number) => { for (let k = a; k <= b; k++) out.push(k); };
    if (n <= s * 2 + 5) { run(1, n); return out; }
    const left = Math.max(p - s, 1), right = Math.min(p + s, n), w = s * 2 + 3;
    if (left <= 2) { run(1, w); out.push(null, n); }
    else if (right >= n - 1) { out.push(1, null); run(n - w + 1, n); }
    else { out.push(1, null); run(left, right); out.push(null, n); }
    return out;
  }
  const items = $derived(range(cur, total, siblings));
  function go(n: number) { if (n < 1 || n > total || n === cur) return; page = n; onchange?.(n); }
</script>

<nav class={["bl-pagination", className]} aria-label={label ?? L.pageOf(cur, total)} {...rest}>
  <IconButton plain icon="chevron-left" label={L.prevPage} disabled={cur <= 1} onclick={() => go(cur - 1)} />
  <ul class="bl-pagination-list">
    {#each items as n, i (n === null ? "gap" + i : n)}
      <li>
        {#if n === null}<span class="bl-page-gap" aria-hidden="true">…</span>
        {:else}<button type="button" class="bl-page" aria-label={L.page(n)} aria-current={n === cur ? "page" : undefined} onclick={() => go(n)}>{n}</button>{/if}
      </li>
    {/each}
  </ul>
  <IconButton plain icon="chevron-right" label={L.nextPage} disabled={cur >= total} onclick={() => go(cur + 1)} />
</nav>
