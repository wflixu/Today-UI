<script setup lang="ts">

import { computed, toRefs } from 'vue'
import { useFloating,shift, flip, offset } from './../../../use-floating/'


const { x, y, floating, reference } = toRefs(useFloating({
  placement: 'top',
  strategy: 'absolute',
  middleware: [flip(), offset(10), shift()],
}));

const tipStyle = computed(() => {
  return {
    top: `${y.value}px`,
    left: `${x.value}px`
  }
})


</script>
<template>
  <div>
    <button :ref="reference">drop</button>
    <div :ref="floating" class="t-floating" :style="tipStyle">
      tooltip content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, esse velit magnam dolor nobis quod nihil enim totam debitis fugit.
      Blanditiis, magni pariatur natus autem dolorum sapiente quae dolor adipisci.
    </div>

    <h1>use floating</h1>
    <div>
      x:{{ x }}
      y:{{ y }}
      {{ tipStyle }}
    </div>
  </div>
</template>

<style scoped>
.t-floating {
  position: absolute;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #999;
  color: white;
}
</style>
