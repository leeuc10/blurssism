<script lang="ts">
  import Toast from "./Toast.svelte";
  import { toast } from "./toast.svelte.js";
  /** toast.show()로 띄운 토스트가 쌓이는 자리. 앱 루트에 한 번 둡니다. 아래 가운데, lg 이상은 오른쪽 아래. */
  let { class: className }: { class?: string } = $props();
</script>

<div class={["bl-toaster", className]} aria-live="polite" aria-relevant="additions">
  {#each toast.list as t (t.id)}
    <!-- svelte-ignore a11y_no_static_element_interactions — 마우스를 올리면 자동 닫힘을 멈춥니다 -->
    <div class="bl-toaster-item" data-closing={t.closing ? "true" : undefined} onmouseenter={() => toast.pause(t.id)} onmouseleave={() => toast.resume(t)}>
      <Toast tone={t.tone} actionLabel={t.actionLabel} ondismiss={t.dismissible === false ? undefined : () => toast.dismiss(t.id)}
        onaction={() => { t.onaction?.(); toast.dismiss(t.id); }}>{t.message}</Toast>
    </div>
  {/each}
</div>
