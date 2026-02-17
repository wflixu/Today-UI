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

## 组件优化计划

### 背景

基于 Fluent UI v9 的 Input 组件设计（https://storybooks.fluentui.dev/react/?path=/docs/components-input--docs），当前 Input 组件已有完整的实现，但缺少 **Field 组件模式**。Fluent UI v9 提供了 Field 组件用于将 Input 与 Label、Helper Text 和 Validation Message 组合成完整的表单字段。

### 优化目标

1. **添加 Label 组件** - 提供独立的标签组件，支持必填标识、样式变体
2. **添加 Field 组件** - 遵循 Fluent UI v9 模式，提供 Label + Input + Helper Text + Validation Message 的完整表单字段包装器
3. **添加 HelperText 组件** - 辅助说明文字组件
4. **实现字符计数器** - 可选的字符计数显示功能
5. **遵循现有模式** - 复用 useInput、useInputStyles 和 Griffel 样式模式

---


### 2. HelperText 组件设计

#### 组件定位

HelperText 是用于显示辅助说明文字的组件，通常放在表单控件下方，提供额外的上下文信息。

#### 使用示例

```vue
<!-- 基础用法 -->
<Input id="email" v-model="email" />
<HelperText>请输入您的工作邮箱地址</HelperText>

<!-- 与 Field 配合 -->
<Field>
  <Label for="password">密码</Label>
  <Input id="password" type="password" />
  <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
</Field>
```

#### API 设计

```typescript
interface HelperTextProps {
  // 内容
  text?: string;              // 辅助文本（也可以使用默认 slot）

  // 状态
  disabled?: boolean;          // 继承表单控件的禁用状态

  // 样式
  validationState?: 'none' | 'valid' | 'warning' | 'invalid';  // 验证状态颜色
}

interface HelperTextSlots {
  // 自定义辅助文本内容
  default?: Slot;
}
```

#### 文件结构

```
src/label/
├── HelperText.tsx             # 主组件
├── HelperText.types.ts        # TypeScript 类型定义
├── useHelperText.ts           # 逻辑钩子
├── helperText.styles.ts       # Griffel 样式
├── index.ts                   # 导出（与 Label 一起）
└── docs/
    └── HelperText.story.vue   # Storybook 文档（可合并到 Label.story.vue）
```

#### 样式实现

```typescript
// helperText.styles.ts
export const useHelperTextStyles = makeStyles({
  root: {
    display: 'block',
    fontSize: 'var(--fontSizeBase200)',
    color: 'var(--colorNeutralForeground2)',
    marginTop: 'var(--spacingVerticalXXS)',
  },

  disabled: {
    color: 'var(--colorNeutralForegroundDisabled)',
  },

  valid: {
    color: 'var(--colorPaletteGreenForeground1)',
  },

  warning: {
    color: 'var(--colorPaletteDarkOrangeForeground1)',
  },

  invalid: {
    color: 'var(--colorPaletteRedForeground1)',
  },
});
```

---

### 3. Field 组件设计

#### 组件定位

Field 组件是一个完全独立的布局容器，用于组合 Label、Input、HelperText 和 ValidationMessage。

**重要：Field 不内置 Label 或 HelperText，用户需要手动组合这些组件。**

#### 使用方式

**基础用法：**

```vue
<Field>
  <template #label>
    <Label for="username" required>用户名</Label>
  </template>
  <Input id="username" v-model="username" />
</Field>
```

**带辅助文字：**

```vue
<Field>
  <template #label>
    <Label for="password" required>密码</Label>
  </template>
  <Input id="password" v-model="password" type="password" />
  <template #helperText>
    <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
  </template>
</Field>
```

**带验证消息：**

```vue
<Field
  :validation-state="emailState"
  :validation-message="emailMessage"
>
  <template #label>
    <Label for="email" required>邮箱地址</Label>
  </template>
  <Input id="email" v-model="email" type="email" />
</Field>
```

**完整表单字段：**

```vue
<Field
  :validation-state="passwordState"
  :validation-message="passwordMessage"
>
  <template #label>
    <Label for="password" required>密码</Label>
  </template>
  <Input id="password" v-model="password" type="password" />
  <template #helperText>
    <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
  </template>
</Field>
```

**水平布局：**

```vue
<Field orientation="horizontal">
  <template #label>
    <Label for="username">用户名</Label>
  </template>
  <Input id="username" />
</Field>
```

#### API 设计

```typescript
interface FieldProps {
  // 验证
  validationMessage?: string;
  validationState?: 'none' | 'valid' | 'warning' | 'invalid';

  // 布局
  orientation?: 'vertical' | 'horizontal';
}

interface FieldSlots {
  // 默认插槽：放置 Input 或其他表单控件
  default?: Slot;

  // Label 插槽：用户手动放置 Label 组件
  label?: Slot;

  // HelperText 插槽：用户手动放置 HelperText 组件
  helperText?: Slot;

  // ValidationMessage 插槽：自定义验证消息
  validationMessage?: Slot;
}
```

#### 文件结构

```
src/field/
├── Field.tsx                    # 主组件
├── Field.types.ts               # TypeScript 类型定义
├── useField.ts                  # 逻辑钩子
├── useFieldStyles.styles.ts     # 样式应用
├── field.styles.ts              # Griffel 样式
├── renderField.ts               # 渲染函数
├── field.css                    # CSS 交互状态
├── index.ts                     # 导出文件
└── docs/
    └── Field.story.vue          # Storybook 文档
```

#### 样式实现

遵循现有 Input 组件的模式：

```typescript
// useFieldStyles.styles.ts - 样式合并模式
export const fieldClassNames = {
  root: 't-field',
  content: 't-field__content',
  validationMessage: 't-field__validation-message',
};

// field.styles.ts - Griffel 样式
export const useFieldStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalS)',
  },
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 'var(--spacingHorizontalM)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  validationMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalXS)',
    fontSize: 'var(--fontSizeBase200)',
  },
  valid: {
    color: 'var(--colorPaletteGreenForeground1)',
  },
  warning: {
    color: 'var(--colorPaletteDarkOrangeForeground1)',
  },
  invalid: {
    color: 'var(--colorPaletteRedForeground1)',
  },
});
```

### CharacterCounter 组件设计

#### 组件定位

用于显示字符计数，可与 Field 或 Input 单独使用：

```vue
<Field label="个人简介">
  <Input v-model="bio" :max-length="200" />
  <template #validationMessage>
    <CharacterCounter :value="bio" :max-length="200" />
  </template>
</Field>
```

#### API 设计

```typescript
interface CharacterCounterProps {
  value: string;
  maxLength: number;
  showPercentage?: boolean;      // 显示百分比
  warningThreshold?: number;     // 警告阈值（默认 0.8，即 80%）
  errorThreshold?: number;       // 错误阈值（默认 0.95，即 95%）
}
```

#### 文件结构

```
src/input/
├── CharacterCounter.tsx
├── CharacterCounter.types.ts
├── useCharacterCounter.ts
└── characterCounter.styles.ts
```

### 实现步骤

#### Phase 1: Label 和 HelperText 组件（基础）

**Label 组件：**

1. 创建 [src/label/Label.types.ts](src/label/Label.types.ts) - 定义 Props、State、Slots
2. 创建 [src/label/useLabel.ts](src/label/useLabel.ts) - 实现逻辑钩子
3. 创建 [src/label/label.styles.ts](src/label/label.styles.ts) - 定义 Griffel 样式
4. 创建 [src/label/useLabelStyles.styles.ts](src/label/useLabelStyles.styles.ts) - 样式合并逻辑
5. 创建 [src/label/renderLabel.ts](src/label/renderLabel.ts) - 渲染函数
6. 创建 [src/label/Label.tsx](src/label/Label.tsx) - 主组件
7. 创建 [src/label/label.css](src/label/label.css) - 交互状态样式
8. 创建 [src/label/index.ts](src/label/index.ts) - 导出文件
9. 创建 [src/label/docs/Label.story.vue](src/label/docs/Label.story.vue) - Storybook 文档

**HelperText 组件：**

1. 创建 [src/label/HelperText.types.ts](src/label/HelperText.types.ts)
2. 创建 [src/label/useHelperText.ts](src/label/useHelperText.ts)
3. 创建 [src/label/helperText.styles.ts](src/label/helperText.styles.ts)
4. 创建 [src/label/renderHelperText.ts](src/label/renderHelperText.ts)
5. 创建 [src/label/HelperText.tsx](src/label/HelperText.tsx)
6. 更新 [src/label/index.ts](src/label/index.ts) - 导出 HelperText
7. 在 Label.story.vue 中添加 HelperText 示例

#### Phase 2: Field 组件

1. 创建 [src/field/Field.types.ts](src/field/Field.types.ts) - 定义 Props、State、Slots
2. 创建 [src/field/useField.ts](src/field/useField.ts) - 实现逻辑钩子
3. 创建 [src/field/field.styles.ts](src/field/field.styles.ts) - 定义 Griffel 样式
4. 创建 [src/field/useFieldStyles.styles.ts](src/field/useFieldStyles.styles.ts) - 样式合并逻辑
5. 创建 [src/field/renderField.ts](src/field/renderField.ts) - 渲染函数
6. 创建 [src/field/Field.tsx](src/field/Field.tsx) - 主组件
7. 创建 [src/field/field.css](src/field/field.css) - 交互状态样式
8. 创建 [src/field/index.ts](src/field/index.ts) - 导出文件
9. 创建 [src/field/docs/Field.story.vue](src/field/docs/Field.story.vue) - 文档
10. 更新 [src/components.ts](src/components.ts) - 导出 Field
11. 更新 [src/index.ts](src/index.ts) - 导出 Field

#### Phase 3: CharacterCounter 组件（可选）

1. 创建 [src/input/CharacterCounter.types.ts](src/input/CharacterCounter.types.ts)
2. 创建 [src/input/useCharacterCounter.ts](src/input/useCharacterCounter.ts)
3. 创建 [src/input/characterCounter.styles.ts](src/input/characterCounter.styles.ts)
4. 创建 [src/input/renderCharacterCounter.ts](src/input/renderCharacterCounter.ts)
5. 创建 [src/input/CharacterCounter.tsx](src/input/CharacterCounter.tsx)
6. 更新 Field.story.vue 添加示例

#### Phase 4: 集成和测试

1. 更新 [src/input/index.ts](src/input/index.ts) - 导出 Field 和 CharacterCounter
2. 更新 [src/index.ts](src/index.ts) - 导出 Label 组件
3. 创建综合表单示例（登录表单、注册表单等）
4. 测试向后兼容性
5. 测试无障碍性（label/input 关联）
6. Storybook 视觉回归测试

### 设计决策

#### 1. Label 和 Field 完全分离

- **理由**：
  - Label 和 Field 是完全独立的组件
  - Label 可以独立使用，不依赖 Field
  - Field 只负责布局和验证，不内置 Label 功能
  - 组件职责单一，易于理解和维护
  - 用户完全控制如何组合组件
- **影响**：
  - 用户需要手动组合 Label 和 Field
  - 代码稍微冗长，但更清晰
  - 组件更灵活，可以适应更多场景

#### 2. HelperText 作为独立组件

- **理由**：
  - HelperText 可以显示任何辅助说明，不限于验证消息
  - 可以独立使用，与任何表单控件配合
  - 支持多种验证状态的颜色（valid、warning、invalid）
- **影响**：
  - 用户可以在 Field 的 helperText prop 和独立 HelperText 组件之间选择
  - 提供更大的灵活性

#### 3. Field 提供两种使用方式

- **理由**：
  - 快速方式：使用 props 适合简单场景，代码更简洁
  - 灵活方式：使用独立组件适合复杂场景，可自定义更多细节
  - 两种方式可以并存，满足不同需求
- **影响**：
  - 增加 API 表面，但提供更好的用户体验
  - 需要维护两套文档示例

#### 4. Field 作为独立组件

- **理由**：遵循 Fluent UI v9 模式，保持 Input 简洁，Field 可包装其他控件（Select、Textarea）
- **影响**：向后兼容，现有 Input 使用不受影响

#### 5. 命名约定

- **理由**：
  - 使用 "Label" 和 "HelperText" 作为独立组件名，与 HTML 元素和 Fluent UI v9 保持一致
  - 使用 "Field" 作为包装器组件，表示包含 Label + Control + HelperText 的完整字段
- **影响**：术语统一，便于理解

#### 6. Orientation 支持

- **理由**：Vertical（默认）最常见，Horizontal 适用于紧凑表单
- **影响**：增加灵活性，通过 flexbox 实现

#### 7. 验证状态管理

- **理由**：Field 接受 validationState 作为 prop，不内部管理验证逻辑
- **影响**：遵循受控组件模式，父组件管理验证

### 关键文件

#### 需要创建的文件

**Label 组件（优先级最高）：**

1. [src/label/Label.tsx](src/label/Label.tsx) - 主组件
2. [src/label/Label.types.ts](src/label/Label.types.ts) - 类型定义
3. [src/label/useLabel.ts](src/label/useLabel.ts) - 逻辑钩子
4. [src/label/useLabelStyles.styles.ts](src/label/useLabelStyles.styles.ts) - 样式应用
5. [src/label/label.styles.ts](src/label/label.styles.ts) - Griffel 样式
6. [src/label/renderLabel.ts](src/label/renderLabel.ts) - 渲染函数
7. [src/label/label.css](src/label/label.css) - CSS 交互
8. [src/label/index.ts](src/label/index.ts) - 导出文件
9. [src/label/docs/Label.story.vue](src/label/docs/Label.story.vue) - Storybook 文档

**HelperText 组件（优先级高）：**

1. [src/label/HelperText.tsx](src/label/HelperText.tsx) - 主组件
2. [src/label/HelperText.types.ts](src/label/HelperText.types.ts) - 类型定义
3. [src/label/useHelperText.ts](src/label/useHelperText.ts) - 逻辑钩子
4. [src/label/helperText.styles.ts](src/label/helperText.styles.ts) - Griffel 样式
5. [src/label/renderHelperText.ts](src/label/renderHelperText.ts) - 渲染函数

**Field 组件（优先级高）：**

1. [src/field/Field.tsx](src/field/Field.tsx) - 主组件
2. [src/field/Field.types.ts](src/field/Field.types.ts) - 类型定义
3. [src/field/useField.ts](src/field/useField.ts) - 逻辑钩子
4. [src/field/useFieldStyles.styles.ts](src/field/useFieldStyles.styles.ts) - 样式应用
5. [src/field/field.styles.ts](src/field/field.styles.ts) - Griffel 样式
6. [src/field/renderField.ts](src/field/renderField.ts) - 渲染函数
7. [src/field/field.css](src/field/field.css) - CSS 交互
8. [src/field/index.ts](src/field/index.ts) - 导出文件
9. [src/field/docs/Field.story.vue](src/field/docs/Field.story.vue) - Storybook 文档

**CharacterCounter 组件（可选，优先级低）：**

1. [src/input/CharacterCounter.tsx](src/input/CharacterCounter.tsx) - 主组件
2. [src/input/CharacterCounter.types.ts](src/input/CharacterCounter.types.ts) - 类型定义
3. [src/input/useCharacterCounter.ts](src/input/useCharacterCounter.ts) - 逻辑钩子
4. [src/input/characterCounter.styles.ts](src/input/characterCounter.styles.ts) - Griffel 样式
5. [src/input/renderCharacterCounter.ts](src/input/renderCharacterCounter.ts) - 渲染函数

#### 需要修改的文件

1. [src/field/index.ts](src/field/index.ts) - 导出 Field 组件
2. [src/components.ts](src/components.ts) - 添加 Field 默认导出
3. [src/index.ts](src/index.ts) - 导出 Field 组件
4. [src/input/Input.types.ts](src/input/Input.types.ts) - 添加可选的 `id` prop（可选）

### 参考资源

#### 现有实现模式

- [src/input/useInput.ts](src/input/useInput.ts) - 逻辑钩子模式
- [src/input/useInputStyles.styles.ts](src/input/useInputStyles.styles.ts) - 样式合并模式
- [src/input/input.styles.ts](src/input/input.styles.ts) - Griffel 样式模式
- [src/input/docs/Input.story.vue](src/input/docs/Input.story.vue) - 文档示例

#### 外部参考

- **Fluent UI v9 Input**: https://storybooks.fluentui.dev/react/?path=/docs/components-input--docs
- **Fluent UI v9 Label**: https://storybooks.fluentui.dev/react/?path=/docs/components-label--docs
- **Fluent UI v9 Field**: https://storybooks.fluentui.dev/react/?path=/docs/components-field--docs
- **Fluent Design 设计规范**: https://www.fluent2.microsoft.design/

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-02-13 | 初始实现 |
| 1.1.0 | 2026-02-16 | 添加 Field 和 CharacterCounter 组件优化计划 |
| 1.2.0 | 2026-02-16 | 添加 Label 和 HelperText 独立组件设计，优化组件架构 |
| 1.3.0 | 2026-02-17 | **重大变更**：重新设计 Field 组件为完全独立的布局容器，移除 label、required、helperText props |
| 1.4.0 | 2026-02-17 | **目录重构**：将 Field 组件从 src/input/ 移动到独立的 src/field/ 目录 |
| 1.5.0 | 2026-02-17 | **目录重构**：将 HelperText 组件从 src/label/ 移动到 src/field/ 目录，与 Field 组件放在一起 |

