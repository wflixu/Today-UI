<script lang="ts" setup>
import { ref } from 'vue'
import Input from '../Input'
import type { InputProps } from '../Input.types'

// 基础状态
const value = ref('')
const controlledValue = ref('受控输入')
const uncontrolledValue = ref('非受控初始值')

// 清除按钮演示
const clearableValue = ref('可以清除的文本')

// 密码演示
const passwordValue = ref('')

// 验证状态演示
const validValue = ref('valid@example.com')
const warningValue = ref('warning@example')
const invalidValue = ref('invalid-email')

// 进度指示器演示
const progressValue = ref('')
const progress = ref(60)

// 状态对象
const inputState = () => ({
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  appearance: 'outline' as InputProps['appearance'],
  size: 'medium' as InputProps['size'],
  type: 'text' as InputProps['type'],
  validationState: 'none' as InputProps['validationState'],
})

const appearanceOptions = {
  'outline': 'outline',
  'filled': 'filled',
  'underlined': 'underlined',
  'inline-dark': 'inline-dark',
  'inline-light': 'inline-light'
}

const sizeOptions = {
  'small': 'small',
  'medium': 'medium',
  'large': 'large'
}

const typeOptions = {
  'text': 'text',
  'password': 'password',
  'email': 'email',
  'number': 'number',
  'tel': 'tel',
  'url': 'url',
  'search': 'search'
}

const validationStateOptions = {
  'none': 'none',
  'valid': 'valid',
  'warning': 'warning',
  'invalid': 'invalid'
}
</script>

<template>
  <Story title="Components/Input" :initState="() => inputState">
    <template #controls="{ state }">
      <HstSelect v-model="state.appearance" title="appearance" :options="appearanceOptions" />
      <HstSelect v-model="state.size" title="size" :options="sizeOptions" />
      <HstSelect v-model="state.type" title="type" :options="typeOptions" />
      <HstSelect v-model="state.validationState" title="validationState" :options="validationStateOptions" />
      <HstCheckbox v-model="state.disabled" title="disabled" />
      <HstCheckbox v-model="state.readonly" title="readonly" />
      <HstCheckbox v-model="state.required" title="required" />
      <HstCheckbox v-model="state.error" title="error" />
    </template>

    <Variant title="基础用法">
      <Input v-model="value" placeholder="请输入内容" />
      <p>当前值: {{ value }}</p>
    </Variant>

    <Variant title="受控模式">
      <Input v-model="controlledValue" placeholder="受控输入框" />
      <p>当前值: {{ controlledValue }}</p>
    </Variant>

    <Variant title="非受控模式">
      <Input :default-value="uncontrolledValue" placeholder="非受控输入框" />
      <p>初始值: {{ uncontrolledValue }}</p>
    </Variant>

    <Variant title="外观变体">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div v-for="(_, appearance) in appearanceOptions" :key="appearance">
          <label>{{ appearance }}</label>
          <Input :appearance="appearance as InputProps['appearance']" placeholder="外观变体" />
        </div>
      </div>
    </Variant>

    <Variant title="尺寸变体">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div v-for="(_, sizeValue) in sizeOptions" :key="sizeValue">
          <label>{{ sizeValue }}</label>
          <Input :size="sizeValue as InputProps['size']" placeholder="尺寸变体" />
        </div>
      </div>
    </Variant>

    <Variant title="输入框类型">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div v-for="(_, inputType) in typeOptions" :key="inputType">
          <label>{{ inputType }}</label>
          <Input :type="inputType as InputProps['type']" :placeholder="`${inputType} 输入框`" />
        </div>
      </div>
    </Variant>

    <Variant title="状态">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Input placeholder="正常状态" />
        <Input placeholder="禁用状态" :disabled="true" />
        <Input placeholder="只读状态" :readonly="true" value="只读内容" />
        <Input placeholder="必填状态" :required="true" />
        <Input placeholder="错误状态" :error="true" />
      </div>
    </Variant>

    <Variant title="清除按钮">
      <Input v-model="clearableValue" placeholder="输入内容后显示清除按钮" :show-clear-button="true" />
      <p>当前值: {{ clearableValue }}</p>
    </Variant>

    <Variant title="密码输入">
      <Input v-model="passwordValue" type="password" placeholder="输入密码" :show-password-toggle="true" />
      <p>当前值: {{ passwordValue }}</p>
    </Variant>

    <Variant title="验证状态">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <label>无验证状态</label>
          <Input value="normal@example.com" />
        </div>
        <div>
          <label>验证通过</label>
          <Input v-model="validValue" validation-state="valid" validation-message="邮箱格式正确" />
        </div>
        <div>
          <label>警告</label>
          <Input v-model="warningValue" validation-state="warning" validation-message="邮箱可能是临时邮箱" />
        </div>
        <div>
          <label>验证失败</label>
          <Input v-model="invalidValue" validation-state="invalid" validation-message="邮箱格式不正确" />
        </div>
      </div>
    </Variant>

    <Variant title="进度指示器">
      <Input v-model="progressValue" placeholder="上传中..." :progress="progress" />
      <p>进度: {{ progress }}%</p>
      <div style="margin-top: 12px;">
        <button @click="progress = Math.max(0, progress - 10)">-10%</button>
        <button @click="progress = Math.min(100, progress + 10)">+10%</button>
      </div>
    </Variant>

    <Variant title="前置和后置内容">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Input placeholder="带前置图标">
          <template #contentBefore>
            <span>🔍</span>
          </template>
        </Input>
        <Input placeholder="带后置图标">
          <template #contentAfter>
            <span>@example.com</span>
          </template>
        </Input>
        <Input placeholder="同时带前后图标">
          <template #contentBefore>
            <span>📧</span>
          </template>
          <template #contentAfter>
            <span>@gmail.com</span>
          </template>
        </Input>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Input 组件

Input 组件是用户输入文本信息的主要界面元素，实现了微软 Fluent Design System 的输入框规范。

## 特性

- ✅ 5 种外观样式（Outline、Filled、Underlined、Inline-Dark、Inline-Light）
- ✅ 3 种尺寸（Small、Medium、Large）
- ✅ 支持多种输入类型（text、password、email、number、tel、url、search）
- ✅ 内置清除按钮（showClearButton）
- ✅ 内置密码显示/隐藏切换（showPasswordToggle）
- ✅ 支持验证状态（validationState：none/valid/warning/invalid）
- ✅ 支持进度指示器（progress）
- ✅ 支持前置和后置内容插槽（contentBefore、contentAfter）
- ✅ 完整的禁用、只读、必填、错误状态
- ✅ 完全遵循 Fluent Design 视觉规范

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `appearance` | `'outline' \| 'filled' \| 'underlined' \| 'inline-dark' \| 'inline-light'` | `'outline'` | 输入框的外观样式 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框的尺寸 |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | 输入框的 HTML 类型 |
| `disabled` | `boolean` | `false` | 是否禁用输入框 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `required` | `boolean` | `false` | 是否必填 |
| `error` | `boolean` | `false` | 是否显示错误状态 |
| `validation-state` | `'none' \| 'valid' \| 'warning' \| 'invalid'` | `'none'` | 验证状态 |
| `validation-message` | `string` | `undefined` | 验证消息 |
| `show-clear-button` | `boolean` | `true` | 是否显示清除按钮 |
| `show-password-toggle` | `boolean` | `false` | 是否显示密码切换按钮 |
| `progress` | `number` | `undefined` | 进度值（0-100） |
| `default-value` | `string` | `undefined` | 非受控模式的默认值 |
| `model-value` | `string` | `undefined` | 受控模式的值（v-model） |
| `name` | `string` | `undefined` | 表单提交时的字段名 |
| `placeholder` | `string` | `undefined` | 占位符文本 |
| `autocomplete` | `string` | `undefined` | 自动完成类型 |
| `max-length` | `number` | `undefined` | 最大字符长度 |
| `min-length` | `number` | `undefined` | 最小字符长度 |

### Slots

| 插槽名 | 描述 |
|--------|------|
| `content-before` | 输入框前的内容（如图标） |
| `content-after` | 输入框后的内容（如单位、后缀等） |
| `clear-button` | 自定义清除按钮 |
| `password-toggle-button` | 自定义密码切换按钮 |
| `progress-indicator` | 自定义进度指示器 |

## 外观变体

### Outline（默认）
标准的边框样式，适用于大多数场景。

```vue
<Input appearance="outline" placeholder="请输入内容" />
```

### Filled
填充背景色，适合需要强调输入区域的场景。

```vue
<Input appearance="filled" placeholder="请输入内容" />
```

### Underlined
仅底部边框，适合简洁的表单设计。

```vue
<Input appearance="underlined" placeholder="请输入内容" />
```

### Inline-Dark / Inline-Light
内联样式，适合在深色或浅色背景中使用。

```vue
<Input appearance="inline-dark" placeholder="深色背景输入" />
<Input appearance="inline-light" placeholder="浅色背景输入" />
```

## 尺寸变体

| 尺寸 | 高度 | 使用场景 |
|------|------|----------|
| `small` | 28px | 密集布局、表格操作 |
| `medium` | 32px | 默认尺寸，表单和对话框 |
| `large` | 40px | 主要操作、移动端友好 |

```vue
<Input size="small" placeholder="小输入框" />
<Input size="medium" placeholder="中输入框" />
<Input size="large" placeholder="大输入框" />
```

## 输入类型

```vue
<!-- 文本输入 -->
<Input type="text" placeholder="文本输入" />

<!-- 密码输入 -->
<Input type="password" placeholder="密码输入" :show-password-toggle="true" />

<!-- 邮箱输入 -->
<Input type="email" placeholder="邮箱地址" />

<!-- 数字输入 -->
<Input type="number" placeholder="数字" />

<!-- 电话输入 -->
<Input type="tel" placeholder="电话号码" />

<!-- URL 输入 -->
<Input type="url" placeholder="网址" />

<!-- 搜索输入 -->
<Input type="search" placeholder="搜索" />
```

## 状态控制

### 禁用和只读

```vue
<!-- 禁用状态 -->
<Input disabled placeholder="禁用的输入框" />

<!-- 只读状态 -->
<Input readonly value="只读内容" />
```

### 必填和错误

```vue
<!-- 必填状态 -->
<Input required placeholder="必填项" />

<!-- 错误状态 -->
<Input error placeholder="错误状态" />
```

## 清除按钮

当 `showClearButton` 为 `true`（默认）时，输入框有值时会自动显示清除按钮。

```vue
<script setup>
import { ref } from 'vue'

const value = ref('可以清除的文本')
</script>

<template>
  <Input v-model="value" placeholder="输入内容" />
</template>
```

**注意：** 清除按钮仅在以下条件同时满足时显示：
- `showClearButton` 为 `true`
- 输入框有值
- 输入框非禁用
- 输入框非只读

## 密码显示/隐藏

当 `type="password"` 且 `showPasswordToggle="true"` 时，输入框右侧会显示眼睛图标用于切换密码显示。

```vue
<script setup>
import { ref } from 'vue'

const password = ref('')
</script>

<template>
  <Input v-model="password" type="password" placeholder="输入密码" :show-password-toggle="true" />
</template>
```

## 验证状态

使用 `validationState` 和 `validationMessage` 显示验证状态：

```vue
<script setup>
import { ref } from 'vue'

const email = ref('')
const isValidEmail = computed(() => /@/.test(email.value))
</script>

<template>
  <Input
    v-model="email"
    type="email"
    placeholder="请输入邮箱"
    :validation-state="isValidEmail ? 'valid' : 'invalid'"
    :validation-message="isValidEmail ? '邮箱格式正确' : '邮箱格式不正确'"
  />
</template>
```

### 验证状态类型

| 状态 | 颜色 | 使用场景 |
|------|------|----------|
| `none` | 默认 | 无验证状态（默认） |
| `valid` | 绿色 | 验证通过 |
| `warning` | 橙色 | 警告信息 |
| `invalid` | 红色 | 验证失败 |

## 进度指示器

使用 `progress` 属性显示输入进度（0-100），适合文件上传、加载进度等场景。

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')
const progress = ref(60)

// 模拟上传进度
const startUpload = () => {
  progress.value = 0
  const interval = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(interval)
    }
  }, 500)
}
</script>

<template>
  <Input
    v-model="value"
    placeholder="上传文件中..."
    :progress="progress"
  />
  <p>进度: {{ progress }}%</p>
</template>
```

**注意：** 进度条显示在输入框底部，宽度根据进度值动态变化。

## 前置和后置内容

使用 `contentBefore` 和 `contentAfter` 插槽添加前置和后置内容：

```vue
<template>
  <!-- 前置内容 -->
  <Input placeholder="搜索">
    <template #contentBefore>
      <span>🔍</span>
    </template>
  </Input>

  <!-- 后置内容 -->
  <Input placeholder="邮箱地址">
    <template #contentAfter>
      <span>@gmail.com</span>
    </template>
  </Input>

  <!-- 同时添加 -->
  <Input placeholder="用户名">
    <template #contentBefore>
      <span>👤</span>
    </template>
    <template #contentAfter>
      <span>@admin</span>
    </template>
  </Input>
</template>
```

## 受控和非受控模式

### 受控模式（推荐）

使用 `v-model` 双向绑定输入值：

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="受控输入" />
  <p>当前值: {{ value }}</p>
</template>
```

### 非受控模式

使用 `defaultValue` 设置初始值，后续由组件内部管理：

```vue
<template>
  <Input :default-value="'初始值'" placeholder="非受控输入" />
</template>
```

**推荐：** 优先使用受控模式，以便完全控制输入值。

## 完整示例

### 登录表单

```vue
<script setup>
import { ref, computed } from 'vue'

const username = ref('')
const password = ref('')

const isFormValid = computed(() => {
  return username.value.length >= 3 && password.value.length >= 6
})

const handleSubmit = () => {
  if (isFormValid.value) {
    console.log('登录:', { username: username.value, password: password.value })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <Input
        v-model="username"
        placeholder="用户名（至少 3 个字符）"
        :validation-state="username.length >= 3 ? 'valid' : 'invalid'"
        :validation-message="username.length >= 3 ? '用户名可用' : '用户名太短'"
      />

      <Input
        v-model="password"
        type="password"
        placeholder="密码（至少 6 个字符）"
        :show-password-toggle="true"
        :validation-state="password.length >= 6 ? 'valid' : 'invalid'"
        :validation-message="password.length >= 6 ? '密码强度足够' : '密码太短'"
      />

      <button type="submit" :disabled="!isFormValid">
        登录
      </button>
    </div>
  </form>
</template>
```

### 搜索框

```vue
<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const isSearching = ref(false)

const handleSearch = async () => {
  isSearching.value = true
  // 执行搜索
  await performSearch(searchQuery.value)
  isSearching.value = false
}
</script>

<template>
  <div style="display: flex; gap: 8px;">
    <Input
      v-model="searchQuery"
      type="search"
      placeholder="搜索..."
      :show-clear-button="true"
      :disabled="isSearching"
    />
    <button type="button" :disabled="isSearching" @click="handleSearch">
      搜索
    </button>
  </div>
</template>
```

### 文件上传

```vue
<script setup>
import { ref } from 'vue'

const fileName = ref('')
const uploadProgress = ref(0)

const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  fileName.value = file.name
  uploadProgress.value = 0

  // 模拟上传
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
    }
  }, 500)
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileSelect" />
    <Input
      v-model="fileName"
      placeholder="选择文件"
      readonly
      :progress="uploadProgress > 0 ? uploadProgress : undefined"
    />
  </div>
</template>
```

## 最佳实践

### 1. 外观选择
- 表单默认使用 `outline`
- 搜索框使用 `filled` 强调输入区域
- 简洁场景使用 `underlined`
- 内联输入使用 `inline-dark` 或 `inline-light`

### 2. 尺寸选择
- 表单和对话框使用 `medium`（默认）
- 移动端或主要操作使用 `large`
- 密集布局（表格、工具栏）使用 `small`

### 3. 验证反馈
- 即时验证使用 `validationState`
- 提供明确的 `validationMessage`
- 使用合适的颜色（绿色=成功，橙色=警告，红色=错误）

### 4. 用户体验
- 密码输入始终提供 `showPasswordToggle`
- 长文本输入提供 `showClearButton`
- 文件上传使用 `progress` 显示进度
- 合理使用 `contentBefore` 和 `contentAfter` 提示输入格式

### 5. 无障碍性
- 始终提供 `placeholder` 占位符
- 使用 `autocomplete` 帮助自动填充
- 必填项设置 `required`
- 正确使用 `type` 属性（email、tel 等）
</docs>
