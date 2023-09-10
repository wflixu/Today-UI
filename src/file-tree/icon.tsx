import { defineComponent, toRefs } from "vue";
import { ChevronRightMedIcon, SpinnerFilledIcon } from "../icon/index";
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { expanded, loading } = toRefs(props);
    return () => {
      return loading.value ? (
        <SpinnerFilledIcon size={14} />
      ) : (
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
