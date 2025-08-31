<script setup></script>

<template>
  <div class="w-full h-auto flex justify-start">
    <div class="bg-[#69abd2] py-3 px-5 text-lg rounded-[20px] flex items-center gap-2">
      <span class="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:0ms]"></span>
      <span class="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:200ms]"></span>
      <span class="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:400ms]"></span>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
