import {
  computed,
  defineComponent,
  onMounted,
  provide,
  ref,
  Teleport,
  watch,
} from "vue";
import props from "./props";
import "./style.less";
import { DIALOG_TRIGGER_TOKEN } from "./util";
import DialogTrigger from "./DialogTrigger";
import TButton from "./../button/Button";

export default defineComponent({
  name: "TDialog",
  props,
  emits: ["update:show"],
  setup(props, { slots, emit }) {
    const triggerRef = ref<HTMLElement | undefined>();
    provide(DIALOG_TRIGGER_TOKEN, triggerRef);

    const visibleStyleObj = computed(() => {
      return {
        display: props.show ? "" : "none",
      };
    });
    watch([triggerRef], () => {
      if (triggerRef.value) {
        triggerRef.value.addEventListener("click", () => {
          emit("update:show", !props.show);
        });
      }
    });

    const onCancel = () => {
      emit("update:show", false);
    };

    return () => {
      return (
        <>
          <DialogTrigger>{slots.default && slots.default()}</DialogTrigger>
          <Teleport to="body">
            <div class="t-overlay" style={visibleStyleObj.value}>
              <div class="t-dialog">
                <div class="t-dialog-body">
                  <div class="header">{props.title}</div>
                  <div class="content">{slots.content && slots.content()}</div>
                  <div class="actions">
                    <TButton onClick={onCancel}>取消</TButton>
                    <TButton type="primary">确认</TButton>
                  </div>
                </div>
              </div>
            </div>
          </Teleport>
        </>
      );
    };
  },
});
