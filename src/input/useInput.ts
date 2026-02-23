import { computed, type Ref, type Slots, type EmitFn } from 'vue';
import type { InputProps, InputState, InputSlots } from './Input.types';

/**
 * Given user props, defines default props for Input, computes derived state, and returns processed state.
 * @param props - User provided props to Input component.
 * @param slots - Component slots instance.
 * @param internalValue - Ref for uncontrolled mode value.
 * @param isPasswordVisible - Ref for password visibility state.
 * @param emit - Component emit function.
 */
export const useInput = (
    props: InputProps,
    slots: Slots,
    internalValue: Ref<string>,
    isPasswordVisible: Ref<boolean>,
    emit?: EmitFn,
): InputState => {

    // 处理受控/非受控模式
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

        // 触发 v-model 更新
        emit?.('update:modelValue', value);
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
        const clearValue = '';
        // 仅在非受控模式下更新内部值
        if (props.modelValue === undefined) {
            internalValue.value = clearValue;
        }

        // 触发 v-model 更新
        emit?.('update:modelValue', clearValue);

        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        props.onInput?.(clearValue, inputEvent);
        props.onChange?.(clearValue, changeEvent);
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
        id: props.id,
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
        hasClearButtonSlot: hasClearButtonSlot.value,
        hasPasswordToggleButtonSlot: hasPasswordToggleButtonSlot.value,
        hasProgressIndicatorSlot: hasProgressIndicatorSlot.value,

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
