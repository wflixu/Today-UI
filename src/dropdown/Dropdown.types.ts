import { type ExtractPropTypes, type PropType, type Slot } from 'vue';
import type { Placement } from '@floating-ui/vue';
import type { AttachNode } from '../shared/type';
import type { IMenuOption } from '../menu/type';

// ========== 1. 字面量 union 类型 ==========

/**
 * 触发方式。
 *
 * 注意：迁移前类型里还有一个 `'manually'`，但实现中的 if/else 链没有对应分支，
 * 等于「不注册任何事件」—— 与 `'manual'` 语义重复且从未生效，故移除。
 */
export type DropdownTrigger = 'click' | 'hover' | 'contextmenu' | 'manual';

/** 菜单项。取 Menu 组件选项的子集，只要求 label 与 key */
export type IDropdownOption = Pick<IMenuOption, 'label' | 'key'>;

// ========== 2. props 定义 ==========

export const dropdownProps = {
  /**
   * 受控的开合状态。传入时组件为受控模式，配合 `v-model:visible` 使用。
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

  /**
   * 触发方式。`hover` 与 `contextmenu` 分别对应悬停与右键。
   *
   * @default 'click'
   */
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'click',
  },

  /**
   * 菜单项列表。
   *
   * @default []
   */
  options: {
    type: Array as PropType<IDropdownOption[]>,
    default: () => [] as IDropdownOption[],
  },

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
   * 浮层与触发元素的间距（px）。
   *
   * @default 4
   */
  offset: {
    type: Number,
    default: 4,
  },

  /**
   * 浮层的挂载目标。
   *
   * @default 'body'
   */
  attach: {
    type: [String, Object, Function] as PropType<AttachNode>,
    default: 'body',
  },

  /**
   * 为 true 时不使用 Teleport，浮层原地渲染。
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

// ========== 3. Props 类型 ==========

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;

// ========== 4. State 与 Slots ==========

export interface DropdownState {
  /** Props passed at the top-level */
  visible: boolean;
  trigger: DropdownTrigger;
  options: IDropdownOption[];
  placement: Placement;
  offset: number;

  /** State calculated from a set of props */
  /** 浮层是否可见（受控时取 props.visible，否则取内部状态） */
  open: boolean;

  /** Element configuration */
  menu: Record<string, unknown>;
}

export type DropdownSlots = {
  /** 触发元素。必须是单个元素 */
  default?: Slot;
  /** 自定义菜单内容，优先于 `options` prop */
  menu?: Slot;
};
