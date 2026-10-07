<script lang="ts">
  import { onMount, tick } from "svelte";
  import IconButton from "./IconButton.svelte";
  import { calendarKey, dayOf } from "./a11y.js";
  let { value = $bindable(), min, max, today, onchange, class: className }:
    { value?: Date; min?: Date; max?: Date; today?: Date; onchange?: (date: Date) => void; class?: string } = $props();
  const DOW = ["일", "월", "화", "수", "목", "금", "토"];
  // 오늘은 마운트한 뒤에 정합니다. 서버(UTC)와 브라우저의 날짜가 달라 하이드레이션이 어긋나지 않게.
  let now = $state<Date>();
  onMount(() => { now = new Date(); });
  const todayDate = $derived(today ?? now);
  // svelte-ignore state_referenced_locally — 처음 보여 줄 달만 정합니다
  const init = value ?? today ?? new Date();
  let month = $state(new Date(init.getFullYear(), init.getMonth(), 1));
  // 바깥에서 값이 다른 달로 바뀌면 따라갑니다
  const valueMonth = $derived(value ? value.getFullYear() * 12 + value.getMonth() : null);
  $effect(() => { if (valueMonth !== null && value) month = new Date(value.getFullYear(), value.getMonth(), 1); });
  let active = $state<Date>();
  let grid = $state<HTMLDivElement>();
  const y = $derived(month.getFullYear());
  const m = $derived(month.getMonth());
  const first = $derived(new Date(y, m, 1).getDay());
  const days = $derived(Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => new Date(y, m, i + 1)));
  const lo = $derived(dayOf(min));
  const hi = $derived(dayOf(max));
  const same = (a?: Date, b?: Date) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const inMonth = (d?: Date) => !!d && d.getFullYear() === y && d.getMonth() === m;
  const off = (d: Date) => (!!lo && d < lo) || (!!hi && d > hi);
  const tab = $derived(inMonth(active) ? active! : inMonth(value) ? dayOf(value)! : inMonth(todayDate) ? dayOf(todayDate)! : new Date(y, m, 1));
  function pick(d: Date) { active = d; if (off(d)) return; value = d; onchange?.(d); }
  function go(n: number) { active = undefined; month = new Date(y, m + n, 1); }
  async function onkey(e: KeyboardEvent) {
    const next = calendarKey(e, tab);
    if (!next) return;
    e.preventDefault();
    active = next;
    if (!inMonth(next)) month = new Date(next.getFullYear(), next.getMonth(), 1);
    await tick();
    grid?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  }
</script>

<div class={["bl-cal", className]}>
  <div class="bl-cal-head">
    <IconButton icon="chevron-left" label="이전 달" plain onclick={() => go(-1)} />
    <p class="bl-cal-title" aria-live="polite">{y}년 {m + 1}월</p>
    <IconButton icon="chevron-right" label="다음 달" plain onclick={() => go(1)} />
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions — 키 입력은 안쪽 날짜 버튼에서 올라온 것을 받습니다 -->
  <div class="bl-cal-grid" bind:this={grid} onkeydown={onkey}>
    {#each DOW as w (w)}<span class="bl-cal-dow" aria-hidden="true">{w}</span>{/each}
    {#each Array(first) as _, i (i)}<span></span>{/each}
    {#each days as d (d.getDate())}
      <button type="button" class="bl-cal-day" aria-disabled={off(d) ? "true" : undefined} tabindex={same(d, tab) ? 0 : -1}
        aria-pressed={same(d, value)} data-today={String(same(d, todayDate))}
        aria-label="{y}년 {m + 1}월 {d.getDate()}일 {DOW[d.getDay()]}요일" onclick={() => pick(d)}>{d.getDate()}</button>
    {/each}
  </div>
</div>
