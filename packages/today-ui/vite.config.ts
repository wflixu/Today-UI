import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  build: {
    target: 'esnext',
    // external: ["vue"],
    lib: {
      entry: `./components/index`,
      name: "today-ui",
      fileName: (format) => `today-ui.${format}.js`,
    },
  }
})

