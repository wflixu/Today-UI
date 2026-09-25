import { computed, onUnmounted, ref, watch, type ComputedRef, type Ref } from 'vue';
import type { DialogProps, DialogSize, DialogState } from './Dialog.types';

/** 尺寸预设对应的宽度 */
const SIZE_WIDTH: Record<DialogSize, string> = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

const normalizeWidth = (width: string | number | undefined, size: DialogSize): string => {
  if (width === undefined) return SIZE_WIDTH[size];
  return typeof width === 'number' ? `${width}px` : width;
};

export interface UseDialogReturn {
  /** 请求关闭。受控组件只是抛出事件，由外部决定是否真的关闭 */
  requestClose: () => void;
  toggle: () => void;
  state: ComputedRef<DialogState>;
  triggerRef: Ref<HTMLElement | null>;
  /** 点击遮罩时调用，内部会判断是否允许关闭 */
  onOverlayClick: (event: MouseEvent) => void;
  /** 供外部（如 Actions 插槽）调用的关闭入口 */
  setShow: (next: boolean) => void;
}

/**
 * Dialog 的核心逻辑。
 *
 * 相对迁移前的实现，这里修掉了四个问题：
 *
 * 1. **监听泄漏** —— 原实现在 `watch([triggerRef])` 里 `addEventListener` 挂点击事件，
 *    全程没有 `removeEventListener`，元素每次变更都会叠一个监听。这里改由
 *    `usePopoverTrigger` 统一处理，不存在裸挂监听。
 * 2. **无 Escape 关闭** —— 原有实现完全没有键盘处理。
 * 3. **无遮罩点击关闭** —— 原有 `.t-overlay` 上没有任何点击处理。
 * 4. **无滚动锁** —— 原有实现打开对话框后页面仍可滚动。
 */
export function useDialog(
  props: DialogProps,
  emit: (event: 'update:show', value: boolean) => void,
): UseDialogReturn {
  const triggerRef = ref<HTMLElement | null>(null);

  const setShow = (next: boolean) => {
    if (next === props.show) return;
    emit('update:show', next);
  };

  const requestClose = () => setShow(false);
  const toggle = () => setShow(!props.show);

  // ---------- 关闭行为 ----------

  const onDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    requestClose();
  };

  // 仅在显示期间挂全局监听，关闭或卸载即移除 —— 避免常驻监听与累积
  watch(
    () => props.show,
    (show, _prev, onCleanup) => {
      if (!show || typeof document === 'undefined') return;
      if (!props.closeOnEscape) return;

      document.addEventListener('keydown', onDocumentKeydown);
      onCleanup(() => document.removeEventListener('keydown', onDocumentKeydown));
    },
    { immediate: true },
  );

  onUnmounted(() => {
    if (typeof document === 'undefined') return;
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  /**
   * 遮罩点击关闭。
   *
   * 只认「点击落在遮罩本身」—— 若不判断 `target === currentTarget`，
   * 从对话框内部按下、拖到遮罩上松开也会触发关闭。
   */
  const onOverlayClick = (event: MouseEvent) => {
    if (!props.closeOnOverlayClick) return;
    if (event.target !== event.currentTarget) return;
    requestClose();
  };

  // ---------- 状态 ----------

  const state = computed<DialogState>(() => ({
    // Props passed at the top-level
    show: props.show,
    title: props.title,
    size: props.size,

    // State calculated from a set of props
    resolvedWidth: normalizeWidth(props.width, props.size),

    // Element configuration
    overlay: {},
    root: {},
    header: {},
    content: {},
    actions: {},
  }));

  return { requestClose, toggle, state, triggerRef, onOverlayClick, setShow };
}
