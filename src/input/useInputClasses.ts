import { cn } from '@/shared/styles/classUtils';

export type InputAppearance = 'outline' | 'filled' | 'underlined' | 'inline-dark' | 'inline-light';
export type InputSize = 'small' | 'medium' | 'large';
export type InputValidationState = 'none' | 'valid' | 'warning' | 'invalid';

/**
 * Input 组件的类名常量
 */
export const inputClassNames = {
  root: 't-input',
  inputWrapper: 't-input__input-wrapper',
  input: 't-input__input',
  contentBefore: 't-input__content-before',
  contentAfter: 't-input__content-after',
  clearButton: 't-input__clear-button',
  passwordToggleButton: 't-input__password-toggle',
  progressIndicator: 't-input__progress-indicator',
} as const;

/**
 * Input 变体类名映射
 */
export const inputVariants = {
  appearance: {
    outline: '',
    filled: 't-input--filled',
    underlined: 't-input--underlined',
    'inline-dark': 't-input--inline-dark',
    'inline-light': 't-input--inline-light',
  } satisfies Record<InputAppearance, string>,

  size: {
    small: 't-input--small',
    medium: '',
    large: 't-input--large',
  } satisfies Record<InputSize, string>,

  validationState: {
    none: '',
    valid: 'validation-valid',
    warning: 'validation-warning',
    invalid: 'validation-invalid',
  } satisfies Record<InputValidationState, string>,

  state: {
    disabled: 'disabled',
    error: 'error',
    readonly: 'readonly',
  },
} as const;

/**
 * Input 组件类名 Hook
 * 根据组件 state 生成对应的 BEM 类名
 */
export function useInputClasses(state: {
  appearance?: InputAppearance;
  size?: InputSize;
  disabled?: boolean;
  error?: boolean;
  readonly?: boolean;
  validationState?: InputValidationState;
}): {
  root: string;
  inputWrapper: string;
  input: string;
  contentBefore?: string;
  contentAfter?: string;
  clearButton?: string;
  passwordToggleButton?: string;
  progressIndicator?: string;
} {
  const {
    appearance = 'outline',
    size = 'medium',
    disabled = false,
    error = false,
    readonly = false,
    validationState = 'none',
  } = state;

  return {
    root: cn(inputClassNames.root),
    inputWrapper: cn(
      inputClassNames.inputWrapper,
      appearance !== 'outline' && inputVariants.appearance[appearance],
      size !== 'medium' && inputVariants.size[size],
      disabled && inputVariants.state.disabled,
      error && inputVariants.state.error,
      readonly && inputVariants.state.readonly,
      validationState !== 'none' && inputVariants.validationState[validationState]
    ),
    input: inputClassNames.input,
    contentBefore: inputClassNames.contentBefore,
    contentAfter: inputClassNames.contentAfter,
    clearButton: inputClassNames.clearButton,
    passwordToggleButton: inputClassNames.passwordToggleButton,
    progressIndicator: inputClassNames.progressIndicator,
  };
}
