/* blurssism 컴포넌트 타입 · © caffeinecat */
import type { ReactNode, ReactElement, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, HTMLAttributes } from "react";

export type IconName =
  | "home" | "search" | "heart" | "chat" | "person" | "bell" | "settings" | "plus"
  | "spark" | "check" | "close" | "chevron-right" | "chevron-left" | "alert" | "inbox" | "calendar";

/** 단순 라인 아이콘 (24×24, 1.75 stroke, currentColor). heart만 filled를 지원합니다. */
export interface IconProps { name: IconName; filled?: boolean; className?: string }

/** 캡슐형 버튼. primary는 화면당 하나. href를 주면 <a>로 렌더링됩니다. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: ink 채움 · accent: 강조색 채움 · glass: 유리 · ghost: 테두리 · danger: 삭제·신고 */
  variant?: "primary" | "accent" | "glass" | "ghost" | "danger";
  /** lg = 52px(기본), md = 40px */
  size?: "lg" | "md";
  block?: boolean;
  icon?: IconName;
  href?: string;
  children: ReactNode;
}

/** 48px 원형 유리 아이콘 버튼. label은 스크린리더용으로 필수. */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  /** 토글 상태 (눌림 → accent 채움) */
  pressed?: boolean;
  /** 유리 없이 투명 (NavBar 안에서) */
  plain?: boolean;
}

/** 필터·태그 선택용 토글 칩. */
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> { selected?: boolean; children: ReactNode }

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

/** 이미지 위에 유리 캡션 띠가 떠 있는 카드. */
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
  /** 긴 목록에서 반복될 때: 블러 없는 가벼운 유리 (성능) */
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
/** 상단에 떠 있는 캡슐형 유리 내비게이션 바. 앱: 뒤로+제목+액션, 웹: 로고+links. */
export interface NavBarProps { title: ReactNode; onBack?: () => void; links?: NavLink[]; actions?: ReactNode; className?: string }

export interface TabItem { id: string; label: string; icon: IconName }
/** 하단에 떠 있는 캡슐형 유리 탭바 (3–5개, 모바일 전용). */
export interface TabBarProps { items: TabItem[]; value: string; onChange?: (id: string) => void; label?: string; className?: string }

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
/** 호버·포커스 때 뜨는 짧은 설명. children은 포커스 가능한 요소 하나. */
export interface TooltipProps { label: string; children: ReactNode }
/** 진행 막대. */
export interface ProgressProps { value: number; max?: number; label?: string; valueText?: string; className?: string }
/** 불러오는 중 자리표시. */
export interface SkeletonProps { width?: number | string; height?: number | string; circle?: boolean; className?: string }
export interface Column<R> { key: string; label: string; numeric?: boolean; render?: (row: R) => ReactNode }
/** 데이터 표. 좁은 화면에서는 가로 스크롤. */
export interface TableProps<R = Record<string, ReactNode>> { columns: Column<R>[]; rows: R[]; caption?: string; className?: string }
/** 한 달 달력 날짜 선택. */
export interface CalendarProps { value?: Date; onChange?: (date: Date) => void; min?: Date; max?: Date; today?: Date; className?: string }
/** 빈 화면 안내. children = 행동 버튼 하나. */
export interface EmptyStateProps { title: string; body?: string; icon?: IconName; children?: ReactNode; className?: string }
/** 가운데 모달(모바일에선 아래 시트). 포커스 가두기·Esc·바깥 클릭 닫기 포함. children = 버튼들. */
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

/** 저사양 기기·절전·투명도 줄이기 설정이면 true */
export declare function shouldReduceGlass(): boolean;
/** <html data-glass="on|off">를 설정합니다. force를 주면 그 값으로. 유리가 켜졌으면 true. */
export declare function applyGlassPreference(force?: boolean): boolean;
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
