import type { PropType } from "vue";
import type { ITabOption } from "./type";


export const tabsProps = {
    options: {
        type: Array as PropType<Array<ITabOption>>,
        default: function () {
            return [] as Array<ITabOption>;
        }
    },
    activeKey: {
        type: String as PropType<string>,
        default: ""
    }
}