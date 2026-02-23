import type { GriffelStyle } from 'griffel-vue';

/**
 * 将 selectors 对象展开为嵌套选择器属性
 * 这是因为 @griffel/core 不支持 selectors 属性，只支持直接使用嵌套选择器
 *
 * @example
 * ```ts
 * // 输入（不支持的语法）
 * {
 *   root: {
 *     backgroundColor: 'red',
 *     selectors: {
 *       '&:hover': { backgroundColor: 'blue' }
 *     }
 *   }
 * }
 *
 * // 输出（@griffel/core 支持的语法）
 * {
 *   root: {
 *     backgroundColor: 'red',
 *     '&:hover': { backgroundColor: 'blue' }
 *   }
 * }
 * ```
 */
export function withSelectors<T extends Record<string, GriffelStyle>>(
  styles: T
): T {
  const result: Record<string, GriffelStyle> = {};

  for (const [key, value] of Object.entries(styles)) {
    const style = value as any;

    if (style && typeof style === 'object' && 'selectors' in style) {
      // 展开 selectors 对象
      const { selectors, ...baseStyles } = style;
      result[key] = {
        ...baseStyles,
        ...selectors,
      };
    } else {
      result[key] = style;
    }
  }

  return result as T;
}
