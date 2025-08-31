<script setup>
import { ref, watch } from 'vue'
import message from './message.vue'
import dayjs from 'dayjs'
import Typeingindicator from './typeingindicator.vue'

const inputMsg = ref("")
const messages = ref([])
const firstmsg = ref(true)
const typing= ref(false)

const sendMsg = async () => {
  if (inputMsg.value !== "") {
    const userMessage = {
      timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      text: inputMsg.value,
      mine: true
    }

    messages.value.push(userMessage)


    const msgToSend = inputMsg.value
    inputMsg.value = ""
    typing.value=true
    try {

      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msgToSend })
      })
        
        const data = await res.json()
        console.log(data)
        typing.value=false
        messages.value.push({
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        text: data.reply, 
        mine: false
      })
    } catch (err) {
      console.error("Error sending message:", err)
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
  <div class="w-full h-[90%] overflow-y-scroll scroll-container flex flex-col gap-2">
    <message
      v-for="(message, index) in messages"
      :key="index"
      :text="message.text"
      :timestamp="message.timestamp"
      :mine="message.mine"
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
