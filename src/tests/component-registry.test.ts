import { describe, it, expect } from 'vitest';
import * as components from '../components';

/**
 * 组件注册的守护测试
 *
 * 背景：`app.use(TodayUI)` 遍历 `components.ts` 的导出，用组件的 `name` 字段做
 * 全局注册（见 src/index.ts 的 install）。这条链路有三个容易静默失效的点：
 *
 * 1. 组件没有声明 `name` → `if (comp.name)` 判空后**直接跳过**，不注册也不报错
 * 2. `name` 没有 `T` 前缀 → 与第三方库在全局命名空间冲突。已有实例：typster 里
 *    Today-UI 的 Button 被 PrimeVue 的 Button 覆盖，不报错、不警告，只是渲染了
 *    另一个组件
 * 3. 导出名与 `name` 不一致 → 使用者在模板里写的标签名和 import 的名字对不上
 *
 * 这三条都靠人记是不可靠的，所以断言在这里。
 */

const entries = Object.entries(components);

describe('组件注册', () => {
  it('components.ts 至少导出一个组件', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  describe('每个导出都必须有 name（否则不会被全局注册）', () => {
    entries.forEach(([exportName, component]) => {
      it(`${exportName} 声明了 name`, () => {
        expect(component).toBeTruthy();
        expect(
          (component as { name?: string }).name,
          `${exportName} 缺少 name，install() 会静默跳过它`,
        ).toBeTruthy();
      });
    });
  });

  describe('每个 name 都必须带 T 前缀', () => {
    entries.forEach(([exportName, component]) => {
      it(`${exportName} 的 name 以 T 开头`, () => {
        const { name } = component as { name?: string };
        expect(
          name?.startsWith('T'),
          `${exportName} 的 name 是 "${name}"，没有 T 前缀 —— 会与第三方库冲突`,
        ).toBe(true);
      });
    });
  });

  describe('导出名与 name 必须一致', () => {
    entries.forEach(([exportName, component]) => {
      it(`${exportName} 的 name 与导出名相同`, () => {
        const { name } = component as { name?: string };
        expect(name).toBe(exportName);
      });
    });
  });

  it('每个组件都是 Vue 组件（有 install 或 setup/render）', () => {
    entries.forEach(([exportName, component]) => {
      const c = component as Record<string, unknown>;
      const isComponent = typeof c.setup === 'function' || typeof c.render === 'function';
      expect(isComponent, `${exportName} 看起来不是 Vue 组件`).toBe(true);
    });
  });
});
