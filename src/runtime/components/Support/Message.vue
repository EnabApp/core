<template>
    <div w="70%" flex="~ col gap-1" :class="{ 'self-end text-left': user.id !== messageUser?.id }">
        <span v-if="user.id !== messageUser?.id" text="xs secondary dark:secondaryOp">{{messageUser?.username}}</span>
        <div w="fit" min-w="50%" :class="[
            user.id == messageUser?.id
            ? 'bg-opacity-20 dark:bg-opacity-20 text-primaryOp dark:text-primary'
            : 'bg-opacity-100 dark:bg-opacity-100 text-primary dark:text-primaryOp self-end'
        ]" bg="primaryOp dark:primary" class="break-words" text="sm" p="2" rounded="~">
            {{message.message}}
        </div>
    </div>
</template>

<script setup>
import { useUser } from '../../composables/states'
const user = useUser()
const props = defineProps(['message'])
const messageUser = computed(() => props.message.sender_id)
</script> 