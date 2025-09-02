<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  if (email.value === 'hammad' && password.value === 'hammad') {
    console.log("Login successful")
    localStorage.setItem('token', 'true')   
    router.replace('/')                     
  } else {
    alert('Invalid login')
  }
}
</script>

<template>
  <div class="h-screen w-screen relative bg-[#FBFCFE] flex justify-center items-center">
    <div class="w-[90%] md:w-[70%] lg:w-[40%] flex flex-col gap-3 p-5 lg:p-10 bg-white shadow-md rounded-xl">
      <input v-model="email" type="text" placeholder="Email" class="border p-2 rounded" />
      <input @keyup.enter="login" v-model="password" type="password" placeholder="Password" class="border p-2 rounded" />
      <button @click="login" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </div>
  </div>
</template>
