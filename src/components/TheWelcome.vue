<script setup lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
const origin = ref();
const visible = ref(false);
const position = ref(['top', 'right']);
const title = computed(() => (visible.value ? '隐藏' : '显示'));
const handleVisible = () => (visible.value = !visible.value);
</script>

<template>
  <div>
    <div ref="origin" class=" h-40 w-40 bg-gray border-light-800 border">origin</div>
    <button @click="handleVisible" style="margin:20px;">{{ title }}</button>
    <d-flexible-overlay
      v-model="visible"
      :origin="origin"
      :position="position"
      show-arrow
      class="custom-overlay"
    >hello world</d-flexible-overlay>
  </div>
</template>
<style>

.custom-overlay {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
