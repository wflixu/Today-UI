




import type { ExtractPropTypes, PropType, Ref } from "vue";
import type { dropdownProps } from "./props";
import type { IMenuOption } from "../menu/type";


export type TriggerType = 'click' | 'hover' | 'contextmenu'| 'manually';
export type CloseScopeArea = 'all' | 'blank' | 'none';
export type EmitEvent = (event: 'toggle', result: boolean) => void;

export type IDropdownOption =  Pick<IMenuOption,'label'| 'key'>;

export type IDropdownProps = ExtractPropTypes<typeof dropdownProps>;

export interface UseDropdownProps {
    id: string;
    isOpen: Ref<boolean>;
    origin: Ref<HTMLElement | undefined>;
    dropdownRef: Ref<HTMLElement | undefined>;
    props: IDropdownProps;
    emit: EmitEvent;
  }
  
