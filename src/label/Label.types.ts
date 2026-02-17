import { ExtractPropTypes, PropType, SlotsType, VNode } from 'vue';

/**
 * Label component props
 */
export const labelProps = {
    // Content
    label: {
        type: String,
        default: undefined
    },
    for: {
        type: String,
        default: undefined
    },

    // State
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },

    // Style
    size: {
        type: String as PropType<'small' | 'medium' | 'large'>,
        default: 'medium'
    },
    weight: {
        type: String as PropType<'normal' | 'semibold' | 'bold'>,
        default: 'semibold'
    },

    // Semantic attributes
    id: {
        type: String,
        default: undefined
    },
} as const;

export type LabelProps = ExtractPropTypes<typeof labelProps>;

/**
 * Label component state
 */
export interface LabelState {
    // Props
    label?: string;
    for?: string;
    required: boolean;
    disabled: boolean;
    size: 'small' | 'medium' | 'large';
    weight: 'normal' | 'semibold' | 'bold';

    // Element configuration
    root: Record<string, any>;
    requiredIndicator?: Record<string, any>;
}

/**
 * Label component slots
 */
export interface LabelSlots {
    // Custom label content (takes priority over label prop)
    default?: () => VNode[];

    // Custom required indicator
    requiredIndicator?: () => VNode[];
}

export type LabelSlotsType = SlotsType<LabelSlots>;
