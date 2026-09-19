import { withInstall, type WithInstallType } from '../shared/withInstall';
import _Tabs from './Tabs';
import _TabPanel from './TabPanel';
import _Tablist from './Tablist';

export const TTabs: WithInstallType<typeof _Tabs> = withInstall(_Tabs);
export const TTablist: WithInstallType<typeof _Tablist> = withInstall(_Tablist);
export const TTabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);
export default TTabs;

// 导出类名常量
export { tabsClassNames, useTabsClasses } from './useTabsClasses';
