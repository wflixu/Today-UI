
import type {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  Ref,
  SetupContext,
} from "vue";

export type UseNamespace = {
  b: () => string;
  e: (el: string) => string;
  m: (mo: string) => string;
  em: (el: string, mo: string) => string;
};

export type ICheckStrategy = "upward" | "downward" | "both" | "none";

export type ICheck = boolean | ICheckStrategy;

export interface TreeContextMenu {
  key:string;
  label: string;
  icon?: string;
}

// 外部数据结构先只考虑嵌套结构
export interface ITreeNode {
  label: string;
  id?: string;
  children?: ITreeNode[];

  selected?: boolean;
  checked?: boolean;
  expanded?: boolean;

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
  isLeaf?: boolean;

  contextMenuType?: string;
  contextMenu?: TreeContextMenu[]
}

export interface IDropType {
  dropPrev?: boolean;
  dropNext?: boolean;
  dropInner?: boolean;
}
export type IDragdrop = boolean | IDropType;

export type IOperateItem = "add" | "delete" | "edit";

export type IOperate = boolean | IOperateItem | Array<IOperateItem>;

// 内部数据结构使用扁平结构
export interface IInnerTreeNode extends ITreeNode {
  id: string;
  level: number;
  idType?: "random";
  parentId?: string;
  isLeaf?: boolean;
  parentChildNodeCount?: number;
  currentIndex?: number;
  loading?: boolean; // 节点是否显示加载中
  childNodeCount?: number; // 该节点的子节点的数量
  isMatched?: boolean; // 搜索过滤时是否匹配该节点
  childrenMatched?: boolean; // 搜索过滤时是否有子节点存在匹配
  isHide?: boolean; // 过滤后是否不显示该节点
  matchedText?: string; // 节点匹配的文字（需要高亮显示）
}

const commonProps = {
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false,
  },
  dragdrop: {
    type: [Boolean, Object] as PropType<IDragdrop>,
    default: false,
  },
  operate: {
    type: [Boolean, String, Array] as PropType<IOperate>,
    default: false,
  },
};
export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: [] as ITreeNode[],
  },
  ...commonProps,
  height: {
    type: [Number, String] as PropType<number | string>,
  },
};

export const treeNodeProps = {
  data: {
    type: Object as PropType<IInnerTreeNode>,
    default: {},
  },
  ...commonProps,
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;

export type valueof<T> = T[keyof T];

export interface IUseCore {
  getLevel: (node: IInnerTreeNode) => number;
  getChildren: (
    node: IInnerTreeNode,
    config?: {
      expanded?: boolean;
      recursive?: boolean;
    }
  ) => IInnerTreeNode[];
  clearNodeMap: () => void;
  getParent: (node: IInnerTreeNode) => IInnerTreeNode;
  getExpendedTree: () => ComputedRef<IInnerTreeNode[]>;
  getIndex: (node: IInnerTreeNode) => number;
  getNode: (node: IInnerTreeNode) => IInnerTreeNode;
  setNodeValue: (
    node: IInnerTreeNode,
    key: keyof IInnerTreeNode,
    value: valueof<IInnerTreeNode>
  ) => void;
  setTree: (newTree: IInnerTreeNode[]) => void;
  getTree: () => IInnerTreeNode[];
}

export interface IUseToggle {
  expandNode: (node: IInnerTreeNode) => void;
  collapseNode: (node: IInnerTreeNode) => void;
  toggleNode: (node: IInnerTreeNode) => void;
  expandAllNodes: () => void;
}

export type IUseTree = {
  treeData: Ref<IInnerTreeNode[]>;
} & IUseCore &
  IUseToggle &
  IUseSelect;

export interface IUseLazyLoad {
  lazyLoadNodes: (node: IInnerTreeNode) => void;
}

export interface LazyNodeResult {
  treeItems: ITreeNode[];
  node: IInnerTreeNode;
}

export type PluginFn = (
  data: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  ...args: any[]
) => Partial<IUseTree>;

export interface IUseSelect {
  selectNode: (node: IInnerTreeNode) => void;
  deselectNode: (node: IInnerTreeNode) => void;
  toggleSelectNode: (node: IInnerTreeNode) => void;
  getSelectedNode: () => IInnerTreeNode;
}

export interface IUseInitSelectCollection {
  setInitSelectedNode: (node: IInnerTreeNode) => void;
  getInitSelectedNodes: () => IInnerTreeNode[];
  clearInitSelectedNodes: () => void;
}
