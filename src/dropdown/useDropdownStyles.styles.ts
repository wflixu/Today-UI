/**
 * Dropdown 样式钩子
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */

import type { DropdownState } from './type';
import { useDropdownStyles as useGriffelStyles } from './dropdown.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 语义化类名常量
export const dropdownClassNames = {
  triggerWrap: 't-dropdown-ref trigger-wrap',
  menu: 't-dropdown-menu',
  menuItem: 't-dropdown-menu-item',
} as const;

/**
 * Dropdown 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useDropdownStyles_unstable = (state: DropdownState) => {
  const styles = useGriffelStyles();

  // 触发器容器类名
  if (state.triggerWrap) {
    const triggerWrapClasses = [
      dropdownClassNames.triggerWrap,
      styles.triggerWrap,
      (state.isOpen || state.isHovered) && styles.triggerHover,
    ].filter(Boolean);

    state.triggerWrap = {
      ...state.triggerWrap,
      className: mergeClasses(...triggerWrapClasses, state.triggerWrap.className as string),
    };
  }

  // Dropdown 菜单类名
  if (state.menu) {
    const menuClasses = [
      dropdownClassNames.menu,
      styles.menu,
    ].filter(Boolean);

    state.menu = {
      ...state.menu,
      className: mergeClasses(...menuClasses, state.menu.className as string),
    };
  }

  // 菜单项类名
  if (state.menuItems) {
    state.menuItems = state.menuItems.map((item: any) => {
      const itemClasses = [
        dropdownClassNames.menuItem,
        (item.isHovered || item.isFocused) && styles.menuItemHover,
        item.isNestedOpen && styles.menuItemNestedOpen,
        item.isNestedOpen && item.isFocusInside && styles.menuItemNestedFocusInside,
        styles.menuItem,
      ].filter(Boolean);

      return {
        ...item,
        className: mergeClasses(...itemClasses, item.className as string),
      };
    });
  }
};

/**
 * 向后兼容的样式函数
 */
export const useDropdownStyles = useDropdownStyles_unstable;
