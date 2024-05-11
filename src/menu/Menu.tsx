import { computed, defineComponent } from "vue";
import TIcon from "../icon/Icon";

import { menuProps } from "./props";
import type { MenuProps } from "./type";
import "./menu.css";
import { useMeun } from "./hook";
import type { IDropdownOption } from "../dropdown/type";

export default defineComponent({
  name: "TMenu",
  props: menuProps,
  emits: ["select"],
  setup(props: MenuProps, { emit }) {
    const { hasIcon, hasMarker } = useMeun(props);
    const listClasses = computed(() => {
      let str = "t-menu-list";
      if (hasIcon.value) {
        str += " has-icon";
      }
      if (hasMarker.value) {
        str += " has-marker";
      }
    });
    const onClickItem = (option: IDropdownOption, e: Event) => {
      emit("select", option, e);
    };
    return () => {
      return (
        <div class="t-menu">
          <div class="t-menu-list">
            <div class={listClasses.value}>
              {props.options.map((option) => {
                return (
                  <div
                    class="t-menu-list-item"
                    key={option.key}
                    onClick={(e) => onClickItem(option, e)}
                  >
                    {hasMarker.value ? <span class="marker"></span> : null}
                    {hasIcon.value ? (
                      <TIcon name={option.icon} class="icon"></TIcon>
                    ) : null}
                    <div class="content">{option.label} </div>
                    <div class="secondary">{option.secondary} </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };
  },
});
