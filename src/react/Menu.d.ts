/* blurssism 타입 조각 · Menu · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
