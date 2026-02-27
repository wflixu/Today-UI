import { defineComponent, ref, SlotsType, computed, onUnmounted } from 'vue';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
} from '@floating-ui/vue';
import { renderTooltip } from './renderTooltip';
import { useTooltipClasses, tooltipClassNames } from './useTooltipClasses';
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

    // 创建 Tooltip 状态（只在 setup 时执行一次）
    const tooltipState = useTooltip(props, referenceRef);

    // 使用 computed 创建响应式状态（与 Button 模式一致）
    const state = computed(() => {
      // 更新 isVisible 值以保持响应性
      tooltipState.isVisible = tooltipState._isVisible.value;

      // 使用纯 CSS 类名 Hook
      const classes = useTooltipClasses({
        isVisible: tooltipState.isVisible,
        relationship: tooltipState.relationship,
        withArrow: tooltipState.withArrow,
      });

      // 应用类名到状态
      tooltipState.className = classes.root;
      tooltipState.arrowClassName = classes.arrow;

      return tooltipState;
    });

    // Floating UI 定位
    const { x, y, middlewareData, update } = useFloating(
      referenceRef,
      floatingRef,
      {
        placement: tooltipState.placement as Placement,
        middleware: [
          offset(tooltipState.offset),
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

    // 清理定时器
    onUnmounted(() => {
      tooltipState.clearTimers();
    });

    // 暴露引用和方法
    expose({
      referenceRef,
      floatingRef,
      arrowRef,
      update,
    });

    // 返回渲染函数
    return () => renderTooltip(
      state.value,
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
