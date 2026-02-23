import { makeStyles } from '@/shared/griffel';

/**
 * Label component Griffel styles
 *
 * Note: Static styles are defined in label.css to avoid Griffel's
 * automatic :focus state generation for color properties.
 *
 * Griffel automatically generates :focus states for color properties
 * to support accessibility, but this causes errors when using CSS variables.
 * Since we have complete CSS coverage, we use empty Griffel styles.
 */
export const useLabelStyles = makeStyles({
    root: {} as any,
    small: {} as any,
    medium: {} as any,
    large: {} as any,
    normal: {} as any,
    semibold: {} as any,
    bold: {} as any,
    disabled: {} as any,
    requiredIndicator: {} as any,
});
