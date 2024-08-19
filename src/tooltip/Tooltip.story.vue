<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TTooltip from "./Tooltip";

const args = reactive({
  label: 'basic Tooltip label'
})

</script>

<template>
  <Story title="Basic/Tooltip">
    <template #controls>
      <HstText v-model="state.label" :title="label" />
    </template>
    <Variant title="默认">
      <TTooltip v-bind="args">
        <button>trigger button</button>
      </TTooltip>
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
