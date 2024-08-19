<script lang="ts" setup>
import { reactive, ref } from 'vue'

import TToast from "./Toast";


const args = reactive({
  timeout: 2000,
})



</script>

<template>
  <Story title="Basic/Toast">
    <template #controls>

    </template>
    <Variant title="默认">
      <TToast v-bind="args">
      </TToast>
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
