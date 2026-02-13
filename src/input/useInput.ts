import { computed, ref, useSlots } from 'vue';
import type { InputProps, InputState } from './Input.types';

/**
 * Given user props, defines default props for Input, computes derived state, and returns processed state.
 * @param props - User provided props to Input component.
 */
export const useInput = (
    props: InputProps,
): InputState => {
    const slots = useSlots();

    // 密码可见性状态（仅用于 type="password" 且 showPasswordToggle=true）
    const isPasswordVisible = ref(false);

    // 处理受控/非受控模式
    const internalValue = ref(props.defaultValue ?? '');

    const currentValue = computed(() => {
        return props.modelValue !== undefined
            ? props.modelValue
            : internalValue.value;
    });

    // 检查前置/后置内容插槽
    const hasContentBefore = computed(() => {
        return !!(slots.contentBefore && slots.contentBefore().length > 0);
    });

    const hasContentAfter = computed(() => {
        return !!(slots.contentAfter && slots.contentAfter().length > 0);
    });

    // 检查内置功能插槽
    const hasClearButtonSlot = computed(() => {
        return !!(slots.clearButton && slots.clearButton().length > 0);
    });

    const hasPasswordToggleButtonSlot = computed(() => {
        return !!(slots.passwordToggleButton && slots.passwordToggleButton().length > 0);
    });

    const hasProgressIndicatorSlot = computed(() => {
        return !!(slots.progressIndicator && slots.progressIndicator().length > 0);
    });

    // 计算清除按钮是否可见
    const showClearButtonVisible = computed(() => {
        // 如果有自定义插槽，则不显示内置清除按钮
        if (hasClearButtonSlot.value) {
            return false;
        }
        // showClearButton 为 false 时，不显示
        if (!props.showClearButton) {
            return false;
        }
        // 禁用或只读状态时不显示
        if (props.disabled || props.readonly) {
            return false;
        }
        // 有值时才显示
        return !!currentValue.value;
    });

    // 计算密码切换按钮是否可见
    const showPasswordToggleVisible = computed(() => {
        // 如果有自定义插槽，则不显示内置切换按钮
        if (hasPasswordToggleButtonSlot.value) {
            return false;
        }
        // showPasswordToggle 为 false 时，不显示
        if (!props.showPasswordToggle) {
            return false;
        }
        // 仅 type="password" 时显示
        return props.type === 'password';
    });

    // 事件处理
    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        // 仅在非受控模式下更新内部值
        if (props.modelValue === undefined) {
            internalValue.value = value;
        }

        props.onInput?.(value, event);
    };

    const handleChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        props.onChange?.(value, event);
    };

    const handleFocus = (event: FocusEvent) => {
        props.onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent) => {
        props.onBlur?.(event);
    };

    // 清除按钮事件
    const handleClear = () => {
        internalValue.value = '';
        props.onInput?.('', new Event('input'));
        props.onChange?.('', new Event('change'));
    };

    // 密码切换事件
    const handlePasswordToggle = () => {
        isPasswordVisible.value = !isPasswordVisible.value;
    };

    // 返回状态
    return {
        // Props 传递的状态
        appearance: props.appearance || 'outline',
        size: props.size || 'medium',
        disabled: props.disabled || false,
        readonly: props.readonly || false,
        required: props.required || false,
        error: props.error || false,
        type: props.type || 'text',
        name: props.name,
        autocomplete: props.autocomplete,
        placeholder: props.placeholder,
        maxLength: props.maxLength,
        minLength: props.minLength,
        value: currentValue.value,
        validationState: props.validationState || 'none',
        validationMessage: props.validationMessage,
        showClearButton: props.showClearButton || false,
        showPasswordToggle: props.showPasswordToggle || false,
        progress: props.progress,
        hasContentBefore: hasContentBefore.value,
        hasContentAfter: hasContentAfter.value,
        showClearButtonVisible: showClearButtonVisible.value,
        showPasswordToggleVisible: showPasswordToggleVisible.value,
        isPasswordVisible: isPasswordVisible.value,

        // 事件处理
        onInput: handleInput,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClear: handleClear,
        onPasswordToggle: handlePasswordToggle,

        // 元素配置
        root: {},
        input: {},
        contentBefore: hasContentBefore.value ? {} : undefined,
        contentAfter: hasContentAfter.value ? {} : undefined,
        clearButton: showClearButtonVisible.value ? {} : undefined,
        passwordToggleButton: showPasswordToggleVisible.value ? {} : undefined,
        progressIndicator: props.progress !== undefined ? {} : undefined,
    };
};
