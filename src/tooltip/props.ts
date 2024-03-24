import type { PropType, ExtractPropTypes } from "vue";

import type { Placement } from "@floating-ui/vue";
import type { AttachNode } from "@/shared/type";

export const tooltipProps = {
  /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<AttachNode>,
    default: "body",
  },
  placement: {
    type: String as PropType<Placement>,
    default: "bottom",
  },
  label: {
    type: String,
    default: "default tip content",
  },
  /** 是否显示浮层 */
  visible: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: Number,
    default: 0,
  },
};
