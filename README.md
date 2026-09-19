# Today-UI

> A Vue 3 component library implementing Microsoft's Fluent Design System

[![npm version](https://badge.fury.io/js/today-ui.svg)](https://www.npmjs.com/package/today-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.26-b42b68.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)

Today-UI is a Vue 3 component library that brings Microsoft's [Fluent Design System](https://www.fluentui.com/) to the Vue ecosystem. It transcribes `@fluentui/react-components` to Vue 3 while maintaining API compatibility and visual fidelity.

---

> ### ⚠️ 当前不可安装使用
>
> `package.json` 的 `exports` 字段指向了**不存在的产物文件**，因此 `import ... from 'today-ui'` 会解析失败：
>
> | 声明 | dist 实际产物 |
> |---|---|
> | `./dist/index.d.ts` ❌ | `index.d.mts` |
> | `./dist/index.js` ❌ | `index.mjs` |
> | `./dist/style.css` ❌ | 不存在 |
>
> 根因是 `tsdown` 输出 `.mjs` / `.d.mts`（纯 ESM），而 `exports` 写的是 `.js` / `.d.ts`。
> 修正方式是改 `package.json` 的 `exports` 指向，或改 tsdown 的输出扩展名 —— **尚未修复**。
>
> 本文档描述的 API 是**目标状态**。在修复前，请从源码直接引用，或等待修复。

## ✨ Features

- **🎨 Fluent Design** - Implementation of Microsoft's Fluent Design System specifications
- **💎 TypeScript** - Full type safety with TSX support for better development experience
- **🎯 API Compatible** - Aims for API compatibility with `@fluentui/react-components`
- **⚡ Pure CSS Variables** - No CSS-in-JS, no runtime style injection — zero runtime overhead
- **🌈 Theming** - 4 built-in themes (Web/Teams × Light/Dark), switchable via `data-theme`
- **📦 Tree-shakeable** - Pure ESM output for optimal bundle size
- **🛠️ Developer Tools** - Integrated [Histoire](https://histoire.dev/) for component documentation
- **🧩 110+ Icons** - Complete Fluent Design icon library
- **🔧 Type-Safe Classes** - BEM naming with TypeScript utilities for class name management

> ⏳ **已设计但尚未实现**（详见 [specs/style.md](specs/style.md)）：
> - **Cascade Layers** —— `@layer` 分层尚未写入任何 CSS，消费者目前仍需与库比特异性
> - **局部（嵌套）主题** —— 主题选择器仍限定 `:root`，暂不支持子树独立切换
> - **组件级覆盖变量** —— `--t-{block}-{property}` 接口尚未落到组件 CSS

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

> **组件名一律带 `T` 前缀**（`TButton`、`TInput`、`TDropdown`…）。
> 原因与命名规范见 [specs/component-roadmap.md](specs/component-roadmap.md#命名规范)。

### Basic Usage

```vue
<script setup>
import { TButton } from 'today-ui'
</script>

<template>
  <TButton appearance="primary">
    Click me
  </TButton>
</template>
```

### Styles

**No manual style import is needed.** Each component's ESM entry imports its own CSS, so any bundled setup (Vite, webpack, Rspack, etc.) picks it up automatically with `import { TButton } from 'today-ui'`.

> ⏳ **Planned**: a single aggregated entry `import 'today-ui/style.css'` is specified in [specs/style.md](specs/style.md) but not yet emitted by the build. Until it lands, rely on the automatic per-component imports above.

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

Today-UI provides a complete Fluent Design theme system built on 440+ CSS variables:

| Theme | `data-theme` value |
|-------|--------------------|
| Web Light (default) | `light` |
| Web Dark | `dark` |
| Teams Light | `teams-light` |
| Teams Dark | `teams-dark` |

### Switch Themes

```html
<!-- Global: set it on the root element -->
<html data-theme="dark">
```

```typescript
// Or imperatively
const el = document.documentElement;
el.dataset.theme = 'dark';        // Web Dark
el.dataset.theme = 'teams-light'; // Teams Light
delete el.dataset.theme;          // back to Web Light
```

> ⏳ **Planned**: a `setTheme(theme, el?)` / `getTheme(el?)` helper is specified in [specs/style.md](specs/style.md) but **not yet exported**. Use the `data-theme` attribute directly as shown above.

### Subtree (Nested) Theming

> ⏳ **Planned, not yet working.** The theme selectors are still scoped to `:root`, so
> `data-theme` on a non-root element currently has **no effect**.

Once the token selectors drop the `:root` prefix, this will work — because CSS custom properties are **inherited** rather than global:

```html
<body>                          <!-- Web Light -->
  <div data-theme="dark">       <!-- this subtree would be dark -->
    <TButton>Dark</TButton>
  </div>
  <TButton>Still light</TButton>
</body>
```

### Customizing Components

```css
/* Apply your own class. Works today. */
.brand-cta {
  background-color: #7b2ff7;   /* needs !important today — see below */
}

/* Once @layer lands, unlayered styles beat the library automatically: */
.brand-cta {
  box-shadow: 0 4px 12px rgb(123 47 247 / 30%);
}
```

```html
<TButton class="brand-cta">Buy</TButton>
```

> ⏳ **Planned**: component-level override variables (`--t-button-background`, etc.) are
> specified in [specs/style.md](specs/style.md) but not yet implemented in any component CSS.

### Custom Design Tokens

Tokens are plain CSS variables — override them anywhere they cascade from:

```css
:root {
  --colorBrandBackground: #0f6cbd;
  --colorNeutralBackground1: #ffffff;
  --borderRadiusMedium: 4px;
  /* ...440+ tokens, see src/theme/tokens/light.css */
}
```

### Browser Support

No CSS downleveling is applied, so the browser baseline is set by native CSS nesting:

**Chrome/Edge 120+ · Safari 17.2+ · Firefox 117+**

Older browsers drop rules containing `&` entirely, so components render unstyled on hover/active/focus. See [specs/style.md](specs/style.md#浏览器基线) for the rationale and the escape hatch.

## 📚 Component List

12 components ship in the source tree. Component names carry the `T` prefix — the **Name** column below is exactly what you import and write in templates.

### Basic

| Name | Description | Exported | Tests |
|------|-------------|:--------:|:-----:|
| **`TButton`** | Appearances, sizes, and shapes | ✅ | ✅ |
| **`TIcon`** | SVG icon system, 110+ Fluent icons | ✅ | — |

### Form

| Name | Description | Exported | Tests |
|------|-------------|:--------:|:-----:|
| **`TInput`** | Text input with appearance and size variants | ✅ | ✅ |
| **`TField`** | Form field wrapper | ✅ | ✅ |
| **`TLabel`** | Form label | ✅ | ✅ |
| **`TDropdown`** | Dropdown menu and trigger | ✅ | — |

### Feedback

| Name | Description | Exported | Tests |
|------|-------------|:--------:|:-----:|
| **`TTooltip`** | Tooltip for additional information | ✅ | ✅ |
| **`TDialog`** | Modal dialog and confirmation dialog | ❌ | — |
| **`TToast`** | Notification messages | ❌ | — |

> ⚠️ **`TDialog`** and **`TToast`** have source files but are **not registered in `src/components.ts`**, so they are not part of the published package. `TToast` is currently a non-functional placeholder (no props, hardcoded content).

### Navigation & Data Display

| Name | Description | Exported | Tests |
|------|-------------|:--------:|:-----:|
| **`TMenu`** | Context menu and navigation menu | ✅ | — |
| **`TTabs`** / **`TTablist`** / **`TTabPanel`** | Tabs | ✅ | — |
| **`TFileTree`** | File tree with lazy loading (custom component, no React upstream) | ✅ | — |

See [specs/component-roadmap.md](specs/component-roadmap.md) for the full 53-component plan against `@fluentui/react-components`.

## 🧩 Icon System

Today-UI includes 110+ Fluent Design icons with two usage methods:

### Method 1: Dynamic Icon (Recommended)

```vue
<template>
  <TIcon name="chevron-right" :size="24" />
</template>
```

### Method 2: Direct Import

Every icon is a named export from the package entry:

```vue
<script setup>
import { ChevronRightIcon } from 'today-ui';
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
│   ├── button/              # TButton
│   ├── dialog/              # TDialog (not exported yet)
│   ├── dropdown/            # TDropdown
│   ├── field/               # TField + THelperText
│   ├── file-tree/           # TFileTree
│   ├── icon/                # TIcon (110+ icons)
│   ├── input/               # TInput
│   ├── label/               # TLabel
│   ├── menu/                # TMenu
│   ├── tabs/                # TTabs / TTablist / TTabPanel
│   ├── toast/               # TToast (not exported yet)
│   ├── tooltip/             # TTooltip
│   ├── style/
│   │   ├── index.css       # Style entry
│   │   └── base.css        # reset / body
│   ├── theme/
│   │   ├── tokens/         # light / dark / teams-light / teams-dark
│   │   └── index.ts        # Theme API
│   ├── shared/              # Shared utilities
│   │   └── styles/         # Style utilities (cn, bem, etc.)
│   └── index.ts             # Package entry
├── react-components/        # Upstream React sources kept for transcription reference
├── specs/                   # Design & component specification documents
├── histoire.config.ts       # Histoire configuration
├── tsdown.config.ts        # tsdown build configuration
└── dist/                    # Build output (ESM)
```

## 📖 Documentation

- **[specs/style.md](specs/style.md)** - Style & theming architecture (layering, tokens, theming, override API)
- **[specs/component-roadmap.md](specs/component-roadmap.md)** - Component implementation roadmap
- **[specs/testing-guidelines.md](specs/testing-guidelines.md)** - Unit testing standards
- **[Histoire Documentation](http://localhost:6006)** - Run `pnpm dev` to access interactive documentation
- **[CLAUDE.md](CLAUDE.md)** - Development guidelines and project conventions

## 🎯 Tech Stack

- **Vue 3.5+** - Composition API + TSX
- **TypeScript 5.9.2** - Full type support
- **CSS Variables** - 440+ Fluent Design tokens, zero runtime
- **tsdown** - Library build tool (ESM output)
- **@floating-ui/vue** - Floating UI positioning engine
- **Histoire** - Component documentation tool
- **Vitest** - Unit testing framework

## 🔗 Related Resources

- [Fluent Design System](https://www.fluentui.com/)
- [@fluentui/react-components](https://react.fluentui.dev/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Floating UI](https://floating-ui.com/)
- [Histoire](https://histoire.dev/)

## 📝 Development Conventions

This project follows these conventions:

- **No Accessibility** - Focused on visual effects and basic interactions, does not implement ARIA attributes or keyboard navigation
- **`T` Prefix** - All component names carry a `T` prefix (`TButton`, `TInput`, …) because `app.use()` registers into a global namespace
- **TSX Syntax** - Components written in TSX for better type inference
- **Pure CSS + CSS Variables** - Semantic BEM class names with CSS variables for theming
- **Native CSS Nesting** - `&` is allowed for grouping states and compound variants (max 3 levels deep)
- **Type-Safe Classes** - TypeScript utilities for class name management (cn, bem, buildVariantClasses)
- **Dual Documentation** - Each component provides inline docs in Histoire stories and `spec.md` for design specifications

> ⏳ **目标约定，尚未落地**：`@layer` 分层（组件 CSS 不写 `@layer`、不 `@import` 令牌文件、禁用 `!important`）。
> 当前代码中没有任何 `@layer`，另有 5 个组件 CSS 违反约束。详见 [specs/style.md](specs/style.md)。

See [CLAUDE.md](CLAUDE.md) for details.

## 🏗️ Build System

Today-UI uses [tsdown](https://tsdown.dev/) for building:

- **Output Format**: Pure ESM (`*.mjs` files)
- **Type Definitions**: Auto-generated `.d.mts` files
- **CSS Processing**: Automatic per-component CSS extraction (`dist/**/*-<hash>.css`); each component's ESM entry imports its own CSS
- **Code Splitting**: Preserved module structure for tree-shaking
- **Source Maps**: Included for debugging
- **No CSS Downleveling**: Native CSS nesting is emitted as-is — see [Browser Support](#browser-support)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit Issues or Pull Requests.

## 📄 License

[MIT](LICENSE)

## 📮 Contact

- Author: [wflixu](https://github.com/wflixu)
- GitHub: [https://github.com/wflixu/Today-UI](https://github.com/wflixu/Today-UI)

---

**Made with ❤️ by [wflixu](https://github.com/wflixu)**
