import { Teleport, defineComponent, provide, ref, toRefs, watch } from "vue";

import FloatTrigger from "./FloatTrigger";
import "./dropdown.css";
import {
  type IDropdownProps,
  dropdownProps,
  type IDropdownOption,
} from "./type";
import { flip, shift, useFloating } from "@floating-ui/vue";
import { FLOAT_TRIGGER_TOKEN, getElement, subscribeEvent } from "./util";

export default defineComponent({
  name: "TDropdown",
  inheritAttrs: false,
  props: dropdownProps,
  emits: ["toggle", "select"],
  setup(props: IDropdownProps, { attrs, slots, emit }) {
    console.log(props.options);
    const { trigger } = toRefs(props);
    const origin = ref<HTMLElement | undefined>();
    const show = ref(false);
    const dropdownRef = ref<HTMLElement | undefined>();

    const { x, y, floatingStyles } = useFloating(origin, dropdownRef, {
      open: show,
      placement: "bottom-start",
      middleware: [flip(), shift()],
    });
    provide(FLOAT_TRIGGER_TOKEN, origin);

    const toggle = (status: boolean) => {
      show.value = status;
      emit("toggle", show.value);
    };

    watch(
      [trigger, origin, dropdownRef],
      ([triggerVal, originVal, dropdownEl], ov, onInvalidate) => {
        const originEl = getElement(originVal ?? null);
        const subscriptions: (() => void)[] = [];
        if (triggerVal === "click") {
          subscriptions.push(
            subscribeEvent(originEl, "click", () => toggle(!show.value))
          );
        }
        if (triggerVal === "contextmenu") {
          subscriptions.push(
            subscribeEvent(originEl, "contextmenu", (evt) => {
              evt.preventDefault();
              toggle(!show.value);
            })
          );
        }
        onInvalidate(() => subscriptions.forEach((v) => v()));
      }
    );

    const onClickItem = (item: IDropdownOption, event: Event) => {
      toggle(false);
      emit("select", item, event);
    };

    return () => {
      return (
        <>
          <FloatTrigger>{slots.default?.()}</FloatTrigger>
          <Teleport to="body">
            <div
              ref={dropdownRef}
              v-show={show.value}
              class="t-dropdown-menu"
              style={floatingStyles.value}
              {...attrs}
            >
              {props.options?.map(({ label, key }) => {
                return (
                  <div
                    class="MenuItem"
                    key={key}
                    onClick={(e) => onClickItem({ label, key }, e)}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </Teleport>
        </>
      );
    };
  },
});
