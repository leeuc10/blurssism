/* blurssism 타입 조각 · Pagination · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
