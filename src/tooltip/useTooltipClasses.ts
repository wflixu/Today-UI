import { cn } from '@/shared/styles/classUtils';

export type TooltipRelationship = 'description' | 'label' | 'inaccessible';

/**
 * Tooltip 组件的类名常量
 */
export const tooltipClassNames = {
  root: 't-tooltip',
  content: 't-tooltip__content',
  arrow: 't-tooltip__arrow',
} as const;

/**
 * Tooltip 变体类名映射
 */
export const tooltipVariants = {
  relationship: {
    description: '',
    label: 't-tooltip--label',
    inaccessible: 't-tooltip--inaccessible',
  } satisfies Record<TooltipRelationship, string>,

  state: {
    visible: 'visible',
  },
} as const;

/**
 * Tooltip 组件类名 Hook
 * 根据组件 state 生成对应的 BEM 类名
 */
export function useTooltipClasses(state: {
  isVisible?: boolean;
  relationship?: TooltipRelationship;
  withArrow?: boolean;
}): {
  root: string;
  arrow?: string;
} {
  const {
    isVisible = false,
    relationship = 'description',
    withArrow = false,
  } = state;

  return {
    root: cn(
      tooltipClassNames.root,
      relationship !== 'description' && tooltipVariants.relationship[relationship],
      isVisible && tooltipVariants.state.visible
    ),
    arrow: withArrow ? tooltipClassNames.arrow : undefined,
  };
}
