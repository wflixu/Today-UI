# Field 组件设计规格

## 组件概述

Field 是一个用于组合 Label、Input、HelperText 和 ValidationMessage 的布局容器。它为表单字段提供统一的布局和验证消息显示。

## 设计目标

- 提供一致的表单字段布局
- 支持垂直和水平两种布局方向
- 支持验证状态和验证消息显示
- 与 Fluent Design System 保持视觉一致性
- 保持组件简洁，易于组合使用

## 组件定位

Field 是一个**完全独立的布局容器**：
- **不内置** Label、HelperText 功能
- 用户需要手动组合 Label、Field、Input、HelperText 组件
- Field 只负责布局和验证消息显示

## 设计原则

### 1. 组件独立性

Field 是完全独立的布局容器：
- 不强制用户使用 Label 或 HelperText
- 用户可以选择只使用 Field + Input
- 灵活的 slot 系统，用户完全控制

### 2. 职责单一

Field 只负责布局和验证：
- ✅ 布局管理（垂直/水平方向）
- ✅ 验证消息显示
- ❌ 不负责 Label 显示（由 Label 组件负责）
- ❌ 不负责辅助文字（由 HelperText 组件负责）

### 3. 灵活性优先

用户可以选择不同的使用方式：
- 简单场景：Label + Input（不使用 Field）
- 带验证：Field + Label + Input
- 完整字段：Field + Label + Input + HelperText

## API 参考

### Props

```typescript
interface FieldProps {
  // 验证
  validationMessage?: string;        // 验证消息
  validationState?: 'none' | 'valid' | 'warning' | 'invalid';  // 验证状态

  // 布局
  orientation?: 'vertical' | 'horizontal';  // 布局方向
}
```

### Slots

```typescript
interface FieldSlots {
  // 表单控件（Input、Select 等）
  default?: Slot;

  // Label 组件（用户手动放置）
  label?: Slot;

  // HelperText 组件（用户手动放置）
  helperText?: Slot;

  // 自定义验证消息
  validationMessage?: Slot;
}
```

## 使用示例

### 模式 1: 简单场景（不使用 Field）

```vue
<Label for="username">用户名</Label>
<Input id="username" />
```

### 模式 2: 带验证

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

### 模式 3: 带辅助文字

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

### 模式 4: 完整表单字段

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

### 模式 5: 水平布局

```vue
<Field orientation="horizontal">
  <template #label>
    <Label for="username">用户名</Label>
  </template>
  <Input id="username" />
</Field>
```

### 模式 6: 登录表单

```vue
<script setup>
import { ref, computed } from 'vue'
import Field from 'today-ui/field'
import Label from 'today-ui/label'
import Input from 'today-ui/input'

const email = ref('')
const password = ref('')

const emailState = computed(() => {
  if (!email.value) return 'none'
  return email.value.includes('@') ? 'valid' : 'invalid'
})

const emailMessage = computed(() => {
  if (emailState.value === 'valid') return '邮箱格式正确'
  return '请输入有效的邮箱地址'
})
</script>

<template>
  <form @submit.prevent>
    <Field :validation-state="emailState" :validation-message="emailMessage">
      <template #label>
        <Label for="email" required>邮箱</Label>
      </template>
      <Input id="email" v-model="email" type="email" />
    </Field>

    <Field>
      <template #label>
        <Label for="password" required>密码</Label>
      </template>
      <Input id="password" v-model="password" type="password" />
      <template #helperText>
        <HelperText>密码长度至少 8 位</HelperText>
      </template>
    </Field>

    <button type="submit">登录</button>
  </form>
</template>
```

## 验证状态

Field 支持四种验证状态：

| 状态 | 颜色 | 图标 | 使用场景 |
|------|------|------|----------|
| `none` | 默认 | 无 | 无验证状态（默认） |
| `valid` | 绿色 | ✓ | 验证通过 |
| `warning` | 橙色 | ⚠ | 警告信息 |
| `invalid` | 红色 | ✕ | 验证失败 |

## 文件结构

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
├── HelperText.tsx               # HelperText 组件（配合使用）
├── HelperText.types.ts          # HelperText 类型定义
├── useHelperText.ts             # HelperText 逻辑钩子
├── useHelperTextStyles.styles.ts # HelperText 样式应用
├── helperText.styles.ts         # HelperText Griffel 样式
├── renderHelperText.ts          # HelperText 渲染函数
└── docs/
    ├── Field.story.vue          # Storybook 文档
    ├── SPEC.md                  # 本文档
    └── HelperText.spec.md       # HelperText 组件文档
```

## 样式实现

### Griffel + CSS 混合样式策略

**Griffel (field.styles.ts)** - 处理所有静态样式：
- 基础样式 (root)
- 布局方向 (vertical, horizontal)
- 验证状态 (valid, warning, invalid)
- 内容容器 (content)

**CSS (field.css)** - 处理伪类样式：
- 无伪类样式需求

### 样式应用逻辑

```typescript
export const useFieldStyles = (state: FieldState): void => {
  const styles = useFieldStyles();

  // Root element
  const rootClasses = [
    fieldClassNames.root,
    styles.root,
    styles[state.orientation],  // vertical or horizontal
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses, state.root.className),
  };

  // Content wrapper
  if (state.content) {
    state.content.className = mergeClasses(
      fieldClassNames.content,
      styles.content,
      state.content.className
    );
  }

  // Validation message
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      fieldClassNames.validationMessage,
      styles.validationMessage,
      styles[state.validationState],
      state.validationMessage.className
    );
  }
};
```

## 实现细节

### 渲染逻辑

Field 组件的渲染遵循以下顺序：

1. **Label slot**（如果提供）
2. **Content wrapper** → 包含 default slot（表单控件）
3. **HelperText slot**（如果提供）
4. **Validation message**（来自 prop 或 slot）

```typescript
export const renderField = (state: FieldState, slots: FieldSlotsType) => {
  const children: any[] = [];

  // Label
  if (slots.label?.()) {
    children.push(slots.label());
  }

  // Content
  children.push(h('div', { ...state.content }, slots.default?.()));

  // HelperText
  if (slots.helperText?.()) {
    children.push(slots.helperText());
  }

  // Validation message
  if (slots.validationMessage?.()) {
    children.push(slots.validationMessage());
  } else if (state.validationMessage) {
    children.push(h('div', {
      ...state.validationMessage,
      role: 'status',
      'aria-live': 'polite',
    }, [
      state.validationState === 'valid' && '✓ ',
      state.validationState === 'warning' && '⚠ ',
      state.validationState === 'invalid' && '✕ ',
      state.validationMessage,
    ].filter(Boolean)));
  }

  return h('div', { ...state.root }, children);
};
```

## 设计决策

### 1. Label 和 Field 完全分离

**理由：**
- Label 和 Field 是完全独立的组件
- Label 可以独立使用，不依赖 Field
- Field 只负责布局和验证，不内置 Label 功能
- 组件职责单一，易于理解和维护
- 用户完全控制如何组合组件

**影响：**
- 用户需要手动组合 Label 和 Field
- 代码稍微冗长，但更清晰
- 组件更灵活，可以适应更多场景

### 2. 不提供"快速模式"

**理由：**
- 避免组件 API 膨胀
- 强制用户理解组件的组合方式
- 保持组件库简洁
- 用户可以自己封装高阶组件

**影响：**
- 需要更多代码来创建表单字段
- 但代码更明确，不易出错

### 3. HelperText 作为独立组件

**理由：**
- HelperText 可以显示任何辅助说明，不限于验证消息
- 可以独立使用，与任何表单控件配合
- 支持多种验证状态的颜色（valid、warning、invalid）
- 与 Field 组件放在同一目录，便于配合使用

**影响：**
- 用户可以在 Field 的 helperText slot 和独立 HelperText 组件之间选择
- 提供更大的灵活性

### 4. Orientation 支持

**理由：**
- Vertical（默认）最常见，适合标准表单
- Horizontal 适用于紧凑布局和表单密集场景
- 通过 flexbox 实现简单的布局切换

## 无障碍性

### 验证消息

Field 组件通过以下方式支持无障碍性：

- 验证消息使用 `role="status"` 标识
- 使用 `aria-live="polite"` 非侵入式地通知屏幕阅读器
- 验证图标（✓、⚠、✕）作为纯文本，屏幕阅读器可以读取

### Label 关联

用户需要确保：
- Label 的 `for` 属性与 Input 的 `id` 匹配
- Field 组件不自动管理这个关联

**示例：**
```vue
<Field>
  <template #label>
    <Label for="username">用户名</Label>  <!-- for="username" -->
  </template>
  <Input id="username" />  <!-- id="username" -->
</Field>
```

## 迁移指南

如果你之前使用了内置 label 的 Field：

```vue
<!-- 旧版本（不再支持） -->
<Field label="用户名" required>
  <Input v-model="username" />
</Field>
```

**改为：**

```vue
<!-- 新版本（独立组件） -->
<Field>
  <template #label>
    <Label for="username" required>用户名</Label>
  </template>
  <Input id="username" v-model="username" />
</Field>
```

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-02-16 | 初始实现（位于 src/input/Field.tsx）|
| 1.1.0 | 2026-02-17 | **重大变更**：重新设计为完全独立的布局容器，移除 label、required、helperText props |
| 1.2.0 | 2026-02-17 | **目录重构**：从 src/input/ 移动到独立的 src/field/ 目录 |
| 1.3.0 | 2026-02-17 | **组件整合**：HelperText 组件移动到 src/field/ 目录，与 Field 组件放在一起 |

### 版本 1.1.0 详细变更（2026-02-17）

**重新设计目标：**
- Label 和 Field 完全独立
- Field 不内置 Label 或 HelperText 功能
- 用户手动组合组件

**移除的 props：**
- ❌ `label`
- ❌ `required`
- ❌ `helperText`

**保留的 props：**
- ✅ `validationMessage`
- ✅ `validationState`
- ✅ `orientation`

**新增的 slots：**
- ✅ `label` slot - 用户手动放置 Label 组件
- ✅ `helperText` slot - 用户手动放置 HelperText 组件

### 版本 1.2.0 详细变更（2026-02-17）

**目录重构：**
- 从 `src/input/Field.tsx` 移动到 `src/field/Field.tsx`
- 所有 Field 相关文件移动到 `src/field/` 目录
- 更新所有导入路径
- 更新文档引用

**理由：**
- Field 是独立组件，不应该放在 input 文件夹中
- 更清晰的目录结构

### 版本 1.3.0 详细变更（2026-02-17）

**组件整合：**
- HelperText 组件从 `src/label/` 移动到 `src/field/`
- HelperText 与 Field 组件紧密配合
- 统一的导出：`export { HelperText } from 'today-ui/field'`

**理由：**
- HelperText 主要与 Field 配合使用
- 更合理的目录组织
- 便于相关组件的维护

## 参考资源

### 本项目文件

**Field 组件：**
- [src/field/Field.tsx](../Field.tsx) - 主组件
- [src/field/Field.types.ts](../Field.types.ts) - 类型定义
- [src/field/useField.ts](../useField.ts) - 逻辑钩子
- [src/field/useFieldStyles.styles.ts](../useFieldStyles.styles.ts) - 样式应用
- [src/field/field.styles.ts](../field.styles.ts) - Griffel 样式
- [src/field/renderField.ts](../renderField.ts) - 渲染函数
- [src/field/field.css](../field.css) - CSS 样式

**HelperText 组件：**
- [src/field/HelperText.tsx](../HelperText.tsx) - 主组件
- [src/field/HelperText.types.ts](../HelperText.types.ts) - 类型定义
- [src/field/useHelperText.ts](../useHelperText.ts) - 逻辑钩子
- [src/field/useHelperTextStyles.styles.ts](../useHelperTextStyles.styles.ts) - 样式应用
- [src/field/helperText.styles.ts](../helperText.styles.ts) - Griffel 样式
- [src/field/renderHelperText.ts](../renderHelperText.ts) - 渲染函数
- [src/field/docs/HelperText.spec.md](HelperText.spec.md) - HelperText 文档

**配合组件：**
- [src/label/Label.tsx](../../label/Label.tsx) - Label 组件
- [src/input/Input.tsx](../../input/Input.tsx) - Input 组件

### 外部参考

- **Fluent UI v9 Field**: https://storybooks.fluentui.dev/react/?path=/docs/components-field--docs
- **Fluent UI v9 Label**: https://storybooks.fluentui.dev/react/?path=/docs/components-label--docs
- **Fluent UI v9 Input**: https://storybooks.fluentui.dev/react/?path=/docs/components-input--docs
- **Fluent Design 设计规范**: https://www.fluent2.microsoft.design/
