
import { withInstall, type WithInstallType } from '../shared/withInstall';


import _Dropdown from './Dropdown';


export * from './type';

export const Dropdown: WithInstallType<typeof _Dropdown> = withInstall(_Dropdown);
export default Dropdown;
