<script setup>
import conversation from './conversation.vue';
import {ref, computed, onMounted } from 'vue';
import { currentchat } from './store';
const props=defineProps({
    open:{type:Boolean,required:true}
})
const chats=ref([])
onMounted( async ()=>{
    try {
        const result= await fetch("http://localhost:3000/getchats",
            {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+ localStorage.getItem("token")
                },
                
            }
        )
        const data = await result.json();
        chats.value=data.chats.reverse()
        console.log(chats.value)
    } catch (error) {
        console.log(error)
    }
})

const openchat=async (chat_id)=>{

    try {
        const result=await fetch(`http://localhost:3000/getchat?chat_id=${chat_id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const data=await result.json()

        currentchat.value= data.chat
        console.log(chat)
    } catch (error) {
        console.log(error)
    }
}



const historyIconPos = computed(() => 
props.open? "":"justify-center"
)
</script>

<template>

    <div class="h-[40%] w-full rounded-[10px] overflow-y-scroll custom-scrollbar" >
        <div class="sticky top-0 left-0 gap-2 flex items-center bg-white/40 backdrop-blur-lg flex-1 pl-2 text-[#8f8f91]"  :class=historyIconPos><i class="pi pi-history "></i><h1 v-if="props.open">History</h1></div>

        <conversation 
        v-for="chat in chats"
        :key="chat.chat_id"
        :text="chat.title"
        @click="openchat(chat.chat_id)"
        v-if="props.open"/>
        </div>
</template> 

<style>
.custom-scrollbar {
  scrollbar-width: thin; 
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent; /* Firefox */
}

/* Chrome, Edge, Safari */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2); /* faint but hoverable */
  border-radius: 3px;
  transition: background-color 0.3s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6); /* visible on hover */
}


</style>