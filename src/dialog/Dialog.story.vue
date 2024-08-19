<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TDialog from "./Dialog";
import TButton from './../button/Button'
import type { TDialogProps } from './type'

const state = reactive<TDialogProps>({
  show: false,
  title: '默认 title',
  width: '800px'
})

</script>

<template>
  <Story title="Basic/Dialog">
    <template #controls>
      <HstCheckbox v-model="state.show" title="show" />
      <HstText v-model="state.title" title="title" />
      <HstNumber v-model="state.width" :step="1" title="width" />
    </template>
    <Variant title="默认">
      <TDialog :show="state.show" :title="state.title" :width="state.width">
        <button>默认</button>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          exercitationem cumque repellendus eaque est dolor eius expedita
          nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
          in natus iure cumque eaque?
        </template>
      </TDialog>
    </Variant>
  </Story>
</template>

<docs lang="md">
    # My documentation
</docs>
