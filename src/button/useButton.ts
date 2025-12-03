import { computed, useSlots } from 'vue';
import { useButtonContext } from './ButtonContext';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 */
export const useButton = (
    props: ButtonProps,
): ButtonState => {
    const slots = useSlots();
    const { size: contextSize } = useButtonContext();

    // 处理向后兼容：如果提供了 type prop，使用它；否则使用 appearance
    const appearance = props.type || props.appearance || 'secondary';

    const {
        as = 'button',
        disabled = false,
        disabledFocusable = false,
        iconPosition = 'before',
        shape = 'rounded',
        size = contextSize?.value ?? 'medium',
        onClick,
    } = props;

    // 检查是否有默认插槽内容
    const hasChildren = computed(() => {
        return !!(slots.default && slots.default().length > 0);
    });

    // 计算 iconOnly 状态
    const iconOnly = computed(() => Boolean(slots.icon && !hasChildren.value));

    // 创建根元素配置
    const root = {
        as,
        disabled,
        role: disabled ? undefined : 'button',
        tabIndex: disabled && !disabledFocusable ? -1 : undefined,
        'aria-disabled': disabled,
        onClick,
    };

    // 返回状态对象
    return {
        // Props passed at the top-level
        appearance,
        disabled,
        disabledFocusable,
        iconPosition,
        shape,
        size,
        as,

        // State calculated from a set of props
        iconOnly: iconOnly.value,

        // Element configuration
        root,

        // Icon configuration (if present)
        icon: slots.icon ? {} : undefined,
    };
};