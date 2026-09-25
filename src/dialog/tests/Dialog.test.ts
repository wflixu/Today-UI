import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import TDialog from '../Dialog';

const OVERLAY = '.t-overlay';
const ROOT = '.t-dialog';

const mountDialog = (options: Record<string, unknown> = {}) => {
  const {
    props = {},
    slots = {},
    ...rest
  } = options as { props?: Record<string, unknown>; slots?: Record<string, unknown> };

  return mount(TDialog, {
    // 原地渲染，省去查询 Teleport 目标的麻烦
    props: { disabled: true, ...props },
    slots: {
      default: () => h('button', { class: 'trigger' }, '打开'),
      content: () => h('div', { class: 'body-content' }, '内容'),
      ...slots,
    },
    attachTo: document.body,
    ...rest,
  });
};

describe('Dialog 组件', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  describe('Props 渲染', () => {
    it('show 为 false 时不渲染对话框', () => {
      const wrapper = mountDialog();
      expect(wrapper.find(ROOT).exists()).toBe(false);
      wrapper.unmount();
    });

    it('show 为 true 时渲染遮罩与对话框', () => {
      const wrapper = mountDialog({ props: { show: true } });
      expect(wrapper.find(OVERLAY).exists()).toBe(true);
      expect(wrapper.find(ROOT).exists()).toBe(true);
      wrapper.unmount();
    });

    it('title 渲染到头部', () => {
      const wrapper = mountDialog({ props: { show: true, title: '标题文本' } });
      expect(wrapper.find('.t-dialog__header').text()).toBe('标题文本');
      wrapper.unmount();
    });

    it('未传 title 时头部为空而非占位文案', () => {
      const wrapper = mountDialog({ props: { show: true } });
      // 迁移前默认值是「请设置标题」，属于硬编码占位文案
      expect(wrapper.find('.t-dialog__header').text()).toBe('');
      wrapper.unmount();
    });

    it('渲染触发元素', () => {
      const wrapper = mountDialog();
      expect(wrapper.find('.trigger').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('宽度', () => {
    // 迁移前 width prop 完全失效：CSS 里写死 max-width: 600px，
    // 而 prop 默认值是 800px，两者互相矛盾。
    it.each([
      [500, '500px'],
      ['60vw', '60vw'],
      ['800px', '800px'],
    ])('width=%s 应下发为 %s', async (width, expected) => {
      const wrapper = mountDialog({ props: { show: true, width } });
      await nextTick();

      expect(wrapper.find(ROOT).attributes('style')).toContain(`width: ${expected}`);
      wrapper.unmount();
    });

    it('未传 width 时按 size 取预设', async () => {
      const medium = mountDialog({ props: { show: true } });
      await nextTick();
      expect(medium.find(ROOT).attributes('style')).toContain('width: 600px');
      medium.unmount();

      const large = mountDialog({ props: { show: true, size: 'large' } });
      await nextTick();
      expect(large.find(ROOT).attributes('style')).toContain('width: 800px');
      large.unmount();
    });

    it('width 优先于 size', async () => {
      const wrapper = mountDialog({ props: { show: true, size: 'small', width: 999 } });
      await nextTick();

      expect(wrapper.find(ROOT).attributes('style')).toContain('width: 999px');
      wrapper.unmount();
    });

    it('size 非默认值时产生类名', () => {
      const wrapper = mountDialog({ props: { show: true, size: 'large' } });
      expect(wrapper.find(ROOT).classes()).toContain('t-dialog--large');
      wrapper.unmount();
    });
  });

  describe('触发', () => {
    it('点击触发元素切换显示并抛出 update:show', async () => {
      const wrapper = mountDialog();
      await wrapper.find('.trigger').trigger('click');

      expect(wrapper.emitted('update:show')?.[0]).toEqual([true]);
      wrapper.unmount();
    });

    it('受控：外部更新 show 才真正显示', async () => {
      const wrapper = mountDialog({ props: { show: false } });

      await wrapper.find('.trigger').trigger('click');
      expect(wrapper.find(ROOT).exists()).toBe(false);

      await wrapper.setProps({ show: true });
      expect(wrapper.find(ROOT).exists()).toBe(true);
      wrapper.unmount();
    });

    it('触发元素上原有的点击处理器仍会被调用', async () => {
      const onClick = vi.fn();
      const wrapper = mountDialog({
        slots: {
          default: () => h('button', { class: 'trigger', onClick }, '打开'),
          content: () => h('div', '内容'),
        },
      });

      await wrapper.find('.trigger').trigger('click');
      expect(onClick).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('关闭行为', () => {
    it('点击遮罩关闭', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      await wrapper.find(OVERLAY).trigger('click');

      expect(wrapper.emitted('update:show')?.at(-1)).toEqual([false]);
      wrapper.unmount();
    });

    it('点击对话框内部不关闭', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      await wrapper.find(ROOT).trigger('click');

      expect(wrapper.emitted('update:show')).toBeFalsy();
      wrapper.unmount();
    });

    it('closeOnOverlayClick=false 时点击遮罩不关闭', async () => {
      const wrapper = mountDialog({ props: { show: true, closeOnOverlayClick: false } });
      await wrapper.find(OVERLAY).trigger('click');

      expect(wrapper.emitted('update:show')).toBeFalsy();
      wrapper.unmount();
    });

    it('按下 Escape 关闭', async () => {
      const wrapper = mountDialog({ props: { show: true } });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(wrapper.emitted('update:show')?.at(-1)).toEqual([false]);
      wrapper.unmount();
    });

    it('closeOnEscape=false 时 Escape 不关闭', async () => {
      const wrapper = mountDialog({ props: { show: true, closeOnEscape: false } });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(wrapper.emitted('update:show')).toBeFalsy();
      wrapper.unmount();
    });

    it('未显示时不响应 Escape', async () => {
      const wrapper = mountDialog({ props: { show: false } });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(wrapper.emitted('update:show')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('滚动锁', () => {
    it('显示时锁定 body 滚动', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      await nextTick();

      expect(document.body.style.overflow).toBe('hidden');
      wrapper.unmount();
    });

    it('关闭后恢复滚动', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      await nextTick();
      expect(document.body.style.overflow).toBe('hidden');

      await wrapper.setProps({ show: false });
      await nextTick();
      expect(document.body.style.overflow).toBe('');

      wrapper.unmount();
    });

    it('lockScroll=false 时不锁定', async () => {
      const wrapper = mountDialog({ props: { show: true, lockScroll: false } });
      await nextTick();

      expect(document.body.style.overflow).toBe('');
      wrapper.unmount();
    });
  });

  describe('插槽', () => {
    it('header 插槽优先于 title prop', () => {
      const wrapper = mountDialog({
        props: { show: true, title: 'prop 标题' },
        slots: {
          default: () => h('button', { class: 'trigger' }, '打开'),
          header: () => h('span', { class: 'custom-header' }, '插槽标题'),
          content: () => h('div', '内容'),
        },
      });

      expect(wrapper.find('.custom-header').text()).toBe('插槽标题');
      expect(wrapper.find('.t-dialog__header').text()).toBe('插槽标题');
      wrapper.unmount();
    });

    it('content 插槽渲染到主体区域', () => {
      const wrapper = mountDialog({ props: { show: true } });
      expect(wrapper.find('.t-dialog__content .body-content').exists()).toBe(true);
      wrapper.unmount();
    });

    it('未提供 actions 插槽时渲染默认的取消 / 确认', () => {
      const wrapper = mountDialog({ props: { show: true } });
      const buttons = wrapper.findAll('.t-dialog__actions button');

      expect(buttons.length).toBe(2);
      expect(buttons[0].text()).toBe('取消');
      expect(buttons[1].text()).toBe('确认');
      wrapper.unmount();
    });

    it('提供 actions 插槽时不再渲染默认按钮', () => {
      const wrapper = mountDialog({
        props: { show: true },
        slots: {
          default: () => h('button', { class: 'trigger' }, '打开'),
          content: () => h('div', '内容'),
          actions: () => h('button', { class: 'custom-action' }, '自定义'),
        },
      });

      expect(wrapper.find('.custom-action').exists()).toBe(true);
      expect(wrapper.findAll('.t-dialog__actions button').length).toBe(1);
      wrapper.unmount();
    });
  });

  describe('默认操作按钮的行为', () => {
    it('点击「取消」关闭', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      const buttons = wrapper.findAll('.t-dialog__actions button');

      await buttons[0].trigger('click');
      expect(wrapper.emitted('update:show')?.at(-1)).toEqual([false]);
      wrapper.unmount();
    });

    it('点击「确认」抛出 confirm 事件并关闭', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      const buttons = wrapper.findAll('.t-dialog__actions button');

      await buttons[1].trigger('click');
      expect(wrapper.emitted('confirm')).toBeTruthy();
      expect(wrapper.emitted('update:show')?.at(-1)).toEqual([false]);
      wrapper.unmount();
    });
  });

  // 迁移前的实现把点击监听通过 watch 反复 addEventListener 却从不移除，
  // 元素每次变更都会叠一个。这里守护「显示才挂、关闭即摘」。
  describe('监听清理（回归守护）', () => {
    it('关闭后应移除 keydown 监听', async () => {
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountDialog({ props: { show: true } });
      await nextTick();

      await wrapper.setProps({ show: false });
      await nextTick();

      expect(removeSpy.mock.calls.map((c) => c[0])).toContain('keydown');
      wrapper.unmount();
    });

    it('反复开关不会累积监听', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountDialog({ props: { show: false } });

      for (let i = 0; i < 3; i += 1) {
        await wrapper.setProps({ show: true });
        await nextTick();
        await wrapper.setProps({ show: false });
        await nextTick();
      }

      const adds = addSpy.mock.calls.filter((c) => c[0] === 'keydown').length;
      const removes = removeSpy.mock.calls.filter((c) => c[0] === 'keydown').length;
      expect(adds).toBe(removes);

      wrapper.unmount();
    });
  });

  describe('边界情况', () => {
    it('未提供触发插槽时不报错', () => {
      const wrapper = mount(TDialog, {
        props: { disabled: true, show: true },
        slots: { content: () => h('div', '内容') },
      });

      expect(wrapper.find(ROOT).exists()).toBe(true);
      wrapper.unmount();
    });

    it('未提供 content 插槽时不报错', () => {
      const wrapper = mount(TDialog, {
        props: { disabled: true, show: true },
        slots: { default: () => h('button', '打开') },
      });

      expect(wrapper.find(ROOT).exists()).toBe(true);
      wrapper.unmount();
    });

    it('显示状态下卸载应释放滚动锁', async () => {
      const wrapper = mountDialog({ props: { show: true } });
      await nextTick();
      expect(document.body.style.overflow).toBe('hidden');

      wrapper.unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });
});
