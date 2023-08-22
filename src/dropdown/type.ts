




import type { ExtractPropTypes, PropType } from "vue";
import type { dropdownProps } from "./props";


export type TriggerType = 'click' | 'hover' | 'contextmenu'| 'manually';
export type CloseScopeArea = 'all' | 'blank' | 'none';

export interface IDropdownOption {
    label:string,
    key:string|number,
}


export type IDropdownProps = ExtractPropTypes<typeof dropdownProps>;
