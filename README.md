# Today-UI

> A Vue 3 component library implementing Microsoft's Fluent Design System

[![npm version](https://badge.fury.io/js/today-ui.svg)](https://www.npmjs.com/package/today-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.26-b42b68.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)

Today-UI is a Vue 3 component library that brings Microsoft's [Fluent Design System](https://www.fluentui.com/) to the Vue ecosystem. It transcribes `@fluentui/react-components` to Vue 3 while maintaining API compatibility and visual fidelity.

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

Import the stylesheet once in your app entry:

```ts
// main.ts
import 'today-ui/style.css';
```

All component CSS is bundled into that single file (173 KB, 440+ design tokens) — `@import` chains and CSS nesting are resolved at build time, so there is nothing else to configure.

> Component styles are **not** auto-imported by the JS entries. Importing `today-ui/style.css` explicitly is required.

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

**Chrome/Edge 105+ · Safari 15.4+ · Firefox 121+**

CSS nesting (`&:hover`) and `@import` are resolved at build time, so they are not a constraint. The baseline is set by **`:has()`**, used in the Input component's disabled/hover/autofill states. Browsers without `:has()` drop those specific rules — other components are unaffected. See [specs/style.md](specs/style.md#浏览器基线) for the details and how to lower the baseline.

## 📚 Component List

14 components ship in the source tree; 13 are exported from the package. Component names carry the `T` prefix — the **Name** column below is exactly what you import and write in templates.

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
| **`TDropdown`** | Dropdown menu and trigger | ✅ | ✅ |

### Overlay

| Name | Description | Exported | Tests |
|------|-------------|:--------:|:-----:|
| **`TPortal`** | Teleport wrapper with attach-target resolution and optional scroll lock | ✅ | ✅ |
| **`TPopover`** | Positioning, triggering and open/close behaviour — the primitive behind `TDropdown`, `TTooltip` and `TDialog` | ✅ | ✅ |

### Feedback

| Name | Description | Exported | Tests |
|------|-------------|:--------:|:-----:|
| **`TTooltip`** | Tooltip for additional information | ✅ | ✅ |
| **`TDialog`** | Modal dialog and confirmation dialog | ✅ | ✅ |
| **`TToast`** | Notification messages | ❌ | — |

> ⚠️ **`TToast`** has source files but is **not registered in `src/components.ts`**, so it is not part of the published package. It is currently a non-functional placeholder (no props, hardcoded content).

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

- **Node.js** >= 22.12 (Vitest 5 requires `^22.12.0 || ^24.0.0`; CI uses 24)
- **pnpm** >= 10

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

# Lint and fix code (oxlint)
pnpm lint

# Check lint without writing (CI)
pnpm lint:check

# Format code (oxfmt)
pnpm format

# Check formatting without writing (CI)
pnpm format:check
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
├── vite.config.mts         # Vite build config (shared with Histoire)
└── dist/                    # Build output (ESM)
```

## 📖 Documentation

- **[specs/style.md](specs/style.md)** - Style & theming architecture (layering, tokens, theming, override API)
- **[specs/component-roadmap.md](specs/component-roadmap.md)** - Component implementation roadmap
- **[specs/testing-guidelines.md](specs/testing-guidelines.md)** - Unit testing standards
- **[Documentation site](https://wflixu.github.io/Today-UI/)** - Published Histoire build (GitHub Pages, redeployed on every push to `main`)
- **[Histoire Documentation](http://localhost:6006)** - Run `pnpm dev` to access interactive documentation locally
- **[CLAUDE.md](CLAUDE.md)** - Development guidelines and project conventions

## 🎯 Tech Stack

- **Vue 3.5+** - Composition API + TSX
- **TypeScript 5.9.2** - Full type support
- **CSS Variables** - 440+ Fluent Design tokens, zero runtime
- **Vite** - Library build tool (library mode, ESM output)
- **@floating-ui/vue** - Floating UI positioning engine
- **Histoire** - Component documentation tool
- **Vitest** - Unit testing framework
- **oxlint + oxfmt** - Linting and formatting (Rust-based, replaced ESLint/Prettier)

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
- **Type-Safe Classes** - Class names are composed with `cn()` from `@/shared/styles/classUtils`, which is the only helper there in real use. `bem` and `buildVariantClasses` in the same file are unused dead code — don't reach for them.
- **Dual Documentation** - Histoire stories carry the inline docs; some components additionally ship a `docs/SPEC.md` with the design rationale

> ⏳ **目标约定，尚未落地**：`@layer` 分层（组件 CSS 不写 `@layer`、不 `@import` 令牌文件、禁用 `!important`）。
> 当前代码中没有任何 `@layer`，另有 5 个组件 CSS 违反约束。详见 [specs/style.md](specs/style.md)。

See [CLAUDE.md](CLAUDE.md) for details.

## 🏗️ Build System

Today-UI uses [Vite](https://vite.dev/) in library mode (`vite.config.mts`):

- **Output Format**: Pure ESM (`*.js`), `preserveModules` keeps the module structure for tree-shaking
- **Type Definitions**: `vue-tsc --emitDeclarationOnly` in a second pass (`pnpm build:types`)
- **CSS Processing**: `postcss-import` resolves the `@import` chain, then `postcss-nested` flattens nesting, then everything is merged into a single `dist/style.css`
- **Shared Config**: Histoire loads the same `vite.config.mts`, so docs and the library build use one CSS pipeline — no dev/prod divergence
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
