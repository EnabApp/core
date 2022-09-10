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

      styleEmoji
        ? 'text-[32px]'
        : 'text-[16px]'
    ]" class="break-words" text="right" font="medium" p="x-3 y-2" rounded="10px">
      {{ message.message }}
    </div>
  </div>
</template>

<script setup>
import { useUser } from "../../composables/states";
const user = useUser();
const props = defineProps(["message", "same"]);
const messageUser = computed(() => props.message.sender_id);



const checkingEmojis = (text) => {
  const onlyEmojis = text.replace(new RegExp('[\u0000-\u1eeff]', 'g'), '')
  const visibleChars = text.replace(new RegExp('[\n\r\s]+|( )+', 'g'), '')
  const hasOnlyEmojis = onlyEmojis.length === visibleChars.length
  if (hasOnlyEmojis) {
    const countEmojies = Array.from(text.split(/[\ufe00-\ufe0f]/).join("")).length;
    return countEmojies <= 1
  }
  return false

}

const styleEmoji = checkingEmojis(props.message.message)

</script>
