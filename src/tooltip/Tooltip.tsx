import { defineComponent, h, SlotsType } from 'vue';
import TPopover from '../popover/Popover';
import { useTooltipClasses, type TooltipRelationship } from './useTooltipClasses';
import { tooltipProps, type TooltipProps, type TooltipSlots } from './Tooltip.types';

import './tooltip.css';

/**
 * 触发元素的包装类名。
 *
 * Tooltip 与 Dropdown / Dialog 不同：它给触发内容套一层 span，而不是直接克隆
 * 使用者传入的元素。原因有二：
 *
 * 1. 这层 span 承载 `display: inline-block`，使行内内容（如纯文本）也能作为定位锚点
 * 2. 保持既有 DOM 结构不变 —— 迁移前就是这个结构，既有测试也据此断言
 *
 * 该 span 会被 Popover 克隆并绑定事件与 ref，因此它同时也是实际的触发元素。
 */
const TRIGGER_CLASS = 't-tooltip-trigger';

export const TTooltip = defineComponent({
  name: 'TTooltip',
  props: tooltipProps,
  slots: Object as SlotsType<TooltipSlots>,
  setup(props: TooltipProps, { slots }) {
    return () => {
      const classes = useTooltipClasses({
        isVisible: true,
        relationship: props.relationship as TooltipRelationship,
        withArrow: props.withArrow,
      });

      /**
       * 内容样式。
       *
       * 迁移前 `maxWidth` 与 `wrapText` 只被透传到 state，渲染层从未读取 ——
       * 两个 prop 完全失效。这里让它们真正生效。
       */
      const contentStyle: Record<string, string> = {
        maxWidth: `${props.maxWidth}px`,
        whiteSpace: props.wrapText ? 'normal' : 'nowrap',
      };

      return h(
        TPopover,
        {
          visible: props.visible,
          defaultVisible: props.defaultVisible,
          trigger: props.trigger,
          placement: props.placement,
          offset: props.offset,
          // Tooltip 用 delay / closeDelay 命名，Popover 用 openDelay / closeDelay
          openDelay: props.delay,
          closeDelay: props.closeDelay,
          attach: props.attach,
          withArrow: props.withArrow,
          contentClass: classes.root,
          // 箭头由 Popover 渲染并定位（它持有 arrowRef 与 arrowStyles），
          // Tooltip 只把类名换掉，以便用 tooltip 的配色覆盖
          arrowClass: classes.arrow,
          'onUpdate:visible': (visible: boolean) => props.onVisibleChange?.(visible),
        },
        {
          default: () => h('span', { class: TRIGGER_CLASS }, slots.default?.()),
          content: () =>
            h(
              'div',
              { class: 't-tooltip__content', style: contentStyle },
              slots.content?.() ?? props.content,
            ),
        },
      );
    };
  },
});

export default TTooltip;
