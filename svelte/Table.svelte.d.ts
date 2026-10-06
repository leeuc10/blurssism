import type { Snippet } from "svelte";
declare function $$render<R extends Record<string, unknown>>(): {
    props: {
        columns: {
            key: string;
            label: string;
            numeric?: boolean;
            format?: (row: R) => string;
        }[];
        rows: R[];
        caption?: string;
        cell?: Snippet<[R, {
            key: string;
            label: string;
            numeric?: boolean;
            format?: (row: R) => string;
        }]>;
        class?: string;
    };
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<R extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<R>>['props'];
    events(): ReturnType<typeof $$render<R>>['events'];
    slots(): ReturnType<typeof $$render<R>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <R extends Record<string, unknown>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<R>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<R>['props']>, ReturnType<__sveltets_Render<R>['events']>, ReturnType<__sveltets_Render<R>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<R>['bindings']>;
    } & ReturnType<__sveltets_Render<R>['exports']>;
    <R extends Record<string, unknown>>(internal: unknown, props: ReturnType<__sveltets_Render<R>['props']> & {}): ReturnType<__sveltets_Render<R>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Table: $$IsomorphicComponent;
type Table<R extends Record<string, unknown>> = InstanceType<typeof Table<R>>;
export default Table;
