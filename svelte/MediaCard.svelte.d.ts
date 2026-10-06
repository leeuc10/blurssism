import type { Snippet } from "svelte";
import type { IconName } from "./types.js";
type $$ComponentProps = {
    title: string;
    meta?: string;
    image?: string;
    imageAlt?: string;
    /** CSS aspect-ratio, 기본 "4 / 5" */ ratio?: string;
    badge?: string;
    badgeTone?: "neutral" | "accent" | "positive" | "warning" | "danger";
    badgeIcon?: IconName;
    /** 긴 목록에서 반복될 때: 블러 없는 가벼운 유리 (성능) */ lite?: boolean;
    /** 캡션 오른쪽 (보통 IconButton) */ action?: Snippet;
    class?: string;
};
declare const MediaCard: import("svelte").Component<$$ComponentProps, {}, "">;
type MediaCard = ReturnType<typeof MediaCard>;
export default MediaCard;
