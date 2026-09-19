import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import TDropdown from '../Dropdown';
import type { IDropdownOption } from '../Dropdown.types';

const OPTIONS: IDropdownOption[] = [
  { label: '重命名', key: 'rename' },
  { label: '删除', key: 'delete' },
];

const mountDropdown = (options: Record<string, unknown> = {}) => {
  const {
    props = {},
    slots = {},
    ...rest
  } = options as { props?: Record<string, unknown>; slots?: Record<string, unknown> };

  return mount(TDropdown, {
    // 原地渲染，省去查询 Teleport 目标的麻烦
    props: { disabled: true, options: OPTIONS, ...props },
    slots: {
      default: () => h('button', { class: 'trigger' }, '打开'),
      ...slots,
    },
    attachTo: document.body,
    ...rest,
  });
};

const findMenu = (wrapper: ReturnType<typeof mountDropdown>) => wrapper.find('.t-dropdown-menu');

describe('Dropdown 组件', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('Props 渲染', () => {
    it('默认关闭时不渲染菜单', () => {
      const wrapper = mountDropdown();
      expect(findMenu(wrapper).exists()).toBe(false);
      wrapper.unmount();
    });

    it('渲染触发元素', () => {
      const wrapper = mountDropdown();
      expect(wrapper.find('.trigger').exists()).toBe(true);
      wrapper.unmount();
    });

    it('触发元素被追加 t-dropdown-ref 类，且保留原有类名', () => {
      const wrapper = mountDropdown();
      const trigger = wrapper.find('.trigger');

      expect(trigger.classes()).toContain('t-dropdown-ref');
      // cloneVNode 合并而非覆盖
      expect(trigger.classes()).toContain('trigger');
      wrapper.unmount();
    });

    it('options 渲染为菜单项', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();

      const items = wrapper.findAll('.t-menu-list-item');
      expect(items.length).toBe(OPTIONS.length);
      expect(wrapper.text()).toContain('重命名');
      expect(wrapper.text()).toContain('删除');
      wrapper.unmount();
    });

    it('空 options 不报错', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true, options: [] } });
      await nextTick();

      expect(findMenu(wrapper).exists()).toBe(true);
      expect(wrapper.findAll('.t-menu-list-item').length).toBe(0);
      wrapper.unmount();
    });

    it('defaultVisible 为 true 时初始即展开', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();

      expect(findMenu(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('触发模式', () => {
    it('trigger="click"（默认）点击切换', async () => {
      const wrapper = mountDropdown();
      const trigger = wrapper.find('.trigger');

      await trigger.trigger('click');
      expect(findMenu(wrapper).exists()).toBe(true);

      await trigger.trigger('click');
      expect(findMenu(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('trigger="contextmenu" 右键展开', async () => {
      const wrapper = mountDropdown({ props: { trigger: 'contextmenu' } });

      await wrapper.find('.trigger').trigger('contextmenu');
      expect(findMenu(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    it('trigger="hover" 悬停展开、移开收起', async () => {
      const wrapper = mountDropdown({ props: { trigger: 'hover' } });
      const trigger = wrapper.find('.trigger');

      await trigger.trigger('mouseenter');
      expect(findMenu(wrapper).exists()).toBe(true);

      await trigger.trigger('mouseleave');
      expect(findMenu(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('trigger="manual" 不响应点击', async () => {
      const wrapper = mountDropdown({ props: { trigger: 'manual' } });

      await wrapper.find('.trigger').trigger('click');
      expect(findMenu(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('触发元素上原有的点击处理器仍会被调用', async () => {
      const onClick = vi.fn();
      const wrapper = mountDropdown({
        slots: { default: () => h('button', { class: 'trigger', onClick }, '打开') },
      });

      await wrapper.find('.trigger').trigger('click');
      expect(onClick).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  // 迁移前 visible 是单向 prop：内部开合不回写，也没有 update:visible，
  // 使用者无法用 v-model 绑定。这里守护修复后的双向行为。
  describe('v-model:visible', () => {
    it('内部开合应抛出 update:visible', async () => {
      const wrapper = mountDropdown({ props: { visible: false } });

      await wrapper.find('.trigger').trigger('click');

      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true]);
      wrapper.unmount();
    });

    it('同时抛出 toggle 事件（兼容既有用法）', async () => {
      const wrapper = mountDropdown({ props: { visible: false } });

      await wrapper.find('.trigger').trigger('click');

      expect(wrapper.emitted('toggle')?.[0]).toEqual([true]);
      wrapper.unmount();
    });

    it('受控模式：props 未变时不展开', async () => {
      const wrapper = mountDropdown({ props: { visible: false } });

      await wrapper.find('.trigger').trigger('click');
      expect(findMenu(wrapper).exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(findMenu(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    it('受控模式：外部置为 false 时收起', async () => {
      const wrapper = mountDropdown({ props: { visible: true } });
      await nextTick();
      expect(findMenu(wrapper).exists()).toBe(true);

      await wrapper.setProps({ visible: false });
      await nextTick();
      expect(findMenu(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('受控模式：首次传入 true 即展开（迁移前会被 immediate 跳过）', async () => {
      const wrapper = mountDropdown({ props: { visible: true } });
      await nextTick();

      // 迁移前 watch 里 `if (oldVal === undefined) return;` 会让首次 immediate 直接返回
      expect(findMenu(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('事件', () => {
    it('点击菜单项抛出 select 并携带选项对象', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();

      await wrapper.findAll('.t-menu-list-item')[0].trigger('click');

      const emitted = wrapper.emitted('select') ?? [];
      expect(emitted.length).toBeGreaterThan(0);
      expect((emitted[0][0] as IDropdownOption).key).toBe('rename');
      wrapper.unmount();
    });

    it('未提供 onSelect 时点击菜单项不报错', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();

      await wrapper.findAll('.t-menu-list-item')[0].trigger('click');
      expect(true).toBe(true);
      wrapper.unmount();
    });
  });

  describe('插槽', () => {
    it('menu 插槽优先于 options', async () => {
      const wrapper = mountDropdown({
        props: { defaultVisible: true },
        slots: { menu: () => h('div', { class: 'custom-menu' }, '自定义菜单') },
      });
      await nextTick();

      expect(wrapper.find('.custom-menu').exists()).toBe(true);
      expect(wrapper.findAll('.t-menu-list-item').length).toBe(0);
      wrapper.unmount();
    });

    it('未提供 default 插槽时不报错', () => {
      const wrapper = mount(TDropdown, {
        props: { disabled: true, defaultVisible: true, options: OPTIONS },
      });

      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('关闭行为', () => {
    it('点击外部关闭', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();
      expect(findMenu(wrapper).exists()).toBe(true);

      document.body.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(findMenu(wrapper).exists()).toBe(false);
      wrapper.unmount();
    });

    it('按 Escape 关闭', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(findMenu(wrapper).exists()).toBe(false);
      wrapper.unmount();
    });
  });

  // TreeNode 是 Dropdown 目前唯一的下游消费者，通过直接文件导入使用。
  // 这里固化它的用法，避免重构时无声破坏它。
  describe('消费者契约（TreeNode 的用法）', () => {
    it('contextmenu + options + onSelect + 默认插槽 的组合可用', async () => {
      const onSelect = vi.fn();
      const wrapper = mountDropdown({
        props: { trigger: 'contextmenu', options: OPTIONS },
        slots: { default: () => h('div', { class: 'tree-node' }, 'main.typ') },
        attrs: { onSelect },
      });

      await wrapper.find('.tree-node').trigger('contextmenu');
      expect(findMenu(wrapper).exists()).toBe(true);

      await wrapper.findAll('.t-menu-list-item')[1].trigger('click');
      expect(onSelect).toHaveBeenCalled();
      expect((onSelect.mock.calls[0][0] as IDropdownOption).key).toBe('delete');

      wrapper.unmount();
    });
  });

  describe('边界情况', () => {
    it('反复开关后仍能正常展开', async () => {
      const wrapper = mountDropdown();
      const trigger = wrapper.find('.trigger');

      for (let i = 0; i < 5; i += 1) {
        await trigger.trigger('click');
        expect(findMenu(wrapper).exists()).toBe(true);
        await trigger.trigger('click');
        expect(findMenu(wrapper).exists()).toBe(false);
      }

      wrapper.unmount();
    });

    it('菜单展开状态下卸载不报错', async () => {
      const wrapper = mountDropdown({ props: { defaultVisible: true } });
      await nextTick();

      expect(() => wrapper.unmount()).not.toThrow();
    });
  });
});
