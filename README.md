# Today-UI

> A Vue 3 component library implementing Microsoft's Fluent Design System

[![npm version](https://badge.fury.io/js/today-ui.svg)](https://www.npmjs.com/package/today-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.26-b42b68.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)

Today-UI is a Vue 3 component library that brings Microsoft's [Fluent Design System](https://www.fluentui.com/) to the Vue ecosystem. It transcribes `@fluentui/react-components` to Vue 3 while maintaining API compatibility and visual fidelity.

## ✨ Features

- **🎨 Fluent Design** - Complete implementation of Microsoft's Fluent Design System specifications
- **💎 TypeScript** - Full type safety with TSX support for better development experience
- **🎯 API Compatible** - High API compatibility with `@fluentui/react-components`
- **⚡ Atomic CSS** - [griffel-vue](https://github.com/wflixu/griffel-vue) for highly optimized, tree-shakeable styles
- **🌈 Theming** - 4 built-in themes (Web/Teams × Light/Dark) with CSS variables
- **📦 Tree-shakeable** - Pure ESM output for optimal bundle size
- **🛠️ Developer Tools** - Integrated [Histoire](https://histoire.dev/) for component documentation
- **🧩 110+ Icons** - Complete Fluent Design icon library

## 📦 Installation

```bash
# pnpm (recommended)
pnpm add today-ui

# npm
npm install today-ui

# yarn
yarn add today-ui
```

## 🚀 Quick Start

### Basic Usage

```vue
<script setup>
import { Button } from 'today-ui'
</script>

<template>
  <Button appearance="primary">
    Click me
  </Button>
</template>
```

### Import Styles

Import the styles in your application entry file:

```typescript
// main.ts
import 'today-ui/dist/style.css';
```

### Global Registration (Optional)

```typescript
// main.ts
import { createApp } from 'vue';
import TodayUI from 'today-ui';
import App from './App.vue';

const app = createApp(App);
app.use(TodayUI);
app.mount('#app');
```

## 🎨 Theming System

Today-UI provides a complete Fluent Design theme system with the following presets:

- **Web Light** - Standard Web light theme (default)
- **Web Dark** - Standard Web dark theme
- **Teams Light** - Microsoft Teams light theme
- **Teams Dark** - Microsoft Teams dark theme

### Switch Themes

```typescript
import { setTheme } from 'today-ui';

// Switch to dark theme
setTheme('web-dark');

// Switch to Teams light theme
setTheme('teams-light');
```

### Custom Design Tokens

```css
:root {
  --colorBrandForeground1: #0f6cbd;
  --colorNeutralBackground1: #ffffff;
  --borderRadiusMedium: 4px;
  /* More design tokens... */
}
```

## 📚 Component List

### Basic Components

| Component | Description | Status |
|-----------|-------------|--------|
| **[Button](src/button/SPEC.md)** | Button with multiple appearances, sizes, and shapes | ✅ |
| **[Icon](src/icon/)** | SVG icon component with 110+ Fluent icons | ✅ |

### Form Components

| Component | Description | Status |
|-----------|-------------|--------|
| **[Dropdown](src/dropdown/)** | Dropdown menu and trigger | ✅ |
| **[Menu](src/menu/)** | Context menu and navigation menu | ✅ |

### Feedback Components

| Component | Description | Status |
|-----------|-------------|--------|
| **[Dialog](src/dialog/)** | Modal dialog and confirmation dialog | ✅ |
| **[Toast](src/toast/)** | Notification messages | ✅ |
| **[Tooltip](src/tooltip/)** | Tooltip for additional information | ✅ |

### Data Display

| Component | Description | Status |
|-----------|-------------|--------|
| **[Tabs](src/tabs/)** | Tab component for organizing content | ✅ |
| **[FileTree](src/file-tree/)** | File tree with lazy loading support | ✅ |

More components coming soon...

## 🧩 Icon System

Today-UI includes 110+ Fluent Design icons with two usage methods:

### Method 1: Dynamic Icon (Recommended)

```vue
<template>
  <Icon name="chevron-right" :size="24" />
</template>
```

### Method 2: Direct Import

```vue
<script setup>
import { ChevronRightIcon } from 'today-ui/icons';
</script>

<template>
  <ChevronRightIcon :size="24" />
</template>
```

Available icon categories: Basic actions, Navigation arrows, Search & Zoom, Status indicators, Files & Folders, Editing & Formatting, Media playback, User accounts, and more.

## 🔧 Development

### Requirements

- **Node.js** >= 20
- **pnpm** >= 9

### Install Dependencies

```bash
pnpm install
```

### Development Commands

```bash
# Start Histoire dev server (component documentation)
pnpm dev

# Build the library
pnpm build

# Build in watch mode
pnpm build:watch

# Preview built documentation
pnpm doc:preview

# Run unit tests
pnpm test

# Type checking
pnpm typecheck

# Lint and fix code
pnpm lint
```

### Project Structure

```
today-ui/
├── src/
│   ├── button/              # Button component
│   ├── dialog/              # Dialog component
│   ├── dropdown/            # Dropdown component
│   ├── icon/                # Icon component (110+ icons)
│   ├── menu/                # Menu component
│   ├── tabs/                # Tabs component
│   ├── toast/               # Toast component
│   ├── tooltip/             # Tooltip component
│   ├── file-tree/           # FileTree component
│   ├── shared/              # Shared utilities and configs
│   │   ├── griffel/        # Griffel CSS-in-JS configuration
│   │   └── theme/          # Theme system
│   ├── style/               # Global styles and design tokens
│   └── index.ts             # Component exports entry
├── specs/                   # Component specification documents
├── histoire.config.ts       # Histoire configuration
├── tsdown.config.ts        # tsdown build configuration
└── dist/                    # Build output (ESM)
```

## 📖 Documentation

- **[Histoire Documentation](http://localhost:6006)** - Run `pnpm dev` to access interactive documentation
- **[Component Specs](src/button/SPEC.md)** - Design decisions and implementation details
- **[CLAUDE.md](CLAUDE.md)** - Development guidelines and project conventions

## 🎯 Tech Stack

- **Vue 3.5+** - Composition API + TSX
- **TypeScript 5.9.2** - Full type support
- **tsdown** - Library build tool (ESM output)
- **@floating-ui/vue** - Floating UI positioning engine
- **griffel-vue** - CSS-in-JS styling solution
- **Histoire** - Component documentation tool
- **Vitest** - Unit testing framework

## 🔗 Related Resources

- [Fluent Design System](https://www.fluentui.com/)
- [@fluentui/react-components](https://react.fluentui.dev/)
- [griffel-vue](https://github.com/wflixu/griffel-vue)
- [Vue 3 Documentation](https://vuejs.org/)
- [Floating UI](https://floating-ui.com/)
- [Histoire](https://histoire.dev/)

## 📝 Development Conventions

This project follows these conventions:

- **No Accessibility** - Focused on visual effects and basic interactions, does not implement ARIA attributes or keyboard navigation
- **TSX Syntax** - Components written in TSX for better type inference
- **CSS-in-JS + CSS Variables** - Griffel for atomic styles, CSS variables as design tokens
- **Dual Documentation** - Each component provides inline docs in Histoire stories and `spec.md` for design specifications

See [CLAUDE.md](CLAUDE.md) for details.

## 🏗️ Build System

Today-UI uses [tsdown](https://tsdown.dev/) for building:

- **Output Format**: Pure ESM (`*.mjs` files)
- **Type Definitions**: Auto-generated `.d.mts` files
- **CSS Processing**: Automatic CSS extraction and bundling
- **Code Splitting**: Preserved module structure for tree-shaking
- **Source Maps**: Included for debugging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit Issues or Pull Requests.

## 📄 License

[MIT](LICENSE)

## 📮 Contact

- Author: [wflixu](https://github.com/wflixu)
- GitHub: [https://github.com/wflixu/Today-UI](https://github.com/wflixu/Today-UI)

---

**Made with ❤️ by [wflixu](https://github.com/wflixu)**
