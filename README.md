# Today-UI

> 基于 Vue 3 的 Fluent Design 组件库

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.5+-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

Today-UI 是一个遵循微软 [Fluent Design System](https://www.fluentui.com/) 设计规范的 Vue 3 组件库，旨在提供与 `@fluentui/react-components` API 兼容的 Vue 3 实现。

## ✨ 特性

- **🎨 Fluent Design 设计** - 完整实现微软 Fluent Design 规范，包含 Web 和 Teams 主题
- **🔧 TypeScript 支持** - 完整的 TypeScript 类型定义，提供优秀的开发体验
- **🎯 API 兼容性** - 与 `@fluentui/react-components` 保持高度 API 兼容
- **⚡ 高性能样式** - 基于 [griffel-vue](https://github.com/wflixu/griffel-vue) 的 CSS-in-JS 方案
- **🌈 主题系统** - 支持 4 种预设主题（Web/Teams × Light/Dark），基于 CSS 变量
- **📦 丰富的组件** - Button、Dialog、Dropdown、Menu、Tooltip、Tabs、Icon 等
- **🛠️ 开发工具** - 集成 Histoire 组件文档和交互式开发环境
- **🧩 110+ 图标** - 内置完整的 Fluent Design 图标库

## 📦 安装

```bash
# 使用 pnpm（推荐）
pnpm install today-ui

# 使用 npm
npm install today-ui

# 使用 yarn
yarn add today-ui
```

## 🚀 快速开始

### 完整示例

```vue
<script setup lang="ts">
import { TButton, TIcon } from 'today-ui';
</script>

<template>
  <TButton appearance="primary">
    <template #icon>
      <TIcon name="save" />
    </template>
    保存
  </TButton>
</template>
```

### 引入样式

在应用入口文件中引入样式文件：

```typescript
// main.ts
import 'today-ui/dist/style.css';
```

### 全局注册（可选）

```typescript
// main.ts
import { createApp } from 'vue';
import TodayUI from 'today-ui';
import App from './App.vue';
import 'today-ui/dist/style.css';

const app = createApp(App);
app.use(TodayUI);
app.mount('#app');
```

## 🎨 主题系统

Today-UI 提供完整的 Fluent Design 主题系统，支持以下预设主题：

- **Web Light** - 标准 Web 亮色主题（默认）
- **Web Dark** - 标准 Web 暗色主题
- **Teams Light** - Microsoft Teams 亮色主题
- **Teams Dark** - Microsoft Teams 暗色主题

### 切换主题

```typescript
import { setTheme } from 'today-ui';

// 切换到暗色主题
setTheme('web-dark');

// 切换到 Teams 亮色主题
setTheme('teams-light');
```

### 自定义主题令牌

```css
:root {
  --colorBrandForeground1: #0f6cbd;
  --colorNeutralBackground1: #ffffff;
  --borderRadiusMedium: 4px;
  /* 更多设计令牌... */
}
```

## 📚 组件列表

### 基础组件

| 组件 | 说明 | 状态 |
|------|------|------|
| **[Button](src/button/doc.md)** | 按钮，支持多种外观、尺寸和形状 | ✅ |
| **[Icon](src/icon/doc.md)** | SVG 图标组件，支持 110+ Fluent 图标 | ✅ |

### 表单组件

| 组件 | 说明 | 状态 |
|------|------|------|
| **[Dropdown](src/dropdown/)** | 下拉菜单及触发器 | ✅ |
| **[Menu](src/menu/)** | 上下文菜单和导航菜单 | ✅ |

### 反馈组件

| 组件 | 说明 | 状态 |
|------|------|------|
| **[Dialog](src/dialog/)** | 模态对话框和确认对话框 | ✅ |
| **[Toast](src/toast/)** | 通知消息 | ✅ |
| **[Tooltip](src/tooltip/)** | 工具提示 | ✅ |

### 数据展示

| 组件 | 说明 | 状态 |
|------|------|------|
| **[Tabs](src/tabs/)** | 标签页组件 | ✅ |
| **[FileTree](src/file-tree/)** | 支持懒加载的文件树 | ✅ |

更多组件开发中...

## 🧩 图标系统

Today-UI 内置 110+ Fluent Design 图标，支持两种使用方式：

### 方式一：动态图标（推荐）

```vue
<template>
  <TIcon name="chevron-right" :size="24" />
</template>
```

### 方式二：直接导入

```vue
<script setup lang="ts">
import { ChevronRightIcon } from 'today-ui';
</script>

<template>
  <ChevronRightIcon :size="24" />
</template>
```

可用图标包括：基础操作、导航箭头、搜索缩放、状态指示、文件文件夹、编辑格式、媒体播放、用户账户等类别。

查看 [完整图标列表](src/icon/doc.md)

## 🔧 开发

### 环境要求

- **Node.js** >= 20
- **pnpm** >= 9

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动 Histoire 开发服务器（组件文档）
pnpm dev

# 构建组件库
pnpm build

# 仅生成 TypeScript 类型
pnpm build:types

# 运行单元测试
pnpm test

# 类型检查
pnpm typecheck

# 代码检查和修复
pnpm lint
```

### 项目结构

```
today-ui/
├── src/
│   ├── button/           # Button 组件
│   ├── dialog/           # Dialog 组件
│   ├── dropdown/         # Dropdown 组件
│   ├── icon/             # Icon 组件（110+ 图标）
│   ├── menu/             # Menu 组件
│   ├── tabs/             # Tabs 组件
│   ├── toast/            # Toast 组件
│   ├── tooltip/          # Tooltip 组件
│   ├── file-tree/        # FileTree 组件
│   ├── shared/           # 共享工具和配置
│   │   ├── griffel/      # Griffel CSS-in-JS 配置
│   │   └── theme/        # 主题系统
│   ├── style/            # 全局样式和设计令牌
│   └── components.ts     # 组件导出入口
├── scripts/              # 构建和工具脚本
├── specs/                # 组件规格文档
└── dist/                 # 构建输出
```

## 📖 文档

- **[组件文档](src/button/doc.md)** - 各组件的使用文档和 API 说明
- **[设计规格](src/button/spec.md)** - 组件的设计决策和实现细节
- **[Histoire 文档](http://localhost:6006)** - 启动 `pnpm dev` 后访问交互式文档

## 🎯 技术栈

- **Vue 3.5+** - Composition API + TSX
- **TypeScript 5.x** - 完整类型支持
- **@floating-ui/vue** - 浮层定位引擎
- **griffel-vue** - CSS-in-JS 样式方案
- **Vite** - 构建工具
- **Histoire** - 组件文档工具
- **Vitest** - 单元测试框架

## 🔗 相关资源

- [Fluent Design System](https://www.fluentui.com/)
- [@fluentui/react-components](https://react.fluentui.dev/)
- [griffel-vue](https://github.com/wflixu/griffel-vue)
- [Vue 3 文档](https://vuejs.org/)
- [Floating UI](https://floating-ui.com/)

## 📝 开发规范

本项目遵循以下开发规范：

- **不处理无障碍性** - 专注于视觉效果和基础交互，不实现 ARIA 属性和键盘导航
- **使用 TSX 语法** - 组件使用 TSX 编写，提供更好的类型推断
- **CSS-in-JS + CSS 变量** - Griffel 负责原子化样式，CSS 变量作为设计令牌
- **双文档模式** - 每个组件提供 `doc.md`（使用文档）和 `spec.md`（设计文档）

详见 [CLAUDE.md](CLAUDE.md)

## 🤝 贡献

欢迎贡献！请随时提交 Issue 或 Pull Request。

## 📄 许可证

[MIT](LICENSE)

## 📮 联系方式

- 作者: [wflixu](https://github.com/wflixu)
- GitHub: [https://github.com/wflixu/Today-UI](https://github.com/wflixu/Today-UI)

---

**Made with ❤️ by wflixu**
