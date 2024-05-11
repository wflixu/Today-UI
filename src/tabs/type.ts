import type { ExtractPropTypes } from 'vue';
import { tabsProps } from './props';

export interface ITabOption {
    id: string,
    title: string,
    disabled?: boolean,
    selected?: boolean,
    icon?: string,
}


export type TabsProps = ExtractPropTypes<typeof tabsProps>