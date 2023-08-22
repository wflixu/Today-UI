import type { PropType } from "vue";
import type { IDropdownOption, TriggerType } from "./type";


export const dropdownProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: "click",
  },
  options: {
    type: Array as PropType<Array<IDropdownOption>>,
    default: function () {
        return [] as Array<IDropdownOption>;
    }
  }

};


