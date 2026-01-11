import { type App } from "vue";

// 导入统一样式
import './style/index.css';

import * as components from "./components";
import { version } from "../package.json";

function install(app: App): void {
  // 注册所有组件到全局
  Object.entries(components).forEach(([, component]) => {
    // 类型守卫：确保 component 不为 null 且有 name 属性
    if (component) {
      const comp = component as { name?: string };
      if (comp.name) {
        app.component(comp.name, component);
      }
    }
  });
}

const TodayUI = {
  install,
  version: version ?? "",
};
export * from "./components";
export type * from "./interface";
export * from "./icon/";
export type * from "./shared/type";
export default TodayUI;
