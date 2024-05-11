import { on } from './../shared/dom';
import type { Meta, StoryObj } from "@storybook/vue3";

import TTabs from "./Tabs";

const meta: Meta<typeof TTabs> = {
  title: "Today-UI/Tabs",
  tags: ["autodocs"],
  args: {},
  argTypes: {
    onClose: { action: "close" },
    onChange: { action: "change" },
  },
};

export default meta;
type Story = StoryObj<typeof TTabs>;

export const Basic: Story = {
  args: {
    options: [
      {
        id: "tab1",
        title: "复制",
      },
      {
        id: "tab2",
        title: "tab2",
      },
      {
        id: "tab3",
        title: "tab3",
      },
    ],
    activeKey: "tab1",
  },

  render: (args) => ({
    components: {
      TTabs,
    },
    setup() {
      const onClose = (id: string) => {
        console.log('close', id)
        args.options = args.options?.filter((item) => item.id !== id);
      }
      return { args, onClose };
    },
    template: `<TTabs :options="args.options" v-model:active-key="args.activeKey"   @close="onClose" >
         </TTabs>`,
  }),
};
