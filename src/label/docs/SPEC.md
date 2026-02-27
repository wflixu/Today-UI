# Label 组件设计规格

## 组件概述

Label（标签）是一个用于为表单控件提供描述性标签的基础组件。它是构建可访问表单的核心组件之一。

## 设计目标

- 提供一致的标签体验
- 支持多种样式变体（大小、字体粗细）
- 支持必填标识和禁用状态
- 与 Fluent Design System 保持视觉一致性
- 通过 `for` 属性与表单控件正确关联
- 保持组件简洁，易于组合使用
- 使用纯 CSS Variables，零运行时开销

## 功能范围

### 支持的样式变体

**尺寸变体：**
- `small` - 小号标签 (fontSizeBase200)
- `medium` - 中号标签，默认尺寸 (fontSizeBase300)
- `large` - 大号标签 (fontSizeBase400)

**字体粗细：**
- `normal` - 正常字体 (fontWeightNormal)
- `semibold` - 半粗体，默认字重 (fontWeightSemibold)
- `bold` - 粗体 (fontWeightBold)

### 状态控制

| 状态 | 说明 | 表现 |
|------|------|------|
| `required` | 必填状态 | 显示红色星号 (*) |
| `disabled` | 禁用状态 | 灰色显示、不可交互 |

### 插槽支持

| 插槽 | 说明 | 典型用途 |
|------|------|---------|
| `default` | 自定义标签内容 | 替代 label prop，支持复杂内容 |
| `requiredIndicator` | 自定义必填标识 | 替代默认的红色星号 |

## 设计原则

### 1. 组件独立性

Label 是完全独立的组件：
- 不依赖 Field 或其他布局组件
- 可以独立使用，配合任何表单控件
- 用户完全控制如何组合组件

### 2. 职责单一

Label 只负责标签显示功能：
- 不负责表单布局（由 Field 负责）
- 不负责验证消息（由 Field 负责）
- 不负责辅助文字（由 HelperText 负责，位于 src/field/HelperText.tsx）

### 3. 纯 CSS 样式策略

**v1.0.0 更新：** 采用纯 CSS Variables + BEM 命名策略：
- 完全使用 CSS Variables 定义样式
- 语义化 BEM 类名
- 类型安全的类名生成
- 零运行时样式开销

### 4. 可访问性优先

- 使用原生 `<label>` 元素
- 通过 `for` 属性关联表单控件的 `id`
- 必填标识对屏幕阅读器隐藏 (`aria-hidden="true"`)
- 支持键盘导航和焦点管理

## 组件定位

Label 是一个独立的标签组件，用于为表单控件提供描述性标签。它可以：

- 独立使用，配合任何表单控件
- 与 Field 组件配合使用
- 支持必填标识
- 支持多种样式变体（大小、粗细）

## 使用示例

```vue
<!-- 基础用法 -->
<Label for="email">邮箱地址</Label>
<Input id="email" v-model="email" />

<!-- 带必填标识 -->
<Label for="password" required>密码</Label>
<Input id="password" type="password" />

<!-- 禁用状态 -->
<Label for="disabled-input" disabled>禁用输入框</Label>
<Input id="disabled-input" disabled />

<!-- 自定义大小 -->
<Label for="username" size="large">用户名</Label>
<Input id="username" size="large" />

<!-- 与 Field 配合 -->
<Field>
  <template #label>
    <Label for="bio" required>个人简介</Label>
  </template>
  <Input id="bio" :max-length="200" />
</Field>
```

## API 设计

```typescript
interface LabelProps {
  // 内容
  label?: string;              // 标签文本（也可以使用默认 slot）
  for?: string;                // htmlFor 属性，关联表单控件的 id

  // 状态
  required?: boolean;          // 显示必填标识（红色星号）
  disabled?: boolean;          // 禁用状态（灰色显示）

  // 样式
  size?: 'small' | 'medium' | 'large';  // 标签大小
  weight?: 'normal' | 'semibold' | 'bold';  // 字体粗细

  // 语义属性
  id?: string;                 // Label 元素的 id
}

interface LabelSlots {
  // 自定义标签内容（优先级高于 label prop）
  default?: Slot;

  // 自定义必填标识
  requiredIndicator?: Slot;
}
```

## 文件结构

```
src/label/
├── Label.tsx                  # 主组件
├── Label.types.ts             # TypeScript 类型定义
├── useLabel.ts                # 逻辑钩子
├── useLabelClasses.ts         # 纯 CSS 类名钩子
├── renderLabel.ts             # 渲染函数
├── label.css                  # 完整的组件样式
├── index.ts                   # 导出文件
├── tests/
│   └── Label.test.ts          # 单元测试
└── docs/
    ├── Label.story.vue        # Histoire 文档
    └── SPEC.md                # 本文档
```

**注意：** HelperText 组件已移动到 [src/field/HelperText.tsx](../field/HelperText.tsx)

## 样式实现

### v1.0.0 纯 CSS + BEM 命名策略

**语义化类名定义 (useLabelClasses.ts)：**

```typescript
export const labelClassNames = {
  root: 't-label',
  requiredIndicator: 't-label__required-indicator',
} as const;

export const labelVariants = {
  size: {
    small: 'size-small',
    medium: '',
    large: 'size-large',
  },
  weight: {
    normal: 'weight-normal',
    semibold: '',
    bold: 'weight-bold',
  },
  state: {
    disabled: 'disabled',
  },
};
```

**CSS 样式实现 (label.css)：**

```css
/* Label 基础样式 */
.t-label {
  /* 布局 */
  display: inline-block;
  margin-bottom: var(--spacingVerticalXXS);

  /* 字体 */
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  font-weight: var(--fontWeightSemibold);

  /* 颜色 */
  color: var(--colorNeutralForeground1);
}

/* 尺寸变体 */
.t-label.size-small {
  font-size: var(--fontSizeBase200);
}

.t-label.size-large {
  font-size: var(--fontSizeBase400);
}

/* 字体粗细 */
.t-label.weight-normal {
  font-weight: var(--fontWeightNormal);
}

.t-label.weight-bold {
  font-weight: var(--fontWeightBold);
}

/* 禁用状态 */
.t-label.disabled {
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

/* 必填标识 */
.t-label__required-indicator {
  color: var(--colorPaletteRedBorder1);
  margin-left: var(--spacingHorizontalXS);
}

/* 交互状态 */
.t-label:not(.disabled):hover {
  cursor: pointer;
}

.t-label:focus-within {
  outline: none;
}
```

### 类型安全类名生成

```typescript
export function useLabelClasses(props: {
  size?: LabelSize;
  weight?: LabelWeight;
  disabled?: boolean;
}): string {
  const { size = 'medium', weight = 'semibold', disabled = false } = props;

  return cn(
    labelClassNames.root,
    size !== 'medium' && labelVariants.size[size],
    weight !== 'semibold' && labelVariants.weight[weight],
    disabled && labelVariants.state.disabled
  );
}
```

**关键改进：**
- ✅ 完全使用 CSS Variables 和 BEM 类名
- ✅ 类型安全的变体映射
- ✅ 零运行时样式开销
- ✅ 更好的可维护性和调试体验

## 样式实现策略

Label 组件采用纯 CSS Variables 策略：

### CSS Variables
- 基础样式
- 尺寸变体 (small, medium, large)
- 字体粗细 (normal, semibold, bold)
- 状态样式 (disabled)
- 必填标识 (requiredIndicator)

### BEM 命名规范
- `.t-label` - Block（根元素）
- `.t-label__required-indicator` - Element（必填标识）
- `.t-label.size-*` - Modifier（尺寸变体）
- `.t-label.weight-*` - Modifier（字重变体）
- `.t-label.disabled` - State（禁用状态）

**为什么这样设计？**

1. **性能优化**：零运行时样式开销，浏览器原生 CSS 引擎优化
2. **可维护性**：语义化 BEM 类名易于理解和调试
3. **类型安全**：TypeScript 类型保证变体正确性
4. **SSR 友好**：纯 CSS 完全支持服务端渲染
5. **开发体验**：直接在 CSS 文件中调试样式

## 实现步骤

1. 创建 [src/label/Label.types.ts](../Label.types.ts) - 定义 Props、State、Slots
2. 创建 [src/label/useLabel.ts](../useLabel.ts) - 实现逻辑钩子
3. 创建 [src/label/useLabelClasses.ts](../useLabelClasses.ts) - 类名钩子
4. 创建 [src/label/renderLabel.ts](../renderLabel.ts) - 渲染函数
5. 创建 [src/label/Label.tsx](../Label.tsx) - 主组件
6. 创建 [src/label/label.css](../label.css) - 组件样式
7. 创建 [src/label/index.ts](../index.ts) - 导出文件
8. 创建 [src/label/docs/Label.story.vue](Label.story.vue) - Histoire 文档
9. 创建 [src/label/tests/Label.test.ts](../tests/Label.test.ts) - 单元测试

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-02-16 | 初始实现 |
| 1.1.0 | 2026-02-17 | **优化实现**：移除 Griffel 和 CSS 之间的样式冗余，明确样式职责分离 |
| 1.2.0 | 2026-02-27 | **重大变更**：迁移到纯 CSS Variables 方案 |

### 版本 1.1.0 详细变更

**优化目标：**
- 消除样式冗余，所有静态样式仅在 Griffel 中定义一次
- 明确 CSS 职责，仅用于伪类样式（:hover, :focus-within）
- 保持 API 不变，无破坏性变更

### 版本 1.2.0 详细变更（2026-02-27）

**迁移目标：**
- 从 Griffel CSS-in-JS 迁移到纯 CSS Variables
- 使用 BEM 命名规范提供语义化类名
- 移除运行时样式开销，提升性能
- 简化样式架构，提高可维护性

**新增文件：**
- ✅ `useLabelClasses.ts` - 纯 CSS 类名钩子

**删除文件：**
- ❌ `useLabelStyles.styles.ts` - Griffel 样式钩子
- ❌ `label.styles.ts` - Griffel 样式定义

**修改文件：**
- 🔄 `Label.tsx` - 更新为使用 `useLabelClasses`
- 🔄 `label.css` - 更新为完整样式（包含所有变体）
- 🔄 `index.ts` - 更新导出

**改进：**
- ✅ 包体积减少
- ✅ 完全支持 SSR
- ✅ 更好的开发体验和调试体验
- ✅ 类型安全的类名生成
- ✅ 移除 Griffel 依赖

**向后兼容性：**
- ✅ 所有 props 功能保持不变
- ✅ 所有 slots 功能保持不变
- ✅ 视觉输出完全一致
- ✅ API 接口保持不变
