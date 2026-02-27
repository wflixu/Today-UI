import { cn } from '@/shared/styles/classUtils';

export type SpinnerSize = 'tiny' | 'small' | 'medium' | 'large';

/**
 * Spinner 组件的类名常量
 */
export const spinnerClassNames = {
  root: 't-spinner',
  svg: 't-spinner__svg',
  circle: 't-spinner__circle',
} as const;

/**
 * Spinner 变体类名映射
 */
export const spinnerVariants = {
  size: {
    tiny: 'size-tiny',
    small: 'size-small',
    medium: 'size-medium',
    large: 'size-large',
  } satisfies Record<SpinnerSize, string>,
} as const;

/**
 * Spinner 组件类名 Hook
 * 根据组件 props 生成对应的 BEM 类名
 */
export function useSpinnerClasses(props: {
  size?: SpinnerSize;
}): {
  root: string;
  svg: string;
  circle: string;
} {
  const { size = 'small' } = props;

  return {
    root: cn(spinnerClassNames.root),
    svg: cn(spinnerClassNames.svg, spinnerVariants.size[size]),
    circle: spinnerClassNames.circle,
  };
}
