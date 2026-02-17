import { makeStyles } from '@/shared/griffel';

export const useHelperTextStyles = makeStyles({
    root: {
        display: 'block',
        fontSize: 'var(--fontSizeBase200)',
        color: 'var(--colorNeutralForeground2)',
        marginTop: 'var(--spacingVerticalXXS)',
        boxSizing: 'border-box',
    },

    disabled: {
        color: 'var(--colorNeutralForegroundDisabled)',
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
