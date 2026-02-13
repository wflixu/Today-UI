import { makeStyles } from '@/shared/griffel';

export const useInputStyles = makeStyles({
    root: {
        display: 'inline-flex',
        flexDirection: 'column',
        position: 'relative',
    },

    inputWrapper: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
    },

    input: {
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'var(--fontFamilyBase)',
        fontSize: 'var(--fontSizeBase300)',
        lineHeight: 'var(--lineHeightBase300)',
        color: 'var(--colorNeutralForeground1)',
        backgroundColor: 'var(--colorNeutralBackground1)',
        border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
        borderRadius: 'var(--borderRadiusMedium)',
        padding: 'var(--spacingVerticalSN) var(--spacingHorizontalMN)',
        transition: 'all 0.2s ease',
        outline: 'none',
    },

    // 外观变体
    outline: {
        // 默认样式已在 input 中定义
    },

    filled: {
        backgroundColor: 'var(--colorNeutralBackground1)',
        border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
    },

    underlined: {
        border: 'none',
        borderBottom: 'var(--strokeWidthThick) solid var(--colorNeutralStroke1)',
        borderRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 'var(--spacingVerticalS)',
        paddingBottom: 'var(--spacingVerticalXS)',
    },

    'inline-dark': {
        backgroundColor: 'var(--colorNeutralBackground1)',
        border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
        borderRadius: 'var(--borderRadiusMedium)',
    } as any,

    'inline-light': {
        backgroundColor: 'var(--colorNeutralBackground1)',
        border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
        borderRadius: 'var(--borderRadiusMedium)',
    } as any,

    // 尺寸变体
    small: {
        minHeight: '28px',
        fontSize: 'var(--fontSizeBase200)',
        padding: 'var(--spacingVerticalSN) var(--spacingHorizontalS)',
    },

    medium: {
        minHeight: '32px',
        fontSize: 'var(--fontSizeBase300)',
        padding: 'var(--spacingVerticalMN) var(--spacingHorizontalMN)',
    },

    large: {
        minHeight: '40px',
        fontSize: 'var(--fontSizeBase400)',
        padding: 'var(--spacingVerticalMN) var(--spacingHorizontalL)',
    },

    // 状态样式
    disabled: {
        cursor: 'not-allowed',
        color: 'var(--colorNeutralForegroundDisabled)',
        backgroundColor: 'var(--colorNeutralBackgroundDisabled)',
        borderColor: 'var(--colorNeutralStrokeDisabled)',
    },

    error: {
        borderColor: 'var(--colorPaletteRedBorder1)',
    },

    readonly: {
        backgroundColor: 'var(--colorNeutralBackground1)',
        cursor: 'default',
    },

    // 插槽样式
    contentBefore: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 'var(--spacingHorizontalS)',
    },

    contentAfter: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'var(--spacingHorizontalS)',
    },

    // 清除按钮样式
    clearButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 6px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'var(--borderRadiusSmall)',
        color: 'var(--colorNeutralForeground1)',
        transition: 'all 0.2s ease',
        selectors: {
            '&:hover': {
                backgroundColor: 'var(--colorNeutralBackground1Hover)',
                color: 'var(--colorNeutralForeground1Hover)',
            },
            '&:active': {
                transform: 'scale(0.95)',
            },
            '&:disabled': {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    } as any,

    // 密码切换按钮样式
    passwordToggleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 6px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'var(--borderRadiusSmall)',
        color: 'var(--colorNeutralForeground1)',
        transition: 'all 0.2s ease',
        selectors: {
            '&:hover': {
                backgroundColor: 'var(--colorNeutralBackground1Hover)',
                color: 'var(--colorNeutralForeground1Hover)',
            },
            '&:active': {
                transform: 'scale(0.95)',
            },
        },
    } as any,

    // 进度指示器样式
    progressIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '2px',
        backgroundColor: 'var(--colorCompoundBrandBackground1)',
        borderRadius: 'var(--borderRadiusSmall)',
        pointerEvents: 'none',
    } as any,

    // 验证状态样式
    valid: {
        borderColor: 'var(--colorPaletteGreenBorder1)',
        selectors: {
            '&:focus': {
                outlineColor: 'var(--colorPaletteGreenBorder1)',
            },
        },
    } as any,

    warning: {
        borderColor: 'var(--colorPaletteDarkOrangeBorder1)',
        selectors: {
            '&:focus': {
                outlineColor: 'var(--colorPaletteDarkOrangeBorder1)',
            },
        },
    } as any,

    invalid: {
        borderColor: 'var(--colorPaletteRedBorder1)',
        selectors: {
            '&:focus': {
                outlineColor: 'var(--colorPaletteRedBorder1)',
            },
        },
    } as any,
});
