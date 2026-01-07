/**
 * 合并多个类名，过滤掉空值、undefined、false、null
 * 用于合并语义化类名和 Griffel 生成的原子化类名
 *
 * @param classes - 可变的类名参数
 * @returns 合并后的类名字符串
 *
 * @example
 * ```ts
 * const className = mergeClasses(
 *   't-button',           // 语义化类名
 *   styles.root,          // Griffel 基础样式
 *   isPrimary && styles.primary  // 条件样式
 * );
 * // 结果: "t-button f123abc f456def"
 * ```
 */
export function mergeClasses(
  ...classes: (string | undefined | false | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}
