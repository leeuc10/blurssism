/* 생성 파일 */
import type { PaletteId, Breakpoint } from "./types.js";
export interface PaletteInfo { id: PaletteId; name: string; group: "caffeine" | "web"; description: string; swatch: { light: string; dark: string } }
/** 팔레트 목록 */
export declare const palettes: PaletteInfo[];
/** 브레이크포인트 min-width(px) */
export declare const breakpoints: { sm: 600; md: 768; lg: 1120; xl: 1440 };
/** 팔레트를 바꿉니다. el을 주면 그 요소 아래만. */
export declare function setPalette(id: PaletteId, el?: HTMLElement): boolean;
export declare function getPalette(el?: HTMLElement): PaletteId;
/** "system"이면 시스템 설정을 따릅니다. */
export declare function setTheme(theme: "light" | "dark" | "system", el?: HTMLElement): void;
export declare function getTheme(el?: HTMLElement): "light" | "dark";
export declare function getBreakpoint(width?: number): Breakpoint;
export declare function isAtLeast(bp: Breakpoint, width?: number): boolean;
/** 단계가 바뀔 때마다 호출. 해제 함수를 돌려줍니다. */
export declare function onBreakpointChange(cb: (bp: Breakpoint) => void): () => void;

/** 저사양 기기·절전·투명도 줄이기 설정이면 true */
export declare function shouldReduceGlass(): boolean;
/** <html data-glass="on|off">를 설정합니다. force를 주면 그 값으로. 유리가 켜졌으면 true. */
export declare function applyGlassPreference(force?: boolean): boolean;
export declare const version: string;
export declare const author: "caffeinecat";
