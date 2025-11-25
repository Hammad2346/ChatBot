<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { getUser } from './store';
import { useRouter } from 'vue-router';

const router=useRouter()

const logout=()=>{
    localStorage.removeItem('token')
    router.replace('/login')
}

defineProps({ open: Boolean })

const user = ref({})

onMounted(async () => {
  const userData = await getUser()
  if (userData) user.value = userData
  
})
</script>


<template>
<div class="sticky bottom-0 left-0 w-full h-[10%] flex px-5 items-center justify-between border-t-[2px] border-black-500 gap-2">
    <div class="flex items-center gap-2">
        <div><img class="h-10 w-10" src="../assets/defaultuserpic.png" alt=""></div>
        <div class="text-[#8f8f91] text-lg" v-if="open "><h1>{{ user.username }}</h1></div>
    </div>
    <div v-if="open">
        <button class="bg-[#000000] text-white text-sm lg:text-md rounded-[10px] py-2 px-2 lg:px-3 flex items-center gap-1 hover:-translate-y-1"
         @click="logout" ><i class="pi pi-logout"></i> logout</button>
    </div>
    
</div>
</template>

