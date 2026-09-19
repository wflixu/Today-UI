import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue(), vueJsx()],

  // public/ 只放 Histoire 演示资源，不应进入库产物
  publicDir: false,

  // Vite 不读 tsconfig 的 paths，需显式配置
  resolve: {
    alias: { '@': resolve(root, 'src') },
  },

  // 与 Histoire 共用同一套 PostCSS 管线，保证 dev 与 build 的 CSS 一致
  css: {
    postcss: {
      // 顺序不可调换：先展开 @import，再降级 CSS 嵌套
      plugins: [postcssImport(), postcssNested()],
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: false,
    sourcemap: true,

    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es'],
      // 与 package.json 的 "./style.css" 导出对应（Vite 会自动补 .css 后缀）
      cssFileName: 'style',
    },

    // 全部 CSS 合并为单个文件（默认按 chunk 拆分）
    cssCodeSplit: false,

    rollupOptions: {
      external: ['vue', '@floating-ui/vue', 'radash'],
      output: {
        // 保留模块结构，支持按需导入与 tree-shaking
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
})
