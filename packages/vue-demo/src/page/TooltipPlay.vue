<template>
    <div>
        <h2>component tooltip</h2>
        <t-tooltip>
            <button>test button</button>
        </t-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TTooltip from './../../../today-ui/src/tooltip/Tooltip'
export default defineComponent({
    components:{
      't-tooltip':TTooltip
    },
    setup() {
        return {}
    }
})
</script>

<style scoped>
</style>