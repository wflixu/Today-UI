# Icon 组件使用指南

## 概述

Today-UI 的 Icon 组件提供了 **110+** 个常用图标，支持两种使用方式：
1. **通过 `<TIcon name="xxx" />` 组件** - 动态指定图标名称
2. **直接使用图标组件** - 如 `<AddIcon />`、`<DeleteIcon />` 等

所有图标来自 Fluent UI Design System，与 @fluentui/react-icons 保持一致。

## 安装使用

### 方式 1: 使用 TIcon 组件

```vue
<script setup>
import TIcon from 'today-ui/icon'
</script>

<template>
  <!-- 基础用法 -->
  <TIcon name="add" />

  <!-- 自定义尺寸 -->
  <TIcon name="delete" :size="32" />

  <!-- 自定义颜色 -->
  <TIcon name="search" color="red" />

  <!-- 组合使用 -->
  <TIcon name="chevron-right" :size="24" color="#666" />
</template>
```

### 方式 2: 直接使用图标组件

```vue
<script setup>
import { AddIcon, DeleteIcon, SearchIcon } from 'today-ui/icon'
</script>

<template>
  <AddIcon :size="24" />
  <DeleteIcon :size="32" color="red" />
  <SearchIcon color="#666" />
</template>
```

## Props

### TIcon 组件 Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `name` | `string` | - | 图标名称（kebab-case） |
| `size` | `number \| string` | - | 图标尺寸（如 24, "32px"） |
| `color` | `string` | - | 图标颜色 |

### 所有图标组件 Props

所有图标组件（如 `<AddIcon />`）都支持相同的 props：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `size` | `number \| string` | "#999" | 图标尺寸 |
| `color` | `string` | - | 图标颜色 |

## 可用图标列表

### 基础操作（30个）
- `add` - 添加
- `delete` - 删除
- `edit` - 编辑
- `save` - 保存
- `cancel` - 取消
- `accept` - 接受
- `check-mark` - 勾选标记
- `copy` - 复制
- `paste` - 粘贴
- `cut` - 剪切
- `redo` - 重做
- `undo` - 撤销
- `clear` - 清除
- `filter` - 过滤
- `sort` - 排序
- `print` - 打印
- `download` - 下载
- `upload` - 上传
- `share` - 分享
- `link` - 链接
- `refresh` - 刷新
- `back` - 后退
- `forward` - 前进
- `up` - 上
- `down` - 下
- `completed` - 完成

### 导航箭头（20个）
- `chevron-up` - 上箭头
- `chevron-down` - 下箭头
- `chevron-left` - 左箭头
- `chevron-right` - 右箭头
- `chevron-up-small` - 小上箭头
- `chevron-down-small` - 小下箭头
- `chevron-left-small` - 小左箭头
- `chevron-right-small` - 小右箭头
- `chevron-up-med` - 中上箭头
- `chevron-down-med` - 中下箭头
- `chevron-left-med` - 中左箭头
- `chevron-right-med` - 中右箭头

### 搜索和缩放（7个）
- `search` - 搜索
- `zoom-in` - 放大
- `zoom-out` - 缩小
- `zoom-to-fit` - 适应屏幕
- `full-screen` - 全屏
- `view` - 查看
- `hide` - 隐藏

### 状态图标（15个）
- `error` - 错误
- `warning` - 警告
- `info` - 信息
- `blocked` - 阻塞
- `circle-pause` - 暂停圆圈
- `circle-stop` - 停止圆圈
- `status-triangle` - 状态三角形
- `unknown` - 未知
- `error-badge` - 错误徽章

### 文件和文件夹（13个）
- `folder` - 文件夹
- `folder-open` - 打开的文件夹
- `file-css` - CSS 文件
- `file-html` - HTML 文件
- `file-code` - 代码文件
- `file-symlink` - 符号链接文件
- `video` - 视频
- `page` - 页面
- `document` - 文档

### 编辑和格式（18个）
- `bold` - 粗体
- `italic` - 斜体
- `underline` - 下划线
- `strikethrough` - 删除线
- `font-size` - 字号
- `font-color` - 字体颜色
- `font-decrease` - 减小字号
- `font-increase` - 增大字号
- `align-left` - 左对齐
- `align-center` - 居中对齐
- `align-right` - 右对齐
- `align-justify` - 两端对齐
- `line-spacing` - 行间距

### 媒体播放（10个）
- `play` - 播放
- `pause` - 暂停
- `stop` - 停止
- `next` - 下一个
- `previous` - 上一个
- `fast-forward` - 快进
- `rewind` - 后退

### 用户和账户（10个）
- `contact` - 联系人
- `group` - 组
- `people` - 人员
- `party-leader` - 领导者
- `permissions` - 权限
- `lock` - 锁定
- `unlock` - 解锁
- `protected-document` - 受保护的文档

### 其他常用（17个）
- `settings` - 设置
- `heart` - 心形
- `flag` - 标记
- `pin` - 固定
- `tag` - 标签
- `mail` - 邮件
- `calendar` - 日历
- `clock` - 时钟
- `timer` - 计时器
- `alarm-clock` - 闹钟
- `location` - 位置
- `home` - 主页

### 特殊图标（5个）
- `spinner-filled` - 加载中（填充）
- `plug-disconnected` - 断开连接
- `plug-disconnected-filled` - 断开连接（填充）
- `database-filled` - 数据库（填充）
- `table-filled` - 表格（填充）
- `table-edit-filled` - 表格编辑（填充）
- `cube-tree-filled` - 树形立方体（填充）
- `dismiss-filled` - 关闭（填充）

## 完整图标列表

查看完整列表，可以导入并遍历 `ICONS` 对象：

```typescript
import { ICONS } from 'today-ui/icon'

// 获取所有图标名称
const iconNames = Object.keys(ICONS)
console.log(iconNames) // ['add', 'delete', 'edit', ...]
```

或查看源文件：
- `src/icon/components/` - 所有图标组件
- `src/icon/icons.tsx` - 图标映射表

## 添加新图标

如果需要添加更多图标，可以从 @fluentui/react-icons 转录：

### 方法 1: 使用自动转录脚本

```bash
# 编辑 scripts/migrate-icons.js，添加图标名称到 ICONS_TO_MIGRATE 数组
node scripts/migrate-icons.js

# 更新图标索引
node scripts/update-icons-index.js
```

### 方法 2: 手动转录

1. 从 `react-components/react-icons-mdl2/src/components/` 找到目标图标
2. 复制到 `src/icon/components/`
3. 修改导入语句：移除 React 导入，修改 createSvgIcon 路径
4. 移除 `aria-hidden` 和 `focusable` 属性
5. 运行 `node scripts/update-icons-index.js`

## 注意事项

1. **无障碍性**：根据项目规范，图标组件不包含 ARIA 属性
2. **图标名称**：使用 kebab-case（如 `chevron-right`，而非 `chevronRight`）
3. **尺寸推荐**：常用尺寸为 16、20、24、32、48
4. **颜色**：支持所有 CSS 颜色值（hex、rgb、颜色名等）

## 示例代码

```vue
<script setup>
import TIcon from 'today-ui/icon'
import { AddIcon, DeleteIcon } from 'today-ui/icon'
</script>

<template>
  <div class="icon-examples">
    <!-- 方式 1: TIcon 组件 -->
    <div class="icon-row">
      <TIcon name="add" :size="24" color="green" />
      <TIcon name="delete" :size="24" color="red" />
      <TIcon name="edit" :size="24" color="blue" />
    </div>

    <!-- 方式 2: 直接组件 -->
    <div class="icon-row">
      <AddIcon :size="32" />
      <DeleteIcon :size="32" />
    </div>

    <!-- 在按钮中使用 -->
    <button>
      <TIcon name="search" :size="16" />
      搜索
    </button>
  </div>
</template>
```

## 相关资源

- [Fluent UI Icons](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons) - 官方图标库
- [@fluentui/react-icons](https://www.npmjs.com/package/@fluentui/react-icons) - React 版本
- 项目源码: `src/icon/` 目录
