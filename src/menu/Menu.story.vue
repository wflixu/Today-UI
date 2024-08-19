<script lang="ts" setup>
import { reactive, ref } from 'vue'

import TMenu from "./Menu";
import { MenuProps } from './type';

const state = reactive<Partial<MenuProps>>({
  options: [
    {
      key: "copy",
      label: "复制",
      secondary: " Ctrl + C",
      icon: "copy",
    },
    {
      key: "paste",
      label: "粘贴",
      secondary: "",
      icon: "paste",
    },
    {
      key: "undo",
      label: "撤销",
      secondary: " Ctrl + C",
    },
  ]
})



</script>

<template>
  <Story title="Basic/Menu">
    <template #controls>

    </template>
    <Variant title="默认">
      <TMenu :options="state.options">
      </TMenu>
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
