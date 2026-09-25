<script lang="ts" setup>
import { ref } from 'vue';
import TLabel from '../Label';
import TInput from '../../input/Input';
import type { LabelProps } from '../Label.types';

// 状态对象
const labelState = () => ({
  disabled: false,
  required: false,
  size: 'medium' as LabelProps['size'],
  weight: 'semibold' as LabelProps['weight'],
});

const sizeOptions = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const weightOptions = {
  normal: 'normal',
  semibold: 'semibold',
  bold: 'bold',
};

// 表单演示
const emailValue = ref('');
const passwordValue = ref('');
const usernameValue = ref('');
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
        <TLabel for="username">用户名</TLabel>
        <TInput id="username" placeholder="请输入用户名" />
      </div>
    </Variant>

    <Variant title="Size Variants - 尺寸变体">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <TLabel for="small" size="small">小号标签</TLabel>
          <TInput id="small" size="small" placeholder="小号输入框" />
        </div>
        <div>
          <TLabel for="medium" size="medium">中号标签</TLabel>
          <TInput id="medium" size="medium" placeholder="中号输入框" />
        </div>
        <div>
          <TLabel for="large" size="large">大号标签</TLabel>
          <TInput id="large" size="large" placeholder="大号输入框" />
        </div>
      </div>
    </Variant>

    <Variant title="Weight Variants - 字体粗细">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <TLabel for="normal" weight="normal">普通字体</TLabel>
          <TInput id="normal" placeholder="普通字体标签" />
        </div>
        <div>
          <TLabel for="semibold" weight="semibold">半粗体</TLabel>
          <TInput id="semibold" placeholder="半粗体标签" />
        </div>
        <div>
          <TLabel for="bold" weight="bold">粗体</TLabel>
          <TInput id="bold" placeholder="粗体标签" />
        </div>
      </div>
    </Variant>

    <Variant title="Required Indicator - 必填标识">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <TLabel for="required-email" required>邮箱地址</TLabel>
          <TInput id="required-email" type="email" placeholder="请输入邮箱地址" />
        </div>
        <div>
          <TLabel for="required-password" required>密码</TLabel>
          <TInput id="required-password" type="password" placeholder="请输入密码" />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled State - 禁用状态">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <TLabel for="disabled-label" disabled>禁用标签</TLabel>
          <TInput id="disabled-label" disabled placeholder="禁用输入框" />
        </div>
      </div>
    </Variant>

    <Variant title="Custom Required Indicator - 自定义必填标识">
      <div>
        <TLabel for="custom-required" required>
          邮箱地址
          <template #requiredIndicator>
            <span style="color: red; font-weight: bold">(必填)</span>
          </template>
        </TLabel>
        <TInput id="custom-required" type="email" placeholder="请输入邮箱地址" />
      </div>
    </Variant>

    <Variant title="Login Form Example - 登录表单示例">
      <form
        @submit.prevent
        style="display: flex; flex-direction: column; gap: 16px; max-width: 400px"
      >
        <div>
          <TLabel for="form-email" required>邮箱地址</TLabel>
          <TInput id="form-email" v-model="emailValue" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <TLabel for="form-password" required>密码</TLabel>
          <TInput
            id="form-password"
            v-model="passwordValue"
            type="password"
            placeholder="请输入密码"
          />
        </div>
        <button type="submit" style="padding: 8px 16px">登录</button>
      </form>
      <div style="margin-top: 16px">
        <p>邮箱: {{ emailValue }}</p>
        <p>密码: {{ passwordValue ? '******' : '' }}</p>
      </div>
    </Variant>

    <Variant title="Registration Form Example - 注册表单示例">
      <form
        @submit.prevent
        style="display: flex; flex-direction: column; gap: 16px; max-width: 400px"
      >
        <div>
          <TLabel for="reg-username" required>用户名</TLabel>
          <TInput id="reg-username" v-model="usernameValue" placeholder="请输入用户名" />
        </div>
        <div>
          <TLabel for="reg-email" required>邮箱地址</TLabel>
          <TInput id="reg-email" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <TLabel for="reg-password" required>密码</TLabel>
          <TInput id="reg-password" type="password" placeholder="至少 8 位字符" />
        </div>
        <div>
          <TLabel for="reg-confirm-password" required>确认密码</TLabel>
          <TInput id="reg-confirm-password" type="password" placeholder="再次输入密码" />
        </div>
        <button type="submit" style="padding: 8px 16px">注册</button>
      </form>
    </Variant>

    <Variant title="All Combinations - 所有尺寸与粗细组合">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px">
        <template v-for="size in ['small', 'medium', 'large']" :key="size">
          <template v-for="weight in ['normal', 'semibold', 'bold']" :key="`${size}-${weight}`">
            <div>
              <TLabel :for="`${size}-${weight}`" :size="size" :weight="weight" required>
                {{ size }} {{ weight }}
              </TLabel>
              <TInput :id="`${size}-${weight}`" :size="size" />
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

| 属性       | 类型                               | 默认值       | 描述                            |
| ---------- | ---------------------------------- | ------------ | ------------------------------- |
| `label`    | `string`                           | `undefined`  | 标签文本（也可以使用默认 slot） |
| `for`      | `string`                           | `undefined`  | 关联表单控件的 id（htmlFor）    |
| `required` | `boolean`                          | `false`      | 是否显示必填标识                |
| `disabled` | `boolean`                          | `false`      | 是否禁用                        |
| `size`     | `'small' \| 'medium' \| 'large'`   | `'medium'`   | 标签尺寸                        |
| `weight`   | `'normal' \| 'semibold' \| 'bold'` | `'semibold'` | 字体粗细                        |
| `id`       | `string`                           | `undefined`  | Label 元素的 id                 |

### Slots

| 插槽名              | 描述                                    |
| ------------------- | --------------------------------------- |
| `default`           | 自定义标签内容（优先级高于 label prop） |
| `requiredIndicator` | 自定义必填标识                          |

## 使用示例

### 基础用法

```vue
<TLabel for="username">用户名</TLabel>
<TInput id="username" v-model="username" />
```

### 必填标识

```vue
<TLabel for="email" required>邮箱地址</TLabel>
<TInput id="email" type="email" />
```

### 尺寸变体

```vue
<TLabel for="small" size="small">小号标签</TLabel>
<TInput id="small" size="small" />

<TLabel for="medium" size="medium">中号标签</TLabel>
<TInput id="medium" size="medium" />

<TLabel for="large" size="large">大号标签</TLabel>
<TInput id="large" size="large" />
```

### 字体粗细

```vue
<TLabel for="normal" weight="normal">普通字体</TLabel>
<TInput id="normal" />

<TLabel for="semibold" weight="semibold">半粗体</TLabel>
<TInput id="semibold" />

<TLabel for="bold" weight="bold">粗体</TLabel>
<TInput id="bold" />
```

### 禁用状态

```vue
<TLabel for="disabled" disabled>禁用标签</TLabel>
<TInput id="disabled" disabled />
```

### 自定义必填标识

```vue
<TLabel for="email" required>
  邮箱地址
  <template #requiredIndicator>
    <span style="color: red;">(必填)</span>
  </template>
</TLabel>
<TInput id="email" type="email" />
```

### 登录表单

```vue
<script setup>
import { ref } from 'vue';
import { TLabel, TInput } from 'today-ui';

const email = ref('');
const password = ref('');
</script>

<template>
  <form @submit.prevent>
    <div style="margin-bottom: 16px;">
      <TLabel for="email" required>邮箱地址</TLabel>
      <TInput id="email" v-model="email" type="email" placeholder="your@email.com" />
    </div>

    <div style="margin-bottom: 16px;">
      <TLabel for="password" required>密码</TLabel>
      <TInput id="password" v-model="password" type="password" />
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
<TLabel for="username">用户名</TLabel>
<TInput id="username" />

<!-- ❌ 错误 -->
<TLabel>用户名</TLabel>
<TInput />
```

### 2. 必填字段使用 `required` 标识

对于必填字段，始终显示必填标识：

```vue
<TLabel for="email" required>邮箱地址</TLabel>
<TInput id="email" />
```

### 3. 保持标签简洁

标签应该简短明了，详细说明放在 HelperText 中：

```vue
<TLabel for="password">密码</TLabel>
<TInput id="password" />
<THelperText>密码长度至少 8 位，包含字母和数字</THelperText>
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
