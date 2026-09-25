/**
 * FileTree 组件的类名常量
 * FileTree 组件已使用纯 CSS，此处仅提供类名常量以保持一致性
 */

export const fileTreeClassNames = {
  root: 't-file-tree',
  node: 't-file-tree-node',
  nodeContent: 't-file-tree-node-content',
  nodeToggle: 't-file-tree-node-toggle',
  nodeLoading: 't-file-tree-node-loading',
} as const;

/**
 * FileTree 组件类名 Hook
 * 返回组件的 BEM 类名
 */
export function useFileTreeClasses(): typeof fileTreeClassNames {
  return fileTreeClassNames;
}
