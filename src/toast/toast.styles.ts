/**
 * Toast Component Styles (Griffel)
 * 使用 griffel-vue 的 CSS-in-JS 方案定义 Toast 样式
 */

import { makeStyles } from '@/shared/griffel';

export const useToastStyles = makeStyles({
  // ========== Toast Provider 容器 ==========
  provider: {
    position: 'fixed',
    width: '292px',
    pointerEvents: 'none',
    bottom: '16px',
    right: '20px',
  } as any,

  // ========== Toast 根元素 ==========
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
    borderRadius: 'var(--borderRadiusMedium)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--colorTransparentStroke)',
    boxShadow: 'var(--shadow8)',
    fontSize: 'var(--fontSizeBase300)',
    lineHeight: '20px',
    fontWeight: 'var(--fontWeightSemibold)',
    color: 'var(--colorNeutralForeground1)',
    backgroundColor: 'var(--colorNeutralBackground1)',
  } as any,

  // ========== Toast 变体 ==========
  // 可以根据需要添加不同类型的 Toast 样式
  // success, error, warning, info 等
} as const);
