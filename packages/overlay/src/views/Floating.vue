<template>
    <div class="floating">
        <div>{{ tipStyle }}</div>
        <button
            ref="button"
            aria-describedby="tooltip"
            @mouseenter="showTooltip"
            @mouseleave="hideTooltip"
        >My button</button>
        <div ref="tooltip" class="tooltip" role="tooltip" :style="tipStyle">
            My tooltip with more content
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur assumenda labore in magni illum vitae quod laborum doloremque temporibus corporis quibusdam commodi ad natus quos tenetur, eius consequuntur harum veritatis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptatem aliquam error sequi magni quasi odit totam quibusdam dolorum corporis ab excepturi fuga deleniti quisquam ipsa beatae perferendis, quis odio?
            <div id="arrow" ref="arrowel"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { onMounted, reactive, ref } from 'vue';
const button = ref(null);
const tooltip = ref(null);
const arrowel = ref(null);


let tipStyle = reactive({
    left: '',
    top: '',
})
onMounted(() => {
    setTimeout(() => {
        update();
    }, 1000);

})

const shiftByOnePixel = {
  name: 'shiftByOnePixel',
  fn({x, y}) {
    return {
      x: x + 1,
      y: y + 1,
      data: {
        amount: 1,
      },
    };
  },
};

function update() {
    computePosition(button.value!, tooltip.value!, {
        strategy:'absolute',
        placement: 'top', middleware: [
            flip(),
            shift({ padding: 10 }),
            offset(6), arrow({ element: arrowel.value! }),
            shiftByOnePixel
            ]
    }).then(({ x, y, placement, middlewareData }) => {

        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        console.log(x, y, placement, middlewareData);
        tipStyle.left = `${x}px`;
        tipStyle.top = `${y}px`;
    });
}


function showTooltip() {
    tooltip.value.style.display = 'block';
    update();
}

function hideTooltip() {
    tooltip.value.style.display = '';
}


</script>

<style scoped>
#arrow {
    position: absolute;
    background: #333;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
}
.floating {
    min-height: 400px;
    border: 1px solid #ddd;
    position: relative;
    .tooltip {
        display: none;
        position: absolute;
        background: #222;
        color: white;
        font-weight: bold;
        padding: 5px;
        border-radius: 4px;
        font-size: 90%;
        pointer-events: none;
    }
}
</style>