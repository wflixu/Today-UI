import type { Meta, StoryObj } from "@storybook/vue3";

import TDropdown from "./Dropdown";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof TDropdown> = {
  title: "Today-UI/Dropdown",
  component: TDropdown,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ["autodocs"],

  args: {
    trigger: "click",
    options: [
      { label: "Undo", key: "undo" },
      { label: "Redo", key: "redo" },
    ],
  },
  argTypes: {
    trigger: { control: "select", options: ["click", "hover", "contextmenu"] },
    onSelect: { action: "select" },
    onToggle: { action: "toggle" },
  },
};

export default meta;
type Story = StoryObj<typeof TDropdown>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */

export const Menu: Story = {
  args: {
    options: [
      { label: "Undo", key: "undo" },
      { label: "Redo", key: "redo" },
    ],
  },
  render: (args) => ({
    components: {
      TDropdown,
    },
    setup() {
      return { args };
    },
    template: `<TDropdown v-bind="args" >
         <button>trigger button</button>
         <template #menu>
         <ul>
          <li>item 1</li>
          <li>item 2</li>
         </ul>
      </template>
      </TDropdown>`,
  }),
};

export const Trigger: Story = {
  args: {
    trigger: "contextmenu",
    options: [
      { label: "Undo", key: "undo" },
      { label: "Redo", key: "redo" },
    ],
  },
  render: (args) => ({
    components: {
      TDropdown,
    },
    setup() {
      return { args };
    },
    template: `<TDropdown v-bind="args">
         <button>trigger button</button>
       </TDropdown>`,
  }),
};
// 
export const ConmpoentEvents: Story = {
  args: {
    options: [
      { label: "Undo", key: "undo" },
      { label: "Redo", key: "redo" },
    ],
  },

  render: (args) => ({
    components: {
      TDropdown,
    },
    setup() {
      return { args };
    },
    template: `<TDropdown v-bind="args" >
         trigger button
       </TDropdown>`,
  }),
};
