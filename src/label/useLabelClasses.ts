import { cn } from '@/shared/styles/classUtils';

export type LabelSize = 'small' | 'medium' | 'large';
export type LabelWeight = 'normal' | 'semibold' | 'bold';

/**
 * Label 组件的类名常量
 */
export const labelClassNames = {
  root: 't-label',
  requiredIndicator: 't-label__required-indicator',
} as const;

/**
 * Label 变体类名映射
 */
export const labelVariants = {
  size: {
    small: 'size-small',
    medium: '',
    large: 'size-large',
  } satisfies Record<LabelSize, string>,
  weight: {
    normal: 'weight-normal',
    semibold: '',
    bold: 'weight-bold',
  } satisfies Record<LabelWeight, string>,
  state: {
    disabled: 'disabled',
  },
} as const;

/**
 * Label 组件类名 Hook
 * 根据组件 props 生成对应的 BEM 类名
 */
export function useLabelClasses(props: {
  size?: LabelSize;
  weight?: LabelWeight;
  disabled?: boolean;
}): string {
  const { size = 'medium', weight = 'semibold', disabled = false } = props;

  return cn(
    labelClassNames.root,
    size !== 'medium' && labelVariants.size[size],
    weight !== 'semibold' && labelVariants.weight[weight],
    disabled && labelVariants.state.disabled
  );
}
