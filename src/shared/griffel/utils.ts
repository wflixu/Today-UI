/**
 * Griffel Vue 工具函数
 * 用于处理 CSS 简写属性转换等常见任务
 *
 * 注意：griffel-vue 不支持简写属性（margin、padding、border、gap 等）
 * 这些辅助函数用于自动展开简写属性为非简写形式
 */

/**
 * 展开 margin 简写属性
 * @param value - margin 值，格式：'8px' | '8px 12px' | '8px 12px 4px' | '8px 12px 4px 12px'
 * @returns 展开后的 margin 对象
 *
 * @example
 * expandMargin('8px') // { marginTop: '8px', marginBottom: '8px', marginLeft: '8px', marginRight: '8px' }
 * expandMargin('8px 12px') // { marginTop: '8px', marginBottom: '8px', marginLeft: '12px', marginRight: '12px' }
 * expandMargin('8px 12px 4px') // { marginTop: '8px', marginLeft: '12px', marginRight: '12px', marginBottom: '4px' }
 * expandMargin('8px 12px 4px 8px') // { marginTop: '8px', marginRight: '12px', marginBottom: '4px', marginLeft: '8px' }
 */
export function expandMargin(
  value: string
): {
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
} {
  const values = value.trim().split(/\s+/).map((v) => v.trim());

  switch (values.length) {
    case 1:
      return {
        marginTop: values[0],
        marginBottom: values[0],
        marginLeft: values[0],
        marginRight: values[0],
      };
    case 2:
      return {
        marginTop: values[0],
        marginBottom: values[0],
        marginLeft: values[1],
        marginRight: values[1],
      };
    case 3:
      return {
        marginTop: values[0],
        marginLeft: values[1],
        marginRight: values[1],
        marginBottom: values[2],
      };
    case 4:
      return {
        marginTop: values[0],
        marginRight: values[1],
        marginBottom: values[2],
        marginLeft: values[3],
      };
    default:
      throw new Error(`Invalid margin value: ${value}`);
  }
}

/**
 * 展开 padding 简写属性
 * @param value - padding 值，格式同 margin
 * @returns 展开后的 padding 对象
 *
 * @example
 * expandPadding('12px') // { paddingTop: '12px', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px' }
 * expandPadding('8px 12px') // { paddingTop: '8px', paddingBottom: '8px', paddingLeft: '12px', paddingRight: '12px' }
 */
export function expandPadding(
  value: string
): {
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
} {
  const values = value.trim().split(/\s+/).map((v) => v.trim());

  switch (values.length) {
    case 1:
      return {
        paddingTop: values[0],
        paddingBottom: values[0],
        paddingLeft: values[0],
        paddingRight: values[0],
      };
    case 2:
      return {
        paddingTop: values[0],
        paddingBottom: values[0],
        paddingLeft: values[1],
        paddingRight: values[1],
      };
    case 3:
      return {
        paddingTop: values[0],
        paddingLeft: values[1],
        paddingRight: values[1],
        paddingBottom: values[2],
      };
    case 4:
      return {
        paddingTop: values[0],
        paddingRight: values[1],
        paddingBottom: values[2],
        paddingLeft: values[3],
      };
    default:
      throw new Error(`Invalid padding value: ${value}`);
  }
}

/**
 * 展开边框简写属性
 * @param value - border 值，格式：'1px solid #ccc' 或 '1px solid var(--colorNeutralStroke1)'
 * @returns 展开后的 border 对象
 *
 * @example
 * expandBorder('1px solid #ccc')
 * // { borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc' }
 */
export function expandBorder(value: string): {
  borderWidth: string;
  borderStyle: string;
  borderColor: string;
} {
  const parts = value.trim().split(/\s+/);
  if (parts.length < 2) {
    throw new Error(`Invalid border value: ${value}. Expected format: 'width style color'`);
  }

  return {
    borderWidth: parts[0],
    borderStyle: parts[1],
    borderColor: parts.slice(2).join(' '),
  };
}

/**
 * 展开 gap 简写属性
 * @param value - gap 值，格式：'8px' 或 '8px 12px'
 * @returns 展开后的 gap 对象
 *
 * @example
 * expandGap('8px') // { rowGap: '8px', columnGap: '8px' }
 * expandGap('8px 12px') // { rowGap: '8px', columnGap: '12px' }
 */
export function expandGap(value: string): {
  rowGap: string;
  columnGap: string;
} {
  const values = value.trim().split(/\s+/).map((v) => v.trim());

  if (values.length === 1) {
    return {
      rowGap: values[0],
      columnGap: values[0],
    };
  }

  if (values.length === 2) {
    return {
      rowGap: values[0],
      columnGap: values[1],
    };
  }

  throw new Error(`Invalid gap value: ${value}`);
}

/**
 * 展开所有四个方向的边框（用于单独设置某边边框）
 * @param value - border 值，格式：'1px solid #ccc'
 * @returns 展开后的 border 对象（带方向）
 *
 * @example
 * expandBorderDirection('1px solid var(--colorNeutralStroke1)', 'top')
 * // { borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'var(--colorNeutralStroke1)' }
 */
export function expandBorderDirection(
  value: string,
  direction: 'top' | 'right' | 'bottom' | 'left'
): Record<string, string> {
  const parts = value.trim().split(/\s+/);
  if (parts.length < 2) {
    throw new Error(`Invalid border value: ${value}`);
  }

  const prefix = `border${direction.charAt(0).toUpperCase() + direction.slice(1)}`;

  return {
    [`${prefix}Width`]: parts[0],
    [`${prefix}Style`]: parts[1],
    [`${prefix}Color`]: parts.slice(2).join(' '),
  };
}

/**
 * 展开圆角简写属性
 * @param value - border-radius 值，格式：'4px' 或 '4px 8px' 或 '4px 8px 4px 8px'
 * @returns 展开后的 border-radius 对象
 *
 * @example
 * expandBorderRadius('4px') // { borderTopLeftRadius: '4px', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', borderBottomLeftRadius: '4px' }
 */
export function expandBorderRadius(value: string): {
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderBottomRightRadius: string;
  borderBottomLeftRadius: string;
} {
  const values = value.trim().split(/\s+/).map((v) => v.trim());

  switch (values.length) {
    case 1:
      return {
        borderTopLeftRadius: values[0],
        borderTopRightRadius: values[0],
        borderBottomRightRadius: values[0],
        borderBottomLeftRadius: values[0],
      };
    case 2:
      return {
        borderTopLeftRadius: values[0],
        borderTopRightRadius: values[1],
        borderBottomRightRadius: values[0],
        borderBottomLeftRadius: values[1],
      };
    case 3:
      return {
        borderTopLeftRadius: values[0],
        borderTopRightRadius: values[1],
        borderBottomRightRadius: values[2],
        borderBottomLeftRadius: values[1],
      };
    case 4:
      return {
        borderTopLeftRadius: values[0],
        borderTopRightRadius: values[1],
        borderBottomRightRadius: values[2],
        borderBottomLeftRadius: values[3],
      };
    default:
      throw new Error(`Invalid border-radius value: ${value}`);
  }
}
