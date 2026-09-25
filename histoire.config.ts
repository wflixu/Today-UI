import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

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

  // 文档站部署在 https://wflixu.github.io/Today-UI/ 这个**子路径**下。
  // Histoire 自己的 HistoireConfig 没有 base 选项，只能经 vite 透传。
  // 不设的话产物里的资源是 /assets/...，会被解析到域名根目录而 404 —— 整个页面白屏。
  // 换自定义域名时这里要改成 '/'。
  vite: {
    base: '/Today-UI/',
  },

  // 默认的 'history' 需要服务端把未知路径回退到 index.html，GitHub Pages 没有这个能力：
  // 在某个 story 页刷新、或把链接发给别人，都会拿到 GitHub 的 404 页。
  // 'hash' 是 Histoire 为「托管服务不支持 history 回退」准备的方案。
  routerMode: 'hash',

  theme: {
    title: 'TodayUI',
    logo: {
      square: './src/assets/icons/logo.png',
      light: './src/assets/icons/logo.png',
      dark: './src/assets/icons/logo.png',
    },
  },
});
