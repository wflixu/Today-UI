import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import TTooltip from '../Tooltip';

/**
 * 浮层本身的测试。
 *
 * 既有的 Tooltip.test.ts 里，「Props 渲染」一组的绝大多数用例只断言
 * `.t-tooltip-trigger` 存在 —— 不论传什么 prop 都是同一个断言。浮层被
 * Teleport 到 body 之后没有任何用例去查它，因此 maxWidth / wrapText /
 * relationship / 箭头这些**实际影响浮层外观的 prop 零覆盖**。
 *
 * 这个文件补上那部分。所有查询都通过 document 进行，因为浮层不在组件自身的
 * DOM 树内。
 */

const mountOpenTooltip = (
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
) =>
  mount(TTooltip, {
    props: { content: 'Tooltip 内容', defaultVisible: true, ...props },
    slots: { default: () => h('button', { class: 'trigger' }, '触发'), ...slots },
    attachTo: document.body,
  });

const floating = () => document.body.querySelector('.t-popover__content');

describe('Tooltip 浮层', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('渲染与挂载', () => {
    it('默认关闭时不渲染浮层', () => {
      mount(TTooltip, {
        props: { content: '内容' },
        slots: { default: () => h('button', '触发') },
        attachTo: document.body,
      });

      expect(floating()).toBeNull();
    });

    it('展开后浮层挂载到 body', async () => {
      const wrapper = mountOpenTooltip();
      await nextTick();

      expect(floating()).not.toBeNull();
      // 不在组件自身 DOM 树内
      expect(wrapper.find('.t-popover__content').exists()).toBe(false);

      wrapper.unmount();
    });

    it('浮层同时带 popover 基类与 tooltip 类名', async () => {
      const wrapper = mountOpenTooltip();
      await nextTick();

      expect(floating()?.classList.contains('t-popover__content')).toBe(true);
      expect(floating()?.classList.contains('t-tooltip')).toBe(true);

      wrapper.unmount();
    });

    it('触发元素带 t-tooltip-trigger 包装器', () => {
      const wrapper = mountOpenTooltip();
      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('内容', () => {
    it('content prop 渲染到浮层中', async () => {
      const wrapper = mountOpenTooltip({ content: '来自 prop 的内容' });
      await nextTick();

      expect(document.body.querySelector('.t-tooltip__content')?.textContent).toContain(
        '来自 prop 的内容',
      );
      wrapper.unmount();
    });

    it('content 插槽优先于 content prop', async () => {
      const wrapper = mountOpenTooltip(
        { content: '来自 prop' },
        { content: () => h('span', { class: 'slot-content' }, '来自插槽') },
      );
      await nextTick();

      expect(document.body.querySelector('.slot-content')?.textContent).toBe('来自插槽');
      expect(document.body.textContent).not.toContain('来自 prop');

      wrapper.unmount();
    });
  });

  // 迁移前 maxWidth 与 wrapText 只被透传到 state，渲染层从未读取，两个 prop 完全失效。
  describe('maxWidth（迁移前完全失效）', () => {
    it.each([
      [300, '300px'],
      [200, '200px'],
      [480, '480px'],
    ])('maxWidth=%s 应下发为 %s', async (maxWidth, expected) => {
      const wrapper = mountOpenTooltip({ maxWidth });
      await nextTick();

      const style = document.querySelector('.t-tooltip__content')?.getAttribute('style') ?? '';
      expect(style).toContain(`max-width: ${expected}`);

      wrapper.unmount();
    });

    it('默认值为 200px', async () => {
      const wrapper = mountOpenTooltip();
      await nextTick();

      const style = document.querySelector('.t-tooltip__content')?.getAttribute('style') ?? '';
      expect(style).toContain('max-width: 200px');

      wrapper.unmount();
    });
  });

  describe('wrapText（迁移前完全失效）', () => {
    it('wrapText=true 时 white-space 为 normal', async () => {
      const wrapper = mountOpenTooltip({ wrapText: true });
      await nextTick();

      const style = document.querySelector('.t-tooltip__content')?.getAttribute('style') ?? '';
      expect(style).toContain('white-space: normal');

      wrapper.unmount();
    });

    it('wrapText=false 时 white-space 为 nowrap', async () => {
      const wrapper = mountOpenTooltip({ wrapText: false });
      await nextTick();

      const style = document.querySelector('.t-tooltip__content')?.getAttribute('style') ?? '';
      expect(style).toContain('white-space: nowrap');

      wrapper.unmount();
    });
  });

  describe('relationship 变体', () => {
    // description 是默认值，不产生额外类名 —— 三种取值对两个变体类名的期望都列出来，
    // 避免写成条件断言（vitest/no-conditional-expect 会拒绝）
    it.each<[string, string, boolean]>([
      ['description', 't-tooltip--label', false],
      ['description', 't-tooltip--inaccessible', false],
      ['label', 't-tooltip--label', true],
      ['label', 't-tooltip--inaccessible', false],
      ['inaccessible', 't-tooltip--label', false],
      ['inaccessible', 't-tooltip--inaccessible', true],
    ])('relationship=%s 时 %s 存在性为 %s', async (relationship, className, expected) => {
      const wrapper = mountOpenTooltip({ relationship });
      await nextTick();

      expect(floating()?.classList.contains(className)).toBe(expected);

      wrapper.unmount();
    });
  });

  describe('箭头', () => {
    it('withArrow=true 时浮层内渲染箭头', async () => {
      const wrapper = mountOpenTooltip({ withArrow: true });
      await nextTick();

      expect(document.body.querySelector('.t-tooltip__arrow')).not.toBeNull();

      wrapper.unmount();
    });

    it('withArrow=false 时不渲染箭头', async () => {
      const wrapper = mountOpenTooltip({ withArrow: false });
      await nextTick();

      expect(document.body.querySelector('.t-tooltip__arrow')).toBeNull();

      wrapper.unmount();
    });

    it('箭头带绝对定位样式（由 Popover 计算）', async () => {
      const wrapper = mountOpenTooltip({ withArrow: true });
      await nextTick();

      const style = document.querySelector('.t-tooltip__arrow')?.getAttribute('style') ?? '';
      expect(style).toContain('position: absolute');

      wrapper.unmount();
    });
  });

  describe('定位', () => {
    it('placement 写入浮层的 data-placement', async () => {
      const wrapper = mountOpenTooltip({ placement: 'right-end' });
      await nextTick();

      expect(floating()?.getAttribute('data-placement')).toBe('right-end');

      wrapper.unmount();
    });

    it('浮层使用 floating-ui 产出的定位样式，而非手写 position: fixed', async () => {
      const wrapper = mountOpenTooltip();
      await nextTick();

      const style = floating()?.getAttribute('style') ?? '';
      // 默认 strategy 为 absolute —— 迁移前 Tooltip 用 absolute 算坐标却以 fixed 渲染
      expect(style).toContain('position: absolute');
      expect(style).not.toContain('position: fixed');

      wrapper.unmount();
    });
  });
});
