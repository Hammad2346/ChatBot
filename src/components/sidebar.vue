<script setup>
import { ref ,computed, watch} from 'vue';
import Conversations from './conversations.vue';
import Navbar from './navbar.vue';
import sTopbar from './sTopbar.vue';
const open=ref(false)

const props= defineProps({isMobile:{type:Boolean,required:true}})
const sidebarsize = computed(() => 
  open.value ? "w-[17%]" : "w-[5%]"
)
const toggleSidebar=()=>{open.value=!open.value}

</script>
<template>

    <div v-if="!props.isMobile" 
           @mouseenter="toggleSidebar" 
           @mouseleave="toggleSidebar" 
           class="h-[100%] rounded-[10px] bg-[#FBFCFE] flex flex-col shadow-lg gap-5 transition-all" 
           :class=sidebarsize >


        <sTopbar :open="open" />
        <Navbar :open="open" />
        <Conversations :open="open" />    
    </div>

    <div v-else-if="props.isMobile && !open" class="fixed top-0 left-0 z-50 flex flex-col items-center p-5">
      <button @click="toggleSidebar"><i class="pi pi-bars"></i></button>
    </div>

    <div v-else-if="props.isMobile && open" class="fixed top-0 left-0 w-screen h-screen z-50 flex">
      <div 
        @click="toggleSidebar" 
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"
      ></div>

      <div 
        class="relative h-full w-[70%] sm:w-[40%] rounded-r-[10px] bg-[#FBFCFE] flex flex-col shadow-lg gap-5 transition-all"
      >
        <sTopbar :open="open" />
        <Navbar :open="open" />
        <Conversations :open="open" />    
      </div>

      
    </div>



</template>