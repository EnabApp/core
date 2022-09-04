import { defineNuxtRouteMiddleware, navigateTo, useAsyncData } from '#app'
import { useSupabaseUser } from '#imports'

export const guest = defineNuxtRouteMiddleware((to, _from) => {
  console.log('guest middleware')
  const user = useSupabaseUser()
  if (user.value) {
    return navigateTo('/')
  }
})
  