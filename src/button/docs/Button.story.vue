<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { logEvent } from 'histoire/client'
import TButton from '../Button'
import type { ButtonProps } from '../Button.types'

// 定义辅助函数
const showAlert = (message: string) => {
  alert(message)
}

const consoleLog = (message: string) => {
  console.log(message)
}

const state = reactive({
  disabled: false,
  disabledFocusable: false,
  shape: 'rounded' as ButtonProps['shape'],
  appearance: 'secondary' as ButtonProps['appearance'],
  iconPosition: 'before' as ButtonProps['iconPosition'],
  size: 'medium' as ButtonProps['size']
})

const initState = () => {
  return {
    ...state
  }
}

const appearanceOptions = {
  'secondary': 'secondary',
  'primary': 'primary',
  'outline': 'outline',
  'subtle': 'subtle',
  'transparent': 'transparent'
}

const shapeOptions = {
  "rounded": "rounded",
  "circular": "circular",
  "square": "square"
}

const sizeOptions = {
  'small': 'small',
  'medium': 'medium',
  'large': 'large'
}

const iconPositionOptions = {
  'before': 'before',
  'after': 'after'
}

// Loading 状态测试
const loading = ref(false)
const handleLoad = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// 为"点击事件" Variant 创建专门的状态
const eventsState = () => ({
  handlePrimaryClick: (event: MouseEvent) => {
    logEvent('primary-click', { appearance: 'primary', message: 'Primary clicked!' })
  },
  handleSecondaryClick: (event: MouseEvent) => {
    logEvent('secondary-click', { appearance: 'secondary', message: 'Secondary clicked!' })
  },
  handleOutlineClick: (event: MouseEvent) => {
    logEvent('outline-click', { appearance: 'outline', message: 'Outline clicked' })
  },
  handleSubtleClick: (event: MouseEvent) => {
    logEvent('subtle-click', { appearance: 'subtle', message: 'Subtle clicked' })
  },
  handleTransparentClick: (event: MouseEvent) => {
    logEvent('transparent-click', { appearance: 'transparent', message: 'Transparent clicked' })
  },
})
</script>

<template>
  <Story title="Components/Button" :initState="initState">
    <template #controls="{ state }">
      <HstSelect v-model="state.appearance" title="appearance" :options="appearanceOptions" />
      <HstSelect v-model="state.shape" title="shape" :options="shapeOptions" />
      <HstSelect v-model="state.size" title="size" :options="sizeOptions" />
      <HstSelect v-model="state.iconPosition" title="iconPosition" :options="iconPositionOptions" />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstCheckbox v-model="state.disabledFocusable" title="Disabled Focusable" />
    </template>

    <Variant title="基础按钮" :initState="initState">
      <template #default="{ state }">
        <TButton :appearance="state.appearance" :shape="state.shape" :size="state.size"
          :icon-position="state.iconPosition" :disabled="state.disabled" :disabled-focusable="state.disabledFocusable">
          基础按钮
        </TButton>
      </template>
    </Variant>

    <Variant title="外观变体">
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <TButton appearance="primary">Primary</TButton>
        <TButton appearance="secondary">Secondary</TButton>
        <TButton appearance="outline">Outline</TButton>
        <TButton appearance="subtle">Subtle</TButton>
        <TButton appearance="transparent">Transparent</TButton>
      </div>
    </Variant>

    <Variant title="形状变体">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton shape="rounded">Rounded</TButton>
        <TButton shape="circular">Circular</TButton>
        <TButton shape="square">Square</TButton>
      </div>
    </Variant>

    <Variant title="尺寸变体">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton size="small">Small</TButton>
        <TButton size="medium">Medium</TButton>
        <TButton size="large">Large</TButton>
      </div>
    </Variant>

    <Variant title="带图标">
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <TButton>
          <template #icon>📄</template>
          图标在前
        </TButton>
        <TButton icon-position="after">
          <template #icon>📄</template>
          图标在后
        </TButton>
        <TButton>
          <template #icon>🔍</template>
        </TButton>
      </div>
    </Variant>

    <Variant title="状态">
      <div style="display: flex; gap: 12px;">
        <TButton>正常状态</TButton>
        <TButton disabled>禁用状态</TButton>
        <TButton disabled disabled-focusable>禁用但可聚焦</TButton>
      </div>
    </Variant>

    <Variant title="Loading 状态">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton :loading="loading" @click="handleLoad">
          点击加载
        </TButton>
        <TButton loading loading-text="处理中...">
          带加载文本
        </TButton>
        <TButton appearance="primary" loading>
          Primary 加载中
        </TButton>
        <TButton appearance="outline" loading>
          Outline 加载中
        </TButton>
      </div>
    </Variant>

    <Variant title="点击事件" :initState="eventsState">
      <template #default="{ state }">
        <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
          <TButton appearance="primary" @click="state.handlePrimaryClick">
            点击我（Primary）
          </TButton>
          <TButton @click="state.handleSecondaryClick">
            点击我（Secondary）
          </TButton>
          <TButton appearance="outline" @click="state.handleOutlineClick">
            点击查看控制台（Outline）
          </TButton>
          <TButton appearance="subtle" @click="state.handleSubtleClick">
            点击查看控制台（Subtle）
          </TButton>
          <TButton appearance="transparent" @click="state.handleTransparentClick">
            点击查看控制台（Transparent）
          </TButton>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Button 组件

Button 组件是用户界面中最基础的交互元素，用于触发操作或导航。实现了微软 Fluent Design System 的按钮规范。

## 特性

- ✅ 5 种外观样式（Primary、Secondary、Outline、Subtle、Transparent）
- ✅ 3 种尺寸（Small、Medium、Large）
- ✅ 3 种形状（Rounded、Circular、Square）
- ✅ 支持图标和图标位置控制
- ✅ 内置加载状态和 Spinner
- ✅ 完整的禁用和禁用可聚焦状态
- ✅ 完全遵循 Fluent Design 视觉规范

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `appearance` | `'primary' \| 'secondary' \| 'outline' \| 'subtle' \| 'transparent'` | `'secondary'` | 按钮的外观样式 |
| `shape` | `'rounded' \| 'circular' \| 'square'` | `'rounded'` | 按钮的形状 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮的尺寸 |
| `icon-position` | `'before' \| 'after'` | `'before'` | 图标相对于文本的位置 |
| `disabled` | `boolean` | `false` | 是否禁用按钮 |
| `disabled-focusable` | `boolean` | `false` | 禁用但可聚焦（用于保持 tab 顺序） |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `loading-text` | `string` | `undefined` | 加载时显示的文本 |
| `as` | `string` | `'button'` | 渲染的元素类型（button、a 等） |
| `onClick` | `(event: MouseEvent) => void` | - | 点击事件处理器 |

### Slots

| 插槽名 | 描述 |
|--------|------|
| `default` | 按钮的主要内容（文本或自定义内容） |
| `icon` | 按钮的图标 |

## 外观变体

### Primary
用于页面中最重要的主要操作，如提交表单、确认对话框等。

```vue
<TButton appearance="primary">保存</TButton>
<TButton appearance="primary">确认提交</TButton>
```

### Secondary（默认）
用于次要操作，是默认的按钮样式。

```vue
<TButton>取消</TButton>
<TButton appearance="secondary">关闭</TButton>
```

### Outline
透明背景，仅保留边框，用于需要留白或低优先级的操作。

```vue
<TButton appearance="outline">查看详情</TButton>
<TButton appearance="outline">了解更多</TButton>
```

### Subtle
最小化强调，悬停时才显示背景色，适合不干扰用户的辅助操作。

```vue
<TButton appearance="subtle">编辑</TButton>
<TButton appearance="subtle">删除</TButton>
```

### Transparent
完全透明，用于图标按钮或工具栏。

```vue
<TButton appearance="transparent">
  <template #icon>🔍</template>
</TButton>
```

## 形状变体

### Rounded（默认）
标准圆角，适用于大多数场景。

```vue
<TButton shape="rounded">圆角按钮</TButton>
```

### Circular
完全圆形，适合仅图标按钮。

```vue
<TButton shape="circular">
  <template #icon>➕</template>
</TButton>
```

### Square
小圆角或直角，适合密集布局或按钮组。

```vue
<TButton shape="square">方形按钮</TButton>
```

## 尺寸变体

| 尺寸 | 高度 | 使用场景 |
|------|------|----------|
| `small` | 28px | 密集布局、表格操作 |
| `medium` | 36px | 默认尺寸，表单和对话框 |
| `large` | 44px | 主要操作、移动端友好 |

```vue
<TButton size="small">小按钮</TButton>
<TButton size="medium">中按钮</TButton>
<TButton size="large">大按钮</TButton>
```

## 图标使用

### 带文本的图标按钮

```vue
<!-- 图标在前（默认） -->
<TButton>
  <template #icon>📄</template>
  保存文件
</TButton>

<!-- 图标在后 -->
<TButton icon-position="after">
  下一步
  <template #icon>→</template>
</TButton>
```

### 仅图标按钮

当只提供 `icon` 插槽而不提供 `default` 插槽时，按钮会自动调整为仅图标模式。

```vue
<!-- 圆形仅图标按钮 -->
<TButton shape="circular">
  <template #icon>🔍</template>
</TButton>

<!-- 方形仅图标按钮 -->
<TButton shape="square" size="small">
  <template #icon>✏️</template>
</TButton>
```

## 状态控制

### 禁用状态

```vue
<!-- 禁用按钮 -->
<TButton disabled>无法点击</TButton>

<!-- 禁用但可聚焦（保持 tab 顺序） -->
<TButton disabled disabled-focusable>
  菜单中的禁用项
</TButton>
```

**何时使用 `disabled-focusable`：**
- 菜单或命令栏中的禁用按钮
- 需要保持键盘导航一致性
- 屏幕阅读器用户需要知道禁用选项的存在

### Loading 状态

```vue
<!-- 基础加载状态 -->
<TButton loading>加载中...</TButton>

<!-- 带加载文本 -->
<TButton loading loading-text="正在处理...">
  提交
</TButton>

<!-- 不同外观的加载状态 -->
<TButton appearance="primary" loading>
  提交中
</TButton>
<TButton appearance="outline" loading>
  处理中
</TButton>
```

**Loading 状态特性：**
- 自动禁用按钮，阻止点击
- 显示旋转的 Spinner（仅图标按钮除外）
- 可选显示加载文本（会替换按钮内容）

## 渲染为链接

使用 `as` 属性将按钮渲染为 `<a>` 标签：

```vue
<TButton as="a" href="https://example.com" appearance="outline">
  外部链接
</TButton>

<TButton as="a" href="/docs" appearance="primary">
  查看文档
</TButton>
```

**注意：** 当渲染为链接时，仍需手动添加 `href` 属性。

## 事件处理

```vue
<script setup>
const handleClick = (event) => {
  console.log('Button clicked!', event)
}

const handleAsyncAction = async () => {
  // 处理异步操作
  await fetchData()
}
</script>

<template>
  <!-- 简单点击事件 -->
  <TButton @click="handleClick">
    点击我
  </TButton>

  <!-- 异步操作 -->
  <TButton @click="handleAsyncAction" :loading="isLoading">
    提交表单
  </TButton>
</template>
```

## 完整示例

### 表单提交按钮组

```vue
<template>
  <div style="display: flex; gap: 8px; justify-content: flex-end;">
    <TButton appearance="subtle">取消</TButton>
    <TButton appearance="outline" disabled>保存草稿</TButton>
    <TButton appearance="primary" :loading="isSubmitting">
      提交表单
    </TButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  try {
    await submit()
  } finally {
    isSubmitting.value = false
  }
}
</script>
```

### 工具栏按钮

```vue
<template>
  <div style="display: flex; gap: 4px;">
    <TButton appearance="transparent" size="small">
      <template #icon>📄</template>
    </TButton>
    <TButton appearance="transparent" size="small">
      <template #icon>✏️</template>
    </TButton>
    <TButton appearance="transparent" size="small">
      <template #icon>🗑️</template>
    </TButton>
  </div>
</template>
```

### 操作列表

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <TButton appearance="primary" size="large">
      立即购买
    </TButton>
    <TButton appearance="outline">
      加入购物车
    </TButton>
    <TButton appearance="subtle">
      添加到收藏
    </TButton>
  </div>
</template>
```

## 向后兼容

为了向后兼容，组件仍支持 `type` prop，但**不推荐使用**。建议使用 `appearance` 替代。

```vue
<!-- ⚠️ 旧写法 - 会在控制台显示警告 -->
<TButton type="primary">按钮</TButton>

<!-- ✅ 推荐的新写法 -->
<TButton appearance="primary">按钮</TButton>
```

## 设计规范

Button 组件完全遵循 Fluent Design System 规范：
- 使用 Fluent Design CSS 变量（Design Tokens）
- 标准化的过渡动画（var(--durationFaster)）
- 一致的视觉层次和交互反馈
- 支持亮色和暗色主题

## 无障碍性

**注意：** 根据 Today-UI 项目规范，Button 组件不实现：
- ARIA 属性（aria-label、aria-describedby 等）
- 自定义键盘导航（依赖浏览器默认行为）
- 屏幕阅读器特殊支持

如需无障碍性支持，请在应用层自行添加相关属性。

## 最佳实践

### 1. 按钮层级
- 页面中只有一个主要操作时使用 `primary`
- 次要操作使用 `secondary` 或 `outline`
- 危险操作使用 `subtle` 或自定义样式

### 2. 按钮尺寸
- 表单和对话框使用 `medium`（默认）
- 移动端或主要操作使用 `large`
- 密集布局（表格、工具栏）使用 `small`

### 3. 图标使用
- 仅图标按钮必须使用 `circular` 或 `square` 形状
- 图标应简洁明了，优先使用 Fluent UI 图标
- 避免过度使用图标，保持界面一致性

### 4. Loading 状态
- 异步操作（如提交表单）应显示加载状态
- 加载时间超过 1 秒建议显示 `loading-text`
- 加载期间禁用按钮，防止重复提交

### 5. 文本规范
- 使用动词+名词的形式（如"保存文件"）
- 保持简洁，通常不超过 4 个汉字
- 避免使用"点击这里"等无意义文本
</docs>
