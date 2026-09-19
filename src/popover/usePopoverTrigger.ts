import { cloneVNode, withDirectives, type Directive, type Ref, type VNode } from 'vue';
import { getFirstValidChild } from '../shared/util';
import type { PopoverTrigger } from './Popover.types';

/**
 * 合并事件处理器。
 *
 * `cloneVNode` 传入的同名 props 会**覆盖**原 vnode 上的，直接传我们的处理器
 * 会把使用者在触发元素上写的事件丢掉。所以这里把两者串起来，先调用原有的。
 *
 * 提到模块作用域而非放在 composable 内 —— 它不依赖任何闭包变量，
 * 每次调用重新创建没有必要。
 */
function mergeHandlers(
  original: Record<string, unknown> | undefined,
  ours: Record<string, (event: Event) => void>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...ours };

  for (const key of Object.keys(ours)) {
    const existing = original?.[key];
    if (typeof existing === 'function') {
      merged[key] = (...args: unknown[]) => {
        (existing as (...a: unknown[]) => void)(...args);
        (ours[key] as (...a: unknown[]) => void)(...args);
      };
    }
  }

  return merged;
}

export interface UsePopoverTriggerReturn {
  /**
   * 包装触发元素：绑定 DOM ref 与触发事件。
   * 传入插槽返回的子节点数组，返回可直接渲染的 vnode。
   */
  wrapTrigger: (children: VNode[]) => VNode | null;
  /**
   * 浮层容器需要绑定的额外事件。
   * hover 触发时用于让鼠标从触发元素移入浮层的过程中不关闭。
   */
  contentHandlers: Record<string, unknown>;
}

export interface UsePopoverTriggerOptions {
  /** 触发方式 */
  trigger: PopoverTrigger;
  /** 触发元素的 DOM ref，由本 composable 回填 */
  triggerRef: Ref<HTMLElement | null>;
  /** click / contextmenu 触发时调用 */
  toggle: () => void;
  /** hover / focus 触发时延迟显示；不传则退化为立即切换 */
  openWithDelay?: () => void;
  /** hover / focus 触发时延迟隐藏；不传则退化为立即切换 */
  closeWithDelay?: () => void;
  /** hover 触发时鼠标移入浮层调用，用于取消待执行的关闭 */
  clearTimers?: () => void;
}

/**
 * 触发元素处理。
 *
 * 合并了原有的 `dropdown/FloatTrigger.tsx` 与 `dialog/DialogTrigger.tsx`
 * —— 两份实现逐行等价，唯一差别只有 token 与 `getFirstValidChild` 的来源。
 *
 * 用指令而非 `cloneVNode(..., { ref })` 来捕获 DOM 元素：指令的 `mounted(el)`
 * 拿到的始终是真实元素，而 ref 在触发元素是组件时会拿到组件实例。
 *
 * 参数是聚焦的选项对象而非整个 PopoverProps —— 这样无需定位能力的组件
 * （如 Dialog）也能复用同一套触发逻辑。
 */
export function usePopoverTrigger(options: UsePopoverTriggerOptions): UsePopoverTriggerReturn {
  const {
    trigger,
    triggerRef,
    toggle,
    openWithDelay = toggle,
    closeWithDelay = toggle,
    clearTimers = () => {},
  } = options;

  // 元素可能在更新时被替换（例如 v-if 切换），因此 mounted 与 updated 都要写
  const captureRef: Directive<HTMLElement> = {
    mounted: (el) => {
      triggerRef.value = el;
    },
    updated: (el) => {
      triggerRef.value = el;
    },
    unmounted: () => {
      triggerRef.value = null;
    },
  };

  // 触发事件。manual 模式不注册任何事件，完全由 visible 控制。
  const buildHandlers = (): Record<string, (event: Event) => void> => {
    switch (trigger) {
      case 'click':
        return {
          onClick: () => toggle(),
        };

      case 'hover':
        return {
          onMouseenter: () => openWithDelay(),
          onMouseleave: () => closeWithDelay(),
        };

      case 'focus':
        return {
          onFocusin: () => openWithDelay(),
          onFocusout: () => closeWithDelay(),
        };

      case 'contextmenu':
        return {
          onContextmenu: (event: Event) => {
            event.preventDefault();
            openWithDelay();
          },
        };

      case 'manual':
      default:
        return {};
    }
  };

  const wrapTrigger = (children: VNode[]): VNode | null => {
    const firstValidChild = getFirstValidChild(children);
    if (!firstValidChild) return null;

    const handlers = buildHandlers();
    const cloned = cloneVNode(
      firstValidChild,
      mergeHandlers(firstValidChild.props as Record<string, unknown> | undefined, handlers),
    );

    return withDirectives(cloned, [[captureRef]]);
  };

  // hover 触发时，鼠标从触发元素移入浮层不应关闭 ——
  // 进入浮层取消待执行的关闭，离开时才重新计时。
  const contentHandlers: Record<string, unknown> =
    trigger === 'hover'
      ? {
          onMouseenter: () => clearTimers(),
          onMouseleave: () => closeWithDelay(),
        }
      : {};

  return { wrapTrigger, contentHandlers };
}
