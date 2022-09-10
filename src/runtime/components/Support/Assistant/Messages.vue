<template>
  <div flex="~ col gap-3 grow" overflow-y="auto">

    <!-- //===== Messages =====// -->
    <div flex="~ col gap-1 grow" overflow-y="auto"  pl="2">
      <SupportMessage v-for="msg in messages" :message="msg" :key="msg" />
    </div>

    <!-- //===== Input & Send Button =====// -->
    <div v-if="isConnected" flex="~ gap-4">
      <UiInput @keyup.enter="sendMessage" icon="IconPen" w="full" placeholder="اكتب هنا..." v-model="message" />
      <UiButton @click="sendMessage">ارسال</UiButton>
    </div>
  </div>
</template>

<script setup>
import { useSupabaseClient, ref } from "#imports";
import { useUser } from "../../../composables/states";

const props = defineProps({
  id: {
    type: String,
  },
});

const supabase = useSupabaseClient();
const user = useUser();
const messages = ref([]);
const message = ref(null);
const isConnected = ref(false);

const getMessages = async () => {
  const { data, error } = await supabase
    .from("support_messages")
    .select("message, sender_id(id, username)")
    .eq("conversation_id", props.id);
  if (data) messages.value = data;
};

watch(
  () => props.id,
  async () => {
    if (!props.id) return;
    isConnected.value = false;

    await getMessages();

    await supabase
      .channel("public:support_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "support_messages",
          filters: `conversation_id=${props.id}`,
        },
        (payload) => {
          getMessages();
        }
      )
      .subscribe((state) => {
        if (state === "SUBSCRIBED") {
          isConnected.value = true;
        } else {
          isConnected.value = false;
        }
      });
  }
);

const sendMessage = async () => {
  await supabase
    .from("support_messages")
    .insert({
      conversation_id: props.id,
      message: message.value,
      sender_id: user.value.id,
    });
  message.value = "";
};
</script>
