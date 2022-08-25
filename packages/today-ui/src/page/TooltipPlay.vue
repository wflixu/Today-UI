<script setup  lang="ts">
import TTooltip from './../../components/tooltip/'


</script>
<template>
    <div>
       <h1>tooltip</h1>
         <t-tooltip :offset="20"  label="这是tooltip 的内容">
            <button>test button</button>
        </t-tooltip>
    </div>
</template>



<style scoped>
</style>