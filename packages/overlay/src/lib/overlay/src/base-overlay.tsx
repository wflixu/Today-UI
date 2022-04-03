import { defineComponent, renderSlot, Teleport, Transition } from 'vue';
import './base-overlay.less';

export const CommonOverlay = defineComponent({
  setup(props, ctx) {
    return () => (
      <Teleport to="#t-overlay-anchor">
        <Transition name="to-overlay-fade">
          {renderSlot(ctx.slots, 'default')}
        </Transition>
      </Teleport>
    );
  },
});
