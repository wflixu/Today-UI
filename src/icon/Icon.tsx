import { computed, defineComponent, toRefs, type PropType, unref } from "vue";
import { ICONS } from "./icons";

export default defineComponent({
  name: "TIcon",
  props: {
    name: String as PropType<string>,
  },
  setup(props, { attrs }) {
    const { name } = toRefs(props);

    const content = computed<JSX.Element | null>(() => {
      let value = unref(name);
      if (!value) {
        return null;
      } else {
        return ICONS[value];
      }
    });
    return () => {
      return (
        <span class="t-icon" {...attrs}>
          {content.value}
        </span>
      );
    };
  },
});
