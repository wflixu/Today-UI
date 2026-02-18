<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Tooltip from '../Tooltip'

// 基础示例
const basicArgs = reactive({
  content: '这是一个 Tooltip',
})

// 定位示例
const placementArgs = reactive({
  content: 'Tooltip 内容',
  placement: 'top',
})

// 延迟示例
const delayArgs = reactive({
  content: '延迟 500ms 显示',
  delay: 500,
  closeDelay: 300,
})

// 箭头示例
const arrowArgs = reactive({
  content: '带箭头的 Tooltip',
  withArrow: true,
})

// 关系类型示例
const relationshipArgs = reactive({
  relationship: 'description',
})

// 内容槽位示例
const slotArgs = reactive({
  content: '默认内容',
})

// 受控模式示例
const controlledVisible = ref(false)

</script>

<template>
  <Story title="Components/Tooltip">
    <Variant title="基础用法">
      <Tooltip v-bind="basicArgs">
        <button>鼠标悬停查看</button>
      </Tooltip>
    </Variant>

    <Variant title="不同位置">
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <Tooltip content="Top Tooltip" placement="top">
          <button>Top</button>
        </Tooltip>
        <Tooltip content="Bottom Tooltip" placement="bottom">
          <button>Bottom</button>
        </Tooltip>
        <Tooltip content="Left Tooltip" placement="left">
          <button>Left</button>
        </Tooltip>
        <Tooltip content="Right Tooltip" placement="right">
          <button>Right</button>
        </Tooltip>
      </div>
    </Variant>

    <Variant title="延迟显示">
      <Tooltip v-bind="delayArgs">
        <button>鼠标悬停 500ms 后显示</button>
      </Tooltip>
    </Variant>

    <Variant title="带箭头">
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <Tooltip content="Top Arrow" placement="top" :with-arrow="true">
          <button>Top Arrow</button>
        </Tooltip>
        <Tooltip content="Bottom Arrow" placement="bottom" :with-arrow="true">
          <button>Bottom Arrow</button>
        </Tooltip>
        <Tooltip content="Left Arrow" placement="left" :with-arrow="true">
          <button>Left Arrow</button>
        </Tooltip>
        <Tooltip content="Right Arrow" placement="right" :with-arrow="true">
          <button>Right Arrow</button>
        </Tooltip>
      </div>
    </Variant>

    <Variant title="关系类型">
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <Tooltip content="Description (默认)" relationship="description">
          <button>Description</button>
        </Tooltip>
        <Tooltip content="Label (品牌色)" relationship="label">
          <button>Label</button>
        </Tooltip>
        <Tooltip content="Inaccessible (灰色)" relationship="inaccessible">
          <button>Inaccessible</button>
        </Tooltip>
      </div>
    </Variant>

    <Variant title="自定义内容">
      <Tooltip>
        <template #content>
          <div style="padding: 4px;">
            <strong>自定义内容</strong>
            <p>支持富文本和 HTML</p>
          </div>
        </template>
        <button>自定义内容 Tooltip</button>
      </Tooltip>
    </Variant>

    <Variant title="触发方式">
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <Tooltip content="Hover 触发" trigger="hover">
          <button>Hover</button>
        </Tooltip>
        <Tooltip content="Focus 触发" trigger="focus">
          <input type="text" placeholder="聚焦触发" />
        </Tooltip>
        <Tooltip content="Both 触发" trigger="both">
          <button>Both</button>
        </Tooltip>
      </div>
    </Variant>

    <Variant title="受控模式">
      <div>
        <Tooltip :visible="controlledVisible" content="受控模式 Tooltip">
          <button>受控 Tooltip</button>
        </Tooltip>
        <div style="margin-top: 10px;">
          <button @click="controlledVisible = !controlledVisible">
            {{ controlledVisible ? '隐藏' : '显示' }} Tooltip
          </button>
        </div>
      </div>
    </Variant>

    <Variant title="最大宽度">
      <Tooltip
        content="这是一个很长的 Tooltip 内容，用于测试最大宽度限制和自动换行功能"
        :max-width="300"
      >
        <button>长内容 Tooltip</button>
      </Tooltip>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Tooltip 组件

用于显示简短上下文信息的浮层组件。

## 基础用法

\`\`\`vue
<Tooltip content="这是一个 Tooltip">
  <button>鼠标悬停查看</button>
</Tooltip>
\`\`\`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | string | - | Tooltip 显示的文本内容 |
| maxWidth | number | 200 | 最大宽度（px） |
| wrapText | boolean | true | 是否自动换行 |
| placement | Placement | 'top' | 显示位置 |
| offset | number | 4 | 与触发元素的偏移距离（px） |
| attach | AttachNode | 'body' | 挂载节点 |
| visible | boolean | - | 受控模式：是否显示 |
| defaultVisible | boolean | false | 非受控模式：初始是否显示 |
| trigger | 'hover' \| 'focus' \| 'both' \| 'manual' | 'hover' | 触发模式 |
| delay | number | 250 | 显示延迟（ms） |
| closeDelay | number | 250 | 隐藏延迟（ms） |
| relationship | 'description' \| 'label' \| 'inaccessible' | 'description' | 关系类型 |
| withArrow | boolean | false | 是否显示箭头 |
| onVisibleChange | (visible: boolean) => void | - | 可见性变化回调 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素（必需） |
| content | 自定义内容（优先于 content prop） |

## 设计规范

Tooltip 遵循 Fluent Design System 视觉规范：
- 使用设计令牌（Design Tokens）控制样式
- 支持淡入淡出动画（200ms）
- 支持多种位置和触发方式
- 完全响应式状态管理（使用 computed）
</docs>
