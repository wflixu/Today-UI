import { cn } from '@/shared/styles/classUtils';

export type ButtonAppearance = 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rounded' | 'square' | 'circular';

/**
 * Button 组件的类名常量
 */
export const buttonClassNames = {
  root: 't-button',
  icon: 't-button__icon',
  spinner: 't-button__spinner',
} as const;

/**
 * Button 变体类名映射
 */
export const buttonVariants = {
  appearance: {
    primary: 't-button--primary',
    secondary: '', // 默认，不需要额外类名
    outline: 't-button--outline',
    subtle: 't-button--subtle',
    transparent: 't-button--transparent',
  } satisfies Record<ButtonAppearance, string>,

  size: {
    small: 't-button--small',
    medium: '',
    large: 't-button--large',
  } satisfies Record<ButtonSize, string>,

  shape: {
    rounded: '',
    square: 't-button--square',
    circular: 't-button--circular',
  } satisfies Record<ButtonShape, string>,

  state: {
    disabled: 'disabled',
    loading: 'is-loading',
    iconOnly: 'is-icon-only',
  },
} as const;

/**
 * Button 组件类名 Hook
 * 根据组件 props 生成对应的 BEM 类名
 */
export function useButtonClasses(props: {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
}): string {
  const {
    appearance = 'secondary',
    size = 'medium',
    shape = 'rounded',
    disabled = false,
    loading = false,
    iconOnly = false,
  } = props;

  return cn(
    buttonClassNames.root,

    // Appearance 变体（secondary 是默认值，不需要额外类名）
    appearance !== 'secondary' && buttonVariants.appearance[appearance],

    // Size 变体（medium 是默认值）
    size !== 'medium' && buttonVariants.size[size],

    // Shape 变体（rounded 是默认值）
    shape !== 'rounded' && buttonVariants.shape[shape],

    // 状态类名
    disabled && buttonVariants.state.disabled,
    loading && buttonVariants.state.loading,
    iconOnly && buttonVariants.state.iconOnly
  );
}
