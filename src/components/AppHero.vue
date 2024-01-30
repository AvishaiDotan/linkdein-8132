<template>
  <div class="hero">
    <el-carousel :interval="5000" arrow="always" height="500px">
      <el-carousel-item v-for="item in images" :key="item">
        <img :key="currentImage" :src="`/src/assets/hero/${item}`" alt="Hero Image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StartButton from "./StartButton.vue"

const images = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
];


</script>
  
<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  // height: 550px;
  /* Adjust the height as needed */
  overflow: hidden;
  background-color: #f4f2ee;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  // transition: opacity 0.5s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
  