<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  type Props = HTMLButtonAttributes & { icon: IconName; /** 스크린리더 문구 (필수) */ label: string; pressed?: boolean; /** 유리 없이 투명 */ plain?: boolean };
  let { icon, label, pressed, plain = false, class: className, ...rest }: Props = $props();
</script>

<button type="button" class={["bl-icon-btn", plain && "bl-icon-btn-plain", className]} aria-label={label}
  aria-pressed={pressed} {...rest}><Icon name={icon} filled={!!pressed} /></button>
