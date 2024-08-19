<script lang="ts" setup>
import { reactive, ref } from 'vue'

import TDropdown from "./Dropdown";
import { ButtonProps, IDropdownProps } from '..';

const state = reactive<Partial<IDropdownProps>>({
  trigger: 'click'
})


const triggerOptions = {
  'click': 'click',
  'hover': 'hover',
  'contextmenu': 'contextmenu',
  'manually': 'manually',
}
const menuOptions = [
  { label: "Undo", key: "undo" },
  { label: "Redo", key: "redo" },
]

</script>

<template>
  <Story title="Basic/Dropdown">
    <template #controls>
      <HstSelect v-model="state.trigger" title="trigger" :options="triggerOptions" />
    </template>
    <Variant title="默认">
      <TDropdown :options="menuOptions">
        <button> Dropdown trigger button</button>
      </TDropdown>
    </Variant>
    <Variant title="Trigger contextmenu">
      <TDropdown :options="menuOptions" trigger="contextmenu">
        <div class="board">

        </div>

      </TDropdown>
    </Variant>
    <Variant title="Menu Template">
      <TDropdown>
        <button> Dropdown trigger button</button>
        <template #menu>
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </template>
      </TDropdown>
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
