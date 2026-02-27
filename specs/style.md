# Today-UI 主题系统设计与实现指南

## 概述

Today-UI 使用 **纯 CSS Variables** 实现 Microsoft Fluent Design System。本文档描述了完整的主题架构、BEM 命名规范、组件样式模式和实施指南。

### 核心设计理念

1. **CSS Variables 作为单一数据源** - 所有设计令牌通过 CSS 变量定义
2. **BEM 命名规范** - 清晰、可维护的类名约定
3. **类型安全** - TypeScript 类型映射和工具函数
4. **零运行时开销** - 纯静态 CSS，无需 JS 样式生成
5. **AI 友好** - CSS 代码易于理解和生成

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

1. **Light（亮色主题）** - 默认主题，适合白天使用
2. **Dark（暗色主题）** - 深色背景，适合夜间使用
3. **Teams Light** - Microsoft Teams 亮色主题
4. **Teams Dark** - Microsoft Teams 暗色主题

### 主题实现方式

使用 CSS 变量和 `data-theme` 属性实现主题切换：

```css
/* ========== 默认亮色主题 ========== */
:root,
:root[data-theme="light"] {
  --colorNeutralForeground1: #242424;
  --colorNeutralBackground1: #ffffff;
  --colorBrandBackground: #0f6cbd;
  /* ... 440+ 令牌 */
}

/* ========== 暗色主题 ========== */
:root[data-theme="dark"] {
  --colorNeutralForeground1: #ffffff;
  --colorNeutralBackground1: #1b1b1b;
  --colorBrandBackground: #479ef5;
  /* ... 覆盖关键令牌 */
}

/* ========== Teams 亮色主题 ========== */
:root[data-theme="teams-light"] {
  --colorBrandBackground: #444791;
  --colorBrandForeground1: #ffffff;
  /* ... Teams 特定令牌 */
}

/* ========== Teams 暗色主题 ========== */
:root[data-theme="teams-dark"] {
  --colorBrandBackground: #6264a7;
  --colorBrandForeground1: #ffffff;
  /* ... Teams 暗色令牌 */
}
```

### 切换主题

#### JavaScript 方式

```typescript
// 切换到暗色主题
document.documentElement.setAttribute('data-theme', 'dark');

// 切换到 Teams 主题
document.documentElement.setAttribute('data-theme', 'teams-light');

// 获取当前主题
const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
```

#### Vue 3 组合式 API

```typescript
// 主题管理 Composable
import { ref, watch } from 'vue';

export function useTheme() {
  const theme = ref<'light' | 'dark' | 'teams-light' | 'teams-dark'>('light');

  // 初始化主题
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme.value = storedTheme as any;
    document.documentElement.setAttribute('data-theme', storedTheme);
  }

  // 切换主题
  const setTheme = (newTheme: typeof theme.value) => {
    theme.value = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme,
    setTheme,
  };
}

// 在组件中使用
const { theme, setTheme } = useTheme();
```

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

使用 CSS 变量和 `data-theme` 属性实现主题切换：

```css
/* 默认亮色主题 */
:root,
:root[data-theme="light"] {
  --colorNeutralForeground1: #242424;
  --colorNeutralBackground1: #ffffff;
  /* ... 其他令牌 */
}

/* 暗色主题 */
:root[data-theme="dark"] {
  --colorNeutralForeground1: #ffffff;
  --colorNeutralBackground1: #1b1b1b;
  /* ... 其他令牌 */
}

/* Teams 亮色主题 */
:root[data-theme="teams-light"] {
  --colorBrandBackground: #444791;
  /* ... 其他令牌 */
}

/* Teams 暗色主题 */
:root[data-theme="teams-dark"] {
  --colorBrandBackground: #6264a7;
  /* ... 其他令牌 */
}
```

**切换主题**：

```typescript
// JavaScript 中切换主题
document.documentElement.setAttribute('data-theme', 'dark');

// 或者在 Vue 组件中
const theme = ref('light');
```

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
├── button/
│   ├── Button.tsx              # 组件逻辑
│   ├── button.css              # ✅ 完整的组件样式
│   ├── Button.types.ts         # 类型定义和类名映射
│   ├── useButtonClasses.ts     # 类名 Hook
│   └── index.ts                # 导出
├── theme/
│   ├── tokens/
│   │   ├── light.css           # 亮色主题令牌
│   │   ├── dark.css            # 暗色主题令牌
│   │   ├── teams-light.css     # Teams 亮色
│   │   ├── teams-dark.css      # Teams 暗色
│   │   └── index.css           # 令牌汇总
│   └── index.ts
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

遵循 CSS 选择器优先级规则，从低到高：

1. **Block** - `.t-button` （权重：0,0,1,0）
2. **Element** - `.t-button__icon` （权重：0,0,2,0）
3. **Modifier** - `.t-button--primary` （权重：0,0,2,0）
4. **State (伪类)** - `.t-button:hover` （权重：0,0,2,0）
5. **State (属性)** - `.t-button[disabled]` （权重：0,1,2,0）
6. **State (类名)** - `.t-button.is-loading` （权重：0,0,3,0）
7. **Compound** - `.t-button--primary:hover` （权重：0,0,3,0）

**避免使用 `!important`**，除非：
- 覆盖第三方库样式
- 修复高优先级的外部样式

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

## 从现有架构迁移

### 当前状态（Griffel-vue）

项目目前使用 **CSS 变量 + griffel-vue** 混合架构：

- ✅ 440+ CSS 变量已定义
- ✅ 12 个组件已迁移到 Griffel
- ⚠️ 样式分散在 `.styles.ts` 和 `.css` 中
- ⚠️ 运行时需要 Griffel 生成样式

### 迁移目标（纯 CSS）

**从 Griffel 迁移到纯 CSS**，实现：

- ✅ 保留所有 CSS 变量
- ✅ 合并样式到单文件 `.css`
- ✅ 使用 BEM 命名规范
- ✅ 移除 griffel-vue 依赖
- ✅ 类型安全的类名管理

### 迁移步骤

#### Phase 1: 基础设施准备（0.5 天）

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

/* 不要使用嵌套（保持扁平） */
.t-button {
  &__icon {
    /* ❌ 避免嵌套 */
  }
}

/* 不要使用 !important */
.t-button {
  color: red !important;
}

/* 不要使用过长的类名 */
.t-button-primary-small-disabled-hover-active { }
```

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

#### 打包优化

```typescript
// tsdown.config.ts
export default defineConfig({
  // CSS 处理
  css: {
    // 提取 CSS 到单独文件
    extract: true,
  },
});
```

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

**A**: 使用 CSS 变量 + data-theme 属性：

```typescript
// 切换主题
const setTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
};
```

---

## 预期成果

### 包体积优化

| 项目 | Griffel-vue | 纯 CSS | 减少 |
|------|-------------|--------|------|
| griffel-vue 库 | ~15KB | 0 | -15KB |
| 样式对象 | ~8KB | ~2KB | -6KB |
| 运行时代码 | ~2KB | 0 | -2KB |
| **总计** | **~25KB** | **~13KB** | **-48%** |

### 开发体验提升

- ✅ **AI 友好** - CSS 代码更容易被 AI 理解和生成
- ✅ **调试直观** - 语义化 BEM 类名 vs 原子类
- ✅ **开发简单** - 只需写 CSS，无需学习 Griffel API
- ✅ **主题灵活** - 原生 CSS 变量支持

### 性能提升

- ✅ **更快的首次渲染** - 无运行时样式生成
- ✅ **更小的 bundle** - 减少近 50% 样式相关代码
- ✅ **更快的构建** - 无需 Griffel 转译

---

## 参考资料

- [Fluent UI Design System](https://www.microsoft.com/design/fluent/)
- [BEM 官方文档](http://getbem.com/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [@fluentui/react-components](https://react.fluentui.dev/)

---

**文档版本**: v1.0.0
**最后更新**: 2026-02-27
**维护者**: Today-UI Team
