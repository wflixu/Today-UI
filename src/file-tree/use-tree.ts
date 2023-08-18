import { ref, type SetupContext } from 'vue';
import type { IInnerTreeNode, ITreeNode, IUseCore, IUseTree, PluginFn } from './type';
import { useToggle } from './use-toggle';
import { useCore } from './use-core';
import { useLazyLoad } from './use-lazy-load';
import { generateInnerTree } from './util';

export const DEFAULT_TREE_PLUGINS:PluginFn[] = [useToggle()];

export function useTree(tree: ITreeNode[], plugins: PluginFn[] = [], context: SetupContext): Partial<IUseTree> {
  const treeData = ref<IInnerTreeNode[]>(generateInnerTree(tree));
  const core: IUseCore = useCore()(treeData);

  // 因为展开操作和懒加载有耦合，需要此处引入
  const lazyLode = useLazyLoad()(treeData, core, context);

  const pluginMethods = DEFAULT_TREE_PLUGINS.concat(plugins).reduce((acc, plugin) => {
    return { ...acc, ...plugin(treeData, core, context, lazyLode) };
  }, {});

  return {
    treeData,
    ...pluginMethods,
    ...core,
  };
}
