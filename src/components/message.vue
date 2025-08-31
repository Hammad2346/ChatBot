<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  timestamp: { type: String, required: true },
  mine:{type:Boolean,required:true},
})
const justify = computed(() => (props.mine ? 'justify-end' : 'justify-start'))
const color= computed(()=>(props.mine? 'bg-[#57afe2]':'bg-[#69abd2]'))
</script>

<template>
  <div class="w-full h-auto flex" :class="justify">
    <div class="rounded-[20px] py-3 px-5 text-md lg:text-lg text-white max-w-[50%] break-words" :class="color">
      <h1>{{ props.text }}</h1>
    </div>
  </div>
</template>
