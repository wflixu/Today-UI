
import {
  ComputePositionConfig,
  ComputePositionReturn,
  Middleware,
  SideObject,
  Strategy,
  computePosition, arrow as arrowCore, Placement, MiddlewareData
} from '@floating-ui/dom';

import { ref, type Ref, watchEffect, unref, isRef, UnwrapNestedRefs } from 'vue';


export * from '@floating-ui/dom';

export type MaybeRef<T> = Ref<T> | T


type Data = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x: Ref<number>;
  y: Ref<number>;
  middlewareData:Ref<MiddlewareData|null>;
};
type UseFloatingConfig = Omit<Partial<ComputePositionConfig>, 'platform' | 'placement' | 'strategy' | ''> & {
  placement: Ref<Placement> | Placement,
  strategy: Ref<Strategy> | Strategy,
};

export type UseFloatingReturn = Data & {
  refs: {
    reference: Ref<Element|undefined>;
    floating: Ref<Element|undefined>;
  }
  reference: (ref: Element) => void;
  floating: (ref: Element) => void;
  update: () => void;
};

export function useFloating({
  middleware,
  placement,
  strategy,
}: UseFloatingConfig = {
    strategy: 'fixed',
    placement: 'top',
  }): UseFloatingReturn {
  const reference = ref<Element>();
  const floating = ref<Element>();

  const setReference = (node: Element) => {
    if (reference) {
      reference.value = node;
    }
  }
  const setFloating = (node: Element) => {
    if (floating) {
      floating.value = node;
    }
  }

  const update = async () => {
    if (!reference.value || !floating.value) {
      return;
    }
    let { x, y, middlewareData } = await computePosition(reference.value, floating.value as HTMLElement, {
      middleware: middleware,
      placement: unref(placement),
      strategy: unref(strategy),
    });
    returnData.x.value = x;
    returnData.y.value = y;
    returnData.strategy = unref(strategy);
    returnData.placement = unref(placement);
    returnData.middlewareData.value =middlewareData;
  };

  const returnData:UseFloatingReturn =
  {
    x: ref(0),
    y: ref(0),
    strategy: unref(strategy),
    placement: unref(placement),
    middlewareData: ref(null),
    refs:{
      reference,
      floating,
    },
    reference: setReference,
    floating: setFloating,
    update,
  };

  watchEffect(update);
  return returnData as unknown as UseFloatingReturn;
}




export const arrow = (options: {
  element: Ref<HTMLElement | undefined> | HTMLElement;
  padding?: number | SideObject;
}): Middleware => {
  const { element, padding = 0 } = options;
  
  return {
    name: 'arrow',
    options,
    fn(args) {
      if (isRef(element)) {
        if (element.value != null) {
          return arrowCore({ element: element.value, padding }).fn(args);
        }
        return {};
      } else if (element) {
       
        return arrowCore({ element, padding }).fn(args);
      }
      return {};
    },
  };
};
