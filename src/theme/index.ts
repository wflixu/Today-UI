/**
 * Today-UI Theme System
 * 导出 Fluent Design 主题和类型
 */

// 重新导出 @fluentui/tokens 的预设主题
export {
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/tokens';

// 导出主题类型
export type { Theme } from '@fluentui/tokens';

// 导出 CSS 令牌文件（供直接导入使用）
export './tokens/index.css';
