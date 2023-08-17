import { defineComponent } from "vue";
import { IInnerTreeNode, TreeProps, treeProps } from "./type";
import "./file-tree.css";

export default defineComponent({
  name: "TFileTree",
  props: treeProps,
  setup(props: TreeProps, { slots, attrs }) {
    const renderTreeNode = (treeNode: IInnerTreeNode) =>
      slots.default ? (
        renderSlot(useSlots(), "default", {
          treeFactory: treeFactory,
          nodeData: treeNode,
        })
      ) : (
        <TreeNode
          data={treeNode}
          check={check.value}
          dragdrop={dragdrop.value}
          operate={operate.value}
          key={treeNode.id}
        >
          {{
            default: () =>
              slots.content ? (
                renderSlot(useSlots(), "content", { nodeData: treeNode })
              ) : (
                <DTreeNodeContent data={treeNode} />
              ),
            icon: () =>
              slots.icon ? (
                renderSlot(useSlots(), "icon", {
                  nodeData: treeNode,
                  toggleNode,
                })
              ) : (
                <DTreeNodeToggle data={treeNode} />
              ),
            loading: () =>
              slots.loading ? (
                renderSlot(useSlots(), "loading", { nodeData: treeNode })
              ) : (
                <DTreeNodeLoading />
              ),
          }}
        </TreeNode>
      );

    return () => {
      return <div class="t-file-tree">File tree</div>;
    };
  },
});
