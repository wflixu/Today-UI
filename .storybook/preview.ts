import type { Preview } from "@storybook/vue3";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
