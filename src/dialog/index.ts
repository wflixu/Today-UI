export { TDialog } from './Dialog';
export { TDialog as default } from './Dialog';

export type { DialogProps, DialogState, DialogSlots, DialogSize } from './Dialog.types';
export { useDialog } from './useDialog';
export { renderDialog } from './renderDialog';
export { dialogClassNames, dialogSizeClasses, useDialogClasses } from './useDialogClasses';

// 此处不 import './style.css' —— 样式统一由 src/style/index.css 引入，避免重复进产物。
