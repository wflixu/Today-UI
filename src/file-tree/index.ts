
import { withInstall, type WithInstallType } from '../shared/withInstall';
import _FileTree from "./FileTree";

export * from './type';

export const FileTree: WithInstallType<typeof _FileTree> = withInstall(_FileTree);
export default FileTree;



