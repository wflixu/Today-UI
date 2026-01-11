# Tooltip 组件设计规格文档

## 概述

Tooltip 组件是一个用于显示简短上下文信息的浮层组件，遵循微软 Fluent Design System 设计规范。本组件从 @fluentui/react-components 转录而来，使用 Vue 3 + TypeScript + TSX 技术栈实现。

## 设计目标

1. **API 兼容性**：与 @fluentui/react-components Tooltip 核心功能 85% 兼容
2. **视觉一致性**：完全遵循 Fluent Design 视觉规范
3. **架构一致性**：采用与 Button 组件相同的 computed 响应式状态模式
4. **简化设计**：移除复杂的 container.tsx，职责清晰分离

## 架构设计

### 文件结构

```
src/tooltip/
├── Tooltip.tsx                 # 主组件（使用 computed 模式）
├── Tooltip.types.ts            # Props 和 State 类型定义
├── useTooltip.ts               # 状态管理逻辑
├── useTooltipStyles.styles.ts  # Griffel 样式定义
├── useTooltipStyles.ts         # 样式钩子函数
├── renderTooltip.tsx           # 渲染函数
├── tooltip.css                 # CSS 动画和补充样式
├── Tooltip.story.vue           # Histoire 文档
├── index.ts                    # 导出
├── doc.md                      # 用户文档
└── spec.md                     # 本文档
```

### 架构模式

参考 Button 组件实现，使用 **computed 响应式状态模式**：

```typescript
// Tooltip.tsx
const state = computed(() => {
  const tooltipState = useTooltip(props);
  useTooltipStyles(tooltipState);
  return tooltipState;
});
```

这种模式确保：
- Props 变化时自动重新计算状态
- 样式随状态变化而更新
- 避免响应性丢失问题

### 职责分离

| 文件 | 职责 |
|------|------|
| `Tooltip.types.ts` | 类型定义（Props、State、Slots） |
| `useTooltip.ts` | 状态管理逻辑（触发、延迟、可见性） |
| `useTooltipStyles.ts` | 样式应用（Griffel + BEM 类名） |
| `useTooltipStyles.styles.ts` | Griffel 原子样式定义 |
| `renderTooltip.tsx` | 纯渲染函数（无状态逻辑） |
| `tooltip.css` | 动画和特殊样式（@keyframes） |
| `Tooltip.tsx` | 组件组合（@floating-ui/vue 集成） |

## Props API 设计

### 类型定义

```typescript
export type TooltipProps = {
  // === 内容 ===
  /** Tooltip 显示的文本内容 */
  content?: string;

  /** 最大宽度（px），默认 200 */
  maxWidth?: number;

  /** 是否自动换行，默认 true */
  wrapText?: boolean;

  // === 定位 ===
  /** 显示位置，默认 'top' */
  placement?: Placement;

  /** 与触发元素的偏移距离（px），默认 4 */
  offset?: number;

  /** 挂载节点，默认 'body' */
  attach?: AttachNode;

  // === 显示控制 ===
  /** 受控模式：是否显示（优先级高于内部状态） */
  visible?: boolean;

  /** 非受控模式：初始是否显示，默认 false */
  defaultVisible?: boolean;

  // === 触发方式 ===
  /** 触发模式：hover | focus | both | manual，默认 'hover' */
  trigger?: 'hover' | 'focus' | 'both' | 'manual';

  /** 显示延迟（ms），默认 250 */
  delay?: number;

  /** 隐藏延迟（ms），默认 250 */
  closeDelay?: number;

  // === 样式变体 ===
  /** 关系类型：description | label | inaccessible，默认 'description' */
  relationship?: 'description' | 'label' | 'inaccessible';

  /** 是否显示箭头，默认 false */
  withArrow?: boolean;

  // === 事件 ===
  /** 可见性变化回调 */
  onVisibleChange?: (visible: boolean) => void;
};
```

### Slots 设计

```typescript
export type TooltipSlots = {
  /** 触发元素（必需） */
  default?: Slot;

  /** 自定义内容（优先于 content prop） */
  content?: Slot;
};
```

## 状态管理设计

### TooltipState 结构

```typescript
export type TooltipState = {
  // Props 传递
  placement: Placement;
  offset: number;
  relationship: 'description' | 'label' | 'inaccessible';
  withArrow: boolean;
  maxWidth: number;
  wrapText: boolean;
  content?: string;
  attach: AttachNode;

  // 计算状态
  isVisible: boolean;

  // 样式类名
  className: string;
  arrowClassName?: string;

  // 事件处理器
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;

  // 清理函数
  clearTimers: () => void;
};
```

### 受控/非受控模式

```typescript
// useTooltip.ts 核心逻辑
export const useTooltip = (props: TooltipProps): TooltipState => {
  // 内部可见性状态（非受控模式）
  const internalVisible = ref(props.defaultVisible ?? false);

  // 计算实际可见性（受控优先）
  const isVisible = computed(() =>
    props.visible !== undefined
      ? props.visible
      : internalVisible.value
  );

  // ... 其他逻辑
};
```

### 延迟处理机制

```typescript
// 定时器管理
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const clearTimers = () => {
  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
};

// 显示逻辑（带延迟）
const show = () => {
  clearTimers();
  if (props.trigger === 'manual') return;

  showTimer = setTimeout(() => {
    internalVisible.value = true;
    props.onVisibleChange?.(true);
  }, props.delay ?? 250);
};

// 隐藏逻辑（带延迟）
const hide = () => {
  clearTimers();
  if (props.trigger === 'manual') return;

  hideTimer = setTimeout(() => {
    internalVisible.value = false;
    props.onVisibleChange?.(false);
  }, props.closeDelay ?? 250);
};
```

### 触发模式处理

```typescript
// 事件处理器
const handleMouseEnter = () => {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    show();
  }
};

const handleMouseLeave = () => {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    hide();
  }
};

const handleFocus = () => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    show();
  }
};

const handleBlur = () => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    hide();
  }
};
```

## 样式设计

### Griffel 样式定义

```typescript
// useTooltipStyles.styles.ts
export const useTooltipStyles = makeStyles({
  root: {
    position: 'absolute',
    zIndex: 1000,
    pointerEvents: 'none',
    maxWidth: 'var(--widthTooltipMax)',
    borderRadius: 'var(--borderRadiusMedium)',
    boxShadow: 'var(--shadow8)',
    fontFamily: 'var(--fontFamilyBase)',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
    lineHeight: 'var(--lineHeightBase200)',
    backgroundColor: 'var(--colorNeutralBackground1)',
    color: 'var(--colorNeutralForeground1)',
    border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
    padding: '4px 8px',
    opacity: 0,
    transform: 'scale(0.95)',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    transition: 'opacity var(--durationNormal) var(--curveDecelerateMin), \
                 transform var(--durationNormal) var(--curveDecelerateMin)',
  },

  visible: {
    opacity: 1,
    transform: 'scale(1)',
  },

  arrow: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--colorNeutralBackground1)',
    border: 'var(--strokeWidthThin) solid var(--colorNeutralStroke1)',
    transform: 'rotate(45deg)',
  },

  // relationship: 'label'
  relationshipLabel: {
    backgroundColor: 'var(--colorBrandBackground)',
    color: 'var(--colorNeutralForegroundOnBrand)',
    borderColor: 'transparent',
  },

  // relationship: 'inaccessible'
  relationshipInaccessible: {
    backgroundColor: 'var(--colorNeutralBackground3)',
    color: 'var(--colorNeutralForeground2)',
  },
});
```

### CSS 补充样式

```css
/* tooltip.css */
.t-tooltip {
  /* 基础样式由 Griffel 提供 */
}

.t-tooltip__content {
  /* 内容容器 */
}

.t-tooltip__arrow[data-placement^="top"] {
  bottom: -4px;
}

.t-tooltip__arrow[data-placement^="bottom"] {
  top: -4px;
}

.t-tooltip__arrow[data-placement^="left"] {
  right: -4px;
}

.t-tooltip__arrow[data-placement^="right"] {
  left: -4px;
}

.t-tooltip-trigger {
  /* 触发元素包装器，不添加额外样式 */
  display: inline-block;
}
```

### 样式应用函数

```typescript
// useTooltipStyles.ts
export const useTooltipStyles = (state: TooltipState) => {
  const classes = useTooltipStylesStyles();

  const rootClass = mergeClasses(
    't-tooltip',
    classes.root,
    state.isVisible && classes.visible,
    state.relationship === 'label' && classes.relationshipLabel,
    state.relationship === 'inaccessible' && classes.relationshipInaccessible,
  );

  const arrowClass = state.withArrow
    ? mergeClasses('t-tooltip__arrow', classes.arrow)
    : undefined;

  state.className = rootClass;
  state.arrowClassName = arrowClass;
};
```

## 渲染实现

### @floating-ui/vue 集成

```typescript
// Tooltip.tsx 中
const { x, y, middlewareData, update } = useFloating(
  referenceRef,
  floatingRef,
  {
    placement: state.value.placement,
    middleware: [
      offset(state.value.offset),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  }
);

// 计算箭头位置
const arrowStyle = computed(() => {
  const { x, y } = middlewareData.value.arrow ?? { x: 0, y: 0 };
  return {
    left: x ? `${x}px` : '',
    top: y ? `${y}px` : '',
  };
});

// 计算 Tooltip 位置
const positioningStyle = computed(() => ({
  position: 'fixed',
  left: `${x.value}px`,
  top: `${y.value}px`,
}));
```

### 渲染函数

```typescript
// renderTooltip.tsx
export const renderTooltip = (
  state: TooltipState,
  slots: TooltipSlots,
  context: RenderContext
) => {
  const {
    referenceRef, floatingRef, arrowRef,
    positioningStyle, arrowStyle
  } = context;

  const {
    className, arrowClassName, content,
    isVisible, withArrow, placement, attach,
    handleMouseEnter, handleMouseLeave,
    handleFocus, handleBlur,
  } = state;

  // 触发元素包装器
  const triggerWrapper = h('span', {
    ref: referenceRef,
    class: 't-tooltip-trigger',
    onMouseenter: handleMouseEnter,
    onMouseleave: handleMouseLeave,
    onFocusin: handleFocus,
    onFocusout: handleBlur,
  }, slots.default?.());

  // Tooltip 内容
  const tooltipContent = h('div', {
    ref: floatingRef,
    class: className,
    style: positioningStyle,
    'data-placement': placement,
  }, [
    h('div', { class: 't-tooltip__content' },
      slots.content?.() || content
    ),
    withArrow && h('div', {
      ref: arrowRef,
      class: arrowClassName,
      style: arrowStyle,
      'data-placement': placement,
    }),
  ].filter(Boolean));

  return h(
    <>
      {triggerWrapper}
      {isVisible && h(Teleport, { to: getAttach(attach) }, [tooltipContent])}
    </>
  );
};
```

### Teleport 挂载处理

```typescript
// 获取挂载节点
const getAttach = (attach: AttachNode): string | HTMLElement => {
  if (typeof attach === 'string') {
    return document.querySelector(attach) || document.body;
  }
  if (typeof attach === 'function') {
    return attach();
  }
  return document.body;
};
```

## 与 @fluentui/react-components 差异

### 不实现的功能（按项目规范）

| 功能 | React 版本 | Today-UI | 原因 |
|------|-----------|----------|------|
| ARIA 属性 | ✅ | ❌ | 项目规范：不实现无障碍性 |
| 键盘导航 | ✅ | ❌ | 项目规范：不实现无障碍性 |
| role 属性 | ✅ | ❌ | 项目规范：不实现无障碍性 |
| tabIndex | ✅ | ❌ | 项目规范：不实现无障碍性 |

### 完全兼容的功能

| 功能 | 兼容性 |
|------|--------|
| content / children | ✅ 完全兼容 |
| placement | ✅ 完全兼容 |
| offset | ✅ 完全兼容 |
| delay / closeDelay | ✅ 完全兼容 |
| relationship | ✅ 样式完全兼容（不含 ARIA） |
| withArrow | ✅ 完全兼容 |
| trigger | ✅ 完全兼容 |
| visible / defaultVisible | ✅ 完全兼容 |
| onVisibleChange | ✅ 完全兼容 |

### API 兼容性评分

**核心功能兼容性：85%**

计算依据：
- 10 个核心 props 全部实现（除无障碍性相关）
- 视觉效果 100% 一致
- 交互行为 100% 一致
- 扣除项：无障碍性功能（15%）

## 设计令牌使用

### 颜色令牌

| 用途 | 令牌 | 默认值（Light） |
|------|------|----------------|
| 背景色 | `--colorNeutralBackground1` | #FFFFFF |
| 前景色 | `--colorNeutralForeground1` | #292929 |
| 边框色 | `--colorNeutralStroke1` | #D1D1D1 |
| Brand 背景 | `--colorBrandBackground` | #0F6CBD |

| 令牌 | 默认值（Dark） |
|------|----------------|
| `--colorNeutralBackground1` | #1B1B1B |
| `--colorNeutralForeground1` | #FFFFFF |
| `--colorNeutralStroke1` | #424242 |

### 尺寸令牌

| 用途 | 令牌 | 默认值 |
|------|------|--------|
| 最大宽度 | `--widthTooltipMax` | 200px |
| 圆角 | `--borderRadiusMedium` | 4px |
| 字体大小 | `--fontSizeBase200` | 12px |
| 行高 | `--lineHeightBase200` | 16px |
| 内边距 | `padding: 4px 8px` | - |
| 边框宽度 | `--strokeWidthThin` | 1px |

### 阴影令牌

```css
--shadow8: 0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132),
           0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108);
```

### 动画令牌

| 用途 | 令牌 | 默认值 |
|------|------|--------|
| 持续时间 | `--durationNormal` | 200ms |
| 缓动函数 | `--curveDecelerateMin` | cubic-bezier(0.1, 0.9, 0.2, 1) |

## 参考资源

### 外部参考
- [Fluent UI Web Components - Tooltip](https://learn.microsoft.com/en-us/fluent-ui/web-components/components/tooltip)
- [Fluent UI React Tooltip - Storybook](https://storybooks.fluentui.dev/web-components/?path=/docs/components-tooltip--docs)
- [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

### 内部参考文件
- [src/button/Button.tsx](src/button/Button.tsx) - computed 响应式状态模式
- [src/button/useButtonStyles.styles.ts](src/button/useButtonStyles.styles.ts) - Griffel 样式参考
- [src/button/button.css](src/button/button.css) - CSS 模式参考

### 待删除文件
- `src/tooltip/container.tsx` - 逻辑迁移到新架构
- `src/tooltip/props.ts` - 合并到 Tooltip.types.ts
- `src/tooltip/type.ts` - 合并到 Tooltip.types.ts
- `src/tooltip/style/tooltip.css` - 迁移到 tooltip.css

## 性能优化

### computed 缓存
```typescript
// 状态创建使用 computed，自动缓存
const state = computed(() => {
  const tooltipState = useTooltip(props);
  useTooltipStyles(tooltipState);
  return tooltipState;
});
```

### 定时器清理
```typescript
// 组件卸载时清理所有定时器
onUnmounted(() => {
  state.value.clearTimers();
});
```

### 避免不必要的重渲染
- 使用 computed 代替 watch
- 样式类名预先计算
- 定位样式使用 computed 缓存

## 测试策略

### 单元测试
- `useTooltip` 状态管理逻辑
- 触发模式处理
- 延迟功能
- 定时器清理

### 集成测试
- 完整交互流程
- 定位正确性
- Teleport 挂载
- 样式应用

### 视觉测试
- Fluent Design 视觉一致性
- 所有 placement 正确显示
- 箭头正确指向
- 动画流畅性

## 实施路线图

### Phase 1: 架构重构
- [ ] 创建 `Tooltip.types.ts`
- [ ] 实现 `useTooltip.ts`
- [ ] 创建主组件框架 `Tooltip.tsx`
- [ ] 删除旧文件

### Phase 2: 样式实现
- [ ] 创建 `useTooltipStyles.styles.ts`
- [ ] 创建 `tooltip.css`
- [ ] 实现 `useTooltipStyles.ts`
- [ ] 应用样式到组件

### Phase 3: 渲染实现
- [ ] 实现 `renderTooltip.tsx`
- [ ] 完善 @floating-ui/vue 集成
- [ ] 实现箭头逻辑
- [ ] 实现 Teleport

### Phase 4: 触发和延迟
- [ ] 实现所有触发模式
- [ ] 实现延迟功能
- [ ] 实现受控/非受控模式

### Phase 5: 文档和示例
- [ ] 更新 `Tooltip.story.vue`
- [ ] 编写 `doc.md`
- [ ] 完善 `spec.md`

### Phase 6: 测试和优化
- [ ] 编写单元测试
- [ ] 编写集成测试
- [ ] 性能优化
- [ ] 代码审查

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2025-01 | 初始设计 |
