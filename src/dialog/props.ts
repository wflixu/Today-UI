import type { PropType, ExtractPropTypes } from 'vue';


import { TDialogProps } from './type';


export default {

    /** 是否显示浮层 */
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '请设置标题'
    },
    width: {
        type: [String, Number],
        default: '800px'
    }
}
