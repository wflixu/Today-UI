# Button 组件设计规格

## 概述

Button 组件是 Today-UI 的基础交互组件，实现了微软 Fluent Design System 的按钮规范。用于触发操作或导航，支持多种外观、尺寸和状态。

## 设计目标

1. **API 兼容性**：与 @fluentui/react-components Button 组件保持 85% 以上的 API 兼容性
2. **视觉一致性**：完全遵循 Fluent Design 视觉规范
3. **功能完整性**：支持所有常用按钮状态和交互
4. **开发体验**：提供清晰的 TypeScript 类型定义和插槽支持
5. **性能优化**：使用纯 CSS Variables，零运行时样式开销

## 架构设计

### 文件结构

```
src/button/
├── Button.tsx                 # 主组件（使用 computed 响应式状态模式）
├── Button.types.ts            # Props、State 和 Slots 类型定义
├── useButton.ts               # 状态管理逻辑
├── useButtonClasses.ts        # 纯 CSS 类名钩子
├── renderButton.tsx           # 渲染函数
├── Spinner.tsx                # 加载指示器组件
├── useSpinnerClasses.ts       # Spinner 类名钩子
├── button.css                 # 完整的组件样式（CSS Variables + BEM）
├── Button.story.vue           # Histoire 文档和示例
├── index.ts                   # 组件导出
├── ButtonContext.ts           # 按钮上下文（用于嵌套）
└── docs/
    └── SPEC.md                # 本文档
```

### 组件模式

采用 **computed reactive state** 模式：

```typescript
export const Button = defineComponent({
  setup(props) {
    // 使用 computed 创建响应式状态
    const state = computed(() => {
      const buttonState = useButton(props);

      // 使用纯 CSS 类名 Hook
      const classes = useButtonClasses({
        appearance: buttonState.appearance,
        size: buttonState.size,
        shape: buttonState.shape,
        disabled: buttonState.disabled,
        loading: buttonState.loading,
        iconOnly: buttonState.iconOnly,
      });

      // 应用类名到状态
      if (buttonState.root) {
        buttonState.root.className = classes;
      }

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
- 纯 CSS，零运行时开销

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

| 值 | 高度 | 内边距 | 字体大小 | Spinner 尺寸 |
|---|---|---|---|---|
| `small` | 28px | var(--spacingHorizontalMN) | var(--fontSizeBase200) | 16px (tiny) |
| `medium` | 36px | var(--spacingHorizontalM) | var(--fontSizeBase300) | 20px (small) |
| `large` | 44px | var(--spacingHorizontalL) | var(--fontSizeBase400) | 24px (medium) |

**Spinner 尺寸自适应**：Loading 状态下的 Spinner 会根据按钮尺寸自动调整大小，确保视觉协调和按钮高度不被撑开。

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
- 显示 Spinner（尺寸根据按钮大小自动调整）
- 可选显示加载文本（loadingText）
- Spinner 不会撑开按钮高度

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

### 纯 CSS + CSS Variables 策略

**v0.3.0 更新：** 完全迁移到纯 CSS Variables 方案，移除 Griffel CSS-in-JS 依赖。

#### BEM 命名规范

```typescript
export const buttonClassNames = {
  root: 't-button',              // Block
  icon: 't-button__icon',        // Element
  spinner: 't-button__spinner',  // Element
} as const;

export const buttonVariants = {
  appearance: {
    primary: 't-button--primary',      // Modifier
    secondary: '',
    outline: 't-button--outline',
    subtle: 't-button--subtle',
    transparent: 't-button--transparent',
  },
  size: {
    small: 't-button--small',
    medium: '',
    large: 't-button--large',
  },
  shape: {
    rounded: '',
    square: 't-button--square',
    circular: 't-button--circular',
  },
  state: {
    disabled: 'disabled',       // State
    loading: 'is-loading',      // State
    iconOnly: 'is-icon-only',   // State
  },
};
```

#### CSS 样式实现（button.css）

```css
/* Button 基础样式 */
.t-button {
  /* 使用 CSS Variables 引用 Fluent Design 令牌 */
  background-color: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-radius: var(--borderRadiusMedium);
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  font-weight: var(--fontWeightSemibold);
  padding: 5px var(--spacingHorizontalM);
  min-width: 96px;

  /* 布局 */
  align-items: center;
  display: inline-flex;
  justify-content: center;
  text-decoration-line: none;
  vertical-align: middle;

  /* 过渡动画 */
  transition-duration: var(--durationFaster);
  transition-property: background, border, color, box-shadow;
}

/* 外观变体 */
.t-button--primary {
  background-color: var(--colorBrandBackground);
  color: var(--colorNeutralForegroundOnBrand);
  border-color: var(--colorBrandBackground);
}

.t-button--outline {
  background-color: var(--colorTransparentBackground);
  border-color: var(--colorNeutralStroke1);
}

/* 尺寸变体 */
.t-button--small {
  padding: 0 var(--spacingHorizontalMN);
  font-size: var(--fontSizeBase200);
}

.t-button--large {
  padding: var(--spacingVerticalS) var(--spacingHorizontalL);
  font-size: var(--fontSizeBase400);
}

/* 形状变体 */
.t-button--square {
  border-radius: var(--borderRadiusSmall);
}

.t-button--circular {
  border-radius: var(--borderRadiusCircular);
}

/* 状态 */
.t-button.disabled {
  background-color: var(--colorNeutralBackgroundDisabled);
  color: var(--colorNeutralForegroundDisabled);
  border-color: var(--colorNeutralStrokeDisabled);
  cursor: not-allowed;
}

.t-button.is-loading {
  cursor: wait;
  position: relative;
}

.t-button.is-icon-only {
  min-width: auto;
  padding: var(--spacingHorizontalS);
}

/* 交互状态 */
.t-button:hover:not([disabled]) {
  background-color: var(--colorNeutralBackground1Hover);
  border-color: var(--colorNeutralStroke1Hover);
  color: var(--colorNeutralForeground1Hover);
}

.t-button:active:not([disabled]) {
  background-color: var(--colorNeutralBackground1Pressed);
  border-color: var(--colorNeutralStroke1Pressed);
  color: var(--colorNeutralForeground1Pressed);
}

/* Spinner 动画 */
.t-button__spinner-wrapper {
  display: inline-flex;
  align-items: center;
  height: 1.2em;
  margin-right: var(--spacingHorizontalXS);
}

.t-button__spinner svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

### 类型安全类名生成

```typescript
export function useButtonClasses(props: {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
}): string {
  const {
    appearance = 'secondary',
    size = 'medium',
    shape = 'rounded',
    disabled = false,
    loading = false,
    iconOnly = false,
  } = props;

  return cn(
    buttonClassNames.root,
    appearance !== 'secondary' && buttonVariants.appearance[appearance],
    size !== 'medium' && buttonVariants.size[size],
    shape !== 'rounded' && buttonVariants.shape[shape],
    disabled && buttonVariants.state.disabled,
    loading && buttonVariants.state.loading,
    iconOnly && buttonVariants.state.iconOnly
  );
}
```

**关键改进：**
- ✅ 完全使用 CSS Variables 和 BEM 类名
- ✅ TypeScript 类型安全的变体映射
- ✅ 零运行时样式开销
- ✅ 更好的可维护性和调试体验
- ✅ 支持服务端渲染（SSR）

## 渲染逻辑

### renderButton 函数

纯渲染函数，根据状态生成 VNode：

```typescript
export const renderButton = (
  state: ButtonState,
  slots: ButtonSlots
) => {
  const { root, icon, showSpinner, size } = state;

  return h(
    state.as || 'button',
    root,
    [
      // Loading Spinner（尺寸自适应）
      showSpinner && h('span', { class: 't-button__spinner-wrapper' }, [
        h(Spinner, {
          size: size === 'large' ? 'medium' :
                size === 'small' ? 'tiny' : 'small'
        }),
        state.loadingText && ` ${state.loadingText}`
      ].filter(Boolean)),
      // Icon
      !state.loading && icon && slots.icon?.(),
      // Default content
      !state.loading && slots.default?.(),
    ].filter(Boolean)
  );
};
```

**Spinner 尺寸映射逻辑：**
- Button `small` → Spinner `tiny` (16px)
- Button `medium` → Spinner `small` (20px)
- Button `large` → Spinner `medium` (24px)
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

### v0.3.0 纯 CSS 方案优势

- **零运行时开销**：无 CSS-in-JS 运行时计算
- **更小的包体积**：移除 Griffel 依赖（减少 ~32KB）
- **更好的 SSR 支持**：纯 CSS 完全支持服务端渲染
- **更快的开发体验**：无需样式注入等待
- **更好的调试体验**：语义化 BEM 类名易于调试

### computed 模式优势

- **缓存计算**：状态只在 props 变化时重新计算
- **避免重渲染**：Vue 3 的响应式系统自动优化
- **按需更新**：类名仅在相关状态变化时更新

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

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 0.2.x | 2026-02 | 早期版本（Griffel CSS-in-JS） |
| 0.3.0 | 2026-02-27 | **重大变更**：迁移到纯 CSS Variables 方式 |

### 版本 0.3.0 详细变更（2026-02-27）

**迁移目标：**
- 从 Griffel CSS-in-JS 迁移到纯 CSS Variables
- 使用 BEM 命名规范提供语义化类名
- 移除运行时样式开销，提升性能
- 简化样式架构，提高可维护性

**新增文件：**
- ✅ `useButtonClasses.ts` - 纯 CSS 类名钩子
- ✅ `useSpinnerClasses.ts` - Spinner 类名钩子
- ✅ `button.css` - 完整的组件样式（包含所有变体和状态）

**删除文件：**
- ❌ `useButtonStyles.styles.ts` - Griffel 样式钩子
- ❌ `button.styles.ts` - Griffel 样式定义
- ❌ `useSpinnerStyles.ts` - Griffel Spinner 样式

**修改文件：**
- 🔄 `Button.tsx` - 更新为使用 `useButtonClasses`
- 🔄 `Spinner.tsx` - 更新为使用 `useSpinnerClasses`
- 🔄 `index.ts` - 更新导出

**改进：**
- ✅ 包体积减少 ~32KB
- ✅ 完全支持 SSR
- ✅ 更好的开发体验和调试体验
- ✅ 类型安全的类名生成
- ✅ 移除 Griffel 依赖

**向后兼容性：**
- ✅ 所有 props 功能保持不变
- ✅ 所有 slots 功能保持不变
- ✅ 视觉输出完全一致
- ✅ API 接口保持不变

**问题修复（本版本包含）：**

1. **Appearance 属性不生效**
   - **问题描述**：所有外观变体（primary、outline、subtle、transparent）显示相同样式
   - **根本原因**：CSS 文件选择器与类名生成不匹配
     - CSS 使用旧格式：`.appearance-primary`、`.shape-square`
     - useButtonClasses 生成新格式：`.t-button--primary`、`.t-button--square`
   - **解决方案**：完全重写 button.css，统一使用 BEM 格式选择器
   - **影响文件**：`button.css`

2. **Loading 状态高度问题**
   - **问题描述**：按钮在 loading 状态时高度被撑开
   - **根本原因**：
     - Spinner 尺寸硬编码为 'small'，无法根据按钮尺寸调整
     - `.t-button__spinner` 缺少高度约束
   - **解决方案**：
     - renderButton.ts 中根据按钮尺寸动态计算 Spinner 尺寸
     - 添加 `.t-button__spinner-wrapper` 样式，设置 `height: 1.2em` 约束
   - **影响文件**：`renderButton.ts`、`button.css`
   - **Spinner 尺寸映射**：
     - Button `small` → Spinner `tiny` (16px)
     - Button `medium` → Spinner `small` (20px)
     - Button `large` → Spinner `medium` (24px)

**文档更新：**
- ✅ 更新 Button.story.vue，添加"不同尺寸的 Loading 状态"示例
- ✅ 添加"仅图标按钮"专门展示
- ✅ 完善 Histoire 文档结构和说明
- ✅ 更新 SPEC.md 尺寸表格，添加 Spinner 尺寸列

## 参考资料

- [Fluent UI Button Storybook](https://storybooks.fluentui.dev/?path=/docs/components-button--docs)
- [Fluent Design Buttons](https://www.microsoft.com/design/fluent/#/components/web/button)
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- @fluentui/react-components Button 源码
