<script setup lang="ts">
import { computePosition, flip, offset, shift, type ReferenceElement } from '@floating-ui/dom';
import { onMounted, reactive, ref } from 'vue'
let btn = ref(null);
let tip = ref(null);

let tipStyle = reactive({
  top: '0',
  left: '0',
  display:'none'
});

onMounted(() => {
  computePosition(btn.value as unknown as ReferenceElement, tip.value as unknown as ReferenceElement,{
    placement: 'top',
    middleware: [offset(10), flip(),shift({
      padding:5
    })],
  }).then(({ x, y }) => {
    console.log(x,y);
    
    tipStyle.left = `${x}px`;
    tipStyle.top = `${y}px`;
    tipStyle.display = 'block';  
  });
});
</script>

<template>
  <main>
    <button id="button" ref="btn" aria-describedby="tooltip">My button</button>
    <div id="tooltip" ref="tip" role="tooltip" :style="tipStyle">My tooltip</div>
  </main>
</template>
<style scoped>
#tooltip {
  position: fixed;
  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  pointer-events: none;
}
</style>
