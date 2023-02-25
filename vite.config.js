
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  build: {
    target: 'esnext',
    lib: {
      entry: `./src/index`,
      name: "today-ui",
      fileName: (format) => `today-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue','lodash'],
      output: {
        name: 'todayUI',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          lodash: 'Lodash'
        },
      },
    }
  },
})

