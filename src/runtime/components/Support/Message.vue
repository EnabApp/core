<template>
  <div w="70%" flex="~ col gap-2px" :class="{ 'self-end text-left': user.id !== messageUser?.id }">
    <!-- User name can be either primary or secondaryOp -->
    <span v-if="user.id !== messageUser?.id" text="xs secondaryOp dark:secondary">{{
    messageUser?.username
    }}</span>
    <div  max-w="70%" w="auto" :class="[
      user.id == messageUser?.id
        ? 'bg-secondary dark:text-primaryOp dark:text-primary self-start'
        : 'bg-secondaryOp text-secondary self-end',
    ]" class="break-words" text="16px right" font="medium" p="x-3 y-2" rounded="10px">
      {{ message.message }}
    </div>
  </div>
</template>

<script setup>
import { useUser } from "../../composables/states";
const user = useUser();
const props = defineProps(["message", "same"]);
const messageUser = computed(() => props.message.sender_id);
</script>
