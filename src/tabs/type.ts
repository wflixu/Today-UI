import type { ExtractPropTypes } from 'vue';
import { tabsProps } from './props';

export interface ITabOption {
    key: string,
    title: string,
    disabled?: boolean,
    selected?: boolean,
    icon?: string,
    closeable?: boolean,
}


export type TabsProps = ExtractPropTypes<typeof tabsProps>