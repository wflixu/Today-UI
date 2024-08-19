<script lang="ts" setup>
import { reactive, ref } from 'vue'


import TTabs from "./Tabs";
import { TabsProps } from './type';

const state = reactive<Partial<TabsProps>>({
  options: [
    {
      key: "tab1",
      title: "复制",
    },
    {
      key: "tab2",
      title: "tab2",
    },
    {
      key: "tab3",
      title: "tab3",
    },
  ],
  activeKey: "tab1",
})
const stateOne = reactive<Partial<TabsProps>>({
  options: [
    {
      key: "tab1",
      title: "复制",
    },
  ],
  activeKey: "tab1",
})



</script>

<template>
  <Story title="Basic/Tabs">
    <template #controls>

    </template>
    <Variant title="默认">
      <TTabs :options="state.options" v-model:active-key="state.activeKey" @close="logEvent('close', $event)">
      </TTabs>
    </Variant>
    <Variant title="One">
      <TTabs :options="stateOne.options" v-model:active-key="stateOne.activeKey" @close="logEvent('close', $event)">
      </TTabs>
    </Variant>
  </Story>
</template>

<style>
.board {
  border: 1px solid #999;
  height: 60px;
  border-radius: 4px;
}
</style>

<docs lang="md">
    # My documentation
</docs>
