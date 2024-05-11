// @ts-nocheck
import { randomId } from "../shared/util";
import type { IInnerTreeNode, ITreeNode, UseNamespace } from "./type";
import { computed, type ComputedRef } from "vue";

export const USE_TREE_TOKEN = 'use-tree-token';
export const TREE_INSTANCE = 'tree-instance';
export const NODE_HEIGHT = 30;
export const NODE_INDENT = 24;


function createBem(namespace: string, element?: string, modifier?: string): string {
  let cls = namespace;
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
}

/**
 * useNamespace
 * @param block current block name
 * @param needDot Do you need a dot prefix (defalut: false)
 * @returns UseNamespace
 */
export function useNamespace(block: string, needDot = false): UseNamespace {
  const namespace = needDot ? `.t-${block}` : `t-${block}`;
  const b = () => createBem(namespace);
  const e = (element: string) => (element ? createBem(namespace, element) : '');
  const m = (modifier: string) => (modifier ? createBem(namespace, '', modifier) : '');
  const em = (element: string, modifier: string) => (element && modifier ? createBem(namespace, element, modifier) : '');
  return {
    b,
    e,
    m,
    em,
  };
}



/**
 * Standardized tree node
 * @param trees
 * @param keyName
 * @param childrenName
 * @param parentId
 * @returns IInnerTreeNode[]
 */
export const formatBasicTree = (trees: ITreeNode[], keyName = 'id', childrenName = 'children', parentId?: string): IInnerTreeNode[] => {
  return trees.map((item) => {
    const curItem = { ...item, parentId } as IInnerTreeNode;
    if (
      !(keyName in curItem)
      || !curItem[keyName as 'id']
    ) {
      curItem[keyName as 'id'] = randomId();
      curItem.idType = 'random';
    }
    if (
      childrenName in curItem
      && Array.isArray(curItem[childrenName as 'children'])
      && curItem[childrenName as 'children']?.length
    ) {
      // Child nodes exist
      curItem[childrenName as 'children'] = formatBasicTree(
        curItem[childrenName as 'children'] as ITreeNode[],
        keyName,
        childrenName,
        curItem[keyName as 'id'],
      );
      // Child nodes exist after node dragging
      if ('isLeaf' in curItem) {
        delete curItem.isLeaf;
      }
    } else {
      // There is no child node, and then there is no IsLeaf attribute
      if (!('isLeaf' in curItem)) {
        curItem.isLeaf = true;
      }
    }
    if (!curItem.parentId) {
      delete curItem.parentId;
    }
    return curItem;
  });
};

export interface IUseTreeNode {
  nodeClass: ComputedRef<(string | false | undefined)[]>;
  nodeStyle: ComputedRef<{ paddingLeft: string }>;
  nodeContentClass: ComputedRef<(string | false | undefined)[]>;
  nodeTitleClass: ComputedRef<(string | false | undefined)[]>;
  nodeVLineClass: ComputedRef<(string | false | undefined)[]>;
  nodeVLineStyles: ComputedRef<{ height: string; left: string; top: string }[]>;
  nodeHLineClass: ComputedRef<(string | false | undefined)[]>;
  nodeOperationAreaClass: ComputedRef<string>;
  matchedContents: ComputedRef<string[]>;
  highlightCls: string;
}
const ns = useNamespace('file-tree');
export function useTreeNode(data: ComputedRef<IInnerTreeNode>): IUseTreeNode {
  const nodeClass = computed(() => [ns.e('node'), data.value?.expanded && ns.em('node', 'open'), data.value?.selected && 'active']);
  const nodeStyle = computed(() => {
    return { paddingLeft: `${NODE_INDENT * (data.value?.level - 1)}px` };
  });

  const nodeVLineClass = computed(() => [data.value?.level !== 1 && ns.e('node-vline')]);
  const nodeVLineStyles = computed(() => {
    if (!data.value || data.value.level === 1) {
      return [];
    }
    const { currentIndex = 0, parentChildNodeCount = 0, level, expanded, isLeaf } = data.value;
    return Array.from({ length: data.value.level - 1 }).map((_, index) => ({
      height: `${currentIndex + 1 === parentChildNodeCount && index === 0 ? (isLeaf || !expanded ? NODE_HEIGHT / 2 : NODE_HEIGHT) : NODE_HEIGHT
        }px`,
      left: `${NODE_INDENT * (level - index - 2) + 9}px`,
      top: `0px`,
    }));
  });
  const nodeHLineClass = computed(() => [data.value?.level !== 1 && ns.e('node-hline')]);

  const nodeContentClass = computed(() => [ns.e('node-content'),]);

  const nodeTitleClass = computed(() => [ns.e('node-title'), data.value?.disableSelect && 'select-disabled']);

  const nodeOperationAreaClass = computed(() => ns.e('node-operation-area'));

  const matchedContents = computed(() => {
    const matchItem = data.value?.matchedText || '';
    const label = data.value?.label || '';
    const reg = (str: string) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regExp = new RegExp('(' + reg(matchItem) + ')', 'gi');
    return label.split(regExp);
  });

  const highlightCls = ns.e('match-highlight');

  return {
    nodeClass,
    nodeStyle,
    nodeContentClass,
    nodeTitleClass,
    nodeVLineClass,
    nodeVLineStyles,
    nodeHLineClass,
    nodeOperationAreaClass,
    matchedContents,
    highlightCls,
  };
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}



export function generateInnerTree(tree: ITreeNode[], key = 'children', level = 0, path: ITreeNode[] = []): IInnerTreeNode[] {
  level++;

  return tree.reduce((acc: IInnerTreeNode[], item: ITreeNode, currentIndex) => {
    const newItem: Partial<IInnerTreeNode> = Object.assign({}, item);
    if (newItem.id === undefined) {
      newItem.id = randomId();
      newItem.idType = 'random';
    }



    newItem.level = level;
    newItem.parentChildNodeCount = tree.length;
    newItem.currentIndex = currentIndex;
    newItem.childNodeCount = newItem.children?.length || 0;

    if (path.length > 0 && path[path.length - 1]?.level >= level) {
      while (path[path.length - 1]?.level >= level) {
        path.pop();
      }
    }

    path.push(newItem);

    const parentNode = path[path.length - 2];
    if (parentNode) {
      newItem.parentId = parentNode.id;
    }

    if (!newItem[key]) {
      return acc.concat({ ...newItem, isLeaf: newItem.isLeaf === false ? false : true });
    } else {
      return acc.concat(omit<ITreeNode>(newItem, 'children'), generateInnerTree(newItem[key], key, level, path));
    }
  }, []);
}


