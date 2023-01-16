<template>
  <div>
    <!-- <FromScratch/> -->
    <hr>

    <button ref="reference" @mouseenter="onEnter" @mouseleave="onLeave">Button</button>
    <div :style="{
      position: strategy,
      top: `${y ?? 0}px`,
      left: `${x ?? 0}px`,
      width: 'max-content',
    }" ref="floating" id="tooltip" v-show="showTip">

      Tooltip

      <div id="arrow" ref="arrowRef" :style="arrowStyle"></div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useFloating, offset,
  flip,
  shift,
  type Placement,
  arrow,
} from '@floating-ui/vue';
import FromScratch from './components/FromScratch.vue';



const reference = ref(null);
const floating = ref(null);
const arrowRef = ref(null);
const showTip = ref(false);
const placementInput = ref<Placement>('right');
const middleware = ref([offset(10), flip(), shift(), offset(5), arrow({ element: arrowRef })]);
const { x, y, strategy, middlewareData, placement, update } = useFloating(reference, floating, {
  placement: placementInput,
  middleware,
});

const arrowData = computed<Record<string, any>
>(() => {
  return middlewareData.value.arrow ?? {}
})

const arrowStyle = computed(() => {

  const { x, y } = arrowData.value;
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.value.split('-')[0]] as string;

  return {
    left: x ? `${x}px` : '',
    top: y ? `${y}px` : '',
    right: '',
    bottom: '',
    [staticSide]: '-4px',
  }

})

const onEnter = () => {
  showTip.value = true;
  update();
}
const onLeave = () => {
  showTip.value = false;
  update();
}



</script>

<style scoped>
#arrow {
  position: absolute;
  background: #222;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}

#tooltip {
  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
}
</style>