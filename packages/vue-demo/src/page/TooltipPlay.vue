<template>
    <div>
        <h2>component tooltip</h2>
        <t-tooltip :offset="20"  label="这是tooltip 的内容">
            <button>test button</button>
        </t-tooltip>
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return {}
    }
})
</script>

<style scoped>
</style>