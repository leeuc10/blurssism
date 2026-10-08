/* blurssism Svelte 타입 · © caffeinecat · MIT */
export type IconName =
  | "home" | "search" | "heart" | "chat" | "person" | "bell" | "settings" | "plus"
  | "spark" | "check" | "close" | "chevron-right" | "chevron-left" | "alert" | "inbox" | "calendar";
export type PaletteId =
  | "black" | "espresso" | "matcha" | "chai" | "coldbrew" | "mocha" | "classic"
  | "blue" | "indigo" | "violet" | "teal" | "emerald" | "pink" | "graphite";
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export interface Option { value: string; label: string; disabled?: boolean; description?: string }
