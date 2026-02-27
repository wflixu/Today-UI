import { cn } from '@/shared/styles/classUtils';

/**
 * Toast 组件的类名常量
 */
export const toastClassNames = {
  provider: 't-toast-provider',
  root: 't-toast',
} as const;

/**
 * Toast 组件类名 Hook
 * 根据组件 state 生成对应的 BEM 类名
 */
export function useToastClasses(state: {
  provider?: any;
  root?: any;
}): {
  provider?: string;
  root: string;
} {
  return {
    provider: toastClassNames.provider,
    root: cn(toastClassNames.root),
  };
}
