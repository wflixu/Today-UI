
import {
  ComputePositionConfig,
  ComputePositionReturn,
  Middleware,
  SideObject,
  Strategy,
  computePosition, arrow as arrowCore, Placement
} from '@floating-ui/dom';

import { reactive, ref, Ref, watchEffect, unref, isRef } from 'vue';


export * from '@floating-ui/dom';

export type MaybeRef<T> = Ref<T> | T

type Data = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x: Ref<number>;
  y: Ref<number>;
};
type UseFloatingConfig = Omit<Partial<ComputePositionConfig>, 'platform' | 'placement' | 'strategy'> & {
  placement: MaybeRef<Placement>,
  strategy: MaybeRef<Strategy>,
};

export type UseFloatingReturn = Data & {
  refs: {
    reference: Ref<Element|undefined>;
    floating: Ref<Element|undefined>;
  }
  reference: (ref: Element) => void;
  floating: (ref: Element) => void;
};

export function useFloating({
  middleware,
  placement,
  strategy,
}: UseFloatingConfig = {
    strategy: 'absolute',
    placement: 'bottom',
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

  const returnData:UseFloatingReturn =
  {
    x: ref(0),
    y: ref(0),
    strategy: unref(strategy),
    placement: unref(placement),
    middlewareData: {},
    refs:{
      reference,
      floating,
    },
    reference: setReference,
    floating: setFloating,
  };
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
    returnData.middlewareData = reactive(middlewareData);
  };
  watchEffect(update);
  return returnData as unknown as UseFloatingReturn;
}




export const arrow = (options: {
  element: Ref<HTMLElement | null> | HTMLElement;
  padding?: number | SideObject;
}): Middleware => {
  const { element, padding } = options;



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
