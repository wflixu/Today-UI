import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    external: ["vue"],
    lib: {
      entry: `./components/index`,
      name: "today-ui",
      fileName: (format) => `today-ui.${format}.js`,
    },
  }
})

