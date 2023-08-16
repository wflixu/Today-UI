import { computed, defineComponent, Teleport } from "vue";
import props from "./props";
import "./style.less";

export default defineComponent({
  name: "TDialog",
  props,
  setup(props, { slots }) {
    const visibleStyleObj = computed(() => {
      return {
        display: props.show ? "" : "none",
      };
    });
    return {
      visibleStyleObj,
    };
  },
  render() {
    const { title, visibleStyleObj } = this;
    return (
      <Teleport to="body">
        <div class="t-overlay" style={visibleStyleObj}>
          <div class="t-dialog">
            <div class="header">{title}</div>
            <div class="body">
              <slot></slot>
            </div>
            <div class="footer">
              <button>取消</button>
              <button>确认</button>
            </div>
          </div>
        </div>
      </Teleport>
    );
  },
});
