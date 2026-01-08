import type { ButtonState, ButtonSlots } from './Button.types';
import { h } from 'vue';
import { Spinner } from './Spinner';

/**
 * 渲染 Button 组件
 * 基于 Vue 3 的 h 函数
 */
export const renderButton = (state: ButtonState, slots: ButtonSlots) => {
    const { iconOnly, iconPosition, loading, loadingText, showSpinner } = state;
    const rootElement = state.as || 'button';

    const children = [];

    // 添加 Spinner（loading 状态）
    if (showSpinner) {
        children.push(
            h('span', { class: 't-button__spinner-wrapper' }, [
                h(Spinner, { size: 'small' }),
                loadingText && ` ${loadingText}`
            ].filter(Boolean))
        );
    }

    // 添加图标（在前面）
    if (!loading && iconPosition !== 'after' && slots.icon) {
        children.push(slots.icon());
    }

    // 添加文本内容（非 loading 且非 iconOnly）
    if (!loading && !iconOnly && slots.default) {
        children.push(slots.default());
    }

    // 添加图标（在后面）
    if (!loading && iconPosition === 'after' && slots.icon) {
        children.push(slots.icon());
    }

    return h(rootElement, {
        class: state.root.className,
        disabled: state.disabled,
        'aria-disabled': state.root['aria-disabled'],
        'aria-busy': state.root['aria-busy'],
        onClick: state.root.onClick,
        onKeyDown: state.root.onKeyDown,
        onKeyUp: state.root.onKeyUp,
        ...state.root,
    }, children);
};

/**
 * 向后兼容的渲染函数
 */
export const renderButton_unstable = renderButton;