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

// Join Channels
const globalChannel = supabase.channel(`support`)
const privatechannel = supabase.channel(`support:${user.value.id}`)

globalChannel.on( 'broadcast',
    { event: 'join' },
    (event) => { 
        console.log(event)
    })
    .subscribe()

globalChannel.send({
    type: 'broadcast',
    event: 'join',
    payload: { user: userProfile.getProfile, type: 0 }
})

privatechannel.on( 'broadcast',
    { event: 'message' },
    (event) => { 
        console.log('receive', event)
    })
    .subscribe()

const sendMessage = async () => {
    privatechannel.send({
        type: 'broadcast',
        event: 'message',
        payload: { message: message.value }
    })
}
</script>