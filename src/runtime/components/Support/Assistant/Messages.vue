<template>
  <!-- //===== Assistant Messages =====// -->
  <div v-if="support.selectedConversation?.id" flex="~ col gap-3 grow" overflow-y="auto" p="2" border="~ secondary dark:secondaryOp rounded-lg" >
    <!-- //===== Messages =====// -->
    <div @scroll="scrollingMessages($event)" ref="messagesElement" flex="~ col gap-1 grow" overflow-y="auto" pl="2" overscroll="y-contain" snap="y mandatory" :class="{ 'snapType' : scrollToEnd }">
      <SupportMessage v-for="msg in support.getMessages" :message="msg" :key="msg" />
    </div>


    <div w="full" @click="scrollToBottom" v-if="haveNewMessages" text="center xs secondaryOp dark:secondary" cursor="pointer" bg="secondary dark:secondaryOp" rounded="lg">
      <div p="0.5">لديك رسائل جديدة</div>
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
const scrollToEnd = ref(true);
const messagesElement = ref(null);
const haveNewMessages = ref(false);

const scrollToBottom = () => messagesElement.value.scroll({ top: messagesElement.value.scrollHeight, behavior: 'smooth' });

const scrollingMessages = () => {
  const endOfMessages = messagesElement.value.scrollHeight - messagesElement.value.scrollTop - messagesElement.value.clientHeight <= 50;
  if (endOfMessages) {
    scrollToEnd.value = true
    haveNewMessages.value = false;
  }
  else scrollToEnd.value = false
}

watch (() => support.getMessages?.length, () => {
  if (!scrollToEnd.value) haveNewMessages.value = true
})

watch(
  () => support.getSelectedConversationId,
  async () => {
    if (support.getSelectedConversationId){
      // Connect to realtime conversation and fetching messages
      support.initConversationMessages();
      scrollToEnd.value = true
    }
  },
  {deep: true}
);

const sendMessage = useThrottleFn(async () => {
  sendMessageButtonState.value = false;
  await support.sendMessage(message.value);
  message.value = "";
  
  scrollToEnd.value = true
  
  setTimeout(() => {
    sendMessageButtonState.value = true
  }, 1000)
}, 1000)
</script>

<style scoped>
.snapType > div:last-child  {
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
</style>
