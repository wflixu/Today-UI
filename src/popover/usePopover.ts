import { computed, onUnmounted, ref, watch, type Ref } from 'vue';
import {
  arrow as arrowMiddleware,
  autoUpdate,
  flip,
  offset as offsetMiddleware,
  shift,
  size as sizeMiddleware,
  useFloating,
  type Placement,
  type Middleware,
} from '@floating-ui/vue';
import type { PopoverProps, PopoverState } from './Popover.types';

export interface UsePopoverReturn {
  /** 浮层是否可见（已解包受控/非受控） */
  isOpen: Ref<boolean>;
  /** 立即设置开合状态，不带延迟 */
  setOpen: (next: boolean) => void;
  /** 切换开合；带延迟的版本由触发逻辑决定何时调用 */
  toggle: () => void;
  /** 按 openDelay 延迟显示 */
  openWithDelay: () => void;
  /** 按 closeDelay 延迟隐藏 */
  closeWithDelay: () => void;
  /** 手动重算位置 */
  update: () => void;
  /** 定位是否已完成。首次计算是异步的，未完成时浮层应保持不可见，避免在左上角闪现 */
  isPositioned: Ref<boolean>;
  state: Ref<PopoverState>;
  triggerRef: Ref<HTMLElement | null>;
  floatingRef: Ref<HTMLElement | null>;
  arrowRef: Ref<HTMLElement | null>;
  /** 清空待执行的定时器 */
  clearTimers: () => void;
}

/**
 * Popover 的核心逻辑：定位、开合状态、关闭行为。
 *
 * 相对既有三个弹出组件，这里修掉了三个问题：
 *
 * 1. **位置不跟随** —— 既有实现都没配 `whileElementsMounted`，滚动/resize 时
 *    浮层不会重算位置。这里统一交给 floating-ui 的 autoUpdate。
 * 2. **坐标体系不一致** —— 既有 Tooltip 用默认的 `absolute` 策略算坐标，
 *    却手写 `position: fixed` 渲染。这里一律使用库返回的 `floatingStyles`，
 *    它已按 strategy 产出正确的定位方式。
 * 3. **监听清理不可靠** —— 既有 Dropdown 把 unsubscribe 放进 `setTimeout`
 *    导致可能丢失。这里统一用 watch 的 onCleanup，关闭即移除监听。
 */
export function usePopover(
  props: PopoverProps,
  /**
   * 请求变更开合状态时调用。
   *
   * 注意这里传的是**请求**而非「状态已变化」—— 受控模式下内部不改变状态，
   * 但使用者仍需要收到通知才能更新自己的 prop。若改用 `watch(isOpen)`，
   * 受控模式下内部请求不会改变 isOpen，事件就永远不会抛出，
   * v-model 也就永远无法更新。
   */
  onVisibleRequest?: (visible: boolean) => void,
): UsePopoverReturn {
  const triggerRef = ref<HTMLElement | null>(null);
  const floatingRef = ref<HTMLElement | null>(null);
  const arrowRef = ref<HTMLElement | null>(null);

  // ---------- 开合状态（受控 / 非受控） ----------

  const internalVisible = ref(props.defaultVisible);
  const isControlled = computed(() => props.visible !== undefined);
  const isOpen = computed(() =>
    isControlled.value ? Boolean(props.visible) : internalVisible.value,
  );

  const setOpen = (next: boolean) => {
    if (next === isOpen.value) return;

    if (!isControlled.value) {
      internalVisible.value = next;
    }
    onVisibleRequest?.(next);
  };

  const toggle = () => setOpen(!isOpen.value);

  // ---------- 定时器 ----------
  //
  // hover 触发需要延迟：显示前延迟避免误触，隐藏前延迟允许鼠标移入浮层。
  // 定时器必须可被清空，否则快速划过会遗留待执行的回调。

  let openTimer: ReturnType<typeof setTimeout> | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const clearTimers = () => {
    if (openTimer !== undefined) {
      clearTimeout(openTimer);
      openTimer = undefined;
    }
    if (closeTimer !== undefined) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
  };

  const openWithDelay = () => {
    clearTimers();
    if (props.openDelay > 0) {
      openTimer = setTimeout(() => {
        openTimer = undefined;
        setOpen(true);
      }, props.openDelay);
    } else {
      setOpen(true);
    }
  };

  const closeWithDelay = () => {
    clearTimers();
    if (props.closeDelay > 0) {
      closeTimer = setTimeout(() => {
        closeTimer = undefined;
        setOpen(false);
      }, props.closeDelay);
    } else {
      setOpen(false);
    }
  };

  // ---------- 定位 ----------

  const middleware = computed<Middleware[]>(() => {
    const list: Middleware[] = [offsetMiddleware(props.offset), flip(), shift({ padding: 8 })];

    if (props.withArrow) {
      list.push(arrowMiddleware({ element: arrowRef }));
    }

    if (props.matchTriggerWidth) {
      list.push(
        sizeMiddleware({
          apply({ rects, elements }) {
            elements.floating.style.width = `${rects.reference.width}px`;
          },
        }),
      );
    }

    return list;
  });

  const { floatingStyles, middlewareData, placement, update, isPositioned } = useFloating(
    triggerRef,
    floatingRef,
    {
      placement: props.placement,
      strategy: props.strategy,
      middleware,
      // 关键：没有这一项时 floating-ui 只在首次计算一次位置，
      // 滚动、resize、祖先容器尺寸变化都不会重算，浮层会跟丢锚点。
      whileElementsMounted: autoUpdate,
    },
  );

  const arrowStyles = computed<Record<string, string>>(() => {
    if (!props.withArrow) return {};

    const data = middlewareData.value.arrow;
    const side = (placement.value as string).split('-')[0];
    // 箭头贴在浮层的哪一边，与浮层相对触发元素的方向相反
    const staticSide = (
      { top: 'bottom', right: 'left', bottom: 'top', left: 'right' } as Record<string, string>
    )[side];

    const styles: Record<string, string> = { position: 'absolute' };
    if (data?.x != null) styles.left = `${data.x}px`;
    if (data?.y != null) styles.top = `${data.y}px`;
    if (staticSide) styles[staticSide] = '-4px';

    return styles;
  });

  // ---------- 关闭行为 ----------

  const isEventInsidePopover = (event: Event): boolean => {
    const target = event.target as Node | null;
    if (!target) return false;
    return Boolean(triggerRef.value?.contains(target) || floatingRef.value?.contains(target));
  };

  /**
   * 外部点击关闭。
   *
   * 用 `click` 而非 `pointerdown`。原因是一段很自然的用法会踩坑：
   * 一个受控的浮层 + 一个外部按钮切换它的开合状态。
   *
   * 若监听 `pointerdown`，事件顺序是：
   *   1. pointerdown（先于 click）→ 判定为外部点击 → 关闭 → 外部状态变 false
   *   2. click → 按钮的 `!visible` 又把它变回 true
   * 结果浮层永远是展开的，而且不报任何错。
   *
   * 换成 `click` 后，目标元素自身的处理器先执行（冒泡顺序），外部关闭再做判断时
   * 状态已经是 false，`setOpen` 的同值检查让它成为无操作。
   */
  const onDocumentClick = (event: Event) => {
    if (isEventInsidePopover(event)) return;
    setOpen(false);
  };

  const onDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    setOpen(false);
  };

  // 仅在浮层打开期间挂全局监听，关闭即移除。
  // 这样既避免了常驻监听的开销，也杜绝了既有 Dialog 那种「反复开关导致监听累积」的问题。
  watch(
    isOpen,
    (open, _prev, onCleanup) => {
      if (!open || typeof document === 'undefined') return;

      if (props.closeOnClickOutside) {
        document.addEventListener('click', onDocumentClick);
      }
      if (props.closeOnEscape) {
        document.addEventListener('keydown', onDocumentKeydown);
      }

      onCleanup(() => {
        document.removeEventListener('click', onDocumentClick);
        document.removeEventListener('keydown', onDocumentKeydown);
      });
    },
    { immediate: true },
  );

  onUnmounted(clearTimers);

  // ---------- 状态对象 ----------

  const state = computed<PopoverState>(() => ({
    // Props passed at the top-level
    visible: isOpen.value,
    placement: props.placement,
    strategy: props.strategy,
    offset: props.offset,
    withArrow: props.withArrow,
    trigger: props.trigger,

    // State calculated from a set of props
    open: isOpen.value,
    floatingStyles: (floatingStyles.value ?? {}) as Record<string, string>,
    arrowStyles: arrowStyles.value,
    currentPlacement: placement.value as Placement,

    // Element configuration
    content: {},
    arrow: props.withArrow ? {} : undefined!,
  }));

  return {
    isOpen,
    setOpen,
    toggle,
    openWithDelay,
    closeWithDelay,
    update,
    isPositioned,
    state,
    triggerRef,
    floatingRef,
    arrowRef,
    clearTimers,
  };
}
