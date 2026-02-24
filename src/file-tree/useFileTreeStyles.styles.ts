/**
 * FileTree 样式钩子
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */

import type { FileTreeState } from './type';
import { useFileTreeStyles as useGriffelStyles } from './file-tree.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 语义化类名常量
export const fileTreeClassNames = {
  root: 't-file-tree',
  node: 't-file-tree__node',
  nodeActive: 'active',
  nodeContent: 't-file-tree__node-content',
  nodeContentValueWrapper: 't-file-tree__node-content--value-wrapper',
  nodeToggle: 't-file-tree__node-toggle',
  nodeToggleLoading: 'loading',
  nodeTitle: 't-file-tree__node-title',
  nodeHline: 't-file-tree__node-hline',
  nodeVline: 't-file-tree__node-vline',
  mr2: 'mr-2',
} as const;

/**
 * FileTree 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useFileTreeStyles_unstable = (state: FileTreeState) => {
  const styles = useGriffelStyles();

  // FileTree 根元素类名
  const rootClasses = [
    fileTreeClassNames.root,
    styles.root,
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses, state.root.className as string),
  };

  // Node 类名
  if (state.nodes) {
    state.nodes = state.nodes.map((node) => {
      const nodeClasses = [
        fileTreeClassNames.node,
        node.isActive && fileTreeClassNames.nodeActive,
        node.isActive && styles.nodeActive,
        !node.isActive && node.isHovered && styles.nodeHover,
        styles.node,
      ].filter(Boolean);

      return {
        ...node,
        className: mergeClasses(...nodeClasses, node.className as string),
      };
    });
  }
};

/**
 * 向后兼容的样式函数
 */
export const useFileTreeStyles = useFileTreeStyles_unstable;
