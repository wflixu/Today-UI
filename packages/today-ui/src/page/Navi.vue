<template>
    <div>
        <h1>组件列表</h1>
        <ul>
            <li v-for="link in links" :key="link.path">
                <router-link :to="link.path">{{link.name}}</router-link>
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { routes } from './../router'


let links = computed(()=>{
    return  routes.filter(item=>{
        return item.name != 'navi';
    })
});

</script>

<style scoped>
</style>