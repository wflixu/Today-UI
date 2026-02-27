import { cn } from '@/shared/styles/classUtils';

export type FieldOrientation = 'horizontal' | 'vertical';
export type FieldValidationState = 'none' | 'valid' | 'warning' | 'invalid';

/**
 * Field 组件的类名常量
 */
export const fieldClassNames = {
  root: 't-field',
  content: 't-field__content',
  validationMessage: 't-field__validation-message',
} as const;

/**
 * Field 变体类名映射
 */
export const fieldVariants = {
  orientation: {
    horizontal: 'orientation-horizontal',
    vertical: 'orientation-vertical',
  } satisfies Record<FieldOrientation, string>,
  validationState: {
    none: '',
    valid: 'validation-valid',
    warning: 'validation-warning',
    invalid: 'validation-invalid',
  } satisfies Record<FieldValidationState, string>,
} as const;

/**
 * Field 组件类名 Hook
 */
export function useFieldClasses(props: {
  orientation?: FieldOrientation;
  validationState?: FieldValidationState;
}): {
  root: string;
  content: string;
  validationMessage?: string;
} {
  const { orientation = 'horizontal', validationState = 'none' } = props;

  return {
    root: cn(
      fieldClassNames.root,
      fieldVariants.orientation[orientation]
    ),
    content: fieldClassNames.content,
    validationMessage: validationState !== 'none'
      ? cn(
          fieldClassNames.validationMessage,
          fieldVariants.validationState[validationState]
        )
      : undefined,
  };
}
