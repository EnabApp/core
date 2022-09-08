<template>
  <div
    w="70%"
    flex="~ col gap-2px"
    :class="{ 'self-end text-left': user.id !== messageUser?.id }"
  >
    <!-- User name can be either primary or secondaryOp -->
    <span v-if="user.id !== messageUser?.id" text="xs secondaryOp">{{
      messageUser?.username
    }}</span>
    <div
      w="fit"
      min-w="50%"
      :class="[
        user.id == messageUser?.id
          ? 'bg-secondary dark:text-primaryOp dark:text-primary'
          : 'bg-secondaryOp text-secondary self-end',
      ]"
      class="break-words"
      text="16px right"
      font="medium"
      p="x-5 y-2"
      rounded="5px"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<script setup>
import { useUser } from "../../composables/states";
const user = useUser();
const props = defineProps(["message"]);
const messageUser = computed(() => props.message.sender_id);
</script>
