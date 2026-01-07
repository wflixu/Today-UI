/**
 * Button Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Button 样式
 */

import { makeStyles } from '@/shared/griffel';

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

    // Hover 状态
    ':hover': {
      backgroundColor: 'var(--colorNeutralBackground1Hover)',
      borderColor: 'var(--colorNeutralStroke1Hover)',
      color: 'var(--colorNeutralForeground1Hover)',
      cursor: 'pointer',
    },

    // Active 状态
    ':active': {
      backgroundColor: 'var(--colorNeutralBackground1Pressed)',
      borderColor: 'var(--colorNeutralStroke1Pressed)',
      color: 'var(--colorNeutralForeground1Pressed)',
    },

    // Focus 状态
    ':focus-visible': {
      outline: 'var(--strokeWidthThick) solid var(--colorStrokeFocus2)',
      outlineOffset: '-2px',
    },
  },

  // ========== Appearance 变体 ==========

  primary: {
    backgroundColor: 'var(--colorBrandBackground)',
    color: 'var(--colorNeutralForegroundOnBrand)',
    borderColor: 'transparent',
    boxShadow: 'var(--colorNeutralShadowKey) 0px 2px 4px',

    ':hover': {
      backgroundColor: 'var(--colorBrandBackgroundHover)',
      color: 'var(--colorNeutralForegroundOnBrand)',
      boxShadow: 'var(--colorNeutralShadowKey) 0px 4px 8px',
    },

    ':active': {
      backgroundColor: 'var(--colorBrandBackgroundPressed)',
      color: 'var(--colorNeutralForegroundOnBrand)',
      boxShadow: 'var(--colorNeutralShadowKey) 0px 1px 2px',
    },
  },

  outline: {
    backgroundColor: 'var(--colorTransparentBackground)',
    borderColor: 'var(--colorNeutralStrokeAccessible)',
    color: 'var(--colorNeutralForeground1)',

    ':hover': {
      backgroundColor: 'var(--colorNeutralBackground1)',
      borderColor: 'var(--colorNeutralStrokeAccessibleHover)',
      color: 'var(--colorNeutralForeground1)',
    },

    ':active': {
      backgroundColor: 'var(--colorNeutralBackground1Pressed)',
      borderColor: 'var(--colorNeutralStrokeAccessiblePressed)',
      color: 'var(--colorNeutralForeground1)',
    },
  },

  subtle: {
    backgroundColor: 'var(--colorTransparentBackground)',
    borderColor: 'transparent',
    color: 'var(--colorNeutralForeground2)',

    ':hover': {
      backgroundColor: 'var(--colorNeutralBackground1Hover)',
      borderColor: 'transparent',
      color: 'var(--colorNeutralForeground2Hover)',
    },

    ':active': {
      backgroundColor: 'var(--colorNeutralBackground1Pressed)',
      borderColor: 'transparent',
      color: 'var(--colorNeutralForeground2Pressed)',
    },
  },

  transparent: {
    backgroundColor: 'var(--colorTransparentBackground)',
    borderColor: 'transparent',
    color: 'var(--colorNeutralForeground2)',

    ':hover': {
      backgroundColor: 'var(--colorTransparentBackgroundHover)',
      borderColor: 'transparent',
      color: 'var(--colorNeutralForeground2BrandHover)',
    },

    ':active': {
      backgroundColor: 'var(--colorTransparentBackgroundPressed)',
      borderColor: 'transparent',
      color: 'var(--colorNeutralForeground2BrandPressed)',
    },
  },

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

    ':hover': {
      cursor: 'not-allowed',
    },
  },

  // ========== Icon 样式 ==========

  icon: {
    display: 'inlineFlex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    height: '20px',
    width: '20px',
    flexShrink: 0,
  },
});
