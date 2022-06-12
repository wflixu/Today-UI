import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: `./src/index`,
      name: "floating-ui",
      fileName: (format) => `floating-ui.${format}.js`,
    },
  },
});
