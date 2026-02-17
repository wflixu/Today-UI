import { makeStyles } from '@/shared/griffel';

export const useLabelStyles = makeStyles({
    root: {
        display: 'inline-block',
        fontSize: 'var(--fontSizeBase300)',
        fontWeight: 'var(--fontWeightSemibold)',
        color: 'var(--colorNeutralForeground1)',
        marginBottom: 'var(--spacingVerticalXXS)',
        boxSizing: 'border-box',
    },

    // 尺寸变体
    small: {
        fontSize: 'var(--fontSizeBase200)',
    },

    medium: {
        fontSize: 'var(--fontSizeBase300)',
    },

    large: {
        fontSize: 'var(--fontSizeBase400)',
    },

    // 字体粗细
    normal: {
        fontWeight: 'var(--fontWeightNormal)',
    },

    semibold: {
        fontWeight: 'var(--fontWeightSemibold)',
    },

    bold: {
        fontWeight: 'var(--fontWeightBold)',
    },

    // 状态
    disabled: {
        color: 'var(--colorNeutralForegroundDisabled)',
        cursor: 'not-allowed',
    },

    // 必填标识
    requiredIndicator: {
        color: 'var(--colorPaletteRedBorder1)',
        marginLeft: 'var(--spacingHorizontalXS)',
    },
});
