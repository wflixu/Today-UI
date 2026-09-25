import { defineComponent, h, SlotsType } from 'vue';
import TPopover from '../popover/Popover';
import TMenu from '../menu/Menu';
import {
  dropdownProps,
  type DropdownProps,
  type DropdownSlots,
  type IDropdownOption,
} from './Dropdown.types';

import './dropdown.css';

export const TDropdown = defineComponent({
  name: 'TDropdown',
  props: dropdownProps,
  slots: Object as SlotsType<DropdownSlots>,
  emits: ['update:visible', 'toggle', 'select'],
  setup(props: DropdownProps, { emit, slots }) {
    const onSelect = (item: IDropdownOption, event: Event) => {
      emit('select', item, event);
    };

    /**
     * 开合变化。
     *
     * 迁移前 `visible` 是**单向** prop：外部改它内部会同步，但内部开合不会回写，
     * 也没有 `update:visible` —— 使用者无法用 v-model 绑定（且首次 immediate
     * 调用被 `oldVal === undefined` 直接跳过）。现在补上真正的 v-model，
     * 同时保留 `toggle` 事件避免破坏既有用法。
     */
    const onVisibleChange = (visible: boolean) => {
      emit('update:visible', visible);
      emit('toggle', visible);
    };

    return () =>
      // 参数全部透传给 Popover —— 定位、触发、关闭行为都由它承担。
      // 迁移前 Dropdown 自己调 useFloating、自建 FloatTrigger、自管 document 监听，
      // 与 Tooltip / Dialog 是三份互不相干的实现。
      h(
        TPopover,
        {
          visible: props.visible,
          defaultVisible: props.defaultVisible,
          trigger: props.trigger,
          placement: props.placement,
          offset: props.offset,
          attach: props.attach,
          disabled: props.disabled,
          triggerClass: 't-dropdown-ref',
          contentClass: 't-dropdown-menu',
          'onUpdate:visible': onVisibleChange,
        },
        {
          default: () => slots.default?.(),
          content: () => slots.menu?.() ?? h(TMenu, { options: props.options, onSelect }),
        },
      );
  },
});

export default TDropdown;
