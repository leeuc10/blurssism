<script lang="ts">
  let { name, image, size = "md", class: className }: { name: string; image?: string; size?: "sm" | "md" | "lg"; class?: string } = $props();
  const initials = $derived.by(() => {
    const nm = name.trim();
    return /^\+\d+$/.test(nm) ? nm : nm.slice(0, /[A-Za-z]/.test(nm[0] ?? "") ? 2 : 1).toUpperCase();
  });
</script>

<span class={["bl-avatar", size !== "md" && "bl-avatar-" + size, className]} role="img" aria-label={name}>
  {#if image}<img src={image} alt="" />{:else}{initials}{/if}
</span>
