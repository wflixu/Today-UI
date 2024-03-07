import { defineComponent } from "vue";
import "./toast.css";
export default defineComponent({
  name: "TToast",
  setup(props, { slots }) {
    return () => {
      return (
        <>
          <div class="t-toast-provider">
            <div class="t-toast">
              <h1>Totast</h1>
              <div class="t-toast-media"></div>
              <div class="t-toast-title">
                {slots.default && slots.default()}
              </div>
              <div class="t-toast-actions"></div>
            </div>
          </div>
        </>
      );
    };
  },
});
