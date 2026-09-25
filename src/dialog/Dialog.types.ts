import { type ExtractPropTypes, type PropType, type Slot } from 'vue';
import type { AttachNode } from '../shared/type';

// ========== 1. 字面量 union 类型 ==========

/** 对话框尺寸。宽度另有 `width` prop 可直接指定具体值 */
export type DialogSize = 'small' | 'medium' | 'large';

// ========== 2. props 定义 ==========

export const dialogProps = {
  /**
   * 是否显示。
   *
   * @default false
   */
  show: {
    type: Boolean,
    default: false,
  },

  /**
   * 标题。也可通过 `header` 插槽自定义。
   *
   * @default ''
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * 对话框宽度。数字按 px 处理，也可传 '60vw' 之类的 CSS 值。
   * 未传时按 `size` 取预设宽度。
   *
   * @default undefined
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: undefined as undefined,
  },

  /**
   * 尺寸预设，在未指定 `width` 时生效。
   *
   * @default 'medium'
   */
  size: {
    type: String as PropType<DialogSize>,
    default: 'medium',
  },

  /**
   * 点击遮罩是否关闭。
   *
   * @default true
   */
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },

  /**
   * 按下 Escape 是否关闭。
   *
   * @default true
   */
  closeOnEscape: {
    type: Boolean,
    default: true,
  },

  /**
   * 显示期间是否锁定 body 滚动。
   *
   * @default true
   */
  lockScroll: {
    type: Boolean,
    default: true,
  },

  /**
   * 对话框挂载目标，透传给 Portal。
   *
   * @default 'body'
   */
  attach: {
    type: [String, Object, Function] as PropType<AttachNode>,
    default: 'body',
  },

  /**
   * 为 true 时不使用 Teleport，原地渲染。
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

// ========== 3. Props 类型 ==========

export type DialogProps = ExtractPropTypes<typeof dialogProps>;

// ========== 4. State 与 Slots ==========

export interface DialogState {
  /** Props passed at the top-level */
  show: boolean;
  title: string;
  size: DialogSize;

  /** State calculated from a set of props */
  /** 解析后的宽度值；width 优先，否则按 size 取预设 */
  resolvedWidth: string;

  /** Element configuration */
  overlay: Record<string, unknown>;
  root: Record<string, unknown>;
  header: Record<string, unknown>;
  content: Record<string, unknown>;
  actions: Record<string, unknown>;
}

export type DialogSlots = {
  /** 触发元素。必须是单个元素 —— Dialog 会克隆它以绑定点击事件 */
  default?: Slot;
  /** 标题区域，优先于 `title` prop */
  header?: Slot;
  /** 对话框主体内容 */
  content?: Slot;
  /** 操作按钮区域。不提供时渲染默认的取消 / 确认按钮 */
  actions?: Slot;
};
