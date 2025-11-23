<script setup>
import { computed } from 'vue';
import { currentchat } from './store';
const props=defineProps({
    open:{type:Boolean,required:true}
})

const searchiconpos= computed(() => 
props.open? "absolute top-1/2 -translate-y-1/2 right-4 text-lg" : "text-lg absolute top-1/2 translate-y-1/2 right-1/2 translate-x-1/2"
)

const navIconspos= computed(() => 
props.open? "" : "items-center"
)

const clearchat=()=>{
    currentchat.value=[]
}
</script>

<template>
    <div class="h-[28%] w-full flex flex-col gap-2 ">
        <div class="h-[30%] w-full px-2 relative">
            <i class="pi pi-search text-[#8f8f91] hover:cursor-pointer" :class=searchiconpos></i>
            <input v-if="props.open" class="w-full h-full text-sm rounded px-2 shadow-sm" type="text" placeholder="search..">
        </div>
        

        <div class="h-full w-full flex flex-col text-start text-[#8f8f91]" :class=navIconspos>
            <div @click="clearchat" class="gap-2 flex items-center flex-1 pl-2 hover:bg-[#40a8e4] hover:text-[#fdfdff] hover:cursor-pointer"><i class="pi pi-home text-lg"></i><h1 v-if="props.open">Home</h1></div>
            <div class="gap-2 flex items-center flex-1 pl-2  hover:bg-[#40a8e4] hover:text-[#fdfdff] hover:cursor-pointer"><i class="pi pi-globe text-lg"></i><h1 v-if="props.open">Explore</h1></div>
            
            <div class="gap-2 flex items-center flex-1 pl-2  hover:bg-[#40a8e4] hover:text-[#fdfdff] hover:cursor-pointer"><i class="pi pi-book text-lg"></i><h1 v-if="props.open">Library</h1></div>

        </div>
    </div>
</template>