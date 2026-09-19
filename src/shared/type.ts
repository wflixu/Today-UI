export type CSSSelector = string;
export type AttachNodeReturnValue = HTMLElement | Element | Document;

/**
 * Teleport 的挂载目标。
 *
 * 三种形式：
 * - 选择器字符串 —— `'body'`、`'#app'`
 * - DOM 元素     —— 直接传入节点
 * - 函数         —— 延迟求值，可接收触发元素作为参数（用于挂载到触发元素就近的容器）
 *
 * 求值失败时统一回退到 `document.body`。
 */
export type AttachNode =
  | CSSSelector
  | HTMLElement
  | ((triggerNode?: HTMLElement) => AttachNodeReturnValue);

export type { WithInstallType } from './withInstall';
