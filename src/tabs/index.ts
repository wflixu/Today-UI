

import { withInstall, type WithInstallType } from '../shared/withInstall';


import _Tabs from './Tabs';


export * from './type';

export const Menu: WithInstallType<typeof _Tabs> = withInstall(_Tabs);
export default Menu;