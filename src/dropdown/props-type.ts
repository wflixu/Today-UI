




import type { ExtractPropTypes, PropType } from "vue";


export type TriggerType = 'click' | 'hover' | 'contextmenu'| 'manually';
export type CloseScopeArea = 'all' | 'blank' | 'none';

export interface IDropdownOption {
    label:string,
    key:string|number,
}


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


export type IDropdownProps = ExtractPropTypes<typeof dropdownProps>;
