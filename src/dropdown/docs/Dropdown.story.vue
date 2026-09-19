<script lang="ts" setup>
import { ref } from 'vue';
import TDropdown from '../Dropdown';
import TButton from '../../button/Button';
import type { IDropdownOption } from '../Dropdown.types';

const basicOptions: IDropdownOption[] = [
  { label: '重命名', key: 'rename' },
  { label: '复制', key: 'copy' },
  { label: '删除', key: 'delete' },
];

const triggerOptions = ['click', 'hover', 'contextmenu', 'manual'] as const;

const state = ref({
  trigger: 'click' as (typeof triggerOptions)[number],
});

const controlledVisible = ref(false);
const lastSelected = ref('（尚未选择）');

const placementOptions = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
  'right-start',
  'left-start',
];
const placement = ref('bottom-start');
</script>

<template>
  <Story title="Components/Dropdown">
    <template #controls>
      <HstSelect v-model="state.trigger" title="trigger" :options="[...triggerOptions]" />
      <HstSelect v-model="placement" title="placement" :options="placementOptions" />
    </template>

    <Variant title="基础用法">
      <TDropdown
        :options="basicOptions"
        :trigger="state.trigger"
        :placement="placement"
        @select="(item: IDropdownOption) => (lastSelected = String(item.label))"
      >
        <TButton>点我展开</TButton>
      </TDropdown>
      <p style="font-size: 13px; margin-top: 8px">上次选择：{{ lastSelected }}</p>
    </Variant>

    <Variant title="右键触发">
      <TDropdown
        trigger="contextmenu"
        :options="basicOptions"
        @select="(item: IDropdownOption) => (lastSelected = String(item.label))"
      >
        <div
          style="
            padding: 24px;
            border: 1px dashed var(--colorNeutralStroke1);
            border-radius: 4px;
            font-size: 13px;
            user-select: none;
          "
        >
          在此区域点击右键
        </div>
      </TDropdown>
    </Variant>

    <Variant title="v-model:visible（受控）">
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
        <div style="font-size: 13px">
          外部状态：<code>{{ controlledVisible }}</code>
        </div>
        <div style="display: flex; gap: 8px">
          <TButton appearance="outline" @click="controlledVisible = !controlledVisible">
            切换
          </TButton>
          <TButton appearance="subtle" @click="controlledVisible = false">强制收起</TButton>
        </div>
        <TDropdown v-model:visible="controlledVisible" :options="basicOptions">
          <TButton appearance="primary">受控的菜单</TButton>
        </TDropdown>
      </div>
    </Variant>

    <Variant title="自定义菜单内容">
      <TDropdown :options="[]">
        <TButton appearance="subtle">自定义菜单</TButton>
        <template #menu>
          <div style="padding: 8px; min-width: 160px">
            <div style="font-size: 12px; color: var(--colorNeutralForeground3); padding: 4px 8px">
              快速操作
            </div>
            <div
              v-for="label in ['导出 PDF', '导出 Word', '导出 HTML']"
              :key="label"
              style="padding: 6px 8px; font-size: 13px; cursor: pointer; border-radius: 4px"
            >
              {{ label }}
            </div>
          </div>
        </template>
      </TDropdown>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Dropdown

下拉菜单。定位、触发与关闭行为全部由 Popover 承担，Dropdown 只负责菜单内容与选择事件。

> 注意：`docs` 块内的相对 markdown 链接会被 Histoire 当作故事引用解析，
> 因此这里不写跨文件链接。

## 特性

- 四种触发方式：`click` / `hover` / `contextmenu` / `manual`
- 支持 `v-model:visible` 受控绑定
- 位置在滚动、resize 时自动重算（由 Popover 的 `autoUpdate` 提供）
- 点击外部、按 Escape 关闭
- 触发元素上的原有类名与事件处理器会被保留

## API

### Props

| 属性             | 类型                                              | 默认值           | 描述                                 |
| ---------------- | ------------------------------------------------- | ---------------- | ------------------------------------ |
| `visible`        | `boolean`                                         | `undefined`      | 受控开合状态，配合 `v-model:visible` |
| `defaultVisible` | `boolean`                                         | `false`          | 非受控模式的初始状态                 |
| `trigger`        | `'click' \| 'hover' \| 'contextmenu' \| 'manual'` | `'click'`        | 触发方式                             |
| `options`        | `IDropdownOption[]`                               | `[]`             | 菜单项，每项需含 `label` 与 `key`    |
| `placement`      | `Placement`                                       | `'bottom-start'` | 浮层相对触发元素的位置               |
| `offset`         | `number`                                          | `4`              | 与触发元素的间距（px）               |
| `attach`         | `string \| HTMLElement \| (() => HTMLElement)`    | `'body'`         | 浮层挂载目标                         |
| `disabled`       | `boolean`                                         | `false`          | 原地渲染，不使用 Teleport            |

### Events

| 事件             | 参数                 | 描述                                    |
| ---------------- | -------------------- | --------------------------------------- |
| `update:visible` | `(visible: boolean)` | 开合状态变化，供 `v-model:visible` 使用 |
| `toggle`         | `(visible: boolean)` | 同上，保留以兼容既有用法                |
| `select`         | `(option, event)`    | 点击菜单项                              |

### Slots

| 插槽名    | 描述                             |
| --------- | -------------------------------- |
| `default` | 触发元素。必须是单个元素         |
| `menu`    | 自定义菜单内容，优先于 `options` |

## 使用示例

### 基础用法

```vue
<script setup>
const options = [
  { label: '重命名', key: 'rename' },
  { label: '删除', key: 'delete' },
];
</script>

<template>
  <TDropdown :options="options" @select="onSelect">
    <TButton>更多操作</TButton>
  </TDropdown>
</template>
```

### 右键菜单

```vue
<TDropdown trigger="contextmenu" :options="options" @select="onSelect">
  <div>在此区域右键</div>
</TDropdown>
```

### 受控

```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>

<template>
  <TDropdown v-model:visible="visible" :options="options">
    <TButton @click="visible = true">打开</TButton>
  </TDropdown>
</template>
```
</docs>
