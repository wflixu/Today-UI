import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";

import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [postcssNested, postcssImport],
    },
  },
  build: {
    target: "esnext",
    lib: {
      entry: `./src/index`,
      name: "today-ui",
      fileName: (format) => `today-ui.${format}.js`,
    },
    minify: false,
    rollupOptions: {
      external: [
        "vue",
        "lodash",
      ],
      output: {
        name: "todayUI",
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          lodash: "Lodash",// TODO 删除依赖
          // "@floating-ui/vue": "FloatingUIVue",
        },
      },
    },
  },
});
