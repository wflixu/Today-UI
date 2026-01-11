import type { TooltipState } from './Tooltip.types';
import { useTooltipStyles as useGriffelStyles } from './useTooltipStyles.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

// 类名常量
export const tooltipClassNames = {
  root: 't-tooltip',
  content: 't-tooltip__content',
  arrow: 't-tooltip__arrow',
} as const;

/**
 * 获取 Griffel 样式（必须在 setup 顶层调用）
 */
export const useTooltipGriffelStyles = () => {
  return useGriffelStyles();
};

/**
 * 应用样式到状态（不包含 hooks，可以在 watch 中调用）
 */
export const applyTooltipStyles = (
  state: TooltipState,
  styles: ReturnType<typeof useGriffelStyles>
) => {
  const { relationship, isVisible, withArrow } = state;

  // 根元素类名
  const rootClasses = [
    tooltipClassNames.root, // 语义化类名 .t-tooltip
    styles.root, // Griffel 基础样式
    isVisible && styles.visible, // 可见状态
    relationship === 'label' && styles.relationshipLabel, // label 关系样式
    relationship === 'inaccessible' && styles.relationshipInaccessible, // inaccessible 关系样式
  ].filter(Boolean);

  // 箭头类名
  const arrowClasses = withArrow ? [
    tooltipClassNames.arrow,
    styles.arrow,
  ].filter(Boolean) : undefined;

  // 应用类名到状态
  state.className = mergeClasses(...rootClasses);
  state.arrowClassName = arrowClasses ? mergeClasses(...arrowClasses) : undefined;
};

/**
 * Tooltip 样式钩子函数（已弃用，请使用 useTooltipGriffelStyles + applyTooltipStyles）
 * 使用 griffel-vue 生成样式，同时保留语义化类名
 * @deprecated 请在 setup 顶层调用 useTooltipGriffelStyles()，然后在需要的地方调用 applyTooltipStyles()
 */
export const useTooltipStyles = (state: TooltipState) => {
  const styles = useGriffelStyles();
  applyTooltipStyles(state, styles);
};
