import { defineComponent, ref, SlotsType, computed, onUnmounted, watch } from 'vue';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
} from '@floating-ui/vue';
import { renderTooltip } from './renderTooltip';
import { useTooltipGriffelStyles, applyTooltipStyles } from './useTooltipStyles';
import { tooltipProps, type TooltipProps, type TooltipSlots } from './Tooltip.types';
import { useTooltip } from './useTooltip';
import './tooltip.css';

export const Tooltip = defineComponent({
  name: 'Tooltip',
  props: tooltipProps,
  slots: Object as SlotsType<TooltipSlots>,

  setup(props: TooltipProps, { expose, slots }) {
    const referenceRef = ref<HTMLElement | null>(null);
    const floatingRef = ref<HTMLElement | null>(null);
    const arrowRef = ref<HTMLElement | null>(null);

    // 在 setup 顶层获取 Griffel 样式（hooks 必须在顶层调用）
    const griffelStyles = useTooltipGriffelStyles();

    // 创建持久状态（只执行一次，保持内部状态和定时器引用）
    const state = useTooltip(props);

    // Floating UI 定位
    const { x, y, middlewareData, update } = useFloating(
      referenceRef,
      floatingRef,
      {
        placement: state.placement as Placement,
        middleware: [
          offset(state.offset),
          flip(),
          shift(),
          arrow({ element: arrowRef }),
        ],
      }
    );

    // 计算箭头样式
    const arrowStyle = computed(() => {
      const { x: arrowX, y: arrowY } = middlewareData.value.arrow ?? { x: 0, y: 0 };
      return {
        left: arrowX ? `${arrowX}px` : '',
        top: arrowY ? `${arrowY}px` : '',
      };
    });

    // 计算定位样式
    const positioningStyle = computed(() => ({
      position: 'fixed',
      left: `${x.value}px`,
      top: `${y.value}px`,
    }));

    // 监听可见性变化，应用样式（applyTooltipStyles 不包含 hooks，可以在 watch 中调用）
    watch(
      () => state._isVisible.value,
      () => {
        state.isVisible = state._isVisible.value;
        applyTooltipStyles(state, griffelStyles);
      },
      { immediate: true }
    );

    // 清理定时器
    onUnmounted(() => {
      state.clearTimers();
    });

    // 暴露引用和方法
    expose({
      referenceRef,
      floatingRef,
      update,
    });

    // 返回渲染函数
    return () => renderTooltip(
      state,
      slots,
      {
        referenceRef,
        floatingRef,
        arrowRef,
        positioningStyle: positioningStyle.value,
        arrowStyle: arrowStyle.value,
      }
    );
  }
});

export default Tooltip;
