import { ComputePositionConfig, ComputePositionReturn, Middleware, SideObject, Strategy, Placement } from '@floating-ui/dom';
import { Ref } from 'vue';
export * from '@floating-ui/dom';
export declare type MaybeRef<T> = Ref<T> | T;
declare type Data = Omit<ComputePositionReturn, 'x' | 'y'> & {
    x: Ref<number>;
    y: Ref<number>;
};
declare type UseFloatingConfig = Omit<Partial<ComputePositionConfig>, 'platform' | 'placement' | 'strategy'> & {
    placement: MaybeRef<Placement>;
    strategy: MaybeRef<Strategy>;
};
export declare type UseFloatingReturn = Data & {
    refs: {
        reference: Ref<Element | undefined>;
        floating: Ref<Element | undefined>;
    };
    reference: (ref: Element) => void;
    floating: (ref: Element) => void;
};
export declare function useFloating({ middleware, placement, strategy, }?: UseFloatingConfig): UseFloatingReturn;
export declare const arrow: (options: {
    element: Ref<HTMLElement | null> | HTMLElement;
    padding?: number | SideObject;
}) => Middleware;
