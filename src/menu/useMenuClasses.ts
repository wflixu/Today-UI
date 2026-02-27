/**
 * Menu 组件的类名常量
 * Menu 组件已使用纯 CSS，此处仅提供类名常量以保持一致性
 */

export const menuClassNames = {
  root: 't-menu',
  list: 't-menu-list',
  item: 't-menu-list-item',
  itemIcon: 'icon',
  itemMarker: 'marker',
  itemContent: 'content',
  itemSecondary: 'secondary',
} as const;

/**
 * Menu 组件类名 Hook
 * 返回组件的 BEM 类名
 */
export function useMenuClasses(): typeof menuClassNames {
  return menuClassNames;
}
