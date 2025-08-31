<script setup>
import { ref ,computed} from 'vue';
import Conversations from './conversations.vue';
import Navbar from './navbar.vue';
import sTopbar from './sTopbar.vue';
const open=ref(false)

const props= defineProps({isMoblie:{type:Boolean,required:true}})

const sidebarsize = computed(() => 
  open.value ? "w-[17%]" : "w-[5%]"
)
const toggleSidebar=()=>{open.value=!open.value}

</script>
<template>

    <div v-if="!props.isMoblie" 
           @mouseenter="toggleSidebar" 
           @mouseleave="toggleSidebar" 
           class="h-[100%] rounded-[10px] flex flex-col shadow-lg gap-5 transition-all" 
           :class=sidebarsize >


        <sTopbar :open="open" />
        <Navbar :open="open" />
        <Conversations :open="open" />

    
    </div>
</template>