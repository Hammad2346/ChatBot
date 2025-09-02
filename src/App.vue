<script setup>
import {ref, onMounted ,onUnmounted } from 'vue';
import Chatbox from './components/chatbox.vue';
import Sidebar from './components/sidebar.vue';

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 640;
};

onMounted(() => {
  checkMobile(); 
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

</script>

<template>
  <div class="relative h-screen w-screen bg-[#FBFCFE] flex flex-row gap-2">

    <Sidebar :isMobile="isMobile"/>
    <Chatbox :class ="isMobile ?'w-full':'flex-1'"/>
    <div class="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-purple-200 blur-[180px] opacity-20"></div>
    <div class="absolute bottom-20 left-40 w-[400px] h-[400px] rounded-full bg-pink-200 blur-[160px] opacity-20"></div>
  </div>
</template>

<style scoped></style>
