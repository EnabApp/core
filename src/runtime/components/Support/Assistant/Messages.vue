<template>
    <div flex="~ col gap-2">
        <SupportMessage v-for="msg in messages" :message="msg" :key="msg" />
        <div>
            <UiInput v-model="message" />
            <UiButton @click="sendMessage">ارسال</UiButton>
        </div>
    </div>
</template>

<script setup>
import { useSupabaseClient, ref } from '#imports'
import { useUser } from '../../../composables/states'

const props = defineProps({
    id: {
        type: String,
    },
})

const supabase = useSupabaseClient()
const user = useUser()
const messages = ref([])
const message = ref(null)

const getMessages = async () => {
    const {data, error} = await supabase.from('support_messages')
        .select('message, sender_id(id, username)').eq('conversation_id', props.id)
    if (data) messages.value = data
}

watch ( () => props.id, () => {
    if (!props.id) return
    
    getMessages()

    supabase.channel('public:support_messages')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'support_messages', filters: `conversation_id=${props.id}`, },
        (payload) => {
            getMessages()
        }
    )
    .subscribe((state) => {
        console.log('state', state)
    })
})

const sendMessage = async () => await supabase
        .from('support_messages')
        .insert({ conversation_id: props.id, message: message.value, sender_id: user.value.id })
</script>