<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
</script>

<template>
  <div class="navi">
    <div class="back" v-if="route.name != 'navi'">
      <router-link to="/">返回</router-link>
    </div>
    <router-view></router-view>
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
.back {
  position: fixed;
  top:20px;
  right:20px;
}
</style>
