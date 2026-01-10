# Icon 组件设计实现文档

## 概述

Icon 组件是 Today-UI 组件库的图标系统，实现了微软 Fluent Design System 的图标。图标来自 @fluentui/react-icons，已转录到 Vue 3 + TSX 技术栈。

### 设计目标

- 提供两种使用方式：动态图标组件（通过 name 属性）和直接导入图标组件
- 支持 110+ 个常用 Fluent Design 图标
- 支持 size 和 color 自定义
- 简洁的 API 和易用的开发体验
- 自动化迁移和索引生成

## 组件架构

### 文件结构

```
src/icon/
├── Icon.tsx                    # 主动态图标组件
├── icons.tsx                   # 图标名称到组件的映射（自动生成）
├── index.ts                    # 导出所有图标（自动生成）
├── icon.css                    # 图标基础样式
├── types.ts                    # TypeScript 类型定义
├── utils/
│   └── createSvgIcon.tsx       # 图标工厂函数
├── components/                 # 110+ 个图标组件
│   ├── AddIcon.tsx
│   ├── DeleteIcon.tsx
│   └── ...
├── Icons.story.vue             # Histoire 文档
└── README.md                   # 使用指南
```

### 核心组件

#### 1. Icon.tsx - 动态图标组件

**作用**：通过 `name` 属性动态渲染图标

**实现要点**：
- 使用 `computed` 计算图标组件
- 支持任意属性透传（`{...attrs}`）
- 直接渲染图标组件，避免额外的 DOM 嵌套
- 找不到图标时显示占位符 `?`

**代码实现**：
```tsx
import { computed, defineComponent, toRefs, type PropType, unref } from "vue";
import { ICONS } from "./icons";

export default defineComponent({
  name: "TIcon",
  props: {
    name: String as PropType<string>,
    size: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    color: String,
  },
  setup(props, { attrs }) {
    const { name, size, color } = toRefs(props);

    const iconComponent = computed(() => {
      const value = unref(name);
      if (!value) return null;
      const iconName = value.toLowerCase();
      return ICONS[iconName as keyof typeof ICONS] || null;
    });

    return () => {
      const IconComp = iconComponent.value;
      if (!IconComp) {
        return (
          <span class="t-icon t-icon--not-found" {...attrs}>
            ?
          </span>
        );
      }
      // 直接渲染图标组件，不添加额外的 span 包装
      return <IconComp size={size.value} color={color.value} {...attrs} />;
    };
  },
});
```

#### 2. createSvgIcon.tsx - 图标工厂函数

**作用**：创建标准化的 SVG 图标组件

**实现要点**：
- 支持 size 和 color 属性
- 动态生成 style 对象
- 传递 `classes` 对象到 svg 函数
- 渲染 `<span class="t-icon">` 包装 SVG 元素

**代码实现**：
```tsx
const createSvgIcon = ({ svg, displayName }: SvgIconCreateFnParams) => {
  const Component = defineComponent({
    name: displayName,
    props: {
      size: {
        type: [Number, String],
        default: undefined,
      },
      color: String,
    },
    setup(props, { attrs }) {
      const { size, color } = toRefs(props);

      const styleObj = computed(() => {
        const res: { width?: string; height?: string; color?: string } = {};
        if (size.value) {
          const sizeStr = typeof size.value === "number" ? `${size.value}px` : size.value;
          res.width = sizeStr;
          res.height = sizeStr;
        }
        if (color.value) {
          res.color = color.value;
        }
        return res;
      });

      const classes = {
        svg: "svg",
      };

      return () => {
        const svgElement = svg({ classes });
        return (
          <span class="t-icon" style={styleObj.value} {...attrs}>
            {svgElement}
          </span>
        );
      };
    },
  });

  return Component;
};
```

#### 3. 图标组件示例

**单个图标组件结构**：
```tsx
import createSvgIcon from "../utils/createSvgIcon";

const AddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" class={classes.svg}>
      <path d="M2048 960v128h-960v960H960v-960H0V960h960V0h128v960h960z" />
    </svg>
  ),
  displayName: "AddIcon",
});

export default AddIcon;
```

**关键点**：
- svg 函数接收 `{ classes }` 参数
- SVG 使用 `class={classes.svg}` 动态绑定类名
- 不使用 `aria-hidden`、`focusable` 等无障碍性属性

## 使用方式

### 方式一：使用 TIcon 动态组件

```vue
<script setup lang="ts">
import TIcon from './Icon';
</script>

<template>
  <!-- 基础使用 -->
  <TIcon name="add" />

  <!-- 自定义尺寸 -->
  <TIcon name="delete" :size="24" />

  <!-- 自定义颜色 -->
  <TIcon name="edit" color="red" />

  <!-- 组合使用 -->
  <TIcon name="search" :size="32" color="#0078d4" />
</template>
```

### 方式二：直接导入图标组件

```vue
<script setup lang="ts">
import { AddIcon, DeleteIcon, EditIcon } from './icon';
</script>

<template>
  <AddIcon />
  <DeleteIcon :size="20" />
  <EditIcon color="blue" />
</template>
```

## Props 定义

### TIcon 组件 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | `string` | `undefined` | 图标名称（kebab-case） |
| size | `number \| string` | `undefined` | 图标尺寸（如 24 或 "24px"） |
| color | `string` | `undefined` | 图标颜色（CSS 颜色值） |

### 图标组件 Props

每个图标组件都支持：
- `size`: 图标尺寸
- `color`: 图标颜色
- 其他任意 HTML 属性（通过 `{...attrs}` 透传）

## 图标列表

### 基础操作（16个）
- AddIcon, DeleteIcon, EditIcon, SaveIcon, CancelIcon, AcceptIcon
- CheckMarkIcon, CopyIcon, PasteIcon, CutIcon, RedoIcon, UndoIcon
- ClearIcon, FilterIcon, SortIcon, RefreshIcon

### 导航箭头（18个）
- ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon
- ChevronUpSmallIcon, ChevronDownSmallIcon, ChevronLeftSmallIcon, ChevronRightSmallIcon
- ChevronUpMedIcon, ChevronDownMedIcon, ChevronLeftMedIcon, ChevronRightMedIcon
- BackIcon, ForwardIcon, UpIcon, DownIcon

### 搜索和缩放（5个）
- SearchIcon, ZoomInIcon, ZoomOutIcon, FullScreenIcon, ZoomToFitIcon

### 状态图标（8个）
- ErrorIcon, WarningIcon, InfoIcon, BlockedIcon
- CirclePauseIcon, CircleStopIcon, StatusTriangleIcon
- UnknownIcon, ErrorBadgeIcon, CompletedIcon

### 文件和文件夹（11个）
- FolderIcon, FolderOpenIcon
- FileCSSIcon, FileHTMLIcon, FileCodeIcon, FileSymlinkIcon
- VideoIcon, DocumentIcon, PageIcon

### 编辑格式（15个）
- BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon
- FontSizeIcon, FontColorIcon, FontDecreaseIcon, FontIncreaseIcon
- AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon
- LineSpacingIcon

### 媒体播放（7个）
- PlayIcon, PauseIcon, StopIcon, NextIcon, PreviousIcon
- FastForwardIcon, RewindIcon

### 用户和账户（10个）
- ContactIcon, GroupIcon, PeopleIcon, PartyLeaderIcon, PermissionsIcon
- LockIcon, UnlockIcon, ProtectedDocumentIcon

### 其他常用（20个）
- SettingsIcon, ViewIcon, HideIcon
- HeartIcon, FlagIcon, PinIcon, TagIcon
- MailIcon, CalendarIcon, ClockIcon, TimerIcon, AlarmClockIcon
- LocationIcon, HomeIcon
- DownloadIcon, UploadIcon, ShareIcon, LinkIcon, PrintIcon

**总计：110 个图标**

完整列表请参考 [doc.md](./doc.md)

## 自动化工具

### 1. migrate-icons.js - 图标迁移脚本

**作用**：批量从 React 组件转录图标到 Vue

**功能**：
- 从 `react-components/react-icons-mdl2/src/components` 读取 React 图标
- 自动转换语法：
  - 移除 `import * as React from 'react'`
  - 将 `className` 改为 `class`
  - 移除 `aria-hidden` 和 `focusable` 属性
- 生成 Vue 图标组件到 `src/icon/components`

**使用方法**：
```bash
node scripts/migrate-icons.js
```

### 2. fix-icons.js - 图标修复脚本

**作用**：修复图标组件的 CSS 类绑定

**功能**：
- 将 `class="svg"` 改为 `class={classes.svg}`
- 确保 svg 函数接收 `{ classes }` 参数

**使用方法**：
```bash
node scripts/fix-icons.js
```

### 3. update-icons-index.js - 索引生成脚本

**作用**：自动生成 icons.tsx 和 index.ts

**功能**：
- 扫描 `src/icon/components` 目录
- 生成所有图标的 import 语句
- 生成 ICONS 映射对象（kebab-case 到组件）
- 生成导出语句

**使用方法**：
```bash
node scripts/update-icons-index.js
```

## 样式系统

### CSS 类名

```css
/* 图标基础样式 */
.t-icon {
  display: inline-block;
  /* 其他基础样式... */
}

/* 找不到图标时的样式 */
.t-icon--not-found {
  /* 占位符样式... */
}
```

### 样式应用

1. **尺寸**：通过内联 style 设置 `width` 和 `height`
2. **颜色**：通过内联 style 设置 `color`
3. **其他样式**：通过透传的 attrs 添加 class 或 style

## 设计决策

### 1. 为什么提供两种使用方式？

- **TIcon 动态组件**：适合需要动态切换图标的场景，如通过 API 返回图标名
- **直接导入**：适合明确使用哪个图标的场景，有更好的 TypeScript 类型提示

### 2. 为什么图标组件返回 `<span>` 包装的 SVG？

- 方便应用尺寸和颜色样式
- 支持任意 HTML 属性透传
- 保持与 @fluentui/react-icons 一致的结构

### 3. 为什么不使用无障碍性属性？

遵循项目开发规范：
- 专注实现 Fluent Design 的视觉效果
- 不处理 ARIA 属性、键盘导航、屏幕阅读器等
- 用户可在应用层自行添加所需的无障碍性支持

### 4. 为什么使用 kebab-case 命名？

- 符合 Web Components 和 Vue 的命名惯例
- 更容易在模板中使用（`<TIcon name="chevron-right" />`）
- 与 HTML 属性命名风格一致

## 技术栈

- **Vue 3.5+** - Composition API
- **TypeScript 5.x** - 完整类型支持
- **TSX** - JSX 语法编写 Vue 组件
- **Histoire** - 文档和示例展示

## 开发指南

### 添加新图标

1. 从 @fluentui/react-icons 找到需要的图标
2. 运行迁移脚本（如果图标在迁移列表中）：
   ```bash
   node scripts/migrate-icons.js
   ```
3. 或手动创建图标组件：
   ```tsx
   // src/icon/components/MyIcon.tsx
   import createSvgIcon from "../utils/createSvgIcon";

   const MyIcon = createSvgIcon({
     svg: ({ classes }) => (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" class={classes.svg}>
         <path d="..." />
       </svg>
     ),
     displayName: "MyIcon",
   });

   export default MyIcon;
   ```
4. 更新索引：
   ```bash
   node scripts/update-icons-index.js
   ```

### 调试技巧

1. **检查图标是否正确渲染**：
   - 打开浏览器 DevTools
   - 检查是否有 `<span class="t-icon">`
   - 检查 SVG 是否有正确的 class

2. **检查图标映射**：
   - 查看 [icons.tsx](./icons.tsx) 确认图标已注册
   - 确认 name 使用 kebab-case

3. **检查样式**：
   - 确认 size 和 color 正确传递
   - 检查是否有 CSS 冲突

## 已知问题和解决方案

### 问题 1：图标不显示

**原因**：SVG 使用了 `class="svg"` 而不是 `class={classes.svg}`

**解决**：运行修复脚本
```bash
node scripts/fix-icons.js
```

### 问题 2：双层 `<span class="t-icon">` 嵌套

**原因**：TIcon 组件添加了额外的包装 span

**解决**：TIcon 直接渲染图标组件，不添加包装器
```tsx
// 错误：添加了额外的包装
return <span class="t-icon"><IconComp /></span>;

// 正确：直接渲染图标组件
return <IconComp size={size.value} color={color.value} {...attrs} />;
```

### 问题 3：图标名称找不到

**原因**：name 使用了错误的大小写格式

**解决**：始终使用 kebab-case
```vue
<!-- 错误 -->
<TIcon name="ChevronRight" />

<!-- 正确 -->
<TIcon name="chevron-right" />
```

## 参考资源

- [Fluent UI React Icons](https://react.fluentui.dev/?path=/docs/icons--page)
- [Fluent Design System](https://www.fluentui.com/)
- [Vue 3 TSX 文档](https://vuejs.org/guide/extras/rendering-mechanism.html#jsx-tsx)
