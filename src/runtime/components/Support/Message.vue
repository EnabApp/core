<template>
    <div w="70%" flex="~ col gap-1" :class="{ 'self-end': user.id !== message.user_id }">
        <span v-if="!same" text="xs primaryOp dark:primary">{{message.profiles.username}}</span>
        <div :class="[
            user.id == message.user_id
            ? 'bg-opacity-30 dark:bg-opacity-30'
            : 'bg-opacity-100 dark:bg-opacity-100'
        ]" bg="secondary dark:secondaryOp" class="break-words" text="sm  primaryOp dark:primary" p="2" rounded="~">
            {{message.message}}
        </div>
    </div>
</template>

<script setup>
import { useUser } from '../../composables/states'
const user = useUser()
const props = defineProps(['message', 'same'])
</script> 