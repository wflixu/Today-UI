import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

/**
 * 定位配置的回归守护。
 *
 * 本次重构的核心修复之一：既有三个弹出组件（Dropdown / Tooltip / Dialog）
 * 都没有向 `useFloating` 传 `whileElementsMounted`，floating-ui 因此只在首次
 * 计算一次位置 —— 滚动、resize、祖先容器尺寸变化时浮层不会重算，会跟丢锚点。
 *
 * 这个行为没法通过观察位置变化来断言：jsdom 没有布局引擎，也缺 ResizeObserver，
 * `isPositioned` 永远是 false。所以改为拦截 `useFloating` 的调用参数，直接检查
 * 配置是否传了。
 */

const useFloatingCalls: unknown[][] = [];

vi.mock('@floating-ui/vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@floating-ui/vue')>();
  return {
    ...actual,
    useFloating: (...args: unknown[]) => {
      useFloatingCalls.push(args);
      return (actual.useFloating as (...a: unknown[]) => unknown)(...args);
    },
  };
});

const { default: TPopover } = await import('../Popover');

describe('Popover 定位配置', () => {
  beforeEach(() => {
    useFloatingCalls.length = 0;
  });

  it('必须传入 whileElementsMounted: autoUpdate，否则滚动时浮层不跟随', async () => {
    const wrapper = mount(TPopover, {
      props: { disabled: true, defaultVisible: true },
      slots: {
        default: () => h('button', { class: 'trigger' }, '触发'),
        content: () => h('div', '浮层'),
      },
      attachTo: document.body,
    });
    await nextTick();

    expect(useFloatingCalls.length).toBeGreaterThan(0);

    const options = useFloatingCalls[0][2] as Record<string, unknown>;
    expect(
      options.whileElementsMounted,
      '未传 whileElementsMounted —— 滚动/resize 时位置不会重算',
    ).toBeDefined();
    expect(typeof options.whileElementsMounted).toBe('function');

    wrapper.unmount();
  });

  it('placement 与 strategy 应透传给 useFloating', async () => {
    const wrapper = mount(TPopover, {
      props: { disabled: true, defaultVisible: true, placement: 'top-end', strategy: 'fixed' },
      slots: {
        default: () => h('button', { class: 'trigger' }, '触发'),
        content: () => h('div', '浮层'),
      },
      attachTo: document.body,
    });
    await nextTick();

    const options = useFloatingCalls[0][2] as Record<string, unknown>;
    expect(options.placement).toBe('top-end');
    expect(options.strategy).toBe('fixed');

    wrapper.unmount();
  });

  it('withArrow 应多注册一个 arrow 中间件', async () => {
    // middleware 以 computed ref 形式传入，取值时要解包
    const middlewareCount = (): number => {
      const mw = (useFloatingCalls[0][2] as Record<string, unknown>).middleware;
      const list = Array.isArray(mw) ? mw : ((mw as { value?: unknown[] })?.value ?? []);
      return list.length;
    };

    const mountWith = (withArrow: boolean) =>
      mount(TPopover, {
        props: { disabled: true, defaultVisible: true, withArrow },
        slots: {
          default: () => h('button', { class: 'trigger' }, '触发'),
          content: () => h('div', '浮层'),
        },
        attachTo: document.body,
      });

    const plain = mountWith(false);
    await nextTick();
    const plainCount = middlewareCount();
    plain.unmount();

    useFloatingCalls.length = 0;

    const arrow = mountWith(true);
    await nextTick();
    const arrowCount = middlewareCount();
    arrow.unmount();

    expect(arrowCount).toBe(plainCount + 1);
  });
});
