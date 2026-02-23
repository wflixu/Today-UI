import { mergeClasses } from '@/shared/griffel/mergeClasses';
import type { FieldState } from './Field.types';
import { useFieldStyles as useGriffelStyles } from './field.styles';

export const fieldClassNames = {
    root: 't-field',
    content: 't-field__content',
    validationMessage: 't-field__validation-message',
} as const;

/**
 * Apply styles to the Field state by merging semantic class names with griffel styles.
 */
export const useFieldStyles = (state: FieldState) => {
    // Get Griffel styles
    const styles = useGriffelStyles();

    // 合并 root 类名
    const rootClasses = [
        fieldClassNames.root,
        state.orientation !== 'vertical' && `orientation-${state.orientation}`,
        styles.root,
        styles[state.orientation],
    ].filter(Boolean);

    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses, state.root.className),
    };

    // 合并 content 类名
    const contentClasses = [
        fieldClassNames.content,
        styles.content,
    ].filter(Boolean);

    state.content = {
        ...state.content,
        className: mergeClasses(...contentClasses, state.content.className),
    };

    // 合并 validationMessage 类名
    if (state.validationMessage) {
        const validationMessageClasses = [
            fieldClassNames.validationMessage,
            state.validationState !== 'none' && `validation-${state.validationState}`,
            styles.validationMessage,
            state.validationState !== 'none' && styles[state.validationState],
        ].filter(Boolean);

        state.validationMessageProps = {
            ...state.validationMessageProps,
            className: mergeClasses(...validationMessageClasses, state.validationMessageProps?.className),
        };
    }
};
