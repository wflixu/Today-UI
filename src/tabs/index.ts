

import { withInstall, type WithInstallType } from '../shared/withInstall';


import _Tabs from './Tabs';
import _Tablist from './Tablist.vue';
import _TabPanel from './TabPanel.vue';

export * from './type';

export const Tabs: WithInstallType<typeof _Tabs> = withInstall(_Tabs);
export const Tablist: WithInstallType<typeof _Tablist> = withInstall(_Tablist);
export const TabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);
export default Tabs;