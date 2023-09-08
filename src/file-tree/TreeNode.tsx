import {
  defineComponent,
  toRefs,
  type ComputedRef,
  renderSlot,
  useSlots,
  inject,
  type ComponentInternalInstance,
} from "vue";
import {
  type IInnerTreeNode,
  type TreeNodeProps,
  type IUseTree,
  type ITreeContextMenu,
} from "./type";
import {
  useNamespace,
  omit,
  useTreeNode,
  NODE_HEIGHT,
  USE_TREE_TOKEN,
  TREE_INSTANCE,
} from "./util";
import TTreeNodeToggle from "./TreeNodeToggle";

import TDropdown from "../dropdown/Dropdown";
import { treeNodeProps } from "./props";

export default defineComponent({
  name: "TTreeNode",
  inheritAttrs: false,
  props: treeNodeProps,
  emits: ["operate"],
  setup(props: TreeNodeProps, { slots, emit }) {
    const { data } = toRefs(props);
    const ns = useNamespace("file-tree");
    const {
      nodeClass,
      nodeStyle,
      nodeContentClass,
      nodeVLineClass,
      nodeVLineStyles,
      nodeHLineClass,
      nodeTitleClass,
    } = useTreeNode(data as ComputedRef<IInnerTreeNode>);
    const { toggleNode, toggleSelectNode, getChildren, getNode } = inject(
      USE_TREE_TOKEN
    ) as Partial<IUseTree>;
    const treeInstance = inject(
      TREE_INSTANCE
    ) as ComponentInternalInstance | null;

    const handleOperate = (option: ITreeContextMenu, event: any) => {
      emit("operate", option.key, data);
    };
    const handleDbClick = (event: MouseEvent) => {
      treeInstance?.emit("dbclick", data.value, event);
    };

    return () => {
      return (
        <div
          class={nodeClass.value}
          style={nodeStyle.value}
          onDblclick={handleDbClick}
        >
          {nodeVLineStyles.value.map((item: any) => (
            <span class={nodeVLineClass.value} style={item}></span>
          ))}

          <span
            class={nodeHLineClass.value}
            style={omit(nodeVLineStyles.value[0], ["height", "top"])}
          ></span>
          {data.value.contextMenu ? (
            <TDropdown
              options={data.value.contextMenu}
              trigger="contextmenu"
              onSelect={handleOperate}
            >
              <div
                class={nodeContentClass.value}
                onClick={() => {
                  toggleSelectNode?.(data.value);
                  treeInstance?.emit("node-click", data.value);
                }}
              >
                <div
                  class={ns.em("node-content", "value-wrapper")}
                  style={{ height: `${NODE_HEIGHT}px` }}
                >
                  {slots.icon ? (
                    renderSlot(useSlots(), "icon", {
                      nodeData: data,
                      toggleNode,
                    })
                  ) : (
                    <TTreeNodeToggle data={data.value} />
                  )}
                  <span class={nodeTitleClass.value}>{data.value?.label}</span>
                </div>
              </div>
            </TDropdown>
          ) : (
            <div
              class={nodeContentClass.value}
              onClick={() => {
                toggleSelectNode?.(data.value);
                treeInstance?.emit("node-click", data.value);
              }}
            >
              <div
                class={ns.em("node-content", "value-wrapper")}
                style={{ height: `${NODE_HEIGHT}px` }}
              >
                {slots.icon ? (
                  renderSlot(useSlots(), "icon", { nodeData: data, toggleNode })
                ) : (
                  <TTreeNodeToggle data={data.value} />
                )}
                <span class={nodeTitleClass.value}>{data.value?.label}</span>
              </div>
            </div>
          )}
        </div>
      );
    };
  },
});
