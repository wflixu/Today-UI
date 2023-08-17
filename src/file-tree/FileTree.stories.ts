import type { Meta, StoryObj } from "@storybook/vue3";

import TFileTree from "./FileTree";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof TFileTree> = {
  title: "Today-UI/FileTree",
  component: TFileTree,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ["autodocs"],
  args: {
    // attach: "body",
    // trigger: 'click',
    // options: [
    //   { label: "Undo", key: "undo" },
    //   { label: "Redo", key: "redo" },
    // ],
  },
  argTypes: {
    // trigger: { control: 'select', options: ['click', 'hover', 'contextmenu'] },
    // onSelect: {action: 'selected',}
  }


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
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [{ label: 'Leaf node 1-1-1' }],
          },
          { label: 'Leaf node 1-2' },
        ],
      },
      { label: 'Leaf node 2' },
    ]
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

