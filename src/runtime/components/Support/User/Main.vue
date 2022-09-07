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

const supabase = useSupabaseClient()
const user = useUser()
const userProfile = useUserProfile()

const message = ref(null)
const assistant = ref(null)
const isConversationStarted = ref(false)

const sendMessage = async () => {
    if (!isConversationStarted) createConversation()
}


const createConversation = () => {
    // If conversation not started
    isConversationStarted.value = true
    supabase.from('support_conversations')
        .upsert({ user_id: user.value.id })

    supabase.channel('public:support_messages')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'support_messages', filter: 'conversation_id=eq.200', },
        (payload) => {
            console.log('Change received!', payload)
        }
    )
    .subscribe()
}
</script>