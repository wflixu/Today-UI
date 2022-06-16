<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useFloating, shift, flip, offset, Placement, arrow } from 'use-floating'


const placement = ref<Placement>('right-start');
const onChangePlacement = (e: any) => {
  placement.value = e.target.value;
}

// 箭头
const arrowEl = ref(null);

const { x, y, floating, reference, middlewareData,update } = useFloating({
  placement: placement,
  strategy: 'fixed',
  middleware: [flip(), offset(5), shift(), arrow({ element: arrowEl })],
});

const show = ref(true);

const tipStyle = computed(() => {
  return {
    top: `${y.value}px`,
    left: `${x.value}px`,
    display: show.value ? 'block' : 'none',
    position: 'fixed'
  }
})

console.log(middlewareData.value?.arrow)

const arrowStyle = computed(() => {

  if (middlewareData.value?.arrow && placement) {
    let arrow = middlewareData.value.arrow;
    console.log(arrow)
    const staticSide = ({
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    })[placement.value.split('-')[0]] as string;
    let arrowX = arrow.x;
    let arrowY = arrow.y;
    return {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    }
  } else {
    return {}
  }


})

const onShow = () => {
  show.value = true;
  nextTick(()=>{
    update();
  })
}
const onHide = () => {
  show.value = false;
}

</script>

<template>
  <div class="app">
    <h1>use-floating</h1>
    <div>
      <select name="placement" id="placement" :value="placement" @change="onChangePlacement">
        <option value="top">top</option>
        <option value="top-start">top-start</option>
        <option value="top-end">top-end</option>
        <option value="right">right</option>
        <option value="right-start">right-start</option>
        <option value="right-end">right-end</option>
        <option value="bottom">bottom</option>
        <option value="bottom-start">bottom-start</option>
        <option value="bottom-end">bottom-end</option>
      </select>
    </div>


    <div style="height:60px;">

    </div>

    <!-- <div style="height:40px;">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime eligendi facilis eius
      nobis sunt esse? Itaque
      dolor architecto provident enim repellendus asperiores cumque rerum atque fugiat. Praesentium explicabo voluptatem
      libero!</div> -->
    <button :ref="reference" @mouseenter="onShow" @mouseleave="onHide">drop</button>
    <div :ref="floating" class="t-floating" :style="tipStyle">
      <div class="t-floating-arrow" ref="arrowEl" :style="arrowStyle">

      </div>
      tooltip content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, esse velit magnam dolor nobis quod
      nihil enim totam debitis fugit.
      Blanditiis, magni pariatur natus autem dolorum sapiente quae dolor adipisci.
    </div>
    <div class="mt-40">
     tipStyle:
      {{ tipStyle }}
    </div>
    <div>
      arrowStyle:
      {{ arrowStyle }}
    </div>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mt-40 {
  margin-top: 100px;

}

.t-floating {
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #999;
  color: white;
  position: fixed;
}

.t-floating-arrow {
  position: absolute;
  background: #999;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}
</style>
