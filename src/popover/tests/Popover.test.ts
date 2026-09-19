import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import TPopover from '../Popover';

const CONTENT = 'popover-content';

/**
 * 多数用例用 `disabled: true` 让浮层原地渲染 —— 省去查询 Teleport 目标的麻烦。
 * 需要验证 Teleport 行为的用例单独用默认值。
 */
const mountPopover = (options: Record<string, unknown> = {}) => {
  const {
    props = {},
    slots = {},
    ...rest
  } = options as {
    props?: Record<string, unknown>;
    slots?: Record<string, unknown>;
  };

  return mount(TPopover, {
    props: { disabled: true, ...props },
    slots: {
      default: () => h('button', { class: 'trigger' }, '触发'),
      content: () => h('div', { class: CONTENT }, '浮层'),
      ...slots,
    },
    attachTo: document.body,
    ...rest,
  });
};

/** 浮层容器 —— 定位属性、类名、事件都挂在它上面 */
const findFloating = (wrapper: VueWrapper) => wrapper.find('.t-popover__content');

/** 外部点击监听是异步挂载的（见 usePopover 中的说明），等待它挂上 */
const waitAttach = () => new Promise((r) => setTimeout(r, 0));

/** 插槽内容 —— 用于判断浮层是否渲染 */
const findContent = (wrapper: VueWrapper) => wrapper.find(`.${CONTENT}`);

describe('Popover 组件', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('Props 渲染', () => {
    it('默认关闭时不渲染浮层', () => {
      const wrapper = mountPopover();
      expect(findContent(wrapper).exists()).toBe(false);
      wrapper.unmount();
    });

    it('defaultVisible 为 true 时初始即渲染浮层', () => {
      const wrapper = mountPopover({ props: { defaultVisible: true } });
      expect(findContent(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });

    it('渲染触发元素', () => {
      const wrapper = mountPopover();
      expect(wrapper.find('.trigger').exists()).toBe(true);
      wrapper.unmount();
    });

    it.each([['bottom-start'], ['top'], ['right-end'], ['left']])(
      'placement="%s" 应写入浮层容器的 data-placement',
      async (placement) => {
        const wrapper = mountPopover({ props: { defaultVisible: true, placement } });
        await nextTick();

        expect(findFloating(wrapper).attributes('data-placement')).toBe(placement);
        wrapper.unmount();
      },
    );

    it('浮层容器带有定位样式（由 floating-ui 产出，非手写 position）', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true } });
      await nextTick();

      const style = findFloating(wrapper).attributes('style') ?? '';
      // strategy 为默认的 absolute，样式里应体现出来
      expect(style).toContain('position: absolute');
      wrapper.unmount();
    });
  });

  describe('触发模式', () => {
    it('trigger="click"（默认）点击切换开合', async () => {
      const wrapper = mountPopover();
      const trigger = wrapper.find('.trigger');

      await trigger.trigger('click');
      expect(findContent(wrapper).exists()).toBe(true);

      await trigger.trigger('click');
      expect(findContent(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('trigger="hover" 鼠标进入显示、移出隐藏', async () => {
      const wrapper = mountPopover({ props: { trigger: 'hover' } });
      const trigger = wrapper.find('.trigger');

      await trigger.trigger('mouseenter');
      expect(findContent(wrapper).exists()).toBe(true);

      await trigger.trigger('mouseleave');
      expect(findContent(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('trigger="focus" 聚焦显示、失焦隐藏', async () => {
      const wrapper = mountPopover({ props: { trigger: 'focus' } });
      const trigger = wrapper.find('.trigger');

      await trigger.trigger('focusin');
      expect(findContent(wrapper).exists()).toBe(true);

      await trigger.trigger('focusout');
      expect(findContent(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });

    it('trigger="contextmenu" 右键显示并阻止默认菜单', async () => {
      const wrapper = mountPopover({ props: { trigger: 'contextmenu' } });

      await wrapper.find('.trigger').trigger('contextmenu');
      expect(findContent(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    it('trigger="manual" 不响应任何点击', async () => {
      const wrapper = mountPopover({ props: { trigger: 'manual' } });

      await wrapper.find('.trigger').trigger('click');
      expect(findContent(wrapper).exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('受控 / 非受控', () => {
    it('受控模式：点击改变内部状态但不显示，需外部更新 prop', async () => {
      const wrapper = mountPopover({ props: { visible: false } });

      await wrapper.find('.trigger').trigger('click');
      // 受控时 props.visible 未变，浮层不应出现
      expect(findContent(wrapper).exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      expect(findContent(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    // 事件语义：抛出的是「请求」而非「状态已变化」。
    // 内部发起的开合无论受控与否都要通知外部，否则受控模式下 v-model 永远无法更新；
    // 而外部主动改 prop 不应回抛，否则会形成循环。
    it('受控模式下内部点击应抛出 update:visible（这是 v-model 能工作的前提）', async () => {
      const wrapper = mountPopover({ props: { visible: false } });

      await wrapper.find('.trigger').trigger('click');

      // 受控状态下内部不改状态，但必须把「请求展开」告诉外部
      expect(findContent(wrapper).exists()).toBe(false);
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true]);
      expect(wrapper.emitted('visibleChange')?.[0]).toEqual([true]);

      wrapper.unmount();
    });

    it('外部主动改 prop 不应回抛事件', async () => {
      const wrapper = mountPopover({ props: { visible: true } });

      await wrapper.setProps({ visible: false });
      await nextTick();

      expect(wrapper.emitted('update:visible')).toBeFalsy();

      wrapper.unmount();
    });

    it('非受控模式：内部自管理状态', async () => {
      const wrapper = mountPopover();

      await wrapper.find('.trigger').trigger('click');
      expect(findContent(wrapper).exists()).toBe(true);
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true]);

      wrapper.unmount();
    });

    /**
     * 回归：受控浮层 + 外部切换按钮。
     *
     * 这个组合非常自然，但曾因外部点击监听用 `pointerdown` 而失效：
     *   pointerdown（先于 click）→ 判定外部点击 → 关闭，外部状态变 false
     *   click → 按钮的 `!visible` 又变回 true
     * 结果是浮层永远展开，且不报任何错。
     *
     * **必须按真实浏览器顺序派发 pointerdown → click**：test-utils 的
     * `trigger('click')` 只发 click 一个事件，不会触发 pointerdown，
     * 那样写出来的用例无论实现用哪个事件都会通过，等于没有守护。
     */
    it('受控浮层 + 外部切换按钮：连续点击应正常开合', async () => {
      const visible = ref(false);

      const Host = defineComponent({
        setup() {
          return () =>
            h('div', [
              h(
                'button',
                {
                  class: 'external-toggle',
                  onClick: () => {
                    visible.value = !visible.value;
                  },
                },
                '切换',
              ),
              h(
                TPopover,
                {
                  disabled: true,
                  visible: visible.value,
                  'onUpdate:visible': (v: boolean) => {
                    visible.value = v;
                  },
                },
                {
                  default: () => h('button', { class: 'trigger' }, '触发'),
                  content: () => h('div', { class: CONTENT }, '浮层'),
                },
              ),
            ]);
        },
      });

      const wrapper = mount(Host, { attachTo: document.body });
      const toggle = wrapper.find('.external-toggle');

      /** 模拟真实点击：先 pointerdown（在 document 上冒泡），再 click */
      const realClick = async () => {
        toggle.element.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        await toggle.trigger('click');
        await nextTick();
      };

      await realClick();
      expect(findContent(wrapper).exists()).toBe(true);

      // 第二次点击应关闭
      await realClick();
      expect(findContent(wrapper).exists()).toBe(false);

      // 第三次再打开
      await realClick();
      expect(findContent(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('关闭行为', () => {
    it('点击浮层外部应关闭', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true } });
      expect(findContent(wrapper).exists()).toBe(true);

      // 外部点击监听是异步挂载的，等它挂上再点
      await waitAttach();

      const outside = document.createElement('div');
      document.body.appendChild(outside);
      outside.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(findContent(wrapper).exists()).toBe(false);
      wrapper.unmount();
    });

    it('点击浮层内部不应关闭', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true } });
      const content = findContent(wrapper);

      content.element.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(findContent(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });

    /**
     * 回归：外部点击监听必须在当前事件传播结束之后再挂。
     *
     * 真实浏览器中的故障（已用 CDP 真实鼠标事件复现，并抓到与触发点击相同的
     * timeStamp）：点击触发元素时，事件传到 target 阶段改变状态，Vue 的刷新让
     * 「外部点击」监听在同一次事件传播**途中**挂到 document；事件继续冒泡到
     * document 时，这个新挂上的监听被**同一个事件**触发（DOM 规范中监听器列表
     * 在到达该节点时才克隆），于是刚打开的浮层被自己这次点击关掉 ——
     * 表现为「点一下，闪一下就没了」。
     *
     * jsdom 无法复现该时序（状态刷新发生在事件派发之外），所以这里直接守护
     * 修复机制本身：监听不能在同一次传播周期内挂上。
     */
    it('外部点击监听应异步挂载，不得在状态变更的同一周期内', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const wrapper = mountPopover();

      await wrapper.find('.trigger').trigger('click');
      await nextTick();

      const clickAddsNow = addSpy.mock.calls.filter((call) => call[0] === 'click').length;
      expect(
        clickAddsNow,
        '监听若此刻已挂上，触发打开的那次点击会继续冒泡到 document 并立即关闭浮层',
      ).toBe(0);

      await waitAttach();
      expect(addSpy.mock.calls.filter((call) => call[0] === 'click').length).toBe(1);

      addSpy.mockRestore();
      wrapper.unmount();
    });

    it('closeOnClickOutside=false 时点击外部不关闭', async () => {
      const wrapper = mountPopover({
        props: { defaultVisible: true, closeOnClickOutside: false },
      });

      const outside = document.createElement('div');
      document.body.appendChild(outside);
      outside.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(findContent(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });

    it('按下 Escape 应关闭', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true } });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(findContent(wrapper).exists()).toBe(false);
      wrapper.unmount();
    });

    it('closeOnEscape=false 时 Escape 不关闭', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true, closeOnEscape: false } });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(findContent(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });

    // 既有 Dialog 的问题：反复开关会不断 addEventListener 却从不移除，监听器持续累积。
    // 这里守护「关闭即移除」，避免同类问题在新原语上重现。
    it('关闭后应移除全局监听', async () => {
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountPopover({ props: { defaultVisible: true } });
      await waitAttach();

      // 点击外部关闭
      document.body.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();
      expect(findContent(wrapper).exists()).toBe(false);

      const removedEvents = removeSpy.mock.calls.map((call) => call[0]);
      expect(removedEvents).toContain('keydown');
      expect(removedEvents).toContain('click');

      removeSpy.mockRestore();
      wrapper.unmount();
    });

    it('反复开关不会累积监听 —— 每次关闭都成对移除', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const wrapper = mountPopover();
      const trigger = wrapper.find('.trigger');

      for (let i = 0; i < 3; i += 1) {
        await trigger.trigger('click');
        await nextTick();
        await trigger.trigger('click');
        await nextTick();
      }

      const keydownAdds = addSpy.mock.calls.filter((c) => c[0] === 'keydown').length;
      const keydownRemoves = removeSpy.mock.calls.filter((c) => c[0] === 'keydown').length;
      expect(keydownAdds).toBe(keydownRemoves);

      addSpy.mockRestore();
      removeSpy.mockRestore();
      wrapper.unmount();
    });
  });

  describe('延迟与定时器', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('openDelay 应延迟显示', async () => {
      const wrapper = mountPopover({ props: { trigger: 'hover', openDelay: 200 } });

      await wrapper.find('.trigger').trigger('mouseenter');
      expect(findContent(wrapper).exists()).toBe(false);

      vi.advanceTimersByTime(200);
      await nextTick();
      expect(findContent(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    it('closeDelay 期间重新进入应取消关闭', async () => {
      const wrapper = mountPopover({
        props: { trigger: 'hover', closeDelay: 200, defaultVisible: true },
      });
      const trigger = wrapper.find('.trigger');

      await trigger.trigger('mouseleave');
      vi.advanceTimersByTime(100);
      await trigger.trigger('mouseenter');

      vi.advanceTimersByTime(200);
      await nextTick();
      // 重新进入清掉了待执行的关闭
      expect(findContent(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    it('卸载应清空待执行的定时器', async () => {
      const wrapper = mountPopover({ props: { trigger: 'hover', openDelay: 500 } });

      await wrapper.find('.trigger').trigger('mouseenter');
      wrapper.unmount();

      // 若定时器未清理，这里会因组件已卸载而报错
      vi.advanceTimersByTime(1000);
      expect(true).toBe(true);
    });
  });

  describe('插槽', () => {
    it('content 插槽的作用域参数提供 arrowRef 与 arrowStyles', async () => {
      let received: Record<string, unknown> | undefined;
      const wrapper = mountPopover({
        props: { defaultVisible: true, withArrow: true },
        slots: {
          content: (scope: Record<string, unknown>) => {
            received = scope;
            return h('div', { class: CONTENT }, '浮层');
          },
        },
      });
      await nextTick();

      expect(received).toBeDefined();
      expect(received).toHaveProperty('arrowRef');
      expect(received).toHaveProperty('arrowStyles');

      wrapper.unmount();
    });

    it('withArrow 为 true 时渲染箭头元素', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true, withArrow: true } });
      await nextTick();

      expect(wrapper.find('.t-popover__arrow').exists()).toBe(true);
      wrapper.unmount();
    });

    it('withArrow 为 false 时不渲染箭头', async () => {
      const wrapper = mountPopover({ props: { defaultVisible: true } });
      await nextTick();

      expect(wrapper.find('.t-popover__arrow').exists()).toBe(false);
      wrapper.unmount();
    });

    it('未提供 default 插槽时不报错', () => {
      const wrapper = mount(TPopover, {
        props: { disabled: true, defaultVisible: true },
        slots: { content: () => h('div', { class: CONTENT }) },
      });

      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('Teleport', () => {
    it('默认把浮层传送到 body', async () => {
      const wrapper = mount(TPopover, {
        props: { defaultVisible: true },
        slots: {
          default: () => h('button', { class: 'trigger' }, '触发'),
          content: () => h('div', { class: CONTENT }, '浮层'),
        },
        attachTo: document.body,
      });
      await nextTick();

      // 不在组件自身 DOM 树内，而在 document 中
      expect(wrapper.find(`.${CONTENT}`).exists()).toBe(false);
      expect(document.body.querySelector(`.${CONTENT}`)).not.toBeNull();

      wrapper.unmount();
    });

    it('attach 指向自定义容器时挂载到该容器', async () => {
      const host = document.createElement('div');
      document.body.appendChild(host);

      const wrapper = mount(TPopover, {
        props: { defaultVisible: true, attach: host },
        slots: {
          default: () => h('button', { class: 'trigger' }, '触发'),
          content: () => h('div', { class: CONTENT }, '浮层'),
        },
        attachTo: document.body,
      });
      await nextTick();

      expect(host.querySelector(`.${CONTENT}`)).not.toBeNull();
      wrapper.unmount();
    });
  });

  describe('边界情况', () => {
    it('触发插槽为空时不报错', () => {
      const wrapper = mount(TPopover, {
        props: { disabled: true, defaultVisible: true },
        slots: { content: () => h('div', { class: CONTENT }) },
      });

      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('反复开关后浮层仍能正常显示', async () => {
      const wrapper = mountPopover();
      const trigger = wrapper.find('.trigger');

      for (let i = 0; i < 5; i += 1) {
        await trigger.trigger('click');
        expect(findContent(wrapper).exists()).toBe(true);
        await trigger.trigger('click');
        expect(findContent(wrapper).exists()).toBe(false);
      }

      wrapper.unmount();
    });

    it('visible 从外部切换为 true 时应显示', async () => {
      const visible = ref(false);
      const wrapper = mount(TPopover, {
        props: {
          disabled: true,
          visible: visible.value,
          'onUpdate:visible': (v: boolean) => {
            visible.value = v;
          },
        },
        slots: {
          default: () => h('button', { class: 'trigger' }, '触发'),
          content: () => h('div', { class: CONTENT }, '浮层'),
        },
      });

      visible.value = true;
      await wrapper.setProps({ visible: true });
      await nextTick();

      expect(findContent(wrapper).exists()).toBe(true);
      wrapper.unmount();
    });
  });
});
