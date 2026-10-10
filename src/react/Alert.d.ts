/* blurssism 타입 조각 · Alert · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
