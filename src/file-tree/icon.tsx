import { defineComponent, toRefs } from "vue";
import { ChevronRightMedIcon } from "../icon/index";
export const IconToggle = defineComponent({
  name: "TreeIconToggle",
  components: {
    ChevronRightMedIcon,
  },
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { expanded } = toRefs(props);
    return () => {
      return (
        <ChevronRightMedIcon
          size={14}
          style={{
            transform: expanded.value ? "rotate(90deg)" : "",
            cursor: "pointer",
          }}
        />
      );
    };
  },
});
