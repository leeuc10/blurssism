<script lang="ts">
  import IconButton from "./IconButton.svelte";
  let { value = $bindable(), min, max, today = new Date(), onchange, class: className }:
    { value?: Date; min?: Date; max?: Date; today?: Date; onchange?: (date: Date) => void; class?: string } = $props();
  const DOW = ["일", "월", "화", "수", "목", "금", "토"];
  // svelte-ignore state_referenced_locally — 처음 보여 줄 달만 정합니다
  const init = value ?? today;
  let month = $state(new Date(init.getFullYear(), init.getMonth(), 1));
  const y = $derived(month.getFullYear());
  const m = $derived(month.getMonth());
  const first = $derived(new Date(y, m, 1).getDay());
  const days = $derived(Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => new Date(y, m, i + 1)));
  const same = (a?: Date, b?: Date) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  function pick(d: Date) { value = d; onchange?.(d); }
</script>

<div class={["bl-cal", className]}>
  <div class="bl-cal-head">
    <IconButton icon="chevron-left" label="이전 달" plain onclick={() => (month = new Date(y, m - 1, 1))} />
    <p class="bl-cal-title" aria-live="polite">{y}년 {m + 1}월</p>
    <IconButton icon="chevron-right" label="다음 달" plain onclick={() => (month = new Date(y, m + 1, 1))} />
  </div>
  <div class="bl-cal-grid">
    {#each DOW as w (w)}<span class="bl-cal-dow" aria-hidden="true">{w}</span>{/each}
    {#each Array(first) as _, i (i)}<span></span>{/each}
    {#each days as d (d.getDate())}
      <button type="button" class="bl-cal-day" disabled={(min && d < min) || (max && d > max)}
        aria-pressed={same(d, value)} data-today={String(same(d, today))}
        aria-label="{y}년 {m + 1}월 {d.getDate()}일 {DOW[d.getDay()]}요일" onclick={() => pick(d)}>{d.getDate()}</button>
    {/each}
  </div>
</div>
