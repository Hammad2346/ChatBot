<script setup>
import { onMounted, ref, watch } from 'vue'
import message from './message.vue'
import Typeingindicator from './typeingindicator.vue'
import { currentchat,againfetchchat } from './store'



const inputMsg = ref("")
const messages = ref(currentchat)
const firstmsg = ref(true)
const typing= ref(false)



const user_id=ref(null)
const chat_id = ref(null)

const updatechattitle=async ()=>{
  try {
    console.log("update chat is called")
    const result= await fetch("http://localhost:5000/api/title",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        messages:messages.value
      })
    })
    const data=await result.json()
    const title=data.reply
    
    await patchchattitle(title)
  } catch (error) {
    console.log(error)
  }
}

const patchchattitle=async (title)=>{
  try {
    console.log(title)
    const result=await fetch("http://localhost:3000/updatetitle",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },


      body:JSON.stringify({
        chat_id:chat_id.value,
        newtitle:title
      }
      )
      
    })
  } catch (error) {
    console.log(error)
  }
}

const savechat = async ()=>{
  try {
    const response = await fetch("http://localhost:3000/savechat",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
            },
      body: JSON.stringify({
        user_id: user_id.value,
        title:  "New Chat"
      })
    })
    const data = await response.json()
    againfetchchat.value++
    chat_id.value = data.chat.chat_id
    
    user_id.value=data.user_id
  } catch (error) {
    console.log(error)
  }
}

const saveMessageTDB = async(message)=>{
  try {
    await fetch("http://localhost:3000/savemessage",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id.value,
        chat_id: chat_id.value,
        text: message.text,
        role: message.role
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const sendMsg = async () => {
  if (inputMsg.value !== "") {
    const userMessage = {
      text: inputMsg.value,
      role: "user"
    }
    messages.value.push(userMessage)
    if (messages.value.length === 1 && !chat_id.value) {
      await savechat()
      console.log("savechat working")
    }

    if (messages.value.length%5=== 0) {
       await updatechattitle()
       againfetchchat.value++ //disgusting
    }
    

    await saveMessageTDB(userMessage)

    

    const msgToSend = inputMsg.value
    inputMsg.value = ""
    typing.value = true

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msgToSend })
      })

      const data = await res.json()
      const assistantMessage = {
        text: data.reply, 
        role: "assistant"
      }
      messages.value.push(assistantMessage)
      await saveMessageTDB(assistantMessage)
      typing.value = false

      
    } catch (err) {
      console.error("Error sending message:", err)
      typing.value = false
    }
  }
}

watch(messages, (newVal) => {
  firstmsg.value = newVal.length === 0
}, { deep: true })
</script>

<template>
  <div v-if="firstmsg" class="w-full h-[92%] flex justify-center">
    <div class="h-[50%] w-full flex flex-col justify-center items-center mt-14">
        <img class="w-[80px] md:w-[90px] lg:w-[100] h-[80px] md:h-[90px] lg:h-[100px]" src="../assets/orb.png" alt="">
      <div class="w-full h-[50%] flex flex-col justify-center items-center text-xl md:text-2xl lg:text-3xl font-semibold">
        <h1>Good Morning, I'm Buta</h1>
        <h1>How Can <span class="text-[#7A78C1]">I Assist You Today?</span></h1>
      </div>


      <div class="h-20 w-[90%] lg:w-1/2 relative">
        <i @click="sendMsg" class="pi pi-send text-md lg:text-xl text-[#7A78C1] text-bold absolute top-1/2 -translate-y-1/2 right-4 "></i>
        <input
          v-model="inputMsg"
          @keyup.enter="sendMsg"
          class="h-full w-full border rounded-lg shadow-md px-1 py-0 text-[#8f8f91] text-xs md:text-md lg:text-lg"
          type="text"
          placeholder="Initiate query or send command to AI..."
        />
      </div>


    </div>
  </div>

  <div v-else class="h-[92%] flex flex-col gap-2 pt-4">
  <div class="w-full h-[90%] overflow-y-scroll custom-scrollbar flex flex-col gap-2">
    <message
      v-for="(message, index) in messages"
      :key="index"
      :text="message.text"
      :role="message.role"
    />
    <Typeingindicator v-if="typing"/>
  </div>

      <div class="h-[9%] w-full relative">
        <i @click="sendMsg" class="pi pi-send text-xl text-[#7A78C1] text-bold absolute top-1/2 -translate-y-1/2 right-4 "></i>
        <input
          v-model="inputMsg"
          @keyup.enter="sendMsg"
          class="h-full w-full border rounded-lg shadow-md px-3 py-0 text-[#8f8f91] text-lg"
          type="text"
          placeholder="Ask anything..."
        />
      </div>    
  </div>
</template>