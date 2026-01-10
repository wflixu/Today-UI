# Today-UI

> 基于 Vue 3 的 Fluent Design 组件库

Today-UI 是一个遵循微软 [Fluent Design System](https://www.fluentui.com/) 设计规范的 Vue 3 组件库，目标是提供与 `@fluentui/react-components` API 对齐的 Vue 3 实现。

## ✨ 特性

- 🎨 **Fluent Design 设计** - 完整实现微软 Fluent Design 规范
- 🔧 **TypeScript** - 完整的 TypeScript 类型定义
- 🎯 **API 兼容** - 与 `@fluentui/react-components` 保持 95%+ API 兼容性
- ⚡ **CSS-in-JS** - 使用 [griffel-vue](https://github.com/wflixu/griffel-vue) 实现高性能样式
- 🌈 **主题系统** - 支持多种预设主题（Web/Teams × Light/Dark）
- 📦 **组件化** - 提供丰富的 UI 组件（Button、Dialog、Dropdown、Menu 等）
- 🛠️ **开发工具** - 集成 Histoire 组件文档和开发环境

## 📦 安装

```bash
# 使用 pnpm
pnpm install today-ui

# 使用 npm
npm install today-ui

# 使用 yarn
yarn add today-ui
```

## 🚀 快速开始

### 基础使用

```vue
<script setup lang="ts">
import { TButton } from 'today-ui';
</script>

<template>
  <TButton appearance="primary">点击我</TButton>
</template>
```

### 引入样式

```typescript
import 'today-ui/dist/style.css';
```

## 🎨 主题系统

Today-UI 提供了完整的 Fluent Design 主题系统，支持以下预设主题：

- **Web Light** - 标准 Web 亮色主题
- **Web Dark** - 标准 Web 暗色主题
- **Teams Light** - Microsoft Teams 亮色主题
- **Teams Dark** - Microsoft Teams 暗色主题

### 设计令牌

组件使用 CSS 变量引用设计令牌：

```css
:root {
  --colorBrandForeground1: #0f6cbd;
  --colorNeutralBackground1: #ffffff;
  --spacingHorizontalM: 12px;
  /* ... 更多设计令牌 ... */
}
```

### 样式系统

采用 **CSS 变量 + griffel-vue** 混合方案：

- **CSS 变量** - 作为设计令牌的单一数据源
- **griffel-vue** - 生成原子化 CSS 类，实现高性能样式
- **语义化类名** - 保留 `.t-button` 等类名便于调试

## 📚 组件列表

### 基础组件

- **Button** - 按钮，支持多种外观和尺寸
- **Icon** - SVG 图标组件

### 表单组件

- **Dropdown** - 下拉菜单及触发器
- **Menu** - 上下文菜单和导航菜单

### 反馈组件

- **Dialog** - 模态对话框和确认对话框
- **Toast** - 通知消息
- **Tooltip** - 工具提示

### 数据展示

- **Tabs** - 标签页组件
- **FileTree** - 支持懒加载的文件树

## 🔧 开发

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动 Histoire 开发服务器
pnpm dev

# 构建库
pnpm build

# 仅构建类型
pnpm build:types

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

### 项目结构

```
today-ui/
├── src/
│   ├── button/              # Button 组件
│   ├── dialog/              # Dialog 组件
│   ├── dropdown/            # Dropdown 组件
│   ├── menu/                # Menu 组件
│   ├── tooltip/             # Tooltip 组件
│   ├── tabs/                # Tabs 组件
│   ├── filetree/            # FileTree 组件
│   ├── toast/               # Toast 组件
│   ├── icon/                # Icon 组件
│   ├── shared/              # 共享工具
│   │   ├── griffel/         # Griffel 配置
│   │   ├── theme/           # 主题系统
│   │   └── utils/           # 工具函数
│   ├── style/               # 全局样式
│   └── theme/               # 主题导出
└── docs/                    # 文档
```

## 🎯 规范兼容性

Today-UI 遵循以下规范要求：

- **FR-001**: 提供与 `@fluentui/react-components` 对标的基础 UI 组件
- **FR-002**: 使用 TSX 开发，提供完整的 TypeScript 类型定义
- **FR-003**: 使用 `griffel-vue` CSS-in-JS 方案构建样式
- **FR-005**: API 设计与 `@fluentui/react-components` 最大兼容
- **FR-006**: 支持暗黑模式和亮色模式

## 📖 API 文档

详细的 API 文档和示例请访问 Histoire 文档站点：

```bash
pnpm dev
# 访问 http://localhost:6000
```

## 🔗 相关资源

- [Fluent Design System](https://www.fluentui.com/)
- [@fluentui/react-components](https://react.fluentui.dev/)
- [griffel-vue](https://github.com/wflixu/griffel-vue)
- [Vue 3 文档](https://vuejs.org/)

## 📄 许可证

[MIT](LICENSE)

## 🤝 贡献

欢迎贡献！请随时提交 Issue 或 Pull Request。

## 📮 联系方式

- 作者: wflixu
- GitHub: [https://github.com/wflixu/Today-UI](https://github.com/wflixu/Today-UI)
