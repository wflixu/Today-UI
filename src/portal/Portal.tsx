import { defineComponent, computed, SlotsType } from 'vue';
import { portalProps, type PortalProps, type PortalSlots } from './Portal.types';
import { usePortal, useScrollLock } from './usePortal';
import { renderPortal } from './renderPortal';

// 注意：这里**不** import './portal.css'。
// CSS 由 src/style/index.css 统一引入（src/index.ts 会加载它），这是唯一的入口。
// 若组件再自己 import 一次，Vite 会把同一份 CSS 收进产物两次 —— 实测
// .t-button / .t-menu 等既有组件都有这个重复（详见 specs/component-roadmap.md 的欠账）。

export const TPortal = defineComponent({
  name: 'TPortal',
  props: portalProps,
  slots: Object as SlotsType<PortalSlots>,
  setup(props: PortalProps, { slots }) {
    const state = usePortal(props);

    // 滚动锁是副作用，不能放在 computed 里 —— computed 依赖不变时不会重算，
    // 锁状态会与 prop 脱节。这里用独立 computed 直接跟随 props。
    useScrollLock(computed(() => props.lockScroll));

    return () => renderPortal(state.value, slots);
  },
});

export default TPortal;
