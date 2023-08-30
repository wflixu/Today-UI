import type { Meta, StoryObj } from "@storybook/vue3";

import TMenu  from "./Menu";

const meta:Meta<typeof TMenu> = {
    title:"Today-UI/Menu",
    tags:['autodocs'],
    args:{},
    argTypes: {
      onSelect:{action: "select"}
    }
}

export default meta;
type Story = StoryObj<typeof TMenu>

export const Basic: Story = {
    args: {
      options: [
        {
          key: 'copy',
          label:'复制',
          secondary:' Ctrl + C',
          icon:'copy'
        },
        {
          key: 'paste',
          label:'粘贴',
          secondary:'',
          icon:'paste'
        },
        {
          key: 'undo',
          label:'撤销',
          secondary:' Ctrl + C'
        }
      ]
    },
  
    render: (args) => ({
      components: {
        TMenu,
      },
      setup() {
        return { args };
      },
      template: `<TMenu v-bind="args"  >
         
        </TMenu>`,
    }),
  };