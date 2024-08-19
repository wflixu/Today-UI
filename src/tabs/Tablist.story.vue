<script lang="ts" setup>
import { reactive, ref } from 'vue'

import Tablist from "./Tablist";
import TabPanel from "./TabPanel";

const state = reactive({
  activeKey: "tab1",
})


</script>

<template>
  <Story title="Basic/Tablist">
    <template #controls>

    </template>
    <Variant title="默认">
      <Tablist v-model="state.activeKey" @close="logEvent('close', $event)" @change="logEvent('change', $event)">
        <TabPanel key="tab1" title="复制 开始就肯德基啊 案例四大皆空啊三等奖卡机深刻的啊三等奖k">
          <div>内容1</div>
        </TabPanel>
        <TabPanel key="tab2" title="粘贴">
          <div>内容2</div>
        </TabPanel>
        <TabPanel key="tab3" title="剪切">
          <div>内容3</div>
        </TabPanel>
      </Tablist>
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
