/* blurssism 타입 조각 · Textarea · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
