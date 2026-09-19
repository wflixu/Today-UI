import { withInstall, type WithInstallType } from '../shared/withInstall';
import _TTooltip from './Tooltip';

export const TTooltip: WithInstallType<typeof _TTooltip> = withInstall(_TTooltip);
export default TTooltip;

// 导出类型
export type { TooltipProps, TooltipSlots, TooltipState } from './Tooltip.types';

// 导出类名和类型
export {
  tooltipClassNames,
  useTooltipClasses,
  type TooltipRelationship,
} from './useTooltipClasses';
