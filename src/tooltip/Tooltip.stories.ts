
import type { Meta, StoryObj } from '@storybook/vue3';

import TTooltip from './Tooltip';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof TTooltip> = {
  title: 'Today-UI/Tooltip',
  component: TTooltip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
  argTypes: {
    label: {
      name:'label',
      control: {
        type: 'text'
      }
    }
  },
  args: { label:'Tooltip content' }, // default value
  render: () => ({
    components: { TTooltip },
    template: `<TTooltip v-bind="args" >
          <button>trigger button</button>
    </TTooltip>`,
  }),
};

export default meta;
type Story = StoryObj<typeof TTooltip>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const Label: Story = {
  args: {
    label: 'Button',
  },
  render:(args) =>({
    components: {
      TTooltip
    },
    setup() {
      return args;
    },
    template:`<TTooltip v-bind="args" >
         <button>trigger button</button>
      </TTooltip>`
  })
};

// export const Secondary: Story = {
//   args: {
//     primary: false,
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     label: 'Button',
//     size: 'large',
//   },
// };

// export const Small: Story = {
//   args: {
//     label: 'Button',
//     size: 'small',
//   },
// };
