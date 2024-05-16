<template>
    <div class="tablist-panel">
       <slot v-if="show"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, unref, type Ref } from 'vue';
import { TAB_ACTIVE_KEY, TABS_OPTIONS_KEY } from './props';
import type { ITabOption } from './type';

const tabOpitons = inject<ITabOption[]>(TABS_OPTIONS_KEY)
const activeKey = inject<Ref<string>>(TAB_ACTIVE_KEY)


const props =  defineProps<{
    /**
     *  tab title
     */
    title:string
}>()
const inst = getCurrentInstance()
const key = inst?.vnode.key  as string
console.log('setup:',props.title, activeKey)
const show = computed(() =>{
    return unref(activeKey) == key
})
onMounted(() =>{
    console.log(props.title)
    console.log(props)
    tabOpitons?.push({
        title: props.title,
        key
    })
})

</script>

<style scoped>

</style>