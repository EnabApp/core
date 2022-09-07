<template>
  <!-- Application -->
  <div h="full" flex="~ col">
    <div m="4" h="full" flex="~ col">
      <!-- <div w="5" h="5" rounded="full" :class="[ isConnected ? 'bg-success' : 'bg-error' ]"></div> -->
      <SupportAssistantMain v-if="userProfile.isSupport" />
      <SupportUserMain v-else />
    </div>
  </div>
</template>


<script setup>
import { useUserProfile } from '../../composables/useUserProfile'

const userProfile = useUserProfile()




// const recievedMessage = (msg) => console.log(msg)

// const sendMessage = () => {
//     channel.send({
//         type: 'broadcast',
//         event: 'message',
//         payload: { user: user.value.id, message: message.value }
//     })
// }

// const fetchMessages = async () => {
//   const { data, error } = await supabase
//     .from('support_messages')
//     .select('*, profiles:user_id(id, username)')
//     .limit(100)
//     .order('id', { ascending: false })
//   if (data) {
//     messages.value = data.reverse()
//     if (messagesRef.value){
//       setTimeout(() => {
//         messagesRef.value.lastElementChild?.scrollIntoView({behaviour:'smooth'})
//       }, 100)
//     }
//   }
// }

// const sendMessage = async () => {
//   const { data, error } = await supabase
//     .from('support_messages')
//     .insert([
//       {
//         user_id: user.value.id,
//         message: message.value
//       },
//     ])
//   if (data) {
//     message.value = ''
//   }
// }

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});




</script>