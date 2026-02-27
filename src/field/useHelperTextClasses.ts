import { cn } from '@/shared/styles/classUtils';

export type HelperTextValidationState = 'none' | 'valid' | 'warning' | 'invalid';

/**
 * HelperText 组件的类名常量
 */
export const helperTextClassNames = {
  root: 't-helper-text',
} as const;

/**
 * HelperText 变体类名映射
 */
export const helperTextVariants = {
  validationState: {
    none: '',
    valid: 'validation-valid',
    warning: 'validation-warning',
    invalid: 'validation-invalid',
  } satisfies Record<HelperTextValidationState, string>,

  state: {
    disabled: 'disabled',
  },
} as const;

/**
 * HelperText 组件类名 Hook
 * 根据组件 state 生成对应的 BEM 类名
 */
export function useHelperTextClasses(state: {
  disabled?: boolean;
  validationState?: HelperTextValidationState;
}): string {
  const { disabled = false, validationState = 'none' } = state;

  return cn(
    helperTextClassNames.root,
    disabled && helperTextVariants.state.disabled,
    validationState !== 'none' && helperTextVariants.validationState[validationState]
  );
}
