
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import { HstVue } from '@histoire/plugin-vue'

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
  histoire: {
    setupFile: 'src/histoire.setup.ts',
    storyMatch: [
      '**/*.story.vue',
    ],
    vite: {
      base: '/Today-UI/'
    },
    plugins: [
      HstVue(),
    ],
  },
  css: {
    postcss: {
      plugins: [postcssNested, postcssImport],
    },
  },
  publicDir: false,
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
        "radash",
      ],
      output: {
        exports: 'named',
        name: "TodayUI",
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          radash: "Radash",// TODO 删除依赖
          // "@floating-ui/vue": "FloatingUIVue",
        },
      },
    },
  },
});
