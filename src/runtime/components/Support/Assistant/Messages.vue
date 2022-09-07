<template>
    <div flex="~ col gap-2">
        <span v-for="msg in messages" :key="msg"> {{ msg }} </span>
    </div>
</template>

<script setup>
import { useSupabaseClient, ref } from '#imports'

const props = defineProps({
    id: {
        type: String,
    },
})

const messages = ref([])

watch ( () => props.id, () => {
    if (!props.id) return
    
})


</script>