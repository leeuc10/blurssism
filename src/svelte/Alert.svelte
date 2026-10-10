<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { IconName } from "./types.js";
  import Icon from "./Icon.svelte";
  import IconButton from "./IconButton.svelte";
  import { locale } from "./locale.svelte.js";
  /** 흐름 안의 불투명 안내 띠(떠 있지 않으므로 크레마가 아님). 색만으로 알리지 않도록 아이콘이 항상 붙습니다.
      info·positive는 role="status", warning·danger는 role="alert". */
  type Props = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
    tone?: "info" | "positive" | "warning" | "danger"; title?: string;
    /** 기본 아이콘(info spark · positive check · warning·danger alert)을 바꿉니다 */ icon?: IconName;
    children?: Snippet; /** 아래에 놓일 행동 버튼들 */ actions?: Snippet;
    /** 주면 오른쪽에 닫기 아이콘 버튼이 생깁니다 */ ondismiss?: () => void;
  };
  let { tone = "info", title, icon, children, actions, ondismiss, role, class: className, ...rest }: Props = $props();
  const L = $derived(locale.current);
  const icons: Record<string, IconName> = { info: "spark", positive: "check", warning: "alert", danger: "alert" };
  const urgent = $derived(tone === "warning" || tone === "danger");
</script>

<div class={["bl-alert", "bl-alert-" + tone, className]} role={role ?? (urgent ? "alert" : "status")} {...rest}>
  <Icon name={icon ?? icons[tone]} class="bl-alert-icon" />
  <div class="bl-alert-body">
    {#if title}<p class="bl-alert-title">{title}</p>{/if}
    {#if children}<div class="bl-alert-text">{@render children()}</div>{/if}
    {#if actions}<div class="bl-alert-actions">{@render actions()}</div>{/if}
  </div>
  {#if ondismiss}<IconButton plain icon="close" label={L.dismiss} class="bl-alert-close" onclick={ondismiss} />{/if}
</div>
