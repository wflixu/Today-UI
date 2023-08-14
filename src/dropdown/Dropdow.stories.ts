
import type { Meta, StoryObj } from '@storybook/vue3';

import TDropdown from './Dropdown';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof TDropdown> = {
  title: 'Today-UI/Dropdown',
  component: TDropdown,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
  argTypes: {
    // attach: {
    //   name:'attach',
    //   control: {
    //     type: 'text'
    //   }
    // }
  },
  args: { 
    
    // attach:'body'

}, // default value
  render: () => ({
    components: { TDropdown },
    template: `<TDropdown v-bind="args" >
          <button>trigger button</button>
    </TDropdown>`,
  }),
};

export default meta;
type Story = StoryObj<typeof TDropdown>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const Label: Story = {
  args: {
    attach: 'body',
  },
  render:(args) =>({
    components: {
      TDropdown
    },
    setup() {
      return args;
    },
    template:`<TDropdown v-bind="args" >
         <button>trigger button</button>
      </TDropdown>`
  })
};


