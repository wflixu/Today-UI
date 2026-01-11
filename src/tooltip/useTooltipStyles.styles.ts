/**
 * Tooltip Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Tooltip 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useTooltipStyles = makeStyles({
  root: {
    // 定位
    position: 'absolute',
    zIndex: 1000,
    pointerEvents: 'none',

    // 尺寸
    maxWidth: 'var(--widthTooltipMax)',

    // 外观
    borderRadius: 'var(--borderRadiusMedium)',
    boxShadow: 'var(--shadow8)',

    // 排版
    fontFamily: 'var(--fontFamilyBase)',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
    lineHeight: 'var(--lineHeightBase200)',

    // 颜色
    backgroundColor: 'var(--colorNeutralBackground1)',
    color: 'var(--colorNeutralForeground1)',
    // 边框 - 使用非简写属性
    borderWidth: 'var(--strokeWidthThin)',
    borderStyle: 'solid',
    borderColor: 'var(--colorNeutralStroke1)',

    // 内边距
    padding: '4px 8px',

    // 动画初始状态
    opacity: 0,
    transform: 'scale(0.95)',

    // 文本换行
    wordWrap: 'break-word',
    overflowWrap: 'break-word',

    // 过渡效果 - 使用非简写属性
    transitionDuration: 'var(--durationNormal)',
    transitionTimingFunction: 'var(--curveDecelerateMin)',
    transitionProperty: 'opacity, transform',
  } as any,

  // 可见状态
  visible: {
    opacity: 1,
    transform: 'scale(1)',
  } as any,

  // 箭头样式
  arrow: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--colorNeutralBackground1)',
    // 边框 - 使用非简写属性
    borderWidth: 'var(--strokeWidthThin)',
    borderStyle: 'solid',
    borderColor: 'var(--colorNeutralStroke1)',
    transform: 'rotate(45deg)',
  } as any,

  // relationship: 'label' - 使用品牌色
  relationshipLabel: {
    backgroundColor: 'var(--colorBrandBackground)',
    color: 'var(--colorNeutralForegroundOnBrand)',
    // 透明边框 - 使用非简写属性
    borderWidth: 'var(--strokeWidthThin)',
    borderStyle: 'solid',
    borderColor: 'transparent',
  } as any,

  // relationship: 'inaccessible' - 使用中性背景色
  relationshipInaccessible: {
    backgroundColor: 'var(--colorNeutralBackground3)',
    color: 'var(--colorNeutralForeground2)',
  } as any,
});
