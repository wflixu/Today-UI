<script lang="ts" setup>
import { reactive, ref } from 'vue'

import ZoomToFitIcon from "./components/ZoomToFit";
import ChevronRightIcon from "./components/ChevronRightIcon";
import ChevronRightSmallIcon from "./components/ChevronRightSmallIcon";
import ChevronRightMedIcon from "./components/ChevronRightMedIcon";
import SpinnerFilledIcon from "./components/SpinnerFilledIcon";
import PlugDisconnectedIcon from "./components/PlugDisconnectedIcon";
import PlugDisconnectedFilledIcon from "./components/PlugDisconnectedFilledIcon";
import DatabaseFilledIcon from "./components/DatabaseFilledIcon";
import TableFilledIcon from "./components/TableFilledIcon";
import TableEditFilledIcon from "./components/TableEditFilledIcon";
import CubeTreeFilledIcon from "./components/CubeTreeFilledIcon";
import DismissFilled from "./components/DismissFilled";
import { ButtonProps, IDropdownProps } from '..';

const state = reactive<Partial<{ color: string, size: number }>>({
  color: '#666666',
  size: 24
})


</script>

<template>
  <Story title="Basic/Icons">
    <template #controls>
      <HstNumber v-model="state.size" :step="1" title="size" />
      <HstColorSelect v-model="state.color" title="Color" />
    </template>
    <Variant title="默认">
      <ZoomToFitIcon v-bind="state"></ZoomToFitIcon>
    </Variant>
    <Variant title="所有">
      <div>
        <ZoomToFitIcon v-bind="state"></ZoomToFitIcon>
        <ChevronRightIcon v-bind="state"></ChevronRightIcon>
        <ChevronRightMedIcon v-bind="state"></ChevronRightMedIcon>
        <ChevronRightSmallIcon v-bind="state"></ChevronRightSmallIcon>
        <SpinnerFilledIcon v-bind="state"></SpinnerFilledIcon>
        <PlugDisconnectedIcon v-bind="state"></PlugDisconnectedIcon>
        <PlugDisconnectedFilledIcon v-bind="state"></PlugDisconnectedFilledIcon>
        <DatabaseFilledIcon v-bind="state"></DatabaseFilledIcon>
        <TableFilledIcon v-bind="state"></TableFilledIcon>
        <TableEditFilledIcon v-bind="state"></TableEditFilledIcon>
        <CubeTreeFilledIcon v-bind="state"></CubeTreeFilledIcon>
        <DismissFilled v-bind="state"></DismissFilled>
      </div>
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
