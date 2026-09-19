<script lang="ts" setup>
import { ref } from 'vue';
import TTooltip from '../Tooltip';
import TButton from '../../button/Button';
import type { TooltipProps } from '../Tooltip.types';

const state = ref({
  trigger: 'hover' as TooltipProps['trigger'],
  placement: 'top' as NonNullable<TooltipProps['placement']>,
  relationship: 'description' as NonNullable<TooltipProps['relationship']>,
  withArrow: false,
  delay: 250,
  closeDelay: 250,
  maxWidth: 200,
  wrapText: true,
});

const triggerOptions = ['hover', 'focus', 'both', 'manual'] as const;
const placementOptions = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'left', 'right'];
const relationshipOptions = ['description', 'label', 'inaccessible'] as const;

const controlledVisible = ref(false);
</script>

<template>
  <Story title="Components/Tooltip" :initState="() => ({ ...state.value })">
    <template #controls="{ state: s }">
      <HstSelect v-model="s.trigger" title="trigger" :options="[...triggerOptions]" />
      <HstSelect v-model="s.placement" title="placement" :options="placementOptions" />
      <HstSelect
        v-model="s.relationship"
        title="relationship"
        :options="[...relationshipOptions]"
      />
      <HstCheckbox v-model="s.withArrow" title="withArrow" />
      <HstCheckbox v-model="s.wrapText" title="wrapText" />
      <HstNumber v-model="s.delay" title="delay" />
      <HstNumber v-model="s.closeDelay" title="closeDelay" />
      <HstNumber v-model="s.maxWidth" title="maxWidth" />
    </template>

    <Variant title="基础用法">
      <TTooltip
        content="这是一段工具提示内容"
        :trigger="state.trigger"
        :placement="state.placement"
        :relationship="state.relationship"
        :with-arrow="state.withArrow"
        :delay="state.delay"
        :close-delay="state.closeDelay"
        :max-width="state.maxWidth"
        :wrap-text="state.wrapText"
      >
        <TButton>{{ state.trigger === 'hover' ? '悬停查看' : '交互查看' }}</TButton>
      </TTooltip>
    </Variant>

    <Variant title="三种 relationship 对比">
      <div style="display: flex; gap: 16px">
        <TTooltip content="description —— 默认，深色背景" relationship="description" with-arrow>
          <TButton appearance="outline">description</TButton>
        </TTooltip>
        <TTooltip content="label —— 品牌色背景" relationship="label" with-arrow>
          <TButton appearance="outline">label</TButton>
        </TTooltip>
        <TTooltip content="inaccessible —— 浅色背景" relationship="inaccessible" with-arrow>
          <TButton appearance="outline">inaccessible</TButton>
        </TTooltip>
      </div>
    </Variant>

    <Variant title="maxWidth 与 wrapText">
      <div style="display: flex; gap: 16px">
        <TTooltip
          content="这段文字很长，用来演示 maxWidth 与 wrapText 的效果。把它限制在 160px 宽并允许换行。"
          :max-width="160"
          :wrap-text="true"
        >
          <TButton appearance="subtle">maxWidth=160, 换行</TButton>
        </TTooltip>
        <TTooltip
          content="这段文字很长，但禁止换行，因此会撑成一行。"
          :max-width="160"
          :wrap-text="false"
        >
          <TButton appearance="subtle">maxWidth=160, 不换行</TButton>
        </TTooltip>
      </div>
    </Variant>

    <Variant title="箭头与位置">
      <div style="display: flex; gap: 16px; flex-wrap: wrap">
        <TTooltip
          v-for="p in ['top', 'right', 'bottom', 'left']"
          :key="p"
          :content="p"
          :placement="p as never"
          with-arrow
        >
          <TButton appearance="outline">{{ p }}</TButton>
        </TTooltip>
      </div>
    </Variant>

    <Variant title="受控模式">
      <div style="display: flex; gap: 12px; align-items: center">
        <TButton appearance="outline" @click="controlledVisible = !controlledVisible">
          切换（当前 {{ controlledVisible }}）
        </TButton>
        <TTooltip
          content="由外部 visible 控制"
          trigger="manual"
          :visible="controlledVisible"
          with-arrow
        >
          <TButton>受控的触发元素</TButton>
        </TTooltip>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Tooltip

工具提示。定位、触发与关闭行为由 Popover 承担，Tooltip 负责内容外观与触发元素包装。

## 特性

- 四种触发方式：`hover` / `focus` / `both` / `manual`
- `both` 表示悬停或聚焦任一满足即显示
- 支持显示与隐藏延迟（默认均 250ms）
- 三种 `relationship` 视觉变体：`description` / `label` / `inaccessible`
- 可选箭头，位置由 floating-ui 计算
- 位置在滚动、resize 时自动重算（由 Popover 提供）

## API

### Props

| 属性              | 类型                                           | 默认值          | 描述                            |
| ----------------- | ---------------------------------------------- | --------------- | ------------------------------- |
| `content`         | `string`                                       | `undefined`     | 提示文本，也可用 `content` 插槽 |
| `maxWidth`        | `number`                                       | `200`           | 浮层最大宽度（px）              |
| `wrapText`        | `boolean`                                      | `true`          | 是否允许文本换行                |
| `placement`       | `Placement`                                    | `'top'`         | 显示位置                        |
| `offset`          | `number`                                       | `4`             | 与触发元素的间距（px）          |
| `attach`          | `string \| HTMLElement \| (() => HTMLElement)` | `'body'`        | 挂载目标                        |
| `visible`         | `boolean`                                      | `undefined`     | 受控可见性                      |
| `defaultVisible`  | `boolean`                                      | `false`         | 非受控初始可见性                |
| `trigger`         | `'hover' \| 'focus' \| 'both' \| 'manual'`     | `'hover'`       | 触发方式                        |
| `delay`           | `number`                                       | `250`           | 显示延迟（ms）                  |
| `closeDelay`      | `number`                                       | `250`           | 隐藏延迟（ms）                  |
| `relationship`    | `'description' \| 'label' \| 'inaccessible'`   | `'description'` | 视觉变体                        |
| `withArrow`       | `boolean`                                      | `false`         | 是否显示箭头                    |
| `onVisibleChange` | `(visible: boolean) => void`                   | `undefined`     | 可见性变化回调                  |

### Slots

| 插槽名    | 描述                              |
| --------- | --------------------------------- |
| `default` | 触发元素                          |
| `content` | 自定义内容，优先于 `content` prop |

## 使用示例

### 基础用法

```vue
<TTooltip content="提示文本">
  <TButton>悬停查看</TButton>
</TTooltip>
```

### 悬停或聚焦都触发

```vue
<TTooltip content="提示" trigger="both" with-arrow>
  <TButton>悬停或 Tab 聚焦</TButton>
</TTooltip>
```

### 受控

```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>

<template>
  <TTooltip content="受控提示" trigger="manual" :visible="visible">
    <TButton @click="visible = true">显示</TButton>
  </TTooltip>
</template>
```
</docs>
