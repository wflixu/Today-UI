import type { Meta, StoryObj } from "@storybook/vue3";

import ZoomToFitIcon from "./components/ZoomToFit";
import ChevronRightIcon from "./components/ChevronRightIcon";
import ChevronRightSmallIcon from "./components/ChevronRightSmallIcon";
import ChevronRightMedIcon from "./components/ChevronRightMedIcon";
import SpinnerFilledIcon from "./components/SpinnerFilledIcon";
import PlugDisconnectedIcon from "./components/PlugDisconnectedIcon";
import PlugDisconnectedFilledIcon from "./components/PlugDisconnectedFilledIcon";
import DatabaseFilledIcon from "./components/DatabaseFilledIcon";
import TableFilledIcon from "./components/TableFilledIcon";
import TableEditFilledIcon from "./components/TableEditFilledIcon";
import CubeTreeFilledIcon from "./components/CubeTreeFilledIcon";
// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof ZoomToFitIcon> = {
  title: "Today-UI/Icons",
  component: ZoomToFitIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  //   tags: ["autodocs"],
  args: {
    color: "blue",
    size: 24,
  },
  argTypes: {
    /**
     * 图标颜色
     */
    color: {
      control: "color",
      defaultValue: "#999",
    },

    // trigger: { control: 'select', options: ['click', 'hover', 'contextmenu'] },

    // onSelect: { action: "select" },
  },
};

export default meta;
type Story = StoryObj<typeof ZoomToFitIcon>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  args: {
    color: "blue",
    size: 24,
  },

  render: (args) => ({
    components: {
      ZoomToFitIcon,
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <ZoomToFitIcon v-bind="args"></ZoomToFitIcon>  
    </div>
    `,
  }),
};
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const ListAll: Story = {
  args: {
    color: "blue",
    size: 24,
  },

  render: (args) => ({
    components: {
      ZoomToFitIcon,
      ChevronRightIcon,
      ChevronRightSmallIcon,
      ChevronRightMedIcon,
      SpinnerFilledIcon,
      PlugDisconnectedIcon,
      PlugDisconnectedFilledIcon,
      DatabaseFilledIcon,
      TableFilledIcon,
      TableEditFilledIcon,
      CubeTreeFilledIcon,
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <ZoomToFitIcon v-bind="args"></ZoomToFitIcon>
      <ChevronRightIcon v-bind="args"></ChevronRightIcon>
      <ChevronRightMedIcon v-bind="args"></ChevronRightMedIcon>
      <ChevronRightSmallIcon v-bind="args"></ChevronRightSmallIcon>
      <SpinnerFilledIcon v-bind="args"></SpinnerFilledIcon>
      <PlugDisconnectedIcon v-bind="args"></PlugDisconnectedIcon>
      <PlugDisconnectedFilledIcon v-bind="args"></PlugDisconnectedFilledIcon>
      <DatabaseFilledIcon v-bind="args"></DatabaseFilledIcon>
      <TableFilledIcon v-bind="args"></TableFilledIcon>
      <TableEditFilledIcon v-bind="args"></TableEditFilledIcon>
      <CubeTreeFilledIcon v-bind="args"></CubeTreeFilledIcon>
    </div>
    `,
  }),
};
