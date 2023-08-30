import { ref } from 'vue';
import type { MenuProps } from './type';


export const useMeun = (props: MenuProps) => {
    const hasIcon = ref(false);
    const hasMarker = ref(false);

    props.options.forEach(item=>{
        if(item.icon) {
            hasIcon.value = true
        }
    })
    return {
        hasIcon,
        hasMarker 
    }
}