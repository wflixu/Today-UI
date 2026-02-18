import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { TooltipProps, TooltipState } from './Tooltip.types';

// 扩展 TooltipState 以包含内部的 computed ref
interface TooltipStateInternal extends TooltipState {
  _isVisible: ComputedRef<boolean>;
}

/**
 * Tooltip 状态管理 Hook
 * 处理触发模式、延迟处理、可见性控制
 */
export const useTooltip = (
  props: TooltipProps,
  referenceRef?: Ref<HTMLElement | null>
): TooltipStateInternal => {
  // 内部可见性状态（非受控模式）
  const internalVisible = ref(props.defaultVisible);

  // 计算实际可见性（受控优先）- 使用 computed 保持响应性
  const _isVisible = computed(() => {
    return props.visible !== undefined ? props.visible : internalVisible.value;
  });

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
    }, props.delay ?? 250);
  };

  // 隐藏逻辑（带延迟）
  const hide = () => {
    clearTimers();
    if (props.trigger === 'manual') return;

    hideTimer = setTimeout(() => {
      internalVisible.value = false;
      props.onVisibleChange?.(false);
    }, props.closeDelay ?? 250);
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
    // Props
    content: props.content,
    maxWidth: props.maxWidth,
    wrapText: props.wrapText,
    placement: props.placement,
    offset: props.offset,
    attach: props.attach,
    trigger: props.trigger,
    delay: props.delay,
    closeDelay: props.closeDelay,
    relationship: props.relationship,
    withArrow: props.withArrow,

    // 状态 - 暴露 _isVisible computed ref
    _isVisible,
    isVisible: _isVisible.value, // 初始值

    // 样式（占位，由 useTooltipStyles 填充）
    className: '',
    arrowClassName: undefined,

    // 事件处理器
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,

    // 清理
    clearTimers,
  };
};
