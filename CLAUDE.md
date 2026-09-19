# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目背景

Today-UI 是一个基于 Vue 3 的组件库，目标是实现微软的 Fluent Design System。本项目旨在将 @fluentui/react-components 转录到 Vue 3 生态系统中，保持相同的功能和设计规范，但使用 Vue 3 + TypeScript + TSX 技术栈实现。

### 核心目标
- 将微软官方的 React Fluent Design 组件库转录到 Vue 3 生态
- 接口兼容 @fluentui/react-components
- 使用纯 CSS Variables + CSS `@layer` 分层（不使用 CSS-in-JS，详见 [specs/style.md](specs/style.md)）
- 专注实现基础功能，适合个人开发节奏

## 开发命令

### 开发与文档
- `pnpm dev` - 启动 Histoire 开发服务器，用于组件开发和文档编写
- `pnpm doc:preview` - 预览构建好的 Histoire 文档
- `pnpm doc` - 构建 Histoire 文档

### 构建与类型生成
- `pnpm build` - 使用 Vite 构建库（`vite build` + `vue-tsc` 生成类型）
- `pnpm build:watch` - 监听模式构建

### 测试与代码质量
- `pnpm test` - 在 jsdom 环境中运行 Vitest 单元测试
- `pnpm test:watch` - 监听模式运行测试
- `pnpm typecheck` - 对测试进行类型检查
- `pnpm lint` - 运行 ESLint 并自动修复

## 技术架构

### 核心依赖
- **Vue 3.5+** + Composition API - 组件基础框架
- **@floating-ui/vue** - 弹出层组件的核心定位引擎
- **纯 CSS Variables** - 样式方案，440+ Fluent Design 令牌，无运行时开销
- **TypeScript 5.x** - 完整的类型安全支持
- **Vite** - 库构建工具（library mode，纯 ESM 输出）
- **pnpm** - 使用pnpm 作为包管理器
- **Histoire** - 组件文档和测试
- **Vitest** - 单元测试框架

### 组件开发模式

> ⚠️ **仓库里并存两代组件**。新组件请follow**新式**（button / input / label / field / tooltip）。
> 旧式（dropdown / dialog / menu / file-tree / tabs / toast）是遗留，仅在改动它们时参考。

| | 新式（**新组件照这套**） | 旧式（遗留） |
|---|---|---|
| 组件 | button、input、label、field、tooltip | dropdown、dialog、menu、file-tree、tabs、toast |
| props 文件 | 单一 `Xxx.types.ts`（四段式） | 拆分 `props.ts` + `type.ts` |
| 注册导出 | `export { TXxx } from './Xxx'` + `as default` | `withInstall(_Xxx)` |

**新式组件的文件构成**：

- `Xxx.tsx` - `defineComponent` + `computed` 生成 state + 类名回写到 `state.root.className` + 返回渲染函数
- `Xxx.types.ts` - 四段式：字面量 union 类型 / `xxxProps` 对象（带 JSDoc + `@default`）/ `XxxProps = ExtractPropTypes<...>` / `XxxState` interface + `XxxSlots`
- `useXxx.ts` - 返回 state 对象，三段式：透传 props / 派生状态 / **每个 DOM 元素一个 `Record<string, any>`**。`root` 初建时**不含 className**，由组件后填
- `renderXxx.ts` - 渲染函数，用 `h()` 而非 JSX（全库无 `renderXxx.tsx` 用 JSX 的先例）
- `useXxxClasses.ts` - `xxxClassNames` 常量 + `xxxVariants` 映射 + hook；**默认值不产类名**
- `xxx.css` - 组件样式
- `index.ts` - barrel 导出
- `docs/<ComponentName>.story.vue` - Histoire 示例
- `docs/SPEC.md` - 组件设计规格（可选）
- `tests/<ComponentName>.test.ts` - 单元测试（必需）

**注册点有三处**（缺一不可）：

1. `src/components.ts` - 否则不会被打包导出
2. `src/style/index.css` - 否则样式不会进入产物（若样式由组件自身 `import` 则可省）
3. `src/interface.ts` - 对外暴露的 props 类型白名单

### 主要组件类型
- **Tooltip** - 工具提示功能
- **Dropdown** - 下拉菜单及触发器
- **Menu** - 上下文菜单和导航菜单
- **Dialog** - 模态对话框和确认对话框
- **FileTree** - 支持懒加载的层次化文件树
- **Toast** - 通知系统
- **Button** - 按钮组件
- **Icon** - SVG 图标系统

### 共享工具

`src/shared/` 下多数文件**没有实际被引用**，写新组件时只需这三个：

| 可复用 | 路径 | 用途 |
|---|---|---|
| `cn()` | `@/shared/styles/classUtils` | 类名拼接，所有 `useXxxClasses` 都用它 |
| `AttachNode` | `shared/type` | 弹层挂载点类型（Tooltip 已这样用） |
| `withInstall` | `shared/withInstall` | 旧式组件给组件挂 `install` |

**不要引用**（零引用或已损坏的死代码）：

- `shared/dom.ts` - 零引用。注意 `tooltip/renderTooltip.tsx` 里另有一份私有 `getAttach`，两者不共用
- `shared/bem.ts` - 零引用（其 mod 分隔符是 `_`，与 `.t-x--y` 不匹配）
- `shared/render-tnode.ts` - 零引用
- `shared/theme/` - 有断链 import，指向不存在的路径
- `shared/types.ts` 的 `UnknownSlotProps` - 引用不存在的全局类型，实际是坏的
- `classUtils.ts` 的 `buildVariantClasses` / `bem` - 零引用

其他关键位置：

- `src/style/index.css` - 全库样式入口
- `src/theme/tokens/` - 440+ 设计令牌（light / dark / teams-light / teams-dark）
- `src/components.ts` - 组件导出清单（决定全局注册与打包）

### 样式架构规范

样式方案是**纯 CSS Variables**（不使用 CSS-in-JS），完整规范见 [specs/style.md](specs/style.md)。

> ⏳ **`@layer` 分层尚未落地。** 当前代码中没有任何 `@layer` 语句（`grep -rn "@layer" src --include="*.css"` 零命中），下面描述的是**目标约定**——写新组件时请遵守，但要知道现状不符，另有 5 个组件 CSS 违反「不 `@import` 令牌」这条。

目标的三层结构（优先级由低到高）：`tui.tokens` → `tui.base` → `tui.components`。

**关键约束**：

- 组件 CSS 文件**不写 `@layer`**，层包装只写在 `src/style/index.css`
- 组件 CSS **不得 `@import` 令牌文件**，令牌由入口统一引入
- **禁止 `!important`**——它会突破 `@layer` 边界，破坏用户覆盖能力
- 组件 CSS **允许**原生 CSS 嵌套（`&:hover`），但 `&` 必须显式书写，嵌套不超过 3 层
- 消费者未分层的样式天然优先，这是「用户覆盖组件样式」的机制

**浏览器基线**：Chrome/Edge 105+、Safari 15.4+、Firefox 121+（由 `:has()` 决定，嵌套已在构建期由 `postcss-nested` 扁平化，不是门槛）

### 构建配置
- **构建工具**: Vite library mode（`vite.config.mts`）
- **输出格式**: 仅 ESM（`.js`，`preserveModules` 保留模块结构）
- **外部依赖**: Vue、@floating-ui/vue、radash
- **CSS 处理**: `postcss-import` 展开 `@import` → `postcss-nested` 扁平化嵌套 → 合并为单个 `dist/style.css`
- **类型生成**: `vue-tsc --noCheck --emitDeclarationOnly`（独立步骤，见 `build:types`）
- **dev 与 build 共用同一份 Vite 配置**：Histoire 会自动加载根配置，不要在 `histoire.config.ts` 里重复声明 `vue()`/`vueJsx()`
- **按需导入**: 保留模块结构，支持按需导入组件

### 文档系统
- **Histoire** 用于组件文档和交互示例
- `*.story.vue` 文件编写示例
- `src/histoire.setup.ts` 自定义设置

## 开发工作流

1. 使用 `pnpm dev` 启动开发服务器，支持热重载
2. 在对应的 `src/` 文件夹中创建/更新组件
3. 使用 `*.story.vue` 文件添加文档示例
4. 运行 `pnpm build` 验证所有构建工作正常
5. 使用 `pnpm test` 进行组件测试

## 关键模式

- 所有组件使用 TypeScript 并定义合适的 props
- **组件名一律加 `T` 前缀**（`TButton`、`TInput`、`TDropdown`…）。`defineComponent` 的 `name` 与导出符号必须同名同前缀
- 一致的命名约定：组件使用 PascalCase，props 使用 kebab-case
- Fluent Design 令牌和样式模式
- 在示例中使用 Composition API 和 `<script setup>` 语法

### 为什么组件名必须加 `T`

`app.use(TodayUI)` 会把组件注册到**全局命名空间**，与第三方库和用户自建组件共享。Fluent React 不加前缀是因为 **React 没有全局组件注册**（每个组件都是显式 import），该约定不适用于 Vue。

不加前缀会造成静默遮蔽——本项目已有实例：typster 里 Today-UI 的 `Button` 被 PrimeVue 的 `Button` 覆盖，不报错、不警告，只是渲染了另一个组件。

Vue 生态中走全局注册的库都加前缀：Vuetify `V`、Element Plus `El`、Arco `A`、Naive UI `N`。

> 类型名**不加**前缀（组件是 `TButton`，props 类型仍是 `ButtonProps`）。类型只在模块作用域，不进全局命名空间，无碰撞风险；且保持与上游 `@fluentui/react-components` 的对齐。Element Plus 同样是 `ElButton` + `ButtonProps`。

## 转录指导原则

当从 @fluentui/react-components 转录组件时：
1. 保持相同的 API 接口和 props 定义
2. 使用纯 CSS Variables + BEM 类名替代 @griffel/react 的 CSS-in-JS 实现
3. 将 React hooks 转换为 Vue 3 Composition API
4. 将 JSX 转换为 TSX 语法
5. 保持组件行为和视觉效果的一致性

## 开发规范

### 单元测试要求

**每个组件都必须编写单元测试。**

#### 测试文件规范

- **文件位置**：测试文件必须放在组件目录下的 `tests/` 子目录中
  ```
  src/<component-name>/
    ├── tests/
    │   └── <ComponentName>.test.ts  ✅ 单元测试
    ├── <ComponentName>.tsx
    └── ...
  ```

- **文件命名**：使用 `.test.ts` 后缀（不是 `.spec.ts`）
- **参考示例**：[src/button/tests/Button.test.ts](src/button/tests/Button.test.ts)

#### 测试覆盖范围

每个组件测试必须包含：

1. **Props 渲染测试** - 验证所有 props 都能正确渲染
2. **事件处理测试** - 验证所有事件都能正确触发
3. **插槽测试** - 验证所有插槽都能正确渲染
4. **动态 Props 更新测试** - 验证响应式更新
5. **废弃警告测试**（如适用）- 验证废弃 props 会显示警告
6. **无障碍性相关测试** - 验证自定义属性和表单属性支持
7. **边界情况测试** - 验证极端情况（空内容、超长文本等）

#### 测试命令

```bash
# 运行所有测试
pnpm test

# 运行特定组件测试
pnpm test src/<component-name>/tests/<ComponentName>.test.ts

# 监听模式（开发时使用）
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

#### 覆盖率要求

- **语句覆盖率**: ≥ 80%
- **分支覆盖率**: ≥ 75%
- **函数覆盖率**: ≥ 80%
- **行覆盖率**: ≥ 80%

#### 详细测试规范

完整的测试规范、最佳实践和示例，请参考：
- **[specs/testing-guidelines.md](specs/testing-guidelines.md)** - 完整的组件测试规范文档

### 无障碍性（Accessibility）

**本组件库不处理无障碍性相关功能。**

- **不实现 ARIA 属性**：不添加 aria-label、aria-describedby、aria-expanded 等 WAI-ARIA 属性
- **不实现键盘导航**：除了浏览器默认行为外，不添加自定义键盘事件处理（如 onKeyDown、onKeyUp）
- **不处理屏幕阅读器**：不考虑屏幕阅读器兼容性
- **不实现 role 和 tabIndex**：不设置这些无障碍性相关属性

#### 原因
- 本项目为个人组件库，专注于实现 Fluent Design 的视觉效果和基础交互功能
- 无障碍性实现复杂且需要大量测试和维护
- 如需无障碍性支持，用户可以在应用层自行添加相关属性和逻辑

#### 注意事项
如果 @fluentui/react-components 源码中包含无障碍性相关 props 或逻辑，**不要转录**这些部分。只关注：
- 视觉样式（颜色、尺寸、形状等）
- 基础交互（点击、禁用、加载状态等）
- 组件的核心功能
