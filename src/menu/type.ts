import type { ExtractPropTypes } from 'vue';
import { menuProps } from './props';

export interface  IMenuOption {
    key:string,
    label: string,
    disabled?: boolean,
    selected?: boolean,
    icon?: string,
    secondary?: string,
}


export type MenuProps = ExtractPropTypes<typeof menuProps>