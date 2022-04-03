import { defineComponent, renderSlot } from 'vue';
import { CommonOverlay } from '../base-overlay';
import { fixedOverlayProps, overlayEmits } from './fixed-overlay-types';
import type { FixedOverlayProps } from './fixed-overlay-types';
import { useOverlayLogic } from './use-fixed-overlay';
import './fixed-overlay.less';

export const FixedOverlay = defineComponent({
  name: 'TFixedOverlay',
  props: fixedOverlayProps,
  emits: overlayEmits,
  setup(props: FixedOverlayProps, ctx) {
    const { backgroundClass, overlayClass, handleBackdropClick, handleOverlayBubbleCancel } = useOverlayLogic(props, ctx);

    return () => (
      <CommonOverlay>
        {props.visible && (
          <div class={backgroundClass.value} style={props.backgroundStyle} onClick={handleBackdropClick}>
            <div class={overlayClass.value} style={props.overlayStyle} onClick={handleOverlayBubbleCancel}>
              {renderSlot(ctx.slots, 'default')}
            </div>
          </div>
        )}
      </CommonOverlay>
    );
  },
});
