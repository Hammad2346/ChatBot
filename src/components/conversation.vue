<script setup>
import { defineProps } from 'vue';

const props=defineProps(
    {
        text:{Type: String}
    }
)

</script>

<template>
    <div class="h-9 w-[100%] p-1 pl-4 relative overflow-hidden cursor-pointer hover:bg-gray-100" >
        <p class="text-sm text-[#8f8f91] font-medium whitespace-nowrap">
            {{props.text}}
        </p>
        <div class="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-[#FBFCFE] rounded-[10px]"></div>
        </div>
</template>