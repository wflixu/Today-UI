<script setup lang="ts">
import { computePosition, flip, offset, shift, type ReferenceElement } from '@floating-ui/dom';
import { onMounted, reactive, ref } from 'vue'
let msg = ref('')
</script>

<template>
  <main class="main">
    <VDropdown  :distance="30" :arrow="null" class="drop"  theme='dropdown'>
      <button>Click me</button>
      <template #popper>
        <div>
          <input class="tooltip-content" v-model="msg" placeholder="Tooltip content" />
          <p>{{ msg }}</p>
        </div>
      </template>
    </VDropdown>
  </main>
</template>
<style scoped>
.main {
  width: 200px;
}
.drop {
  background: #aaa;
}
/* #tooltip {
  position: fixed;
  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  pointer-events: none;
} */
</style>
