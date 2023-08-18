import { defineComponent, getCurrentInstance } from "vue";
import { useNamespace } from "./util";

export default defineComponent({
  name: "TTreeNodeLoading",
  setup() {
    const app = getCurrentInstance();

    const ns = useNamespace("loading-children ");

    return () => {
      return <span class={ns.b()}>{`Loading...`}</span>;
    };
  },
});
