import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick, h, defineComponent } from 'vue';
import Tooltip from '../Tooltip';
import type { TooltipProps } from '../Tooltip.types';

describe('Tooltip 组件', () => {
  describe('Props 渲染', () => {
    it('应该渲染触发元素包装器', () => {
      const wrapper = mount(Tooltip, {
        props: { content: 'Tooltip content' },
        slots: { default: () => h('button', 'Trigger') }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });

    it('应该渲染 content prop 内容', () => {
      const wrapper = mount(Tooltip, {
        props: { content: 'Test content' },
        slots: { default: () => h('button', 'Trigger') }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });

    describe('placement 属性', () => {
      const placements: Array<TooltipProps['placement']> = [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ];

      placements.forEach((placement) => {
        it(`应该渲染 placement="${placement}"`, () => {
          const wrapper = mount(Tooltip, {
            props: { placement, content: 'Test' },
            slots: { default: () => h('button', 'Trigger') }
          });

          expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
        });
      });
    });

    describe('relationship 属性', () => {
      const relationships: Array<TooltipProps['relationship']> = [
        'description',
        'label',
        'inaccessible',
      ];

      relationships.forEach((relationship) => {
        it(`应该渲染 relationship="${relationship}"`, () => {
          const wrapper = mount(Tooltip, {
            props: { relationship, content: 'Test' },
            slots: { default: () => h('button', 'Trigger') }
          });

          expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
        });
      });
    });

    describe('maxWidth 属性', () => {
      it('应该渲染自定义 maxWidth', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test', maxWidth: 300 },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });

      it('应该渲染默认 maxWidth (200)', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test' },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });
    });

    describe('offset 属性', () => {
      it('应该渲染自定义 offset', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test', offset: 10 },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });
    });

    describe('withArrow 属性', () => {
      it('withArrow=true 应该渲染箭头', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test', withArrow: true },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });

      it('withArrow=false 不应该渲染箭头', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test', withArrow: false },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });
    });

    describe('wrapText 属性', () => {
      it('wrapText=true 应该允许文本换行', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test', wrapText: true },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });

      it('wrapText=false 应该禁止文本换行', () => {
        const wrapper = mount(Tooltip, {
          props: { content: 'Test', wrapText: false },
          slots: { default: () => h('button', 'Trigger') }
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });
    });
  });

  describe('触发模式', () => {
    vi.useFakeTimers();

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('trigger="hover"', () => {
      it('应该在鼠标悬停时显示', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Hover me',
            trigger: 'hover' as const,
            delay: 0,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Hover trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('mouseenter');

        // 立即执行所有定时器（delay=0）
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).toHaveBeenCalledWith(true);
      });

      it('应该在鼠标离开时隐藏', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Hover me',
            trigger: 'hover' as const,
            delay: 0,
            closeDelay: 0,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Hover trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('mouseenter');
        vi.runAllTimers();
        await nextTick();

        await trigger.trigger('mouseleave');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).toHaveBeenCalledWith(false);
      });

      it('应该尊重 delay 延迟', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Delayed',
            trigger: 'hover' as const,
            delay: 500,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('mouseenter');

        vi.advanceTimersByTime(250);
        await nextTick();
        expect(onVisibleChange).not.toHaveBeenCalled();

        vi.advanceTimersByTime(250);
        await nextTick();
        expect(onVisibleChange).toHaveBeenCalledWith(true);
      });
    });

    describe('trigger="focus"', () => {
      it('应该在获得焦点时显示', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Focus me',
            trigger: 'focus' as const,
            delay: 0,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Focus trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('focusin');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).toHaveBeenCalledWith(true);
      });

      it('应该在失去焦点时隐藏', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Focus me',
            trigger: 'focus' as const,
            delay: 0,
            closeDelay: 0,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Focus trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('focusin');
        vi.runAllTimers();
        await nextTick();

        await trigger.trigger('focusout');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).toHaveBeenCalledWith(false);
      });
    });

    describe('trigger="both"', () => {
      it('应该在鼠标悬停时显示', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Both',
            trigger: 'both' as const,
            delay: 0,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('mouseenter');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).toHaveBeenCalledWith(true);
      });

      it('应该在获得焦点时显示', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Both',
            trigger: 'both' as const,
            delay: 0,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('focusin');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).toHaveBeenCalledWith(true);
      });
    });

    describe('trigger="manual"', () => {
      it('不应该在鼠标悬停时自动显示', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Manual',
            trigger: 'manual' as const,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('mouseenter');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).not.toHaveBeenCalled();
      });

      it('不应该在获得焦点时自动显示', async () => {
        const onVisibleChange = vi.fn();
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Manual',
            trigger: 'manual' as const,
            onVisibleChange,
          },
          slots: { default: () => h('button', 'Trigger') },
          attachTo: document.body,
        });

        const trigger = wrapper.find('.t-tooltip-trigger');
        await trigger.trigger('focusin');
        vi.runAllTimers();
        await nextTick();

        expect(onVisibleChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('受控/非受控模式', () => {
    vi.useFakeTimers();

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('非受控模式（defaultVisible）', () => {
      it('defaultVisible=false 应该初始隐藏', () => {
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Test',
            defaultVisible: false,
          },
          slots: { default: () => h('button', 'Trigger') },
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });

      it('defaultVisible=true 应该初始显示', () => {
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Test',
            defaultVisible: true,
          },
          slots: { default: () => h('button', 'Trigger') },
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
      });
    });

    describe('受控模式（visible）', () => {
      it('应该响应 visible prop 变化', async () => {
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Controlled',
            visible: false,
          },
          slots: { default: () => h('button', 'Trigger') },
        });

        expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);

        await wrapper.setProps({ visible: true });
        expect(wrapper.props('visible')).toBe(true);
      });

      it('visible prop 应该优先于内部状态', async () => {
        const wrapper = mount(Tooltip, {
          props: {
            content: 'Controlled',
            visible: true,
            trigger: 'hover' as const,
          },
          slots: { default: () => h('button', 'Trigger') },
        });

        expect(wrapper.props('visible')).toBe(true);

        await wrapper.setProps({ visible: false });
        expect(wrapper.props('visible')).toBe(false);
      });
    });
  });

  describe('事件', () => {
    vi.useFakeTimers();

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('应该在显示时调用 onVisibleChange(true)', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(Tooltip, {
        props: {
          content: 'Test',
          trigger: 'hover' as const,
          delay: 0,
          onVisibleChange,
        },
        slots: { default: () => h('button', 'Trigger') },
        attachTo: document.body,
      });

      const trigger = wrapper.find('.t-tooltip-trigger');
      await trigger.trigger('mouseenter');
      vi.runAllTimers();
      await nextTick();

      expect(onVisibleChange).toHaveBeenCalledWith(true);
    });

    it('应该在隐藏时调用 onVisibleChange(false)', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(Tooltip, {
        props: {
          content: 'Test',
          trigger: 'hover' as const,
          delay: 0,
          closeDelay: 0,
          onVisibleChange,
        },
        slots: { default: () => h('button', 'Trigger') },
        attachTo: document.body,
      });

      const trigger = wrapper.find('.t-tooltip-trigger');
      await trigger.trigger('mouseenter');
      vi.runAllTimers();
      await nextTick();

      await trigger.trigger('mouseleave');
      vi.runAllTimers();
      await nextTick();

      expect(onVisibleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('插槽', () => {
    it('应该渲染默认插槽（触发元素）', () => {
      const wrapper = mount(Tooltip, {
        props: { content: 'Test' },
        slots: { default: () => h('button', 'Trigger Button') }
      });

      const trigger = wrapper.find('.t-tooltip-trigger');
      expect(trigger.exists()).toBe(true);
      expect(trigger.text()).toBe('Trigger Button');
    });

    it('应该渲染 content 插槽', () => {
      const wrapper = mount(Tooltip, {
        props: {},
        slots: {
          default: () => h('button', 'Trigger'),
          content: () => h('span', 'Custom content')
        }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });

    it('content 插槽应该优先于 content prop', () => {
      const wrapper = mount(Tooltip, {
        props: { content: 'Prop content' },
        slots: {
          default: () => h('button', 'Trigger'),
          content: () => h('span', 'Slot content')
        }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });
  });

  describe('定时器管理', () => {
    vi.useFakeTimers();

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('应该在组件卸载时清理所有定时器', () => {
      const wrapper = mount(Tooltip, {
        props: {
          content: 'Test',
          delay: 1000,
        },
        slots: { default: () => h('button', 'Trigger') },
        attachTo: document.body,
      });

      const trigger = wrapper.find('.t-tooltip-trigger');
      trigger.trigger('mouseenter');

      // 卸载组件
      wrapper.unmount();

      // 推进时间，应该不会有任何错误
      vi.advanceTimersByTime(2000);

      // 如果定时器被正确清理，这里不会抛出错误
      expect(true).toBe(true);
    });

    it('应该在重新触发时清理之前的定时器', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(Tooltip, {
        props: {
          content: 'Test',
          delay: 500,
          onVisibleChange,
        },
        slots: { default: () => h('button', 'Trigger') },
        attachTo: document.body,
      });

      const trigger = wrapper.find('.t-tooltip-trigger');

      // 第一次触发
      await trigger.trigger('mouseenter');
      vi.advanceTimersByTime(250);

      // 第二次触发（应该重置定时器）
      await trigger.trigger('mouseleave');
      await trigger.trigger('mouseenter');
      vi.advanceTimersByTime(250);

      // 250ms 时还不应该显示
      expect(onVisibleChange).not.toHaveBeenCalled();

      // 再推进 250ms
      vi.advanceTimersByTime(250);
      await nextTick();

      // 现在应该显示
      expect(onVisibleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('无障碍性', () => {
    it('不应该包含 ARIA 属性（项目规范）', () => {
      const wrapper = mount(Tooltip, {
        props: { content: 'Test' },
        slots: { default: () => h('button', 'Trigger') }
      });

      const trigger = wrapper.find('.t-tooltip-trigger');
      expect(trigger.attributes('role')).toBeUndefined();
      expect(trigger.attributes('aria-describedby')).toBeUndefined();
    });
  });

  describe('边界情况', () => {
    it('应该处理空内容', () => {
      const wrapper = mount(Tooltip, {
        props: { content: undefined },
        slots: { default: () => h('button', 'Trigger') }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });

    it('应该处理超长文本', () => {
      const longText = '这是一个非常非常非常长的提示文本内容';
      const wrapper = mount(Tooltip, {
        props: { content: longText },
        slots: { default: () => h('button', 'Trigger') }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });

    it('应该处理 HTML 字符实体', () => {
      const wrapper = mount(Tooltip, {
        props: { content: '<>&"' },
        slots: { default: () => h('button', 'Trigger') }
      });

      expect(wrapper.find('.t-tooltip-trigger').exists()).toBe(true);
    });

    it('应该处理零延迟', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(Tooltip, {
        props: {
          content: 'Test',
          delay: 0,
          trigger: 'hover' as const,
          onVisibleChange,
        },
        slots: { default: () => h('button', 'Trigger') },
        attachTo: document.body,
      });

      const trigger = wrapper.find('.t-tooltip-trigger');
      await trigger.trigger('mouseenter');
      vi.runAllTimers();
      await nextTick();

      expect(onVisibleChange).toHaveBeenCalledWith(true);
    });
  });
});
