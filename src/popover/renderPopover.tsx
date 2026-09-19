import { h, Fragment, type Ref, type VNode } from 'vue';
import TPortal from '../portal/Portal';
import { usePopoverClasses } from './usePopoverClasses';
import type { PopoverSlots } from './Popover.types';
import type { UsePopoverTriggerReturn } from './usePopoverTrigger';

export interface RenderPopoverContext {
  visible: boolean;
  /** 定位是否已完成 —— 完成前浮层保持不可见，避免在左上角闪现一帧 */
  positioned: boolean;
  placement: string;
  floatingStyles: Record<string, string>;
  arrowStyles: Record<string, string>;
  withArrow: boolean;
  attach: unknown;
  disabled: boolean;
  lockScroll: boolean;
  contentHandlers: UsePopoverTriggerReturn['contentHandlers'];
  /** 组合式 API 下必须直接传 Ref 对象，字符串 ref 只在 this.$refs 下有效 */
  floatingRef: Ref<HTMLElement | null>;
  arrowRef: Ref<HTMLElement | null>;
}

/**
 * 渲染 Popover。
 *
 * 结构：触发元素 + Portal(浮层)。浮层容器承载定位样式与关闭/悬停事件。
 */
export const renderPopover = (
  ctx: RenderPopoverContext,
  slots: PopoverSlots,
  wrapTrigger: UsePopoverTriggerReturn['wrapTrigger'],
): VNode => {
  const children = slots.default?.() ?? [];
  const trigger = wrapTrigger(Array.isArray(children) ? children : [children]);

  // 定位完成前不加 is-visible —— CSS 里未加该类时元素不可见，
  // 避免首次渲染到左上角再跳到位的那一帧。
  const classes = usePopoverClasses({ visible: ctx.positioned });

  const floating = ctx.visible
    ? h(
        'div',
        {
          class: classes.content,
          'data-placement': ctx.placement,
          style: { ...ctx.floatingStyles, zIndex: 'var(--t-z-index-popover)' },
          ...ctx.contentHandlers,
          ref: ctx.floatingRef,
        },
        [
          slots.content?.({
            arrowRef: ctx.arrowRef,
            arrowStyles: ctx.arrowStyles,
          }),
          ctx.withArrow
            ? h('div', {
                class: classes.arrow,
                'data-placement': ctx.placement,
                style: ctx.arrowStyles,
                ref: ctx.arrowRef,
              })
            : null,
        ],
      )
    : null;

  return h(Fragment, [
    trigger,
    floating
      ? h(
          TPortal,
          {
            attach: ctx.attach as never,
            disabled: ctx.disabled,
            lockScroll: ctx.lockScroll,
          },
          () => floating,
        )
      : null,
  ]);
};
