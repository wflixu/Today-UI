import { computed, defineComponent, SlotsType, watch } from 'vue';
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
    const popover = usePopover(props);
    const { wrapTrigger, contentHandlers } = usePopoverTrigger(props, popover);

    // 状态变化时向外通知。
    // 用 watch 而不是在 setOpen 里 emit：受控模式下状态由 props 驱动，
    // 内部 setOpen 不会改状态，但使用者仍需要知道「有人请求关闭」。
    watch(popover.isOpen, (visible, prev) => {
      if (visible === prev) return;
      emit('update:visible', visible);
      emit('visibleChange', visible);
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
      floatingRef: popover.floatingRef,
      arrowRef: popover.arrowRef,
    }));

    return () => renderPopover(context.value, slots, wrapTrigger);
  },
});

export default TPopover;
