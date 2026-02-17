import { mergeClasses } from '@/shared/griffel/mergeClasses';
import type { LabelState } from './Label.types';

export const labelClassNames = {
    root: 't-label',
    requiredIndicator: 't-label__required-indicator',
} as const;

/**
 * Apply styles to the Label state by merging semantic class names with Griffel styles.
 *
 * Style Strategy:
 * - Griffel (label.styles.ts): Handles ALL static styles
 *   - Base styles, size variants, weight variants, disabled state, required indicator
 * - CSS (label.css): Handles ONLY pseudo-classes
 *   - :hover state, :focus-within state
 *
 * This ensures no redundancy and clear separation of concerns.
 */
export const useLabelStyles = (state: LabelState): void => {
    // Import styles lazily to avoid circular dependencies
    const { useLabelStyles } = require('./label.styles');
    const styles = useLabelStyles();

    // Merge semantic class name with Griffel classes - root
    const rootClasses = [
        labelClassNames.root,              // Semantic class for CSS pseudo-class targeting
        styles.root,                       // Base Griffel styles
        styles[state.size],                // Size variant from Griffel
        styles[state.weight],              // Weight variant from Griffel
        state.disabled && styles.disabled, // Disabled state from Griffel
    ].filter(Boolean);

    state.root = {
        ...state.root,
        className: mergeClasses(...rootClasses, state.root.className),
    };

    // Merge required indicator classes
    if (state.requiredIndicator) {
        const requiredIndicatorClasses = [
            labelClassNames.requiredIndicator,  // Semantic class for reference
            styles.requiredIndicator,           // Griffel styles
        ].filter(Boolean);

        state.requiredIndicator = {
            ...state.requiredIndicator,
            className: mergeClasses(...requiredIndicatorClasses),
        };
    }
};
