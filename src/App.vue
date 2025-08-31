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
  <div class="h-screen w-screen bg-[#FBFCFE] flex flex-row gap-2">
    <Sidebar isMobile:isMoblie/>
    <Chatbox :class ="isMobile ?'w-full':'flex-1'"/>
  </div>
</template>

<style scoped></style>
