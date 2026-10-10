/* blurssism React 타입 조각 · Tabs · © caffeinecat · MIT. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
