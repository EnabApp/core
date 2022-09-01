<template>
  <!-- Application -->
  <div flex="~ col grow gap-2" w="full">
      <UiTabGroup p="4" :col="true" :tabs="['المعلومات الأساسية', 'تفاصيل اخرى']">
        <template #tab-1>
          <!-- <UiInput v-model="username" placeholder="أسم المستخدم" /> -->
          <!-- <UiButton @click="userProfile.updateUsername(username)" label="تغيير" /> -->
        </template>
        <template #tab-2>
          <h1>About</h1>
        </template>
      </UiTabGroup>
  </div>
</template>


<script setup>
import { watch, ref } from '#imports'
import { useSupabaseClient } from '#imports'
import { useUserProfile } from '../composables/useUserProfile'

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const userProfile = useUserProfile()

const username = ref(userProfile.data?.username)

</script>