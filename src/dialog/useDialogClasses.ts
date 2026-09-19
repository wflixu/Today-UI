import { cn } from '../shared/styles/classUtils';
import type { DialogSize } from './Dialog.types';

/**
 * Dialog 组件的类名常量
 */
export const dialogClassNames = {
  overlay: 't-overlay',
  root: 't-dialog',
  body: 't-dialog-body',
  header: 't-dialog__header',
  content: 't-dialog__content',
  actions: 't-dialog__actions',
} as const;

/**
 * 尺寸类名。medium 是默认值，不产生额外类名。
 */
export const dialogSizeClasses: Record<DialogSize, string> = {
  small: 't-dialog--small',
  medium: '',
  large: 't-dialog--large',
};

export interface UseDialogClassesOptions {
  size?: DialogSize;
}

export interface DialogClasses {
  overlay: string;
  root: string;
  body: string;
  header: string;
  content: string;
  actions: string;
}

/**
 * Dialog 组件类名 Hook。
 *
 * 迁移前这个文件定义了常量但组件从未调用，类名在 JSX 里硬编码 ——
 * 同一套类名维护两份，改一处必然漏另一处。现在组件真正使用它。
 */
export function useDialogClasses(options: UseDialogClassesOptions = {}): DialogClasses {
  const { size = 'medium' } = options;

  return {
    overlay: dialogClassNames.overlay,
    // medium 是默认值，不产类名
    root: cn(dialogClassNames.root, size !== 'medium' && dialogSizeClasses[size]),
    body: dialogClassNames.body,
    header: dialogClassNames.header,
    content: dialogClassNames.content,
    actions: dialogClassNames.actions,
  };
}
