<script setup>
import conversation from './conversation.vue';
import { computed } from 'vue';
const props=defineProps({
    open:{type:Boolean,required:true}
})
const historyIconPos = computed(() => 
props.open? "":"justify-center"
)
</script>

<template>
    <div class="h-[50%] w-full rounded-[10px]" >
        <div class="gap-2 flex items-center flex-1 pl-2 text-[#8f8f91]" :class=historyIconPos><i class="pi pi-history "></i><h1 v-if="props.open">History</h1></div>
        <conversation v-if="props.open"/>
        </div>
</template> 