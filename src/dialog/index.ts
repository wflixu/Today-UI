import { withInstall, type WithInstallType } from '../shared/withInstall';
import _Dialog from './Dialog';

export const Dialog: WithInstallType<typeof _Dialog> = withInstall(_Dialog);
export default Dialog;

// 导出类名常量
export { dialogClassNames, useDialogClasses } from './useDialogClasses';
