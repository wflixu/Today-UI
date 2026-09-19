import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import TPortal from '../Portal';
import { __resetScrollLockForTesting } from '../usePortal';

const CONTENT = 'portal-content';

/** 内容标记为可查询的元素，便于断言它最终落在哪个容器里 */
const renderWithMarker = (slots = {}) =>
  mount(TPortal, {
    slots: { default: () => h('div', { class: CONTENT }, '内容'), ...slots },
    attachTo: document.body,
  });

describe('Portal 组件', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    __resetScrollLockForTesting();
  });

  afterEach(() => {
    document.body.style.overflow = '';
    document.body.innerHTML = '';
  });

  describe('Props 渲染', () => {
    it('默认挂载到 document.body', async () => {
      const wrapper = renderWithMarker();
      await nextTick();

      expect(document.body.querySelector(`.${CONTENT}`)).not.toBeNull();
      expect(document.body.querySelector(`.${CONTENT}`)?.textContent).toBe('内容');

      wrapper.unmount();
    });

    it('disabled 为 true 时原地渲染，不使用 Teleport', async () => {
      const wrapper = mount(TPortal, {
        props: { disabled: true },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      // 原地渲染 —— 元素在组件自己的 DOM 树内，而非 body 直接子节点
      expect(wrapper.find(`.${CONTENT}`).exists()).toBe(true);

      wrapper.unmount();
    });

    it('attach 支持选择器字符串', async () => {
      const host = document.createElement('div');
      host.id = 'portal-host';
      document.body.appendChild(host);

      const wrapper = mount(TPortal, {
        props: { attach: '#portal-host' },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(host.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('attach 支持直接传 DOM 元素', async () => {
      const host = document.createElement('div');
      document.body.appendChild(host);

      const wrapper = mount(TPortal, {
        props: { attach: host },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(host.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('attach 支持函数形式', async () => {
      const host = document.createElement('div');
      host.id = 'portal-fn-host';
      document.body.appendChild(host);

      const wrapper = mount(TPortal, {
        props: { attach: () => host },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(host.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('函数返回选择器字符串时也能解析', async () => {
      const host = document.createElement('div');
      host.id = 'portal-nested-host';
      document.body.appendChild(host);

      const wrapper = mount(TPortal, {
        props: { attach: () => '#portal-nested-host' },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(host.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });
  });

  describe('DOM 结构', () => {
    it('不引入包裹元素 —— 内容直接成为挂载目标的子节点', async () => {
      const host = document.createElement('div');
      document.body.appendChild(host);

      const wrapper = mount(TPortal, {
        props: { attach: host },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      // host 的直接子节点就是内容本身，中间没有 Portal 加的 div
      expect(host.firstElementChild?.className).toBe(CONTENT);

      wrapper.unmount();
    });
  });

  describe('滚动锁', () => {
    it('lockScroll 为 true 时锁定 body 滚动', async () => {
      const wrapper = mount(TPortal, {
        props: { lockScroll: true },
        slots: { default: () => h('div', CONTENT) },
      });
      await nextTick();

      expect(document.body.style.overflow).toBe('hidden');

      wrapper.unmount();
    });

    it('卸载后恢复原来的 overflow', async () => {
      document.body.style.overflow = 'auto';

      const wrapper = mount(TPortal, {
        props: { lockScroll: true },
        slots: { default: () => h('div', CONTENT) },
      });
      await nextTick();
      expect(document.body.style.overflow).toBe('hidden');

      wrapper.unmount();
      expect(document.body.style.overflow).toBe('auto');
    });

    it('未开启 lockScroll 时不改动 body', async () => {
      const wrapper = mount(TPortal, {
        slots: { default: () => h('div', CONTENT) },
      });
      await nextTick();

      expect(document.body.style.overflow).toBe('');

      wrapper.unmount();
    });

    it('多实例叠加时，卸载其中一个不应提前解锁', async () => {
      const first = mount(TPortal, {
        props: { lockScroll: true },
        slots: { default: () => h('div', CONTENT) },
      });
      const second = mount(TPortal, {
        props: { lockScroll: true },
        slots: { default: () => h('div', CONTENT) },
      });
      await nextTick();
      expect(document.body.style.overflow).toBe('hidden');

      // 卸载第一个 —— 第二个仍持有锁，不能解锁
      first.unmount();
      expect(document.body.style.overflow).toBe('hidden');

      // 最后一个卸载后才恢复
      second.unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('动态切换 lockScroll 应即时生效', async () => {
      const wrapper = mount(TPortal, {
        props: { lockScroll: false },
        slots: { default: () => h('div', CONTENT) },
      });
      await nextTick();
      expect(document.body.style.overflow).toBe('');

      await wrapper.setProps({ lockScroll: true });
      expect(document.body.style.overflow).toBe('hidden');

      await wrapper.setProps({ lockScroll: false });
      expect(document.body.style.overflow).toBe('');

      wrapper.unmount();
    });
  });

  describe('动态 props 更新', () => {
    it('切换 attach 目标时内容随之迁移', async () => {
      const hostA = document.createElement('div');
      const hostB = document.createElement('div');
      document.body.append(hostA, hostB);

      const target = ref(hostA);
      const wrapper = mount(
        defineComponent({
          components: { TPortal },
          setup: () => () =>
            h(TPortal, { attach: target.value }, () => h('div', { class: CONTENT })),
        }),
        { attachTo: document.body },
      );
      await nextTick();
      expect(hostA.querySelector(`.${CONTENT}`)).not.toBeNull();

      target.value = hostB;
      await nextTick();
      expect(hostB.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('从 disabled 切换为正常模式时内容移出原地', async () => {
      const wrapper = mount(TPortal, {
        props: { disabled: true },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();
      expect(wrapper.find(`.${CONTENT}`).exists()).toBe(true);

      await wrapper.setProps({ disabled: false });
      await nextTick();
      expect(wrapper.find(`.${CONTENT}`).exists()).toBe(false);
      expect(document.body.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });
  });

  describe('边界情况', () => {
    it('attach 选择器未命中时回退到 document.body', async () => {
      const wrapper = mount(TPortal, {
        props: { attach: '#does-not-exist' },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(document.body.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('函数返回空值时回退到 document.body', async () => {
      const wrapper = mount(TPortal, {
        props: { attach: () => null as unknown as HTMLElement },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(document.body.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    // 类型系统在运行时不存在，使用者可能传入任意值。
    // 曾经这里会把非 DOM 值原样交给 Teleport，导致 insertBefore 抛 TypeError。
    it.each([
      ['数字', 123],
      ['普通对象', { notAnElement: true }],
      ['数组', []],
      ['布尔值', true],
    ])('attach 传入非法值（%s）时回退到 body 且不崩溃', async (_label, value) => {
      const wrapper = mount(TPortal, {
        props: { attach: value as never },
        slots: { default: () => h('div', { class: CONTENT }, '内容') },
        attachTo: document.body,
      });
      await nextTick();

      expect(document.body.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('没有默认插槽时不报错', async () => {
      const wrapper = mount(TPortal, { attachTo: document.body });
      await nextTick();

      expect(wrapper.exists()).toBe(true);

      wrapper.unmount();
    });
  });
});
