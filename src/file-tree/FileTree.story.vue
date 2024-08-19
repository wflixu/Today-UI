<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TFileTree from "./FileTree";
import PlugDisconnectedFilledIcon from "../icon/components/PlugDisconnectedFilledIcon";
import DatabaseFilledIcon from "../icon/components/DatabaseFilledIcon";
import { CubeTreeFilledIcon, TableEditFilledIcon } from "..";
import { logEvent } from 'histoire/client'


const state = reactive({
  disabled: false,

})



const basicData = [
  {
    label: "Parent node 1",
    children: [
      {
        label: "Leaf node 1-1",
        children: [{ label: "Leaf node 1-1-1" }],
      },
      { label: "Leaf node 1-2" },
    ],
  },
  { label: "Leaf node 2" },
];

const menuData = [
  {
    label: "Parent node 1",
    contextMenu: [
      { label: "Undo", key: "undo" },
      { label: "Redo", key: "redo" },
    ],
    children: [
      {
        label: "Parent node 1-1",
        contextMenu: [
          { label: "Undo", key: "undo" },
          { label: "Redo", key: "redo" },
        ],
        children: [{ label: "Leaf node 1-1-1" }],
      },
      { label: "Leaf node 1-2" },
    ],
  },
  { label: "Leaf node 2" },
];
const lazyLoadData = [
  {
    label: "Parent node 1",
    isLeaf: false,
    children: [],
  },
  { label: "Leaf node 2" },
];

const lazyLoad = (node: any, callback: any) => {
  setTimeout(() => {
    callback({
      treeItems: [
        {
          label: "child node 1-1",
        },
        {
          label: "child node 1-2",
        },
      ],
      node,
    });
  }, 3000);
};
const customIconData = [
  {
    id: "1-1",
    label: "Parent node 1",
    contextMenu: [
      { label: "Undo", key: "undo" },
      { label: "Redo", key: "redo" },
    ],
    children: [
      {
        id: "1-1-1",
        label: "Parent node 1-1",
        contextMenu: [
          { label: "Undo", key: "undo" },
          { label: "Redo", key: "redo" },
        ],
        children: [{ label: "Leaf node 1-1-1", id: "1-1-1-1" }],
      },
      { label: "Leaf node 1-2", id: "1-1-2" },
    ],
  },
  { label: "Leaf node 2", id: "1-2" },
]
const calcIconType = (id: string) => {
  let len = id.split("-").length;

  if (len == 1) {
    return PlugDisconnectedFilledIcon;
  } else if (len == 2) {
    return DatabaseFilledIcon;
  } else if (len == 3) {
    return CubeTreeFilledIcon;
  } else {
    return TableEditFilledIcon;
  }
};
</script>

<template>
  <Story title="Basic/FileTree">
    <template #controls>
      <HstCheckbox v-model="state.disabled" title="Disabled" />
    </template>
    <Variant title="默认">
      <TFileTree :data="basicData" @select="logEvent('select', $event)"></TFileTree>
    </Variant>
    <Variant title="ContextMenu">
      <TFileTree :data="menuData" @operate="logEvent('operate', $event)"></TFileTree>
    </Variant>
    <Variant title="LazyLoad">
      <TFileTree :data="lazyLoadData" :lazyLoad="lazyLoad" @lazyLoad="logEvent('lazyLoad', $event)"></TFileTree>
    </Variant>
    <Variant title="自定义icon">
      <TFileTree :data="customIconData">
        <template #icon="{ nodeData }">
          <component :is="calcIconType(nodeData.id)"></component>
        </template>
      </TFileTree>
    </Variant>
  </Story>
</template>

<docs lang="md">
    # My documentation
</docs>
