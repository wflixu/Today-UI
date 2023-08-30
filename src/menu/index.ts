
import { withInstall, type WithInstallType } from '../shared/withInstall';


import _Menu from './Menu';


export * from './type';

export const Menu: WithInstallType<typeof _Menu> = withInstall(_Menu);
export default Menu;