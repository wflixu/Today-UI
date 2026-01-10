

### 第一部分：什么是 Design Token？

**Design Token（设计令牌/设计变量）** 可以被理解为设计系统的“原子单位”或“单一事实来源”。它是一种将设计决策（如颜色、字体、间距、圆角半径等）存储为**平台中立、可重复使用的小数据单元**的方法。

您可以把它们想象成一个巨大的、定义明确的调色板、字体集和尺寸规则库。这些“令牌”的值可以被设计师在 Figma/Sketch 中使用，同时也被开发者直接引用到代码库中。

**核心价值：**

1.  **一致性**：确保产品在不同平台（Web， iOS， Android， Windows）和不同模块中拥有一致的视觉和交互体验。
2.  **效率**：设计师和开发者使用同一套“变量名”，沟通成本大大降低。设计师更新一个 Token 的值，开发者同步更新即可。
3.  **主题化/模式切换**：通过切换一组 Token 的值，可以轻松实现亮色/暗色主题、高对比度模式，甚至为不同品牌衍生不同主题。
4.  **可维护性**：当需要调整品牌色或全局圆角时，只需修改源头 Token 的值，所有使用该 Token 的地方都会自动同步更新，无需手动查找替换。

**Token 的典型层级结构：**
*   **Global Tokens（全局令牌）**：最原始的、具有语义化的名称，如 `color-grey-10`， `spacing-100`。
*   **Alias Tokens（别名令牌）**：在特定上下文中赋予意义的 Token，引用 Global Tokens。例如 `text-color-primary` = `color-grey-90`， `background-color-rest` = `color-grey-10`。
*   **Component-specific Tokens（组件特定令牌）**：为具体组件定义的 Token，通常引用 Alias Tokens。例如 `button-background-color` = `background-color-rest`。

---

### 第二部分：以 Fluent Design System 为例讲解

微软的 Fluent Design System 是使用 Design Token 的一个杰出工业级案例。它从 Fluent 2 开始，全面拥抱了这套体系。

#### 1. Fluent 中的 Token 命名与结构
Fluent 的 Token 命名系统非常严谨和语义化，体现了其层级关系。它主要分为三个层级，我们以颜色为例：

*   **Global Color Tokens（全局颜色令牌）**：
    *   这是最基础的调色板。名称直接描述了色相和明度。
    *   **示例**： `Neutral foreground 1`， `Brand background 1`， `Shared color cyan.cyan50`。
    *   它们本身**不指定具体用途**，只是“颜料”。

*   **Alias Color Tokens（别名颜色令牌）**：
    *   这是关键的一层，它为颜色赋予了**语义和上下文**。它**引用** Global Tokens。
    *   **示例**：
        *   `fill-color-subtle-secondary` = `NeutralBackground2`
        *   `text-on-accent-primary` = `White` / `Black` （根据对比度自动切换）
    *   通过这层，可以实现**主题切换**。在“亮色主题”中，`fill-color-subtle-secondary` 可能映射到一个浅灰色；在“暗色主题”中，它自动映射到一个深灰色。设计师和开发者只需关心 `fill-color-subtle-secondary` 这个语义，无需关心其具体值。

*   **Control-specific Tokens（控件特定令牌）**：
    *   这是最终应用到具体 UI 组件（如 Button， Checkbox）上的 Token。它**引用** Alias Tokens，确保了跨组件的一致性。
    *   **示例** (对于 Button 控件)：
        *   `button-filled-background` = `fill-color-accent-primary`
        *   `button-filled-hovered-background` = `fill-color-accent-secondary`

**一个完整链条示例：**
`button-filled-background` (组件令牌) → `fill-color-accent-primary` (别名令牌) → 在亮色主题下映射到 `BrandBackground1` (全局令牌) → 其 HEX 值为 `#0078D4`。

#### 2. Fluent Token 涵盖的范围
不仅仅是颜色，Fluent 的 Token 系统涵盖了所有设计属性：
*   **颜色**：如前所述。
*   **版式**：`fontFamilyBase`， `fontSize-300`， `lineHeight-300`， `fontWeightRegular` 等。
*   **间距/尺寸**：`spacingHorizontalM`， `spacingVerticalL`， `controlHeightMedium` 等。
*   **圆角**：`borderRadiusMedium`， `borderRadiusCircular` 等。
*   **阴影**：`shadow4`， `shadow8`， `shadow16`（数字通常代表模糊半径或阴影层级）。
*   **动效**：`durationFast`， `curveEasyEase` 等。

#### 3. 在设计工具和代码中的体现
*   **设计端 (Figma)**: Fluent UI 提供了完整的 Figma 库。设计师在界面中直接使用的是诸如 `text-color-primary`， `background-fill-layer` 这样的 Token 名称，而不是具体的色值。
    ![Figma Tokens](https://i.imgur.com/zyrdhQ7.png)

*   **开发端 (代码)**: 开发者通过 `@fluentui/react-components` 这样的库来引用这些 Token。
    ```jsx
    // React 示例
    import { tokens } from '@fluentui/react-components';
    
    const styles = {
      backgroundColor: tokens.colorNeutralBackground1, // 使用 Token！
      color: tokens.colorNeutralForeground1,
      padding: tokens.spacingHorizontalM,
      borderRadius: tokens.borderRadiusMedium,
    };
    
    function MyComponent() {
      return <div style={styles}>Hello, Fluent!</div>;
    }
    ```
    代码中使用的 `tokens.colorNeutralBackground1` 就是一个 JavaScript 变量，其值会根据当前激活的主题（亮色/暗色）自动计算出来。

### 总结

**Design Token** 是将设计系统从“静态规范文档”转变为“动态、可编程的源代码”的关键基础设施。

**以 Fluent Design System 为例**，它通过：
1.  **严谨的三层结构**（全局 → 别名 → 组件）清晰地管理设计决策。
2.  **语义化的命名**（如 `fill-color-subtle-secondary`）让 Token 的用途一目了然。
3.  **全面的覆盖范围**，管理了颜色、字体、间距等所有视觉属性。
4.  **在设计工具和代码库中的双向落地**，真正实现了设计与开发的“同源共语”。

这样做的好处是，当微软决定更新 Fluent 的主色调或调整整个系统的圆角大小时，他们只需要更新核心的 Global Token 定义，这个变化就会像水波一样，通过 Alias Token 自动传递到所有使用这些 Token 的按钮、卡片、输入框等组件上，并在 Web、Windows、移动端等所有平台上同步生效，保证了无与伦比的一致性和极高的维护效率。


# Design Token 在组件库开发中的落地实践：以 Fluent UI React Components 为例

我将详细拆解 Fluent UI React Components (v9) 如何将 Design Token 系统落地到组件库开发中。

## 一、Fluent UI 的架构概览

Fluent UI v9 是使用 Design Token 思想的现代化实现，其架构分为三个主要层次：

```
┌─────────────────────────────────────────────────────────┐
│                @fluentui/react-components                │
│                    (组件库 - 消费者直接使用)               │
├─────────────────────────────────────────────────────────┤
│                  @fluentui/react-theme                  │
│               (主题系统 - Token主题化)                   │
├─────────────────────────────────────────────────────────┤
│                 @fluentui/tokens-library                │
│              (Token定义 - 设计系统的基础)                │
└─────────────────────────────────────────────────────────┘
```

## 二、Token 在组件中的具体实现

### 1. Token 的定义和生成

首先，Fluent UI 使用 JSON 文件定义 Token，然后通过工具链生成 TypeScript 代码：

```json
// @fluentui/tokens/global/brand.json (简化)
{
  "global": {
    "color": {
      "brand": {
        "background": {
          "comment": "品牌背景色",
          "value": "#0078D4"
        },
        "foreground": {
          "comment": "品牌前景色",
          "value": "#FFFFFF"
        }
      }
    }
  }
}
```

通过构建系统，这些 JSON 会被转换成 TypeScript 类型：

```typescript
// 生成的类型定义
export interface BrandColorTokens {
  colorBrandBackground?: string;
  colorBrandBackgroundHover?: string;
  colorBrandBackgroundPressed?: string;
  colorBrandBackgroundSelected?: string;
  colorBrandForeground?: string;
  colorBrandForegroundHover?: string;
  // ...
}
```

### 2. 组件如何使用 Token

以 Button 组件为例，看看如何应用 Token：

```typescript
// @fluentui/react-button/src/components/Button/useButtonStyles.ts
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useButtonStyles = makeStyles({
  // 基础样式使用 Token
  root: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    
    // 使用主题 Token
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    borderColor: tokens.colorTransparentStroke,
    borderRadius: tokens.borderRadiusMedium,
    
    // 使用间距 Token
    padding: `0 ${tokens.spacingHorizontalM}`,
    minHeight: '32px', // 或使用 tokens.spacingVerticalL
  },

  // 状态变体使用不同的 Token
  primary: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
    },
  },

  // 尺寸变体使用不同的 Token
  small: {
    minHeight: '24px',
    padding: `0 ${tokens.spacingHorizontalSNudge}`,
    borderRadius: tokens.borderRadiusSmall,
  },

  large: {
    minHeight: '40px',
    padding: `0 ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusLarge,
  },
});
```

### 3. 完整的 Button 组件实现

```typescript
// @fluentui/react-button/src/components/Button/Button.tsx
import * as React from 'react';
import { useButton_unstable } from './useButton';
import { renderButton_unstable } from './renderButton';
import { useButtonStyles_unstable } from './useButtonStyles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    // 1. 使用 Hook 处理状态和属性
    const state = useButton_unstable(props, ref);
    
    // 2. 应用样式 - 这里会使用上面定义的 useButtonStyles
    useButtonStyles_unstable(state);
    
    // 3. 渲染组件
    return renderButton_unstable(state);
  }
);

Button.displayName = 'Button';
```

```typescript
// @fluentui/react-button/src/components/Button/useButton.ts
export const useButton_unstable = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
): ButtonState => {
  const {
    appearance = 'secondary',
    size = 'medium',
    disabled = false,
    // ... 其他 props
  } = props;

  const state: ButtonState = {
    // 组件的状态
    components: { root: 'button' },
    root: getNativeElementProps('button', {
      ref,
      type: 'button',
      ...props,
    }),
    // 传递 Token 相关的配置
    appearance,
    size,
    disabled,
  };

  return state;
};
```

## 三、主题系统的实现

### 1. 主题提供器 (Theme Provider)

```typescript
// 应用中使用主题
import { 
  FluentProvider, 
  webLightTheme,
  webDarkTheme,
  teamsLightTheme 
} from '@fluentui/react-components';

function App() {
  const [isDark, setIsDark] = React.useState(false);
  
  return (
    <FluentProvider 
      theme={isDark ? webDarkTheme : webLightTheme}
      // 也可以自定义主题
    >
      <Button appearance="primary">主题化按钮</Button>
      <Toggle
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        label="切换主题"
      />
    </FluentProvider>
  );
}
```

### 2. 主题定义的结构

```typescript
// @fluentui/react-theme/src/themes/WebLightTheme.ts
export const webLightTheme: Theme = {
  // 全局 Token
  global: {
    color: {
      // 中性色
      neutralForeground1: '#242424',
      neutralForeground2: '#424242',
      neutralForeground3: '#616161',
      // 品牌色
      brandForegroundLink: '#115EA3',
      brandForegroundLinkHover: '#0F548C',
      // ...
    },
    // 圆角
    borderRadius: {
      none: '0',
      small: '2px',
      medium: '4px',
      large: '6px',
      xLarge: '8px',
      circular: '10000px',
    },
    // 字体
    fontFamilyBase: '"Segoe UI", "Segoe UI Web (West European)", ...',
    fontSize: {
      base: {
        100: '10px',
        200: '12px',
        300: '14px',
        400: '16px',
        500: '20px',
        600: '24px',
        700: '28px',
        800: '32px',
        900: '40px',
        1000: '68px',
      },
    },
  },
  
  // 别名 Token
  alias: {
    color: {
      // 文本颜色
      neutralForeground1: global.color.neutralForeground1,
      neutralForeground2: global.color.neutralForeground2,
      
      // 背景颜色
      neutralBackground1: global.color.white,
      neutralBackground2: global.color.grey10,
      
      // 品牌颜色
      brandBackground: global.color.brand.primary,
      brandForeground1: global.color.white,
    },
  },
};
```

## 四、高级用法：自定义 Token 和主题

### 1. 创建自定义主题

```typescript
import { createLightTheme, createDarkTheme } from '@fluentui/react-components';

// 从基础主题开始扩展
const customLightTheme = {
  ...createLightTheme(),
  colorBrandForeground1: '#E10098', // 自定义品牌色
  colorBrandBackground1: '#E10098',
  borderRadiusMedium: '8px', // 更大的圆角
  fontFamilyBase: '"Inter", sans-serif', // 自定义字体
};

// 或者从头创建主题
const myCustomTheme = createLightTheme({
  colorNeutralForeground1: '#1a1a1a',
  colorNeutralBackground1: '#ffffff',
  // ... 覆盖更多 Token
});
```

### 2. 组件级 Token 覆盖

```typescript
import { makeStyles, tokens } from '@fluentui/react-components';

const useCustomButtonStyles = makeStyles({
  root: {
    // 使用标准 Token
    backgroundColor: tokens.colorNeutralBackground1,
    
    // 覆盖特定组件的 Token
    '--button-border-radius': '12px', // CSS 自定义属性
    borderRadius: 'var(--button-border-radius)',
  },
  
  customVariant: {
    // 创建新的变体
    backgroundColor: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)',
    color: tokens.colorNeutralForegroundOnBrand,
  },
});
```

## 五、构建系统的支持

### 1. Griffel (CSS-in-JS 解决方案)

Fluent UI v9 使用 Griffel 作为样式引擎，它支持 Token 的动态生成：

```typescript
// Griffel 在构建时处理 Token
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    color: tokens.colorBrandForeground1,
    // 在构建时，这会被转换成静态的 CSS 类名
    // 生产环境：.f16tdm0k { color: var(--colorBrandForeground1); }
  },
});
```

### 2. Token 到 CSS 自定义属性的转换

在运行时，FluentProvider 将 Token 转换为 CSS 自定义属性：

```css
/* 生成的 CSS */
:root {
  --colorNeutralForeground1: #242424;
  --colorNeutralBackground1: #ffffff;
  --borderRadiusMedium: 4px;
  --spacingHorizontalM: 12px;
  /* ... 数百个 Token */
}

/* 暗色主题 */
[data-theme="dark"] {
  --colorNeutralForeground1: #ffffff;
  --colorNeutralBackground1: #1a1a1a;
  /* ... 暗色值 */
}
```

## 六、开发和设计协同工作流

### 1. 设计到开发的同步

```javascript
// design-tokens.config.js
module.exports = {
  source: ['tokens/**/*.json'], // 设计师维护的 JSON 文件
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/module',
      }],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
      }],
    },
  },
};
```

### 2. 类型安全的 Token 使用

```typescript
// 完整的类型安全
import { tokens } from '@fluentui/react-theme';

// 类型检查：如果拼写错误，TypeScript 会报错
const correct = tokens.colorBrandBackground; // ✅ 正确
const wrong = tokens.colorBrandBackgroud; // ❌ 报错：属性不存在

// Token 值的类型也是正确的
const color: string = tokens.colorBrandBackground; // ✅
const spacing: string = tokens.spacingHorizontalM; // ✅
```

## 七、最佳实践总结

### 1. **始终通过 Token 访问设计值**
```typescript
// ✅ 正确：使用 Token
const styles = { color: tokens.colorNeutralForeground1 };

// ❌ 避免：硬编码值
const styles = { color: '#242424' };
```

### 2. **按语义使用 Token，而非具体值**
```typescript
// ✅ 正确：使用语义化 Token
backgroundColor: tokens.colorNeutralBackground1

// ❌ 避免：使用具体颜色 Token
backgroundColor: tokens.colorGrey10
```

### 3. **组件样式分层结构**
```typescript
const useStyles = makeStyles({
  // 1. 基础样式（使用基本 Token）
  root: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  
  // 2. 状态样式（使用状态 Token）
  hover: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  
  // 3. 变体样式（使用语义 Token）
  primary: {
    backgroundColor: tokens.colorBrandBackground,
  },
});
```

### 4. **响应式设计使用 Token**
```typescript
const useStyles = makeStyles({
  root: {
    // 移动端
    padding: tokens.spacingHorizontalS,
    
    '@media (min-width: 640px)': {
      // 平板
      padding: tokens.spacingHorizontalM,
    },
    
    '@media (min-width: 1024px)': {
      // 桌面
      padding: tokens.spacingHorizontalL,
    },
  },
});
```

## 八、性能优化

### 1. Token 值缓存
```typescript
// Fluent UI 内部使用记忆化
const getTokenValue = React.useMemo(() => {
  return computeTokenValue(theme, tokenName);
}, [theme, tokenName]);
```

### 2. 构建时提取
Griffel 在构建时提取静态样式，减少运行时开销：

```javascript
// 构建前
const styles = { color: tokens.colorBrandBackground };

// 构建后（生产环境）
const styles = { color: 'var(--color-brand-background)' };
// 对应 CSS: .abc123 { color: var(--color-brand-background); }
```

通过这种架构，Fluent UI React Components 实现了：
1. **完全的类型安全**
2. **运行时性能优化**
3. **无缝的主题切换**
4. **设计与开发的高度协同**
5. **跨平台的一致性保障**

这种基于 Design Token 的组件库架构，使得大规模设计系统的维护和迭代变得更加高效和可靠。