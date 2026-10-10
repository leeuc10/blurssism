/* blurssism 컴포넌트 타입 · © caffeinecat */
import type { ReactNode, ReactElement, ButtonHTMLAttributes, AnchorHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

/** ref를 받는 컴포넌트(2.0). <Button ref={…}>, <TextField ref={…}>(ref는 input), react-hook-form의 register가 됩니다. */
type WithRef<P, E> = ForwardRefExoticComponent<P & RefAttributes<E>>;

export type IconName =
  | "home" | "search" | "heart" | "chat" | "person" | "bell" | "settings" | "plus"
  | "spark" | "check" | "close" | "chevron-right" | "chevron-left" | "alert" | "inbox" | "calendar";

/** 단순 라인 아이콘 (24×24, 1.75 stroke, currentColor). heart만 filled를 지원합니다. */
export interface IconProps { name: IconName; filled?: boolean; className?: string }

interface ButtonOwnProps {
  /** primary(기본): 강조색(accent) 채움, 화면당 하나 · accent: primary의 별칭(2.0부터 같은 버튼) · crema: 크레마 · ghost: 테두리 · danger: 삭제·신고.
   *  개발 중에는 auditCrema()가 primary 개수를 세어 알려 줍니다. */
  variant?: "primary" | "accent" | "crema" | "ghost" | "danger";
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
  /** 있으면 오류 상태. 로케일의 errorPrefix("오류: ")와 함께 표시됩니다. */
  error?: string;
  /** 이 컴포넌트만 다른 문구를 쓸 때(전역은 setLocale) */
  locale?: Partial<Locale>;
}

/** 켜고 끄는 설정 스위치. label은 스크린리더용. checked를 주면 제어 모드, 안 주면 defaultChecked에서 시작해 스스로 바뀝니다(2.1). */
export interface SwitchProps { checked?: boolean; defaultChecked?: boolean; onChange?: (next: boolean) => void; label: string; disabled?: boolean; className?: string }

/** 상태 배지. 항상 단어를 넣습니다. */
export interface BadgeProps { tone?: "neutral" | "accent" | "positive" | "warning" | "danger" | "info"; icon?: IconName; children: ReactNode; className?: string }

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
export interface NavBarProps { title: ReactNode; onBack?: () => void; links?: NavLink[]; actions?: ReactNode; className?: string; locale?: Partial<Locale> }

export interface TabItem { id: string; label: string; icon: IconName; /** 주면 링크(<a>)로 */ href?: string }
/** 하단에 떠 있는 캡슐형 크레마 탭바 (3–5개). <nav> + aria-current="page". 기본으로 lg부터 숨습니다. */
export interface TabBarProps {
  items: TabItem[];
  /** 제어 모드. 안 주면 defaultValue에서 시작해 스스로 바뀝니다(2.1) */
  value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string; className?: string; locale?: Partial<Locale>;
  /** 이 단계부터 숨깁니다. 기본 "lg"(그때는 NavBar 링크). false면 항상 보입니다. */
  hideFrom?: "sm" | "md" | "lg" | "xl" | false;
}

/** 두꺼운 블러 바텀시트. children = 버튼들.
 *  2.1: open을 주면 스스로 열고 닫는 모달(네이티브 <dialog>, scrim, Esc·바깥 누르기·손잡이 끌어내리기로 onClose, 닫힘 애니메이션). open을 안 주면 자리에 그려지는 면. */
export interface SheetProps { title: string; description?: string; children?: ReactNode; className?: string; open?: boolean; onClose?: () => void }

/** 토스트 한 장(그리기만). 쌓기·자동 닫힘은 ToastProvider + useToast()(2.1). */
export interface ToastProps { tone?: "neutral" | "positive" | "warning" | "danger" | "info"; children: ReactNode; actionLabel?: string; onAction?: () => void; /** 있으면 닫기 버튼 */ onDismiss?: () => void; className?: string; locale?: Partial<Locale> }
export interface ToastOptions {
  message: ReactNode; tone?: ToastProps["tone"]; actionLabel?: string; onAction?: () => void;
  /** ms. 0이면 직접 닫을 때까지. 기본 4000(ToastProvider duration) */
  duration?: number;
  /** false면 닫기 버튼 없음 */
  dismissible?: boolean;
  /** 같은 id로 다시 show하면 갱신 */
  id?: string;
}
/** 앱 루트를 감싸면 토스트가 화면 아래(lg 이상은 오른쪽 아래)에 쌓입니다. */
export interface ToastProviderProps { children?: ReactNode; /** 기본 4000ms */ duration?: number; /** 한 번에 보이는 개수. 기본 3 */ max?: number; className?: string }
export interface ToastApi { show: (opts: ToastOptions | string) => string; dismiss: (id: string) => void }

export declare function Icon(props: IconProps): ReactElement;
export declare const Button: WithRef<ButtonProps, HTMLButtonElement | HTMLAnchorElement>;
export declare const IconButton: WithRef<IconButtonProps, HTMLButtonElement>;
export declare const Chip: WithRef<ChipProps, HTMLButtonElement>;
/** ref는 <input>에 닿습니다 */
export declare const TextField: WithRef<TextFieldProps, HTMLInputElement>;
export declare const Switch: WithRef<SwitchProps, HTMLButtonElement>;
export declare function Badge(props: BadgeProps): ReactElement;
export declare function Card(props: CardProps): ReactElement;
export declare function MediaCard(props: MediaCardProps): ReactElement;
export declare const ListItem: WithRef<ListItemProps, HTMLElement>;
export declare function NavBar(props: NavBarProps): ReactElement;
export declare function TabBar(props: TabBarProps): ReactElement;
export declare function Sheet(props: SheetProps): ReactElement;
export declare function Toast(props: ToastProps): ReactElement;
export declare function ToastProvider(props: ToastProviderProps): ReactElement;
/** useToast().show({ message, tone }) → id. <ToastProvider> 안에서만. */
export declare function useToast(): ToastApi;

export interface Option { value: string; label: string; disabled?: boolean; description?: string }

/** 네이티브 select를 감싼 드롭다운. 라벨·도움말·오류는 TextField와 같습니다. */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label: string; options: (Option | string)[]; placeholder?: string; help?: string; error?: string; locale?: Partial<Locale> }
/** 체크박스 한 개. 제출이 필요한 폼의 선택용. */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> { label: ReactNode; description?: string }
/** 라디오 묶음. 2–5개 중 하나. */
export interface RadioGroupProps { legend?: string; options: (Option | string)[]; /** 제어 모드. 안 주면 defaultValue에서 시작(2.1) */ value?: string; defaultValue?: string; onChange?: (value: string) => void; name?: string; className?: string }
/** 2–4개 보기 전환. 방향키로 이동. */
export interface SegmentedControlProps { items: { id: string; label: string }[]; /** 제어 모드. 안 주면 defaultValue(없으면 첫 항목)에서 시작(2.1) */ value?: string; defaultValue?: string; onChange?: (id: string) => void; label: string; block?: boolean; className?: string }
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
export interface CalendarProps { value?: Date; onChange?: (date: Date) => void; min?: Date; max?: Date; today?: Date; className?: string; locale?: Partial<Locale> }
/** 빈 화면 안내. children = 행동 버튼 하나. */
export interface EmptyStateProps { title: string; body?: string; icon?: IconName; children?: ReactNode; className?: string }
/** 가운데 모달(모바일에선 아래 시트). 네이티브 <dialog>(최상위 층, 뒤 화면 inert), Esc·바깥 클릭 닫기(alert는 바깥 클릭 제외). children = 버튼들. */
export interface DialogProps { open: boolean; onClose?: () => void; title: string; description?: string; alert?: boolean; children?: ReactNode; className?: string }

/** ref는 <select>에 닿습니다 */
export declare const Select: WithRef<SelectProps, HTMLSelectElement>;
/** ref는 <input type="checkbox">에 닿습니다 */
export declare const Checkbox: WithRef<CheckboxProps, HTMLInputElement>;
export declare const RadioGroup: WithRef<RadioGroupProps, HTMLFieldSetElement>;
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
  locale?: Partial<Locale>;
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
export declare const Container: WithRef<ContainerProps, HTMLElement>;
export declare const Grid: WithRef<GridProps, HTMLElement>;
/** 지금 화면 단계. 서버와 첫 렌더에서는 null. */
export declare function useBreakpoint(): Breakpoint | null;
/** 지금 로케일. setLocale()로 바뀌면 다시 그립니다(2.1). */
export declare function useLocale(override?: Partial<Locale>): Locale;
/** 제어·비제어 겸용 값: value를 주면 제어, 안 주면 defaultValue에서 시작(2.1). */
export declare function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (next: T) => void): [T, (next: T) => void];

/** 팔레트 목록 */
export declare const palettes: PaletteInfo[];
/** 컴포넌트가 그리는 문구(2.1). setLocale("en") 또는 일부만 덮어쓴 객체. */
export interface Locale {
  id: string; errorPrefix: string; back: string; close: string; more: string; prevMonth: string; nextMonth: string;
  dow: string[]; monthTitle: (y: number, m: number) => string; dayLabel: (y: number, m: number, d: number, dow: string) => string;
  palette: string; mainMenu: string; siteMenu: string; menu: string; loading: string; dismiss: string;
  prevPage: string; nextPage: string; page: (n: number) => string; pageOf: (n: number, total: number) => string;
  tabs: string; notifications: string; openInNew: string;
}
/** 내장 로케일: ko(기본)·en */
export declare const locales: { ko: Locale; en: Locale };
/** 로케일을 정합니다. 문자열("ko" | "en") 또는 ko를 바탕으로 일부만 덮어쓴 객체. */
export declare function setLocale(locale: "ko" | "en" | Partial<Locale>): void;
export declare function getLocale(): Locale;
/** 로케일이 바뀔 때마다 호출. 해제 함수를 돌려줍니다. */
export declare function onLocaleChange(cb: (locale: Locale) => void): () => void;

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
  /** 데스크톱 모드에서 포인터를 따라오는 빛. 2.0부터 기본 false(마우스를 움직일 때마다 크레마 면을 다시 칠하므로 선택 기능). 동작 줄이기 설정이면 켜도 꺼집니다. */
  pointerLight?: boolean;
  /** true면 기기 판단 없이 크레마를 켜고, false면 끕니다. */
  force?: boolean;
  /** true면 probeCremaCost()로 실제 블러 비용을 재서 느리면 off로 바꿉니다(2.1). 메모리를 알려 주지 않는 Safari·Firefox용. */
  probe?: boolean;
  /** probe의 한 프레임 허용 ms. 기본 24 */
  slowMs?: number;
}
/**
 * <html data-crema="off|on|rich">를 정합니다. 크레마가 켜졌으면 true.
 * applyCremaPreference() · applyCremaPreference({ rich: false }) · applyCremaPreference(false)
 */
export declare function applyCremaPreference(options?: boolean | CremaOptions): boolean;
/** 크레마 모드를 바로 정합니다. "auto"는 applyCremaPreference()와 같습니다. */
export declare function setCremaMode(mode: CremaMode | "auto"): boolean;
export declare function getCremaMode(): CremaMode;
export interface CremaIssue {
  /** blur-budget: 블러 면이 예산보다 많음 · primary: primary 버튼이 둘 이상 · palette: 영역별 팔레트(한 화면에 하나) · accent-area: 강조색 면이 10% 초과(90/10) · legacy-glass: 2.0에서 제거된 1.4 이름(glass)을 쓰는 요소 */
  code: "blur-budget" | "primary" | "palette" | "accent-area" | "legacy-glass";
  message: string;
  elements: Element[];
}
export interface CremaAuditOptions {
  /** 블러 예산. 기본: 모드에 따라 off 0 · on 3 · rich 6 */
  budget?: number;
  /** true면 bl- 클래스가 아닌 요소의 backdrop-filter까지 셉니다(느림) */
  all?: boolean;
  /** 강조색 면의 허용 비율. 기본 0.1 (90/10) */
  accentMax?: number;
}
/** 블러 비용을 실제로 재 봅니다(2.1). 느린 기기면 true. applyCremaPreference({ probe: true })가 씁니다. */
export declare function probeCremaCost(options?: { /** 한 프레임 허용 ms. 기본 24 */ slowMs?: number }): Promise<boolean>;
/** 지금 화면을 한 번 검사합니다(화면에 보이는 것만). 서버에서는 []. */
export declare function checkCrema(options?: CremaAuditOptions): CremaIssue[];
/** 개발 중에 화면이 바뀔 때마다 검사해 새 문제를 콘솔에 알립니다. 배포 빌드에서는 아무것도 하지 않습니다. 멈추는 함수를 돌려줍니다. */
export declare function auditCrema(options?: CremaAuditOptions & { onReport?: (issues: CremaIssue[]) => void; force?: boolean }): () => void;


export interface PaletteValues {
  accent: string; "accent-soft": string; "on-accent": string; "accent-ink": string; deco: string; "crema-tint-accent": string;
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

/** @deprecated 2.1부터 컴포넌트를 바로 import하세요. 인자는 무시되고 같은 컴포넌트 묶음을 돌려줍니다. */
export declare function createBlurssism(react?: unknown): typeof import("./index");

declare const Blurssism: typeof import("./index");
export default Blurssism;

declare global {
  interface Window {
    /** <script src=".../dist/bundle.js">로 불러왔을 때 */
    Blurssism: typeof import("./index");
  }
}
/* ── Accordion ── */
export interface AccordionItem {
  id: string;
  /** 제목 줄(summary). title-3 크기 */
  title: string;
  /** 펼쳤을 때 보이는 내용 */
  content: ReactNode;
  /** 제목 왼쪽 아이콘 */
  icon?: IconName;
}
/** 제목을 눌러 내용을 펼치는 목록. 네이티브 <details>·<summary>라 키보드·스크린리더 지원이 따라옵니다.
 *  기본은 하나만 열리고(details의 name), multiple이면 여러 개. value를 주면 제어 모드, 안 주면 defaultValue에서 시작해 스스로 바뀝니다. */
export interface AccordionProps {
  items: AccordionItem[];
  /** 여러 항목을 동시에 열 수 있게. 기본 false(하나만) */
  multiple?: boolean;
  /** 열린 항목. 하나만 열릴 때는 id 문자열(없으면 ""), multiple이면 id 배열 */
  value?: string | string[];
  /** 제어하지 않을 때 처음 열린 항목 */
  defaultValue?: string | string[];
  /** 열고 닫을 때 다음 값으로. multiple이면 배열, 아니면 문자열 */
  onChange?: (value: string | string[]) => void;
  /** 항목 id의 접두어(details name). 생략하면 자동 */
  id?: string;
  className?: string;
}
export declare function Accordion(props: AccordionProps): ReactElement;

/* ── Alert ── */
/** 흐름 안에 놓이는 불투명 안내 띠. 떠 있지 않으므로 크레마가 아니고, 색만으로 알리지 않도록 아이콘이 항상 붙습니다.
 *  info·positive는 role="status", warning·danger는 role="alert". ref는 바깥 div. */
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** info(기본): 안내 · positive: 완료 · warning: 확인 필요 · danger: 실패·위험 */
  tone?: "info" | "positive" | "warning" | "danger";
  /** 굵은 제목 한 줄 */
  title?: ReactNode;
  /** 본문 */
  children?: ReactNode;
  /** 기본 아이콘(info spark · positive check · warning·danger alert)을 바꿉니다 */
  icon?: IconName;
  /** 아래에 놓일 행동 버튼들(보통 ghost md 하나) */
  actions?: ReactNode;
  /** 주면 오른쪽에 닫기 아이콘 버튼이 생깁니다(문구는 로케일 dismiss) */
  onDismiss?: () => void;
  /** 이 컴포넌트만 다른 문구로 (닫기 라벨) */
  locale?: Partial<Locale>;
}
export declare const Alert: WithRef<AlertProps, HTMLDivElement>;

/* ── Drawer ── */
/** 옆에서 미끄러져 들어오는 두꺼운 크레마 패널. 네이티브 <dialog>(최상위 층, 뒤 화면 inert), Esc·바깥 누르기로 onClose, 닫힐 때 반대로 미끄러져 나갑니다.
 *  persistentFrom을 주면 그 단계부터 불투명한 <aside>(데스크톱 사이드바)로 그 자리에 그려지고 다이얼로그는 열리지 않습니다. */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  /** 어느 쪽에서 들어오나. 기본 "left" */
  side?: "left" | "right";
  /** 머리글 제목(h2, aria-labelledby) */
  title?: string;
  /** title이 없을 때 스크린리더용 이름(aria-label) */
  label?: string;
  /** 기본 320(px). 화면의 85vw를 넘지 않습니다. */
  width?: number | string;
  /** 이 단계부터는 다이얼로그 대신 인라인 <aside class="bl-drawer-persistent">. 기본 false */
  persistentFrom?: "lg" | "xl" | false;
  locale?: Partial<Locale>;
  /** 내비게이션 리스트, 폼 등 무엇이든 */
  children?: ReactNode;
  className?: string;
}
export declare function Drawer(props: DrawerProps): ReactElement;

/* ── Link ── */
/** 본문 안의 글자 링크. accent-ink 색과 밑줄로 글자와 구분되고, 모든 <a> 속성을 받습니다. ref는 <a>. */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** 새 창으로 엽니다(target="_blank" rel="noopener noreferrer"). 스크린리더 문구 "새 창에서 열림"과 작은 화살표가 붙습니다. */
  external?: boolean;
  /** 보조 링크: ink-muted 색 (푸터·메타 정보) */
  muted?: boolean;
  /** 이 컴포넌트만 다른 문구로 (새 창 안내) */
  locale?: Partial<Locale>;
}
export declare const Link: WithRef<LinkProps, HTMLAnchorElement>;

/* ── Menu ── */
export interface MenuItem {
  id: string;
  label: string;
  icon?: IconName;
  /** 삭제·신고처럼 위험한 행동: danger 색 */
  danger?: boolean;
  /** 포커스는 받되 고를 수 없음(aria-disabled) */
  disabled?: boolean;
  /** 주면 <a>로 그립니다 */
  href?: string;
}
/** Popover 위에 얹은 행동 메뉴(role="menu"). "-"는 구분선. 방향키·Home·End로 옮기고 Enter·Space로 고르면 onSelect(id) 뒤에 닫힙니다. 블러 예산 1을 씁니다. */
export interface MenuProps {
  /** 여는 버튼 하나(보통 IconButton). aria-expanded·aria-controls·aria-haspopup="menu"가 더해집니다. */
  trigger: ReactElement;
  items: (MenuItem | "-")[];
  onSelect?: (id: string) => void;
  /** 메뉴 이름(aria-label). 기본은 로케일의 menu("메뉴") */
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverProps["placement"];
  locale?: Partial<Locale>;
  className?: string;
}
export declare function Menu(props: MenuProps): ReactElement;

/* ── Pagination ── */
/** 페이지 번호 이동. <nav>(aria-label "N페이지 중 M페이지") 안에 이전·다음 아이콘 버튼과 캡슐 번호 버튼, 지금 페이지에 aria-current="page".
 *  처음·끝 번호는 항상 보이고, 건너뛰는 곳은 "…". page를 주면 제어 모드, 안 주면 defaultPage에서 시작해 스스로 바뀝니다. ref는 <nav>. */
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /** 전체 페이지 수 (1 이상) */
  count: number;
  /** 지금 페이지(1부터). 주면 제어 모드 */
  page?: number;
  /** 제어하지 않을 때 처음 페이지 (기본 1) */
  defaultPage?: number;
  /** 페이지가 바뀔 때 다음 페이지 번호로 */
  onChange?: (page: number) => void;
  /** 지금 페이지 양옆에 보일 번호 개수 (기본 1) */
  siblings?: number;
  /** nav의 aria-label. 생략하면 로케일 pageOf(page, count) */
  label?: string;
  /** 이 컴포넌트만 다른 문구로 (이전·다음·페이지 라벨) */
  locale?: Partial<Locale>;
}
export declare const Pagination: WithRef<PaginationProps, HTMLElement>;

/* ── Popover ── */
/** 버튼을 누르면 그 아래(위)에 뜨는 두꺼운 크레마 패널(role="dialog"). 네이티브 popover라 최상위 층에 뜨고, 바깥 누르기·Esc로 닫힙니다.
 *  열리면 첫 조작 요소로, 닫히면 트리거로 포커스가 돌아갑니다. 열려 있는 동안 블러 예산 1을 씁니다. */
export interface PopoverProps {
  /** 여는 버튼 하나. aria-expanded·aria-controls·aria-haspopup과 onClick 토글이 더해집니다. */
  trigger: ReactElement;
  children?: ReactNode;
  /** 제어 모드 */
  open?: boolean;
  /** 제어하지 않을 때 처음 값 */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 기본 "bottom-start". 아래가 모자라면 위로 뒤집힙니다. */
  placement?: "bottom-start" | "bottom-end" | "bottom" | "top";
  /** 스크린리더용 이름(aria-label). labelledBy가 없으면 넣습니다. */
  label?: string;
  /** 패널 안 제목 요소의 id(aria-labelledby) */
  labelledBy?: string;
  /** 트리거의 aria-haspopup. 기본 "dialog" */
  haspopup?: "dialog" | "menu" | "listbox" | "true";
  id?: string;
  className?: string;
}
export declare function Popover(props: PopoverProps): ReactElement;

/* ── Tabs ── */
export interface TabsItem {
  id: string;
  label: string;
  icon?: IconName;
  /** 누를 수 없고 방향키로도 건너뜁니다 */
  disabled?: boolean;
  /** 이 탭이 열렸을 때 보이는 내용 */
  panel?: ReactNode;
}
/** 같은 화면 안에서 내용 묶음을 바꾸는 콘텐츠 탭(tablist). 화면을 옮기는 하단 메뉴는 TabBar.
 *  value를 주면 제어 모드, 안 주면 defaultValue(기본 첫 탭)에서 시작해 스스로 바뀝니다. */
export interface TabsProps {
  items: TabsItem[];
  /** 지금 탭 id (제어 모드) */
  value?: string;
  /** 제어하지 않을 때 처음 탭. 기본 첫 항목 */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** 탭 묶음의 스크린리더 이름. 기본 로케일의 "탭" */
  label?: string;
  /** line(기본): 지금 탭 아래 2px 강조색 밑줄, 좁은 화면에서 가로 스크롤 · pill: SegmentedControl 같은 캡슐 */
  variant?: "line" | "pill";
  /** 보이지 않는 패널도 그려 두고 hidden으로 숨깁니다(입력 상태를 지킬 때). 기본은 지금 패널만 그림 */
  keepMounted?: boolean;
  /** 이 컴포넌트에서만 쓸 문구 */
  locale?: Partial<Locale>;
  /** 탭·패널 id의 접두어. 생략하면 자동 */
  id?: string;
  className?: string;
}
export declare function Tabs(props: TabsProps): ReactElement;

/* ── Textarea ── */
/** 라벨·도움말·오류를 갖춘 여러 줄 입력창. ref는 <textarea>에 닿습니다. */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  help?: string;
  /** 있으면 오류 상태. "오류: " 접두어와 함께 표시됩니다. */
  error?: string;
  /** 처음 보이는 줄 수 (기본 4) */
  rows?: number;
  /** 내용에 맞춰 높이가 자랍니다(숨은 측정 요소 없이 scrollHeight로). 이때 손으로 크기를 바꾸는 손잡이는 숨깁니다. */
  autoResize?: boolean;
  /** autoResize일 때 최대 줄 수. 넘으면 안쪽이 스크롤됩니다. */
  maxRows?: number;
  /** 이 컴포넌트만 다른 문구로 (오류 접두어) */
  locale?: Partial<Locale>;
}
/** ref는 <textarea>에 닿습니다 */
export declare const Textarea: WithRef<TextareaProps, HTMLTextAreaElement>;


