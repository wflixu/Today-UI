import { computed, defineComponent, SlotsType } from 'vue';
import { dialogProps, type DialogProps, type DialogSlots } from './Dialog.types';
import { useDialog } from './useDialog';
import { usePopoverTrigger } from '../popover/usePopoverTrigger';
import { renderDialog } from './renderDialog';

export const TDialog = defineComponent({
  name: 'TDialog',
  props: dialogProps,
  slots: Object as SlotsType<DialogSlots>,
  emits: ['update:show', 'confirm'],
  setup(props: DialogProps, { emit, expose, slots }) {
    const dialog = useDialog(props, (event, value) => emit(event, value));

    // 复用 Popover 的触发元素处理。
    // Dialog 不做定位，所以只用触发部分，不需要 useFloating 那套机制。
    // 触发方式固定为 click。
    const { wrapTrigger } = usePopoverTrigger({
      trigger: 'click',
      triggerRef: dialog.triggerRef,
      toggle: dialog.toggle,
    });

    const onConfirm = () => {
      emit('confirm');
      dialog.requestClose();
    };

    expose({
      setShow: dialog.setShow,
      requestClose: dialog.requestClose,
      toggle: dialog.toggle,
      triggerRef: dialog.triggerRef,
    });

    const context = computed(() => ({
      state: dialog.state.value,
      attach: props.attach,
      disabled: props.disabled,
      lockScroll: props.lockScroll,
      onOverlayClick: dialog.onOverlayClick,
      onCancel: dialog.requestClose,
      onConfirm,
    }));

    return () => renderDialog(context.value, slots, wrapTrigger);
  },
});

export default TDialog;
