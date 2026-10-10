/* blurssism React 타입 조각 · Accordion · © caffeinecat · MIT. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
