import { Teleport, defineComponent, provide, ref, toRefs } from "vue";
import TMenu from "./../menu/Menu";
import FloatTrigger from "./FloatTrigger";
import "./dropdown.css";
import { type IDropdownProps, type IDropdownOption } from "./type";
import { flip, shift, useFloating } from "@floating-ui/vue";
import { FLOAT_TRIGGER_TOKEN } from "./util";
import { dropdownProps } from "./props";
import { useDropdown, useDropdownEvent } from "./hooks";

let dropdownId = 1;
export default defineComponent({
  name: "TDropdown",
  inheritAttrs: false,
  props: dropdownProps,
  emits: ["toggle", "select"],
  setup(props: IDropdownProps, { attrs, slots, emit }) {

    const { trigger, visible } = toRefs(props);
    const origin = ref<HTMLElement | undefined>();
    const show = ref(false);
    const dropdownRef = ref<HTMLElement | undefined>();
    const currentPosition = ref("bottom-start");
    const id = `dropdown_${dropdownId++}`;
    const { x, y, floatingStyles } = useFloating(origin, dropdownRef, {
      open: show,
      strategy: "fixed",
      placement: "bottom-start",
      middleware: [flip(), shift()],
    });
    provide(FLOAT_TRIGGER_TOKEN, origin);

    const toggle = (status: boolean) => {
      show.value = status;
      emit("toggle", show.value);
    };

    useDropdownEvent({
      id,
      isOpen: show,
      origin,
      dropdownRef,
      props,
      emit,
    });

    useDropdown(id, visible, show, origin, dropdownRef, currentPosition, emit);

    const onClickItem = (item: IDropdownOption, event: Event) => {
      toggle(false);
      emit("select", item, event);
    };

    return () => {
      return (
        <>
          <FloatTrigger class="t-dropdown-ref">
            {slots.default?.()}
          </FloatTrigger>
          <Teleport to="body">
            <div
              ref={dropdownRef}
              v-show={show.value}
              class="t-dropdown-menu"
              style={floatingStyles.value}
              {...attrs}
            >
              <TMenu
                options={props.options}
                onSelect={(data, e) => onClickItem(data, e)}
              ></TMenu>
            </div>
          </Teleport>
        </>
      );
    };
  },
});
