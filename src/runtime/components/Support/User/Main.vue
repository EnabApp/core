<template>
    <div flex="~ col grow gap-4">
        <!-- Support Team -->
        <div flex="~" justify="between">
            <span text="primaryOp dark:primary">الدعم الفني</span>
            <span text="primaryOp dark:primary">{{ assistant }}</span>
        </div>

        <!-- Messages -->
        <div border="~ secondary dark:secondaryOp rounded-lg" h="full" text="white" p="4">
            messages
        </div>
        <div>
            <UiInput v-model="message" />
            <UiButton @click="sendMessage">ارسال</UiButton>
        </div>
    </div>
</template>

<script setup>
import { useSupabaseClient, ref } from '#imports'
import { useUser } from '../../../composables/states'
import { useUserProfile } from '../../../composables/useUserProfile'
import { useStorage } from '@vueuse/core'


const supabase = useSupabaseClient()
const user = useUser()
const userProfile = useUserProfile()
const conversation_id = useStorage('support:conversation_id')

const message = ref(null)
const assistant = ref(null)
const messages = ref([])
const isConnected = ref(false)


// Create Conversation with Support Team
onMounted( async () => {
    if (!conversation_id.value){
        const { data: record, error } = await supabase
                .from('support_conversations')
                .insert({ user_id: user.value.id })
                .select('id').single()
        if (error) throw error
        else conversation_id.value = record.id
    }

    supabase.channel('public:support_messages')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'support_messages', filter: `conversation_id=eq.${conversation_id.value}`, },
        (payload) => {
            console.log('Change received!', payload)
        }
    )
    .subscribe((state) => {
        if (state === 'SUBSCRIBED') isConnected.value = true
        else isConnected.value = false
    })
})

const sendMessage = async () => await supabase
    .from('support_messages')
    .insert({ conversation_id: conversation_id.value, message: message.value })

</script>