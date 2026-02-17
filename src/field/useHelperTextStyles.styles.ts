import { mergeClasses } from '@/shared/griffel/mergeClasses';
import type { HelperTextState } from './HelperText.types';

export const helperTextClassNames = {
    root: 't-helper-text',
} as const;

/**
 * Apply styles to the HelperText state by merging semantic class names with Griffel styles.
 *
 * Style Strategy:
 * - Griffel (helperText.styles.ts): Handles ALL static styles
 *   - Base styles, disabled state, validation states (valid, warning, invalid)
 * - CSS (field.css): Handles ONLY pseudo-classes
 *   - No pseudo-classes needed for HelperText currently
 *
 * This ensures no redundancy and clear separation of concerns.
 */
export const useHelperTextStyles = (state: HelperTextState): void => {
    // Import styles lazily to avoid circular dependencies
    const { useHelperTextStyles } = require('./helperText.styles');
    const styles = useHelperTextStyles();

    // Merge semantic class name with Griffel classes - root
    const rootClasses = [
        helperTextClassNames.root,                       // Semantic class
        styles.root,                                     // Base Griffel styles
        state.disabled && styles.disabled,                // Disabled state from Griffel
        state.validationState !== 'none' && styles[state.validationState], // Validation state from Griffel
    ].filter(Boolean);

    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses, state.root.className),
    };
};
