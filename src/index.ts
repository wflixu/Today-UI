import { type App, type Plugin } from "vue";

import * as components from "./components";
import { version } from "../package.json";

function install(app: App, config?: Record<string, unknown>): void {
  Object.entries(components).forEach(([key, comp]) => {
    app.use(comp as Plugin, config);
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
