<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconName } from "./types.js";
  import Badge from "./Badge.svelte";
  let { title, meta, image, imageAlt = "", ratio, badge, badgeTone = "positive", badgeIcon, lite = false, action, class: className }: {
    title: string; meta?: string; image?: string; imageAlt?: string;
    /** CSS aspect-ratio, 기본 "4 / 5" */ ratio?: string;
    badge?: string; badgeTone?: "neutral" | "accent" | "positive" | "warning" | "danger"; badgeIcon?: IconName;
    /** 긴 목록에서 반복될 때: 블러 없는 가벼운 크레마 (성능) */ lite?: boolean;
    /** 캡션 오른쪽 (보통 IconButton) */ action?: Snippet; class?: string;
  } = $props();
</script>

<article class={["bl-media", className]} style:aspect-ratio={ratio}>
  {#if image}
    <img class="bl-media-img" src={image} alt={imageAlt} />
  {:else}
    <div class="bl-media-ph" aria-hidden="true">
      <span class="bl-ring"></span><span class="bl-ring bl-ring-deco"></span>
    </div>
  {/if}
  {#if badge}<Badge tone={badgeTone} icon={badgeIcon}>{badge}</Badge>{/if}
  <div class={["bl-media-bar", lite ? "bl-crema-lite" : "bl-crema"]}>
    <div class="bl-media-text">
      <p class="bl-media-title">{title}</p>
      {#if meta}<p class="bl-media-meta">{meta}</p>{/if}
    </div>
    {@render action?.()}
  </div>
</article>
