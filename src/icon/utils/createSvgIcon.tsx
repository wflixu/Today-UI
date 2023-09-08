import type { SvgIconCreateFnParams } from "./../types";
import "../icon.css";

import { defineComponent, toRefs, type HTMLAttributes, computed } from "vue";
const createSvgIcon = ({ svg, displayName }: SvgIconCreateFnParams) => {
  const Component = defineComponent({
    name: displayName,
    props: {
      /**
       * size of the icon.
       */
      size: {
        type: [Number, String],
        default: "#999",
      },
      color: String,
    },
    setup(props, { attrs }) {
      const { size, color } = toRefs(props);
      console.log(size.value, color.value);
      const styleObj = computed(() => {
        let res: { width?: string; height?: string; color?: string } = {};
        if (size.value) {
          const sizeStr =
            typeof size.value == "number" ? size.value + "px" : size.value;
          res.width = sizeStr;
          res.height = sizeStr;
        }
        if (color.value) {
          res.color = color.value;
        }

        return res;
      });
      const classes = {
        svg: "svg",
      };
      return () => {
        return (
          <span class="t-icon" style={styleObj.value} {...attrs}>
            {svg({ classes })}
          </span>
        );
      };
    },
  });

  return Component;
};

export default createSvgIcon;
