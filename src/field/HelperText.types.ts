import { ExtractPropTypes, PropType, SlotsType, VNode } from 'vue';

/**
 * HelperText component props
 */
export const helperTextProps = {
    // Content
    text: {
        type: String,
        default: undefined
    },

    // State
    disabled: {
        type: Boolean,
        default: false
    },

    // Validation state for color
    validationState: {
        type: String as PropType<'none' | 'valid' | 'warning' | 'invalid'>,
        default: 'none'
    },
} as const;

export type HelperTextProps = ExtractPropTypes<typeof helperTextProps>;

/**
 * HelperText component state
 */
export interface HelperTextState {
    // Props
    text?: string;
    disabled: boolean;
    validationState: 'none' | 'valid' | 'warning' | 'invalid';

    // Element configuration
    root: Record<string, any>;
}

/**
 * HelperText component slots
 */
export interface HelperTextSlots {
    // Custom helper text content (takes priority over text prop)
    default?: () => VNode[];
}

export type HelperTextSlotsType = SlotsType<HelperTextSlots>;
