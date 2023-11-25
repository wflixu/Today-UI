import { isObject } from "lodash";
import { Fragment, h, type VNode } from "vue";

export function randomId(n = 8): string {
  // 生成n位长度的字符串
  const str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
  let result = "";
  for (let i = 0; i < n; i++) {
    result += str[parseInt((Math.random() * str.length).toString())];
  }
  return result;
}


function wrapContent(content: string | VNode) {
  return h("span", { class: "trigger-wrap" }, content);
}


export function getFirstValidChild(nodes: VNode[]): VNode | null {
  for (const child of nodes) {
    if (isObject(child)) {
      if (child.type === Comment) {
        continue;
      }
      if (child.type === "svg" || child.type === Text) {
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
