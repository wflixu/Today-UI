<script lang="ts" setup>
import { ref } from 'vue'
import Label from '../Label'
import Input from '../../input/Input'
import type { LabelProps } from '../Label.types'

// 状态对象
const labelState = () => ({
  disabled: false,
  required: false,
  size: 'medium' as LabelProps['size'],
  weight: 'semibold' as LabelProps['weight'],
})

const sizeOptions = {
  'small': 'small',
  'medium': 'medium',
  'large': 'large'
}

const weightOptions = {
  'normal': 'normal',
  'semibold': 'semibold',
  'bold': 'bold'
}

// 表单演示
const emailValue = ref('')
const passwordValue = ref('')
const usernameValue = ref('')
</script>

<template>
  <Story title="Components/Label" :initState="() => labelState">
    <template #controls="{ state }">
      <HstSelect v-model="state.size" title="size" :options="sizeOptions" />
      <HstSelect v-model="state.weight" title="weight" :options="weightOptions" />
      <HstCheckbox v-model="state.disabled" title="disabled" />
      <HstCheckbox v-model="state.required" title="required" />
    </template>

    <Variant title="Basic Usage - 基础用法">
      <div>
        <Label for="username">用户名</Label>
        <Input id="username" placeholder="请输入用户名" />
      </div>
    </Variant>

    <Variant title="Size Variants - 尺寸变体">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <Label for="small" size="small">小号标签</Label>
          <Input id="small" size="small" placeholder="小号输入框" />
        </div>
        <div>
          <Label for="medium" size="medium">中号标签</Label>
          <Input id="medium" size="medium" placeholder="中号输入框" />
        </div>
        <div>
          <Label for="large" size="large">大号标签</Label>
          <Input id="large" size="large" placeholder="大号输入框" />
        </div>
      </div>
    </Variant>

    <Variant title="Weight Variants - 字体粗细">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <Label for="normal" weight="normal">普通字体</Label>
          <Input id="normal" placeholder="普通字体标签" />
        </div>
        <div>
          <Label for="semibold" weight="semibold">半粗体</Label>
          <Input id="semibold" placeholder="半粗体标签" />
        </div>
        <div>
          <Label for="bold" weight="bold">粗体</Label>
          <Input id="bold" placeholder="粗体标签" />
        </div>
      </div>
    </Variant>

    <Variant title="Required Indicator - 必填标识">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <Label for="required-email" required>邮箱地址</Label>
          <Input id="required-email" type="email" placeholder="请输入邮箱地址" />
        </div>
        <div>
          <Label for="required-password" required>密码</Label>
          <Input id="required-password" type="password" placeholder="请输入密码" />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled State - 禁用状态">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <Label for="disabled-label" disabled>禁用标签</Label>
          <Input id="disabled-label" disabled placeholder="禁用输入框" />
        </div>
      </div>
    </Variant>

    <Variant title="Custom Required Indicator - 自定义必填标识">
      <div>
        <Label for="custom-required" required>
          邮箱地址
          <template #requiredIndicator>
            <span style="color: red; font-weight: bold;">(必填)</span>
          </template>
        </Label>
        <Input id="custom-required" type="email" placeholder="请输入邮箱地址" />
      </div>
    </Variant>

    <Variant title="Login Form Example - 登录表单示例">
      <form @submit.prevent style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <Label for="form-email" required>邮箱地址</Label>
          <Input id="form-email" v-model="emailValue" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <Label for="form-password" required>密码</Label>
          <Input id="form-password" v-model="passwordValue" type="password" placeholder="请输入密码" />
        </div>
        <button type="submit" style="padding: 8px 16px;">登录</button>
      </form>
      <div style="margin-top: 16px;">
        <p>邮箱: {{ emailValue }}</p>
        <p>密码: {{ passwordValue ? '******' : '' }}</p>
      </div>
    </Variant>

    <Variant title="Registration Form Example - 注册表单示例">
      <form @submit.prevent style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <Label for="reg-username" required>用户名</Label>
          <Input id="reg-username" v-model="usernameValue" placeholder="请输入用户名" />
        </div>
        <div>
          <Label for="reg-email" required>邮箱地址</Label>
          <Input id="reg-email" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <Label for="reg-password" required>密码</Label>
          <Input id="reg-password" type="password" placeholder="至少 8 位字符" />
        </div>
        <div>
          <Label for="reg-confirm-password" required>确认密码</Label>
          <Input id="reg-confirm-password" type="password" placeholder="再次输入密码" />
        </div>
        <button type="submit" style="padding: 8px 16px;">注册</button>
      </form>
    </Variant>

    <Variant title="All Combinations - 所有尺寸与粗细组合">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
        <template v-for="size in ['small', 'medium', 'large']" :key="size">
          <template v-for="weight in ['normal', 'semibold', 'bold']" :key="`${size}-${weight}`">
            <div>
              <Label
                :for="`${size}-${weight}`"
                :size="size"
                :weight="weight"
                required
              >
                {{ size }} {{ weight }}
              </Label>
              <Input :id="`${size}-${weight}`" :size="size" />
            </div>
          </template>
        </template>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Label 组件

Label 组件为表单控件提供描述性标签，支持多种样式变体和状态。

## 特性

- ✅ 支持多种尺寸（small、medium、large）
- ✅ 支持多种字体粗细（normal、semibold、bold）
- ✅ 支持必填标识（红色星号）
- ✅ 支持禁用状态
- ✅ 通过 `for` 属性关联表单控件
- ✅ 支持自定义必填标识插槽
- ✅ 完全遵循 Fluent Design 视觉规范

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `label` | `string` | `undefined` | 标签文本（也可以使用默认 slot） |
| `for` | `string` | `undefined` | 关联表单控件的 id（htmlFor） |
| `required` | `boolean` | `false` | 是否显示必填标识 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 标签尺寸 |
| `weight` | `'normal' \| 'semibold' \| 'bold'` | `'semibold'` | 字体粗细 |
| `id` | `string` | `undefined` | Label 元素的 id |

### Slots

| 插槽名 | 描述 |
|--------|------|
| `default` | 自定义标签内容（优先级高于 label prop） |
| `requiredIndicator` | 自定义必填标识 |

## 使用示例

### 基础用法

```vue
<Label for="username">用户名</Label>
<Input id="username" v-model="username" />
```

### 必填标识

```vue
<Label for="email" required>邮箱地址</Label>
<Input id="email" type="email" />
```

### 尺寸变体

```vue
<Label for="small" size="small">小号标签</Label>
<Input id="small" size="small" />

<Label for="medium" size="medium">中号标签</Label>
<Input id="medium" size="medium" />

<Label for="large" size="large">大号标签</Label>
<Input id="large" size="large" />
```

### 字体粗细

```vue
<Label for="normal" weight="normal">普通字体</Label>
<Input id="normal" />

<Label for="semibold" weight="semibold">半粗体</Label>
<Input id="semibold" />

<Label for="bold" weight="bold">粗体</Label>
<Input id="bold" />
```

### 禁用状态

```vue
<Label for="disabled" disabled>禁用标签</Label>
<Input id="disabled" disabled />
```

### 自定义必填标识

```vue
<Label for="email" required>
  邮箱地址
  <template #requiredIndicator>
    <span style="color: red;">(必填)</span>
  </template>
</Label>
<Input id="email" type="email" />
```

### 登录表单

```vue
<script setup>
import { ref } from 'vue'
import Label from 'today-ui/label'
import Input from 'today-ui/input'

const email = ref('')
const password = ref('')
</script>

<template>
  <form @submit.prevent>
    <div style="margin-bottom: 16px;">
      <Label for="email" required>邮箱地址</Label>
      <Input id="email" v-model="email" type="email" placeholder="your@email.com" />
    </div>

    <div style="margin-bottom: 16px;">
      <Label for="password" required>密码</Label>
      <Input id="password" v-model="password" type="password" />
    </div>

    <button type="submit">登录</button>
  </form>
</template>
```

## 最佳实践

### 1. 始终使用 `for` 属性

确保 Label 的 `for` 属性与表单控件的 `id` 匹配：

```vue
<!-- ✅ 正确 -->
<Label for="username">用户名</Label>
<Input id="username" />

<!-- ❌ 错误 -->
<Label>用户名</Label>
<Input />
```

### 2. 必填字段使用 `required` 标识

对于必填字段，始终显示必填标识：

```vue
<Label for="email" required>邮箱地址</Label>
<Input id="email" />
```

### 3. 保持标签简洁

标签应该简短明了，详细说明放在 HelperText 中：

```vue
<Label for="password">密码</Label>
<Input id="password" />
<HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
```

### 4. 使用适当的尺寸

- **small** - 密集布局、表格操作
- **medium** - 默认尺寸，表单和对话框
- **large** - 主要操作、移动端友好

## 无障碍性

Label 组件通过以下方式支持无障碍性：

- 使用 `<label>` 元素，与表单控件自动关联
- `for` 属性关联对应的表单控件 `id`
- 必填标识使用 `aria-hidden="true"` 隐藏，避免屏幕阅读器重复朗读
- 禁用状态通过视觉和属性明确传达
</docs>
