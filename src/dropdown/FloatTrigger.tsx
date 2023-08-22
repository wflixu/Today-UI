import { cloneVNode, defineComponent, withDirectives, inject } from "vue";
import type { SetupContext, Ref } from "vue";
import { FLOAT_TRIGGER_TOKEN, getFirstValidChild } from "./util";

export default defineComponent({
  name: "FloatTrigger",
  inheritAttrs: false,
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
