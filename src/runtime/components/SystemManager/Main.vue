<template>
  <!-- Application -->
  <div>
    <div mx="4" mt="2" flex="~ col gap-2">
      <div flex="~ gap-2">
        <UiInput flex="grow" v-model="username" placeholder="أسم المستخدم" />
        <UiButton @click="updateUsername()">
          <div v-if="pending">
            <!-- Loading icon -->
            <IconLoading w="16px"/>
          </div>
          <span v-else>تغيير</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>


<script setup>
import { watch, ref } from '#imports'
import { useSupabaseClient } from '#imports'
import { useUserProfile } from '../../composables/useUserProfile'

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const userProfile = useUserProfile()

const username = ref(userProfile.data?.username)

const pending = ref(false)

const updateUsername = async () => {
  pending.value = true
  const result = await userProfile.updateUsername(username.value)
  pending.value = false
}



</script>