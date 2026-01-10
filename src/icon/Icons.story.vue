<script lang="ts" setup>
import { reactive, computed } from 'vue'
import TIcon from './Icon'
import { ICONS } from './icons'

const state = reactive<Partial<{ color: string, size: number }>>({
  color: '#666666',
  size: 24
})

// 获取所有图标名称并排序
const allIcons = computed(() => {
  return Object.keys(ICONS).sort()
})

// 按类别分组图标
const iconCategories = {
  '基础操作': [
    'add', 'delete', 'edit', 'save', 'cancel', 'accept', 'check-mark',
    'copy', 'paste', 'cut', 'redo', 'undo', 'clear', 'filter', 'sort',
    'print', 'download', 'upload', 'share', 'link', 'refresh',
    'back', 'forward', 'completed'
  ],
  '导航箭头': [
    'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
    'chevron-up-small', 'chevron-down-small', 'chevron-left-small', 'chevron-right-small',
    'chevron-up-med', 'chevron-down-med', 'chevron-left-med', 'chevron-right-med',
    'up', 'down'
  ],
  '搜索和缩放': [
    'search', 'zoom-in', 'zoom-out', 'zoom-to-fit', 'full-screen', 'view', 'hide'
  ],
  '状态图标': [
    'error', 'warning', 'info', 'blocked', 'circle-pause', 'circle-stop',
    'status-triangle', 'unknown', 'error-badge'
  ],
  '文件和文件夹': [
    'folder', 'folder-open', 'file-c-s-s', 'file-h-t-m-l', 'file-code',
    'file-symlink', 'video', 'page', 'document', 'database-filled',
    'table-filled', 'table-edit-filled', 'cube-tree-filled'
  ],
  '编辑和格式': [
    'bold', 'italic', 'underline', 'strikethrough', 'font-size', 'font-color',
    'font-decrease', 'font-increase', 'align-left', 'align-center',
    'align-right', 'align-justify', 'line-spacing'
  ],
  '媒体播放': [
    'play', 'pause', 'stop', 'next', 'previous', 'fast-forward', 'rewind'
  ],
  '用户和账户': [
    'contact', 'group', 'people', 'party-leader', 'permissions',
    'lock', 'unlock', 'protected-document'
  ],
  '其他常用': [
    'settings', 'heart', 'flag', 'pin', 'tag', 'mail', 'calendar',
    'clock', 'timer', 'alarm-clock', 'location', 'home'
  ],
  '特殊图标': [
    'spinner-filled', 'plug-disconnected', 'plug-disconnected-filled'
  ]
}
</script>

<template>
  <Story title="Basic/Icons">
    <template #controls>
      <HstNumber v-model="state.size" :step="1" title="Size" />
      <HstColorSelect v-model="state.color" title="Color" />
    </template>

    <Variant title="使用 TIcon 组件（通过 name 属性）">
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <TIcon name="zoom-to-fit" :size="state.size" :color="state.color" />
        <TIcon name="chevron-right" :size="state.size" :color="state.color" />
        <TIcon name="add" :size="state.size" :color="state.color" />
        <TIcon name="delete" :size="state.size" :color="state.color" />
        <TIcon name="search" :size="state.size" :color="state.color" />
        <TIcon name="edit" :size="state.size" :color="state.color" />
        <TIcon name="save" :size="state.size" :color="state.color" />
        <TIcon name="settings" :size="state.size" :color="state.color" />
      </div>
      <div style="margin-top: 16px; font-size: 14px; color: #666;">
        ✨ 通过 <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 4px;">name</code> 属性动态指定图标
      </div>
    </Variant>

    <Variant title="所有图标（按类别分组）">
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div v-for="(icons, category) in iconCategories" :key="category">
          <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #333;">
            {{ category }} ({{ icons.length }})
          </h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            <div
              v-for="iconName in icons"
              :key="iconName"
              style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; border: 1px solid #e0e0e0; border-radius: 6px; min-width: 60px;"
            >
              <TIcon :name="iconName" :size="state.size" :color="state.color" />
              <span style="font-size: 10px; color: #666; text-align: center; word-break: break-all;">{{ iconName }}</span>
            </div>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="所有图标（按字母顺序）">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <div
          v-for="iconName in allIcons"
          :key="iconName"
          style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; border: 1px solid #e0e0e0; border-radius: 6px; min-width: 60px;"
        >
          <TIcon :name="iconName" :size="state.size" :color="state.color" />
          <span style="font-size: 10px; color: #666; text-align: center; word-break: break-all;">{{ iconName }}</span>
        </div>
      </div>
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 6px; font-size: 14px;">
        📊 总计 <strong>{{ allIcons.length }}</strong> 个图标
      </div>
    </Variant>

    <Variant title="不同尺寸">
      <div style="display: flex; gap: 24px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TIcon name="search" :size="16" />
          <span style="font-size: 12px; color: #666;">16px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TIcon name="search" :size="20" />
          <span style="font-size: 12px; color: #666;">20px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TIcon name="search" :size="24" />
          <span style="font-size: 12px; color: #666;">24px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TIcon name="search" :size="32" />
          <span style="font-size: 12px; color: #666;">32px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TIcon name="search" :size="48" />
          <span style="font-size: 12px; color: #666;">48px</span>
        </div>
      </div>
    </Variant>

    <Variant title="不同颜色">
      <div style="display: flex; gap: 16px; align-items: center;">
        <TIcon name="heart" :size="state.size" color="#ff4d4f" />
        <TIcon name="heart" :size="state.size" color="#52c41a" />
        <TIcon name="heart" :size="state.size" color="#1890ff" />
        <TIcon name="heart" :size="state.size" color="#faad14" />
        <TIcon name="heart" :size="state.size" color="#722ed1" />
        <TIcon name="heart" :size="state.size" color="#666666" />
      </div>
      <div style="margin-top: 12px; font-size: 14px; color: #666;">
        💡 支持所有 CSS 颜色值（hex、rgb、颜色名等）
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Icon 组件

Today-UI 的 Icon 组件提供了 **110+** 个常用图标，支持两种使用方式。

## 使用方式

### 方式 1: 通过 name 属性

\`\`\`vue
<script setup>
import TIcon from 'today-ui/icon'
</script>

<template>
  <TIcon name="add" :size="24" color="red" />
</template>
\`\`\`

### 方式 2: 直接使用图标组件

\`\`\`vue
<script setup>
import { AddIcon, DeleteIcon } from 'today-ui/icon'
</script>

<template>
  <AddIcon :size="24" />
  <DeleteIcon :size="24" color="red" />
</template>
\`\`\`

## Props

### TIcon 组件

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| name | string | - | 图标名称（kebab-case） |
| size | number \| string | - | 图标尺寸 |
| color | string | - | 图标颜色 |

## 图标列表

</docs>
