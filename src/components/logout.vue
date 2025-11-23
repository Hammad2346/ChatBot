<script setup>
import { defineProps } from 'vue';
const props= defineProps(
    {
        open:{type:Boolean}
    }
)
</script>

<template>
<div class="sticky bottom-0 left-0 w-full h-[10%] flex border-top-[2px] gap-2">
    <div><img class="h-[30]" src="../assets/bot.png" alt=""></div>
    <div v-if="open"><h1>Username</h1></div>
</div>
</template>

