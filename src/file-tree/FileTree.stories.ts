import type { Meta, StoryObj } from "@storybook/vue3";

import TFileTree from "./FileTree";
import PlugDisconnectedFilledIcon from "@/icon/components/PlugDisconnectedFilledIcon";
import DatabaseFilledIcon from "@/icon/components/DatabaseFilledIcon";
import { CubeTreeFilledIcon, TableEditFilledIcon } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof TFileTree> = {
  title: "Today-UI/FileTree",
  component: TFileTree,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ["autodocs"],
  args: {},
  argTypes: {
    // trigger: { control: 'select', options: ['click', 'hover', 'contextmenu'] },
    onOperate: { action: "operate" },
    onDbclick: { action: "dbclick" },
    onSelect: { action: "select" },
    onNodeClick: { action: "node-click" },
    onToggle: { action: "toggle" },
    onLazyLoad: { action: "lazy-load" },
  },
};

export default meta;
type Story = StoryObj<typeof TFileTree>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  args: {
    data: [
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
    ],
  },

  render: (args) => ({
    components: {
      TFileTree,
    },
    setup() {
      return { args };
    },
    template: `<TFileTree v-bind="args"  >
       
      </TFileTree>`,
  }),
};

export const ContextMenu: Story = {
  args: {
    data: [
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
    ],
  },

  render: (args) => ({
    components: {
      TFileTree,
    },
    setup() {
      return { args };
    },
    template: `<TFileTree v-bind="args" >
       
      </TFileTree>`,
  }),
};

export const LazyLoad: Story = {
  args: {
    data: [
      {
        label: "Parent node 1",
        isLeaf: false,
        children: [],
      },
      { label: "Leaf node 2" },
    ],
  },

  render: (args) => ({
    components: {
      TFileTree,
    },
    setup() {
      const lazyLoad = (node, callback) => {
        console.log(node, callback);
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
      return { args, lazyLoad };
    },
    template: `<TFileTree v-bind="args"  @lazy-load="lazyLoad" >
       
      </TFileTree>`,
  }),
};

export const CustomIcon: Story = {
  args: {
    data: [
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
    ],
  },

  render: (args) => ({
    components: {
      TFileTree,
    },
    setup() {
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
      return { args, calcIconType };
    },
    template: `<TFileTree v-bind="args"   >
          <template #icon="{ nodeData }">
          <component :is="calcIconType(nodeData.id)"></component>
        </template>
      </TFileTree>`,
  }),
};
