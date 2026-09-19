import { withInstall, type WithInstallType } from '../shared/withInstall';
import _Dropdown from './Dropdown';

export const TDropdown: WithInstallType<typeof _Dropdown> = withInstall(_Dropdown);
export default TDropdown;

// 导出类名常量
export { dropdownClassNames, useDropdownClasses } from './useDropdownClasses';
