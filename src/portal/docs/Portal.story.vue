<script lang="ts" setup>
import { ref } from 'vue';
import TPortal from '../Portal';

const portalState = () => ({
  disabled: false,
  lockScroll: false,
});

/** 自定义挂载目标 —— 演示时用带虚线边框的容器，便于看清内容落在哪 */
const customTarget = ref<HTMLElement | null>(null);
const setCustomTarget = (el: unknown) => {
  customTarget.value = (el as HTMLElement | null) ?? null;
};
</script>

<template>
  <Story title="Components/Portal" :initState="() => portalState">
    <template #controls="{ state }">
      <HstCheckbox v-model="state.disabled" title="disabled" />
      <HstCheckbox v-model="state.lockScroll" title="lockScroll" />
    </template>

    <Variant title="基础用法 —— 默认挂载到 body">
      <div style="padding: 12px; background: var(--colorNeutralBackground2); border-radius: 4px">
        <p style="margin: 0 0 8px; font-size: 12px; color: var(--colorNeutralForeground3)">
          内容通过 Teleport 渲染到 <code>document.body</code>，在这个位置看不到它。 用开发者工具查看
          body 的末尾即可发现。
        </p>
        <TPortal :disabled="state.disabled" :lock-scroll="state.lockScroll">
          <div
            style="
              padding: 8px 12px;
              background: var(--colorBrandBackground);
              color: var(--colorNeutralForegroundOnBrand);
              border-radius: 4px;
              font-size: 13px;
            "
          >
            我来自 Portal
          </div>
        </TPortal>
      </div>
    </Variant>

    <Variant title="挂载到自定义容器">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <div
          :ref="setCustomTarget"
          style="
            min-height: 60px;
            padding: 12px;
            border: 1px dashed var(--colorNeutralStroke1);
            border-radius: 4px;
          "
        >
          <p style="margin: 0; font-size: 12px; color: var(--colorNeutralForeground3)">
            这是挂载目标容器 —— 内容会出现在这个虚线框里
          </p>
        </div>
        <TPortal :attach="customTarget ?? 'body'">
          <div
            style="
              padding: 8px 12px;
              background: var(--colorBrandBackground);
              color: var(--colorNeutralForegroundOnBrand);
              border-radius: 4px;
              font-size: 13px;
            "
          >
            我渲染在上面那个虚线框里
          </div>
        </TPortal>
      </div>
    </Variant>

    <Variant title="disabled —— 原地渲染">
      <div style="padding: 12px; background: var(--colorNeutralBackground2); border-radius: 4px">
        <TPortal disabled>
          <div
            style="
              padding: 8px 12px;
              background: var(--colorNeutralBackground1);
              border: 1px solid var(--colorNeutralStroke1);
              border-radius: 4px;
              font-size: 13px;
            "
          >
            我不使用 Teleport，就在原来的位置渲染
          </div>
        </TPortal>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Portal

把内容传送到指定的 DOM 节点。是 Dropdown、Tooltip、Dialog 等弹出类组件的底层。

## 特性

- 支持三种挂载目标：选择器字符串、DOM 元素、函数
- **不引入包裹元素** —— 内容直接 Teleport，DOM 结构保持透明
- 可选滚动锁，支持多实例叠加计数
- 无法解析挂载目标时回退到 `document.body`；SSR 环境下原地渲染

## API

### Props

| 属性         | 类型                                           | 默认值   | 描述                                |
| ------------ | ---------------------------------------------- | -------- | ----------------------------------- |
| `attach`     | `string \| HTMLElement \| (() => HTMLElement)` | `'body'` | 挂载目标                            |
| `disabled`   | `boolean`                                      | `false`  | 为 true 时原地渲染，不使用 Teleport |
| `lockScroll` | `boolean`                                      | `false`  | 锁定 `document.body` 滚动           |

### Slots

| 插槽名    | 描述         |
| --------- | ------------ |
| `default` | 要传送的内容 |

## 层级令牌

Portal 不产生 DOM 元素，因此不接管 z-index。层级由 CSS 变量统一管理，
各弹出组件引用这些变量而非硬编码数值：

```css
--t-z-index-popover: 1000;
--t-z-index-tooltip: 1100;
--t-z-index-dialog: 1200;
--t-z-index-toast: 1300;
```

## 使用示例

### 基础用法

```vue
<TPortal>
  <div>我会被渲染到 body</div>
</TPortal>
```

### 挂载到指定容器

```vue
<TPortal :attach="'#my-container'">
  <div>渲染到 #my-container</div>
</TPortal>
```

### 锁定滚动（模态场景）

```vue
<TPortal lock-scroll>
  <div>打开期间页面不可滚动</div>
</TPortal>
```
</docs>
