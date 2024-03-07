import type { TToastProps } from './type';
import type { PropType } from "vue";


export default {
    intent:{
        type:[String] as PropType<TToastProps['intent']>,
        default: 'info'
    },
    position:{
        type:[String] as PropType<TToastProps['position']>,
        default: 'bottom'
    },
    timeout: {
        type: Number as PropType<TToastProps['timeout']>,
        default: 1000,
    },
    offset: {
        type: Object as PropType<TToastProps['offet']>,
        default:function () {
          return {
            horizontal:16,
            vertical: 40
          }
        }
    }
   
}
