import { Teleport, defineComponent, provide, ref } from "vue";
import props from "./props";
import FloatTrigger, { FLOAT_TRIGGER_TOKEN } from "./FloatTrigger";

export default defineComponent({
  name: "TDropdown",
  components: {
    FloatTrigger,
  },
  props,
  setup(props, { slots }) {
    const origin = ref<HTMLElement | undefined>();
    provide(FLOAT_TRIGGER_TOKEN, origin);
    return () => {
      return (
        <>
          <FloatTrigger>{slots.default?.()}</FloatTrigger>
          <Teleport to="body">
            <div class="t-dropdown-menu">{slots.menu?.()}</div>
          </Teleport>
        </>
      );
    };
  },
});
