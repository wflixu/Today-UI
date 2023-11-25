import {
  defineComponent,
  inject,
  withDirectives,
  type Ref,
  cloneVNode,
} from "vue";
import { DIALOG_TRIGGER_TOKEN } from "./util";
import { getFirstValidChild } from "../shared/util";

export default defineComponent({
  name: "TDialogTrigger",
  setup(props, { slots, attrs }) {
    return () => {
      const defaultSlot = slots.default?.(attrs);
      const triggerRef = inject(
        DIALOG_TRIGGER_TOKEN
      ) as Ref<HTMLElement | null>;

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
