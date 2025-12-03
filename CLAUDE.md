# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目背景

Today-UI 是一个基于 Vue 3 的组件库，目标是实现微软的 Fluent Design System。本项目旨在将 @fluentui/react-components 转录到 Vue 3 生态系统中，保持相同的功能和设计规范，但使用 Vue 3 + TypeScript + TSX 技术栈实现。

### 核心目标
- 将微软官方的 React Fluent Design 组件库转录到 Vue 3 生态
- 接口兼容 @fluentui/react-components
- 使用 griffel-vue（从 @griffel/react 转录的 CSS-in-JS 解决方案）
- 专注实现基础功能，适合个人开发节奏

## 开发命令

### 开发与文档
- `pnpm dev` - 启动 Histoire 开发服务器，用于组件开发和文档编写
- `pnpm story:preview` - 预览构建好的 Histoire 文档
- `pnpm doc` - 构建 Histoire 文档

### 构建与类型生成
- `pnpm build` - 完整构建：Vite 构建 + TypeScript 类型生成 + API 提取
- `pnpm b` - 仅执行 Vite 构建
- `pnpm bt` - 为构建生成 TypeScript 类型
- `pnpm build:type` - 使用 vue-tsc 生成 TypeScript 类型

### 测试与代码质量
- `pnpm test:unit` - 在 jsdom 环境中运行 Vitest 单元测试
- `pnpm typecheck` - 对测试进行类型检查
- `pnpm lint` - 运行 ESLint 并自动修复

## 技术架构

### 核心依赖
- **Vue 3.5+** + Composition API - 组件基础框架
- **@floating-ui/vue** - 弹出层组件的核心定位引擎
- **griffel-vue** - CSS-in-JS 样式解决方案（Fluent Design 实现）
- **TypeScript 5.x** - 完整的类型安全支持

### 组件开发模式
每个组件遵循一致的结构模式：
- `.tsx` 文件 - 主要组件逻辑，使用 TSX 语法
- `props.ts` - 组件 props 定义
- `type.ts` - TypeScript 类型和接口定义
- `.story.vue` - Histoire 文档和示例
- `style/` 文件夹 - 组件特定样式（需要时）

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
- `src/shared/` - 通用工具、DOM 辅助函数、BEM 样式、渲染函数
- `src/style/` - 基础 CSS 和设计令牌
- `components.ts` - 组件注册和导出

### 构建配置
- **库模式**: Vite 构建 UMD、ES 模块和 TypeScript 定义
- **外部依赖**: Vue 和 radash 在构建时外部化
- **CSS 处理**: PostCSS 支持嵌套和导入
- **类型生成**: API Extractor 生成干净的 TypeScript 定义

### 文档系统
- **Histoire** 用于组件文档和交互示例
- `*.story.vue` 文件编写示例
- `src/histoire.setup.ts` 自定义设置

## 开发工作流

1. 使用 `pnpm dev` 启动开发服务器，支持热重载
2. 在对应的 `src/` 文件夹中创建/更新组件
3. 使用 `*.story.vue` 文件添加文档示例
4. 运行 `pnpm build` 验证所有构建工作正常
5. 使用 `pnpm test:unit` 进行组件测试

## 关键模式

- 所有组件使用 TypeScript 并定义合适的 props
- 组件同时导出默认版本和使用 `withInstall` 的 Vue 插件版本
- 一致的命名约定：组件使用 PascalCase，props 使用 kebab-case
- Fluent Design 令牌和样式模式
- 在示例中使用 Composition API 和 `<script setup>` 语法

## 转录指导原则

当从 @fluentui/react-components 转录组件时：
1. 保持相同的 API 接口和 props 定义
2. 使用 griffel-vue 替代 @griffel/react 的 CSS-in-JS 实现
3. 将 React hooks 转换为 Vue 3 Composition API
4. 将 JSX 转换为 TSX 语法
5. 保持组件行为和视觉效果的一致性