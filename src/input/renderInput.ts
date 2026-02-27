import { h, computed } from 'vue';
import type { InputState, InputSlots } from './Input.types';

export const renderInput = (state: InputState, slots: InputSlots) => {
    const {
        hasContentBefore,
        hasContentAfter,
        showClearButtonVisible,
        showPasswordToggleVisible,
        isPasswordVisible,
        hasClearButtonSlot,
        hasPasswordToggleButtonSlot,
        hasProgressIndicatorSlot,
        value,
        disabled,
        readonly,
        required,
    } = state;

    const children = [];

    // ========== Input Wrapper ==========
    const wrapperChildren = [];

    // 前置内容
    if (hasContentBefore && slots.contentBefore) {
        wrapperChildren.push(
            h('span', { class: state.contentBefore?.className }, slots.contentBefore())
        );
    }

    // 计算输入框的实际类型（密码显示/隐藏）
    const inputType = computed(() => {
        if (state.type === 'password' && showPasswordToggleVisible) {
            return isPasswordVisible ? 'text' : 'password';
        }
        return state.type;
    });

    // 输入框
    const inputElement = h('input', {
        class: state.input.className,
        type: inputType.value,
        id: state.id,
        name: state.name,
        autocomplete: state.autocomplete,
        placeholder: state.placeholder,
        maxlength: state.maxLength,
        minlength: state.minLength,
        disabled,
        readOnly: readonly,
        required,
        value,
        onInput: state.onInput,
        onChange: state.onChange,
        onFocus: state.onFocus,
        onBlur: state.onBlur,
    });

    wrapperChildren.push(inputElement);

    // ========== Content After 区域 ==========
    const contentAfterChildren = [];

    // 清除按钮（内置）
    if (showClearButtonVisible && !hasClearButtonSlot) {
        const clearButtonElement = h('button', {
            type: 'button',
            class: state.clearButton?.className,
            disabled: disabled || readonly,
            onClick: state.onClear,
            'aria-label': '清除输入内容',
        }, '×');
        contentAfterChildren.push(clearButtonElement);
    }

    // 密码切换按钮（内置）
    if (showPasswordToggleVisible && !hasPasswordToggleButtonSlot) {
        const passwordToggleElement = h('button', {
            type: 'button',
            class: state.passwordToggleButton?.className,
            onClick: state.onPasswordToggle,
            'aria-label': isPasswordVisible ? '隐藏密码' : '显示密码',
        }, '👁️');
        contentAfterChildren.push(passwordToggleElement);
    }

    // 后置内容（自定义插槽）
    if (hasContentAfter && slots.contentAfter) {
        // 如果有自定义的 contentAfter 插槽，将其渲染
        contentAfterChildren.push(
            h('span', { class: state.contentAfter?.className }, slots.contentAfter())
        );
    }

    // 清除按钮（自定义插槽）
    if (hasClearButtonSlot && showClearButtonVisible) {
        contentAfterChildren.push(
            h('span', { class: state.clearButton?.className }, slots.clearButton())
        );
    }

    // 密码切换按钮（自定义插槽）
    if (hasPasswordToggleButtonSlot && showPasswordToggleVisible) {
        contentAfterChildren.push(
            h('span', { class: state.passwordToggleButton?.className }, slots.passwordToggleButton())
        );
    }

    // 将 contentAfter children 添加到 wrapper
    if (contentAfterChildren.length > 0) {
        wrapperChildren.push(
            h('span', { class: state.contentAfter?.className }, contentAfterChildren)
        );
    }

    // ========== Root Children ==========
    // Input Wrapper
    children.push(
        h('div', { class: state.inputWrapper?.className }, wrapperChildren)
    );

    // 进度指示器（内置）
    if (state.progressIndicator && !hasProgressIndicatorSlot) {
        const progressValue = (state.progress || 0) / 100;
        const progressElement = h('div', {
            class: state.progressIndicator?.className,
            style: {
                width: `${progressValue * 100}%`,
            },
            role: 'progressbar',
            'aria-valuenow': state.progress,
            'aria-valuemin': 0,
            'aria-valuemax': 100,
        });

        children.push(progressElement);
    }

    // 进度指示器（自定义插槽）
    if (hasProgressIndicatorSlot && state.progressIndicator) {
        children.push(
            h('span', { class: state.progressIndicator?.className }, slots.progressIndicator())
        );
    }

    // Root 包装器
    return h('div', { class: state.root.className }, children);
};

export default renderInput;
