<template>
    <div>
        {{ id }}
    </div>
</template>

<script setup>
import { useSupabaseClient, ref } from '#imports'

const props = defineProps({
    id: {
        type: String,
    },
})

const privatechannel = ref(null)

watch ( () => props.id, () => {
    if (!props.id) return
    privatechannel.value = useSupabaseClient().channel(`support:${props.id}`)
    privatechannel.value
        .on( 'broadcast',
            { event: 'join' },
            (event) => { 
                console.log('join', event)
            })
        .on( 'broadcast',
            { event: 'message' },
            (event) => { 
                console.log('message', event)
            })
        .subscribe((event) => {
            console.log('subscribe', event)
        })
})


</script>