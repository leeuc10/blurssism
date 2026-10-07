/** 라디오 묶음 방향키: 선택을 옮기고 포커스도 따라갑니다. Home·End로 처음·끝. */
export declare function rovingKey(e: KeyboardEvent, ids: string[], current: string | undefined, pick: (id: string) => void): void;
export declare const addDays: (d: Date, n: number) => Date;
/** 시각을 버리고 날짜만 */
export declare const dayOf: (d?: Date) => Date | undefined;
/** 달력 키: 방향키 ±1일·±1주, Home·End 주의 처음·끝, PageUp·PageDown 이전·다음 달(Shift는 해). */
export declare function calendarKey(e: KeyboardEvent, d: Date): Date | null;
/** 툴팁을 기준 요소 위 가운데에 놓고, 위가 모자라면 아래로, 좌우는 화면 안으로 */
export declare function placeTooltip(t: HTMLElement, a: Element): void;
export declare function warnOnce(key: string, msg: string): void;
