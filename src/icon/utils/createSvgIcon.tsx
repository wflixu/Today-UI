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
        default: undefined,
      },
      color: String,
    },
    setup(props, { attrs }) {
      const { size, color } = toRefs(props);

      const styleObj = computed(() => {
        const res: { width?: string; height?: string; color?: string } = {};
        if (size.value) {
          const sizeStr = typeof size.value === "number" ? `${size.value}px` : size.value;
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
        // 调用 svg 函数，传入 classes
        const svgElement = svg({ classes });

        // 直接渲染 SVG 元素，不添加额外的 span 包装
        return (
          <span class="t-icon" style={styleObj.value} {...attrs}>
            {svgElement}
          </span>
        );
      };
    },
  });

  return Component;
};

export default createSvgIcon;
