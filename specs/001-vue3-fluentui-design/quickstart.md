# Quickstart: Using Today-UI

**Date**: 2025-10-08
**Feature**: [创建一个 Vue3 组件库](spec.md)

This guide provides a basic walkthrough for installing and using the `Today-UI` component library in a Vue 3 project.

## 1. Installation

First, add `today-ui` and its peer dependency `griffel-vue` to your project.

```bash
npm install today-ui griffel-vue
```

## 2. Setup

In your main application entry file (e.g., `main.ts`), you need to import the base styles and set up the theme provider.

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { FluentProvider, webLightTheme } from 'today-ui';

// Import base styles required by Today-UI
import 'today-ui/style/base.css';

const app = createApp(App);

// It's recommended to wrap your entire application with the FluentProvider
// to ensure styles and themes are applied correctly.
const Root = {
  render: () => h(FluentProvider, { theme: webLightTheme }, { default: () => h(App) }),
};

createApp(Root).mount('#app');
```

## 3. Using a Component

Now you can start using `Today-UI` components in your Vue components.

Here's an example of using the `Button` component in a `.vue` file:

```vue
<script setup lang="ts">
import { Button } from 'today-ui';
</script>

<template>
  <div class="container">
    <Button appearance="primary" @click="handleClick">
      Click Me
    </Button>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

Or, if you are using TSX:

```tsx
import { defineComponent } from 'vue';
import { Button } from 'today-ui';

export default defineComponent({
  name: 'MyComponent',
  setup() {
    const handleClick = () => {
      console.log('Button clicked!');
    };

    return () => (
      <div style={{ padding: '20px' }}>
        <Button appearance="primary" onClick={handleClick}>
          Click Me
        </Button>
      </div>
    );
  },
});
```

This quickstart provides the basic steps to get `Today-UI` running. For detailed information on each component's props, events, and usage, please refer to the official documentation site powered by Histoire.
