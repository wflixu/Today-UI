import type { PropType, ExtractPropTypes } from 'vue';

import type { Placement } from 'use-floating';

import { TTooltipProps } from './type';


export default {
    /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
    attach: {
        type: [String, Function] as PropType<TTooltipProps['attach']>,
        default: 'body',
    },
    placement: {
        type: String as PropType<TTooltipProps['placement']>,
        default: 'bottom'
    },
    label: {
        type: String,
        default: "default tip content"
    },
    /** 是否显示浮层 */
    visible: {
        type: Boolean,
        default: undefined,
    },
    offset: {
        type: Number,
        default: 0
    }
}
