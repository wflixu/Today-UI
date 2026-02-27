/**
 * Dropdown 组件的类名常量
 * Dropdown 组件已使用纯 CSS，此处仅提供类名常量以保持一致性
 */

export const dropdownClassNames = {
  triggerWrap: 't-dropdown-ref trigger-wrap',
  menu: 't-dropdown-menu',
  menuItem: 't-dropdown-menu-item',
} as const;

/**
 * Dropdown 组件类名 Hook
 * 返回组件的 BEM 类名
 */
export function useDropdownClasses(): typeof dropdownClassNames {
  return dropdownClassNames;
}
