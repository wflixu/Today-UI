import { computed, defineComponent, SlotsType } from 'vue';
import { popoverProps, type PopoverProps, type PopoverSlots } from './Popover.types';
import { usePopover } from './usePopover';
import { usePopoverTrigger } from './usePopoverTrigger';
import { renderPopover } from './renderPopover';

export const TPopover = defineComponent({
  name: 'TPopover',
  props: popoverProps,
  slots: Object as SlotsType<PopoverSlots>,
  emits: ['update:visible', 'visibleChange'],
  setup(props: PopoverProps, { emit, expose, slots }) {
    const popover = usePopover(props, (visible) => {
      emit('update:visible', visible);
      emit('visibleChange', visible);
    });

    const { wrapTrigger, contentHandlers } = usePopoverTrigger({
      trigger: props.trigger,
      triggerRef: popover.triggerRef,
      toggle: popover.toggle,
      openWithDelay: popover.openWithDelay,
      closeWithDelay: popover.closeWithDelay,
      clearTimers: popover.clearTimers,
      triggerClass: props.triggerClass,
    });

    expose({
      update: popover.update,
      triggerRef: popover.triggerRef,
      floatingRef: popover.floatingRef,
      arrowRef: popover.arrowRef,
      setOpen: popover.setOpen,
      toggle: popover.toggle,
    });

    const context = computed(() => ({
      visible: popover.isOpen.value,
      positioned: popover.isPositioned.value,
      placement: popover.state.value.currentPlacement,
      floatingStyles: popover.state.value.floatingStyles,
      arrowStyles: popover.state.value.arrowStyles,
      withArrow: props.withArrow,
      attach: props.attach,
      disabled: props.disabled,
      lockScroll: props.lockScroll,
      contentHandlers,
      contentClass: props.contentClass,
      arrowClass: props.arrowClass,
      floatingRef: popover.floatingRef,
      arrowRef: popover.arrowRef,
    }));

    return () => renderPopover(context.value, slots, wrapTrigger);
  },
});

export default TPopover;
