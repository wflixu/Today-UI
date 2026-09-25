/**
 * Toast 样式钩子
 * 使用纯 CSS 类名，保留语义化 BEM 命名
 */

import type { ToastState } from './type';
import { cn } from '@/shared/styles/classUtils';

// 语义化类名常量
export const toastClassNames = {
  provider: 't-toast-provider',
  root: 't-toast',
} as const;

/**
 * Toast 样式钩子函数
 * 使用纯 CSS 类名
 */
export const useToastStyles_unstable = (state: ToastState) => {
  // Provider 容器类名
  if (state.provider) {
    state.provider = {
      ...state.provider,
      className: cn(toastClassNames.provider, state.provider.className as string),
    };
  }

  // Toast 根元素类名
  state.root = {
    ...state.root,
    className: cn(toastClassNames.root, state.root.className as string),
  };
};

/**
 * 向后兼容的样式函数
 */
export const useToastStyles = useToastStyles_unstable;
