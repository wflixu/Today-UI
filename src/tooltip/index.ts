import { withInstall, type WithInstallType } from '../shared/withInstall';
import _Tooltip from './Tooltip';

export const Tooltip: WithInstallType<typeof _Tooltip> = withInstall(_Tooltip);
export default Tooltip;

// 导出类型
export type { TooltipProps, TooltipSlots, TooltipState } from './Tooltip.types';
