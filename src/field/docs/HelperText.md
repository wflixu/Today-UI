# HelperText 组件

## 组件概述

HelperText（辅助文字）是一个用于显示表单控件辅助信息或验证消息的组件。它与 Field 组件配合使用，为用户提供额外的上下文信息。

## 设计目标

- 提供一致的辅助文字体验
- 支持验证状态颜色（valid、warning、invalid）
- 支持禁用状态
- 与 Fluent Design System 保持视觉一致性
- 与 Field 组件紧密配合

## 功能范围

### 支持的验证状态

| 状态 | 颜色 | 使用场景 |
|------|------|----------|
| `none` | 默认灰色 | 普通辅助说明 |
| `valid` | 绿色 | 验证通过提示 |
| `warning` | 橙色 | 警告信息 |
| `invalid` | 红色 | 验证失败提示 |

### 状态控制

| 状态 | 说明 | 表现 |
|------|------|------|
| `disabled` | 禁用状态 | 灰色显示 |
| `validationState` | 验证状态 | 改变文字颜色 |

## API 参考

### Props

```typescript
interface HelperTextProps {
  // 内容
  text?: string;              // 辅助文本（也可以使用默认 slot）

  // 状态
  disabled?: boolean;         // 禁用状态
  validationState?: 'none' | 'valid' | 'warning' | 'invalid';  // 验证状态颜色
}
```

### Slots

```typescript
interface HelperTextSlots {
  // 自定义辅助文字内容（优先级高于 text prop）
  default?: Slot;
}
```

## 使用示例

### 基础用法

```vue
<Field>
  <template #label>
    <Label for="password">密码</Label>
  </template>
  <Input id="password" type="password" />
  <template #helperText>
    <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
  </template>
</Field>
```

### 验证状态

```vue
<Field :validation-state="emailState" :validation-message="emailMessage">
  <template #label>
    <Label for="email" required>邮箱地址</Label>
  </template>
  <Input id="email" v-model="email" type="email" />
</Field>
```

### 自定义内容

```vue
<HelperText>
  <a href="/help" target="_blank">查看密码要求</a>
</HelperText>
```

## 组件职责

HelperText 专注于辅助文字显示：
- ✅ 显示辅助说明文字
- ✅ 显示验证消息（通过 validationState）
- ✅ 支持禁用状态
- ❌ 不负责表单布局（由 Field 负责）
- ❌ 不负责标签显示（由 Label 负责）

## 文件结构

```
src/field/
├── HelperText.tsx              # 主组件
├── HelperText.types.ts         # TypeScript 类型定义
├── useHelperText.ts            # 逻辑钩子
├── useHelperTextStyles.styles.ts # 样式应用
├── helperText.styles.ts        # Griffel 样式
├── renderHelperText.ts         # 渲染函数
├── Field.tsx                    # Field 组件（配合使用）
└── docs/
    ├── Field.story.vue          # Storybook 文档（包含 HelperText 示例）
    └── HelperText.spec.md       # 本文档
```

## 样式实现

### Griffel + CSS 混合样式策略

**Griffel (helperText.styles.ts)** - 处理所有静态样式：
- 基础样式 (root)
- 验证状态 (valid, warning, invalid)
- 禁用状态 (disabled)

**CSS (field.css)** - 处理伪类样式：
- 无伪类样式需求

### 样式应用逻辑

```typescript
export const useHelperTextStyles = (state: HelperTextState): void => {
  const styles = useHelperTextStyles();

  const rootClasses = [
    helperTextClassNames.root,                    // 语义类
    styles.root,                                  // Griffel 基础样式
    state.disabled && styles.disabled,             // Griffel 禁用状态
    state.validationState !== 'none' && styles[state.validationState], // Griffel 验证状态
  ].filter(Boolean);

  state.root = {
    ...state.root,
    className: mergeClasses(...rootClasses, state.root.className),
  };
};
```

**关键优化：**
- ❌ 移除了修饰符类生成：`validation-${state.validationState}`, `disabled`
- ✅ 完全依赖 Griffel 处理状态样式
- ✅ 添加详细的 JSDoc 说明样式策略

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-02-16 | 初始实现（位于 src/label/） |
| 1.1.0 | 2026-02-17 | **目录重构**：移动到 src/field/，优化样式实现 |
