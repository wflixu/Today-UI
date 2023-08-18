import { h, Comment, Text, Fragment, type InjectionKey, type Ref } from 'vue';
import { isObject } from '@vue/shared';
import type { ComponentPublicInstance, VNode } from 'vue';
export const FLOAT_TRIGGER_TOKEN: InjectionKey<Ref> =
  Symbol("floating-trigger");


function wrapContent(content: string | VNode) {
    return h('span', { class: "float-trigger-wrap" }, content);
  }
  
  export function getFirstValidChild(nodes: VNode[]): VNode | null {
    for (const child of nodes) {
      if (isObject(child)) {
        if (child.type === Comment) {
          continue;
        }
        if (child.type === 'svg' || child.type === Text) {
          return wrapContent(child);
        }
        if (child.type === Fragment) {
          return getFirstValidChild(child.children as VNode[]);
        }
        return child;
      }
      return wrapContent(child);
    }
  
    return null;
  }
  


  /**
 * 提取 Vue Intance 中的元素，如果本身就是元素，直接返回。
 * @param {any} element
 * @returns {Element | null}
 */
export function getElement(
  element: Element | ComponentPublicInstance | null
): Element | null {
  if (element instanceof Element) {
    return element;
  }
  if (
    element &&
    typeof element === 'object' &&
    element.$el instanceof Element
  ) {
    return element.$el;
  }
  return null;
}


export function subscribeEvent(
  dom: Element | Document | null | undefined,
  type: string,
  callback: EventListenerOrEventListenerObject
): () => void {
  dom?.addEventListener(type, callback);
  return () => {
    dom?.removeEventListener(type, callback);
  };
}