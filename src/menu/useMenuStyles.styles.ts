/**
 * Menu 样式钩子
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */

import type { MenuState } from './type';
import { useMenuStyles as useGriffelStyles } from './menu.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 语义化类名常量
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
 * Menu 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useMenuStyles_unstable = (state: MenuState) => {
  const styles = useGriffelStyles();

  // Menu 根元素类名
  const rootClasses = [
    menuClassNames.root,
    styles.root,
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses, state.root.className as string),
  };

  // Menu list 类名
  if (state.list) {
    state.list = {
      ...state.list,
      className: mergeClasses(menuClassNames.list, styles.list, state.list.className as string),
    };
  }

  // Menu items 类名
  if (state.items) {
    state.items = state.items.map((item) => {
      const itemClasses = [
        menuClassNames.item,
        item.isHovered && styles.itemHover,
        styles.item,
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
export const useMenuStyles = useMenuStyles_unstable;
