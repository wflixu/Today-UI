import type { ButtonState, ButtonSlots } from './Button.types';
import { h } from 'vue';

/**
 * 渲染 Button 组件
 * 基于 Vue 3 的 h 函数
 */
export const renderButton = (state: ButtonState, slots: ButtonSlots) => {
    const { iconOnly, iconPosition } = state;
    const rootElement = state.as || 'button';

    const children = [];

    // 添加图标（在前面）
    if (iconPosition !== 'after' && slots.icon) {
        children.push(slots.icon());
    }

    // 添加文本内容
    if (!iconOnly && slots.default) {
        children.push(slots.default());
    }

    // 添加图标（在后面）
    if (iconPosition === 'after' && slots.icon) {
        children.push(slots.icon());
    }

    return h(rootElement, {
        class: state.root.className,
        disabled: state.disabled,
        'aria-disabled': state.disabled,
        onClick: state.root.onClick,
        ...state.root,
    }, children);
};

/**
 * 向后兼容的渲染函数
 */
export const renderButton_unstable = renderButton;