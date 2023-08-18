import { type ComputedRef, defineComponent, type PropType, toRefs } from "vue";
import type { IInnerTreeNode } from "./type";
import { useTreeNode } from "./util";

export default defineComponent({
  name: "TTreeNodeContent",
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { nodeTitleClass, matchedContents, highlightCls } = useTreeNode(
      data as ComputedRef<IInnerTreeNode>
    );

    return () => {
      return (
        <span class={nodeTitleClass.value}>
          {!data.value?.matchedText && data.value?.label}
          {data.value?.matchedText &&
            matchedContents.value.map((item: string, index: number) =>
              index % 2 === 0 ? item : <span class={highlightCls}>{item}</span>
            )}
        </span>
      );
    };
  },
});
