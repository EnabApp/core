<template>
    <div flex="~ gap-4 grow" w="full">
        <!-- Users -->
        <div flex="basis-1/6" w="1/6" p="4">
            <span @click="selectedUserId = u.id" v-for="u in users" :key="u.id"> {{ u.username }} </span>
        </div>

        <!-- Messages -->
        <div flex="basis-4/6" w="4/6" border="~ secondary dark:secondaryOp rounded-lg" p="4">
            <SupportAssistantMessages :id="selectedUserId" />
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

const users = ref([])
const selectedUserId = ref(null)

</script>