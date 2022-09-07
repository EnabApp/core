<template>
    <div flex="~ gap-4 grow" justify="center" w="full">
        <!-- Users -->
        <div w="1/6" p="4">
            <span @click="selectedUserId = u.id" v-for="u in users" :key="u.id"> {{ u.username }} </span>
        </div>

        <!-- Messages -->
        <div w="4/6" border="~ secondary dark:secondaryOp rounded-lg" p="4">
            <SupportAssistantMessages :channel="globalChannel" :id="selectedUserId" />
        </div>

        <!-- States -->
        <div w="1/6" border="~ secondary dark:secondaryOp rounded-lg" p="4">
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

const users = ref([])
const selectedUserId = ref(null)

// Join Channel
const globalChannel = supabase.channel(`support`)

globalChannel.on( 'broadcast',
                { event: 'join' },
                ({ payload }) => { 
                    if (payload.type == 0)
                        users.value.find(u => u.id == payload?.user?.id) ? null : users.value.push(payload?.user)
                })
                .subscribe()

globalChannel.send({
    type: 'broadcast',
    event: 'join',
    payload: { user: userProfile.getProfile, type: 1 }
})
</script>