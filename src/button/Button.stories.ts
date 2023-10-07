import type { Meta, StoryObj } from "@storybook/vue3";

import TButton  from "./Button";

const meta:Meta<typeof TButton> = {
    title:"Today-UI/Button",
    tags:['autodocs'],
    args:{},
    argTypes: {
      type: {
        control: "select", options: ["default", "primary", "outline", 'subtle', 'transparent']
      },
      shape: {
        control: "select", options: ["rounded", "circular", 'square']
      },
      onClick:{action: "click"}
    }
}

export default meta;
type Story = StoryObj<typeof TButton>

export const Basic: Story = {
    args: {
        type: 'default',
        disabled: false
    },
  
    render: (args) => ({
      components: {
        TButton,
      },
      setup() {
        return { args };
      },
      template: `<TButton v-bind="args"  >
         basic
        </TButton>`,
    }),
  };

export const Shape: Story = {
    args: {
        type: 'default',
        shape: 'circular',
        disabled: false
    },
  
    render: (args) => ({
      components: {
        TButton,
      },
      setup() {
        return { args };
      },
      template: `<TButton v-bind="args"  >
         basic
        </TButton>`,
    }),
  };


export const Appearance: Story = {
    args: {
        type: 'default',
        shape: 'circular',
        disabled: false
    },
  
    render: (args) => ({
      components: {
        TButton,
      },
      setup() {
        return { args };
      },
      template: `<TButton v-bind="args"  >
         basic
        </TButton>`,
    }),
  };