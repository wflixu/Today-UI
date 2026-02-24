/**
 * Dialog 样式钩子
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */

import type { DialogState } from './type';
import { useDialogStyles as useGriffelStyles } from './dialog.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 语义化类名常量
export const dialogClassNames = {
  root: 't-dialog',
  body: 't-dialog-body',
  header: 'header',
  content: 'content',
  actions: 'actions',
  overlay: 't-overlay',
} as const;

/**
 * Dialog 样式钩子函数
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 */
export const useDialogStyles_unstable = (state: DialogState) => {
  const styles = useGriffelStyles();

  // Dialog 根元素类名
  const rootClasses = [
    dialogClassNames.root,
    styles.root,
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses, state.root.className as string),
  };

  // Dialog body 类名
  if (state.body) {
    state.body = {
      ...state.body,
      className: mergeClasses(dialogClassNames.body, styles.body, state.body.className as string),
    };
  }

  // Header 类名
  if (state.header) {
    state.header = {
      ...state.header,
      className: mergeClasses(dialogClassNames.header, styles.header, state.header.className as string),
    };
  }

  // Content 类名
  if (state.content) {
    state.content = {
      ...state.content,
      className: mergeClasses(dialogClassNames.content, styles.content, state.content.className as string),
    };
  }

  // Actions 类名
  if (state.actions) {
    state.actions = {
      ...state.actions,
      className: mergeClasses(dialogClassNames.actions, styles.actions, state.actions.className as string),
    };
  }

  // Overlay 类名
  if (state.overlay) {
    state.overlay = {
      ...state.overlay,
      className: mergeClasses(dialogClassNames.overlay, styles.overlay, state.overlay.className as string),
    };
  }
};

/**
 * 向后兼容的样式函数
 */
export const useDialogStyles = useDialogStyles_unstable;
