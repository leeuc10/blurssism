/* blurssism 타입 조각 · Drawer · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
