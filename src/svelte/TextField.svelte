<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  type Props = HTMLInputAttributes & { label: string; help?: string; /** 있으면 오류 상태, "오류:" 접두어로 표시 */ error?: string };
  let { label, help, error, value = $bindable(""), id, class: className, ...rest }: Props = $props();
  const uid = $props.id();
  const fid = $derived(id ?? uid);
</script>

<div class={["bl-field", className]} data-invalid={error ? "true" : undefined}>
  <label class="bl-field-label" for={fid}>{label}</label>
  <input id={fid} class="bl-field-input" bind:value aria-invalid={error ? "true" : undefined}
    aria-describedby={error || help ? fid + "-help" : undefined} {...rest} />
  {#if error || help}<p id={fid + "-help"} class="bl-field-help">{error ? "오류: " + error : help}</p>{/if}
</div>
