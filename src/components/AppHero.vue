<template>
    <div class="hero">
        <transition name="fade" mode="out-in">
      <img :key="currentImage" :src="currentImage" alt="Hero Image" />
    </transition>
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
  
  const currentIndex = ref(0);
  const intervalId = ref();
  
  const currentImage = ref(`/src/assets/hero/${images[currentIndex.value]}`);
  
  const startImageChange = () => {
    intervalId.value = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
      currentImage.value = `/src/assets/hero/${images[currentIndex.value]}`;
    }, 5000);
  };
  
  const stopImageChange = () => {
    clearInterval(intervalId.value);
  };
  
  onMounted(() => {
    startImageChange();
  });
  
  onBeforeUnmount(() => {
    stopImageChange();
  });
  
  </script>
  
  <style lang="scss" scoped>
  .hero {
    position: relative;
    width: 100%;
    height: 350px; /* Adjust the height as needed */
    overflow: hidden;
    background-color: #f4f2ee;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  