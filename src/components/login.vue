<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
// database not available and have to run the backend server
const login = async () => {
  const res=await fetch("http://localhost:3000/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(
      {username:email.value,
      password:password.value
    })
      
  })
  if (res.ok) {
    const data=await res.json()
    console.log(data.message)
    localStorage.setItem('token', data.token)   
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
