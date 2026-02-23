import { ExtractPropTypes, PropType, SlotsType, VNode } from 'vue';

/**
 * Field component props
 */
export const fieldProps = {
    // Validation
    validationMessage: {
        type: String,
        default: undefined
    },
    validationState: {
        type: String as PropType<'none' | 'valid' | 'warning' | 'invalid'>,
        default: 'none'
    },

    // Layout
    orientation: {
        type: String as PropType<'vertical' | 'horizontal'>,
        default: 'vertical'
    },
} as const;

export type FieldProps = ExtractPropTypes<typeof fieldProps>;

/**
 * Field component state
 */
export interface FieldState {
    // Props
    validationMessage?: string;
    validationState: 'none' | 'valid' | 'warning' | 'invalid';
    orientation: 'vertical' | 'horizontal';

    // Element configuration
    root: Record<string, any>;
    content?: Record<string, any>;
    validationMessageProps?: Record<string, any>;
}

/**
 * Field component slots
 */
export interface FieldSlots {
    // Default slot: place Input or other form controls
    default?: () => VNode[];

    // Label slot: user manually places Label component
    label?: () => VNode[];

    // HelperText slot: user manually places HelperText component
    helperText?: () => VNode[];

    // ValidationMessage slot: custom validation message
    validationMessage?: () => VNode[];
}

export type FieldSlotsType = SlotsType<FieldSlots>;
