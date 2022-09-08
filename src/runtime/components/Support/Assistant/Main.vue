<template>
  <div
    v-if="isConnected"
    flex="~ gap-4 grow"
    overflow-y="auto"
    h="100px"
    w="full"
  >
    <!-- Users -->
    <div flex="~ col " w="330px" overflow-y="auto" text="primary">
      <SupportAssistantConversation
        v-for="conversation in conversations"
        :key="conversation.id"
        @click="selectConversation(conversation)"
        :conversation="conversation"
        :selectedConversationId="selectedConversationId"
      />
    </div>

    <!-- Messages -->
    <div
      flex="~ col"
      overflow-y="auto"
      w="4/6"
      border="~ secondary dark:secondaryOp rounded-lg"
      p="4"
    >
      <SupportAssistantMessages
        v-if="selectedConversationId"
        :id="selectedConversationId"
      />
      <div v-else flex="~" h="full" items="center" justify="center">
        <span text="secondary dark:secondaryOp 4xl" opacity="40" font="bold">
          يرجى تحديد محادثة
        </span>
      </div>
    </div>

    <!-- States -->
    <div
      flex="basis-1/6"
      w="1/6"
      border="~ secondary dark:secondaryOp rounded-lg"
      p="4"
      text="center 2xl primaryOp dark:primary"
    >
      States
    </div>
  </div>
  <div v-else text="center 2xl primaryOp dark:primary"> ...Disconnected</div>
</template>

<script setup>
import {
  useSupabaseClient,
  ref,
  onMounted,
  computed,
  onBeforeUnmount,
} from "#imports";
import { useUser } from "../../../composables/states";
import { useUserProfile } from "../../../composables/useUserProfile";

const supabase = useSupabaseClient();
const user = useUser();
const userProfile = useUserProfile();

const selectedConversationId = ref(null);
const conversations = ref([]);
const isConnected = ref(false);

onMounted(async () => {
  channel.track({ isOnline: true });
  await getConversations();
});
onBeforeUnmount(() => {
  channel.track({ isOnline: false });
});

// Tracking online/offline statue
const channel = supabase.channel("support", {
  config: {
    presence: { key: user.value.id },
  },
});
channel.on("presence", { event: "sync" }, () => onlineState()).subscribe();

const onlineState = () => {
  const newState = channel.presenceState();
  conversations.value = conversations.value.map((conversation) => {
    newState[conversation.user_id.id]
      ? (conversation.isOnline = newState[conversation.user_id.id][0]?.isOnline)
      : (conversation.isOnline = false);
    return conversation;
  });
};
// End of tracking online/offline statue

supabase
  .channel("public:support_conversations")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "support_conversations",
      filters: `assistant_id=eq.null,eq.${user.value.id}`,
    },
    (payload) => {
      getConversations();
    }
  )
  .subscribe((state) => {
    if (state === "SUBSCRIBED") isConnected.value = true;
    else isConnected.value = false;
  });

const getConversations = async () => {
  const { data, error } = await supabase
    .from("support_conversations")
    .select(`id, assistant_id, user_id (id, username)`);
  if (data) {
    conversations.value = data;
    conversations.value.isOnline = false;
  }
};

const selectConversation = async (conv) => {
  selectedConversationId.value = conv.id;
  if (!conv.assistant_id) {
    const { data, error } = await supabase
      .from("support_conversations")
      .update({ assistant_id: user.value.id })
      .eq("id", conv.id);
  }
};
</script>
