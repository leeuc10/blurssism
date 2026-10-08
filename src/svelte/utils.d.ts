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

export interface LowEndOptions {
  /** 메모리(GB)가 이보다 작으면 저사양. 기본 4 (메모리를 알려 주는 Chromium에서만) */
  minMemory?: number;
  /** 코어가 이보다 적으면 저사양. 기본 4 (메모리를 알려 주는 브라우저에서만 봅니다) */
  minCores?: number;
}
/** 저사양 기기·절전·투명도 줄이기 설정이면 true */
export declare function shouldReduceCrema(options?: LowEndOptions): boolean;
/** 데스크톱 모드를 켤 만한 기기인지 (lg 이상, 마우스, 코어 6개·메모리 8GB 이상) */
export declare function isDesktopCapable(): boolean;
export type CremaMode = "off" | "on" | "rich";
export interface CremaOptions extends LowEndOptions {
  /** 데스크톱 모드. "auto"(기본)는 데스크톱일 때만 켭니다. false면 끕니다. */
  rich?: boolean | "auto";
  /** 데스크톱 모드에서 포인터 주변 빛. 기본 true (동작 줄이기 설정이면 꺼짐) */
  pointerLight?: boolean;
  /** true면 기기 판단 없이 크레마를 켜고, false면 끕니다. */
  force?: boolean;
}
/**
 * <html data-crema="off|on|rich">를 정합니다(호환용 data-glass도 함께). 크레마가 켜졌으면 true.
 * applyCremaPreference() · applyCremaPreference({ rich: false }) · applyCremaPreference(false)
 */
export declare function applyCremaPreference(options?: boolean | CremaOptions): boolean;
/** 크레마 모드를 바로 정합니다. "auto"는 applyCremaPreference()와 같습니다. */
export declare function setCremaMode(mode: CremaMode | "auto"): boolean;
export declare function getCremaMode(): CremaMode;
export interface CremaIssue {
  /** blur-budget: 블러 면이 예산보다 많음 · primary: primary 버튼이 둘 이상 · legacy-glass: 1.4 이름(glass)을 쓰는 요소 */
  code: "blur-budget" | "primary" | "legacy-glass";
  message: string;
  elements: Element[];
}
export interface CremaAuditOptions {
  /** 블러 예산. 기본: 모드에 따라 off 0 · on 3 · rich 6 */
  budget?: number;
  /** true면 bl- 클래스가 아닌 요소의 backdrop-filter까지 셉니다(느림) */
  all?: boolean;
}
/** 지금 화면을 한 번 검사합니다(화면에 보이는 것만). 서버에서는 []. */
export declare function checkCrema(options?: CremaAuditOptions): CremaIssue[];
/** 개발 중에 화면이 바뀔 때마다 검사해 새 문제를 콘솔에 알립니다. 배포 빌드에서는 아무것도 하지 않습니다. 멈추는 함수를 돌려줍니다. */
export declare function auditCrema(options?: CremaAuditOptions & { onReport?: (issues: CremaIssue[]) => void; force?: boolean }): () => void;

/** @deprecated 1.5부터 CremaMode. 2.0에서 제거 */
export type GlassMode = CremaMode;
/** @deprecated 1.5부터 CremaOptions. 2.0에서 제거 */
export type GlassOptions = CremaOptions;
/** @deprecated 1.5부터 shouldReduceCrema(). 2.0에서 제거 */
export declare function shouldReduceGlass(options?: LowEndOptions): boolean;
/** @deprecated 1.5부터 applyCremaPreference(). 2.0에서 제거 */
export declare function applyGlassPreference(options?: boolean | CremaOptions): boolean;
/** @deprecated 1.5부터 setCremaMode(). 2.0에서 제거 */
export declare function setGlassMode(mode: CremaMode | "auto"): boolean;
/** @deprecated 1.5부터 getCremaMode(). 2.0에서 제거 */
export declare function getGlassMode(): CremaMode;

export interface PaletteValues {
  accent: string; "accent-soft": string; "on-accent": string; "accent-ink": string; deco: string; "crema-tint-accent": string;
  /** @deprecated 1.5부터 "crema-tint-accent". 2.0에서 제거 */
  "glass-tint-accent": string;
}
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
/** applyBrandColor()로 등록한 팔레트 목록 */
export declare function getCustomPalettes(): { id: string; name: string; group: "custom" }[];
/** 브랜드 팔레트가 새로 등록될 때마다 호출. 해제 함수를 돌려줍니다. */
export declare function onCustomPalettesChange(cb: () => void): () => void;
/** 브랜드색 하나로 라이트·다크 강조색 묶음을 WCAG 대비에 맞춰 만듭니다. 서버에서도 됩니다. id는 영문으로 시작하고 영문·숫자·하이픈만. */
export declare function createPalette(color: string, options?: { id?: string; name?: string; /** 바꾼 배경(createBackground 결과) 위에서 대비를 맞춥니다 */ background?: CustomBackground }): CustomPalette;
/** createPalette 결과를 CSS로 */
export declare function paletteToCss(palette: CustomPalette): string;
/** 브랜드색 팔레트를 만들어 바로 적용합니다. */
export declare function applyBrandColor(color: string, options?: BrandColorOptions): CustomPalette;
export type BackgroundId = "cream" | "white" | "gray";
export interface BackgroundInfo { id: BackgroundId; name: string; description: string; swatch: { light: string; dark: string } }
/** 내장 배경 목록 */
export declare const backgrounds: BackgroundInfo[];
/** 배경을 바꿉니다(<html data-background>). el을 주면 그 요소 아래만. 알 수 없는 id면 false. */
export declare function setBackground(id: BackgroundId | (string & {}), el?: HTMLElement): boolean;
/** 현재 배경 id. 지정이 없으면 "cream". */
export declare function getBackground(el?: HTMLElement): BackgroundId | (string & {});
export interface BackgroundValues {
  paper: string; "paper-raised": string; "paper-sunken": string; line: string;
  /** 바탕에 맞춰 필요할 때만 바뀌는 보조 글자색과 조작 요소 테두리 */
  "ink-muted": string; "ink-subtle": string; "line-strong": string;
  /** 적응형 블러레마: 바탕에 맞춘 크레마 채움·거품 결 (1.6.2) */
  "crema-fill"?: string; "crema-fill-strong"?: string; "crema-grain"?: string;
}
export interface BackgroundCrema { "crema-fill": string; "crema-fill-strong": string; "crema-grain": string }
export interface BackgroundWarning { code: "adjusted" | "ink" | "saturated"; message: string }
export interface CustomBackground {
  id: string;
  name: string;
  /** 넣은 색 (#rrggbb) */
  source: string;
  /** 글자 대비를 맞추려고 바탕을 바꿨으면 true */
  adjusted: boolean;
  values: { light: BackgroundValues; dark: BackgroundValues };
  warnings: BackgroundWarning[];
}
export interface BackgroundOptions {
  /** data-background 값 (기본 "custom"). 영문으로 시작하고 영문·숫자·하이픈만 */
  id?: string;
  name?: string;
  /** 다크 테마 바탕을 따로 정합니다. 없으면 같은 색조로 만듭니다. */
  dark?: string;
}
/** 배경색 하나로 바탕 묶음(paper·paper-raised·paper-sunken·line)을 라이트·다크 모두 만들고, 글자가 읽히도록 맞춥니다. 서버에서도 됩니다. */
export declare function createBackground(color: string, options?: BackgroundOptions): CustomBackground;
/** 바탕(paper·paper-raised)에 맞춘 크레마 채움과 거품 결. 크림 바탕이면 기본 토큰과 같은 값 */
export declare function backgroundCrema(background: { values: { light: Pick<BackgroundValues, "paper" | "paper-raised">; dark: Pick<BackgroundValues, "paper" | "paper-raised"> } }): { light: BackgroundCrema; dark: BackgroundCrema };
/** createBackground 결과를 CSS로 (크레마 채움·결 포함) */
export declare function backgroundToCss(background: CustomBackground): string;
/** 배경색으로 바탕 묶음을 만들어 바로 적용합니다. */
export declare function applyBackgroundColor(color: string, options?: BackgroundOptions & {
  /** 적용할 요소 (기본 <html>) */
  target?: HTMLElement;
  /** false면 <style>만 넣고 data-background는 바꾸지 않습니다 */
  apply?: boolean;
}): CustomBackground;
/** 두 hex 색의 WCAG 대비 */
export declare function contrastRatio(a: string, b: string): number;
export declare const version: string;
export declare const author: "caffeinecat";
