<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const username = ref('')
const password = ref('')
const router = useRouter()
const registering= ref(false)


const register= async () =>{
  try {
    const result= await fetch("http://localhost:3000/reg",{

      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(
        {
          username :username.value,
          password :password.value
        }
      )
    }
      
    )
    if(result.ok){
      const data= await result.json()
      toast.success(data.message)
      registering.value=false
    }
    
  } catch (error) {
    console.log(error)
  }
}

const login = async () => {
  const res=await fetch("http://localhost:3000/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(
      {username:username.value,
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
  <div class="h-screen w-screen relative flex justify-center items-center bg-[url('@/assets/loginbackgroundpic.png')] bg-cover bg-center z-0">

    <div class="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10"></div>

    <div v-if="!registering" class="w-[90%] md:w-[70%] lg:w-[40%] flex flex-col gap-4 p-6 lg:p-10 bg-opacity-0 backdrop-blur-md rounded-2xl z-20">

      <input 
        v-model="username" 
        type="text" 
        placeholder="username" 
        class="border-[2px] border-white/50 text-white placeholder-white/70 bg-transparent p-3 rounded-3xl focus:outline-none focus:border-white transition"
      />

      
      <input 
        @keyup.enter="login"
        v-model="password" 
        type="password" 
        placeholder="Password" 
        class="border-[2px] border-white/50 text-white placeholder-white/70 bg-transparent p-3 rounded-3xl focus:outline-none focus:border-white transition"
      />


      <button 
        @click="login" 
        class="bg-blue-500 bg-opacity-70 hover:bg-opacity-100 text-white px-4 py-2 rounded-3xl transition"
      >
        Login
      </button>


      <div class="text-center mt-2">
        <button @click="registering = true"  class="text-white/90 hover:underline">
          Create an Account
        </button>
      </div>

    </div>



    <!-- registering -->

     <div v-if="registering" class="w-[90%] md:w-[70%] lg:w-[40%] flex flex-col gap-4 p-6 lg:p-10 bg-opacity-0 backdrop-blur-md rounded-2xl z-20">

      <input 
        v-model="username" 
        type="text" 
        placeholder="Enter a username" 
        class="border-[2px] border-white/50 text-white placeholder-white/70 bg-transparent p-3 rounded-3xl focus:outline-none focus:border-white transition"
      />

      
      <input 
        @keyup.enter="register"
        v-model="password" 
        type="password" 
        placeholder=" Enter a Password" 
        class="border-[2px] border-white/50 text-white placeholder-white/70 bg-transparent p-3 rounded-3xl focus:outline-none focus:border-white transition"
      />


      <button 
        @click="register" 
        class="bg-blue-500 bg-opacity-70 hover:bg-opacity-100 text-white px-4 py-2 rounded-3xl transition"
      >
        Register
      </button>


      

    </div>

  </div>
</template>


