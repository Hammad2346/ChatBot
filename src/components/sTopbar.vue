<script setup>
const props=defineProps({
    open:{type:Boolean,required:true}
})

</script>
<template>

    <div class="w-full h-16 flex " >
        
        <div class="flex flex-1 flex-row gap-2 items-center justify-center">
            <img class="h-10 w-10" src="../assets/bot.png" alt="">
            <h1 v-if="props.open" class="pt-2 text-3xl text-[#7A78C1] font-bold">BUTA</h1>
        </div>
    </div>
</template>