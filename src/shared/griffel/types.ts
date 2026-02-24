/**
 * Griffel Vue 类型定义
 * 用于组件样式系统的类型支持
 */

import type { GriffelStyle } from 'griffel-vue';

/**
 * 组件样式状态基础类型
 * 用于定义组件中各个元素的样式状态
 */
export interface ComponentStyleState {
  /** 根元素样式 */
  root?: GriffelStyle;
  /** 图标样式 */
  icon?: GriffelStyle;
  /** 前置内容样式 */
  contentBefore?: GriffelStyle;
  /** 后置内容样式 */
  contentAfter?: GriffelStyle;
  /** 其他自定义插槽样式 */
  [key: string]: GriffelStyle | undefined;
}

/**
 * 类名映射类型
 * 用于定义语义化类名
 */
export type ClassNameMap = Record<string, string>;

/**
 * Griffel 样式钩子类型
 * 用于定义应用样式到状态的函数类型
 */
export type StyleHook<TState extends ComponentStyleState> = (
  state: TState
) => void;

/**
 * 组件状态基础接口
 * 所有组件状态应该继承此接口
 */
export interface BaseComponentState {
  /** 根元素的虚拟节点属性 */
  root?: {
    className?: string;
    [key: string]: any;
  };
  /** 是否禁用 */
  disabled?: boolean;
  /** 其他自定义状态 */
  [key: string]: any;
}

/**
 * 样式变体类型
 * 用于定义组件的外观、尺寸、形状等变体
 */
export interface ComponentVariants {
  /** 外观变体 */
  appearance?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
  /** 尺寸变体 */
  size?: 'small' | 'medium' | 'large';
  /** 形状变体 */
  shape?: 'rounded' | 'square' | 'circular';
}

/**
 * Griffel 样式定义类型
 * 扩展 GriffelStyle 以支持更灵活的定义方式
 */
export type GriffelStylesDefinition = Record<string, GriffelStyle>;
