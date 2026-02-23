import { h, computed } from 'vue';
import type { InputState, InputSlots } from './Input.types';

export const renderInput = (state: InputState, slots: InputSlots) => {
    const {
        hasContentBefore,
        hasContentAfter,
        showClearButtonVisible,
        showPasswordToggleVisible,
        isPasswordVisible,
        value,
        disabled,
        readonly,
        required,
    } = state;

    const rest = {
        root: state.root,
        input: state.input,
        contentBefore: state.contentBefore,
        contentAfter: state.contentAfter,
        clearButton: state.clearButton,
        passwordToggleButton: state.passwordToggleButton,
        progressIndicator: state.progressIndicator,
    };

    const children = [];

    // 前置内容
    if (hasContentBefore && slots.contentBefore) {
        children.push(
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

    children.push(inputElement);

    // 清除按钮（内置）
    if (showClearButtonVisible && !slots.clearButton) {
        const clearButtonElement = h('button', {
            type: 'button',
            class: state.clearButton?.className,
            disabled: disabled || readonly,
            onClick: state.onClear,
            'aria-label': '清除输入内容',
        }, '×');
        children.push(clearButtonElement);
    }

    // 清除按钮（自定义插槽）
    if (slots.clearButton && showClearButtonVisible) {
        children.push(
            h('span', { class: state.clearButton?.className }, slots.clearButton())
        );
    }

    // 密码切换按钮（内置）
    if (showPasswordToggleVisible && isPasswordVisible && !slots.passwordToggleButton) {
        const passwordToggleElement = h('button', {
            type: 'button',
            class: state.passwordToggleButton?.className,
            onClick: state.onPasswordToggle,
            'aria-label': isPasswordVisible ? '隐藏密码' : '显示密码',
        }, '👁️');
        children.push(passwordToggleElement);
    }

    // 密码切换按钮（自定义插槽）
    if (slots.passwordToggleButton && showPasswordToggleVisible) {
        children.push(
            h('span', { class: state.passwordToggleButton?.className }, slots.passwordToggleButton())
        );
    }

    // 后置内容（如果有）
    if (hasContentAfter && slots.contentAfter) {
        children.push(
            h('span', { class: state.contentAfter?.className }, slots.contentAfter())
        );
    }

    // 进度指示器（内置）
    if (state.progressIndicator && !slots.progressIndicator) {
        const progressValue = (state.progress || 0) / 100;
        const progressElement = h('div', {
            class: state.progressIndicator?.className,
            style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '2px',
                backgroundColor: 'currentColor',
                width: `${progressValue * 100}%`,
                transition: 'width 0.2s ease',
            },
            role: 'progressbar',
            'aria-valuenow': state.progress,
            'aria-valuemin': 0,
            'aria-valuemax': 100,
        });

        children.push(progressElement);
    }

    // 进度指示器（自定义插槽）
    if (slots.progressIndicator && state.progressIndicator) {
        children.push(
            h('span', { class: state.progressIndicator?.className }, slots.progressIndicator())
        );
    }

    // 包装器
    return h('div', { class: state.root.className }, children);
};

export default renderInput;
