<template>
  <!-- //===== here is the Conversation case  ======// -->
  <div
    cursor="pointer"
    transition="~ duration-200 ease-in-out"
    :class="{
      'bg-secondary dark:bg-secondaryOp':
        selectedConversationId == conversation.id,
    }"
    bg="hover:secondary dark:hover:secondaryOp"
    p="4"
    border="~ secondary dark:secondaryOp rounded-lg"
    flex="~ gap-2"
    items="center"
  >
    <!-- //===== User Name is below me!  =====// -->
    <div flex="~ gap-4px" items="center">
      <span text="primaryOp dark:primary" font="semibold">{{
        conversation.user_id?.username
      }}</span>

      <!-- //===== state dote under me [HELPP!]  =====// -->
      <div
        w="2.5"
        h="2.5"
        border="rounded-full"
        :class="
          conversation.isOnline
            ? 'bg-success'
            : 'bg-secondaryOp dark:bg-secondary'
        "
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  conversation: {
    type: Object,
  },
  selectedConversationId: {
    type: String,
  },
});
</script>
