import { defineComponent, type PropType, toRefs, inject } from "vue";

import { IconToggle } from "./icon";

import type { IInnerTreeNode, ITreeNode, IUseTree } from "./type";
import { USE_TREE_TOKEN, useNamespace } from "./util";

export default defineComponent({
  name: "TTreeNodeToggle",
  props: {
    data: {
      type: Object as PropType<ITreeNode>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { toggleNode } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;
    const ns = useNamespace("file-tree");

    return () => {
      return (
        <span
          class={[
            ns.e("node-folder"),
            data.value?.disableToggle && "toggle-disabled",
          ]}
          onClick={(event: MouseEvent) => {
            event.stopPropagation();

            if (toggleNode) {
              toggleNode(data.value as IInnerTreeNode);
            }
          }}
        >
          {data.value.isLeaf ? (
            <span class={ns.e("node-indent")} />
          ) : (
            <IconToggle expanded={data.value.expanded} />
          )}
        </span>
      );
    };
  },
});
