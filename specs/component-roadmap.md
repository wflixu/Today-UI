# Today-UI 组件实现路线图

**项目**: Today-UI - Fluent Design Vue3 组件库
**参考源**: @fluentui/react-components (v9)
**更新日期**: 2026-02-13

## 概览

Today-UI 旨在将微软的 Fluent Design System 完整转录到 Vue 3 生态系统中。本文档规划了组件实现的优先级和顺序。

### 当前进度

- ✅ 已实现: **2/53** (4%)
- 🚧 进行中: 0
- 📋 待实现: 51

---

## 已实现组件

| 组件名 | 状态 | 文件位置 | 备注 |
|--------|------|----------|------|
| Button | ✅ 完成 | [src/button/](src/button/) | 基础按钮组件 |
| Icon (TIcon) | ✅ 完成 | [src/icon/](src/icon/) | SVG 图标系统 |

### 部分实现或待完善的组件

以下组件存在代码实现，但可能需要进一步完善：

| 组件名 | 状态 | 文件位置 | 备注 |
|--------|------|----------|------|
| Tooltip | 🚧 部分完成 | [src/tooltip/](src/tooltip/) | 需验证完整性 |
| Dropdown | 🚧 部分完成 | [src/dropdown/](src/dropdown/) | 需验证完整性 |
| Menu | 🚧 部分完成 | [src/menu/](src/menu/) | 需验证完整性 |
| Tabs | 🚧 部分完成 | [src/tabs/](src/tabs/) | 需验证完整性 |
| FileTree | 🚧 部分完成 | [src/file-tree/](src/file-tree/) | 自定义组件，需验证 |
| Dialog | 🚧 部分完成 | [src/dialog/](src/dialog/) | 需验证完整性 |
| Toast | 🚧 部分完成 | [src/toast/](src/toast/) | 需验证完整性 |

---

## 组件实现优先级

### 🔴 P0 - 最高优先级（基础表单组件）

这些组件是构建任何 Web 应用的基础，使用频率最高。

| 组件名 | 说明 | 复杂度 | 依赖 |
|--------|------|--------|------|
| **Input** | 单行文本输入框 | 中 | Field, Label |
| **Checkbox** | 复选框 | 低 | Label |
| **Radio** | 单选框 | 低 | Label |
| **Select** | 下拉选择器 | 高 | Dropdown, Field, Label |
| **Switch** | 开关切换 | 中 | Label |
| **Textarea** | 多行文本输入 | 低 | Field, Label |
| **Field** | 表单字段包装器 | 低 | Label |
| **Label** | 表单标签 | 低 | - |
| **Slider** | 滑块选择器 | 中 | Label |
| **SpinButton** | 数字增减输入 | 中 | Input, Button |

**实现顺序建议**:
1. Label (最基础，无依赖)
2. Field (依赖 Label)
3. Input (依赖 Field, Label)
4. Checkbox (依赖 Label)
5. Radio (依赖 Label)
6. Textarea (依赖 Field, Label)
7. Switch (依赖 Label)
8. Slider (依赖 Label)
9. SpinButton (依赖 Input, Button)
10. Select (最复杂，依赖 Dropdown, Field, Label)

---

### 🟡 P1 - 高优先级（布局与展示组件）

常用的布局和数据展示组件。

| 组件名 | 说明 | 复杂度 | 依赖 |
|--------|------|--------|------|
| **Card** | 卡片容器 | 低 | - |
| **Divider** | 分割线 | 低 | - |
| **Badge** | 徽章标记 | 低 | - |
| **Avatar** | 头像显示 | 中 | - |
| **List** | 列表展示 | 中 | - |
| **Table** | 数据表格 | 高 | - |
| **Link** | 超链接 | 低 | - |
| **Text** | 文本组件 | 低 | - |
| **Image** | 图片组件 | 低 | - |

**实现顺序建议**:
1. Divider (最简单)
2. Text
3. Link
4. Badge
5. Image
6. Card
7. Avatar
8. List
9. Table

---

### 🟠 P2 - 中优先级（反馈与状态组件）

用户反馈和加载状态的组件。

| 组件名 | 说明 | 复杂度 | 依赖 |
|--------|------|--------|------|
| **Spinner** | 加载动画 | 低 | - |
| **Skeleton** | 骨架屏 | 中 | - |
| **Progress** | 进度条 | 中 | - |
| **MessageBar** | 消息提示条 | 中 | Icon |
| **Dialog** | 模态对话框 | 高 | Portal, Button |

**实现顺序建议**:
1. Spinner
2. Progress
3. Skeleton
4. MessageBar
5. Dialog

---

### 🔵 P3 - 中低优先级（复杂交互组件）

功能较复杂但使用频率中等的组件。

| 组件名 | 说明 | 复杂度 | 依赖 |
|--------|------|--------|------|
| **Accordion** | 手风琴 | 高 | - |
| **Breadcrumb** | 面包屑导航 | 中 | - |
| **Drawer** | 抽屉侧边栏 | 高 | Portal, Button |
| **Popover** | 弹出框 | 高 | Tooltip, Portal |
| **TeachingPopover** | 教学提示框 | 高 | Popover, Button |
| **Rating** | 评分组件 | 中 | Icon |
| **Tree** | 树形结构 | 高 | - |
| **Persona** | 用户信息卡片 | 中 | Avatar |
| **InfoLabel** | 信息标签 | 低 | Label, Icon |
| **Nav** | 导航菜单 | 高 | - |

**实现顺序建议**:
1. InfoLabel
2. Breadcrumb
3. Rating
4. Persona
5. Accordion
6. Drawer
7. Popover
8. TeachingPopover
9. Tree
10. Nav

---

### ⚪ P4 - 低优先级（专用组件）

特定场景使用或功能较复杂的组件。

| 组件名 | 说明 | 复杂度 | 依赖 |
|--------|------|--------|------|
| **ColorPicker** | 颜色选择器 | 高 | Input, Button, Popover |
| **DatePicker** | 日期选择器 | 高 | Input, Button, Popover, Calendar |
| **TimePicker** | 时间选择器 | 高 | Input, Button, Popover |
| **TagPicker** | 标签选择器 | 高 | Input, Tags, Popover |
| **Combobox** | 组合输入框 | 高 | Input, Select, Popover |
| **Search** | 搜索框 | 中 | Input, Icon |
| **SwatchPicker** | 色板选择器 | 高 | Button, Popover |
| **Calendar** | 日历组件 | 高 | Button |
| **Tags** | 标签组件 | 低 | - |
| **Overflow** | 溢出菜单 | 高 | Menu, Popover |
| **Carousel** | 轮播图 | 高 | Button |
| **Toolbar** | 工具栏 | 中 | Button, Dropdown, Menu |

**实现顺序建议**:
1. Tags
2. Search
3. Toolbar
4. Overflow
5. SwatchPicker
6. ColorPicker
7. Calendar
8. TimePicker
9. DatePicker
10. TagPicker
11. Combobox
12. Carousel

---

### 🟤 P5 - 基础设施组件

非 UI 组件，而是提供核心功能的基础设施。

| 组件名 | 说明 | 复杂度 |
|--------|------|--------|
| **Portal** | 传送门（渲染到指定 DOM 节点） | 中 |
| **Provider** | 主题提供者（FluentProvider） | 低 |

**实现顺序建议**:
1. Provider (需优先实现，很多组件依赖)
2. Portal

---

## 实现注意事项

### 转录原则

从 @fluentui/react-components 转录组件时：

1. **保持 API 一致性**: Props 名称、类型、默认值应与原组件一致
2. **使用 griffel-vue**: CSS-in-JS 方案替代 @griffel/react
3. **Hooks 转换**: React hooks → Vue 3 Composition API
4. **TSX 语法**: 保持类似的 TSX 编码风格
5. **视觉一致性**: 样式、动画、交互效果与原组件一致

### 不实现的功能

根据项目规范，**不实现无障碍性相关功能**：
- ❌ ARIA 属性（aria-label, aria-describedby 等）
- ❌ 键盘导航（onKeyDown, onKeyUp 等）
- ❌ role 和 tabIndex 属性
- ❌ 屏幕阅读器支持

如需无障碍性，用户应在应用层自行添加。

### 组件结构规范

每个组件应包含：
- `.tsx` - 主要组件逻辑
- `props.ts` - Props 定义
- `type.ts` - TypeScript 类型定义
- `.story.vue` - Histoire 文档示例
- `spec.md` - 组件设计规格（可选）
- `style/` - 组件特定样式（需要时）

---

## 进度跟踪

### 目标

- **短期目标 (1-2 个月)**: 完成 P0 基础表单组件
- **中期目标 (3-6 个月)**: 完成 P1 + P2 组件，覆盖 80% 常用场景
- **长期目标 (6-12 个月)**: 完成所有 P0-P4 组件，达到与 @fluentui/react-components 同等覆盖度

### 里程碑

| 里程碑 | 组件数量 | 目标日期 | 状态 |
|--------|----------|----------|------|
| M0: 基础组件 | 2 | 2025-12 | ✅ 已完成 (Button, Icon) |
| M1: P0 表单组件 | 10 | 2026-04 | 📋 计划中 |
| M2: P1 布局组件 | 9 | 2026-06 | 📋 计划中 |
| M3: P2 反馈组件 | 5 | 2026-08 | 📋 计划中 |
| M4: P3 交互组件 | 10 | 2026-10 | 📋 计划中 |
| M5: P4 专用组件 | 12 | 2026-12 | 📋 计划中 |

---

## 参考资源

- **官方文档**: https://react.fluentui.dev/
- **GitHub 仓库**: https://github.com/microsoft/fluentui/tree/master/packages/react-components
- **NPM 包**: https://www.npmjs.com/package/@fluentui/react-components
