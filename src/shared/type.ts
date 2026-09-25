export type CSSSelector = string;
export type AttachNodeReturnValue = HTMLElement | Element | Document;

/**
 * 可以被解析成挂载元素的取值。
 * 注意 `Document` 也在内 —— 它是函数可能返回的结果之一，解析时取其 body。
 */
export type AttachNodeTarget = CSSSelector | HTMLElement | AttachNodeReturnValue;

/**
 * Teleport 的挂载目标。
 *
 * 三种形式：
 * - 选择器字符串 —— `'body'`、`'#app'`
 * - DOM 元素     —— 直接传入节点
 * - 函数         —— 延迟求值，可接收触发元素作为参数（用于挂载到触发元素就近的容器）；
 *                   返回值本身也可以再是选择器或元素，会被继续解析
 *
 * 求值失败时统一回退到 `document.body`。
 */
export type AttachNode = AttachNodeTarget | ((triggerNode?: HTMLElement) => AttachNodeTarget);

export type { WithInstallType } from './withInstall';
