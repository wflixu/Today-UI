import { cn } from '../shared/styles/classUtils';

/**
 * Popover 组件的类名常量
 */
export const popoverClassNames = {
  root: 't-popover',
  content: 't-popover__content',
  arrow: 't-popover__arrow',
} as const;

/**
 * 状态类名
 */
export const popoverStateClasses = {
  visible: 'is-visible',
} as const;

export interface UsePopoverClassesOptions {
  visible?: boolean;
  /** 追加到浮层容器的类名，供消费组件定制外观 */
  extra?: string;
}

export interface PopoverClasses {
  root: string;
  content: string;
  arrow: string;
}

/**
 * Popover 组件类名 Hook。
 *
 * 浮层的方向不写成类名 —— 它在运行时会被 flip 中间件改变，
 * 用 `data-placement` 属性承载，CSS 里以属性选择器匹配（见 popover.css）。
 */
export function usePopoverClasses(options: UsePopoverClassesOptions = {}): PopoverClasses {
  const { visible = false, extra } = options;
  const stateClass = visible ? popoverStateClasses.visible : '';

  return {
    root: popoverClassNames.root,
    content: cn(popoverClassNames.root, popoverClassNames.content, stateClass, extra),
    arrow: cn(popoverClassNames.arrow, stateClass),
  };
}
