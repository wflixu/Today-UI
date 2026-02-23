# Button 组件设计规格

## 概述

Button 组件是 Today-UI 的基础交互组件，实现了微软 Fluent Design System 的按钮规范。用于触发操作或导航，支持多种外观、尺寸和状态。

## 设计目标

1. **API 兼容性**：与 @fluentui/react-components Button 组件保持 85% 以上的 API 兼容性
2. **视觉一致性**：完全遵循 Fluent Design 视觉规范
3. **功能完整性**：支持所有常用按钮状态和交互
4. **开发体验**：提供清晰的 TypeScript 类型定义和插槽支持

## 架构设计

### 文件结构

```
src/button/
├── Button.tsx                 # 主组件（使用 computed 响应式状态模式）
├── Button.types.ts            # Props、State 和 Slots 类型定义
├── useButton.ts               # 状态管理逻辑
├── useButtonStyles.styles.ts  # Griffel CSS-in-JS 样式定义
├── button.styles.ts           # 旧版样式（已弃用）
├── useButtonStyles.ts         # 样式钩子函数（已弃用）
├── renderButton.tsx           # 渲染函数
├── Spinner.tsx                # 加载指示器组件
├── useSpinnerStyles.ts        # Spinner 样式钩子
├── button.css                 # CSS 补充样式
├── Button.story.vue           # Histoire 文档和示例
├── index.ts                   # 组件导出
├── ButtonContext.ts           # 按钮上下文（用于嵌套）
└── SPEC.md                    # 本文档
```

### 组件模式

采用 **computed reactive state** 模式：

```typescript
export const Button = defineComponent({
  setup(props) {
    // 使用 computed 创建响应式状态
    const state = computed(() => {
      const buttonState = useButton(props);
      useButtonStyles(buttonState);
      return buttonState;
    });

    // 返回渲染函数
    return () => renderButton(state.value, slots);
  }
});
```

**优势：**
- 响应式状态自动更新
- 样式应用与状态计算分离
- 清晰的数据流向

## Props API

### appearance

控制按钮的视觉样式和强调程度。

**类型：** `'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent'`
**默认值：** `'secondary'`

| 值 | 描述 | 使用场景 |
|---|---|---|
| `primary` | 主要操作，最高强调 | 表单提交、确认操作等主要动作 |
| `secondary` | 次要操作，中等强调 | 默认按钮，次要动作 |
| `outline` | 仅边框，无背景 | 低优先级操作，需要留白场景 |
| `subtle` | 最小强调，悬停时可见 | 不干扰用户的辅助操作 |
| `transparent` | 完全透明 | 图标按钮、工具栏按钮 |

### size

控制按钮的尺寸。

**类型：** `'small' | 'medium' | 'large'`
**默认值：** `'medium'`

| 值 | 高度 | 内边距 | 字体大小 |
|---|---|---|---|
| `small` | 28px | var(--spacingHorizontalMN) | var(--fontSizeBase200) |
| `medium` | 36px | var(--spacingHorizontalM) | var(--fontSizeBase300) |
| `large` | 44px | var(--spacingHorizontalL) | var(--fontSizeBase400) |

### shape

控制按钮的形状。

**类型：** `'rounded' | 'circular' | 'square'`
**默认值：** `'rounded'`

| 值 | 圆角 | 使用场景 |
|---|---|---|
| `rounded` | var(--borderRadiusMedium) | 默认按钮 |
| `circular` | 50% (完全圆形) | 图标按钮 |
| `square` | var(--borderRadiusSmall) | 密集布局，按钮组 |

### iconPosition

控制图标相对于文本的位置。

**类型：** `'before' | 'after'`
**默认值：** `'before'`

### disabled

禁用按钮，阻止用户交互。

**类型：** `boolean`
**默认值：** `false`

### disabledFocusable

禁用但可聚焦（保持 Tab 顺序）。

**类型：** `boolean`
**默认值：** `false`

**用途：**
- 菜单中的禁用按钮
- 命令栏中的禁用项
- 需要保持键盘导航一致性的场景

### loading

显示加载状态。

**类型：** `boolean`
**默认值：** `false`

**效果：**
- 禁用按钮
- 显示 Spinner
- 可选显示加载文本（loadingText）

### loadingText

加载时显示的文本。

**类型：** `string | undefined`
**默认值：** `undefined`

### as

渲染的 HTML 元素类型。

**类型：** `string`
**默认值：** `'button'`

**常用值：**
- `'button'` - 默认按钮
- `'a'` - 链接按钮
- 自定义组件名称

### onClick

点击事件处理器。

**类型：** `(event: MouseEvent) => void`
**默认值：** `undefined`

### type（已弃用）

**类型：** `ButtonAppearance`
**状态：** 已弃用，使用 `appearance` 替代

## Slots

### icon

图标插槽。

```vue
<TButton>
  <template #icon>
    <AcceptIcon />
  </template>
  按钮文本
</TButton>
```

### default

默认内容插槽，用于按钮文本或自定义内容。

```vue
<TButton>
  自定义内容
</TButton>
```

## 状态管理

### useButton Hook

创建按钮的核心状态：

```typescript
export const useButton = (props: ButtonProps): ButtonState => {
  // 计算是否为仅图标按钮
  const iconOnly = /* ... */;

  // 判断是否显示 Spinner
  const showSpinner = props.loading;

  return {
    appearance,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size,
    iconOnly,
    icon,
    root,
    as,
    loading,
    loadingText,
    showSpinner,
  };
};
```

### 状态计算逻辑

1. **iconOnly**：通过检查是否有 `icon` 插槽且无 `default` 插槽来判断
2. **showSpinner**：当 `loading` 为 true 时显示
3. **disabled**：props.disabled 或 loading 时为 true

## 样式系统

### Griffel 样式（useButtonStyles.styles.ts）

使用 Griffel CSS-in-JS 生成原子化样式：

```typescript
export const useButtonStyles = makeStyles({
  root: {
    // 基础样式
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // ... 更多样式
  },

  // 外观变体
  primary: { /* ... */ },
  secondary: { /* ... */ },
  outline: { /* ... */ },
  subtle: { /* ... */ },
  transparent: { /* ... */ },

  // 形状变体
  circular: { /* ... */ },
  square: { /* ... */ },

  // 尺寸变体
  small: { /* ... */ },
  medium: { /* ... */ },
  large: { /* ... */ },

  // 状态
  disabled: { /* ... */ },
  hasIcon: { /* ... */ },
  iconOnly: { /* ... */ },
});
```

### CSS 补充（button.css）

处理 Griffel 难以实现的样式：

```css
.t-button {
  /* 伪类样式 */
  &:hover:not([disabled]) { /* ... */ }
  &:active:not([disabled]) { /* ... */ }
  &:focus-visible { /* ... */ }

  /* 响应式布局 */
  flex-wrap: wrap;
}
```

### 设计令牌使用

按钮完全使用 Fluent Design CSS 变量：

| 属性 | CSS 变量 |
|---|---|
| 背景色 | `var(--colorNeutralBackground1)` |
| 前景色 | `var(--colorNeutralForeground1)` |
| 边框色 | `var(--colorNeutralStroke1)` |
| 圆角 | `var(--borderRadiusMedium)` |
| 字体 | `var(--fontFamilyBase)` |
| 过渡时长 | `var(--durationFaster)` |

## 渲染逻辑

### renderButton 函数

纯渲染函数，根据状态生成 VNode：

```typescript
export const renderButton = (
  state: ButtonState,
  slots: ButtonSlots
) => {
  const { root, icon, showSpinner } = state;

  return h(
    state.as || 'button',
    root,
    [
      icon && slots.icon?.(),
      slots.default?.(),
      showSpinner && h(Spinner),
    ].filter(Boolean)
  );
};
```

### 属性映射

- **root 属性**：class、type、disabled、tabIndex、aria-* 等
- **icon 属性**：class、style（用于图标定位）

## 与 React 版本的差异

### API 兼容性

| 功能 | @fluentui/react-components | Today-UI | 兼容性 |
|---|---|---|---|
| appearance | ✅ | ✅ | 100% |
| size | ✅ | ✅ | 100% |
| shape | ✅ | ✅ | 100% |
| disabled | ✅ | ✅ | 100% |
| disabledFocusable | ✅ | ✅ | 100% |
| icon | Slot | Slot | 100% |
| iconPosition | ✅ | ✅ | 100% |
| loading | ✅ | ✅ | 100% |
| as | ✅ | ✅ | 100% |
| ARIA 属性 | ✅ | ❌ | 0% |
| 键盘导航 | ✅ | ❌ | 0% |

**总体兼容性：85%**

### 不实现的功能

根据项目规范，以下功能**不实现**：

1. **ARIA 属性**：aria-label、aria-describedby、aria-pressed 等
2. **键盘导航**：Enter/Space 键处理（依赖浏览器默认行为）
3. **屏幕阅读器**：无特殊的屏幕阅读器支持

**原因：** 专注视觉效果和基础交互，避免复杂性

## 性能优化

### computed 模式优势

- **缓存计算**：状态只在 props 变化时重新计算
- **避免重渲染**：Vue 3 的响应式系统自动优化
- **按需更新**：样式仅在相关状态变化时应用

### 样式优化

- **原子化 CSS**：Griffel 生成最小化 CSS
- **运行时样式**：仅生成使用的样式
- **CSS 变量**：共享样式通过变量复用

## 测试策略

### 单元测试

- 状态计算逻辑
- Props 传递和默认值
- 样式类名应用

### 视觉测试

- Histoire 文档作为视觉回归测试
- 所有变体和状态的截图对比

### 交互测试

- 点击事件触发
- 禁用状态阻止交互
- 加载状态显示

## 未来扩展

### 计划中的功能

1. **分割按钮**（Split Button）
2. **下拉按钮**（Dropdown Button）
3. **切换按钮**（Toggle Button）
4. **按钮组**（Button Group）

### 优化方向

1. **动画增强**：添加微交互动画
2. **主题支持**：更好的暗色模式支持
3. **自定义样式**：允许自定义 CSS 变量覆盖

## 参考资料

- [Fluent UI Button Storybook](https://storybooks.fluentui.dev/?path=/docs/components-button--docs)
- [Fluent Design Buttons](https://www.microsoft.com/design/fluent/#/components/web/button)
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- @fluentui/react-components Button 源码
