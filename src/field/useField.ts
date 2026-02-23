import { type Slots } from 'vue';
import type { FieldProps, FieldState, FieldSlots } from './Field.types';

/**
 * Given user props, defines default props for Field, computes derived state, and returns processed state.
 * @param props - User provided props to Field component.
 * @param slots - Component slots instance.
 */
export const useField = (
    props: FieldProps,
    slots: Slots,
): FieldState => {
    const hasValidationMessageSlot = () => {
        return !!(slots.validationMessage && slots.validationMessage().length > 0);
    };

    // 返回状态
    return {
        // Props 传递的状态
        validationMessage: props.validationMessage,
        validationState: props.validationState || 'none',
        orientation: props.orientation || 'vertical',

        // 元素配置
        root: {},
        content: {},
        validationMessageProps: (props.validationMessage && !hasValidationMessageSlot()) ? {} : undefined,
    };
};
