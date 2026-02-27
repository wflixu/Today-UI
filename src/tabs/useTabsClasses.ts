/**
 * Tabs 组件的类名常量
 * Tabs 组件已使用纯 CSS，此处仅提供类名常量以保持一致性
 */

export const tabsClassNames = {
  root: 't-tablist',
  tab: 't-tablist-tab',
  tabActive: 't-tab-active',
  tabClose: 'tab-close',
} as const;

/**
 * Tabs 组件类名 Hook
 * 返回组件的 BEM 类名
 */
export function useTabsClasses(): typeof tabsClassNames {
  return tabsClassNames;
}
