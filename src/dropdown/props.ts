import type { PropType, ExtractPropTypes } from 'vue';


import { TDropdownProps } from './type';


export default {
    /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
    attach: {
        type: [String, Function] as PropType<TDropdownProps['attach']>,
        default: 'body',
    },
}
