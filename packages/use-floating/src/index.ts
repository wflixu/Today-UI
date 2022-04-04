
import {
  ComputePositionConfig,
  ComputePositionReturn,
  Middleware,
  SideObject,
  Strategy,
} from '@floating-ui/core';
import { computePosition, arrow as arrowCore, Placement } from '@floating-ui/dom';
import { reactive, ref, Ref, watchEffect, unref, isRef } from 'vue';


export * from '@floating-ui/dom';

export type MaybeRef<T> = Ref<T> | T

type Data = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x: MaybeRef<number | null>;
  y: MaybeRef<number | null>;
};
type UseFloatingConfig = Omit<Partial<ComputePositionConfig>, 'platform' | 'placement' | 'strategy'> & {
  placement: MaybeRef<Placement>,
  strategy: MaybeRef<Strategy>,
};

export type UseFloatingReturn = Data & {
  refs: {
    reference: Ref<Element>;
    floating: Ref<Element>;
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

  const returnData = reactive<Partial<UseFloatingReturn>>(
    {
      x: 0,
      y: 0,
      strategy: unref(strategy),
      placement: unref(placement),
      middlewareData: {},
      reference: setReference,
      floating: setFloating,
    }
  );
  const update = async () => {
    console.log('update:start', reference.value, floating.value);
    if (!reference.value || !floating.value) {
      return;
    }
    let data = await computePosition(reference.value, floating.value as HTMLElement, {
      middleware: middleware,
      placement: unref(placement),
      strategy: unref(strategy),
    });
    console.log(data);
    Object.assign(returnData, data);
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
