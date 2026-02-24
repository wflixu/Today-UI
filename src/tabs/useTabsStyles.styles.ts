/**
 * Tabs 样式钩子
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */

import type { TabsState } from './type';
import { useTabsStyles as useGriffelStyles } from './tabs.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 语义化类名常量
export const tabsClassNames = {
  tablist: 't-tablist',
  btnsBox: 'btns-box',
  btn: 'btn',
  btnActive: 'active',
  title: 'title',
  close: 'close',
  tablistTab: 't-tablist-tab',
  tabActive: 't-tab-active',
  tabClose: 'tab-close',
} as const;

/**
 * Tabs 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useTabsStyles_unstable = (state: TabsState) => {
  const styles = useGriffelStyles();

  // Tablist 容器类名
  if (state.tablist) {
    const tablistClasses = [
      tabsClassNames.tablist,
      styles.tablist,
    ].filter(Boolean);

    state.tablist = {
      ...state.tablist,
      className: mergeClasses(...tablistClasses, state.tablist.className as string),
    };
  }

  // 按钮容器类名
  if (state.btnsBox) {
    const btnsBoxClasses = [
      tabsClassNames.btnsBox,
      styles.btnsBox,
    ].filter(Boolean);

    state.btnsBox = {
      ...state.btnsBox,
      className: mergeClasses(...btnsBoxClasses, state.btnsBox.className as string),
    };
  }

  // Tab 按钮类名
  const btnClasses = [
    tabsClassNames.btn,
    state.isActive && tabsClassNames.btnActive,
    state.isActive && styles.btnActive,
    styles.btn,
  ].filter(Boolean);

  state.btn = {
    ...state.btn,
    className: mergeClasses(...btnClasses, state.btn?.className as string),
  };

  // 标题类名
  if (state.title) {
    state.title = {
      ...state.title,
      className: mergeClasses(tabsClassNames.title, styles.title, state.title.className as string),
    };
  }

  // 关闭按钮类名
  if (state.close) {
    state.close = {
      ...state.close,
      className: mergeClasses(tabsClassNames.close, styles.close, state.close.className as string),
    };
  }
};

/**
 * 向后兼容的样式函数
 */
export const useTabsStyles = useTabsStyles_unstable;
