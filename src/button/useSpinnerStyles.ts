/**
 * Spinner Component Styles
 * 使用 Griffel 定义 Spinner 加载动画样式
 */

import { makeStyles } from '@/shared/griffel';

export const useSpinnerStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  svg: {
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  },

  circle: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '4',
    strokeDasharray: '60',
    strokeDashoffset: '45',
    strokeLinecap: 'round',
  },
});
