# Input 组件设计规格

## 组件概述

Input（输入框）是一个用于接收用户文本输入的基础表单控件。它是构建任何 Web 应用的核心组件之一。

## 设计目标

- 提供一致的文本输入体验
- 支持多种外观变体和尺寸
- 支持受控和非受控模式
- 提供清晰的状态反馈（禁用、只读、错误等）
- 与 Fluent Design System 保持视觉一致性
- 使用纯 CSS Variables，零运行时开销

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

## 文件结构

```
src/input/
├── Input.tsx                  # 主组件
├── Input.types.ts             # TypeScript 类型定义
├── useInput.ts                # 逻辑钩子
├── useInputClasses.ts         # 纯 CSS 类名钩子
├── renderInput.ts             # 渲染函数
├── input.css                  # 完整的组件样式
├── index.ts                   # 导出文件
├── tests/
│   └── Input.test.ts          # 单元测试
└── docs/
    ├── Input.story.vue        # Histoire 文档
    └── SPEC.md                # 本文档
```

## 样式实现

### v1.0.0 纯 CSS + BEM 命名策略

**语义化类名定义 (useInputClasses.ts)：**

```typescript
export const inputClassNames = {
  root: 't-input',
  inputWrapper: 't-input__input-wrapper',
  input: 't-input__input',
  contentBefore: 't-input__content-before',
  contentAfter: 't-input__content-after',
  clearButton: 't-input__clear-button',
  passwordToggleButton: 't-input__password-toggle',
  progressIndicator: 't-input__progress-indicator',
} as const;

export const inputVariants = {
  appearance: {
    outline: '',
    filled: 't-input--filled',
    underlined: 't-input--underlined',
    'inline-dark': 't-input--inline-dark',
    'inline-light': 't-input--inline-light',
  },
  size: {
    small: 't-input--small',
    medium: '',
    large: 't-input--large',
  },
  validationState: {
    none: '',
    valid: 'validation-valid',
    warning: 'validation-warning',
    invalid: 'validation-invalid',
  },
  state: {
    disabled: 'disabled',
    error: 'error',
    readonly: 'readonly',
  },
};
```

**CSS 样式实现 (input.css)：**

```css
/* Input 基础样式 */
.t-input {
  /* 布局 */
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.t-input__input {
  /* 使用 CSS Variables */
  background-color: var(--colorNeutralBackground1);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-radius: var(--borderRadiusMedium);
  color: var(--colorNeutralForeground1);
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  padding: var(--spacingVerticalSNudge) var(--spacingHorizontalMN);
  width: 100%;

  /* 布局 */
  box-sizing: border-box;
  outline: none;
}

/* 外观变体 */
.t-input--filled .t-input__input {
  background-color: var(--colorNeutralBackground1);
}

.t-input--underlined .t-input__input {
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
}

/* 尺寸变体 */
.t-input--small .t-input__input {
  font-size: var(--fontSizeBase200);
  padding: var(--spacingVerticalXXS) var(--spacingHorizontalS);
}

.t-input--large .t-input__input {
  font-size: var(--fontSizeBase400);
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
}

/* 状态 */
.t-input .t-input__input.disabled {
  background-color: var(--colorNeutralBackgroundDisabled);
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

.t-input .t-input__input.error {
  border-color: var(--colorPaletteRedBorder1);
}

/* 交互状态 */
.t-input__input:hover:not(:disabled) {
  border-color: var(--colorNeutralStroke1Hover);
}

.t-input__input:focus {
  border-color: var(--colorBrandStroke1);
  outline: var(--strokeWidthThick) solid var(--colorBrandStroke1);
  outline-offset: calc(var(--strokeWidthThick) * -1);
}
```

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

## 参考资源

- **@fluentui/react-components Input**: https://react.fluentui.dev/?path=/docs/components-input--docs
- **Fluent Design 设计规范**: https://www.fluent2.microsoft.design/
- **HTML5 input 元素**: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-02-13 | 初始实现 |
| 1.1.0 | 2026-02-27 | **重大变更**：迁移到纯 CSS Variables 方案 |

### 版本 1.1.0 详细变更（2026-02-27）

**迁移目标：**
- 从 Griffel CSS-in-JS 迁移到纯 CSS Variables
- 使用 BEM 命名规范提供语义化类名
- 移除运行时样式开销，提升性能

**新增文件：**
- ✅ `useInputClasses.ts` - 纯 CSS 类名钩子

**删除文件：**
- ❌ `useInputStyles.styles.ts` - Griffel 样式钩子
- ❌ `input.styles.ts` - Griffel 样式定义

**修改文件：**
- 🔄 `Input.tsx` - 更新为使用 `useInputClasses`
- 🔄 `input.css` - 更新为完整样式
- 🔄 `index.ts` - 更新导出

**改进：**
- ✅ 包体积减少
- ✅ 完全支持 SSR
- ✅ 更好的开发体验
- ✅ 类型安全的类名生成
- ✅ 移除 Griffel 依赖
