import { ref, computed, reactive, Ref, useSlots } from 'vue';
import { useButtonContext } from './ButtonContext';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton = (
    props: ButtonProps,
): ButtonState => {
    const slots = useSlots();
    const { size: contextSize } = useButtonContext();
    const {
        appearance = 'secondary',
        as = 'button',
        disabled = false,
        disabledFocusable = false,
        iconPosition = 'before',
        shape = 'rounded',
        size = contextSize?.value ?? 'medium',
    } = props;

    // 检查是否有默认插槽内容
    const hasChildren = computed(() => {
        return !!(slots.default && slots.default().length > 0);
    });

    // 计算 iconOnly 状态
    const iconOnly = computed(() => Boolean(slots.icon && !hasChildren.value));

    // 返回状态对象
    return {
        // Props passed at the top-level
        appearance,
        disabled,
        disabledFocusable,
        iconPosition,
        shape,
        size,

        // State calculated from a set of props
        iconOnly: iconOnly.value,

        // Add missing properties for ButtonState type=
        // classes: {}, // Replace with actual classes logic if needed
        // styles: {},  // Replace with actual styles logic if needed
    };
};