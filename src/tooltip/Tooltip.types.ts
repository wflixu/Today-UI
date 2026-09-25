import { ExtractPropTypes, PropType, Slot } from 'vue';
import type { Placement } from '@floating-ui/vue';
import type { AttachNode } from '../shared/type';

// Trigger modes
export type TooltipTrigger = 'hover' | 'focus' | 'both' | 'manual';

// Relationship types for visual styling
export type TooltipRelationship = 'description' | 'label' | 'inaccessible';

// Props definition
export const tooltipProps = {
  // === Content ===
  /**
   * Tooltip 显示的文本内容
   */
  content: {
    type: String,
    default: undefined as undefined,
  },

  /**
   * 最大宽度（px）
   * @default 200
   */
  maxWidth: {
    type: Number,
    default: 200,
  },

  /**
   * 是否自动换行
   * @default true
   */
  wrapText: {
    type: Boolean,
    default: true,
  },

  // === Positioning ===
  /**
   * 显示位置
   * @default 'top'
   */
  placement: {
    type: String as PropType<Placement>,
    default: 'top' as Placement,
  },

  /**
   * 与触发元素的偏移距离（px）
   * @default 4
   */
  offset: {
    type: Number,
    default: 4,
  },

  /**
   * 挂载节点
   * - String: 会被当作选择器处理
   * - Function: 返回 DOM 节点
   * @default 'body'
   */
  attach: {
    type: [String, Function] as PropType<AttachNode>,
    default: 'body',
  },

  // === Visibility Control ===
  /**
   * 受控模式：是否显示（优先级高于内部状态）
   */
  visible: {
    type: Boolean,
    default: undefined as undefined,
  },

  /**
   * 非受控模式：初始是否显示
   * @default false
   */
  defaultVisible: {
    type: Boolean,
    default: false,
  },

  // === Trigger ===
  /**
   * 触发模式
   * - 'hover': 鼠标悬停时触发
   * - 'focus': 获得焦点时触发
   * - 'both': hover 或 focus 时都触发
   * - 'manual': 完全受控（通过 visible prop）
   * @default 'hover'
   */
  trigger: {
    type: String as PropType<TooltipTrigger>,
    default: 'hover' as TooltipTrigger,
  },

  /**
   * 显示延迟（ms）
   * @default 250
   */
  delay: {
    type: Number,
    default: 250,
  },

  /**
   * 隐藏延迟（ms）
   * @default 250
   */
  closeDelay: {
    type: Number,
    default: 250,
  },

  // === Style Variants ===
  /**
   * 关系类型（影响视觉样式）
   * - 'description': 默认样式
   * - 'label': 使用品牌色背景
   * - 'inaccessible': 使用中性背景色
   * @default 'description'
   */
  relationship: {
    type: String as PropType<TooltipRelationship>,
    default: 'description' as TooltipRelationship,
  },

  /**
   * 是否显示箭头
   * @default false
   */
  withArrow: {
    type: Boolean,
    default: false,
  },

  // === Events ===
  /**
   * 可见性变化回调
   */
  onVisibleChange: {
    type: Function as PropType<(visible: boolean) => void>,
    default: undefined as undefined,
  },
};

// Extract Props type
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;

// Slots type definition
export type TooltipSlots = {
  /**
   * 触发元素（必需）
   */
  default?: Slot;

  /**
   * 自定义内容（优先于 content prop）
   */
  content?: Slot;
};

// State interface
export interface TooltipState {
  /**
   * 显示位置
   */
  placement: Placement;

  /**
   * 偏移距离
   */
  offset: number;

  /**
   * 关系类型
   */
  relationship: TooltipRelationship;

  /**
   * 是否显示箭头
   */
  withArrow: boolean;

  /**
   * 最大宽度
   */
  maxWidth: number;

  /**
   * 是否换行
   */
  wrapText: boolean;

  /**
   * 内容文本
   */
  content?: string;

  /**
   * 挂载节点
   */
  attach: AttachNode;

  /**
   * 是否可见
   */
  isVisible: boolean;

  /**
   * 根元素类名
   */
  className: string;

  /**
   * 箭头类名（可选）
   */
  arrowClassName?: string;

  /**
   * 鼠标进入事件处理器
   */
  handleMouseEnter: () => void;

  /**
   * 鼠标离开事件处理器
   */
  handleMouseLeave: () => void;

  /**
   * 获得焦点事件处理器
   */
  handleFocus: () => void;

  /**
   * 失去焦点事件处理器
   */
  handleBlur: () => void;

  /**
   * 清理定时器
   */
  clearTimers: () => void;
}
