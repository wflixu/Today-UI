
import type { Meta, StoryObj } from "@storybook/vue3";

import Tablist from "./Tablist";
import TabPanel from "./TabPanel";
const meta: Meta<typeof Tablist> = {
  component: Tablist,
  subcomponents: { TabPanel },
  title: "Today-UI/Tablist",
  tags: ["autodocs"],
  args: {},
  argTypes: {
    onClose: { action: "close" },
    onChange: { action: "change" },
  },
};

export default meta;
type Story = StoryObj<typeof Tablist>;

export const Basic: Story = {
  args: {
    modelValue: "tab1",
  },
  render: (args) => ({
    components: {
      Tablist,
      TabPanel
    },
    setup() {
      return { args };
    },
    template: `<Tablist v-bind="args"  v-model="args.modelValue" >
          <TabPanel key="tab1" title="复制 开始就肯德基啊 案例四大皆空啊三等奖卡机深刻的啊三等奖k">  
              <div>内容1</div>
          </TabPanel>
          <TabPanel key="tab2" title="粘贴">  
              <div>内容2</div>
          </TabPanel>
          <TabPanel key="tab3" title="剪切">  
              <div>内容3</div>
          </TabPanel>
         </Tablist>`,
  }),
};


// export const One: Story = {
//   args: {
//     options: [
//       {
//         key: "tab1",
//         title: "复制",
//       },
//     ],
//     activeKey: "tab1",
//   },

//   render: (args) => ({
//     components: {
//       TTabs,
//     },
//     setup() {
//       const onClose = (id: string) => {
//         console.log('close', id)
//         args.options = args.options?.filter((item) => item.key !== id);
//       }
//       return { args, onClose };
//     },
//     template: `<TTabs :options="args.options" v-model:active-key="args.activeKey"   @close="onClose" >
//          </TTabs>`,
//   }),
// };

