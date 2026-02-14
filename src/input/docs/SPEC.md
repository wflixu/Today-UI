# Input 组件设计规格

## 组件概述

Input（输入框）是一个用于接收用户文本输入的基础表单控件。它是构建任何 Web 应用的核心组件之一。

## 设计目标

- 提供一致的文本输入体验
- 支持多种外观变体和尺寸
- 支持受控和非受控模式
- 提供清晰的状态反馈（禁用、只读、错误等）
- 与 Fluent Design System 保持视觉一致性

## 功能范围

### 支持的外观变体

| 变体 | 说明 | 使用场景 |
|------|------|---------|
| `outline` | 带边框的标准输入框（默认） | 通用场景 |
| `filled` | 填充背景的输入框 | 需要强调输入区域 |
| `underlined` | 仅底部边框的输入框 | 简洁风格、表单密集场景 |
| `inline-dark` | 深色内联样式 | 深色主题的内联编辑 |
| `inline-light` | 浅色内联样式 | 浅色主题的内联编辑 |

### 支持的尺寸

| 尺寸 | 高度 | 字体大小 | 使用场景 |
|------|------|----------|---------|
| `small` | 28px | var(--fontSizeBase200) | 紧凑布局 |
| `medium` | 32px | var(--fontSizeBase300) | 默认尺寸（推荐） |
| `large` | 40px | var(--fontSizeBase400) | 需要更大点击区域 |

### 支持的输入框类型

- `text` - 文本输入（默认）
- `password` - 密码输入
- `email` - 邮箱地址
- `number` - 数字输入
- `tel` - 电话号码
- `url` - URL 地址
- `search` - 搜索框

### 状态控制

| 状态 | 说明 | 表现 |
|------|------|------|
| `disabled` | 禁用状态 | 灰色显示、不可交互 |
| `readonly` | 只读状态 | 保持正常样式、不可编辑 |
| `required` | 必填状态 | 可在应用层添加视觉标识 |
| `error` | 错误状态 | 红色边框 |

### 插槽支持

| 插槽 | 说明 | 典型用途 |
|------|------|---------|
| `contentBefore` | 前置内容 | 图标、标签、前缀符号 |
| `contentAfter` | 后置内容 | 清除按钮、眼睛图标（密码显示/隐藏）、单位 |

## API 参考

### Props

```typescript
interface InputProps {
  // 外观
  appearance?: 'outline' | 'filled' | 'underlined' | 'inline-dark' | 'inline-light'

  // 尺寸
  size?: 'small' | 'medium' | 'large'

  // 状态
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean

  // 内容
  modelValue?: string        // v-model 支持
  defaultValue?: string     // 非受控模式
  placeholder?: string
  maxLength?: number
  minLength?: number

  // 语义属性
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  name?: string
  autocomplete?: string

  // 事件
  onChange?: (value: string, event: Event) => void
  onInput?: (value: string, event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}
```

### Slots

```typescript
interface InputSlots {
  contentBefore?: Slot   // 前置内容
  contentAfter?: Slot    // 后置内容
  default?: Slot         // 默认内容（通常不使用）
}
```

## 使用示例

### 基础用法

```vue
<script setup>
import { ref } from 'vue'
import Input from 'today-ui/input'

const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="请输入用户名" />
</template>
```

### 外观变体

```vue
<template>
  <Input appearance="filled" placeholder="填充风格" />
  <Input appearance="underlined" placeholder="下划线风格" />
  <Input appearance="inline-dark" placeholder="深色内联" />
</template>
```

### 尺寸变体

```vue
<template>
  <Input size="small" placeholder="小号" />
  <Input size="medium" placeholder="中号" />
  <Input size="large" placeholder="大号" />
</template>
```

### 前置和后置内容

```vue
<template>
  <Input placeholder="搜索">
    <template #contentBefore>
      <SearchIcon />
    </template>
  </Input>

  <Input type="password" placeholder="密码">
    <template #contentAfter>
      <EyeIcon />
    </template>
  </Input>
</template>
```

### 受控和非受控模式

```vue
<script setup>
import { ref } from 'vue'
import Input from 'today-ui/input'

// 受控模式
const controlledValue = ref('')

// 非受控模式
const uncontrolledValue = ref('default value')
</script>

<template>
  <!-- 受控：使用 v-model -->
  <Input v-model="controlledValue" />

  <!-- 非受控：使用 defaultValue -->
  <Input :default-value="uncontrolledValue" />
</template>
```

## 样式实现

### Griffel 样式

- 基础样式和布局使用 griffel 的 `makeStyles` 定义
- 使用 Design Tokens 引用颜色、尺寸、间距等设计变量
- 原子化样式定义，便于组合和复用

### CSS 样式

- 伪类样式（:hover、:focus、:disabled）使用 CSS 定义
- 外观变体的交互状态使用 CSS 修饰符
- 错误状态的颜色使用 CSS 覆盖

### 类名约定

使用 BEM 风格的语义化类名：

- `.t-input` - 根元素
- `.t-input__input` - 输入框元素
- `.t-input__content-before` - 前置内容
- `.t-input__content-after` - 后置内容
- `.t-input--<appearance>` - 外观变体修饰符
- `.t-input--<size>` - 尺寸变体修饰符
- `.t-input--disabled` - 禁用状态
- `.t-input--error` - 错误状态
- `.t-input--readonly` - 只读状态

## 无障碍性

**根据项目规范，本组件不实现无障碍性功能。**

如需无障碍性支持，用户应在应用层自行添加：
- `aria-label` 属性
- `aria-describedby` 属性
- `aria-invalid` 属性（错误状态）
- 键盘导航处理

## 实现细节

### 受控/非受控模式

使用 `internalValue` ref 处理非受控模式，使用 `computed` 计算当前值：

```typescript
const internalValue = ref(props.defaultValue ?? '');
const currentValue = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : internalValue.value;
});
```

仅在非受控模式下更新内部值：

```typescript
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (props.modelValue === undefined) {
    internalValue.value = value;
  }

  props.onInput?.(value, event);
};
```

### 样式应用

在 `useInputStyles` 中合并语义化类名和 griffel 生成的类名：

```typescript
const rootClasses = [
  inputClassNames.root,
  state.appearance !== 'outline' && `appearance-${state.appearance}`,
  state.size !== 'medium' && `size-${state.size}`,
  state.disabled && 'disabled',
  state.error && 'error',
  styles.root,
  styles[state.appearance],
  styles[state.size],
].filter(Boolean);

state.root = {
  ...state.root,
  className: mergeClasses(...rootClasses, state.root.className),
};
```

## 参考资源

- **@fluentui/react-components Input**: https://react.fluentui.dev/?path=/docs/components-input--docs
- **Fluent Design 设计规范**: https://www.fluent2.microsoft.design/
- **HTML5 input 元素**: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-02-13 | 初始实现 |
