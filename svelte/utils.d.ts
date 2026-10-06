/* 생성 파일 */
import type { PaletteId, Breakpoint } from "./types.js";
export interface PaletteInfo { id: PaletteId; name: string; group: "caffeine" | "web"; description: string; swatch: { light: string; dark: string } }
/** 팔레트 목록 */
export declare const palettes: PaletteInfo[];
/** 브레이크포인트 min-width(px) */
export declare const breakpoints: { sm: 600; md: 768; lg: 1120; xl: 1440 };
/** 팔레트를 바꿉니다. el을 주면 그 요소 아래만. */
export declare function setPalette(id: PaletteId | (string & {}), el?: HTMLElement): boolean;
export declare function getPalette(el?: HTMLElement): PaletteId | (string & {});
/** "system"이면 시스템 설정을 따릅니다. */
export declare function setTheme(theme: "light" | "dark" | "system", el?: HTMLElement): void;
export declare function getTheme(el?: HTMLElement): "light" | "dark";
export declare function getBreakpoint(width?: number): Breakpoint;
export declare function isAtLeast(bp: Breakpoint, width?: number): boolean;
/** 단계가 바뀔 때마다 호출. 해제 함수를 돌려줍니다. */
export declare function onBreakpointChange(cb: (bp: Breakpoint) => void): () => void;

/** 저사양 기기·절전·투명도 줄이기 설정이면 true */
export declare function shouldReduceGlass(): boolean;
/** 데스크톱 모드를 켤 만한 기기인지 (lg 이상, 마우스, 코어 6개·메모리 8GB 이상) */
export declare function isDesktopCapable(): boolean;
export type GlassMode = "off" | "on" | "rich";
export interface GlassOptions {
  /** 데스크톱 모드. "auto"(기본)는 데스크톱일 때만 켭니다. false면 끕니다. */
  rich?: boolean | "auto";
  /** 데스크톱 모드에서 포인터 주변 빛. 기본 true (동작 줄이기 설정이면 꺼짐) */
  pointerLight?: boolean;
  /** true면 기기 판단 없이 크레마를 켜고, false면 끕니다. */
  force?: boolean;
}
/**
 * <html data-glass="off|on|rich">를 정합니다. 크레마가 켜졌으면 true.
 * applyGlassPreference() · applyGlassPreference({ rich: false }) · applyGlassPreference(false)
 */
export declare function applyGlassPreference(options?: boolean | GlassOptions): boolean;
/** 크레마 모드를 바로 정합니다. "auto"는 applyGlassPreference()와 같습니다. */
export declare function setGlassMode(mode: GlassMode | "auto"): boolean;
export declare function getGlassMode(): GlassMode;

export interface PaletteValues { accent: string; "accent-soft": string; "on-accent": string; "accent-ink": string; deco: string; "glass-tint-accent": string }
export interface PaletteWarning { code: "adjusted" | "danger" | "warning" | "positive" | "neutral"; message: string }
export interface CustomPalette {
  id: string;
  name: string;
  group: "custom";
  /** 넣은 색 (#rrggbb) */
  source: string;
  /** 대비를 맞추려고 라이트 강조색을 바꿨으면 true */
  adjusted: boolean;
  values: { light: PaletteValues; dark: PaletteValues };
  warnings: PaletteWarning[];
}
export interface BrandColorOptions {
  /** data-palette 값 (기본 "brand") */
  id?: string;
  name?: string;
  /** 적용할 요소 (기본 <html>) */
  target?: HTMLElement;
  /** false면 <style>만 넣고 data-palette는 바꾸지 않습니다 */
  apply?: boolean;
}
/** 브랜드색 하나로 라이트·다크 강조색 묶음을 WCAG 대비에 맞춰 만듭니다. 서버에서도 됩니다. */
export declare function createPalette(color: string, options?: { id?: string; name?: string }): CustomPalette;
/** createPalette 결과를 CSS로 */
export declare function paletteToCss(palette: CustomPalette): string;
/** 브랜드색 팔레트를 만들어 바로 적용합니다. */
export declare function applyBrandColor(color: string, options?: BrandColorOptions): CustomPalette;
/** 두 hex 색의 WCAG 대비 */
export declare function contrastRatio(a: string, b: string): number;
export declare const version: string;
export declare const author: "caffeinecat";
