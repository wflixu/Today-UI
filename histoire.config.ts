import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'src/histoire.setup.ts',
  storyMatch: ['**/*.story.vue'],
  theme: {
    title: 'TodayUI',
    logo: {
      square: './public/icon/logo.png',
      light: './public/icon/logo.png',
      dark: './public/icon/logo.png',
    },
  },
  vite: {
    // Histoire 专用的 Vite 配置
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
