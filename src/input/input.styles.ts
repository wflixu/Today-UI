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
        // 使用非简写属性代替 border
        borderWidth: 'var(--strokeWidthThin)',
        borderStyle: 'solid',
        borderColor: 'var(--colorNeutralStroke1)',
        borderRadius: 'var(--borderRadiusMedium)',
        // 使用非简写属性代替 padding
        paddingTop: 'var(--spacingVerticalSN)',
        paddingBottom: 'var(--spacingVerticalSN)',
        paddingLeft: 'var(--spacingHorizontalMN)',
        paddingRight: 'var(--spacingHorizontalMN)',
        transition: 'all 0.2s ease',
        outline: 'none',
    } as any,

    // 外观变体
    outline: {} as any,

    filled: {
        backgroundColor: 'var(--colorNeutralBackground1)',
        borderWidth: 'var(--strokeWidthThin)',
        borderStyle: 'solid',
        borderColor: 'var(--colorNeutralStroke1)',
    } as any,

    underlined: {
        borderWidth: '0px',
        borderBottomWidth: 'var(--strokeWidthThick)',
        borderStyle: 'solid',
        borderBottomColor: 'var(--colorNeutralStroke1)',
        borderRadius: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: 'var(--spacingVerticalS)',
        paddingBottom: 'var(--spacingVerticalXS)',
    } as any,

    'inline-dark': {
        backgroundColor: 'var(--colorNeutralBackground1)',
        borderWidth: 'var(--strokeWidthThin)',
        borderStyle: 'solid',
        borderColor: 'var(--colorNeutralStroke1)',
        borderRadius: 'var(--borderRadiusMedium)',
    } as any,

    'inline-light': {
        backgroundColor: 'var(--colorNeutralBackground1)',
        borderWidth: 'var(--strokeWidthThin)',
        borderStyle: 'solid',
        borderColor: 'var(--colorNeutralStroke1)',
        borderRadius: 'var(--borderRadiusMedium)',
    } as any,

    // 尺寸变体
    small: {
        minHeight: '28px',
        fontSize: 'var(--fontSizeBase200)',
        paddingTop: 'var(--spacingVerticalSN)',
        paddingBottom: 'var(--spacingVerticalSN)',
        paddingLeft: 'var(--spacingHorizontalS)',
        paddingRight: 'var(--spacingHorizontalS)',
    } as any,

    medium: {
        minHeight: '32px',
        fontSize: 'var(--fontSizeBase300)',
        paddingTop: 'var(--spacingVerticalMN)',
        paddingBottom: 'var(--spacingVerticalMN)',
        paddingLeft: 'var(--spacingHorizontalMN)',
        paddingRight: 'var(--spacingHorizontalMN)',
    } as any,

    large: {
        minHeight: '40px',
        fontSize: 'var(--fontSizeBase400)',
        paddingTop: 'var(--spacingVerticalMN)',
        paddingBottom: 'var(--spacingVerticalMN)',
        paddingLeft: 'var(--spacingHorizontalL)',
        paddingRight: 'var(--spacingHorizontalL)',
    } as any,

    // 状态样式
    disabled: {
        cursor: 'not-allowed',
        color: 'var(--colorNeutralForegroundDisabled)',
        backgroundColor: 'var(--colorNeutralBackgroundDisabled)',
        borderColor: 'var(--colorNeutralStrokeDisabled)',
    } as any,

    error: {
        borderColor: 'var(--colorPaletteRedBorder1)',
    } as any,

    readonly: {
        backgroundColor: 'var(--colorNeutralBackground1)',
        cursor: 'default',
    } as any,

    // 插槽样式
    contentBefore: {
        display: 'flex',
        alignItems: 'center',
        // 使用非简写属性代替 margin
        marginRight: 'var(--spacingHorizontalS)',
    } as any,

    contentAfter: {
        display: 'flex',
        alignItems: 'center',
        // 使用非简写属性代替 margin
        marginLeft: 'var(--spacingHorizontalS)',
    } as any,

    // 清除按钮样式
    clearButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '6px',
        paddingRight: '6px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderWidth: '0px',
        borderStyle: 'solid',
        borderRadius: 'var(--borderRadiusSmall)',
        color: 'var(--colorNeutralForeground1)',
        transition: 'all 0.2s ease',
    } as any,

    // 密码切换按钮样式
    passwordToggleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '6px',
        paddingRight: '6px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderWidth: '0px',
        borderStyle: 'solid',
        borderRadius: 'var(--borderRadiusSmall)',
        color: 'var(--colorNeutralForeground1)',
        transition: 'all 0.2s ease',
    } as any,

    // 进度指示器样式
    progressIndicator: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        height: '2px',
        backgroundColor: 'var(--colorCompoundBrandBackground1)',
        borderRadius: 'var(--borderRadiusSmall)',
        pointerEvents: 'none',
    } as any,

    // 验证状态样式
    valid: {
        borderColor: 'var(--colorPaletteGreenBorder1)',
    } as any,

    warning: {
        borderColor: 'var(--colorPaletteDarkOrangeBorder1)',
    } as any,

    invalid: {
        borderColor: 'var(--colorPaletteRedBorder1)',
    } as any,
});
