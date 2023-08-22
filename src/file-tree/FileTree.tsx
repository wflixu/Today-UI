import {
  defineComponent,
  ref,
  renderSlot,
  useSlots,
  type SetupContext,
  provide,
  getCurrentInstance,
  watch,
} from "vue";
import { type IInnerTreeNode, type TreeProps } from "./type";
import {
  TREE_INSTANCE,
  USE_TREE_TOKEN,
  formatBasicTree,
  useNamespace,
} from "./util";
import TTreeNode from "./TreeNode";
import TTreeNodeContent from "./TreeNodeContent";
import TTreeNodeToggle from "./TreeNodeToggle";
import TTreeNodeLoading from "./TreeNodeLoading";

import "./file-tree.css";
import { useTree } from "./use-tree";
import { useSelect } from "./use-select";
import { useOperate } from "./use-operate";
import { treeProps } from "./props";

export default defineComponent({
  name: "TFileTree",
  props: treeProps,
  emits: ["operate", "node-click", "select"],
  setup(props: TreeProps, context: SetupContext) {
    const { slots, expose } = context;
    const treeInstance = getCurrentInstance();
    const ns = useNamespace("file-tree");
    const data = ref<IInnerTreeNode[]>(formatBasicTree(props.data));

    const treeFactory = useTree(
      data.value,
      [useSelect(), useOperate()],
      context
    );

    const { setTree, getExpendedTree, toggleNode } = treeFactory;

    provide(USE_TREE_TOKEN, treeFactory);
    provide(TREE_INSTANCE, treeInstance);
    // 外部同步内部
    watch(data, setTree);

    watch(
      () => props.data,
      (newVal) => {
        data.value = formatBasicTree(newVal);
      }
    );
    const onOperate = (key: string, data: any) => {
      context.emit("operate", { key, node: data });
    };
    expose({
      treeFactory,
    });

    const renderTreeNode = (treeNode: IInnerTreeNode) => (
      <TTreeNode data={treeNode} key={treeNode.id} onOperate={onOperate}>
        {{
          default: () =>
            slots.content ? (
              renderSlot(useSlots(), "content", { nodeData: treeNode })
            ) : (
              <TTreeNodeContent data={treeNode} />
            ),
          icon: () =>
            slots.icon ? (
              renderSlot(useSlots(), "icon", {
                nodeData: treeNode,
                toggleNode,
              })
            ) : (
              <TTreeNodeToggle data={treeNode} />
            ),
          loading: () =>
            slots.loading ? (
              renderSlot(useSlots(), "loading", { nodeData: treeNode })
            ) : (
              <TTreeNodeLoading />
            ),
        }}
      </TTreeNode>
    );

    return () => {
      const treeData = getExpendedTree?.().value ?? [];
      return <div class="t-file-tree">{treeData?.map(renderTreeNode)}</div>;
    };
  },
});
