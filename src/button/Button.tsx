import { defineComponent, toRefs, watch } from "vue";
import { buttonProps } from "./props";
import "./button.css";
export default defineComponent({
  name: "TButton",
  props: buttonProps,
  emits: ["click"],
  setup(props, { slots, emit }) {
    const { disabled, shape, type } = toRefs(props);
    let shapeCls = "";
    let typeCls = "";
    const onClick = (e: MouseEvent) => {
      emit("click", e);
    };

    watch(
      () => shape.value,
      (val) => {
        shapeCls = val == "rounded" ? "" : `shape-${val}`;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => type.value,
      (val) => {
        typeCls = val == "default" ? "" : `type-${val}`;
      },
      {
        immediate: true,
      }
    );
    return () => {
      return (
        <button
          class={["t-button", shapeCls, typeCls]}
          disabled={disabled.value}
          onClick={onClick}
        >
          {slots.icon ? slots.icon() : null}
          <span class="t-button-content">{slots.default?.()}</span>
        </button>
      );
    };
  },
});
