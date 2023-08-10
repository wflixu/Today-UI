
import { withInstall, type WithInstallType } from '../shared/withInstall';


import _Tooltip from './Tooltip';


export * from './type';

export const Tooltip: WithInstallType<typeof _Tooltip> = withInstall(_Tooltip);
export default Tooltip;
