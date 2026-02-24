/**
 * Toast 样式钩子
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */

import type { ToastState } from './type';
import { useToastStyles as useGriffelStyles } from './toast.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 语义化类名常量
export const toastClassNames = {
  provider: 't-toast-provider',
  root: 't-toast',
} as const;

/**
 * Toast 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useToastStyles_unstable = (state: ToastState) => {
  const styles = useGriffelStyles();

  // Provider 容器类名
  if (state.provider) {
    const providerClasses = [
      toastClassNames.provider,
      styles.provider,
    ].filter(Boolean);

    state.provider = {
      ...state.provider,
      className: mergeClasses(...providerClasses, state.provider.className as string),
    };
  }

  // Toast 根元素类名
  const rootClasses = [
    toastClassNames.root,
    styles.root,
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses, state.root.className as string),
  };
};

/**
 * 向后兼容的样式函数
 */
export const useToastStyles = useToastStyles_unstable;
