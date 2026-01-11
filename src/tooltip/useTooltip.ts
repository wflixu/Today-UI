import { ref, computed, type ComputedRef } from 'vue';
import type { TooltipProps, TooltipState } from './Tooltip.types';

// 扩展 TooltipState 类型以包含内部的 computed ref
interface TooltipStateInternal extends TooltipState {
  _isVisible: ComputedRef<boolean>;
}

/**
 * Tooltip 状态管理 Hook
 * 处理触发模式、延迟处理、可见性控制
 */
export const useTooltip = (props: TooltipProps): TooltipStateInternal => {
  // 内部可见性状态（非受控模式）
  const internalVisible = ref(props.defaultVisible);

  // 计算实际可见性（受控或非受控）
  const _isVisible = computed(
    () => props.visible !== undefined ? props.visible : internalVisible.value
  );

  // 延迟定时器管理
  let showTimer: ReturnType<typeof setTimeout> | null = null;
  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  // 清理所有定时器
  const clearTimers = () => {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  };

  // 显示逻辑（带延迟）
  const show = () => {
    clearTimers();
    if (props.trigger === 'manual') return;

    showTimer = setTimeout(() => {
      internalVisible.value = true;
      props.onVisibleChange?.(true);
    }, props.delay);
  };

  // 隐藏逻辑（带延迟）
  const hide = () => {
    clearTimers();
    if (props.trigger === 'manual') return;

    hideTimer = setTimeout(() => {
      internalVisible.value = false;
      props.onVisibleChange?.(false);
    }, props.closeDelay);
  };

  // 事件处理器
  const handleMouseEnter = () => {
    if (props.trigger === 'hover' || props.trigger === 'both') {
      show();
    }
  };

  const handleMouseLeave = () => {
    if (props.trigger === 'hover' || props.trigger === 'both') {
      hide();
    }
  };

  const handleFocus = () => {
    if (props.trigger === 'focus' || props.trigger === 'both') {
      show();
    }
  };

  const handleBlur = () => {
    if (props.trigger === 'focus' || props.trigger === 'both') {
      hide();
    }
  };

  return {
    placement: props.placement,
    offset: props.offset,
    relationship: props.relationship,
    withArrow: props.withArrow,
    maxWidth: props.maxWidth,
    wrapText: props.wrapText,
    content: props.content,
    attach: props.attach,
    _isVisible,
    isVisible: _isVisible.value, // 直接赋值，而不是 getter
    className: '', // 将由 useTooltipStyles 填充
    arrowClassName: undefined, // 将由 useTooltipStyles 填充
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    clearTimers,
  };
};
