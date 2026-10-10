/* blurssism 타입 조각 · Link · © caffeinecat. scripts/build.mjs가 src/index.d.ts 뒤에 이어 붙입니다. */
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
