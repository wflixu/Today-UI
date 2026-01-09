/**
 * Griffel Vue Configuration
 * griffel-vue 的导出入口和工具函数
 */

// 直接导出 griffel-vue 的 API
export {
  makeStyles,
  makeResetStyles,
  makeStaticStyles,
  mergeClasses as griffelMergeClasses,
  RendererProvider,
  useRenderer_unstable,
  TextDirectionProvider,
} from 'griffel-vue';

// 导出类型
export type { GriffelStyle, GriffelRenderer } from 'griffel-vue';
