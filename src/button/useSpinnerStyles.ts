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
    animationName: 'spin',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
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
