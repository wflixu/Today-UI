import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["node_modules", "dist", "e2e/*", "react-components"],
    root: __dirname,
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
});
