import { defineComponent } from 'vue';
import type {  FlexibleOverlayProps } from './flexible-overlay-types';
import { flexibleOverlayProps } from './flexible-overlay-types';
import { useOverlay } from './use-flexible-overlay';
import './flexible-overlay.less';

export const FlexibleOverlay = defineComponent({
  name: 'TFlexibleOverlay',
  inheritAttrs: false,
  props: flexibleOverlayProps,
  emits: ['update:modelValue', 'positionChange'],
  setup(props: FlexibleOverlayProps, { slots, attrs, emit, expose }) {
    const { arrowRef, overlayRef, updatePosition } = useOverlay(props, emit);
    expose({ updatePosition });

    return () =>
      props.modelValue && (
        <div ref={overlayRef} class='to-flexible-overlay' {...attrs}>
          {slots.default?.()}
          {props.showArrow && <div ref={arrowRef} class='to-flexible-overlay-arrow'></div>}
        </div>
      );
  },
});
