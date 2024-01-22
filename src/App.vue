<template>
  <main class="main-layout">
    <app-nav-bar></app-nav-bar>
    <router-view></router-view>
  </main>

</template>

<script setup>
  import AppNavBar from './components/AppNavBar.vue';
</script>


<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}
</style>
