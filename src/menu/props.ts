import type { PropType } from "vue";
import type { IMenuOption } from "./type";


export const menuProps = {
      options: {
        type: Array as PropType<Array<IMenuOption>>,
        default: function () {
            return [] as Array<IMenuOption>;
        }
      }
}