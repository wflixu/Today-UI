export type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * 类型安全的 className 合并工具
 * 类似于 clsx 或 classnames
 *
 * @example
 * cn('t-button', 't-button--primary', true && 'is-disabled') // 't-button t-button--primary is-disabled'
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flat(Infinity as 0)
    .filter(Boolean)
    .join(' ');
}

/**
 * 类型安全的变体类名构建器
 *
 * @example
 * buildVariantClasses('t-button', buttonVariants.appearance, { appearance: 'primary' })
 * // 't-button t-button--primary'
 */
export function buildVariantClasses<T extends Record<string, Record<string, string>>>(
  baseClass: string,
  variantMaps: T,
  props: { [K in keyof T]?: keyof T[K] }
): string {
  const classes: string[] = [baseClass];

  for (const [variantKey, variantMap] of Object.entries(variantMaps)) {
    const value = props[variantKey as keyof typeof props];
    if (value && variantMap[value as string]) {
      classes.push(variantMap[value as string]);
    }
  }

  return classes.join(' ');
}

/**
 * BEM 类名构建器
 *
 * @example
 * bem('t-button', 'icon', 'small') // 't-button__icon t-button__icon--small'
 */
export function bem(block: string, element?: string, modifier?: string): string {
  let className = block;

  if (element) {
    className += `__${element}`;
  }

  if (modifier) {
    className += `--${modifier}`;
  }

  return className;
}
