<script setup lang="ts">
import { onMounted, reactive, ref, toRef, toRefs, unref } from 'vue'
import { useFloating } from '../../../use-floating/src/index'


const { x, y, floating,reference,setReference,setFloating} = toRefs(useFloating({
  placement: 'right',
  strategy: 'absolute'
  // middleware: [shift()],
}));

// let reference = toRef(floatData, 'reference');
// let x = floatData.x;
// let y = floatData.y;
// let floating = floatData.floating;



console.log(reference);

const tipStyle = reactive({
  top: `${unref(y)}px`,
  left: `${unref(x)}px`
})

// onMounted(() => {
//   console.log(reference, origin)
//   reference.value = origin.value;  
//   // floating.value = ref(float);  
// })

const setEl =  (type: 'reference'| 'floating',el:Element)=> {
  if(type == 'reference' && reference){
    reference.value = el
  }
  if(type == 'floating' && floating){
    floating.value = el
  }
}



</script>

<template>
  <div>
    <h1>use floating</h1>
    <div>
      x:{{ x }}
      y:{{ y }}
    </div>
    <button :ref="setReference">drop</button>
    <div :ref="setFloating" class="t-floating" :style="{
      left: `${x}px`
    }">
      tooltip content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, esse velit magnam dolor nobis quod nihil enim totam debitis fugit.
      Blanditiis, magni pariatur natus autem dolorum sapiente quae dolor adipisci.
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
