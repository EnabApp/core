<template>
  <!-- //===== Assistant Messages =====// -->
  <div v-if="support.selectedConversation?.id" flex="~ col gap-3 grow" overflow-y="auto" p="2" border="~ secondary dark:secondaryOp rounded-lg" >
    <!-- //===== Messages =====// -->
    <div flex="~ col gap-1 grow" overflow-y="auto" pl="2" overscroll="y-contain" snap="y mandatory" class="snapType">
      <TransitionGroup name="messages">
        <SupportMessage v-for="msg in support.getMessages" :message="msg" :key="msg" />
      </TransitionGroup>
    </div>

    <!-- //===== Input & Send Button =====// -->
    <Transition>
      <div v-if="support.isMessagesLoaded" flex="~ gap-4">
        <UiInput @keyup.enter="sendMessage" icon="IconPen" w="full" placeholder="اكتب هنا..." v-model="message" />
        <UiButton @click="sendMessage" w="20">
          <span v-if="sendMessageButtonState">ارسال</span>
          <IconLoading v-else w="4" h="4" />
        </UiButton>
      </div>
    </Transition>
  </div>
  <!-- //===== Else Statement if no Conversation Selected =====// -->
  <div v-else flex="~" border="~ secondary dark:secondaryOp rounded-lg" h="full" items="center" justify="center">
    <span text="secondary dark:secondaryOp 4xl" opacity="40" font="bold">
      يرجى تحديد محادثة
    </span>
  </div>
</template>

<script setup>
import { ref, watch, useThrottleFn } from "#imports";
import { useSupport } from "../../../composables/useSupport";

const props = defineProps({
  id: {
    type: String,
  },
});

const support = useSupport();
const message = ref(null);
const sendMessageButtonState = ref(true);




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

const sendMessage = useThrottleFn(async () => {
  sendMessageButtonState.value = false;
  await support.sendMessage(message.value);
  message.value = "";
  
  setTimeout(() => {
    sendMessageButtonState.value = true
  }, 1000)
}, 1000)
</script>

<style scoped>
.snapType > div:last-child {
  scroll-snap-align: start;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.messages-enter-active,
.messages-leave-active {
  transition: opacity 0.1s ease;
}

.messages-enter-from,
.messages-leave-to {
  opacity: 0;
}
</style>
