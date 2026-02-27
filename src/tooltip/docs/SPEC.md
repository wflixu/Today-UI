# Tooltip 组件设计规格

## 组件概述

Tooltip 是一个用于显示简短上下文信息的浮层组件，当用户将鼠标悬停、聚焦或点击元素时显示。遵循 Fluent Design System 视觉规范。

## 设计目标

- 提供一致的上下文信息体验
- 支持多种定位选项和关系类型
- 支持受控和非受控模式
- 与 Fluent Design System 保持视觉一致性
- 遵循项目组件模式（computed 响应式状态）
- 使用纯 CSS Variables，零运行时开销

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

  // 使用纯 CSS 类名 Hook
  const classes = useTooltipClasses({
    isVisible: tooltipState.isVisible,
    relationship: tooltipState.relationship,
    withArrow: tooltipState.withArrow,
  });

  // 应用类名到状态
  tooltipState.className = classes.root;
  tooltipState.arrowClassName = classes.arrow;

  return tooltipState;
});
```

### 2. 纯 CSS 样式策略

- **CSS** (tooltip.css): 处理所有样式
  - 基础样式（root）
  - 可见状态（visible）
  - 关系类型（label, inaccessible）
  - 箭头样式（arrow）
  - 伪类动画（opacity, transform）

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
├── useTooltipClasses.ts           # 纯 CSS 类名钩子
├── renderTooltip.tsx              # 渲染函数
├── tooltip.css                    # 完整的组件样式
├── index.ts                       # 导出文件
├── tests/
│   └── Tooltip.test.ts           # 单元测试
└── docs/
    ├── Tooltip.story.vue          # Histoire 文档
    └── SPEC.md                    # 本文档
```

## 样式实现

### v1.0.0 纯 CSS + BEM 命名策略

**语义化类名定义 (useTooltipClasses.ts)：**

```typescript
export const tooltipClassNames = {
  root: 't-tooltip',
  content: 't-tooltip__content',
  arrow: 't-tooltip__arrow',
} as const;

export const tooltipVariants = {
  relationship: {
    description: '',
    label: 't-tooltip--label',
    inaccessible: 't-tooltip--inaccessible',
  },
  state: {
    visible: 'visible',
  },
};
```

**CSS 样式实现 (tooltip.css)：**

```css
/* Tooltip 基础样式 */
.t-tooltip {
  /* 定位 */
  position: absolute;
  z-index: 1000;
  pointer-events: none;

  /* 尺寸 */
  max-width: var(--widthTooltipMax);

  /* 外观 */
  border-radius: var(--borderRadiusMedium);
  box-shadow: var(--shadow8);

  /* 排版 */
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase200);
  font-weight: var(--fontWeightRegular);
  line-height: var(--lineHeightBase200);

  /* 颜色 */
  background-color: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);

  /* 内边距 */
  padding: 4px 8px;

  /* 动画初始状态 */
  opacity: 0;
  transform: scale(0.95);

  /* 文本换行 */
  word-wrap: break-word;
  overflow-wrap: break-word;

  /* 过渡效果 */
  transition-duration: var(--durationNormal);
  transition-timing-function: var(--curveDecelerateMin);
  transition-property: opacity, transform;
}

/* 可见状态 */
.t-tooltip.visible {
  opacity: 1;
  transform: scale(1);
}

/* 关系类型 */
.t-tooltip--label {
  background-color: var(--colorBrandBackground);
  color: var(--colorNeutralForegroundOnBrand);
  border-color: transparent;
}

.t-tooltip--inaccessible {
  background-color: var(--colorNeutralBackground3);
  color: var(--colorNeutralForeground2);
}

/* 箭头 */
.t-tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--colorNeutralBackground1);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  transform: rotate(45deg);
}

.t-tooltip--label .t-tooltip__arrow {
  background-color: var(--colorBrandBackground);
  border-color: transparent;
}
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
| 2.1.0 | 2026-02-27 | **重大变更**：迁移到纯 CSS Variables 方案 |

### 版本 2.0.0 详细变更

**架构统一：**
- ✅ 采用 computed 响应式状态模式（与 Button/Label 一致）
- ✅ 移除 watch，在 computed 中应用样式
- ✅ 合并样式文件（useTooltipStyles.ts → useTooltipStyles.styles.ts）

### 版本 2.1.0 详细变更（2026-02-27）

**迁移目标：**
- 从 Griffel CSS-in-JS 迁移到纯 CSS Variables
- 使用 BEM 命名规范提供语义化类名
- 移除运行时样式开销，提升性能

**新增文件：**
- ✅ `useTooltipClasses.ts` - 纯 CSS 类名钩子

**删除文件：**
- ❌ `useTooltipStyles.styles.ts` - Griffel 样式钩子
- ❌ `tooltip.styles.ts` - Griffel 样式定义

**修改文件：**
- 🔄 `Tooltip.tsx` - 更新为使用 `useTooltipClasses`
- 🔄 `tooltip.css` - 更新为完整样式
- 🔄 `index.ts` - 更新导出

**改进：**
- ✅ 包体积减少
- ✅ 完全支持 SSR
- ✅ 更好的开发体验
- ✅ 类型安全的类名生成
- ✅ 移除 Griffel 依赖
