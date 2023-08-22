import type { Ref, SetupContext } from "vue";

import type {
  IInnerTreeNode,
  IUseCore,
  IUseSelect,
  IUseInitSelectCollection,
} from "./type";

let selectedNodes: IInnerTreeNode[] = [];

export function useInitSelectCollection(): IUseInitSelectCollection {
  const setInitSelectedNode = (node: IInnerTreeNode): void => {
    selectedNodes.push(node);
  };

  const getInitSelectedNodes = (): IInnerTreeNode[] => {
    return selectedNodes;
  };

  const clearInitSelectedNodes = (): void => {
    selectedNodes = [];
  };

  return {
    setInitSelectedNode,
    getInitSelectedNodes,
    clearInitSelectedNodes,
  };
}

export function useSelect() {
  return function useSelectFn(
    data: Ref<IInnerTreeNode[]>,
    core: IUseCore,
    context: SetupContext,
    ...args: any[]
  ): IUseSelect {
    const { setNodeValue } = core;
    const { getInitSelectedNodes, clearInitSelectedNodes } =
      useInitSelectCollection();

    let prevActiveNode: IInnerTreeNode;

    const selectNode = (node: IInnerTreeNode): void => {
      if (node.disableSelect) {
        return;
      }

      const initSelectedNodes = getInitSelectedNodes();
      if (initSelectedNodes.length) {
        initSelectedNodes.forEach((item) => {
          setNodeValue(item, "selected", false);
        });
        clearInitSelectedNodes();
      }

      if (prevActiveNode) {
        const prevActiveNodeIndex = data.value.findIndex(
          (item) => item.id === prevActiveNode.id
        );
        setNodeValue(data.value[prevActiveNodeIndex], "selected", false);
      }

      setNodeValue(node, "selected", true);
      context.emit("select", node);
      prevActiveNode = node;
    };

    const deselectNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, "selected", false);
      context.emit("select", node);
    };

    const toggleSelectNode = (node: IInnerTreeNode): void => {
      if (node.selected) {
        deselectNode(node);
      } else {
        selectNode(node);
      }
    };

    const getSelectedNode = (): IInnerTreeNode => {
      return data.value.find((node) => node.selected)!;
    };

    return {
      selectNode,
      deselectNode,
      toggleSelectNode,
      getSelectedNode,
    };
  };
}
