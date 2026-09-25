import { h, Teleport, type VNode } from 'vue';
import type { PortalSlots, PortalState } from './Portal.types';

/**
 * 渲染 Portal。
 *
 * **不引入包裹元素** —— 内容直接 Teleport，保持 DOM 结构透明。
 * 加一层 div 会平白多出层级，并可能破坏使用者的 CSS 选择器
 * （如 `body > .t-dialog`）。
 */
export const renderPortal = (state: PortalState, slots: PortalSlots): VNode => {
  const children = slots.default?.() ?? [];

  return h(
    Teleport,
    {
      to: state.teleport.to,
      disabled: state.teleport.disabled,
    },
    children,
  );
};
