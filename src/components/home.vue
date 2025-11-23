<script setup>
import {ref,onMounted,onUnmounted} from 'vue';
import Sidebar from './sidebar.vue';
import Chatbox from './chatbox.vue';

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
    <div class="absolute top-20 right-20 z-0 w-[200px] lg:w-[600px] h-[200px] lg:h-[600px] rounded-full bg-purple-200 blur-[180px] opacity-20 pointer-events-none"></div>
    <div class="absolute bottom-20 left-40 z-0 w-[100px] lg:w-[400px] h-[100px] lg:h-[400px] rounded-full bg-pink-200 blur-[160px] opacity-20 pointer-events-none"></div>
  </div>
</template>