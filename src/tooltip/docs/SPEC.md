# Tooltip 组件设计规格

## 组件概述

Tooltip 是一个用于显示简短上下文信息的浮层组件，当用户将鼠标悬停、聚焦或点击元素时显示。遵循 Fluent Design System 视觉规范。

## 设计目标

- 提供一致的上下文信息体验
- 支持多种定位选项和关系类型
- 支持受控和非受控模式
- 与 Fluent Design System 保持视觉一致性
- 遵循项目组件模式（computed 响应式状态）

## 功能范围

### 支持的定位

| 位置 | Placement 值 |
|------|---------------|
| 上方 | `top`, `top-start`, `top-end` |
| 下方 | `bottom`, `bottom-start`, `bottom-end` |
| 左侧 | `left`, `left-start`, `left-end` |
| 右侧 | `right`, `right-start`, `right-end` |

### 支持的触发模式

| 模式 | 触发条件 | 使用场景 |
|------|----------|----------|
| `hover` | 鼠标悬停 | 信息提示 |
| `focus` | 获得焦点 | 表单字段说明 |
| `both` | 悬停或聚焦 | 增强可见性 |
| `manual` | 手动控制 | 编程控制 |

### 支持的关系类型

| 类型 | 视觉效果 | 使用场景 |
|------|----------|----------|
| `description` | 默认中性背景 | 通用提示信息 |
| `label` | 品牌背景色 | 重要标签说明 |
| `inaccessible` | 深色背景 | 装饰性内容 |

## API 参考

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `content` | `string` | `undefined` | Tooltip 文本内容 |
| `maxWidth` | `number` | `200` | 最大宽度（px） |
| `wrapText` | `boolean` | `true` | 是否自动换行 |
| `placement` | `Placement` | `'top'` | 显示位置 |
| `offset` | `number` | `4` | 与触发元素的偏移距离（px） |
| `attach` | `string \| function` | `'body'` | 挂载节点 |
| `visible` | `boolean` | `undefined` | 受控模式：是否显示 |
| `defaultVisible` | `boolean` | `false` | 非受控模式：初始状态 |
| `trigger` | `'hover' \| 'focus' \| 'both' \| 'manual'` | `'hover'` | 触发模式 |
| `delay` | `number` | `250` | 显示延迟（ms） |
| `closeDelay` | `number` | `250` | 隐藏延迟（ms） |
| `relationship` | `'description' \| 'label' \| 'inaccessible'` | `'description'` | 关系类型 |
| `withArrow` | `boolean` | `false` | 是否显示箭头 |
| `onVisibleChange` | `(visible: boolean) => void` | `undefined` | 可见性变化回调 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 触发元素（必需） |
| `content` | 自定义内容（优先于 content prop） |

## 使用示例

### 基础用法

```vue
<Tooltip content="这是一个提示">
  <button>悬停查看提示</button>
</Tooltip>
```

### 不同位置

```vue
<Tooltip content="上方提示" placement="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="下方提示" placement="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="左侧提示" placement="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="右侧提示" placement="right">
  <button>Right</button>
</Tooltip>
```

### 带箭头

```vue
<Tooltip content="带箭头的提示" withArrow>
  <button>悬停我</button>
</Tooltip>
```

### 自定义内容

```vue
<Tooltip>
  <button>悬停查看详情</button>
  <template #content>
    <div>
      <strong>自定义内容</strong>
      <p>支持富文本和组件</p>
    </div>
  </template>
</Tooltip>
```

### 受控模式

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <Tooltip :visible="visible" content="受控提示">
    <button @click="visible = !visible">
      {{ visible ? '隐藏' : '显示' }}提示
    </button>
  </Tooltip>
</template>
```

### 延迟显示

```vue
<Tooltip content="延迟500ms显示" :delay="500" :close-delay="200">
  <button>悬停我</button>
</Tooltip>
```

### 关系类型

```vue
<!-- 默认描述类型 -->
<Tooltip content="这是说明文字">
  <button>说明</button>
</Tooltip>

<!-- 标签类型 -->
<Tooltip content="这是标签" relationship="label">
  <button>标签</button>
</Tooltip>

<!-- 装饰性内容 -->
<Tooltip content="装饰信息" relationship="inaccessible">
  <button>装饰</button>
</Tooltip>
```

## 设计原则

### 1. Computed 响应式状态模式

采用与 Button/Label 组件一致的模式：

```typescript
const state = computed(() => {
  // 更新 isVisible 值以保持响应性
  tooltipState.isVisible = tooltipState._isVisible.value;
  // 在 computed 中应用样式
  applyTooltipStyles(tooltipState);
  return tooltipState;
});
```

### 2. 样式职责分离

- **Griffel** (useTooltipStyles.styles.ts): 处理所有静态样式
  - 基础样式（root）
  - 可见状态（visible）
  - 关系类型（label, inaccessible）
  - 箭头样式（arrow）

- **CSS** (tooltip.css): 仅处理动态定位
  - 箭头位置定位（data-placement 选择器）
  - 触发元素包装器

### 3. @floating-ui/vue 集成

使用 Floating UI 提供的 Vue hooks 实现精确定位：
- `offset` - 偏移距离
- `flip` - 自动翻转位置
- `shift` - 自动平移以避免溢出
- `arrow` - 箭头定位

### 4. 受控/非受控模式

- **受控模式**: 通过 `visible` prop 完全控制显示状态
- **非受控模式**: 组件内部管理显示状态，通过 `defaultVisible` 设置初始值

## 无障碍性

**根据项目规范，本组件不实现无障碍性功能。**

不支持：
- ARIA 属性（role, aria-describedby 等）
- 键盘导航
- 屏幕阅读器优化

## 文件结构

```
src/tooltip/
├── Tooltip.tsx                    # 主组件（computed 模式）
├── Tooltip.types.ts               # 类型定义
├── useTooltip.ts                  # 状态管理逻辑
├── useTooltipStyles.styles.ts     # Griffel 样式 + 样式应用
├── renderTooltip.tsx              # 渲染函数
├── tooltip.css                    # CSS（动态定位）
├── index.ts                       # 导出文件
├── tests/
│   └── Tooltip.test.ts           # 单元测试
└── docs/
    ├── Tooltip.story.vue          # Histoire 文档
    └── SPEC.md                    # 本文档
```

## 与 Fluent UI v9 对比

| 功能 | Fluent UI v9 | Today-UI | 说明 |
|------|-------------|----------|------|
| content/children | ✅ | ✅ | 完全兼容 |
| placement | ✅ | ✅ | 完全兼容 |
| withArrow | ✅ | ✅ | 完全兼容 |
| relationship | ✅ | ✅ | 完全兼容（视觉） |
| trigger | ✅ | ✅ | 完全兼容 |
| delay/closeDelay | ✅ | ✅ | 完全兼容 |
| ARIA 属性 | ✅ | ❌ | 项目规范：不实现 |
| 键盘导航 | ✅ | ❌ | 项目规范：不实现 |

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2025-01 | 初始实现（旧架构） |
| 2.0.0 | 2026-02-18 | **重大重构**：统一架构模式，优化样式应用，添加测试 |

### 版本 2.0.0 详细变更

**架构统一：**
- ✅ 采用 computed 响应式状态模式（与 Button/Label 一致）
- ✅ 移除 watch，在 computed 中应用样式
- ✅ 合并样式文件（useTooltipStyles.ts → useTooltipStyles.styles.ts）

**优化：**
- ✅ 简化样式应用逻辑
- ✅ Griffel + CSS 职责分离
- ✅ 移除冗余代码

**新增：**
- ✅ 完整单元测试套件（49 个测试）
- ✅ 简洁的 SPEC 文档
- ✅ 完整的 Story 示例

**删除：**
- ❌ 移除 watch 监听可见性
- ❌ 删除冗余样式文件
- ❌ 删除旧的架构文件（container.tsx, props.ts 等）
