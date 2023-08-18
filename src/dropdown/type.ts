




import type { ExtractPropTypes, PropType } from "vue";


export type TriggerType = 'click' | 'hover' | 'contextmenu'| 'manually';
export type CloseScopeArea = 'all' | 'blank' | 'none';

export interface IDropdownOption {
    label:string,
    key:string|number,
}


export const dropdownProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  attach: {
    type: String as PropType<'body'| 'ref'>,
    default:'body'
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: "click",
  },
  options: {
    type: Array as PropType<Array<IDropdownOption>>,
    // default: function () {
    //     return [] as Array<IDropdownOption>;
    // }
  }
//   closeScope: {
//     type: String as PropType<CloseScopeArea>,
//     default: "all",
//   },
//   position: {
//     type: Array as PropType<Array<Placement>>,
//     default: ["bottom"],
//   },
//   align: {
//     type: String as PropType<Alignment> | null,
//     default: null,
//   },
//   offset: {
//     type: [Number, Object] as PropType<number | OffsetOptions>,
//     default: 4,
//   },
//   shiftOffset: {
//     type: Number,
//   },
//   closeOnMouseLeaveMenu: {
//     type: Boolean,
//     default: false,
//   },
//   showAnimation: {
//     type: Boolean,
//     default: true,
//   },
//   overlayClass: {
//     type: String,
//     default: "",
//   },
//   destroyOnHide: {
//     type: Boolean,
//     default: true,
//   },
};


export type IDropdownProps = ExtractPropTypes<typeof dropdownProps>;
