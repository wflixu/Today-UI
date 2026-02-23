import { ExtractPropTypes, PropType, Slot } from 'vue';

export type InputAppearance = 'outline' | 'filled' | 'underlined' | 'inline-dark' | 'inline-light';
export type InputSize = 'small' | 'medium' | 'large';

// Props 定义
export const inputProps = {
  /**
   * Input 组件的外观样式
   * - 'outline': 带边框的标准输入框（默认）
   * - 'filled': 填充背景的输入框
   * - 'underlined': 仅底部边框的输入框
   * - 'inline-dark': 深色内联样式
   * - 'inline-light': 浅色内联样式
   *
   * @default 'outline'
   */
  appearance: {
    type: String as PropType<InputAppearance>,
    default: 'outline'
  },

  /**
   * Input 组件的尺寸
   * - 'small': 28px 高度
   * - 'medium': 32px 高度（默认）
   * - 'large': 40px 高度
   *
   * @default 'medium'
   */
  size: {
    type: String as PropType<InputSize>,
    default: 'medium'
  },

  /**
   * 禁用输入框
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * 只读状态
   *
   * @default false
   */
  readonly: {
    type: Boolean,
    default: false
  },

  /**
   * 必填状态（显示必填标记）
   *
   * @default false
   */
  required: {
    type: Boolean,
    default: false
  },

  /**
   * 错误状态
   *
   * @default false
   */
  error: {
    type: Boolean,
    default: false
  },

  /**
   * 验证状态
   * - 'none': 无验证状态（默认）
   * - 'valid': 验证通过
   * - 'warning': 警告状态
   * - 'invalid': 验证失败
   *
   * @default 'none'
   */
  validationState: {
    type: String as PropType<'none' | 'valid' | 'warning' | 'invalid'>,
    default: 'none'
  },

  /**
   * 验证消息
   */
  validationMessage: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 显示清除按钮（仅在有值且非禁用/只读时显示）
   *
   * @default true
   */
  showClearButton: {
    type: Boolean,
    default: true
  },

  /**
   * 显示密码显示/隐藏按钮（仅 type="password" 时有效）
   *
   * @default false
   */
  showPasswordToggle: {
    type: Boolean,
    default: false
  },

  /**
   * 进度值（0-100）
   */
  progress: {
    type: Number,
    default: undefined as undefined
  },

  /**
   * 输入框的值（v-model）
   */
  modelValue: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 默认值（非受控模式）
   */
  defaultValue: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 占位符文本
   */
  placeholder: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 最大输入长度
   */
  maxLength: {
    type: Number,
    default: undefined as undefined
  },

  /**
   * 最小输入长度
   */
  minLength: {
    type: Number,
    default: undefined as undefined
  },

  /**
   * 输入框类型
   */
  type: {
    type: String as PropType<'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'>,
    default: 'text'
  },

  /**
   * 输入框唯一标识符
   */
  id: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 输入框名称
   */
  name: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 自动完成行为
   */
  autocomplete: {
    type: String,
    default: undefined as undefined
  },

  /**
   * 值变化事件
   */
  onChange: {
    type: Function as PropType<(value: string, event: Event) => void>,
    default: undefined as undefined
  },

  /**
   * 输入事件
   */
  onInput: {
    type: Function as PropType<(value: string, event: Event) => void>,
    default: undefined as undefined
  },

  /**
   * 获得焦点事件
   */
  onFocus: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined as undefined
  },

  /**
   * 失去焦点事件
   */
  onBlur: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined as undefined
  },
};

export type InputProps = ExtractPropTypes<typeof inputProps>;

export interface InputState {
  // Props 状态
  appearance: InputAppearance;
  size: InputSize;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: boolean;
  type: string;
  id: string | undefined;
  name: string | undefined;
  autocomplete: string | undefined;
  placeholder: string | undefined;
  maxLength: number | undefined;
  minLength: number | undefined;
  value: string;
  validationState: 'none' | 'valid' | 'warning' | 'invalid';
  validationMessage: string | undefined;
  showClearButton: boolean;
  showPasswordToggle: boolean;
  progress: number | undefined;

  // 计算状态
  hasContentBefore: boolean;
  hasContentAfter: boolean;
  showClearButtonVisible: boolean;
  showPasswordToggleVisible: boolean;
  isPasswordVisible: boolean;
  hasClearButtonSlot: boolean;
  hasPasswordToggleButtonSlot: boolean;
  hasProgressIndicatorSlot: boolean;

  // 事件处理
  onInput: (event: Event) => void;
  onChange: (event: Event) => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
  onClear: () => void;
  onPasswordToggle: () => void;

  // 元素配置
  root: Record<string, any>;
  input: Record<string, any>;
  contentBefore?: Record<string, any>;
  contentAfter?: Record<string, any>;
  clearButton?: Record<string, any>;
  passwordToggleButton?: Record<string, any>;
  progressIndicator?: Record<string, any>;
}

export interface InputSlots {
  /**
   * 输入框内容前的图标
   */
  contentBefore?: Slot;

  /**
   * 输入框内容后的图标（如清除按钮、眼睛图标等）
   */
  contentAfter?: Slot;

  /**
   * 清除按钮插槽
   */
  clearButton?: Slot;

  /**
   * 密码显示/隐藏切换按钮插槽
   */
  passwordToggleButton?: Slot;

  /**
   * 进度指示器插槽
   */
  progressIndicator?: Slot;

  /**
   * 默认内容（通常为空，input 不需要默认内容）
   */
  default?: Slot;
}
