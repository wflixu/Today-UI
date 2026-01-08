<script lang="ts" setup>
import { ref } from 'vue'
import TButton from './Button'
import type { ButtonProps } from './Button.types'

// 测试 loading 状态
const loading = ref(false)

const handleLoad = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// 测试键盘事件
const handleKeyDown = (event: KeyboardEvent) => {
  console.log('Key down:', event.key)
}

const handleKeyUp = (event: KeyboardEvent) => {
  console.log('Key up:', event.key)
}
</script>

<template>
  <Story title="Button - 新功能测试">
    <Variant title="Loading 状态">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <TButton :loading="loading" @click="handleLoad">
          点击加载
        </TButton>

        <TButton loading loadingText="处理中...">
          持续加载
        </TButton>

        <TButton appearance="primary" :loading="loading">
          Primary Loading
        </TButton>
      </div>
    </Variant>

    <Variant title="无障碍性 - ARIA 属性">
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <TButton aria-label="关闭对话框">
          关闭
        </TButton>

        <TButton
          aria-haspopup="menu"
          aria-expanded="false"
        >
          菜单
        </TButton>

        <TButton
          aria-pressed="false"
          aria-label="静音"
        >
          <template #icon>🔇</template>
        </TButton>
      </div>
    </Variant>

    <Variant title="键盘事件">
      <TButton
        @keydown="handleKeyDown"
        @keyup="handleKeyUp"
      >
        按任意键（查看控制台）
      </TButton>
    </Variant>

    <Variant title="Icon-only 优化">
      <div style="display: flex; gap: 12px; align-items: center;">
        <TButton size="small">
          <template #icon>🔍</template>
        </TButton>

        <TButton>
          <template #icon>⚙️</template>
        </TButton>

        <TButton size="large">
          <template #icon>📄</template>
        </TButton>
      </div>
    </Variant>
  </Story>
</template>
