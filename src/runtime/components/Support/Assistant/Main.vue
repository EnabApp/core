<template>
  <div v-if="support.isConnected" flex="~ gap-4 grow" overflow-y="auto" h="100px" w="full">

    <!-- //===== Assistant Stuff =====// -->
    <div v-if="
    (!support.selectedConversation?.id && (xs || twoXs)) || sm || md || lg || xl || twoXl" flex="~ col " :class="{
        'w-20%': xl || twoXl,
        'w-25%': lg,
        'w-40%': md || sm,
        'w-100%': xs || twoXs,
      }" overflow-y="auto" text="primary">

      <!-- //===== Assistant Conversation =====// -->
      <SupportAssistantConversation v-for="conversation in support.unSolvedConversations" :key="conversation.id" @click="support.selectConversation(conversation)" :BreakpointWindow="BreakpointWindow" :conversation="conversation" />
    </div>

    <!-- //===== Message =====// -->
    <div v-show="!(xs || twoXs) || support.selectedConversation?.id" flex="~ col gap-2" overflow-y="auto" :class="{
      'w-60%': xl || twoXl || md || sm,
      'w-50%': lg,
      'w-100%': xs || twoXs,
      'blur-2': support.miniProfileState && (xs || twoXs || sm || md),
    }">

      <!-- //===== Mini Profile =====// -->
      <SupportAssistantMiniProfile v-if="!(lg || xl || twoXl) && support.selectedConversation?.id" :BreakpointWindow="BreakpointWindow" h="60px" />

      <!-- //===== Assistant Messages =====// -->
      <SupportAssistantMessages />

    </div>

    <!-- //===== Assistant => User Mini State =====// -->
    <SupportAssistantMiniState ref="miniState" @closeMiniState="support.miniProfileState = false" v-if="support.miniProfileState && (twoXs || xs || sm || md)" :BreakpointWindow="BreakpointWindow" />

    <!-- //===== Assistant => User State =====// -->
    <div v-if="lg || xl || twoXl" w="20%" border="~ secondary dark:secondaryOp rounded-lg" p="4">
      <SupportAssistantStates />
    </div>
  </div>

  <!-- //===== Disconnection State =====// -->
  <div v-else flex="~ gap-4 grow" overflow-y="auto" h="100px" w="full">
    <div flex="~ col " :class="{
        'w-20%': xl || twoXl,
        'w-25%': lg,
        'w-40%': md || sm,
        'w-100%': xs || twoXs,
      }" overflow-y="auto" text="primary">

    <SupportAssistantConversationSkeleton
      v-for="item in 5" :key="'conversation-skeleton-id-' + item"
      :BreakpointWindow="BreakpointWindow"
    />
    </div>
  </div>

</template>

<script setup>
import { useSupabaseClient, ref, onMounted, onBeforeUnmount , onClickOutside } from "#imports";
import { useSupport } from "../../../composables/useSupport";

const props = defineProps({
  BreakpointWindow: {
    type: Object,
  },
});

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

const miniState = ref(null)

onClickOutside(
  miniState,
  (event) => {
    console.log(event)
    support.miniProfileState = false
  },
)

const support = useSupport()

onMounted(async () => {
  await support.join()
  await support.initAssistant()
  await support.fetchUnSolvedConversations()
  console.log(support.getUnSolvedConversations)
  support.supportChannel.track({ isOnline: true });
});
onBeforeUnmount(() => {
  support.supportChannel.track({ isOnline: false });
});

</script>
