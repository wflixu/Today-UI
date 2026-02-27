/**
 * Dialog 组件的类名常量
 * Dialog 组件已使用纯 CSS，此处仅提供类名常量以保持一致性
 */

export const dialogClassNames = {
  overlay: 't-overlay',
  root: 't-dialog',
  body: 't-dialog-body',
  header: 'header',
  content: 'content',
  actions: 'actions',
} as const;

/**
 * Dialog 组件类名 Hook
 * 返回组件的 BEM 类名
 */
export function useDialogClasses(): typeof dialogClassNames {
  return dialogClassNames;
}
