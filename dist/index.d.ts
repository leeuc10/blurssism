/* blurssism 컴포넌트 타입 · © caffeinecat */
import type { ReactNode, ReactElement, ButtonHTMLAttributes, AnchorHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, HTMLAttributes } from "react";

export type IconName =
  | "home" | "search" | "heart" | "chat" | "person" | "bell" | "settings" | "plus"
  | "spark" | "check" | "close" | "chevron-right" | "chevron-left" | "alert" | "inbox" | "calendar";

/** 단순 라인 아이콘 (24×24, 1.75 stroke, currentColor). heart만 filled를 지원합니다. */
export interface IconProps { name: IconName; filled?: boolean; className?: string }

interface ButtonOwnProps {
  /** primary(기본): ink 채움 · accent: 강조색 채움 · crema: 크레마 · ghost: 테두리 · danger: 삭제·신고. "glass"는 1.4 이름(2.0에서 제거)
   *  primary는 화면당 하나입니다. 개발 중에는 auditCrema()가 개수를 세어 알려 줍니다. */
  variant?: "primary" | "accent" | "crema" | "glass" | "ghost" | "danger";
  /** lg = 52px(기본), md = 40px */
  size?: "lg" | "md";
  block?: boolean;
  icon?: IconName;
  children: ReactNode;
}
/** 캡슐형 버튼. primary는 화면당 하나. href를 주면 <a>로 렌더링되고 target·rel 같은 링크 속성을 받습니다. */
export type ButtonProps =
  | (ButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined; target?: never; rel?: never; download?: never })
  | (ButtonOwnProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string });

/** 48px 원형 크레마 아이콘 버튼. label은 스크린리더용으로 필수. */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  /** 토글 상태 (눌림 → accent 채움) */
  pressed?: boolean;
  /** 크레마 없이 투명 (NavBar 안에서) */
  plain?: boolean;
}

/** 필터·태그 선택용 토글 칩. selected를 주면 제어 모드, 안 주면 누를 때마다 스스로 바뀝니다. */
export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  selected?: boolean;
  /** 제어하지 않을 때 처음 값 */
  defaultSelected?: boolean;
  /** 누를 때 다음 값으로 */
  onChange?: (selected: boolean) => void;
  children: ReactNode;
}

/** 라벨·도움말·오류를 갖춘 한 줄 입력창. */
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  help?: string;
  /** 있으면 오류 상태. "오류: " 접두어와 함께 표시됩니다. */
  error?: string;
}

/** 켜고 끄는 설정 스위치. label은 스크린리더용. */
export interface SwitchProps { checked: boolean; onChange?: (next: boolean) => void; label: string; disabled?: boolean; className?: string }

/** 상태 배지. 항상 단어를 넣습니다. */
export interface BadgeProps { tone?: "neutral" | "accent" | "positive" | "warning" | "danger"; icon?: IconName; children: ReactNode; className?: string }

/** 불투명 콘텐츠 카드. children = 하단 버튼들. */
export interface CardProps { eyebrow?: string; title?: string; quote?: string; body?: string; children?: ReactNode; className?: string }

/** 이미지 위에 크레마 캡션 띠가 떠 있는 카드. */
export interface MediaCardProps {
  title: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
  /** CSS aspect-ratio, 기본 "4 / 5" */
  ratio?: string;
  badge?: string;
  badgeTone?: BadgeProps["tone"];
  badgeIcon?: IconName;
  /** 캡션 오른쪽 요소 (보통 IconButton) */
  action?: ReactNode;
  /** 긴 목록에서 반복될 때: 블러 없는 가벼운 크레마 (성능) */
  lite?: boolean;
  className?: string;
}

/** 리스트 한 줄. href → <a>, onClick → <button>, 둘 다 없으면 <div>. ul.bl-list > li 안에 둡니다. */
export interface ListItemProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** 오른쪽 요소. 생략하면 링크/버튼일 때 chevron */
  trailing?: ReactNode;
  href?: string;
}

export interface NavLink { href: string; label: string; current?: boolean }
/** 상단에 떠 있는 캡슐형 크레마 내비게이션 바. 앱: 뒤로+제목+액션, 웹: 로고+links. */
export interface NavBarProps { title: ReactNode; onBack?: () => void; links?: NavLink[]; actions?: ReactNode; className?: string }

export interface TabItem { id: string; label: string; icon: IconName; /** 주면 링크(<a>)로 */ href?: string }
/** 하단에 떠 있는 캡슐형 크레마 탭바 (3–5개). <nav> + aria-current="page". 기본으로 lg부터 숨습니다. */
export interface TabBarProps {
  items: TabItem[]; value: string; onChange?: (id: string) => void; label?: string; className?: string;
  /** 이 단계부터 숨깁니다. 기본 "lg"(그때는 NavBar 링크). false면 항상 보입니다. */
  hideFrom?: "sm" | "md" | "lg" | "xl" | false;
}

/** 두꺼운 블러 바텀시트. children = 버튼들. */
export interface SheetProps { title: string; description?: string; children?: ReactNode; className?: string }

/** 화면 아래 잠깐 떠오르는 알림. */
export interface ToastProps { tone?: "neutral" | "positive" | "danger"; children: ReactNode; actionLabel?: string; onAction?: () => void; className?: string }

export declare function Icon(props: IconProps): ReactElement;
export declare function Button(props: ButtonProps): ReactElement;
export declare function IconButton(props: IconButtonProps): ReactElement;
export declare function Chip(props: ChipProps): ReactElement;
export declare function TextField(props: TextFieldProps): ReactElement;
export declare function Switch(props: SwitchProps): ReactElement;
export declare function Badge(props: BadgeProps): ReactElement;
export declare function Card(props: CardProps): ReactElement;
export declare function MediaCard(props: MediaCardProps): ReactElement;
export declare function ListItem(props: ListItemProps): ReactElement;
export declare function NavBar(props: NavBarProps): ReactElement;
export declare function TabBar(props: TabBarProps): ReactElement;
export declare function Sheet(props: SheetProps): ReactElement;
export declare function Toast(props: ToastProps): ReactElement;

export interface Option { value: string; label: string; disabled?: boolean; description?: string }

/** 네이티브 select를 감싼 드롭다운. 라벨·도움말·오류는 TextField와 같습니다. */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label: string; options: (Option | string)[]; placeholder?: string; help?: string; error?: string }
/** 체크박스 한 개. 제출이 필요한 폼의 선택용. */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> { label: ReactNode; description?: string }
/** 라디오 묶음. 2–5개 중 하나. */
export interface RadioGroupProps { legend?: string; options: (Option | string)[]; value: string; onChange?: (value: string) => void; name?: string; className?: string }
/** 2–4개 보기 전환. 방향키로 이동. */
export interface SegmentedControlProps { items: { id: string; label: string }[]; value: string; onChange?: (id: string) => void; label: string; block?: boolean; className?: string }
/** 이니셜 또는 사진 원형 아바타. */
export interface AvatarProps { name: string; image?: string; size?: "sm" | "md" | "lg"; className?: string }
/** 호버·포커스 때 뜨는 짧은 설명. children은 포커스 가능한 요소 하나. 최상위 층에 떠서 잘리지 않고, Esc로 닫힙니다. */
export interface TooltipProps { label: string; children: ReactNode }
/** 진행 막대. */
export interface ProgressProps { value: number; max?: number; label?: string; valueText?: string; className?: string }
/** 불러오는 중 자리표시. */
export interface SkeletonProps { width?: number | string; height?: number | string; circle?: boolean; className?: string }
export interface Column<R> {
  key: string; label: string; numeric?: boolean;
  /** 칸을 직접 그립니다(노드) */
  render?: (row: R) => ReactNode;
  /** 칸을 글자로 바꿉니다(Svelte와 같은 이름). render가 있으면 render가 먼저입니다. */
  format?: (row: R) => string;
}
/** 데이터 표. 좁은 화면에서는 가로 스크롤. caption이 있으면 스크롤 영역에 이름과 키보드 포커스가 붙습니다. */
export interface TableProps<R = Record<string, ReactNode>> { columns: Column<R>[]; rows: R[]; caption?: string; className?: string }
/** 한 달 달력 날짜 선택. 방향키로 날짜, PageUp·PageDown으로 달을 옮깁니다. min·max는 날짜 단위로 비교합니다. */
export interface CalendarProps { value?: Date; onChange?: (date: Date) => void; min?: Date; max?: Date; today?: Date; className?: string }
/** 빈 화면 안내. children = 행동 버튼 하나. */
export interface EmptyStateProps { title: string; body?: string; icon?: IconName; children?: ReactNode; className?: string }
/** 가운데 모달(모바일에선 아래 시트). 네이티브 <dialog>(최상위 층, 뒤 화면 inert), Esc·바깥 클릭 닫기(alert는 바깥 클릭 제외). children = 버튼들. */
export interface DialogProps { open: boolean; onClose?: () => void; title: string; description?: string; alert?: boolean; children?: ReactNode; className?: string }

export declare function Select(props: SelectProps): ReactElement;
export declare function Checkbox(props: CheckboxProps): ReactElement;
export declare function RadioGroup(props: RadioGroupProps): ReactElement;
export declare function SegmentedControl(props: SegmentedControlProps): ReactElement;
export declare function Avatar(props: AvatarProps): ReactElement;
export declare function Tooltip(props: TooltipProps): ReactElement;
export declare function Progress(props: ProgressProps): ReactElement;
export declare function Skeleton(props: SkeletonProps): ReactElement;
export declare function Table<R>(props: TableProps<R>): ReactElement;
export declare function Calendar(props: CalendarProps): ReactElement;
export declare function EmptyState(props: EmptyStateProps): ReactElement;
export declare function Dialog(props: DialogProps): ReactElement | null;

export type PaletteId =
  | "black" | "espresso" | "matcha" | "chai" | "coldbrew" | "mocha" | "classic"
  | "blue" | "indigo" | "violet" | "teal" | "emerald" | "pink" | "graphite";
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export interface PaletteInfo { id: PaletteId; name: string; group: "caffeine" | "web"; description: string; swatch: { light: string; dark: string } }
type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

/** 색 팔레트 고르기. 기본으로 <html data-palette>를 바꿉니다. */
export interface PalettePickerProps {
  /** 제어 모드: 선택된 팔레트 (브랜드 팔레트 id도 됩니다) */
  value?: PaletteId | (string & {});
  onChange?: (id: PaletteId | (string & {})) => void;
  /** false면 data-palette를 바꾸지 않고 onChange만 부릅니다 */
  apply?: boolean;
  /** 팔레트를 적용할 요소 (기본: <html>) */
  target?: HTMLElement;
  /** 한 묶음만 보이기: "caffeine"(카페인 7종), "web"(웹 기본 7종), "custom"(applyBrandColor로 등록한 것). 생략하면 전부 */
  group?: "caffeine" | "web" | "custom";
  /** false면 applyBrandColor()로 등록한 브랜드 팔레트를 숨깁니다 (기본 true) */
  custom?: boolean;
  /** 이름 없이 동그라미만 */
  compact?: boolean;
  label?: string;
  className?: string;
}
/** 콘텐츠 폭과 단계별 좌우 여백을 맞추는 래퍼. */
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** default: content-max(1120px) · prose: 640px · full: 제한 없음 */
  size?: "default" | "prose" | "full";
  as?: string;
}
/** 단계별 열 수가 바뀌는 그리드. 예: columns={{ xs: 1, md: 2, lg: 3 }} */
export interface GridProps extends HTMLAttributes<HTMLElement> {
  columns?: Responsive<number>;
  /** 간격 토큰 이름, 예: "space-4" (기본: 단계별 --grid-gutter) */
  gap?: "space-1" | "space-2" | "space-3" | "space-4" | "space-5" | "space-6" | "space-8" | "space-12";
  as?: string;
}

export declare function PalettePicker(props: PalettePickerProps): ReactElement;
export declare function Container(props: ContainerProps): ReactElement;
export declare function Grid(props: GridProps): ReactElement;
/** 지금 화면 단계. 서버와 첫 렌더에서는 null. */
export declare function useBreakpoint(): Breakpoint | null;

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
}
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
/** createBackground 결과를 CSS로 */
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

/** 다른 React 인스턴스로 컴포넌트를 만듭니다 (보통은 필요 없음). */
export declare function createBlurssism(react: unknown): typeof import("./index");

declare const Blurssism: typeof import("./index");
export default Blurssism;

declare global {
  interface Window {
    /** <script src=".../dist/bundle.js">로 불러왔을 때 */
    Blurssism: typeof import("./index");
  }
}
