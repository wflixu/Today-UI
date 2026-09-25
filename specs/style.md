# Today-UI 主题系统设计与实现指南

## 概述

Today-UI 使用 **纯 CSS Variables** 实现 Microsoft Fluent Design System。本文档描述了完整的样式分层架构、主题架构、BEM 命名规范、组件样式模式和实施指南。

### 文档导航

| 章节 | 回答的问题 |
|------|-----------|
| [样式分层架构](#样式分层架构css-cascade-layers) | 消费者如何覆盖库的样式？ |
| [浏览器基线](#浏览器基线) | 支持哪些浏览器？嵌套在构建期怎么处理？ |
| [BEM 命名规范](#bem-命名规范) | 类名怎么起？ |
| [设计令牌系统](#设计令牌系统) | 440+ 令牌怎么组织和使用？ |
| [主题切换机制](#主题切换机制) | 怎么换肤？怎么实现局部主题？ |
| [组件级样式覆盖接口](#组件级样式覆盖接口) | 怎么改某个组件的某个视觉属性？ |
| [迁移历史](#迁移历史从-griffel-到纯-css) | 为什么不用 CSS-in-JS？ |

### 核心设计理念

1. **CSS Variables 作为单一数据源** - 所有设计令牌通过 CSS 变量定义
2. **CSS `@layer` 分层** - 库样式与用户样式有明确的优先级边界，消费者无需与库比特异性
3. **嵌套主题** - 主题是会被继承的 CSS 变量，任意子树可独立切换主题
4. **BEM 命名规范** - 清晰、可维护的类名约定
5. **类型安全** - TypeScript 类型映射和工具函数
6. **零运行时开销** - 纯静态 CSS，无需 JS 样式生成
7. **AI 友好** - CSS 代码易于理解和生成

### 为什么选择纯 CSS Variables？

相比 CSS-in-JS（griffel-vue）方案的优势：

| 特性 | CSS Variables | Griffel-vue |
|------|---------------|-------------|
| **AI 辅助编码** | ✅ 易于理解和生成 | ❌ 原子类难以理解 |
| **调试体验** | ✅ 语义化类名 | ❌ 生成的原子类 |
| **运行时开销** | ✅ 零开销 | ❌ 需运行时生成 |
| **包体积** | ✅ 更小（~48% 减少） | ❌ Griffel 库 + 样式对象 |
| **主题切换** | ✅ 原生 CSS 变量 | ⚠️ 需要 JS 更新 |
| **学习曲线** | ✅ 标准 CSS | ❌ 特定 API |
| **样式复用** | ✅ CSS 类组合 | ⚠️ JS 对象组合 |
| **用户覆盖样式** | ⚠️ 需要 `@layer` 辅助（见下节） | ✅ `mergeClasses` 内置 |

### 关键前提：Fluent v9 的主题本来就是 CSS 变量

理解本方案的正当性，需要先澄清一个常被误解的事实：**`@fluentui/tokens` 的 `tokens` 对象求值结果是 CSS 变量引用，而不是实际值**。

```ts
// @fluentui/tokens 的 themeToTokensObject 实现
for (const key of Object.keys(theme)) {
  tokens[key] = `var(--${String(key)})`;
}
```

`FluentProvider` 做的事情，就是把一个主题对象里的全部令牌写成 CSS 自定义属性，挂在自己的 `div` 上。上游组件 CSS 消费的是同一个变量。

**结论**：Fluent v9 的主题机制与 Today-UI 是**同一套机制**。Griffel 在上游承担的从来不是「主题」，而是「编写体验 + 原子化 + `mergeClasses` 覆盖语义」。其中前两项对组件库无价值，第三项通过 `@layer` 补齐 —— 这正是本文档「样式分层架构」一节的内容。

---

## 样式分层架构（CSS Cascade Layers）

### 为什么需要分层

上游 Fluent UI 依赖 Griffel 的 `mergeClasses` 提供**属性级**的样式覆盖语义：当用户传入的 `className` 与组件内置样式冲突时，由样式插入顺序决定胜出者，用户无需关心选择器特异性。

纯 CSS 方案没有运行时样式插入，改用 **CSS Cascade Layers** 提供对等能力。

### 三层结构

库的全部样式被组织进三个 layer，优先级由低到高：

```css
/* src/style/index.css —— 全库唯一的权威样式入口 */

/* 1. 一次性声明层的优先级顺序 */
@layer tui.tokens, tui.base, tui.components;

/* 2. 把各部分样式归入对应的层 */
@layer tui.tokens     { @import '../theme/tokens/index.css'; }
@layer tui.base       { @import './base.css'; }
@layer tui.components {
  @import '../button/button.css';
  @import '../dropdown/dropdown.css';
  /* ... 其余组件 */
}
```

首行的 `@layer` 声明语句**一次性定义层的优先级顺序**，该顺序与规则的书写位置、与选择器特异性都无关。

### 覆盖语义

分层架构的核心性质是：**未分层的样式永远优先于任何分层样式**。

```css
/* 用户代码 —— 未分层 */
.my-button {
  background-color: red;   /* ✅ 必定覆盖 .t-button 的 background-color */
}
```

因此消费者可以：

1. **直接覆盖** - 无需 `!important`，无需提高特异性，无需关心库的加载顺序
2. **不感知 `@layer`** - 只要自己的样式不分层，就天然获胜

### 约束

| 约束 | 原因 |
|------|------|
| 层包装**只写在 `src/style/index.css`**，组件 CSS 文件不写 `@layer` | 层归属集中一处，避免每个组件重复声明导致层顺序错乱 |
| 组件 CSS **不得**自行 `@import` 令牌文件 | 令牌应通过入口统一归入 `tui.tokens`；组件自己引入会让令牌散落到 `tui.components`，使消费者覆盖令牌时失效 |
| 库内部样式**必须**全部进层 | 未分层的 `.t-*` 规则会反向压过用户样式，破坏覆盖语义 |
| 层名以 `tui.` 为前缀 | 避免与消费者的 `@layer` 命名冲突 |

> **⚠️ 当前实现状态：本节描述的 `@layer` 分层尚未落地任何一行代码。**
>
> 实证（2026-09-19）：`grep -rn "@layer" src --include="*.css"` **零命中**。`src/style/index.css` 是 19 行纯 `@import`，没有任何 `@layer` 语句。
>
> 同时有 5 个组件 CSS 违反上面的约束（各自 `@import` 了令牌）：
>
> | 文件 | 违反项 |
> |------|--------|
> | `src/button/button.css:1` | `@import "./../style/base.css"` |
> | `src/input/input.css:1` | 同上 |
> | `src/label/label.css:1` | 同上 |
> | `src/tabs/tablist.css:1` | 同上 |
> | `src/toast/toast.css:1` | 同上 |
>
> 连带效应：`src/theme/tokens/index.css` 被 `style/index.css` 和 `style/base.css` **双重导入**，后者又被上述 5 个组件再导入。
>
> 另有 3 个组件的样式**不在** `style/index.css` 的 `@import` 清单里（`input.css`、`label.css`、`field.css`），而是靠组件代码自身 `import`。这两套机制并存，新增组件时容易漏掉一处。
>
> 清理动作见 `specs/component-roadmap.md` 的「基础设施欠账」。

---

## 浏览器基线

### 构建期的语法处理（先说清楚，避免误判）

组件 CSS 里写的 `&:hover` 等**原生 CSS 嵌套，在构建时就被扁平化**成完整选择器，**不会进入产物**：

```
src: .t-button { &:hover { … } }     →     dist: .t-button:hover { … }
```

因此「需要支持原生 CSS 嵌套的浏览器」（Chrome 120+ / Safari 17.2+ / Firefox 117+）**不是**本项目的门槛。实际约束来自组件样式里**无法在构建期降级**的现代选择器。

> 交叉验证：`grep -c '&' dist/style.css` 为 **0**，`@import` 同样为 0 —— 两者都已在构建期处理完毕。

### 真实基线

| 特性 | 用在哪 | Chrome / Edge | Safari | Firefox |
|------|--------|---------------|--------|---------|
| **`:has()`** | `input.css` 4 处，如 `.t-input__input-wrapper:has(.t-input__input:disabled)` | **105+** | **15.4+** | **121+** |
| `:not()`（复合选择器） | 44 处，多为 `:not([disabled])` | 88+ | 9+ | 84+ |
| `:focus-visible` | 6 处 | 86+ | 15.4+ | 85+ |
| `:is()` | 4 处 | 88+ | 14+ | 78+ |
| CSS Custom Properties | 全部设计令牌 | 49+ | 9.1+ | 31+ |

**综合基线：Chrome/Edge 105+、Safari 15.4+、Firefox 121+**

由 **`:has()`** 决定。注意约束已经从 Chrome 转移到了 **Firefox**（121 是 2023-12 才发布的版本）—— 若要做取舍，这里是最值得动的地方。

### 旧浏览器上的表现

`:has()` 不被支持时，浏览器按「未知选择器」处理：**整条规则被丢弃**，而不是部分生效。受影响的是 Input 组件的禁用态、hover 态与自动填充态样式。其余组件不受影响，也不会崩溃。

### 若要放宽基线

去掉对 `:has()` 的依赖即可把 Firefox 门槛降到 85 以下。两种做法：

1. **改写选择器** —— `input.css` 里那 4 处 `:has()` 多为「父元素根据子元素状态变化」的用法，可用状态类名替代（由 `useInputClasses` 输出 `.is-disabled` 之类的类到父元素上）。代价是 JS 侧要参与，但换来的是更低门槛与更好的可预测性
2. **构建期降级** —— 引入 Lightning CSS 或 `postcss-preset-env` 转换 `:has()`。注意 `:has()` 无法真正降级（它没有等价的旧语法），这类工具通常只能提示，实际仍需方案 1

> 目前**未做**处理。新增组件时若用到 `:has()`，请意识到它会把基线抬到 Firefox 121+。

---

## BEM 命名规范

Today-UI 使用严格的 BEM（Block-Element-Modifier）命名规范，所有类名以 `t-` 前缀开头（Today-UI）。

### 命名模式

```
.t-{block}                  // Block（组件）
.t-{block}__{element}       // Element（子元素）
.t-{block}--{modifier}      // Modifier（变体）
.t-{block}[{state}]         // State（状态，使用属性选择器）
.t-{block}-{state}          // State（状态，使用类名）
```

### 规则详解

#### 1. Block（组件块）

组件的根容器，使用小写字母和连字符：

```css
/* ✅ 正确 */
.t-button
.t-dropdown
.t-input-field

/* ❌ 错误 */
.button
.t-Button
.tButton
```

#### 2. Element（子元素）

组件内部的子元素，使用双下划线分隔：

```css
/* ✅ 正确 */
.t-button__icon
.t-button__content
.t-dropdown__trigger
.t-menu__item

/* ❌ 错误 */
.t-button .icon
.t-button-icon
.tButtonIcon
```

#### 3. Modifier（变体修饰符）

改变组件外观或行为的变体，使用双连字符分隔：

```css
/* ✅ 正确 */
.t-button--primary
.t-button--small
.t-input--appearance-outline

/* ❌ 错误 */
.t-button.primary
.t-button.small
.t-buttonPrimary
```

#### 4. State（状态）

组件的临时状态（如 hover、active、disabled），优先使用伪类或属性选择器：

```css
/* ✅ 推荐：使用伪类 */
.t-button:hover
.t-button:active
.t-button:focus-visible

/* ✅ 可接受：使用属性选择器 */
.t-button[disabled]
.t-button[aria-expanded="true"]

/* ✅ 特殊状态：使用类名（需要 JS 控制） */
.t-button.is-loading
.t-button.is-open
.t-menu-item.is-selected
```

### 完整示例：Button 组件

```css
/* ========== Block（组件根） ========== */
.t-button {
  /* 基础样式 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ========== Elements（子元素） ========== */
.t-button__icon {
  display: inline-flex;
}

.t-button__content {
  /* 内容区域 */
}

/* ========== Modifiers（变体） ========== */

/* Appearance 变体 */
.t-button--primary {
  background-color: var(--colorBrandBackground);
}

.t-button--outline {
  border-color: var(--colorNeutralStrokeAccessible);
}

/* Size 变体 */
.t-button--small {
  padding: 3px var(--spacingHorizontalS);
}

.t-button--large {
  padding: 8px var(--spacingHorizontalL);
}

/* Shape 变体 */
.t-button--square {
  border-radius: var(--borderRadiusNone);
}

.t-button--circular {
  border-radius: var(--borderRadiusCircular);
}

/* ========== States（状态） ========== */

/* 伪类状态 */
.t-button:hover {
  background-color: var(--colorNeutralBackground1Hover);
}

.t-button:active {
  background-color: var(--colorNeutralBackground1Pressed);
}

.t-button:focus-visible {
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);
}

/* 属性状态 */
.t-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* JS 控制状态 */
.t-button.is-loading {
  position: relative;
}

.t-button.is-loading::after {
  /* loading spinner */
}

/* ========== Compound Variants（组合变体） ========== */

/* Primary + Hover */
.t-button--primary:hover {
  background-color: var(--colorBrandBackgroundHover);
}

/* Small + Icon-only */
.t-button--small.is-icon-only {
  min-width: 24px;
  padding: 1px;
}

/* Disabled + Primary */
.t-button[disabled].t-button--primary {
  background-color: var(--colorNeutralBackgroundDisabled);
}
```

### BEM 命名决策树

```
需要添加样式？
│
├─ 是新组件？→ 使用 .t-{component}
│
├─ 是组件的子元素？→ 使用 .t-{component}__{element}
│
├─ 是改变外观的变体？→ 使用 .t-{component}--{modifier}
│
├─ 是临时状态？
│  ├─ CSS 伪类可实现？→ 使用 :hover, :active 等
│  ├─ HTML 属性可实现？→ 使用 [disabled], [aria-*] 等
│  └─ 需要 JS 控制？→ 使用 .t-{component}.is-{state}
│
└─ 是多个变体组合？→ 使用连写：.t-button--primary.is-disabled
```

---

## 设计令牌系统

### 概述

Today-UI 基于微软 **Fluent Design System v9** 规范，实现了完整的设计令牌（Design Tokens）系统。通过 **440+ 个 CSS 变量**，提供一致的设计语言和灵活的主题定制能力。

### 三层令牌架构

Fluent v9 使用三层架构组织设计令牌，确保从基础到应用的清晰层次：

```
┌─────────────────────────────────────────────────────┐
│  组件特定令牌 (Component Tokens)                      │
│  - button-filled-background                         │
│  - input-border-color                               │
└─────────────────────────────────────────────────────┘
                        ↓ 引用
┌─────────────────────────────────────────────────────┐
│  别名令牌 (Alias Tokens) - 主要使用层                  │
│  - colorNeutralForeground1                          │
│  - colorBrandBackground                             │
│  - spacingHorizontalM                               │
└─────────────────────────────────────────────────────┘
                        ↓ 引用
┌─────────────────────────────────────────────────────┐
│  全局令牌 (Global Tokens)                            │
│  - 调色板值 (palette colors)                         │
│  - 基础尺寸 (base sizes)                             │
└─────────────────────────────────────────────────────┘
```

**在组件中，我们直接使用别名令牌**，这是最常用的方式。

---

## 令牌命名规范

### 通用命名模式

```
{类别}{属性}{层级}[状态]
```

**类别（Category）**：
- `color` - 颜色
- `spacing` - 间距
- `borderRadius` - 圆角
- `fontSize` - 字体大小
- `lineHeight` - 行高
- `fontWeight` - 字体权重
- `fontFamily` - 字体家族
- `strokeWidth` - 描边宽度
- `shadow` - 阴影
- `duration` - 动画持续时间
- `curve` - 动画缓动函数

**属性（Property）**（仅颜色）：
- `Foreground` - 前景（文本、图标）
- `Background` - 背景
- `Stroke` - 描边（边框、分割线）
- `Shadow` - 阴影

**层级（Level）**：
- 颜色：`1-6`（数字越大对比度越低）
- 间距：`None, XXS, XS, SNudge, S, MNudge, M, L, XL, XXL, XXXL`
- 圆角：`None, Small, Medium, Large, XLarge, Circular`
- 字体：`Base100-1000, Hero700-1000`

**状态（State）**（可选）：
- `Hover` - 悬停状态
- `Pressed` - 按下状态
- `Selected` - 选中状态
- `Disabled` - 禁用状态
- `Inverted` - 反色（用于深色背景）
- `Static` - 静态（不随主题变化）
- `Link` - 链接专用

---

## 令牌分类详解

### 1. 颜色系统（Color Tokens）

颜色令牌是设计系统中最复杂的部分，分为多个子类别：

#### 1.1 中性色（Neutral Palette）

用于文本、背景、边框等基础元素，提供一致的视觉层次。

```css
/* 前景色（文本、图标） */
--colorNeutralForeground1              /* 主要文本 */
--colorNeutralForeground1Hover         /* 悬停文本 */
--colorNeutralForeground1Pressed       /* 按下文本 */
--colorNeutralForeground1Selected      /* 选中文本 */
--colorNeutralForeground2              /* 次要文本 */
--colorNeutralForeground2Hover         /* 悬停次要文本 */
--colorNeutralForeground3              /* 三级文本 */
--colorNeutralForeground4              /* 四级文本 */
--colorNeutralForegroundDisabled       /* 禁用文本 */
--colorNeutralForegroundInverted       /* 反色文本（深色背景） */

/* 背景色 */
--colorNeutralBackground1              /* 主背景 */
--colorNeutralBackground1Hover         /* 悬停背景 */
--colorNeutralBackground1Pressed       /* 按下背景 */
--colorNeutralBackground1Selected      /* 选中背景 */
--colorNeutralBackground2              /* 次级背景 */
--colorNeutralBackground3              /* 三级背景 */
--colorNeutralBackground4              /* 四级背景 */
--colorNeutralBackground5              /* 五级背景 */
--colorNeutralBackground6              /* 六级背景 */
--colorNeutralBackgroundInverted       /* 反色背景 */
--colorNeutralBackgroundDisabled       /* 禁用背景 */

/* 描边色（边框、分割线） */
--colorNeutralStroke1                  /* 主边框 */
--colorNeutralStroke1Hover             /* 悬停边框 */
--colorNeutralStroke2                  /* 次级边框 */
--colorNeutralStroke3                  /* 三级边框 */
--colorNeutralStrokeAccessible         /* 可访问边框 */
--colorNeutralStrokeDisabled           /* 禁用边框 */
```

**使用示例**：
```css
.t-button {
  color: var(--colorNeutralForeground1);
  background-color: var(--colorNeutralBackground1);
  border: 1px solid var(--colorNeutralStroke1);
}

.t-button:hover {
  background-color: var(--colorNeutralBackground1Hover);
}
```

#### 1.2 品牌色（Brand Colors）

用于强调品牌元素和主要操作。

```css
/* 品牌前景色 */
--colorBrandForeground1                /* 品牌文本 */
--colorBrandForeground2                /* 品牌次要文本 */
--colorBrandForeground2Hover          /* 品牌悬停文本 */
--colorBrandForegroundLink             /* 品牌链接 */
--colorBrandForegroundLinkHover       /* 品牌链接悬停 */

/* 品牌背景色 */
--colorBrandBackground                /* 品牌背景 */
--colorBrandBackgroundHover           /* 品牌背景悬停 */
--colorBrandBackgroundPressed         /* 品牌背景按下 */
--colorBrandBackgroundSelected        /* 品牌背景选中 */
--colorBrandBackground2               /* 品牌次级背景 */

/* 品牌描边色 */
--colorBrandStroke1                    /* 品牌边框 */
--colorBrandStroke2                    /* 品牌次级边框 */

/* 品牌特殊状态 */
--colorBrandForegroundInverted         /* 品牌反色文本 */
--colorBrandBackgroundInverted         /* 品牌反色背景 */
```

**使用示例**：
```css
.t-button--primary {
  background-color: var(--colorBrandBackground);
  color: var(--colorNeutralForegroundOnBrand);
}

.t-button--primary:hover {
  background-color: var(--colorBrandBackgroundHover);
}
```

#### 1.3 状态色（Status Colors）

用于传达成功、警告、错误等状态信息。

```css
/* 成功状态 */
--colorStatusSuccessBackground1       /* 成功背景 */
--colorStatusSuccessBackground2       /* 成功次级背景 */
--colorStatusSuccessForeground1       /* 成功文本 */
--colorStatusSuccessForeground2       /* 成功次级文本 */
--colorStatusSuccessBorder1           /* 成功边框 */
--colorStatusSuccessBorder2           /* 成功次级边框 */

/* 警告状态 */
--colorStatusWarningBackground1       /* 警告背景 */
--colorStatusWarningBackground2       /* 警告次级背景 */
--colorStatusWarningForeground1       /* 警告文本 */
--colorStatusWarningForeground2       /* 警告次级文本 */
--colorStatusWarningBorder1           /* 警告边框 */
--colorStatusWarningBorder2           /* 警告次级边框 */

/* 危险状态 */
--colorStatusDangerBackground1        /* 危险背景 */
--colorStatusDangerBackground2        /* 危险次级背景 */
--colorStatusDangerForeground1        /* 危险文本 */
--colorStatusDangerForeground2        /* 危险次级文本 */
--colorStatusDangerBorder1            /* 危险边框 */
--colorStatusDangerBorder2            /* 危险次级边框 */
```

**使用示例**：
```css
.t-alert--success {
  background-color: var(--colorStatusSuccessBackground1);
  color: var(--colorStatusSuccessForeground1);
  border-left: 4px solid var(--colorStatusSuccessBorder1);
}

.t-alert--danger {
  background-color: var(--colorStatusDangerBackground1);
  color: var(--colorStatusDangerForeground1);
  border-left: 4px solid var(--colorStatusDangerBorder1);
}
```

#### 1.4 调色板（Palette Colors）

提供丰富的颜色选择，用于特殊场景。

```css
/* 红色系 */
--colorPaletteRedBackground1          /* 红色浅背景 */
--colorPaletteRedBackground2          /* 红色背景 */
--colorPaletteRedForeground1          /* 红色文本 */
--colorPaletteRedBorder1              /* 红色边框 */

/* 绿色系 */
--colorPaletteGreenBackground1
--colorPaletteGreenBackground2
--colorPaletteGreenForeground1
--colorPaletteGreenBorder1

/* 其他颜色：Yellow, Berry, Blue, Purple 等 */
--colorPalette[ColorName]Background1
--colorPalette[ColorName]Foreground1
--colorPalette[ColorName]Border1
```

---

### 2. 字体系统（Typography Tokens）

#### 2.1 字体家族（Font Family）

```css
--fontFamilyBase                       /* 主字体：Segoe UI + 系统字体栈 */
--fontFamilyMonospace                  /* 等宽字体：Consolas */
--fontFamilyNumeric                    /* 数字字体：Bahnschrift */
```

**使用示例**：
```css
.t-button {
  font-family: var(--fontFamilyBase);
}

.t-code {
  font-family: var(--fontFamilyMonospace);
}
```

#### 2.2 字体大小（Font Size）

分为两个系列：**Base 系列**（基础文本）和 **Hero 系列**（标题大字）。

```css
/* Base 系列 */
--fontSizeBase100                      /* 10px */
--fontSizeBase200                      /* 12px */
--fontSizeBase300                      /* 14px */
--fontSizeBase400                      /* 16px */
--fontSizeBase500                      /* 20px */
--fontSizeBase600                      /* 24px */

/* Hero 系列 */
--fontSizeHero700                      /* 28px */
--fontSizeHero800                      /* 32px */
--fontSizeHero900                      /* 40px */
--fontSizeHero1000                     /* 68px */
```

**使用示例**：
```css
.t-button {
  font-size: var(--fontSizeBase300);
}

.t-heading--1 {
  font-size: var(--fontSizeHero800);
}
```

#### 2.3 字体权重（Font Weight）

```css
--fontWeightRegular                    /* 400 - 常规 */
--fontWeightMedium                     /* 500 - 中等 */
--fontWeightSemibold                   /* 600 - 半粗 */
--fontWeightBold                       /* 700 - 粗体 */
```

#### 2.4 行高（Line Height）

```css
/* Base 系列 */
--lineHeightBase100                    /* 14px */
--lineHeightBase200                    /* 16px */
--lineHeightBase300                    /* 20px */
--lineHeightBase400                    /* 22px */
--lineHeightBase500                    /* 28px */
--lineHeightBase600                    /* 32px */

/* Hero 系列 */
--lineHeightHero700                    /* 36px */
--lineHeightHero800                    /* 40px */
--lineHeightHero900                    /* 52px */
--lineHeightHero1000                   /* 92px */
```

**完整使用示例**：
```css
.t-button {
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightBase300);
}
```

---

### 3. 间距系统（Spacing Tokens）

提供一致的空间节奏，分为水平间距和垂直间距。

```css
/* 水平间距 */
--spacingHorizontalNone                /* 0 */
--spacingHorizontalXXS                 /* 2px - 极小 */
--spacingHorizontalXS                  /* 4px - 特小 */
--spacingHorizontalSNudge              /* 6px - 微调 */
--spacingHorizontalS                   /* 8px - 小 */
--spacingHorizontalMNudge              /* 10px - 中微调 */
--spacingHorizontalM                   /* 12px - 中（推荐） */
--spacingHorizontalL                   /* 16px - 大 */
--spacingHorizontalXL                  /* 20px - 特大 */
--spacingHorizontalXXL                 /* 24px - 超大 */
--spacingHorizontalXXXL                /* 32px - 极大 */

/* 垂直间距 */
--spacingVerticalNone                  /* 0 */
--spacingVerticalXXS                   /* 2px */
--spacingVerticalXS                    /* 4px */
--spacingVerticalSNudge                /* 6px */
--spacingVerticalS                     /* 8px */
--spacingVerticalMNudge                /* 10px */
--spacingVerticalM                     /* 12px */
--spacingVerticalL                     /* 16px */
--spacingVerticalXL                    /* 20px */
--spacingVerticalXXL                   /* 24px */
--spacingVerticalXXXL                  /* 32px */
```

**使用示例**：
```css
.t-button {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
}

.t-button--large {
  padding: var(--spacingVerticalM) var(--spacingHorizontalL);
}

.t-stack > * + * {
  margin-top: var(--spacingVerticalM);
}
```

---

### 4. 圆角系统（Border Radius Tokens）

```css
--borderRadiusNone                     /* 0 */
--borderRadiusSmall                    /* 2px - 小圆角 */
--borderRadiusMedium                   /* 4px - 中圆角（推荐） */
--borderRadiusLarge                    /* 6px - 大圆角 */
--borderRadiusXLarge                   /* 8px - 超大圆角 */
--borderRadiusCircular                 /* 10000px - 完全圆形 */
```

**使用示例**：
```css
.t-button {
  border-radius: var(--borderRadiusMedium);
}

.t-button--circular {
  border-radius: var(--borderRadiusCircular);
}

.t-input {
  border-radius: var(--borderRadiusSmall);
}
```

---

### 5. 阴影系统（Shadow Tokens）

提供不同深度的阴影效果，分为标准阴影和品牌阴影。

```css
/* 标准阴影 */
--shadow2                              /* 2px - 浅阴影 */
--shadow4                              /* 4px - 标准阴影 */
--shadow8                              /* 8px - 中等阴影 */
--shadow16                             /* 16px - 深阴影 */
--shadow28                             /* 28px - 更深阴影 */
--shadow64                             /* 64px - 最深阴影 */

/* 品牌阴影（带品牌色） */
--shadow2Brand                         /* 2px 品牌阴影 */
--shadow4Brand                         /* 4px 品牌阴影 */
--shadow8Brand                         /* 8px 品牌阴影 */
--shadow16Brand                        /* 16px 品牌阴影 */
--shadow28Brand                        /* 28px 品牌阴影 */
--shadow64Brand                        /* 64px 品牌阴影 */
```

**使用示例**：
```css
.t-card {
  box-shadow: var(--shadow4);
}

.t-dropdown {
  box-shadow: var(--shadow8);
}

.t-button--primary:hover {
  box-shadow: var(--shadow4Brand);
}
```

---

### 6. 动画系统（Animation Tokens）

#### 6.1 持续时间（Duration）

```css
--durationUltraFast                    /* 50ms - 极快 */
--durationFaster                       /* 100ms - 很快 */
--durationFast                          /* 150ms - 快 */
--durationNormal                        /* 200ms - 正常（推荐） */
--durationGentle                        /* 250ms - 温和 */
--durationSlow                          /* 300ms - 慢 */
--durationSlower                       /* 400ms - 很慢 */
--durationUltraSlow                    /* 500ms - 极慢 */
```

#### 6.2 缓动函数（Curve）

```css
/* 加速曲线 */
--curveAccelerateMin                   /* 轻微加速 */
--curveAccelerateMid                   /* 中等加速 */
--curveAccelerateMax                   /* 急剧加速 */

/* 减速曲线 */
--curveDecelerateMin                   /* 轻微减速 */
--curveDecelerateMid                   /* 中等减速（推荐） */
--curveDecelerateMax                   /* 急剧减速 */

/* 缓入缓出 */
--curveEasyEase                         /* 标准缓入缓出 */
--curveEasyEaseMax                      /* 强烈缓入缓出 */

/* 线性 */
--curveLinear                           /* 线性运动 */
```

**使用示例**：
```css
.t-button {
  transition-duration: var(--durationNormal);
  transition-timing-function: var(--curveDecelerateMid);
  transition-property: background, border, color;
}

.t-spinner {
  animation: spin var(--durationNormal) var(--curveLinear) infinite;
}
```

---

### 7. 描边宽度（Stroke Width）

```css
--strokeWidthThin                      /* 1px - 细边框 */
--strokeWidthThick                     /* 2px - 粗边框（推荐） */
--strokeWidthThicker                   /* 3px - 更粗边框 */
--strokeWidthThickest                  /* 4px - 最粗边框 */
```

**使用示例**：
```css
.t-input {
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
}

.t-input:focus-visible {
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);
}
```

---

## 主题切换机制

### 主题类型

Today-UI 支持 **4 个预设主题**：

| 主题名 | `data-theme` 值 | 说明 |
|--------|-----------------|------|
| Web Light | `light`（默认，可省略） | 标准 Web 亮色主题 |
| Web Dark | `dark` | 标准 Web 暗色主题 |
| Teams Light | `teams-light` | Microsoft Teams 亮色主题 |
| Teams Dark | `teams-dark` | Microsoft Teams 暗色主题 |

### 主题实现方式

主题通过 **CSS 变量 + `data-theme` 属性**实现，全部定义位于 `src/theme/tokens/`：

```css
@layer tui.tokens {
  /* ========== 默认亮色主题 ========== */
  /* :where() 将特异性降为 0，避免与任何主题选择器发生特异性竞争 */
  :where(:root),
  :where([data-theme="light"]) {
    --colorNeutralForeground1: #242424;
    --colorNeutralBackground1: #ffffff;
    --colorBrandBackground: #0f6cbd;
    /* ... 440+ 令牌 */
  }

  /* ========== 暗色主题 ========== */
  :where([data-theme="dark"]) {
    --colorNeutralForeground1: #ffffff;
    --colorNeutralBackground1: #1b1b1b;
    --colorBrandBackground: #479ef5;
    /* ... 覆盖关键令牌 */
  }

  /* ========== Teams 亮色主题 ========== */
  :where([data-theme="teams-light"]) {
    --colorBrandBackground: #444791;
    --colorBrandForeground1: #ffffff;
  }

  /* ========== Teams 暗色主题 ========== */
  :where([data-theme="teams-dark"]) {
    --colorBrandBackground: #6264a7;
    --colorBrandForeground1: #ffffff;
  }
}
```

**两个关键设计点**：

#### 1. 不使用 `:root` 限定主题选择器

主题选择器**不加 `:root` 前缀**，只写 `[data-theme="..."]`。

这不是风格问题，而是**嵌套主题能力的全部来源**：CSS 自定义属性是**继承**的，不是全局的。元素的最终变量值 = 该元素自身匹配到的声明（优先级最高）→ 否则沿用从祖先继承的值。

因此把 `data-theme` 放在任意元素上，都会为该元素及其子树覆写令牌：

```html
<body>                        <!-- 亮色（来自 :root 默认） -->
  <div data-theme="dark">     <!-- 暗色子树 -->
    <div class="t-button"></div>   <!-- 拿到暗色令牌 -->
  </div>
  <div class="t-button"></div>     <!-- 仍是亮色令牌 -->
</body>
```

若写成 `:root[data-theme="dark"]`，该规则只匹配根元素，子树无法独立切换 —— 这正是 Fluent 的嵌套 `FluentProvider` 所提供、而旧写法所缺失的能力。

#### 2. 用 `:where()` 归零特异性

`:where()` 包裹后选择器特异性恒为 `0,0,0`，主题之间不存在特异性竞争，完全由「就近覆盖 + 层内声明顺序」决定。这消除了「祖先的暗色规则意外压过子元素的亮色规则」这类问题。

### 切换主题

#### `setTheme` API

```typescript
import { setTheme, getTheme, type ThemeName } from 'today-ui';

export type ThemeName = 'light' | 'dark' | 'teams-light' | 'teams-dark';

/**
 * 切换主题
 * @param theme 主题名
 * @param el    目标元素，默认 document.documentElement
 *              —— 传入任意元素即可实现局部主题
 */
export function setTheme(theme: ThemeName, el: HTMLElement = document.documentElement): void {
  el.dataset.theme = theme;
}

/** 读取指定元素当前生效的主题 */
export function getTheme(el: HTMLElement = document.documentElement): ThemeName {
  return (el.dataset.theme as ThemeName) ?? 'light';
}
```

**用法**：

```typescript
// 全局切换到暗色
setTheme('dark');

// 仅让某个面板使用 Teams 主题（局部主题）
setTheme('teams-dark', panelEl);

// 复位局部主题（移除属性，回落到继承值）
delete panelEl.dataset.theme;
```

#### Vue 3 组合式 API

`setTheme` 是命令式的，组件内通常需要响应式状态。推荐在应用层封装：

```typescript
// composables/useTheme.ts
import { ref } from 'vue';
import { setTheme, type ThemeName } from 'today-ui';

export function useTheme(el?: HTMLElement) {
  const target = el ?? document.documentElement;
  const theme = ref<ThemeName>((target.dataset.theme as ThemeName) ?? 'light');

  const change = (next: ThemeName) => {
    theme.value = next;
    setTheme(next, target);
  };

  return { theme, setTheme: change };
}
```

> **注意**：主题状态不由库持久化。需要 `localStorage` 或 SSR 兼容（避免首屏闪烁）时，应由应用层处理，库只提供纯粹的 DOM 操作。

---

## 使用设计令牌

### ✅ 推荐做法

```css
/* 1. 使用语义化令牌 */
.t-button {
  background-color: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
}

/* 2. 使用状态变体 */
.t-button:hover {
  background-color: var(--colorNeutralBackground1Hover);
}

/* 3. 使用组合令牌 */
.t-button {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  border-radius: var(--borderRadiusMedium);
  font-size: var(--fontSizeBase300);
  transition: all var(--durationNormal) var(--curveDecelerateMid);
}
```

### ❌ 避免做法

```css
/* 1. 不要硬编码值 */
.t-button {
  background-color: #ffffff;        /* ❌ 硬编码 */
  color: #242424;                    /* ❌ 硬编码 */
}

/* 2. 不要使用非语义化颜色名 */
.t-button--primary {
  background-color: #0078d4;        /* ❌ 硬编码 */
  background-color: var(--colorBlue); /* ❌ 非语义化 */
}

/* 3. 不要混合使用单位 */
.t-button {
  padding: 8px 12px;                /* ❌ 硬编码 */
  font-size: 14px;                   /* ❌ 硬编码 */
}
```

---

## 令牌完整清单

### 令牌统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 颜色令牌 | 300+ | Neutral, Brand, Status, Palette 等 |
| 字体大小 | 10 | Base 100-600, Hero 700-1000 |
| 行高 | 10 | Base 100-600, Hero 700-1000 |
| 字体权重 | 4 | Regular, Medium, Semibold, Bold |
| 字体家族 | 3 | Base, Monospace, Numeric |
| 水平间距 | 11 | None → XXXL |
| 垂直间距 | 11 | None → XXXL |
| 圆角 | 6 | None → Circular |
| 阴影 | 12 | 2/4/8/16/28/64 × Standard/Brand |
| 动画时长 | 8 | UltraFast → UltraSlow |
| 缓动函数 | 9 | Accelerate/Decelerate/EasyEase/Linear |
| 描边宽度 | 4 | Thin → Thickest |
| **总计** | **440+** | 完整的设计令牌系统 |

### 完整令牌列表

详见 `src/theme/tokens/light.css` 文件，包含所有 440+ 个 CSS 变量的完整定义。

### 主题切换机制

实现方式与嵌套能力详见前文「[主题切换机制](#主题切换机制)」一节，此处不赘述。

### 使用设计令牌

在组件样式中，始终引用 CSS 变量：

```css
/* ✅ 正确：使用 CSS 变量 */
.t-button {
  background-color: var(--colorNeutralBackground1);
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  border-radius: var(--borderRadiusMedium);
}

/* ❌ 错误：硬编码值 */
.t-button {
  background-color: #ffffff;
  padding: 8px 12px;
  border-radius: 4px;
}
```

---

## 组件样式架构

### 文件组织

每个组件采用**单文件 CSS** 架构：

```
src/
├── style/
│   ├── index.css               # ⭐ 全库样式入口，唯一声明 @layer 的地方
│   └── base.css                # reset / body 基础样式
├── button/
│   ├── Button.tsx              # 组件逻辑
│   ├── button.css              # ✅ 完整的组件样式（不写 @layer、不 import 令牌）
│   ├── Button.types.ts         # 类型定义和类名映射
│   ├── useButtonClasses.ts     # 类名 Hook
│   └── index.ts                # 导出
├── theme/
│   ├── tokens/
│   │   ├── light.css           # 亮色主题令牌（:where 选择器）
│   │   ├── dark.css            # 暗色主题令牌
│   │   ├── teams-light.css     # Teams 亮色
│   │   ├── teams-dark.css      # Teams 暗色
│   │   └── index.css           # 令牌汇总（导入顺序不可调整）
│   └── index.ts                # setTheme / getTheme / ThemeName
└── shared/
    └── styles/
        ├── classUtils.ts       # className 工具函数
        └── index.ts
```

### CSS 文件结构

每个组件的 `.css` 文件遵循统一的组织结构：

```css
/* ========================================
   ComponentName.css
   ======================================== */

/* ========== 1. 基础样式（Block） ========== */
.t-{component} {
  /* 1.1 Display & Layout */
  display: ...;
  flex-direction: ...;

  /* 1.2 Box Model */
  box-sizing: border-box;
  padding: ...;
  margin: ...;

  /* 1.3 Typography */
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);

  /* 1.4 Visual */
  color: var(--colorNeutralForeground1);
  background-color: var(--colorNeutralBackground1);
  border: ...;
  border-radius: var(--borderRadiusMedium);

  /* 1.5 Animation */
  transition-duration: var(--durationFaster);
  transition-property: background, border, color;
}

/* ========== 2. 子元素（Elements） ========== */
.t-{component}__element-1 {
  /* 子元素样式 */
}

.t-{component}__element-2 {
  /* 子元素样式 */
}

/* ========== 3. 变体修饰符（Modifiers） ========== */

/* 3.1 Appearance 变体 */
.t-{component}--appearance-primary { }
.t-{component}--appearance-secondary { }
.t-{component}--appearance-outline { }

/* 3.2 Size 变体 */
.t-{component}--size-small { }
.t-{component}--size-medium { }
.t-{component}--size-large { }

/* 3.3 Shape 变体 */
.t-{component}--shape-square { }
.t-{component}--shape-circular { }

/* ========== 4. 状态样式（States） ========== */

/* 4.1 伪类状态 */
.t-{component}:hover { }
.t-{component}:active { }
.t-{component}:focus-visible { }

/* 4.2 属性状态 */
.t-{component}[disabled] { }
.t-{component}[aria-expanded="true"] { }

/* 4.3 JS 控制状态 */
.t-{component}.is-loading { }
.t-{component}.is-open { }

/* ========== 5. 组合变体（Compound Variants） ========== */

/* 5.1 Appearance + State */
.t-{component}--appearance-primary:hover { }
.t-{component}--appearance-outline[disabled] { }

/* 5.2 Size + Modifier */
.t-{component}--size-small.is-icon-only { }

/* 5.3 多变体组合 */
.t-{component}--appearance-primary.t-{component}--size-small:hover { }

/* ========== 6. 响应式与媒体查询 ========== */
@media (forced-colors: active) {
  /* 高对比度模式 */
}

/* ========== 7. 关键帧动画（可选） ========== */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 样式优先级

分两个层级理解。

**第一层：`@layer` 决定库与消费者之间的胜负**

```
未分层的用户样式           ← 最高（永远赢）
  ↑
tui.components            ← 组件样式
  ↑
tui.base                  ← reset / body
  ↑
tui.tokens                ← 设计令牌
```

这一步与选择器特异性完全无关。

**第二层：层内部，才轮到选择器特异性**

组件内部各模式的特异性从低到高：

1. **Block** - `.t-button` （权重：0,0,1,0）
2. **Element** - `.t-button__icon` （权重：0,0,2,0）
3. **Modifier** - `.t-button--primary` （权重：0,0,2,0）
4. **State (伪类)** - `.t-button:hover` （权重：0,0,2,0）
5. **State (属性)** - `.t-button[disabled]` （权重：0,1,2,0）
6. **State (类名)** - `.t-button.is-loading` （权重：0,0,3,0）
7. **Compound** - `.t-button--primary:hover` （权重：0,0,3,0）

> 由于组件样式全部同处 `tui.components` 一层，这里的特异性**不会外溢**去影响消费者 —— 消费者只要不分层，就一定赢。

**禁止使用 `!important`。**

`!important` 会突破 `@layer` 边界，破坏本文档建立的整套覆盖语义，且无法被消费者覆盖。若遇到需要 `!important` 才能生效的场景，说明是分层结构出了问题，应修正分层而不是加 `!important`。

---

## 类型安全方案

### 类名映射类型

每个组件定义类型安全的类名常量：

```typescript
// Button.types.ts
export type ButtonAppearance = 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rounded' | 'square' | 'circular';

/**
 * BEM 类名常量
 */
export const buttonClassNames = {
  // Block
  root: 't-button',

  // Elements
  icon: 't-button__icon',
  content: 't-button__content',
  spinner: 't-button__spinner',

  // Modifiers
  primary: 't-button--primary',
  outline: 't-button--outline',
  subtle: 't-button--subtle',
  transparent: 't-button--transparent',
  small: 't-button--small',
  large: 't-button--large',
  square: 't-button--square',
  circular: 't-button--circular',

  // States
  disabled: 'disabled',
  loading: 'is-loading',
  iconOnly: 'is-icon-only',
} as const;

/**
 * 变体映射（用于动态类名）
 */
export const buttonVariants = {
  appearance: {
    primary: 't-button--primary',
    secondary: '', // 默认，不需要额外类名
    outline: 't-button--outline',
    subtle: 't-button--subtle',
    transparent: 't-button--transparent',
  } satisfies Record<ButtonAppearance, string>,

  size: {
    small: 't-button--small',
    medium: '',
    large: 't-button--large',
  } satisfies Record<ButtonSize, string>,

  shape: {
    rounded: '',
    square: 't-button--square',
    circular: 't-button--circular',
  } satisfies Record<ButtonShape, string>,
} as const;

/**
 * 类型推导
 */
export type ButtonVariantClass = typeof buttonVariants.appearance[keyof typeof buttonVariants.appearance];
```

### className 工具函数

```typescript
// shared/styles/classUtils.ts

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[];

/**
 * 类型安全的 className 合并工具
 * 类似于 clsx 或 classnames
 *
 * @example
 * cn('t-button', 't-button--primary', true && 'is-disabled') // 't-button t-button--primary is-disabled'
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flat(Infinity as 0)
    .filter(Boolean)
    .join(' ');
}

/**
 * 类型安全的变体类名构建器
 *
 * @example
 * buildVariantClasses('t-button', buttonVariants.appearance, { appearance: 'primary' })
 * // 't-button t-button--primary'
 */
export function buildVariantClasses<T extends Record<string, Record<string, string>>>(
  baseClass: string,
  variantMaps: T,
  props: { [K in keyof T]?: keyof T[K] }
): string {
  const classes: string[] = [baseClass];

  for (const [variantKey, variantMap] of Object.entries(variantMaps)) {
    const value = props[variantKey as keyof typeof props];
    if (value && variantMap[value as string]) {
      classes.push(variantMap[value as string]);
    }
  }

  return classes.join(' ');
}

/**
 * BEM 类名构建器
 *
 * @example
 * bem('t-button', 'icon', 'small') // 't-button__icon t-button__icon--small'
 */
export function bem(block: string, element?: string, modifier?: string): string {
  let className = block;

  if (element) {
    className += `__${element}`;
  }

  if (modifier) {
    className += `--${modifier}`;
  }

  return className;
}
```

### 组件 Hook 实现

```typescript
// button/useButtonClasses.ts
import { cn } from '@/shared/styles/classUtils';
import { buttonVariants } from './Button.types';
import type { ButtonAppearance, ButtonSize, ButtonShape } from './Button.types';

export interface UseButtonClassesOptions {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
}

/**
 * Button 组件类名 Hook
 * 根据组件 props 生成对应的 BEM 类名
 */
export function useButtonClasses(options: UseButtonClassesOptions): string {
  const { appearance = 'secondary', size = 'medium', shape = 'rounded', disabled, loading, iconOnly } = options;

  return cn(
    't-button',

    // Appearance 变体（secondary 是默认值，不需要额外类名）
    appearance !== 'secondary' && buttonVariants.appearance[appearance],

    // Size 变体（medium 是默认值）
    size !== 'medium' && buttonVariants.size[size],

    // Shape 变体（rounded 是默认值）
    shape !== 'rounded' && buttonVariants.shape[shape],

    // 状态类名
    disabled && 'disabled',
    loading && 'is-loading',
    iconOnly && 'is-icon-only'
  );
}
```

### 组件中使用

```typescript
// Button.tsx
import { computed } from 'vue';
import { useButtonClasses } from './useButtonClasses';

export const Button = defineComponent({
  name: 'Button',
  props: {
    appearance: String,
    size: String,
    shape: String,
    disabled: Boolean,
    loading: Boolean,
  },
  setup(props, { slots }) {
    // 生成类名
    const classes = computed(() =>
      useButtonClasses({
        appearance: props.appearance,
        size: props.size,
        shape: props.shape,
        disabled: props.disabled,
        loading: props.loading,
      })
    );

    return () => (
      <button class={classes.value} disabled={props.disabled}>
        {slots.default?.()}
      </button>
    );
  },
});
```

---

## 组件级样式覆盖接口

### 为什么需要

`@layer` 解决了「消费者能否覆盖」的问题，但消费者仍需要知道**改哪个 CSS 属性**。为组件暴露语义化的覆盖变量，可以把「覆盖样式」从「读源码找属性名」变成「设置一个文档化的变量」。

### 模式

组件的每个可定制视觉属性，都通过**带 fallback 的组件级变量**消费：

```css
/* button/button.css —— 组件文件不写 @layer，由 src/style/index.css 统一包装 */
.t-button {
  /* 私有变量，fallback 指向设计令牌 */
  --t-button-background: var(--colorNeutralBackground1);
  --t-button-foreground: var(--colorNeutralForeground1);
  --t-button-border-color: var(--colorNeutralStroke1);
  --t-button-border-radius: var(--borderRadiusMedium);

  background-color: var(--t-button-background);
  color: var(--t-button-foreground);
  border: var(--strokeWidthThin) solid var(--t-button-border-color);
  border-radius: var(--t-button-border-radius);

  &:hover:not([disabled]) {
    /* 状态通过改写私有变量实现，而非重复声明属性 */
    --t-button-background: var(--colorNeutralBackground1Hover);
    --t-button-border-color: var(--colorNeutralStroke1Hover);
    --t-button-foreground: var(--colorNeutralForeground1Hover);
  }
}
```

关键点：**状态样式通过改写变量实现**，而不是重复声明属性。这样变体与状态的组合不会互相覆盖，消费者只需覆盖一个变量就能连带覆盖全部状态。

### 消费者用法

```css
/* 无需分层、无需特异性、无需 !important */
.brand-cta {
  --t-button-background: #7b2ff7;
  --t-button-foreground: #ffffff;
  --t-button-border-radius: var(--borderRadiusCircular);
}
```

```html
<Button class="brand-cta">购买</Button>
```

### 命名约定

```
--t-{block}-{property}
```

- 前缀 `--t-`（Today-UI）避免与消费者变量冲突
- 只暴露**语义化视觉属性**（background / foreground / border-color / radius / padding 等），不暴露内部实现细节
- 组件私有变量与公开覆盖变量**同名**，不做区分 —— 消费者覆盖同名变量即可，无需了解内部结构

### 与 `@layer` 的分工

| 场景 | 手段 |
|------|------|
| 覆盖某个具体视觉属性 | 组件级 CSS 变量（本节） |
| 追加/修改结构性样式（布局、伪元素等） | 未分层的自定义类（「样式分层架构」） |
| 全局换肤 | `data-theme` + 设计令牌（「主题切换机制」） |

---

## 迁移历史：从 Griffel 到纯 CSS

> **本节为历史记录，迁移已于 2026-02 完成。**

项目最初采用 `griffel-vue`（`@griffel/react` 的 Vue 移植，本项目作者自研）。迁移到纯 CSS 变量后，实现了本文档描述的全部架构。

### 迁移原因（决策记录）

项目的原始判断，引自当时的背景文档：

> 现在组件库 CSS 样式的方案，感觉 CSS-in-JS 的方案不太好。在 AI 辅助编码的场景下，使用 CSS 变量来实现 Fluent Design System 的主题和样式会更好一些——CSS 变量可以更方便地实现主题切换和样式的复用，同时也能保持组件库的性能和可维护性。

当时依据的是**直觉与工程偏好**。文档前文「为什么选择纯 CSS Variables」与「关键前提：Fluent v9 的主题本来就是 CSS 变量」两节，是事后补上的技术论证——结论相同，但论证更硬：上游的主题机制本来就是 CSS 变量，迁移并没有丢失能力。

### 迁移前的状态

- ✅ 440+ CSS 变量已定义
- ✅ 12 个组件已接入 Griffel
- ⚠️ 样式分散在 `*.styles.ts` 与 `.css` 中
- ⚠️ 运行时需要 Griffel 生成原子类

### 迁移后的状态

| 项 | 迁移前 | 迁移后 |
|----|--------|--------|
| 样式定义 | `useXxxStyles.styles.ts`（JS 对象） | `xxx.css`（原生 CSS） |
| 类名 | Griffel 运行时生成的原子类 | 静态 BEM 类名 |
| 运行时开销 | 需注入 `<style>` | 零 |
| 类型安全 | 样式对象本身类型安全 | 类名映射 + `satisfies` 约束 |
| 用户覆盖样式 | `mergeClasses` | `@layer`（见「样式分层架构」） |
| 主题切换 | `FluentProvider` + CSS 变量 | `data-theme` + CSS 变量 |

### 迁移遗留物

以下文件已无用途，如在新分支上遇到可直接删除：

- `src/shared/theme/` —— 无任何模块引用，且依赖 `@fluentui/tokens`（不在 `dependencies` 中）
- `src/***/use*Styles.styles.ts` —— Griffel 样式文件残留
- `tsdown.config.ts` 的 `external` 数组中的 `'griffel-vue'`

### 保留的对照物

`react-components/` 目录存放上游 `@fluentui/react-button`、`react-input`、`react-tooltip` 等源码，仅作为转录时的对照参考，不参与构建（`vitest.config.js` 已将其排除）。

---

## 迁移实施步骤（已完成，存档）

> 以下为迁移当时的执行计划，存档备查。

### Phase 1: 基础设施准备（0.5 天）

**创建共享工具**：

```bash
mkdir -p src/shared/styles
touch src/shared/styles/classUtils.ts
touch src/shared/styles/index.ts
```

**`src/shared/styles/classUtils.ts`**：

```typescript
export type ClassValue = string | number | boolean | undefined | null | ClassValue[];

function toVal(mix: ClassValue): string {
  if (typeof mix === 'string' || typeof mix === 'number') {
    return mix.toString();
  }
  if (!mix) return '';
  if (Array.isArray(mix)) {
    return mix.map(toVal).filter(Boolean).join(' ');
  }
  return '';
}

export function cn(...classes: ClassValue[]): string {
  return classes.map(toVal).filter(Boolean).join(' ');
}

export function buildVariantClasses<T extends Record<string, Record<string, string>>>(
  baseClass: string,
  variantMaps: T,
  props: { [K in keyof T]?: keyof T[K] }
): string {
  const classes: string[] = [baseClass];

  for (const [variantKey, variantMap] of Object.entries(variantMaps)) {
    const value = props[variantKey as keyof typeof props];
    if (value && variantMap[value as string]) {
      classes.push(variantMap[value as string]);
    }
  }

  return classes.join(' ');
}

export function bem(block: string, element?: string, modifier?: string): string {
  let className = block;
  if (element) className += `__${element}`;
  if (modifier) className += `--${modifier}`;
  return className;
}
```

**`src/shared/styles/index.ts`**：

```typescript
export { cn, buildVariantClasses, bem } from './classUtils';
export type { ClassValue } from './classUtils';
```

**更新构建配置**：

```typescript
// tsdown.config.ts
export default defineConfig({
  external: [
    'vue',
    '@floating-ui/vue',
    'radash',
    // 'griffel-vue', // ❌ 移除
  ],
});
```

```json
// package.json
{
  "dependencies": {
    "@floating-ui/vue": "^1.1.9",
    "radash": "^12.1.1",
    "vue": "^3.5.26"
    // ❌ 移除 "griffel-vue": "^0.4.0"
  }
}
```

#### Phase 2: 组件迁移（5-7 天）

**每个组件的迁移流程**：

**Step 1: 合并 CSS 文件**

```css
/* button.css - 从 button.styles.ts 提取样式并合并 */

/* 基础样式 */
.t-button {
  /* 从 Griffel root 样式迁移 */
}

/* 变体样式 */
.t-button--primary {
  /* 从 Griffel primary 样式迁移 */
}

/* 状态样式 */
.t-button:hover {
  /* 保留或增强原有 CSS 伪类样式 */
}
```

**Step 2: 创建类名映射**

```typescript
// Button.types.ts
export const buttonVariants = {
  appearance: {
    primary: 't-button--primary',
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
} as const;
```

**Step 3: 创建类名 Hook**

```typescript
// useButtonClasses.ts
import { cn } from '@/shared/styles/classUtils';
import { buttonVariants } from './Button.types';

export function useButtonClasses(props: UseButtonClassesOptions): string {
  return cn(
    't-button',
    props.appearance && props.appearance !== 'secondary' && buttonVariants.appearance[props.appearance],
    props.size && props.size !== 'medium' && buttonVariants.size[props.size],
    props.shape && props.shape !== 'rounded' && buttonVariants.shape[props.shape],
    props.disabled && 'disabled',
    props.loading && 'is-loading'
  );
}
```

**Step 4: 更新组件**

```typescript
// Button.tsx
// Before:
import { useButtonStyles } from './useButtonStyles.styles';

// After:
import { useButtonClasses } from './useButtonClasses';

const classes = computed(() => useButtonClasses(props));
state.root.className = mergeClasses(classes.value, state.root.className);
```

**Step 5: 删除 Griffel 文件**

```bash
rm button/button.styles.ts
rm button/useButtonStyles.styles.ts
```

**迁移顺序**（从简单到复杂）：

| 优先级 | 组件 | 复杂度 | 预计时间 |
|--------|------|--------|----------|
| 1 | Label | ⭐ 简单 | 0.5 天 |
| 2 | Field | ⭐ 简单 | 0.5 天 |
| 3 | Toast | ⭐⭐ 中等 | 0.5 天 |
| 4 | Button | ⭐⭐ 中等 | 1 天 |
| 5 | Input | ⭐⭐ 中等 | 1 天 |
| 6 | Tooltip | ⭐⭐ 中等 | 1 天 |
| 7 | Dropdown | ⭐⭐⭐ 复杂 | 1 天 |
| 8 | Menu | ⭐⭐⭐ 复杂 | 1 天 |
| 9 | Tabs | ⭐⭐⭐ 复杂 | 1 天 |
| 10 | Dialog | ⭐⭐⭐ 复杂 | 1 天 |
| 11 | FileTree | ⭐⭐⭐⭐ 很复杂 | 1.5 天 |

#### Phase 3: 清理与文档（0.5 天）

**删除 Griffel 相关代码**：

```bash
# 删除共享工具
rm -rf src/shared/griffel/

# 删除所有 Griffel 样式文件
find src -name "*.styles.ts" -delete
find src -name "use*Styles.styles.ts" -delete
```

**更新导入**：

```bash
# 全局替换
@/shared/griffel → @/shared/styles
griffel-vue → (移除)
```

**更新文档**：

- 创建 `MIGRATION.md` 迁移指南
- 更新 `CHANGELOG.md` 标记 v1.0.0 Breaking Change
- 更新组件文档中的样式示例

---

## 最佳实践

### 1. CSS 编写规范

#### ✅ 推荐做法

```css
/* 使用 CSS 变量 */
.t-button {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  background-color: var(--colorNeutralBackground1);
}

/* 使用 CSS 伪类 */
.t-button:hover {
  background-color: var(--colorNeutralBackground1Hover);
}

/* 使用属性选择器 */
.t-button[disabled] {
  cursor: not-allowed;
}

/* BEM 命名 */
.t-button__icon {
  display: inline-flex;
}

.t-button--primary {
  background-color: var(--colorBrandBackground);
}
```

#### ❌ 避免做法

```css
/* 不要硬编码值 */
.t-button {
  padding: 8px 12px;
  background-color: #ffffff;
}

/* 不要用 Sass 式元素拼接语法 —— 原生 CSS 嵌套不支持 &__icon */
.t-button {
  &__icon {
    /* ❌ 原生 CSS 中 & 代表整个复合选择器，
       这会被展开成 .t-button__icon 之外的语义错误结果 */
  }
}

/* 不要使用 !important */
.t-button {
  color: red !important;
}

/* 不要使用过长的类名 */
.t-button-primary-small-disabled-hover-active { }
```

#### CSS 嵌套规范

组件 CSS **允许且鼓励**用 `&` 组织同块的状态与组合变体（构建时由 `postcss-nested` 扁平化，不影响浏览器基线 —— 见「浏览器基线」）：

```css
/* ✅ 推荐：用嵌套归拢同一 Block 的状态与组合变体 */
.t-button {
  background-color: var(--colorNeutralBackground1);

  &:hover:not([disabled]) {
    background-color: var(--colorNeutralBackground1Hover);
  }

  &[disabled] {
    background-color: var(--colorNeutralBackgroundDisabled);
  }
}

/* ✅ 推荐：组合变体 */
.t-button--primary {
  background-color: var(--colorBrandBackground);

  &:hover { background-color: var(--colorBrandBackgroundHover); }
}
```

**约束**：

| 约束 | 原因 |
|------|------|
| `&` 必须显式书写 | 原生嵌套中 `&__icon` 不是 BEM 拼接语法，`&` 代表整个复合选择器 |
| 嵌套不超过 3 层 | 保持产物可读、避免特异性失控 |
| 子元素仍用完整类名平铺 | `.t-button__icon { }` 而非 `.t-button { .t-button__icon { } }`，BEM 已提供唯一性，无需靠嵌套限定作用域 |
| `@media` / `@supports` 可嵌套 | 原生支持，用于就地组织响应式规则 |

> BEM 类名的唯一性已经消除了对嵌套限定作用域的需求。嵌套的用途仅剩「归拢状态与组合变体」，不要用它做结构表达。

### 2. TypeScript 类型规范

#### ✅ 推荐做法

```typescript
// 定义变体类型
export type ButtonAppearance = 'primary' | 'secondary' | 'outline';

// 使用 satisfies 确保类型安全
export const buttonVariants = {
  primary: 't-button--primary',
  secondary: '',
  outline: 't-button--outline',
} satisfies Record<ButtonAppearance, string>;

// 使用 as const 确保不可变
export const buttonClassNames = {
  root: 't-button',
  icon: 't-button__icon',
} as const;
```

#### ❌ 避免做法

```typescript
// ❌ 不要硬编码类名字符串
const className = 't-button--primary';

// ❌ 不要使用 any
export const buttonVariants: any = { };

// ❌ 不要省略类型定义
export const buttonVariants = {
  primary: 't-button--primary', // 缺少类型约束
};
```

### 3. 组件开发流程

**创建新组件的步骤**：

1. **定义类型** - 创建 `Component.types.ts`
2. **编写 CSS** - 创建 `component.css`（遵循 BEM 规范）
3. **创建类名映射** - 在 types.ts 中定义 `componentVariants`
4. **实现 Hook** - 创建 `useComponentClasses.ts`
5. **实现组件** - 创建 `Component.tsx`
6. **编写测试** - 创建 `tests/Component.test.ts`
7. **编写文档** - 创建 `docs/Component.story.vue`

### 4. 性能优化

#### CSS 优化

```css
/* 避免深层嵌套 */
.t-menu .t-menu-item .t-menu-item__icon { } /* ❌ */
.t-menu-item__icon { } /* ✅ */

/* 使用 CSS 变量减少重复 */
.t-button {
  --button-bg: var(--colorNeutralBackground1);
  --button-padding: var(--spacingHorizontalM);
  background-color: var(--button-bg);
  padding: var(--button-padding);
}

/* 避免通配符选择器 */
* { } /* ❌ */
.t-button * { } /* ❌ */
```

#### 打包产物约定

构建使用 **Vite library mode**（`vite.config.mts`），`preserveModules: true` 保留模块结构以支持按需导入。

| 产物 | 说明 |
|------|------|
| `dist/**/*.js` | 按模块结构保留的 ESM 产物，与 `src/` 一一对应 |
| `dist/**/*.d.ts` | 类型声明，由 `vue-tsc --emitDeclarationOnly` 单独生成 |
| **`dist/style.css`** | **聚合样式入口**（约 173 KB / 453 个令牌），文件名固定 |

**`dist/style.css` 是必须存在的产物**，因为 `package.json` 将其作为公开导出：

```json
{
  "exports": {
    ".":            { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./style.css":  "./dist/style.css"
  }
}
```

**聚合方式**：`build.cssCodeSplit: false` 让 Vite 把全部 CSS 合并为单文件，文件名由 `build.lib.cssFileName` 指定（Vite 会自动补 `.css` 后缀）。顺序即 CSS 的 `@import` 解析顺序 —— tokens → base → components。

**构建期的 CSS 处理**（由 `vite.config.mts` 的 postcss 配置完成）：

- `postcss-import` —— 展开全部 `@import`（`src/style/index.css` 的内容全是 `@import`，不展开则 440+ 令牌全部丢失）
- `postcss-nested` —— 把 `&:hover` 等原生嵌套扁平化为完整选择器

> **顺序不可调换**：必须先展开 `@import`，再处理嵌套。

**消费者须显式引入**：CSS 不再由组件的 JS 入口自动 `import`（Vite 在 lib 模式下会剥掉）。这是设计选择，也让样式成为显式的、可控制加载时机的资源。

---

> **历史教训（2026-09-19 修复）**：此前用 tsdown 构建时，`dist/style.css` 根本不存在，且 `dist/style/index-<hash>.css` **内容为空**（只有注释）—— 因为 tsdown 不解析 CSS 的 `@import`，而 `src/style/index.css` 的内容全是 `@import`。
>
> 后果是 `exports` 里 `"./style.css"` 指向不存在的文件，**整个包无法被 import**；同时 Histoire（走 Vite + postcss，能正常解析）里样式看着正常，掩盖了问题。
>
> 根因是 **dev 与 build 跑在两套不同的 CSS 管线上**。现在两者共用同一份 `vite.config.mts`，这类不一致不会再出现。

#### 运行时优化

```typescript
// ✅ 使用 computed 缓存类名
const classes = computed(() => useButtonClasses(props));

// ❌ 避免每次渲染都重新计算
const classes = useButtonClasses(props); // 每次都执行
```

### 5. 测试策略

#### 视觉测试

```vue
<!-- Button.story.vue -->
<template>
  <Story title="Button/Variants">
    <Variant title="Primary">
      <TButton appearance="primary">Primary</TButton>
    </Variant>
    <Variant title="Sizes">
      <TButton size="small">Small</TButton>
      <TButton size="medium">Medium</TButton>
      <TButton size="large">Large</TButton>
    </Variant>
  </Story>
</template>
```

#### 单元测试

```typescript
// Button.test.ts
import { describe, it, expect } from 'vitest';
import { useButtonClasses } from './useButtonClasses';

describe('useButtonClasses', () => {
  it('should return base class', () => {
    const classes = useButtonClasses({});
    expect(classes).toBe('t-button');
  });

  it('should include appearance variant', () => {
    const classes = useButtonClasses({ appearance: 'primary' });
    expect(classes).toContain('t-button--primary');
  });

  it('should combine multiple variants', () => {
    const classes = useButtonClasses({
      appearance: 'primary',
      size: 'small',
      disabled: true,
    });
    expect(classes).toBe('t-button t-button--primary t-button--small disabled');
  });
});
```

---

## 常见问题

### Q1: 如何处理动态样式？

**A**: 优先使用 CSS 变量：

```css
.t-button {
  --button-padding: var(--spacingHorizontalM);
  padding: var(--button-padding);
}

.t-button--small {
  --button-padding: var(--spacingHorizontalS);
}
```

对于真正的动态值，使用内联样式：

```typescript
const buttonStyle = computed(() => ({
  '--button-width': `${props.width}px`,
}));
```

### Q2: 如何处理复杂的组合变体？

**A**: 使用 CSS 选择器组合：

```css
/* Primary + Small + Disabled */
.t-button--primary.t-button--small[disabled] {
  /* 特殊样式 */
}
```

### Q3: 如何处理动画？

**A**: 在组件 CSS 中定义关键帧：

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.t-spinner {
  animation: spin var(--durationNormal) var(--curveLinear) infinite;
}
```

### Q4: 如何处理响应式？

**A**: 使用媒体查询：

```css
.t-button {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
}

@media (max-width: 640px) {
  .t-button {
    padding: var(--spacingVerticalXS) var(--spacingHorizontalS);
  }
}
```

### Q5: 如何处理主题切换？

**A**: 使用 `setTheme` + `data-theme` 属性，传入元素参数即为局部主题：

```typescript
import { setTheme } from 'today-ui';

setTheme('dark');                      // 全局
setTheme('teams-dark', panelElement);  // 仅某个子树
```

详见「主题切换机制」。

### Q6: 消费者如何覆盖组件样式？

**A**: 两条路，都不需要 `!important`：

```css
/* 1. 改单个视觉属性 —— 覆盖组件级变量 */
.brand-cta { --t-button-background: #7b2ff7; }

/* 2. 改结构/追加样式 —— 写不分层的自定义类 */
.brand-cta { box-shadow: 0 4px 12px rgb(123 47 247 / 30%); }
```

详见「样式分层架构」与「组件级样式覆盖接口」。

### Q7: 组件 CSS 里的 `&:hover` 需要浏览器支持原生嵌套吗？

**A**: 不需要。构建时 `postcss-nested` 已把嵌套扁平化为完整选择器，产物中不含 `&`。
真实基线由 `:has()` 决定：**Chrome/Edge 105+、Safari 15.4+、Firefox 121+**。详见「浏览器基线」。

---

## 设计成果

### 包体积

| 项目 | Griffel-vue | 纯 CSS | 减少 |
|------|-------------|--------|------|
| griffel-vue 库 | ~15KB | 0 | -15KB |
| 样式对象 | ~8KB | ~2KB | -6KB |
| 运行时代码 | ~2KB | 0 | -2KB |
| **总计** | **~25KB** | **~13KB** | **-48%** |

### 架构能力

| 能力 | 实现手段 |
|------|----------|
| 全局换肤 | `data-theme` + 440 令牌 |
| 局部（嵌套）主题 | `data-theme` 置于任意元素 |
| 用户覆盖组件样式 | `@layer`（无需 `!important`） |
| 覆盖单个视觉属性 | 组件级 CSS 变量 |
| 主题状态持久化 / SSR | 留给应用层，库只做 DOM 操作 |

### 开发体验

- ✅ **AI 友好** - CSS 代码更容易被 AI 理解和生成
- ✅ **调试直观** - 语义化 BEM 类名 vs 原子类
- ✅ **开发简单** - 只需写 CSS，无需学习 Griffel API
- ✅ **零运行时** - 无样式注入，无首屏 FOUC 与 SSR 水合问题

---

## 参考资料

- [Fluent UI Design System](https://www.microsoft.com/design/fluent/)
- [BEM 官方文档](http://getbem.com/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Cascade Layers (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [CSS Nesting (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)
- [@fluentui/react-components](https://react.fluentui.dev/)

---

**文档版本**: v1.1.2
**最后更新**: 2026-09-19
**维护者**: Today-UI Team

### 变更记录

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.2 | 2026-09-19 | 构建系统由 tsdown 改为 Vite。**浏览器基线修正为 Chrome/Edge 105+ / Safari 15.4+ / Firefox 121+** —— 此前写的「嵌套决定基线（Chrome 120+）」已不成立：`postcss-nested` 在构建期把嵌套扁平化，产物中不含 `&`，真实约束变成 `:has()`（约束从 Chrome 转到 Firefox）。`dist/style.css` 聚合产物已落地（173 KB / 453 个令牌） |
| v1.1.1 | 2026-09-19 | 为「`@layer` 分层」与「`dist/style.css` 聚合产物」两节补充**实证状态**——经代码核查，两者均**尚未落地**：`grep @layer` 零命中，`dist/style.css` 不存在且 `dist/style/index-*.css` 内容为空。原文描述的是目标而非现状，易被误读为已有实现 |
| v1.1.0 | 2026-09-19 | 新增「样式分层架构（`@layer`）」「浏览器基线」「组件级样式覆盖接口」；主题选择器去掉 `:root` 限定以支持嵌套主题；补充 `setTheme` / `getTheme` API；明确禁止 `!important`；修正「禁止 CSS 嵌套」与实现相矛盾的表述；「从现有架构迁移」改为历史记录；补充构建产物约定（`dist/style.css`） |
| v1.0.0 | 2026-02-27 | 初版，记录 Griffel → 纯 CSS Variables 迁移方案 |
