import { defineComponent, computed, SlotsType } from 'vue';
import { portalProps, type PortalProps, type PortalSlots } from './Portal.types';
import { usePortal, useScrollLock } from './usePortal';
import { renderPortal } from './renderPortal';

import './portal.css';

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
