import { type App } from 'vue';

// 导入统一样式
import './style/index.css';

import * as components from './components';
import { version } from '../package.json';

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
  version: version ?? '',
};
// 组件：显式列出，不从 `./components` 星号导出。
// 原因：下面的 `./field`、`./label`、`./input` 星号导出也提供同名组件，
// 而 ESM 规范规定「同名由多个 `export *` 提供时会被静默排除」——
// 曾导致 `TLabel` 不出现在包入口。显式导出优先级高于星号导出，可消除歧义。
export {
  TButton,
  TDropdown,
  TField,
  TFileTree,
  TIcon,
  TInput,
  TLabel,
  TMenu,
  TPopover,
  TPortal,
  TTooltip,
  TTabs,
  TTablist,
  TTabPanel,
} from './components';

// 各组件的 hooks / 渲染函数 / 附加类型（THelperText 只在这里有）
export * from './field';
export * from './label';
export * from './input';
export type * from './interface';
export * from './icon/';
export type * from './shared/type';
export default TodayUI;
