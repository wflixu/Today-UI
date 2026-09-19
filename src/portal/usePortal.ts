import { computed, onUnmounted, watch, type ComputedRef } from 'vue';
import type { AttachNode, AttachNodeTarget } from '../shared/type';
import type { PortalProps, PortalState } from './Portal.types';

/**
 * 把 AttachNode 解析成实际的挂载元素。
 *
 * 覆盖各种入参形式，任一环节求值失败都回退到 `document.body`：
 * - 选择器字符串 —— querySelector 未命中则回退
 * - DOM 元素     —— 直接使用
 * - Document     —— 取其 body
 * - 函数         —— 求值后递归解析（返回值可以是选择器或元素）
 */
export function resolveAttach(
  node: AttachNode | AttachNodeTarget | undefined,
  triggerNode?: HTMLElement,
): HTMLElement {
  const fallback = typeof document === 'undefined' ? undefined : document.body;

  if (node === undefined || node === null) {
    return fallback as HTMLElement;
  }

  if (typeof node === 'string') {
    if (typeof document === 'undefined') {
      return fallback as HTMLElement;
    }
    const found = document.querySelector(node);
    return (found as HTMLElement | null) ?? (fallback as HTMLElement);
  }

  if (typeof node === 'function') {
    const resolved = node(triggerNode);
    return resolveAttach(resolved as AttachNode, triggerNode);
  }

  // 只接受真正的 DOM 节点。类型系统在运行时不存在，使用者可能传入数字、
  // 普通对象等任意值 —— 直接交给 Teleport 会在 insertBefore 处崩溃。
  if (typeof Node !== 'undefined' && node instanceof Node) {
    if (node instanceof Document) {
      return (node.body as HTMLElement) ?? (fallback as HTMLElement);
    }
    return node as unknown as HTMLElement;
  }

  return fallback as HTMLElement;
}

// ========== 滚动锁 ==========
//
// 用模块级引用计数，使多个 Portal 叠加时（例如对话框上再开一个对话框）
// 不会因为其中一个卸载就提前恢复滚动。

let lockCount = 0;
let savedOverflow = '';

function acquireScrollLock(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

function releaseScrollLock(): void {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
  }
}

/**
 * 仅用于测试：把引用计数与保存的值恢复到初始状态，
 * 避免用例之间互相污染。
 */
export function __resetScrollLockForTesting(): void {
  lockCount = 0;
  savedOverflow = '';
}

// ========== Portal 状态 ==========

export function usePortal(props: PortalProps): ComputedRef<PortalState> {
  return computed<PortalState>(() => {
    const target = props.disabled ? undefined : resolveAttach(props.attach);

    // 无法确定挂载目标时退回原地渲染，而不是抛错：
    // 典型场景是 SSR —— 此时没有 document，`resolveAttach` 返回 undefined。
    const canTeleport = !props.disabled && target !== undefined;

    return {
      // Props passed at the top-level
      attach: props.attach,
      disabled: props.disabled,
      lockScroll: props.lockScroll,

      // State calculated from a set of props
      target,

      // Element configuration
      teleport: {
        // `to` 在 disabled 时不会被使用，但仍要给一个合法值以避免 Vue 的必填警告
        to: target ?? 'body',
        disabled: !canTeleport,
      },
    };
  });
}

/**
 * 让滚动锁跟随 `lockScroll` 变化，并在卸载时释放。
 *
 * 单独抽出来是为了让锁定/释放与 computed 分离 ——
 * 在 computed 里做副作用会导致依赖不变时不重算，锁状态与 prop 脱节。
 */
export function useScrollLock(lockScroll: ComputedRef<boolean>): void {
  let locked = false;

  const apply = (shouldLock: boolean) => {
    if (shouldLock === locked) return;

    if (shouldLock) {
      acquireScrollLock();
    } else {
      releaseScrollLock();
    }
    locked = shouldLock;
  };

  watch(lockScroll, apply, { immediate: true });

  onUnmounted(() => {
    if (locked) {
      releaseScrollLock();
      locked = false;
    }
  });
}
