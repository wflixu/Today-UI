import { makeStyles } from '@/shared/griffel';

export const useFieldStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacingVerticalS)',
        boxSizing: 'border-box',
    },

    // Orientation variants
    vertical: {
        flexDirection: 'column',
    },

    horizontal: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 'var(--spacingHorizontalM)',
    },

    // Content wrapper
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },

    // Validation message styles
    validationMessage: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacingHorizontalXS)',
        fontSize: 'var(--fontSizeBase200)',
        marginTop: 'var(--spacingVerticalXXS)',
    },

    valid: {
        color: 'var(--colorPaletteGreenForeground1)',
    },

    warning: {
        color: 'var(--colorPaletteDarkOrangeForeground1)',
    },

    invalid: {
        color: 'var(--colorPaletteRedForeground1)',
    },
});
