<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { locale } from "./locale.svelte.js";
  type Props = HTMLTextareaAttributes & {
    label: string; help?: string; /** 있으면 오류 상태, 로케일 errorPrefix("오류: ")로 표시 */ error?: string;
    /** 처음 보이는 줄 수 (기본 4) */ rows?: number;
    /** 내용에 맞춰 높이가 자랍니다(숨은 측정 요소 없이 scrollHeight로) */ autoResize?: boolean;
    /** autoResize일 때 최대 줄 수. 넘으면 안쪽이 스크롤됩니다 */ maxRows?: number;
  };
  let { label, help, error, rows = 4, autoResize = false, maxRows, value = $bindable(""), id, class: className, oninput, ...rest }: Props = $props();
  const uid = $props.id();
  const fid = $derived(id ?? uid);
  const L = $derived(locale.current);
  let el = $state<HTMLTextAreaElement>();

  function fit(t: HTMLTextAreaElement) {
    const cs = getComputedStyle(t), line = parseFloat(cs.lineHeight) || 26;
    const border = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
    const extra = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0) + border;
    t.style.height = "auto";
    const want = t.scrollHeight + border;
    const cap = maxRows ? Math.round(line * maxRows + extra) : Infinity;
    t.style.height = Math.min(want, cap) + "px";
    t.style.overflowY = want > cap ? "auto" : "hidden";
  }
  $effect(() => {
    void value; void maxRows;
    if (autoResize && el) fit(el);
  });
</script>

<div class={["bl-field", className]} data-invalid={error ? "true" : undefined}>
  <label class="bl-field-label" for={fid}>{label}</label>
  <textarea bind:this={el} id={fid} class={["bl-field-input bl-textarea", autoResize && "bl-textarea-auto"]} {rows} bind:value
    aria-invalid={error ? "true" : undefined} aria-describedby={error || help ? fid + "-help" : undefined}
    oninput={(e) => { if (autoResize) fit(e.currentTarget); oninput?.(e); }} {...rest}></textarea>
  {#if error || help}<p id={fid + "-help"} class="bl-field-help">{error ? L.errorPrefix + error : help}</p>{/if}
</div>
