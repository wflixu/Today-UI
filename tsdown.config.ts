import { defineConfig } from 'tsdown'

export default defineConfig({
  // 入口文件
  entry: ['src/index.ts'],

  // 输出目录
  outDir: 'dist',

  // 输出格式：仅 ESM
  format: 'esm',

  // TypeScript 配置
  tsconfig: './tsconfig.json',

  // 外部依赖（不打包）
  external: [
    'vue',
    '@floating-ui/vue',
    'griffel-vue',
    'radash',
  ],

  // 生成类型定义
  dts: {
    // 是否生成 .d.ts 文件
    enabled: true,
  },

  // 代码分割（按需导入）
  unbundle: true,

  // 清理输出目录
  clean: true,

  // 目标环境
  target: 'esnext',

  // 不压缩（库代码）
  minify: false,

  // Source map
  sourcemap: true,
})
