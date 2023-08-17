
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
  