import { defineNuxtRouteMiddleware, navigateTo, useAsyncData } from '#app'
import { useSupabaseUser } from '#imports'
import { useUser } from '../composables/states'

export const auth = defineNuxtRouteMiddleware(async (_from) => {
  const user = useSupabaseUser()

    if (!user.value) {
      return navigateTo('/auth')
    }
    const localUser = useUser()
    localUser.value = user.value
  })
  