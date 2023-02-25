import type { StorybookConfig } from "@storybook/vue3-vite";
import pluginVueJsx from '@vitejs/plugin-vue-jsx'
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    config.plugins = [
      ...config.plugins.filter(p => !Array.isArray(p)),
      pluginVueJsx({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      }),
    ];
    return config;
  },
};
export default config;
