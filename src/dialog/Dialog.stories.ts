import type { Meta, StoryObj } from "@storybook/vue3";

import TDialog from "./Dialog";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof TDialog> = {
  title: "Today-UI/Dialog",
  component: TDialog,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ["autodocs"],
  argTypes: {
    title: {
      name: "title",
      control: {
        type: "text",
      },
    },
    show: {
      name: "show",
      default: false,
    },
  },
  args: { title: "Dialog" }, // default value
  render: () => ({
    components: { TDialog },
    template: `<t-dialog v-bind="args" >
          <button>trigger button</button>
    </t-dialog>`,
  }),
};

export default meta;
type Story = StoryObj<typeof TDialog>;

export const Title: Story = {
  args: {
    title: "custom dialog title",
    show: false,
  },
  render: (args) => ({
    components: {
      TDialog,
    },
    setup() {
      return { args };
    },
    template: `<t-dialog v-bind="args" v-model:show="args.show" >
           <button>trigger button</button>
           <template #content>

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            exercitationem cumque repellendus eaque est dolor eius expedita
            nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
            in natus iure cumque eaque?
           </template>
        </t-dialog>`,
  }),
};

export const Visible: Story = {
  args: {
    title: "custom dialog title",
    show: true,
  },
  render: (args) => ({
    components: {
      TDialog,
    },
    setup() {
      return { args };
    },
    template: `<t-dialog v-bind="args" >
           <button>trigger button</button>
        </t-dialog>`,
  }),
};
