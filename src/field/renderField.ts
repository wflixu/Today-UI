import { h } from 'vue';
import type { FieldState, FieldSlotsType } from './Field.types';

/**
 * Render the Field component
 */
export const renderField = (state: FieldState, slots: FieldSlotsType) => {
    // 获取各个插槽的内容
    const labelContent = slots.label?.();
    const helperTextContent = slots.helperText?.();
    const validationMessageContent = slots.validationMessage?.();
    const defaultContent = slots.default?.();

    // 构建子元素数组
    const children: any[] = [];

    // Label slot（用户提供 Label 组件）
    if (labelContent) {
        children.push(labelContent);
    }

    // 内容区域（默认插槽）
    children.push(h('div', {
        ...state.content,
    }, defaultContent));

    // HelperText slot（用户提供 HelperText 组件）
    if (helperTextContent) {
        children.push(helperTextContent);
    }

    // ValidationMessage
    if (validationMessageContent) {
        children.push(validationMessageContent);
    } else if (state.validationMessage) {
        children.push(h('div', {
            ...state.validationMessage,
            role: 'status',
            'aria-live': 'polite',
        }, [
            // 添加图标（可选）
            state.validationState === 'valid' && '✓ ',
            state.validationState === 'warning' && '⚠ ',
            state.validationState === 'invalid' && '✕ ',
            state.validationMessage,
        ].filter(Boolean)));
    }

    return h('div', {
        ...state.root,
    }, children);
};
