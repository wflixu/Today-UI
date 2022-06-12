import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    lib: {
      entry: `./src/index`,
      name: "use-floating",
      fileName: (format) => `use-floating.${format}.js`,
    },
  }
})
