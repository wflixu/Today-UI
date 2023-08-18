import { defineComponent, toRefs } from "vue";

export const IconToggle = defineComponent({
  name: "TreeIconToggle",
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
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 1024 1024"
          version="1.1"
          style={{
            transform: expanded.value ? "rotate(90deg)" : "",
            cursor: "pointer",
          }}
          xmlns="http://www.w3.org/2000/svg"
          class="svg-icon"
        >
          <path
            d="M204.58705 951.162088 204.58705 72.836889 819.41295 511.998977Z"
            fill="#8a8e99"
          ></path>
        </svg>
      );
    };
  },
});
