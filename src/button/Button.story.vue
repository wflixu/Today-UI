<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TButton from './Button'
import type { ButtonProps } from './Button.types'

// 定义辅助函数
const showAlert = (message: string) => {
  alert(message)
}

const consoleLog = (message: string) => {
  console.log(message)
}

const state = reactive({
  disabled: false,
  disabledFocusable: false,
  shape: 'rounded' as ButtonProps['shape'],
  appearance: 'secondary' as ButtonProps['appearance'],
  iconPosition: 'before' as ButtonProps['iconPosition'],
  size: 'medium' as ButtonProps['size']
})

const appearanceOptions = {
  'secondary': 'secondary',
  'primary': 'primary',
  'outline': 'outline',
  'subtle': 'subtle',
  'transparent': 'transparent'
}

const shapeOptions = {
  "rounded": "rounded",
  "circular": "circular",
  "square": "square"
}

const sizeOptions = {
  'small': 'small',
  'medium': 'medium',
  'large': 'large'
}

const iconPositionOptions = {
  'before': 'before',
  'after': 'after'
}

// Loading 状态测试
const loading = ref(false)
const handleLoad = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// 键盘事件测试
const handleKeyDown = (event: KeyboardEvent) => {
  console.log('Key down:', event.key)
}

const handleKeyUp = (event: KeyboardEvent) => {
  console.log('Key up:', event.key)
}
</script>

<template>
  <Story title="Basic/Button">
    <template #controls>
      <HstSelect v-model="state.appearance" title="appearance" :options="appearanceOptions" />
      <HstSelect v-model="state.shape" title="shape" :options="shapeOptions" />
      <HstSelect v-model="state.size" title="size" :options="sizeOptions" />
      <HstSelect v-model="state.iconPosition" title="iconPosition" :options="iconPositionOptions" />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstCheckbox v-model="state.disabledFocusable" title="Disabled Focusable" />
    </template>

    <Variant title="基础按钮">
      <TButton :appearance="state.appearance" :shape="state.shape" :size="state.size" :disabled="state.disabled">
        基础按钮
      </TButton>
    </Variant>

    <Variant title="外观变体">
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <TButton appearance="primary">Primary</TButton>
        <TButton appearance="secondary">Secondary</TButton>
        <TButton appearance="outline">Outline</TButton>
        <TButton appearance="subtle">Subtle</TButton>
        <TButton appearance="transparent">Transparent</TButton>
      </div>
    </Variant>

    <Variant title="形状变体">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton shape="rounded">Rounded</TButton>
        <TButton shape="circular">Circular</TButton>
        <TButton shape="square">Square</TButton>
      </div>
    </Variant>

    <Variant title="尺寸变体">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton size="small">Small</TButton>
        <TButton size="medium">Medium</TButton>
        <TButton size="large">Large</TButton>
      </div>
    </Variant>

    <Variant title="带图标">
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <TButton>
          <template #icon>📄</template>
          图标在前
        </TButton>
        <TButton icon-position="after">
          <template #icon>📄</template>
          图标在后
        </TButton>
        <TButton>
          <template #icon>🔍</template>
        </TButton>
      </div>
    </Variant>

    <Variant title="状态">
      <div style="display: flex; gap: 12px;">
        <TButton>正常状态</TButton>
        <TButton disabled>禁用状态</TButton>
        <TButton disabled disabled-focusable>禁用但可聚焦</TButton>
      </div>
    </Variant>

    <Variant title="Loading 状态">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton :loading="loading" @click="handleLoad">
          点击加载
        </TButton>
        <TButton loading loading-text="处理中...">
          带加载文本
        </TButton>
        <TButton appearance="primary" loading>
          Primary 加载中
        </TButton>
        <TButton appearance="outline" loading>
          Outline 加载中
        </TButton>
      </div>
    </Variant>

    <Variant title="无障碍性">
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <TButton aria-label="关闭对话框">
            仅有图标的按钮
          </TButton>
          <TButton aria-label="保存文件">
            <template #icon>💾</template>
          </TButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <TButton aria-describedby="save-desc">
            保存文件
          </TButton>
          <span id="save-desc" style="font-size: 12px; color: #666;">
            (这将保存到本地存储)
          </span>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <TButton aria-expanded="false" aria-haspopup="true">
            下拉菜单
          </TButton>
          <TButton aria-pressed="false">
            切换按钮
          </TButton>
        </div>
      </div>
    </Variant>

    <Variant title="键盘事件">
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <TButton
          @keydown="handleKeyDown"
          @keyup="handleKeyUp"
          @click="consoleLog('键盘事件测试')"
        >
          按键测试（查看控制台）
        </TButton>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">
          提示：按 Enter 或 Space 键触发点击，查看控制台输出
        </div>
      </div>
    </Variant>

    <Variant title="点击事件">
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <TButton @click="showAlert('Primary clicked!')" appearance="primary">
          点击我（Primary）
        </TButton>
        <TButton @click="showAlert('Secondary clicked!')">
          点击我（Secondary）
        </TButton>
        <TButton @click="consoleLog('Outline clicked')" appearance="outline">
          点击查看控制台（Outline）
        </TButton>
        <TButton @click="consoleLog('Subtle clicked')" appearance="subtle">
          点击查看控制台（Subtle）
        </TButton>
        <TButton @click="consoleLog('Transparent clicked')" appearance="transparent">
          点击查看控制台（Transparent）
        </TButton>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md"># Button 组件

按钮组件是用户界面中最基础的交互元素，用于触发操作或导航。

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `appearance` | `'secondary' \| 'primary' \| 'outline' \| 'subtle' \| 'transparent'` | `'secondary'` | 按钮的外观样式 |
| `shape` | `'rounded' \| 'circular' \| 'square'` | `'rounded'` | 按钮的形状 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮的尺寸 |
| `icon-position` | `'before' \| 'after'` | `'before'` | 图标相对于文本的位置 |
| `disabled` | `boolean` | `false` | 是否禁用按钮 |
| `disabled-focusable` | `boolean` | `false` | 禁用但可聚焦（用于保持 tab 顺序） |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `loading-text` | `string` | `undefined` | 加载时显示的文本 |
| `aria-label` | `string` | `undefined` | 无障碍标签 |
| `aria-labelledby` | `string` | `undefined` | 无障碍标签引用 |
| `aria-describedby` | `string` | `undefined` | 无障碍描述引用 |
| `aria-expanded` | `boolean` | `undefined` | 无障碍展开状态 |
| `aria-haspopup` | `boolean` | `undefined` | 无障碍弹出菜单标记 |
| `aria-pressed` | `boolean` | `undefined` | 无障碍按下状态 |
| `as` | `string` | `'button'` | 渲染的元素类型 |

### Slots

| 插槽名 | 描述 |
|--------|------|
| `default` | 按钮的主要内容 |
| `icon` | 按钮的图标 |

## 外观变体

- **Primary**: 主要操作按钮，使用品牌色背景
- **Secondary**: 次要操作按钮，默认样式
- **Outline**: 轮廓按钮，透明背景
- **Subtle**: 微妙按钮，悬停时显示强调色
- **Transparent**: 透明按钮，完全透明背景和边框

## 形状变体

- **Rounded**: 圆角按钮（默认）
- **Circular**: 圆形按钮
- **Square**: 方形按钮（无圆角）

## 尺寸变体

- **Small**: 小尺寸按钮
- **Medium**: 中等尺寸按钮（默认）
- **Large**: 大尺寸按钮

## 使用示例

```vue
<!-- 基础用法 -->
<TButton>点击我</TButton>

<!-- 不同外观 -->
<TButton appearance="primary">主要操作</TButton>
<TButton appearance="outline">轮廓按钮</TButton>

<!-- 带图标 -->
<TButton>
  <template #icon>📄</template>
  保存文件
</TButton>

<!-- 不同尺寸和形状 -->
<TButton size="large" shape="circular">大圆形按钮</TButton>

<!-- 禁用状态 -->
<TButton disabled>禁用按钮</TButton>

<!-- Loading 状态 -->
<TButton loading>加载中...</TButton>
<TButton loading loading-text="正在处理">
  提交
</TButton>

<!-- 无障碍性 -->
<TButton aria-label="关闭对话框">
  <template #icon>✕</template>
</TButton>
<TButton aria-describedby="save-desc">保存</TButton>

<!-- 键盘事件 -->
<TButton @keydown="handleKey" @keyup="handleKey">
  按键测试
</TButton>
```

## Loading 状态

当按钮处于加载状态时：
- 按钮自动变为禁用状态，无法点击
- 显示旋转的加载指示器（除非是仅图标按钮）
- 可以通过 `loading-text` 属性显示加载文本
- 自动设置 `aria-busy="true"` 以支持屏幕阅读器

## 无障碍性

Button 组件完全支持 WAI-ARIA 规范：

- **aria-label**: 为按钮提供无障碍标签，特别是对于仅图标按钮
- **aria-labelledby**: 通过其他元素的 ID 引用作为标签
- **aria-describedby**: 引用提供额外描述的元素
- **aria-expanded**: 标记下拉菜单等展开状态
- **aria-haspopup**: 标记按钮触发弹出菜单
- **aria-pressed**: 标记切换按钮的按下状态

## 键盘交互

- **Enter / Space**: 触发按钮点击
- **keydown / keyup 事件**: 可通过 `@keydown` 和 `@keyup` 监听键盘事件

## 向后兼容

为了向后兼容，组件仍支持 `type` prop，但建议使用 `appearance` 替代。使用 `type` 时会在控制台显示警告信息。

```vue
<!-- 兼容旧版本 - 会显示警告 -->
<TButton type="primary">按钮</TButton>

<!-- 推荐的新用法 -->
<TButton appearance="primary">按钮</TButton>
```
</docs>
