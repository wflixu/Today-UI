<script lang="ts" setup>
import { ref, computed } from 'vue'
import Input from '../../input/Input'
import Field from '../Field'
import Label from '../../label/Label'
import HelperText from '../HelperText'
import type { FieldProps } from '../Field.types'

// 表单演示数据
const emailValue = ref('')
const passwordValue = ref('')
const usernameValue = ref('')
const bioValue = ref('')

// 验证状态计算
const emailState = computed(() => {
  if (!emailValue.value) return 'none'
  if (emailValue.value.includes('@')) return 'valid'
  return 'invalid'
})

const emailMessage = computed(() => {
  if (emailState.value === 'valid') return '邮箱格式正确'
  if (emailState.value === 'invalid') return '请输入有效的邮箱地址'
  return ''
})

const passwordState = computed(() => {
  if (!passwordValue.value) return 'none'
  if (passwordValue.value.length >= 8) return 'valid'
  return 'invalid'
})

const passwordMessage = computed(() => {
  if (passwordState.value === 'valid') return '密码强度足够'
  if (passwordState.value === 'invalid') return '密码至少需要 8 位字符'
  return ''
})

// 状态对象
const fieldState = () => ({
  orientation: 'vertical' as FieldProps['orientation'],
  validationState: 'none' as FieldProps['validationState'],
})

const orientationOptions = {
  'vertical': 'vertical',
  'horizontal': 'horizontal'
}

const validationStateOptions = {
  'none': 'none',
  'valid': 'valid',
  'warning': 'warning',
  'invalid': 'invalid'
}
</script>

<template>
  <Story title="Components/Field" :initState="() => fieldState">
    <template #controls="{ state }">
      <HstSelect v-model="state.orientation" title="orientation" :options="orientationOptions" />
      <HstSelect v-model="state.validationState" title="validationState" :options="validationStateOptions" />
    </template>

    <Variant title="基础用法（使用独立组件）">
      <div style="max-width: 400px;">
        <Field>
          <template #label>
            <Label for="username" required>用户名</Label>
          </template>
          <Input id="username" v-model="usernameValue" placeholder="请输入用户名" />
        </Field>
        <p style="margin-top: 16px;">当前值: {{ usernameValue }}</p>
      </div>
    </Variant>

    <Variant title="带辅助文字">
      <div style="max-width: 400px;">
        <Field>
          <template #label>
            <Label for="password" required>密码</Label>
          </template>
          <Input id="password" v-model="passwordValue" type="password" placeholder="请输入密码" />
          <template #helperText>
            <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
          </template>
        </Field>
        <p style="margin-top: 16px;">当前值: {{ passwordValue ? '******' : '' }}</p>
      </div>
    </Variant>

    <Variant title="带验证消息">
      <div style="max-width: 400px;">
        <Field
          :validation-state="emailState"
          :validation-message="emailMessage"
        >
          <template #label>
            <Label for="email" required>邮箱地址</Label>
          </template>
          <Input id="email" v-model="emailValue" type="email" placeholder="your@email.com" />
        </Field>
        <p style="margin-top: 16px;">当前值: {{ emailValue }}</p>
      </div>
    </Variant>

    <Variant title="水平布局">
      <div style="max-width: 500px;">
        <Field orientation="horizontal">
          <template #label>
            <Label for="username-horizontal">用户名</Label>
          </template>
          <Input id="username-horizontal" placeholder="请输入用户名" />
        </Field>
      </div>
    </Variant>

    <Variant title="完整表单字段（Label + HelperText + Validation）">
      <div style="max-width: 400px;">
        <Field
          :validation-state="passwordState"
          :validation-message="passwordMessage"
        >
          <template #label>
            <Label for="full-password" required>密码</Label>
          </template>
          <Input id="full-password" v-model="passwordValue" type="password" placeholder="请输入密码" />
          <template #helperText>
            <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
          </template>
        </Field>
        <p style="margin-top: 16px;">密码强度: {{ passwordState }}</p>
      </div>
    </Variant>

    <Variant title="简单场景（不使用 Field）">
      <div style="max-width: 400px;">
        <Label for="simple-username">用户名</Label>
        <Input id="simple-username" placeholder="请输入用户名" />
        <HelperText>请输入您的用户名</HelperText>
      </div>
    </Variant>

    <Variant title="登录表单示例">
      <form @submit.prevent style="max-width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <Field
            :validation-state="emailState"
            :validation-message="emailMessage"
          >
            <template #label>
              <Label for="login-email" required>邮箱地址</Label>
            </template>
            <Input id="login-email" v-model="emailValue" type="email" placeholder="your@email.com" />
          </Field>

          <Field
            :validation-state="passwordState"
            :validation-message="passwordMessage"
          >
            <template #label>
              <Label for="login-password" required>密码</Label>
            </template>
            <Input id="login-password" v-model="passwordValue" type="password" placeholder="请输入密码" />
            <template #helperText>
              <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
            </template>
          </Field>

          <button type="submit" style="padding: 8px 16px;">登录</button>
        </div>
      </form>
    </Variant>

    <Variant title="注册表单示例">
      <form @submit.prevent style="max-width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <Field>
            <template #label>
              <Label for="reg-username" required>用户名</Label>
            </template>
            <Input id="reg-username" v-model="usernameValue" placeholder="请输入用户名" />
          </Field>

          <Field :validation-state="emailState" :validation-message="emailMessage">
            <template #label>
              <Label for="reg-email" required>邮箱地址</Label>
            </template>
            <Input id="reg-email" v-model="emailValue" type="email" placeholder="your@email.com" />
            <template #helperText>
              <HelperText>请输入您的工作邮箱地址</HelperText>
            </template>
          </Field>

          <Field :validation-state="passwordState" :validation-message="passwordMessage">
            <template #label>
              <Label for="reg-password" required>密码</Label>
            </template>
            <Input id="reg-password" v-model="passwordValue" type="password" placeholder="至少 8 位字符" />
            <template #helperText>
              <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
            </template>
          </Field>

          <button type="submit" style="padding: 8px 16px;">注册</button>
        </div>
      </form>
    </Variant>

    <Variant title="个人资料表单（水平布局）">
      <form @submit.prevent style="max-width: 600px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <Field orientation="horizontal">
            <template #label>
              <Label for="profile-username">用户名</Label>
            </template>
            <Input id="profile-username" v-model="usernameValue" placeholder="请输入用户名" />
          </Field>

          <Field orientation="horizontal">
            <template #label>
              <Label for="profile-email" required>邮箱地址</Label>
            </template>
            <Input id="profile-email" v-model="emailValue" type="email" placeholder="your@email.com" />
          </Field>

          <Field orientation="horizontal">
            <template #label>
              <Label for="profile-bio">个人简介</Label>
            </template>
            <Input id="profile-bio" v-model="bioValue" placeholder="简单介绍一下自己" />
          </Field>

          <button type="submit" style="padding: 8px 16px;">保存</button>
        </div>
      </form>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Field 组件

Field 组件是一个布局容器，用于组合 Label、Input、HelperText 和 ValidationMessage，提供统一的表单字段布局。

## 特性

- ✅ 完全独立 - 不内置 Label 或 HelperText
- ✅ 支持垂直和水平两种布局方向
- ✅ 支持验证状态（valid、warning、invalid）
- ✅ 灵活的 slot 系统，用户完全控制组件组合
- ✅ 完全遵循 Fluent Design 视觉规范

## 重要变更

Field 组件已经重新设计为**完全独立的布局容器**：

- ❌ 移除了 `label`、`required`、`helperText` props
- ✅ 用户需要手动组合 Label 和 HelperText 组件
- ✅ 组件职责更清晰，更灵活

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `validationMessage` | `string` | `undefined` | 验证消息 |
| `validationState` | `'none' \| 'valid' \| 'warning' \| 'invalid'` | `'none'` | 验证状态 |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 布局方向 |

### Slots

| 插槽名 | 描述 |
|--------|------|
| `default` | 表单控件（Input 等） |
| `label` | Label 组件（用户手动放置） |
| `helperText` | HelperText 组件（用户手动放置） |
| `validationMessage` | 自定义验证消息 |

## 使用示例

### 基础用法

```vue
<Field>
  <template #label>
    <Label for="username" required>用户名</Label>
  </template>
  <Input id="username" v-model="username" />
</Field>
```

### 带辅助文字

```vue
<Field>
  <template #label>
    <Label for="password" required>密码</Label>
  </template>
  <Input id="password" v-model="password" type="password" />
  <template #helperText>
    <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
  </template>
</Field>
```

### 带验证消息

```vue
<Field
  :validation-state="emailState"
  :validation-message="emailMessage"
>
  <template #label>
    <Label for="email" required>邮箱地址</Label>
  </template>
  <Input id="email" v-model="email" type="email" />
</Field>
```

### 完整表单字段

```vue
<Field
  :validation-state="passwordState"
  :validation-message="passwordMessage"
>
  <template #label>
    <Label for="password" required>密码</Label>
  </template>
  <Input id="password" v-model="password" type="password" />
  <template #helperText>
    <HelperText>密码长度至少 8 位，包含字母和数字</HelperText>
  </template>
</Field>
```

### 水平布局

```vue
<Field orientation="horizontal">
  <template #label>
    <Label for="username">用户名</Label>
  </template>
  <Input id="username" />
</Field>
```

### 简单场景（不使用 Field）

```vue
<Label for="username">用户名</Label>
<Input id="username" />
<HelperText>请输入您的用户名</HelperText>
```

### 登录表单

```vue
<script setup>
import { ref, computed } from 'vue'
import Field from 'today-ui/field'
import Label from 'today-ui/label'
import Input from 'today-ui/input/Input'
import HelperText from 'today-ui/label/HelperText'

const email = ref('')
const password = ref('')

const emailState = computed(() => {
  if (!email.value) return 'none'
  return email.value.includes('@') ? 'valid' : 'invalid'
})

const emailMessage = computed(() => {
  if (emailState.value === 'valid') return '邮箱格式正确'
  return '请输入有效的邮箱地址'
})
</script>

<template>
  <form @submit.prevent>
    <Field :validation-state="emailState" :validation-message="emailMessage">
      <template #label>
        <Label for="email" required>邮箱</Label>
      </template>
      <Input id="email" v-model="email" type="email" />
    </Field>

    <Field>
      <template #label>
        <Label for="password" required>密码</Label>
      </template>
      <Input id="password" v-model="password" type="password" />
      <template #helperText>
        <HelperText>密码长度至少 8 位</HelperText>
      </template>
    </Field>

    <button type="submit">登录</button>
  </form>
</template>
```

## 迁移指南

如果你之前使用了快速模式：

```vue
<!-- 旧版本（不再支持） -->
<Field label="用户名" required>
  <Input v-model="username" />
</Field>
```

请改为：

```vue
<!-- 新版本（独立组件） -->
<Field>
  <template #label>
    <Label for="username" required>用户名</Label>
  </template>
  <Input id="username" v-model="username" />
</Field>
```

## 设计原则

### 1. 组件独立性

Label 和 Field 是完全独立的组件：
- Label 可以单独使用
- Field 只负责布局和验证
- 用户完全控制如何组合组件

### 2. 职责分离

- **Label**: 负责标签和必填标识
- **Input**: 负责输入功能
- **HelperText**: 负责辅助说明
- **Field**: 负责布局和验证消息显示

### 3. 灵活性

用户可以根据需要选择：
- 简单场景：只使用 Label + Input
- 复杂场景：使用 Field + Label + HelperText
- 自定义场景：自由组合组件

## 无障碍性

Field 组件通过以下方式支持无障碍性：

- 验证消息使用 `role="status"` 和 `aria-live="polite"`
- 支持键盘导航和屏幕阅读器
- Label 的 `for` 属性正确关联 Input 的 `id`

## 验证状态

Field 支持四种验证状态：

| 状态 | 颜色 | 图标 | 使用场景 |
|------|------|------|----------|
| `none` | 默认 | 无 | 无验证状态（默认） |
| `valid` | 绿色 | ✓ | 验证通过 |
| `warning` | 橙色 | ⚠ | 警告信息 |
| `invalid` | 红色 | ✕ | 验证失败 |


</docs>

