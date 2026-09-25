<script lang="ts" setup>
import { ref, reactive } from 'vue';
import TDialog from '../Dialog';
import TButton from '../../button/Button';
import type { DialogProps } from '../Dialog.types';

const state = reactive({
  show: false,
  title: '默认 title',
  width: undefined as DialogProps['width'],
  size: 'medium' as DialogProps['size'],
});

const basicShow = ref(false);
const customShow = ref(false);
const confirmShow = ref(false);
const longShow = ref(false);
const lastAction = ref('（尚未操作）');

const sizeOptions: Array<DialogProps['size']> = ['small', 'medium', 'large'];
</script>

<template>
  <Story title="Components/Dialog">
    <template #controls>
      <HstCheckbox v-model="state.show" title="show" />
      <HstText v-model="state.title" title="title" />
      <HstSelect v-model="state.size" title="size" :options="sizeOptions" />
    </template>

    <Variant title="基础用法">
      <TDialog
        :show="state.show"
        :title="state.title"
        :size="state.size"
        @update:show="(v: boolean) => (state.show = v)"
      >
        <TButton>打开对话框</TButton>
        <template #content>
          <p style="margin: 0">点击遮罩或按 Escape 均可关闭。打开期间页面滚动被锁定。</p>
        </template>
      </TDialog>
    </Variant>

    <Variant title="自定义宽度">
      <TDialog v-model:show="basicShow" title="600px 宽" :width="600">
        <TButton appearance="outline">打开</TButton>
        <template #content> width 传数字时按 px 处理，传字符串则原样使用。 </template>
      </TDialog>
    </Variant>

    <Variant title="自定义操作按钮">
      <TDialog v-model:show="customShow" title="自定义操作">
        <TButton appearance="outline">打开</TButton>
        <template #content> 提供了 actions 插槽时，不再渲染默认的取消 / 确认按钮。 </template>
        <template #actions>
          <TButton appearance="subtle" @click="customShow = false">稍后再说</TButton>
          <TButton appearance="primary" @click="customShow = false">立即处理</TButton>
        </template>
      </TDialog>
    </Variant>

    <Variant title="确认事件与滚动内容">
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start">
        <TDialog
          v-model:show="confirmShow"
          title="需要决策"
          @confirm="lastAction = '用户点击了确认'"
        >
          <TButton appearance="primary">打开</TButton>
          <template #content>
            <p style="margin: 0 0 8px">
              点击「确认」会抛出 confirm 事件并关闭；点击「取消」只关闭。
            </p>
            <p style="margin: 0">上次操作：{{ lastAction }}</p>
          </template>
        </TDialog>
        <TButton appearance="outline" @click="longShow = true">打开长内容对话框</TButton>
      </div>

      <TDialog v-model:show="longShow" title="长内容">
        <span style="display: none" />
        <template #content>
          <div v-for="i in 30" :key="i" style="padding: 4px 0; font-size: 13px">
            第 {{ i }} 行 —— 内容超出高度时主体区域内部滚动，头部与操作区保持可见。
          </div>
        </template>
      </TDialog>
    </Variant>

    <Variant title="标题插槽">
      <TDialog title="这个标题会被插槽覆盖">
        <TButton appearance="subtle">打开</TButton>
        <template #header>
          <div style="display: flex; align-items: center; gap: 8px">
            <strong>自定义头部</strong>
            <span style="font-size: 12px; color: var(--colorNeutralForeground3)">副标题</span>
          </div>
        </template>
        <template #content> header 插槽优先于 title prop。 </template>
      </TDialog>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Dialog

模态对话框。基于 Portal 构建，触发逻辑复用 Popover 的触发器处理。

## 特性

- 打开期间锁定 body 滚动（可通过 `lockScroll` 关闭）
- 点击遮罩关闭、按 Escape 关闭（均可关闭）
- 只在显示时渲染，不在页面里留下隐藏节点
- 宽度可通过 `width` 指定具体值，或用 `size` 取预设
- 提供 `header` / `content` / `actions` 插槽

## API

### Props

| 属性                  | 类型                                           | 默认值      | 描述                                  |
| --------------------- | ---------------------------------------------- | ----------- | ------------------------------------- |
| `show`                | `boolean`                                      | `false`     | 是否显示，配合 `v-model:show`         |
| `title`               | `string`                                       | `''`        | 标题，可被 `header` 插槽覆盖          |
| `width`               | `string \| number`                             | `undefined` | 宽度。数字按 px 处理；不传则按 `size` |
| `size`                | `'small' \| 'medium' \| 'large'`               | `'medium'`  | 尺寸预设（400 / 600 / 800px）         |
| `closeOnOverlayClick` | `boolean`                                      | `true`      | 点击遮罩是否关闭                      |
| `closeOnEscape`       | `boolean`                                      | `true`      | 按 Escape 是否关闭                    |
| `lockScroll`          | `boolean`                                      | `true`      | 是否锁定 body 滚动                    |
| `attach`              | `string \| HTMLElement \| (() => HTMLElement)` | `'body'`    | 挂载目标                              |
| `disabled`            | `boolean`                                      | `false`     | 原地渲染，不使用 Teleport             |

### Events

| 事件          | 参数              | 描述                         |
| ------------- | ----------------- | ---------------------------- |
| `update:show` | `(show: boolean)` | 显示状态变化                 |
| `confirm`     | —                 | 点击默认的「确认」按钮时触发 |

### Slots

| 插槽名    | 描述                                        |
| --------- | ------------------------------------------- |
| `default` | 触发元素。必须是单个元素                    |
| `header`  | 标题区域，优先于 `title` prop               |
| `content` | 对话框主体                                  |
| `actions` | 操作按钮区域。不提供时渲染默认的取消 / 确认 |

### Exposed

`setShow(show)` / `requestClose()` / `toggle()` / `triggerRef`

## 使用示例

### 基础用法

```vue
<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>

<template>
  <TDialog v-model:show="show" title="提示">
    <TButton @click="show = true">打开</TButton>
    <template #content>对话框内容</template>
  </TDialog>
</template>
```

### 自定义操作按钮

```vue
<TDialog v-model:show="show" title="确认删除">
  <TButton>删除</TButton>
  <template #content>此操作不可撤销。</template>
  <template #actions>
    <TButton @click="show = false">取消</TButton>
    <TButton appearance="primary" @click="onDelete">删除</TButton>
  </template>
</TDialog>
```

### 禁止遮罩点击关闭

```vue
<TDialog v-model:show="show" :close-on-overlay-click="false" title="必须做出选择">
  <TButton>打开</TButton>
  <template #content>点击遮罩不会关闭。</template>
</TDialog>
```
</docs>
