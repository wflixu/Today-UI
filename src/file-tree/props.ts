import type { PropType } from "vue";
import type {
  ICheck,
  IDragdrop,
  IInnerTreeNode,
  IOperate,
  ITreeNode,
} from "./type";

const commonProps = {
  /**
   * 释放选中
   */
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false,
  },
  dragdrop: {
    type: [Boolean, Object] as PropType<IDragdrop>,
    default: false,
  },
  operate: {
    type: [Boolean, String, Array] as PropType<IOperate>,
    default: false,
  },
};
export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: [] as ITreeNode[],
  },
  ...commonProps,
  height: {
    type: [Number, String] as PropType<number | string>,
  },
};

export const treeNodeProps = {
  data: {
    type: Object as PropType<IInnerTreeNode>,
    default: {},
  },
  ...commonProps,
};
