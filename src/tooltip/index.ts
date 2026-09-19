import { withInstall, type WithInstallType } from '../shared/withInstall';
import _TTooltip from './Tooltip';

export const TTooltip: WithInstallType<typeof _TTooltip> = withInstall(_TTooltip);
export default TTooltip;

// 导出类型
export type {
  TooltipProps,
  TooltipSlots,
  TooltipState,
  TooltipTrigger,
  TooltipRelationship,
} from './Tooltip.types';

// 导出类名和类型
export { tooltipClassNames, tooltipVariants, useTooltipClasses } from './useTooltipClasses';

// 此处不 import './tooltip.css' —— 样式统一由 src/style/index.css 引入，避免重复进产物。
