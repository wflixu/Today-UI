import { type ExtractPropTypes, type PropType, type Slot } from 'vue';
import type { AttachNode } from '../shared/type';

// ========== 1. 字面量 union 类型 ==========

// Portal 当前没有字符串枚举型 prop。

// ========== 2. props 定义 ==========

export const portalProps = {
  /**
   * Teleport 的挂载目标。支持选择器字符串、DOM 元素、或返回元素的函数。
   * 求值失败（选择器未命中、函数返回空）时回退到 `document.body`。
   *
   * @default 'body'
   */
  attach: {
    type: [String, Object, Function] as PropType<AttachNode>,
    default: 'body',
  },

  /**
   * 为 true 时不使用 Teleport，内容渲染在原来的位置。
   * 主要用于 SSR 与单元测试，也可用于需要保持在原 DOM 层级的场景。
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 为 true 时锁定 `document.body` 的滚动，模态类组件使用。
   * 支持多实例叠加：只有全部使用方都卸载后才恢复滚动。
   *
   * @default false
   */
  lockScroll: {
    type: Boolean,
    default: false,
  },
} as const;

// ========== 3. Props 类型 ==========

export type PortalProps = ExtractPropTypes<typeof portalProps>;

// ========== 4. State 与 Slots ==========

export interface PortalState {
  /** Props passed at the top-level */
  attach: AttachNode;
  disabled: boolean;
  lockScroll: boolean;

  /** State calculated from a set of props */
  /** 解析后的挂载目标；`disabled` 为 true 时为 undefined（此时不 Teleport） */
  target: HTMLElement | undefined;

  /** Element configuration */
  /** Teleport 的 props，直接展开给 `<Teleport>` */
  teleport: {
    to: HTMLElement | undefined;
    disabled: boolean;
  };
}

export type PortalSlots = {
  default?: Slot;
};
