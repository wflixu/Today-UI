# Today-UI Fluent Design 主题系统实施总结

## ✅ 已完成的工作

### 阶段 1: 基础设施建设

#### 1.1 Griffel 配置系统

**创建的文件**:
- [src/shared/griffel/index.ts](src/shared/griffel/index.ts) - Griffel Vue 配置和导出入口
- [src/shared/griffel/mergeClasses.ts](src/shared/griffel/mergeClasses.ts) - 类名合并工具函数

**关键实现**:
```typescript
// 直接使用 griffel-vue 的 API
export { makeStyles, makeResetStyles, RendererProvider } from 'griffel-vue';

// 自定义类名合并工具
export function mergeClasses(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

#### 1.2 主题令牌系统

**创建的文件**:
- [src/theme/tokens/light.css](src/theme/tokens/light.css) - 亮色主题变量（从 base.css 迁移）
- [src/theme/tokens/dark.css](src/theme/tokens/dark.css) - 暗色主题变量
- [src/theme/tokens/teams-light.css](src/theme/tokens/teams-light.css) - Teams 亮色主题
- [src/theme/tokens/teams-dark.css](src/theme/tokens/teams-dark.css) - Teams 暗色主题
- [src/theme/tokens/index.css](src/theme/tokens/index.css) - 主题令牌汇总导入

**修改的文件**:
- [src/style/base.css](src/style/base.css) - 重组为主题令牌导入结构

**CSS 变量结构**:
```css
/* 默认亮色主题 */
:root,
:root[data-theme="light"] {
  --colorBrandForeground1: #0f6cbd;
  /* ... 439 行设计令牌 ... */
}

/* 暗色主题 */
:root[data-theme="dark"] {
  --colorBrandForeground1: #479ef5;
  /* ... 暗色主题覆盖 ... */
}
```

#### 1.3 主题导出系统

**创建的文件**:
- [src/theme/index.ts](src/theme/index.ts) - 主题导出入口

**导出的主题**:
```typescript
export {
  webLightTheme,      // Web 亮色主题
  webDarkTheme,       // Web 暗色主题
  teamsLightTheme,    // Teams 亮色主题
  teamsDarkTheme,     // Teams 暗色主题
  teamsHighContrastTheme,  // 高对比度主题
} from '@fluentui/tokens';

export type { Theme } from '@fluentui/tokens';
```

---

### 阶段 2: Button 组件迁移（参考实现）

#### 2.1 Griffel 样式定义

**创建的文件**:
- [src/button/button.styles.ts](src/button/button.styles.ts) - Button 组件的 Griffel 样式

**关键特性**:
- 使用 `makeStyles` 定义所有样式变体
- 所有颜色、间距等使用 CSS 变量
- 伪类使用 `:hover`, `:active`, `:focus-visible` 语法
- 完整覆盖所有 appearance, size, shape 变体

**样式结构**:
```typescript
export const useButtonStyles = makeStyles({
  root: { /* 基础样式 */ },
  primary: { /* primary 外观 */ },
  outline: { /* outline 外观 */ },
  subtle: { /* subtle 外观 */ },
  transparent: { /* transparent 外观 */ },
  small: { /* 小尺寸 */ },
  large: { /* 大尺寸 */ },
  square: { /* 方形 */ },
  circular: { /* 圆形 */ },
  disabled: { /* 禁用状态 */ },
  icon: { /* 图标样式 */ },
});
```

#### 2.2 样式钩子更新

**修改的文件**:
- [src/button/useButtonStyles.styles.ts](src/button/useButtonStyles.styles.ts)

**核心改进**:
```typescript
import { useButtonStyles as useGriffelStyles } from './button.styles';
import { mergeClasses } from '@/shared/griffel/mergeClasses';

export const useButtonStyles_unstable = (state: ButtonState) => {
  const styles = useGriffelStyles();

  const rootClasses = [
    buttonClassNames.root,        // 语义化类名
    styles.root,                   // Griffel 基础样式
    state.appearance === 'primary' && styles.primary,
    // ... 其他变体
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses),
  };
};
```

**保留的特性**:
- ✅ 语义化类名 `.t-button` 保留
- ✅ 现有 CSS 文件保留作为降级方案
- ✅ 组件 API 完全不变

---

## 🎯 技术方案

### 混合架构

采用 **CSS 变量 + griffel-vue** 混合方案：

```
┌─────────────────────────────────────┐
│   组件样式 (griffel-vue)             │
│   - makeStyles()                    │
│   - 引用 CSS 变量                    │
├─────────────────────────────────────┤
│   设计令牌 (CSS Variables)           │
│   - :root 令牌定义                   │
│   - data-theme 切换                  │
├─────────────────────────────────────┤
│   TypeScript 类型                    │
│   - @fluentui/tokens 类型            │
└─────────────────────────────────────┘
```

**优势**:
- ✅ CSS 变量作为单一数据源，便于维护
- ✅ Griffel 生成原子化 CSS，性能优秀
- ✅ 语义化类名保留，便于调试
- ✅ 向后兼容，现有 CSS 文件保留

---

## 📊 验证结果

### 构建验证

```bash
✓ pnpm typecheck     # TypeScript 类型检查通过
✓ pnpm build:lib     # 库构建成功
  - dist/today-ui.es.js   219.44 kB
  - dist/today-ui.umd.js  247.18 kB
  - dist/today-ui.css      66.32 kB
```

### 功能验证

- ✅ Button 组件所有 appearance 变体正常工作
- ✅ 所有 size 变体正常工作
- ✅ 所有 shape 变体正常工作
- ✅ Disabled 状态正常
- ✅ 图标按钮正常
- ✅ Hover/Active/Focus 状态正常

---

## 📁 文件清单

### 新增文件 (7个)

1. [src/shared/griffel/index.ts](src/shared/griffel/index.ts) - Griffel 配置
2. [src/shared/griffel/mergeClasses.ts](src/shared/griffel/mergeClasses.ts) - 类名合并工具
3. [src/theme/tokens/light.css](src/theme/tokens/light.css) - 亮色主题
4. [src/theme/tokens/dark.css](src/theme/tokens/dark.css) - 暗色主题
5. [src/theme/tokens/teams-light.css](src/theme/tokens/teams-light.css) - Teams 亮色
6. [src/theme/tokens/teams-dark.css](src/theme/tokens/teams-dark.css) - Teams 暗色
7. [src/button/button.styles.ts](src/button/button.styles.ts) - Button Griffel 样式

### 修改文件 (3个)

1. [src/style/base.css](src/style/base.css) - 重组为主题令牌导入
2. [src/button/useButtonStyles.styles.ts](src/button/useButtonStyles.styles.ts) - 集成 Griffel
3. [src/theme/index.ts](src/theme/index.ts) - 新增主题导出

### 保留文件（不变）

- [src/button/button.css](src/button/button.css) - 降级方案
- 所有其他组件的 `.css` 文件

---

## 🚀 下一步工作

### 短期（1-2周）

1. **迁移核心组件**
   - Dialog
   - Dropdown
   - Menu

2. **完善文档**
   - Histoire 文档更新
   - 创建迁移指南

### 中期（3-4周）

1. **迁移布局组件**
   - Tabs
   - Toast
   - Tooltip

2. **性能优化**
   - 建立性能基准
   - 优化 CSS 变量更新

### 长期（2-3个月）

1. **迁移所有组件**
   - FileTree
   - 其他辅助组件

2. **主题切换功能**（P2优先级）
   - FluentProvider 组件
   - 主题切换器组件
   - 运行时主题切换

---

## 📚 使用示例

### 基础使用

```vue
<script setup lang="ts">
import { TButton } from 'today-ui';
</script>

<template>
  <TButton appearance="primary">Primary Button</TButton>
</template>
```

### 主题令牌使用（开发者）

```typescript
// 在组件样式中使用 CSS 变量
import { makeStyles } from '@/shared/griffel';

const useStyles = makeStyles({
  myComponent: {
    color: 'var(--colorNeutralForeground1)',
    backgroundColor: 'var(--colorBrandBackground)',
    padding: 'var(--spacingHorizontalM)',
  },
});
```

### 主题切换（未来功能）

```vue
<script setup>
import { FluentProvider, webLightTheme, webDarkTheme } from 'today-ui';

const isDark = ref(false);
const currentTheme = computed(() =>
  isDark.value ? webDarkTheme : webLightTheme
);
</script>

<template>
  <FluentProvider :theme="currentTheme">
    <!-- 应用内容 -->
  </FluentProvider>
</template>
```

---

## 🎉 总结

### 成就

✅ **建立了完整的主题系统架构**
- CSS 变量 + griffel-vue 混合方案
- 4 个预设主题（Web/Teams × Light/Dark）
- 完整的 TypeScript 类型支持

✅ **完成了 Button 组件的 Griffel 迁移**
- 作为其他组件的参考实现
- 保持了 100% API 兼容性
- 保留了语义化类名和 CSS 降级

✅ **构建和类型检查全部通过**
- 零破坏性变更
- 向后兼容

### 符合规范

- ✅ FR-003: 使用 griffel-vue CSS-in-JS 方案
- ✅ 与 @fluentui/react-components API 对齐
- ✅ 渐进式迁移，保持向后兼容

---

## 📖 参考资料

- [griffel-vue GitHub](https://github.com/wflixu/griffel-vue)
- [Fluent UI Styles Handbook](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/styles-handbook.md)
- [@fluentui/tokens](https://github.com/microsoft/fluentui/tree/master/packages/tokens)
