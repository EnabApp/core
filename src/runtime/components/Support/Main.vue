<template>
  <!-- Application -->
  <div h="full" flex="~ col">
    <div m="4" h="full" flex="~ col gap-2">
      <div ref="messagesRef" text="white" flex="~ col grow gap-2" h="50px" pl="2" overflow-y="auto" py="4">
        <SupportMessage v-for="(msg, index) in messages" :same="msg.user_id == messages[index-1]?.user_id" :message="msg" :key="msg.id" />
      </div>
      <div flex="~ gap-2">
        <UiInput @keydown.enter="sendMessage()" flex="grow" v-model="message" placeholder="رسالة جديدة" />
        <UiButton @click="sendMessage()">
          <span>ارسال</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useSupabaseClient, useUser } from '#imports'
const supabase = useSupabaseClient()
const user = useUser()

const messages = ref([])
const message = ref('')
const messagesRef = ref(null)
const isConnected = ref(false)


const mySubscription = supabase
  .from('support_messages')
  .on('INSERT', (payload) => {
    fetchMessages()
  })
  .subscribe(async (state) => {
      if (state === 'SUBSCRIBED') {
        fetchMessages()
        isConnected.value = true
      } else {
        isConnected.value = false
      }
  })


const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('support_messages')
    .select('*, profiles:user_id(id, username)')
    .limit(25)
    .order('id', { ascending: false })
  if (data) {
    messages.value = data.reverse()
    if (messagesRef.value) {
      setTimeout(() => {
        messagesRef.value.lastElementChild.scrollIntoView({behaviour:'smooth'})
      }, 1000);
    }
  }
}

const sendMessage = async () => {
  const { data, error } = await supabase
    .from('support_messages')
    .insert([
      {
        user_id: user.value.id,
        message: message.value
      },
    ])
  if (data) {
    message.value = ''
  }
}

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});




</script>