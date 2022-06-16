import { ComputePositionConfig, ComputePositionReturn, Middleware, SideObject, Strategy, Placement, MiddlewareData } from '@floating-ui/dom';
import { type Ref, UnwrapNestedRefs } from 'vue';
export * from '@floating-ui/dom';
export declare type MaybeRef<T> = Ref<T> | T;
declare type Data = Omit<ComputePositionReturn, 'x' | 'y'> & {
    x: Ref<number>;
    y: Ref<number>;
    middlewareData: UnwrapNestedRefs<MiddlewareData>;
};
declare type UseFloatingConfig = Omit<Partial<ComputePositionConfig>, 'platform' | 'placement' | 'strategy' | ''> & {
    placement: Ref<Placement> | Placement;
    strategy: Ref<Strategy> | Strategy;
};
export declare type UseFloatingReturn = Data & {
    refs: {
        reference: Ref<Element | undefined>;
        floating: Ref<Element | undefined>;
    };
    reference: (ref: Element) => void;
    floating: (ref: Element) => void;
    update: () => void;
};
export declare function useFloating({ middleware, placement, strategy, }?: UseFloatingConfig): UseFloatingReturn;
export declare const arrow: (options: {
    element: Ref<HTMLElement | undefined> | HTMLElement;
    padding?: number | SideObject;
}) => Middleware;
