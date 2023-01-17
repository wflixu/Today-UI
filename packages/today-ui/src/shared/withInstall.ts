import { App, Component, ComputedOptions, MethodOptions, Plugin } from 'vue';

export type WithInstallType<T> = T & Plugin;

export const withInstall = <T extends Component<any, any, any, ComputedOptions, MethodOptions>>(comp: T , customName?: string): T & Plugin => {
  const c = comp as any;

  c.install = (app: App, name?: string) => {
    const defaultName = c.name.includes('-mapprops') ? c.name.replace('-mapprops', '') : c.name; // 正确命名map-props的组件
    app.component(customName || name || defaultName, comp);
  };

  return c as T & Plugin;
};

export default withInstall;
