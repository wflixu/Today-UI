/**
 * Button Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Button 样式
 */

import { makeStyles } from '@/shared/griffel';

// 使用非简写属性避免 Griffel 警告
export const useButtonStyles = makeStyles({
  root: {
    // 布局
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inlineFlex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    // 使用非简写属性代替 margin
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    overflow: 'hidden',

    // 外观
    backgroundColor: 'var(--colorNeutralBackground1)',
    color: 'var(--colorNeutralForeground1)',
    // 使用非简写属性代替 border
    borderWidth: 'var(--strokeWidthThin)',
    borderStyle: 'solid',
    borderColor: 'var(--colorNeutralStroke1)',
    fontFamily: 'var(--fontFamilyBase)',
    outlineStyle: 'none',

    // 尺寸 - 使用非简写属性代替 padding
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: 'var(--spacingHorizontalM)',
    paddingRight: 'var(--spacingHorizontalM)',
    minWidth: '96px',
    borderRadius: 'var(--borderRadiusMedium)',

    // 排版
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: 'var(--fontWeightSemibold)',
    lineHeight: 'var(--lineHeightBase300)',

    // 动画
    transitionDuration: 'var(--durationFaster)',
    transitionProperty: 'background, border, color, boxShadow',

    // Hover/Active/Focus 状态通过 button.css 处理
  } as any,

  // ========== Appearance 变体 ==========

  primary: {
    backgroundColor: 'var(--colorBrandBackground)',
    color: 'var(--colorNeutralForegroundOnBrand)',
    borderColor: 'transparent',
    boxShadow: 'var(--colorNeutralShadowKey) 0px 2px 4px',
  } as any,

  outline: {
    backgroundColor: 'var(--colorTransparentBackground)',
    borderColor: 'var(--colorNeutralStrokeAccessible)',
    color: 'var(--colorNeutralForeground1)',
  } as any,

  subtle: {
    backgroundColor: 'var(--colorTransparentBackground)',
    borderColor: 'transparent',
    color: 'var(--colorNeutralForeground2)',
  } as any,

  transparent: {
    backgroundColor: 'var(--colorTransparentBackground)',
    borderColor: 'transparent',
    color: 'var(--colorNeutralForeground2)',
  } as any,

  // ========== Size 变体 ==========

  small: {
    // 使用非简写属性代替 padding
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: 'var(--spacingHorizontalS)',
    paddingRight: 'var(--spacingHorizontalS)',
    minWidth: '64px',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
    lineHeight: 'var(--lineHeightBase200)',
  } as any,

  large: {
    // 使用非简写属性代替 padding
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: 'var(--spacingHorizontalL)',
    paddingRight: 'var(--spacingHorizontalL)',
    minWidth: '96px',
    fontSize: 'var(--fontSizeBase400)',
    fontWeight: 'var(--fontWeightSemibold)',
    lineHeight: 'var(--lineHeightBase400)',
  } as any,

  // ========== Shape 变体 ==========

  square: {
    borderRadius: 'var(--borderRadiusNone)',
  } as any,

  circular: {
    borderRadius: 'var(--borderRadiusCircular)',
  } as any,

  // ========== Disabled 状态 ==========

  disabled: {
    backgroundColor: 'var(--colorNeutralBackgroundDisabled)',
    color: 'var(--colorNeutralForegroundDisabled)',
    borderColor: 'var(--colorNeutralStrokeDisabled)',
    cursor: 'not-allowed',
  } as any,

  // ========== Icon 样式 ==========

  icon: {
    display: 'inlineFlex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    height: '20px',
    width: '20px',
    flexShrink: 0,
    // CSS 变量用于图标间距
    '--fui-Button-icon-spacing': 'var(--spacingHorizontalSNudge)',
  },

  // 图标尺寸变体
  iconSmall: {
    fontSize: '16px',
    height: '16px',
    width: '16px',
  } as any,

  iconLarge: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  } as any,

  // 图标位置间距 - 使用非简写属性代替 margin
  iconBefore: {
    marginRight: 'var(--fui-Button-icon-spacing)',
  } as any,

  iconAfter: {
    marginLeft: 'var(--fui-Button-icon-spacing)',
  } as any,

  // ========== Loading 状态 ==========

  loading: {
    position: 'relative',
    cursor: 'wait',
  } as any,

  spinnerWrapper: {
    display: 'inlineFlex',
    alignItems: 'center',
    // 使用非简写属性代替 margin
    marginRight: 'var(--spacingHorizontalXS)',
  } as any,

  // ========== Primary 焦点样式 ==========

  primaryFocus: {} as any, // 通过 button.css 处理

  // ========== Icon-only 样式优化 ==========

  iconOnlySmall: {
    // 使用非简写属性代替 padding
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingLeft: '1px',
    paddingRight: '1px',
    minWidth: '24px',
    maxWidth: '24px',
  } as any,

  iconOnlyMedium: {
    // 使用非简写属性代替 padding
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    minWidth: '32px',
    maxWidth: '32px',
  } as any,

  iconOnlyLarge: {
    // 使用非简写属性代替 padding
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingLeft: '7px',
    paddingRight: '7px',
    minWidth: '40px',
    maxWidth: '40px',
  } as any,

  // ========== 带图标时的 padding 调整 ==========

  withIconSmall: {
    paddingBottom: '1px',
    paddingTop: '1px',
  } as any,

  withIconLarge: {
    paddingBottom: '7px',
    paddingTop: '7px',
  } as any,
});
