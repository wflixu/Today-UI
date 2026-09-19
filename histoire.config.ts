import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

// Vite 相关配置（plugins / resolve.alias / css.postcss）统一由根目录的
// vite.config.mts 提供 —— Histoire 会自动加载并合并它。
//
// 不要在下面的 `vite` 块里重复声明 vue()/vueJsx()：那会让插件被加载两次，
// 造成 Histoire 注入的 __moduleId 重复声明而报 SyntaxError。
//
// 好处是文档（dev）与库构建（build）共用同一套 PostCSS 管线，
// 不会出现「Histoire 里样式正常、打包产物里令牌丢失」这类不一致。
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
})
