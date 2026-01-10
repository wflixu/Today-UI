/**
 * Button Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Button 样式
 */

import { makeStyles } from '@/shared/griffel';

// 使用类型断言避免 Griffel 严格类型检查
// 这是因为我们使用 CSS 变量，TypeScript 无法正确推断类型
export const useButtonStyles = makeStyles({
  root: {
    // 布局
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inlineFlex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    margin: '0px',
    overflow: 'hidden',

    // 外观
    backgroundColor: 'var(--colorNeutralBackground1)',
    color: 'var(--colorNeutralForeground1)',
    border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
    fontFamily: 'var(--fontFamilyBase)',
    outlineStyle: 'none',

    // 尺寸
    padding: '5px var(--spacingHorizontalM)',
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
    padding: '3px var(--spacingHorizontalS)',
    minWidth: '64px',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
    lineHeight: 'var(--lineHeightBase200)',
  },

  large: {
    padding: '8px var(--spacingHorizontalL)',
    minWidth: '96px',
    fontSize: 'var(--fontSizeBase400)',
    fontWeight: 'var(--fontWeightSemibold)',
    lineHeight: 'var(--lineHeightBase400)',
  },

  // ========== Shape 变体 ==========

  square: {
    borderRadius: 'var(--borderRadiusNone)',
  },

  circular: {
    borderRadius: 'var(--borderRadiusCircular)',
  },

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
  },

  iconLarge: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },

  // 图标位置间距
  iconBefore: {
    marginRight: 'var(--fui-Button-icon-spacing)',
  },

  iconAfter: {
    marginLeft: 'var(--fui-Button-icon-spacing)',
  },

  // ========== Loading 状态 ==========

  loading: {
    position: 'relative',
    cursor: 'wait',
  },

  spinnerWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: 'var(--spacingHorizontalXS)',
  },

  // ========== Primary 焦点样式 ==========

  primaryFocus: {} as any, // 通过 button.css 处理

  // ========== Icon-only 样式优化 ==========

  iconOnlySmall: {
    padding: '1px',
    minWidth: '24px',
    maxWidth: '24px',
  },

  iconOnlyMedium: {
    padding: '5px',
    minWidth: '32px',
    maxWidth: '32px',
  },

  iconOnlyLarge: {
    padding: '7px',
    minWidth: '40px',
    maxWidth: '40px',
  },

  // ========== 带图标时的 padding 调整 ==========

  withIconSmall: {
    paddingBottom: '1px',
    paddingTop: '1px',
  },

  withIconLarge: {
    paddingBottom: '7px',
    paddingTop: '7px',
  },
});
