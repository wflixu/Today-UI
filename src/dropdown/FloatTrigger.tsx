import { cloneVNode, defineComponent, withDirectives, inject } from "vue";
import type { SetupContext, Ref, InjectionKey } from "vue";
import { getFirstValidChild } from "./util";

export const FLOAT_TRIGGER_TOKEN: InjectionKey<Ref> =
  Symbol("floating-trigger");

export default defineComponent({
  name: "FloatTrigger",
  setup(_, ctx: SetupContext) {
    const { slots, attrs } = ctx;
    return () => {
      const defaultSlot = slots.default?.(attrs);
      const triggerRef = inject(FLOAT_TRIGGER_TOKEN) as Ref<HTMLElement | null>;

      if (!defaultSlot) {
        return null;
      }

      const firstValidChild = getFirstValidChild(defaultSlot);

      if (!firstValidChild) {
        return null;
      }

      return withDirectives(cloneVNode(firstValidChild, attrs), [
        [
          {
            mounted(el) {
              triggerRef.value = el;
            },
            updated(el) {
              triggerRef.value = el;
            },
            unmounted() {
              triggerRef.value = null;
            },
          },
        ],
      ]);
    };
  },
});
