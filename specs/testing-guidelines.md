# Today-UI 组件测试规范

**项目**: Today-UI - Fluent Design Vue3 组件库
**创建日期**: 2026-02-14
**参考**: Button 组件测试用例

## 概述

Today-UI 要求**每个组件都必须编写单元测试**，确保组件功能正确、稳定可靠。本文档定义了组件测试的规范和最佳实践。

## 测试文件规范

### 文件位置

测试文件必须放在组件目录下的 `tests/` 子目录中：

```
src/<component-name>/
  ├── tests/
  │   └── <ComponentName>.test.ts  ✅ 单元测试文件
  ├── docs/
  │   ├── <ComponentName>.story.vue  ✅ Histoire 文档示例
  │   └── spec.md  ✅ 组件设计规格（可选）
  ├── <ComponentName>.tsx
  ├── <ComponentName>.types.ts
  └── ...
```

### 文件命名

- 测试文件使用 `.test.ts` 后缀（**不是** `.spec.ts`）
- 测试文件名与组件名保持一致（PascalCase）
- 示例：`Button.test.ts`、`Input.test.ts`、`Checkbox.test.ts`

## 测试工具和配置

### 技术栈

- **测试框架**: Vitest 4.x
- **测试工具**: @vue/test-utils 2.x
- **测试环境**: jsdom
- **断言库**: Vitest 内置（Chai 兼容 API）
- **配置文件**: vitest.config.js

### 运行测试的命令

```bash
# 运行所有测试
pnpm test

# 运行特定组件测试
pnpm test src/<component-name>/tests/<ComponentName>.test.ts

# 监听模式（开发时使用）
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage

# 对测试进行类型检查
pnpm typecheck
```

### 测试配置

vitest.config.js 已配置：

```js
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: { "@": "./src" },
  },
  test: {
    environment: "jsdom",
    exclude: ["node_modules", "dist", "e2e/*"],
    transformMode: { web: [/\.[jt]sx$/] },
  },
});
```

## 测试用例结构

### 基础结构

每个测试文件应按以下 `describe` 分组组织：

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ComponentName from '../ComponentName';
import type { ComponentNameProps } from '../ComponentName.types';

describe('ComponentName 组件', () => {
  // 1. Props 渲染测试
  describe('Props 渲染', () => { });

  // 2. 事件测试
  describe('事件处理', () => { });

  // 3. 插槽测试
  describe('插槽', () => { });

  // 4. 动态 Props 更新测试
  describe('动态 Props 更新', () => { });

  // 5. 废弃警告测试（如适用）
  describe('废弃警告', () => { });

  // 6. 无障碍性相关测试
  describe('无障碍性相关', () => { });

  // 7. 边界情况测试
  describe('边界情况', () => { });
});
```

## 必需的测试覆盖

### 1. Props 渲染测试

**目标**: 验证所有 props 都能正确渲染组件

```ts
describe('Props 渲染', () => {
  it('默认渲染', () => {
    const wrapper = mount(ComponentName);
    expect(wrapper.find('element').exists()).toBe(true);
  });

  // 每个 enum 类型 prop 都要测试所有选项
  describe('appearance 属性', () => {
    const appearances: Array<ComponentNameProps['appearance']> =
      ['primary', 'secondary', 'outline'];

    appearances.forEach((appearance) => {
      it(`应该渲染 appearance="${appearance}"`, () => {
        const wrapper = mount(ComponentName, {
          props: { appearance },
        });
        expect(wrapper.props('appearance')).toBe(appearance);
      });
    });
  });

  // 布尔类型 props
  describe('disabled 属性', () => {
    it('应该在禁用状态下禁用组件', () => {
      const wrapper = mount(ComponentName, {
        props: { disabled: true },
      });
      expect(wrapper.find('element').attributes('disabled')).toBeDefined();
    });
  });
});
```

### 2. 事件测试

**目标**: 验证所有事件都能正确触发

```ts
describe('事件处理', () => {
  it('应该触发 onClick 事件', async () => {
    const onClick = vi.fn();
    const wrapper = mount(ComponentName, {
      props: { onClick },
    });

    await wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('应该传递事件参数', async () => {
    const onChange = vi.fn();
    const wrapper = mount(ComponentName, {
      props: { onChange },
    });

    await wrapper.find('input').setValue('value');
    expect(onChange).toHaveBeenCalledWith(expect.any(Event));
  });
});
```

### 3. 插槽测试

**目标**: 验证所有插槽都能正确渲染

```ts
describe('插槽', () => {
  it('应该渲染默认插槽', () => {
    const wrapper = mount(ComponentName, {
      slots: { default: '内容' },
    });
    expect(wrapper.text()).toContain('内容');
  });

  it('应该渲染具名插槽', () => {
    const wrapper = mount(ComponentName, {
      slots: { icon: '🔍' },
    });
    expect(wrapper.html()).toContain('🔍');
  });
});
```

### 4. 动态 Props 更新测试

**目标**: 验证响应式更新

```ts
describe('动态 Props 更新', () => {
  it('应该响应 prop 变化', async () => {
    const wrapper = mount(ComponentName, {
      props: { appearance: 'secondary' },
    });

    await wrapper.setProps({ appearance: 'primary' });
    expect(wrapper.props('appearance')).toBe('primary');
  });
});
```

### 5. 废弃警告测试

**目标**: 验证废弃 props 会显示警告

```ts
describe('废弃警告', () => {
  it('使用废弃 prop 应该显示警告', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(ComponentName, {
      props: { deprecatedProp: 'value' },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('deprecated')
    );

    consoleSpy.mockRestore();
  });
});
```

### 6. 无障碍性相关测试

**目标**: 验证自定义属性和表单属性支持

```ts
describe('无障碍性相关', () => {
  it('应该支持传递自定义属性', () => {
    const wrapper = mount(ComponentName, {
      attrs: {
        'data-testid': 'test-id',
        'aria-label': 'label',
      },
    });

    expect(wrapper.find('element').attributes('data-testid')).toBe('test-id');
  });

  it('应该支持 name 属性（表单组件）', () => {
    const wrapper = mount(ComponentName, {
      attrs: { name: 'field-name' },
    });

    expect(wrapper.find('input').attributes('name')).toBe('field-name');
  });
});
```

### 7. 边界情况测试

**目标**: 验证极端情况

```ts
describe('边界情况', () => {
  it('应该处理空内容', () => {
    const wrapper = mount(ComponentName);
    expect(wrapper.find('element').exists()).toBe(true);
  });

  it('应该处理超长文本', () => {
    const longText = 'a'.repeat(1000);
    const wrapper = mount(ComponentName, {
      slots: { default: longText },
    });
    expect(wrapper.text()).toBe(longText);
  });

  it('应该处理 HTML 字符实体', () => {
    const wrapper = mount(ComponentName, {
      slots: { default: '<>&"' },
    });
    expect(wrapper.text()).toBe('<>&"');
  });
});
```

## 特殊场景测试

### 表单组件测试

对于 Input、Checkbox、Radio 等表单组件，还需测试：

```ts
describe('表单功能', () => {
  it('应该支持 v-model', async () => {
    const wrapper = mount({
      components: { ComponentName },
      template: `<ComponentName v-model="value" />`,
      setup() {
        const value = ref('');
        return { value };
      },
    });

    const input = wrapper.find('input');
    await input.setValue('test value');
    expect(wrapper.vm.value).toBe('test value');
  });

  it('受控模式应该正确更新', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(ComponentName, {
      props: {
        modelValue: 'initial',
        'onUpdate:modelValue': onUpdate,
      },
    });

    await wrapper.find('input').setValue('new value');
    expect(onUpdate).toHaveBeenCalledWith('new value');
  });
});
```

### Loading 状态测试

```ts
describe('loading 状态', () => {
  it('loading 状态下不应该触发交互事件', async () => {
    const onClick = vi.fn();
    const wrapper = mount(ComponentName, {
      props: { loading: true, onClick },
    });

    await wrapper.find('button').trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

### 条件渲染测试

```ts
describe('条件渲染', () => {
  it('show 为 false 时不应该渲染', () => {
    const wrapper = mount(ComponentName, {
      props: { show: false },
    });
    expect(wrapper.find('.component').exists()).toBe(false);
  });

  it('show 为 true 时应该渲染', () => {
    const wrapper = mount(ComponentName, {
      props: { show: true },
    });
    expect(wrapper.find('.component').exists()).toBe(true);
  });
});
```

## 测试最佳实践

### DO ✅

1. **使用描述性测试名称**
   ```ts
   it('应该在禁用状态下禁用按钮', () => {}); // ✅ 好
   it('disabled works', () => {}); // ❌ 差
   ```

2. **使用 vi.fn() 创建 mock 函数**
   ```ts
   const onClick = vi.fn(); // ✅ 好
   const onClick = jest.fn(); // ❌ 差（Jest 语法）
   ```

3. **使用 async/await 处理异步操作**
   ```ts
   it('应该触发事件', async () => {
     await wrapper.find('button').trigger('click');
     expect(onClick).toHaveBeenCalled();
   });
   ```

4. **测试后清理副作用**
   ```ts
   it('使用废弃 prop 应该显示警告', () => {
     const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

     // 测试代码...

     consoleSpy.mockRestore(); // ✅ 清理
   });
   ```

5. **使用类型断言保持类型安全**
   ```ts
   const appearances: Array<ComponentNameProps['appearance']> =
     ['primary', 'secondary']; // ✅ 类型安全
   ```

### DON'T ❌

1. **不要测试第三方库**
   ```ts
   // ❌ 不要测试 Vue 的响应式系统
   it('Vue 响应式工作正常', () => {});

   // ✅ 测试自己的组件功能
   it('组件应该响应 prop 变化', () => {});
   ```

2. **不要测试实现细节**
   ```ts
   // ❌ 测试内部变量
   it('内部 state.count 应该是 1', () => {});

   // ✅ 测试可观察行为
   it('应该显示计数 1', () => {
     expect(wrapper.text()).toContain('1');
   });
   ```

3. **不要忽略测试**
   ```ts
   it.skip('这个测试暂时跳过', () => {}); // ❌ 避免
   ```

4. **不要使用过于复杂的选择器**
   ```ts
   // ❌ 脆弱的 DOM 结构依赖
   expect(wrapper.find('div > span > button').exists()).toBe(true);

   // ✅ 使用测试专用属性
   expect(wrapper.find('[data-testid="submit-button"]').exists()).toBe(true);
   ```

## 测试覆盖率要求

### 最低标准

- **语句覆盖率**: ≥ 80%
- **分支覆盖率**: ≥ 75%
- **函数覆盖率**: ≥ 80%
- **行覆盖率**: ≥ 80%

### 查看覆盖率

```bash
pnpm test:coverage
```

生成的报告在 `coverage/` 目录中。

## 参考示例

### 完整的测试文件示例

参考 [src/button/tests/Button.test.ts](../src/button/tests/Button.test.ts)，包含：
- 39 个测试用例
- 覆盖所有 props 和事件
- 包含边界情况测试
- 包含废弃警告测试

### 组件测试清单

在提交组件 PR 前，确认以下项目都已完成：

- [ ] 测试文件位于 `src/<component>/tests/` 目录
- [ ] 文件名使用 `.test.ts` 后缀
- [ ] 所有 props 都有渲染测试
- [ ] 所有事件都有触发测试
- [ ] 所有插槽都有渲染测试
- [ ] 有动态 props 更新测试
- [ ] 有边界情况测试
- [ ] 测试能通过（`pnpm test`）
- [ ] 覆盖率达到 80% 以上

## 常见问题

### Q: 为什么用 `.test.ts` 而不是 `.spec.ts`？

A: 项目规范统一使用 `.test.ts` 后缀，便于识别和维护。

### Q: 为什么测试文件放在组件目录下而不是根目录的 `tests/`？

A: 测试文件靠近组件代码，便于维护和理解组件功能。

### Q: 需要测试样式吗？

A: 不需要。样式由 Griffel 和 Fluent Design 规范保证，单元测试聚焦于功能和交互。

### Q: 需要测试无障碍性吗？

A: 不需要。根据项目规范，无障碍性功能不在组件库层面实现。

### Q: mock 函数用什么？

A: 使用 Vitest 的 `vi.fn()`，不要使用 Jest 的 `jest.fn()`。

## 进阶话题

### 快照测试

对于 UI 组件，可选择性使用快照测试：

```ts
it('应该匹配快照', () => {
  const wrapper = mount(ComponentName, {
    props: { appearance: 'primary' },
    slots: { default: 'Button' },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
```

**注意**: 快照测试应谨慎使用，避免过度依赖。

### 组件集成测试

对于复杂组件，可创建集成测试：

```ts
describe('Form 集成测试', () => {
  it('应该提交表单', async () => {
    const wrapper = mount({
      components: { Form, Input, Button },
      template: `
        <Form @submit="handleSubmit">
          <Input v-model="value" />
          <Button type="submit">提交</Button>
        </Form>
      `,
      setup() {
        const handleSubmit = vi.fn();
        return { handleSubmit };
      },
    });

    await wrapper.find('input').setValue('test');
    await wrapper.find('button').trigger('submit');
    expect(handleSubmit).toHaveBeenCalledWith({ value: 'test' });
  });
});
```

---

**更新历史**:
- 2026-02-14: 初始版本，基于 Button 组件测试实践
