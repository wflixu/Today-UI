<template>
    <div class="left-menu">
        <ul class="list">
            <li class="item" :class="{ 'active': route.path == item.path }" v-for="item in routes" :key="item.path">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </li>

        </ul>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const routes = router.getRoutes();


</script>

<style scoped lang="postcss">
.list {
    padding: 10px 16px;

    .item {
        border-bottom: 1px solid #f8f8f8;
        height: 42px;
        display: flex;
        align-items: center;

        &.active>a {
            color: white;
        }
    }
}
</style>