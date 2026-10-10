import type { HTMLAttributes } from "svelte/elements";
/** 페이지 번호 이동. <nav> 안에 이전·다음 아이콘 버튼과 캡슐 번호 버튼, 지금 페이지에 aria-current="page". bind:page.
    처음·끝 번호는 항상 보이고 건너뛰는 곳은 "…". */
type Props = Omit<HTMLAttributes<HTMLElement>, "onchange"> & {
    /** 전체 페이지 수 (1 이상) */ count: number;
    /** 지금 페이지(1부터). bind:page */ page?: number;
    /** 지금 페이지 양옆에 보일 번호 개수 (기본 1) */ siblings?: number;
    /** nav의 aria-label. 생략하면 로케일 pageOf(page, count) */ label?: string;
    onchange?: (page: number) => void;
};
declare const Pagination: import("svelte").Component<Props, {}, "page">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
