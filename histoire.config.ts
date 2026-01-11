import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'src/histoire.setup.ts',
  storyMatch: ['**/*.story.vue'],
  theme: {
    title: 'TodayUI',
    logo: {
      square: './src/assets/icons/logo.png',
      light: './src/assets/icons/logo.png',
      dark: './src/assets/icons/logo.png',
    },
  },
  vite: {
    // Histoire 专用的 Vite 配置
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      postcss: {
        plugins: [
          require('postcss-nested'),
          require('postcss-import'),
        ],
      },
    },
  },
})
