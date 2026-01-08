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
        loading = false,
        loadingText,
        onClick,
        onKeyDown,
        onKeyUp,
        // ARIA props
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        ariaExpanded,
        ariaHaspopup,
        ariaPressed,
    } = props;

    // 检查是否有默认插槽内容
    const hasChildren = computed(() => {
        return !!(slots.default && slots.default().length > 0);
    });

    // 计算 iconOnly 状态
    const iconOnly = computed(() => Boolean(slots.icon && !hasChildren.value));

    // 计算 showSpinner 状态
    const showSpinner = computed(() => loading && !iconOnly.value);

    // 键盘事件处理
    const handleKeyDown = (event: KeyboardEvent) => {
        // Enter 和 Space 触发点击
        if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
            event.preventDefault();
            onClick?.(event as unknown as MouseEvent);
        }
        onKeyDown?.(event);
    };

    // 点击事件处理
    const handleClick = (event: MouseEvent) => {
        if (!disabled && !loading) {
            onClick?.(event);
        }
    };

    // 创建根元素配置
    const root = {
        as,
        disabled: disabled || loading, // loading 时禁用
        role: disabled ? undefined : 'button',
        tabIndex: (disabled || loading) && !disabledFocusable ? -1 : undefined,
        'aria-disabled': disabled || loading,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        'aria-expanded': ariaExpanded,
        'aria-haspopup': ariaHaspopup,
        'aria-pressed': ariaPressed,
        'aria-busy': loading, // loading 状态
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp,
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
        loading,
        loadingText,
        showSpinner: showSpinner.value,

        // Element configuration
        root,

        // Icon configuration (if present)
        icon: slots.icon ? {} : undefined,
    };
};