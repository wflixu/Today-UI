import { type ExtractPropTypes, type PropType, type Slot } from 'vue';
import type { Placement } from '@floating-ui/vue';
import type { AttachNode } from '../shared/type';

// ========== 1. 字面量 union 类型 ==========

/** 触发方式 */
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'contextmenu' | 'manual';

/** 定位策略。`fixed` 用于浮层需要在滚动容器外保持位置的场景 */
export type PopoverStrategy = 'absolute' | 'fixed';

// ========== 2. props 定义 ==========

export const popoverProps = {
  // ---------- 开合 ----------

  /**
   * 受控的开合状态。传入时组件为受控模式，开合完全由该值决定。
   * 不传则为非受控模式，内部维护状态。
   *
   * @default undefined
   */
  visible: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined as undefined,
  },

  /**
   * 非受控模式下的初始开合状态。
   *
   * @default false
   */
  defaultVisible: {
    type: Boolean,
    default: false,
  },

  // ---------- 定位 ----------

  /**
   * 浮层相对触发元素的位置。
   *
   * @default 'bottom-start'
   */
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
  },

  /**
   * 定位策略。`absolute` 相对最近的定位祖先，`fixed` 相对视口。
   *
   * @default 'absolute'
   */
  strategy: {
    type: String as PropType<PopoverStrategy>,
    default: 'absolute',
  },

  /**
   * 浮层与触发元素的间距（px）。
   *
   * @default 0
   */
  offset: {
    type: Number,
    default: 0,
  },

  /**
   * 是否渲染箭头。开启后 `<slot name="content">` 的第二个参数会提供 arrowRef 与 arrowStyles。
   *
   * @default false
   */
  withArrow: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否让浮层宽度与触发元素一致。
   *
   * @default false
   */
  matchTriggerWidth: {
    type: Boolean,
    default: false,
  },

  // ---------- 触发 ----------

  /**
   * 触发方式。
   * - 'click'：点击切换
   * - 'hover'：悬停显示，移开隐藏
   * - 'focus'：聚焦显示，失焦隐藏
   * - 'contextmenu'：右键显示
   * - 'manual'：不注册任何触发事件，完全由 visible 控制
   *
   * @default 'click'
   */
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click',
  },

  /**
   * 显示前的延迟（ms），hover 触发时用于避免误触。
   *
   * @default 0
   */
  openDelay: {
    type: Number,
    default: 0,
  },

  /**
   * 隐藏前的延迟（ms），hover 触发时用于允许鼠标移入浮层。
   *
   * @default 0
   */
  closeDelay: {
    type: Number,
    default: 0,
  },

  // ---------- 关闭行为 ----------

  /**
   * 点击浮层与触发元素之外时是否关闭。
   *
   * @default true
   */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },

  /**
   * 按下 Escape 时是否关闭。
   *
   * @default true
   */
  closeOnEscape: {
    type: Boolean,
    default: true,
  },

  // ---------- Portal 透传 ----------

  /**
   * 浮层的挂载目标，透传给 Portal。
   *
   * @default 'body'
   */
  attach: {
    type: [String, Object, Function] as PropType<AttachNode>,
    default: 'body',
  },

  /**
   * 为 true 时浮层不使用 Teleport，渲染在原位置。
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 浮层显示期间是否锁定 body 滚动。
   *
   * @default false
   */
  lockScroll: {
    type: Boolean,
    default: false,
  },
} as const;

// ========== 3. Props 类型 ==========

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;

// ========== 4. State 与 Slots ==========

export interface PopoverState {
  /** Props passed at the top-level */
  visible: boolean;
  placement: Placement;
  strategy: PopoverStrategy;
  offset: number;
  withArrow: boolean;
  trigger: PopoverTrigger;

  /** State calculated from a set of props */
  /** 浮层是否可见（受控时取 props.visible，否则取内部状态） */
  open: boolean;
  /** 浮层的定位样式，由 floating-ui 根据 strategy 计算 */
  floatingStyles: Record<string, string>;
  /** 箭头的定位样式，仅在 withArrow 时有意义 */
  arrowStyles: Record<string, string>;
  /** 浮层最终生效的 placement（flip 中间件可能改变它） */
  currentPlacement: Placement;

  /** Element configuration */
  /**
   * 浮层容器。注意这里没有 `trigger` 元素配置 ——
   * 触发元素来自 `default` 插槽，由 Popover 克隆后绑定 ref 与事件，
   * 不在这里描述（若在此处也叫 trigger 会与上面的 trigger prop 冲突）。
   */
  content: Record<string, unknown>;
  arrow: Record<string, unknown>;
}

export type PopoverSlots = {
  /** 触发元素。Popover 会克隆它以绑定 ref 与事件，因此必须是单个元素 */
  default?: Slot;
  /** 浮层内容。作用域参数提供 arrowRef 与 arrowStyles 以便自定义箭头 */
  content?: Slot;
};
