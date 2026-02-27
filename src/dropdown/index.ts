import { withInstall, type WithInstallType } from '../shared/withInstall';
import _Dropdown from "./Dropdown";

export const Dropdown: WithInstallType<typeof _Dropdown> = withInstall(_Dropdown);
export default Dropdown;

// 导出类名常量
export { dropdownClassNames, useDropdownClasses } from './useDropdownClasses';

