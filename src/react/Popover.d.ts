/* blurssism 타입 조각 · Popover · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
