
<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue';




</script>

<template>
  <main>
    <aside>
      <LeftMenu />
    </aside>
    <header>

    </header>
    <section class="content">
      <RouterView />
    </section>
  </main>
</template>


<style scoped lang="postcss">
main {
  --aside-width: 320px;
  height: 100vh;
  display: grid;
  grid-template-columns: var(--aside-width) 1fr;
  grid-template-rows: 42px 1fr;

  aside {
    width: var(--aside-width);
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    background-color: coral;
  }

  header {
    height: 42px;
    background-color: antiquewhite;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .content {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    overflow-y: auto;
  }

}
</style>