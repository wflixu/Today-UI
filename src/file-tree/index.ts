import { withInstall, type WithInstallType } from '../shared/withInstall';
import _FileTree from './FileTree';

export const TFileTree: WithInstallType<typeof _FileTree> = withInstall(_FileTree);
export default TFileTree;

// 导出类名常量
export { fileTreeClassNames, useFileTreeClasses } from './useFileTreeClasses';
