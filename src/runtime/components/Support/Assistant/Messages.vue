<template>
  <!-- //===== Assistant Messages =====// -->
  <div v-if="support.selectedConversation?.id" flex="~ col gap-3 grow" overflow-y="auto" p="2" border="~ secondary dark:secondaryOp rounded-lg" >
    <!-- //===== Messages =====// -->
    <div flex="~ col gap-1 grow" overflow-y="auto"  pl="2">
      <SupportMessage v-for="msg in support.getMessages" :message="msg" :key="msg" />
    </div>

    <!-- //===== Input & Send Button =====// -->
    <div v-if="support.isMessagesLoaded" flex="~ gap-4">
      <UiInput @keyup.enter="sendMessage" icon="IconPen" w="full" placeholder="اكتب هنا..." v-model="message" />
      <UiButton @click="sendMessage">ارسال</UiButton>
    </div>
  </div>
  <!-- //===== Else Statement if no Conversation Selected =====// -->
  <div v-else flex="~" border="~ secondary dark:secondaryOp rounded-lg" h="full" items="center" justify="center">
    <span text="secondary dark:secondaryOp 4xl" opacity="40" font="bold">
      يرجى تحديد محادثة
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from "#imports";
import { useSupport } from "../../../composables/useSupport";

const props = defineProps({
  id: {
    type: String,
  },
});

const support = useSupport();
const message = ref(null);




watch(
  () => support.getSelectedConversationId,
  async () => {
    if (support.getSelectedConversationId){
      // Connect to realtime conversation and fetching messages
      support.initConversationMessages();
    }
  },
  {deep: true}
);

const sendMessage = async () => {
  await support.sendMessage(message.value);
  message.value = "";
};
</script>
