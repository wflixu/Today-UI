import { mergeClasses } from '@/shared/griffel/mergeClasses';
import type { InputState } from './Input.types';
import { useInputStyles as useGriffelStyles } from './input.styles';

export const inputClassNames = {
    root: 't-input',
    inputWrapper: 't-input__input-wrapper',
    input: 't-input__input',
    contentBefore: 't-input__content-before',
    contentAfter: 't-input__content-after',
    clearButton: 't-input__clear-button',
    passwordToggleButton: 't-input__password-toggle',
    progressIndicator: 't-input__progress-indicator',
} as const;

/**
 * Apply styles to the Input state by merging semantic class names with griffel styles.
 */
export const useInputStyles = (state: InputState) => {
    // Get Griffel styles
    const styles = useGriffelStyles();

    // 合并语义化类名和 griffel 类名 - root
    const rootClasses = [
        inputClassNames.root,
        state.appearance !== 'outline' && `appearance-${state.appearance}`,
        state.size !== 'medium' && `size-${state.size}`,
        state.disabled && 'disabled',
        state.error && 'error',
        state.readonly && 'readonly',
        styles.root,
        styles[state.appearance],
        styles[state.size],
        (state.disabled || state.readonly) && styles.disabled,
        state.error && styles.error,
    ].filter(Boolean);

    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses, state.root.className),
    };

    // 合并 input 元素类名
    const inputClasses = [
        inputClassNames.input,
        styles.input,
    ].filter(Boolean);

    state.input = {
        ...state.input,
        className: mergeClasses(...inputClasses, state.input.className),
    };

    // 合并 contentBefore 类名
    if (state.contentBefore) {
        const contentBeforeClasses = [
            inputClassNames.contentBefore,
            styles.contentBefore,
        ].filter(Boolean);

        state.contentBefore = {
            ...state.contentBefore,
            className: mergeClasses(...contentBeforeClasses),
        };
    }

    // 合并 contentAfter 类名
    if (state.contentAfter) {
        const contentAfterClasses = [
            inputClassNames.contentAfter,
            styles.contentAfter,
        ].filter(Boolean);

        state.contentAfter = {
            ...state.contentAfter,
            className: mergeClasses(...contentAfterClasses),
        };
    }

    // 合并 clearButton 类名
    if (state.clearButton) {
        const clearButtonClasses = [
            inputClassNames.clearButton,
            styles.clearButton,
        ].filter(Boolean);

        state.clearButton = {
            ...state.clearButton,
            className: mergeClasses(...clearButtonClasses),
        };
    }

    // 合并 passwordToggleButton 类名
    if (state.passwordToggleButton) {
        const passwordToggleButtonClasses = [
            inputClassNames.passwordToggleButton,
            styles.passwordToggleButton,
        ].filter(Boolean);

        state.passwordToggleButton = {
            ...state.passwordToggleButton,
            className: mergeClasses(...passwordToggleButtonClasses),
        };
    }

    // 合并 progressIndicator 类名
    if (state.progressIndicator) {
        const progressIndicatorClasses = [
            inputClassNames.progressIndicator,
            styles.progressIndicator,
        ].filter(Boolean);

        state.progressIndicator = {
            ...state.progressIndicator,
            className: mergeClasses(...progressIndicatorClasses),
        };
    }

    // 应用验证状态样式
    if (state.validationState !== 'none') {
        if (!state.input.className) {
            state.input.className = '';
        }
        const validationClass = `validation-${state.validationState}`;
        state.input.className = mergeClasses(
            state.input.className,
            styles[state.validationState],
            validationClass
        );
    }
};
