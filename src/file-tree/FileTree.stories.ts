import type { Meta, StoryObj } from "@storybook/vue3";

import TFileTree from "./FileTree";

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
        isLeaf:false,
        children: [
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
      const lazyLoad = (node, callback) => {
        console.log(node, callback)
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
        }, 500);
      };
      return { args, lazyLoad };
    },
    template: `<TFileTree v-bind="args"  @lazy-load="lazyLoad" >
       
      </TFileTree>`,
  }),
};
