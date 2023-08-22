
import type { App } from "vue";
import Dropdown from "./Dropdown";

export { Dropdown };

export * from "./props-type";

export default {
  title: "Dropdown 下拉菜单",
  status: "50%",
  install(app: App): void {
    app.component(Dropdown.name, Dropdown);
  },
};
