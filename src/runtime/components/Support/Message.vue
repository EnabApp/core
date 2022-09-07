<template>
    <div w="70%" flex="~ col gap-1" :class="{ 'self-end': user.id !== messageUser?.id }">
        <span v-if="!same" text="xs secondary dark:secondaryOp">{{messageUser?.username}}</span>
        <div :class="[
            user.id == messageUser?.id
            ? 'bg-opacity-30 dark:bg-opacity-30'
            : 'bg-opacity-100 dark:bg-opacity-100'
        ]" bg="secondary dark:secondaryOp" class="break-words" text="sm" p="2" rounded="~">
            {{message.message}}
        </div>
    </div>
</template>

<script setup>
import { useUser } from '../../composables/states'
const user = useUser()
const props = defineProps(['message', 'same'])
const messageUser = computed(() => props.message.sender_id)
</script> 