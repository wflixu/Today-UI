import type { Meta, StoryObj } from "@storybook/vue3";
import TToast from "./Toast";

const meta: Meta<typeof TToast> = {
  title: "Today-UI/Toast",
  component: TToast,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TToast>;

export const Timeout: Story = {
  args: {
    timeout: 2000,
  },
  render: (args) => ({
    components: {
      TToast,
    },
    setup() {
      return { args };
    },
    template: `
              <TToast v-bind="args"  >
              </TToast>
            `,
  }),
};
