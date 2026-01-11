import { h, Teleport } from 'vue';
import type { TooltipState, TooltipSlots } from './Tooltip.types';
import type { AttachNode } from '../shared/type';

// 渲染上下文接口
export interface RenderContext {
  referenceRef: { value: HTMLElement | null };
  floatingRef: { value: HTMLElement | null };
  arrowRef: { value: HTMLElement | null };
  positioningStyle: { left: string; top: string };
  arrowStyle: { left?: string; top?: string };
}

/**
 * 获取挂载节点
 */
const getAttach = (attach: AttachNode): HTMLElement | string => {
  if (typeof attach === 'string') {
    const element = document.querySelector(attach);
    return (element as HTMLElement) || document.body;
  }
  if (typeof attach === 'function') {
    return attach() as HTMLElement;
  }
  return document.body;
};

/**
 * Tooltip 渲染函数
 */
export const renderTooltip = (
  state: TooltipState,
  slots: TooltipSlots,
  context: RenderContext
) => {
  const {
    referenceRef,
    floatingRef,
    arrowRef,
    positioningStyle,
    arrowStyle,
  } = context;

  const {
    className,
    arrowClassName,
    content,
    isVisible,
    withArrow,
    placement,
    attach,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = state;

  // 触发元素包装器
  const triggerWrapper = h('span', {
    ref: (el: any) => { referenceRef.value = el; },
    class: 't-tooltip-trigger',
    onMouseenter: handleMouseEnter,
    onMouseleave: handleMouseLeave,
    onFocusin: handleFocus,
    onFocusout: handleBlur,
  }, slots.default?.());

  // Tooltip 内容
  const tooltipContent = h('div', {
    ref: (el: any) => { floatingRef.value = el; },
    class: className,
    style: positioningStyle,
    'data-placement': placement,
  }, [
    h('div', { class: 't-tooltip__content' },
      slots.content?.() || content
    ),
    withArrow && h('div', {
      ref: (el: any) => { arrowRef.value = el; },
      class: arrowClassName,
      style: arrowStyle,
      'data-placement': placement,
    }),
  ].filter(Boolean));

  return h(
    'div',
    null,
    [
      triggerWrapper,
      isVisible && h(Teleport, { to: getAttach(attach) }, [tooltipContent]),
    ]
  );
};
