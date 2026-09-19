<script lang="ts" setup>
import { ref } from 'vue';
import TPopover from '../Popover';
import TButton from '../../button/Button';

const popoverState = () => ({
  trigger: 'click' as 'click' | 'hover' | 'focus' | 'contextmenu',
  placement: 'bottom-start' as const,
  withArrow: false,
  offset: 8,
  openDelay: 0,
  closeDelay: 0,
  matchTriggerWidth: false,
});

const placementOptions = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'right',
];

const themeOptions = ['light', 'dark', 'teams-light', 'teams-dark'];

const formState = ref({ name: '', theme: 'light' });
const controlledVisible = ref(false);
</script>

<template>
  <Story title="Components/Popover" :initState="() => popoverState">
    <template #controls="{ state }">
      <HstSelect
        v-model="state.trigger"
        title="trigger"
        :options="['click', 'hover', 'focus', 'contextmenu']"
      />
      <HstSelect v-model="state.placement" title="placement" :options="placementOptions" />
      <HstCheckbox v-model="state.withArrow" title="withArrow" />
      <HstNumber v-model="state.offset" title="offset" />
      <HstNumber v-model="state.openDelay" title="openDelay" />
      <HstNumber v-model="state.closeDelay" title="closeDelay" />
      <HstCheckbox v-model="state.matchTriggerWidth" title="matchTriggerWidth" />
    </template>

    <Variant title="基础用法">
      <TPopover
        :trigger="state.trigger"
        :placement="state.placement"
        :with-arrow="state.withArrow"
        :offset="state.offset"
        :open-delay="state.openDelay"
        :close-delay="state.closeDelay"
        :match-trigger-width="state.matchTriggerWidth"
      >
        <TButton>点我</TButton>
        <template #content>
          <div style="padding: 4px 8px">这是一段浮层内容</div>
        </template>
      </TPopover>
    </Variant>

    <Variant title="带箭头">
      <TPopover placement="top" :offset="10" with-arrow>
        <TButton appearance="outline">上方带箭头</TButton>
        <template #content="{ arrowStyles }">
          <div style="padding: 4px 8px">箭头由 arrowStyles 定位</div>
          <div class="t-popover__arrow" :style="arrowStyles" data-placement="top" />
        </template>
      </TPopover>
    </Variant>

    <Variant title="悬停触发（含延迟）">
      <TPopover trigger="hover" :open-delay="200" :close-delay="150" placement="top">
        <TButton appearance="subtle">悬停 200ms 后显示</TButton>
        <template #content>
          <div style="padding: 4px 8px">鼠标移入浮层不会关闭，因为设置了 closeDelay</div>
        </template>
      </TPopover>
    </Variant>

    <Variant title="表单场景 —— 宽度对齐触发元素">
      <TPopover
        trigger="click"
        placement="bottom-start"
        :offset="4"
        match-trigger-width
        :default-visible="true"
      >
        <div
          style="
            width: 240px;
            padding: 6px 10px;
            border: 1px solid var(--colorNeutralStroke1);
            border-radius: 4px;
            font-size: 13px;
          "
        >
          选择主题：{{ formState.theme }}
        </div>
        <template #content>
          <div style="display: flex; flex-direction: column">
            <button
              v-for="t in themeOptions"
              :key="t"
              style="
                padding: 6px 10px;
                text-align: left;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 13px;
              "
              @click="formState.theme = t"
            >
              {{ t }}
            </button>
          </div>
        </template>
      </TPopover>
    </Variant>

    <Variant title="受控模式">
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
        <div style="font-size: 13px">
          外部状态：<code>{{ controlledVisible }}</code>
        </div>
        <div style="display: flex; gap: 8px">
          <TButton @click="controlledVisible = !controlledVisible">切换</TButton>
          <TButton appearance="outline" @click="controlledVisible = false">强制关闭</TButton>
        </div>
        <TPopover
          :visible="controlledVisible"
          :offset="6"
          @update:visible="(v: boolean) => (controlledVisible = v)"
        >
          <TButton appearance="primary">受控的浮层</TButton>
          <template #content>
            <div style="padding: 4px 8px">点击外部或按 Escape 也会同步回外部状态</div>
          </template>
        </TPopover>
      </div>
    </Variant>

    <Variant title="右键触发">
      <TPopover trigger="contextmenu" placement="bottom-start" :offset="4">
        <div
          style="
            padding: 24px;
            border: 1px dashed var(--colorNeutralStroke1);
            border-radius: 4px;
            font-size: 13px;
          "
        >
          在此区域点击右键
        </div>
        <template #content>
          <div style="display: flex; flex-direction: column; min-width: 140px">
            <div style="padding: 6px 10px; font-size: 13px">重命名</div>
            <div style="padding: 6px 10px; font-size: 13px">删除</div>
          </div>
        </template>
      </TPopover>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Popover

定位 + 触发 + 开合的底层原语，内部组合 Portal。是 Dropdown、Tooltip、Menu
以及后续 Select / Combobox 的共同基础。

## 特性

- 定位交给 `@floating-ui/vue`（与上游 Fluent 同源），**包含 `autoUpdate`** —— 滚动、resize 时位置自动重算
- 定位样式统一取库产出的 `floatingStyles`，不手写 `position`，避免策略与渲染方式不一致
- 五种触发方式：`click` / `hover` / `focus` / `contextmenu` / `manual`
- 支持延迟显示与隐藏，悬停时鼠标可安全移入浮层
- 点击外部、按 Escape 关闭（均可关闭）
- 受控（`visible`）与非受控（`defaultVisible`）双模式
- 浮层内容 Teleport 到指定容器，默认 `body`

## API

### Props

| 属性                  | 类型                                                         | 默认值           | 描述                                    |
| --------------------- | ------------------------------------------------------------ | ---------------- | --------------------------------------- |
| `visible`             | `boolean`                                                    | `undefined`      | 受控开合状态。传入即为受控模式          |
| `defaultVisible`      | `boolean`                                                    | `false`          | 非受控模式的初始状态                    |
| `placement`           | `Placement`                                                  | `'bottom-start'` | 浮层相对触发元素的位置                  |
| `strategy`            | `'absolute' \| 'fixed'`                                      | `'absolute'`     | 定位策略                                |
| `offset`              | `number`                                                     | `0`              | 与触发元素的间距（px）                  |
| `withArrow`           | `boolean`                                                    | `false`          | 是否渲染箭头                            |
| `matchTriggerWidth`   | `boolean`                                                    | `false`          | 浮层宽度是否与触发元素一致              |
| `trigger`             | `'click' \| 'hover' \| 'focus' \| 'contextmenu' \| 'manual'` | `'click'`        | 触发方式                                |
| `openDelay`           | `number`                                                     | `0`              | 显示延迟（ms）                          |
| `closeDelay`          | `number`                                                     | `0`              | 隐藏延迟（ms）                          |
| `closeOnClickOutside` | `boolean`                                                    | `true`           | 点击外部是否关闭                        |
| `closeOnEscape`       | `boolean`                                                    | `true`           | 按 Escape 是否关闭                      |
| `attach`              | `string \| HTMLElement \| (() => HTMLElement)`               | `'body'`         | 浮层挂载目标                            |
| `disabled`            | `boolean`                                                    | `false`          | 为 true 时浮层原地渲染，不使用 Teleport |
| `lockScroll`          | `boolean`                                                    | `false`          | 浮层显示期间锁定 body 滚动              |

### Events

| 事件             | 参数                 | 描述               |
| ---------------- | -------------------- | ------------------ |
| `update:visible` | `(visible: boolean)` | 开合状态变化       |
| `visibleChange`  | `(visible: boolean)` | 同上，语义化的别名 |

### Slots

| 插槽名    | 作用域参数                  | 描述                                                              |
| --------- | --------------------------- | ----------------------------------------------------------------- |
| `default` | —                           | 触发元素。**必须是单个元素** —— Popover 会克隆它以绑定 ref 与事件 |
| `content` | `{ arrowRef, arrowStyles }` | 浮层内容                                                          |

### Exposed

`update()` 手动重算位置、`triggerRef` / `floatingRef` / `arrowRef`、
`setOpen(visible)` / `toggle()`。

## 使用示例

### 基础用法

```vue
<TPopover placement="bottom-start" :offset="4">
  <TButton>点我</TButton>
  <template #content>
    浮层内容
  </template>
</TPopover>
```

### 受控模式

```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>

<template>
  <TPopover :visible="visible" @update:visible="(v) => (visible = v)">
    <TButton>打开</TButton>
    <template #content>内容</template>
  </TPopover>
</template>
```

### 自定义箭头

```vue
<TPopover with-arrow placement="top" :offset="10">
  <TButton>悬停查看</TButton>
  <template #content="{ arrowStyles }">
    带箭头的浮层
    <div class="t-popover__arrow" :style="arrowStyles" />
  </template>
</TPopover>
```
</docs>
