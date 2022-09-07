<template>
    <div flex="~ gap-4 grow" w="full">
        <!-- Users -->
        <div flex="~ col gap-2 basis-1/6" w="1/6" p="4" text="primary">
            <span @click="selectConversation(conversation)" v-for="conversation in conversations" :key="conversation.id"> 
                {{conversation.user_id?.username}}
            </span>
        </div>

        <!-- Messages -->
        <div flex="basis-4/6" w="4/6" border="~ secondary dark:secondaryOp rounded-lg" p="4">
            <SupportAssistantMessages :id="selectedConversationId" />
        </div>

        <!-- States -->
        <div flex="basis-1/6" w="1/6" border="~ secondary dark:secondaryOp rounded-lg" p="4">
            states
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

const selectedConversationId = ref(null)
const conversations = ref([])
const isConnected = ref(false)

onMounted(async () => await getConversations())

supabase.channel('public:support_conversations')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'support_conversations', filters: `assistant_id=eq.null,eq.${user.value.id}`, },
        (payload) => {
            getConversations()
        }
    )
    .subscribe((state) => {
        if (state === 'SUBSCRIBED') isConnected.value = true
        else isConnected.value = false
    })

const getConversations = async () => {
    const {data, error} = await supabase.from('support_conversations')
        .select(`id, assistant_id, user_id (id, username)`)
        .or(`assistant_id.eq.${user.value.id},assistant_id.is.null`)
    if (data) conversations.value = data
}


const selectConversation = async (conv) => {
    selectedConversationId.value = conv.id
    if (!conv.assistant_id) {
        const { data, error } = await supabase
        .from('support_conversations')
        .update({ assistant_id: user.value.id })
        .eq('id', conv.id)
    }
}
</script>