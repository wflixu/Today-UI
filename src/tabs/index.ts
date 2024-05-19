

import { withInstall, type WithInstallType } from '../shared/withInstall';


import _Tabs from './Tabs';
import _TabPanel from './TabPanel';
import _Tablist from './Tablist';


export const Tabs: WithInstallType<typeof _Tabs> = withInstall(_Tabs);
export const Tablist: WithInstallType<typeof _Tablist> = withInstall(_Tablist);
export const TabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);
export default Tabs;